import test from "node:test";
import assert from "node:assert/strict";
import { once } from "node:events";
import { WebSocket } from "ws";
import { RoomHub } from "../server/RoomHub.js";
import { createRoomServer } from "../server/index.js";

function peer() {
  return {
    closed: false,
    messages: [],
    send(data) {
      this.messages.push(data);
    },
    sendEncoded(data) {
      this.messages.push(JSON.parse(data));
    },
    socket: { close() {} },
  };
}
function openRoom(options = {}, mode = "eight") {
  const hub = new RoomHub(options),
    a = peer(),
    b = peer();
  hub.handle(a, { type: "create", name: "An", mode });
  hub.handle(b, { type: "join", name: "Bình", roomId: a.room.id });
  return { hub, a, b, room: a.room };
}
function command(room, type, data = {}) {
  return {
    type,
    matchId: room.matchId,
    revision: room.match.revision,
    ...data,
  };
}
const shot = {
  angle: 0,
  power: 0.96,
  spin: { x: 0, y: 0 },
  calledBall: null,
  calledPocket: null,
};

test("create room waits for two seats; third and many later entrants become spectators", () => {
  const hub = new RoomHub(),
    a = peer();
  hub.handle(a, { type: "create", name: "An", mode: "nine" });
  assert.equal(a.room.phase, "waiting");
  assert.equal(a.seat, 0);
  const b = peer();
  hub.handle(b, {
    type: "join",
    name: "Bình",
    roomId: a.room.id.toLowerCase(),
  });
  assert.equal(b.seat, 1);
  assert.equal(a.room.ready, true);
  assert.equal(a.room.phase, "playing");
  for (let i = 0; i < 25; i++) {
    const s = peer();
    hub.handle(s, { type: "join", name: "Khách " + i, roomId: a.room.id });
    assert.equal(s.seat, null);
  }
  assert.equal(a.room.players.filter(Boolean).length, 2);
  assert.equal(a.room.spectators.size, 25);
});
test("explicit spectator does not take the second seat and can claim a free seat", () => {
  const hub = new RoomHub(),
    a = peer(),
    s = peer();
  hub.handle(a, { type: "create", mode: "carom" });
  hub.handle(s, {
    type: "join",
    roomId: a.room.id,
    spectate: true,
    name: "Khách",
  });
  assert.equal(a.room.ready, false);
  assert.equal(s.seat, null);
  hub.handle(s, { type: "claim" });
  assert.equal(s.seat, 1);
  assert.equal(a.room.ready, true);
  assert.equal(a.room.spectators.size, 0);
});
test("spectators cannot shoot, move balls, pause or request a rematch", () => {
  const { hub, a, room } = openRoom();
  const s = peer();
  hub.handle(s, { type: "join", roomId: room.id });
  const before = JSON.stringify(room.match.snapshot());
  for (const type of [
    "shoot",
    "place",
    "pause",
    "rematch",
    "state",
    "reposition",
  ])
    assert.throws(
      () => hub.handle(s, command(room, type, { ...shot, x: 0, z: 0 })),
      /Khán giả/,
    );
  assert.equal(
    JSON.stringify(room.match.snapshot()).replace(
      /"elapsed":\d+/,
      '"elapsed":0',
    ),
    before.replace(/"elapsed":\d+/, '"elapsed":0'),
  );
  assert.equal(a.room, room);
});
test("only current player can shoot; malformed, stale and in-flight duplicate shots are rejected", () => {
  const { hub, a, b, room } = openRoom();
  assert.throws(() => hub.handle(b, command(room, "shoot", shot)), /lượt/);
  for (const corrupt of [
    { power: 5 },
    { angle: NaN },
    { spin: { x: Infinity, y: 0 } },
    { calledPocket: 6 },
    { calledBall: "8" },
  ])
    assert.throws(() =>
      hub.handle(a, command(room, "shoot", { ...shot, ...corrupt })),
    );
  const accepted = command(room, "shoot", shot);
  hub.handle(a, accepted);
  assert.equal(room.match.shots, 1);
  assert.throws(() => hub.handle(a, accepted), /thay đổi/);
  assert.throws(() => hub.handle(a, command(room, "shoot", shot)), /dừng/);
  assert.equal(room.match.shots, 1);
});
test("all five server matches complete a physical shot and publish identical positions to players and observers", () => {
  for (const mode of ["eight", "nine", "ten", "carom", "three"]) {
    const { hub, a, b, room } = openRoom({}, mode),
      s = peer();
    hub.handle(s, { type: "join", roomId: room.id });
    hub.handle(a, command(room, "shoot", shot));
    for (let i = 0; i < 7200; i++) hub.tick(1 / 240);
    room.broadcast();
    assert.equal(room.match.physics.isMoving(), false);
    assert.ok(
      ["PLAYER_TURN", "BALL_IN_HAND", "GAME_OVER"].includes(room.match.state),
    );
    assert.ok(room.match.events.length > 0);
    const snapshots = [a, b, s].map((p) =>
      p.messages.filter((m) => m.type === "snapshot").at(-1),
    );
    assert.deepEqual(snapshots[0], snapshots[1]);
    assert.deepEqual(snapshots[0], snapshots[2]);
    assert.equal(
      snapshots[0].balls.length,
      mode === "eight" ? 16 : mode === "nine" ? 10 : mode === "ten" ? 11 : 3,
    );
  }
});
test("invalid ball-in-hand placement is rejected; valid placement requires active player", () => {
  const { hub, a, b, room } = openRoom();
  room.match.state = "BALL_IN_HAND";
  room.match.cue.active = false;
  assert.throws(
    () => hub.handle(b, command(room, "place", { x: -1, z: 0 })),
    /lượt/,
  );
  assert.throws(
    () => hub.handle(a, command(room, "place", { x: 1.05, z: 0 })),
    /Đặt bi/,
  );
  hub.handle(a, command(room, "place", { x: -1, z: 0.5 }));
  assert.equal(room.match.cue.active, true);
  assert.equal(room.match.state, "PLAYER_TURN");
});
test("resume token restores the original seat and match, never appears in public snapshots", () => {
  const { hub, a, room } = openRoom();
  const joined = a.messages.find((m) => m.type === "joined"),
    id = room.matchId;
  room.remove(a);
  assert.equal(room.ready, false);
  const resume = peer();
  hub.handle(resume, {
    type: "join",
    roomId: room.id,
    resumeToken: joined.resumeToken,
  });
  assert.equal(resume.seat, 0);
  assert.equal(room.ready, true);
  assert.equal(room.matchId, id);
  const snapshot = JSON.stringify(room.snapshot());
  assert.equal(snapshot.includes(joined.resumeToken), false);
  assert.equal(snapshot.includes("resumeToken"), false);
  assert.throws(
    () =>
      hub.handle(peer(), {
        type: "join",
        roomId: room.id,
        resumeToken: "fake-token",
      }),
    /hết hạn/,
  );
});
test("disconnect reserves seat, current shot settles, expiration clears it for an observer", () => {
  const { hub, a, room } = openRoom({ reconnectMs: 50 });
  const s = peer();
  hub.handle(s, { type: "join", roomId: room.id });
  hub.handle(a, command(room, "shoot", shot));
  room.remove(a, false, Date.now());
  assert.throws(() => hub.handle(s, { type: "claim" }), /Hai ghế/);
  for (let i = 0; i < 7200; i++) hub.tick(1 / 240);
  assert.equal(room.match.physics.isMoving(), false);
  hub.cleanup(Date.now() + 100);
  assert.equal(room.players[0], null);
  assert.equal(room.phase, "waiting");
  hub.handle(s, { type: "claim" });
  assert.equal(s.seat, 0);
  assert.equal(room.ready, true);
  assert.equal(room.match.shots, 0);
});
test("explicit leave releases seat immediately and spectators continue in the room", () => {
  const { hub, a, room } = openRoom(),
    s = peer();
  hub.handle(s, { type: "join", roomId: room.id });
  hub.handle(a, { type: "leave" });
  assert.equal(room.players[0], null);
  assert.equal(room.phase, "waiting");
  assert.equal(s.room, room);
  assert.equal(a.room, null);
});
test("rematch requires both players, clears votes and starts a fresh match", () => {
  const { hub, a, b, room } = openRoom();
  assert.throws(() => hub.handle(a, command(room, "rematch")), /kết thúc/);
  room.match.state = "GAME_OVER";
  room.match.mode.winner = 0;
  const old = room.matchId;
  hub.handle(a, command(room, "rematch"));
  assert.equal(room.votes.size, 1);
  assert.equal(room.matchId, old);
  hub.handle(b, command(room, "rematch"));
  assert.notEqual(room.matchId, old);
  assert.equal(room.votes.size, 0);
  assert.equal(room.match.mode.winner, null);
});
test("room caps and idle room cleanup bound resource use; malicious names remain plain text", () => {
  const hub = new RoomHub({ maxRooms: 1, maxSpectators: 1, emptyTtlMs: 20 }),
    a = peer();
  hub.handle(a, { type: "create", mode: "eight", name: "<script>\x00Alice" });
  assert.equal(a.room.players[0].name, "scriptAlice");
  assert.throws(
    () => hub.handle(peer(), { type: "create", mode: "eight" }),
    /đủ phòng/,
  );
  const s = peer();
  hub.handle(s, { type: "join", roomId: a.room.id, spectate: true });
  assert.throws(
    () =>
      hub.handle(peer(), { type: "join", roomId: a.room.id, spectate: true }),
    /khán giả/,
  );
  const room = a.room;
  hub.handle(a, { type: "leave" });
  hub.handle(s, { type: "leave" });
  hub.cleanup(Date.now() + 30);
  assert.equal(hub.rooms.has(room.id), false);
});
test("bad room IDs and unknown modes fail without allocating rooms", () => {
  const hub = new RoomHub();
  for (const roomId of ["", null, "../room", "ZZZZZZ"])
    assert.throws(() => hub.handle(peer(), { type: "join", roomId }));
  assert.throws(() => hub.handle(peer(), { type: "create", mode: "fake" }));
  assert.throws(() =>
    hub.handle(peer(), { type: "create", mode: "eight", targetScore: NaN }),
  );
  assert.equal(hub.rooms.size, 0);
});

function inbox(socket) {
  const messages = [],
    waiters = [];
  socket.on("message", (bytes) => {
    const data = JSON.parse(bytes);
    messages.push(data);
    for (const item of [...waiters])
      if (item.filter(data)) {
        waiters.splice(waiters.indexOf(item), 1);
        clearTimeout(item.timer);
        item.resolve(data);
      }
  });
  return {
    messages,
    next(filter) {
      const found = messages.find(filter);
      if (found) return Promise.resolve(found);
      return new Promise((resolve, reject) => {
        const item = { filter, resolve };
        item.timer = setTimeout(() => {
          waiters.splice(waiters.indexOf(item), 1);
          reject(new Error("socket response timeout"));
        }, 3000);
        waiters.push(item);
      });
    },
  };
}
test("real HTTP/WebSocket server serves app, joins two players and a viewer, syncs and rejects spectator commands", async () => {
  const app = createRoomServer();
  await new Promise((resolve) => app.server.listen(0, "127.0.0.1", resolve));
  const port = app.server.address().port;
  const sockets = [];
  try {
    assert.equal(
      (await (await fetch(`http://127.0.0.1:${port}/health`)).json()).protocol,
      1,
    );
    assert.equal((await fetch(`http://127.0.0.1:${port}/`)).status, 200);
    assert.equal(
      (await fetch(`http://127.0.0.1:${port}/.git/config`)).status,
      403,
    );
    for (let i = 0; i < 3; i++) {
      const ws = new WebSocket(`ws://127.0.0.1:${port}/ws`),
        box = inbox(ws);
      sockets.push({ ws, box });
      await once(ws, "open");
    }
    const [a, b, s] = sockets;
    a.ws.send(JSON.stringify({ type: "create", mode: "nine", name: "An" }));
    const joined = await a.box.next((d) => d.type === "joined");
    b.ws.send(
      JSON.stringify({ type: "join", roomId: joined.roomId, name: "Bình" }),
    );
    s.ws.send(
      JSON.stringify({ type: "join", roomId: joined.roomId, name: "Khách" }),
    );
    const snap = await s.box.next((d) => d.type === "snapshot" && d.ready);
    assert.equal(snap.spectatorCount, 1);
    assert.equal(snap.players.length, 2);
    s.ws.send(
      JSON.stringify(command(app.hub.rooms.get(joined.roomId), "shoot", shot)),
    );
    assert.match(
      (await s.box.next((d) => d.type === "error")).message,
      /Khán giả/,
    );
    a.ws.send(
      JSON.stringify(command(app.hub.rooms.get(joined.roomId), "shoot", shot)),
    );
    const moving = await s.box.next(
      (d) => d.type === "snapshot" && d.shots === 1,
    );
    assert.equal(moving.state, "SHOT_IN_PROGRESS");
    assert.ok(moving.balls.some((b) => Math.hypot(b.vx, b.vz) > 0));
    const denied = new WebSocket(`ws://127.0.0.1:${port}/ws`, {
      origin: "https://untrusted.example",
    });
    const [error] = await once(denied, "error");
    assert.match(error.message, /403/);
  } finally {
    for (const { ws } of sockets) ws.terminate();
    await app.close();
  }
});

test("failed creation cannot leak room slots and creator always takes a playing seat", () => {
  const hub = new RoomHub({ maxRooms: 1 });
  for (let i = 0; i < 4; i++)
    assert.throws(
      () =>
        hub.handle(peer(), {
          type: "create",
          mode: "eight",
          resumeToken: "invalid",
        }),
      /token/,
    );
  assert.equal(hub.rooms.size, 0);
  hub.cleanup(Date.now() + 3600000);
  assert.equal(hub.rooms.size, 0);
  const creator = peer();
  hub.handle(creator, { type: "create", mode: "eight", spectate: true });
  assert.equal(creator.seat, 0);
  assert.equal(hub.rooms.size, 1);
});

test("rename updates only the sender, broadcasts names and preserves match/seat tokens", () => {
  const { hub, a, b, room } = openRoom();
  const token = room.players[0].token,
    matchId = room.matchId;
  hub.handle(a, { type: "rename", name: "  Nguyễn Hiệp  ", seat: 1 });
  assert.equal(room.players[0].name, "Nguyễn Hiệp");
  assert.equal(room.players[1].name, "Bình");
  assert.equal(room.players[0].token, token);
  assert.equal(room.matchId, matchId);
  assert.equal(
    b.messages.filter((m) => m.type === "snapshot").at(-1).players[0].name,
    "Nguyễn Hiệp",
  );
  assert.throws(
    () => hub.handle(a, { type: "rename", name: "   " }),
    /nhập tên/,
  );
  const s = peer();
  hub.handle(s, { type: "join", roomId: room.id, spectate: true });
  hub.handle(s, { type: "rename", name: "Khán giả Việt" });
  assert.ok(room.snapshot().spectators.includes("Khán giả Việt"));
  hub.handle(a, { type: "leave" });
  hub.handle(s, { type: "claim" });
  assert.equal(room.players[0].name, "Khán giả Việt");
});

test("Aim guide is a room setting shared by both players, late viewers and rematches", () => {
  const { hub, a, b, room } = openRoom();
  const viewer = peer();
  hub.handle(viewer, { type: "join", roomId: room.id, spectate: true });
  hub.handle(b, { type: "aimGuide", enabled: false });
  for (const p of [a, b, viewer])
    assert.equal(
      p.messages.filter((m) => m.type === "snapshot").at(-1).aimGuide,
      false,
    );
  assert.throws(
    () => hub.handle(viewer, { type: "aimGuide", enabled: true }),
    /Khán giả/,
  );
  assert.equal(room.aimGuide, false);
  assert.throws(
    () => hub.handle(a, { type: "aimGuide", enabled: "false" }),
    /không hợp lệ/,
  );
  const late = peer();
  hub.handle(late, { type: "join", roomId: room.id, spectate: true });
  assert.equal(
    late.messages.filter((m) => m.type === "snapshot").at(-1).aimGuide,
    false,
  );
  room.match.state = "GAME_OVER";
  room.match.mode.winner = 0;
  hub.handle(a, command(room, "rematch"));
  hub.handle(b, command(room, "rematch"));
  assert.equal(room.aimGuide, false);
  hub.handle(a, { type: "aimGuide", enabled: true });
  assert.equal(room.snapshot().aimGuide, true);
});

test("series scores count a result once, survive rematches and reconnects, reset for a changed pair", () => {
  const { hub, a, b, room } = openRoom();
  room.match.state = "GAME_OVER";
  room.match.mode.winner = 0;
  for (let i = 0; i < 5; i++) room.broadcast();
  assert.deepEqual(room.snapshot().seriesScores, [1, 0]);
  hub.handle(a, command(room, "rematch"));
  hub.handle(b, command(room, "rematch"));
  assert.deepEqual(room.seriesScores, [1, 0]);
  room.match.state = "GAME_OVER";
  room.match.mode.winner = 1;
  room.broadcast();
  assert.deepEqual(room.seriesScores, [1, 1]);
  const saved = b.messages.find((m) => m.type === "joined").resumeToken;
  room.remove(b);
  const resume = peer();
  hub.handle(resume, { type: "join", roomId: room.id, resumeToken: saved });
  assert.deepEqual(room.seriesScores, [1, 1]);
  hub.handle(a, { type: "leave" });
  assert.deepEqual(room.seriesScores, [0, 0]);
});

test("ball-in-hand can be repositioned repeatedly before shooting, never by opponent/viewer or after a shot", () => {
  const { hub, a, b, room } = openRoom({}, "nine");
  const viewer = peer();
  hub.handle(viewer, { type: "join", roomId: room.id, spectate: true });
  assert.throws(
    () => hub.handle(a, command(room, "reposition")),
    /quyền đặt bi/,
  );
  room.match.state = "BALL_IN_HAND";
  room.match.cue.active = false;
  hub.handle(a, command(room, "place", { x: -1.2, z: 0.5 }));
  assert.equal(room.match.placementAllowed, true);
  assert.throws(() => hub.handle(b, command(room, "reposition")), /lượt/);
  assert.throws(
    () => hub.handle(viewer, command(room, "reposition")),
    /Khán giả/,
  );
  for (const [x, z] of [
    [-1, -0.4],
    [-1.7, 0.2],
  ]) {
    hub.handle(a, command(room, "reposition"));
    assert.equal(room.match.state, "BALL_IN_HAND");
    const before = { x: room.match.cue.x, z: room.match.cue.z };
    assert.throws(
      () => hub.handle(a, command(room, "place", { x: 99, z: 99 })),
      /Đặt bi/,
    );
    assert.deepEqual({ x: room.match.cue.x, z: room.match.cue.z }, before);
    hub.handle(a, command(room, "place", { x, z }));
    assert.equal(room.match.cue.x, x);
    assert.equal(room.match.cue.z, z);
    assert.equal(room.snapshot().placementAllowed, true);
  }
  hub.handle(a, command(room, "shoot", shot));
  assert.equal(room.match.placementAllowed, false);
  assert.throws(
    () => hub.handle(a, command(room, "reposition")),
    /quyền đặt bi/,
  );
  assert.throws(
    () => hub.handle(a, command(room, "place", { x: 0, z: 0 })),
    /Đặt bi/,
  );
});

test("invalid jump values cannot consume a shot or change aim; omitted jump remains a flat legacy shot", () => {
  const { hub, a, room } = openRoom({}, "nine");
  const revision = room.match.revision;
  for (const jump of [-0.01, 1.01, NaN, Infinity, null, "0.5", true, {}, []]) {
    for (const type of ["aim", "shoot"])
      assert.throws(() =>
        hub.handle(a, command(room, type, { ...shot, jump })),
      );
    assert.equal(room.match.shots, 0);
    assert.equal(room.match.revision, revision);
    assert.equal(room.match.jump, 0);
    assert.equal(room.match.physics.isMoving(), false);
  }
  hub.handle(a, command(room, "aim", { ...shot, jump: 0.8 }));
  assert.equal(room.snapshot().aim.jump, 0.8);
  // Old clients send no jump field, even after a new client has prepared a jump.
  hub.handle(a, command(room, "shoot", shot));
  assert.equal(room.match.shots, 1);
  assert.equal(room.match.jump, 0);
  assert.equal(room.match.cue.height, 0);
  assert.equal(room.match.cue.vy, 0);
  assert.equal(room.match.physics.isMoving(), true);
});

test("authoritative jump height syncs to both players and viewers, remains in motion vertically and resets after landing", () => {
  const { hub, a, b, room } = openRoom({}, "nine"),
    viewer = peer();
  hub.handle(viewer, { type: "join", roomId: room.id, spectate: true });
  room.match.mode.isBreak = false;
  room.match.state = "PLAYER_TURN";
  room.match.physics.setBalls([
    { id: 0, x: -1.4, z: 0 },
    { id: 1, x: 1.1, z: 0.5 },
    { id: 9, x: 1.8, z: -0.5 },
  ]);
  hub.handle(a, command(room, "shoot", { ...shot, power: 0.5, jump: 1 }));
  for (let i = 0; i < 20; i++) hub.tick(1 / 240);
  room.broadcast();
  const snapshots = [a, b, viewer].map((p) =>
    p.messages.filter((m) => m.type === "snapshot").at(-1),
  );
  assert.deepEqual(snapshots[0], snapshots[1]);
  assert.deepEqual(snapshots[0], snapshots[2]);
  assert.equal(snapshots[0].aim.jump, 1);
  const cue = snapshots[0].balls.find((ball) => ball.id === 0);
  assert.ok(cue.height > 0.1, "server snapshot must show actual vertical lift");
  assert.ok(cue.vy > 0, "cue must still be ascending in the early snapshot");
  assert.ok(
    snapshots[0].balls.every((ball) => Number.isFinite(ball.height + ball.vy)),
  );

  // Horizontal speed alone cannot decide when an airborne shot has ended.
  room.match.cue.vx = room.match.cue.vz = 0;
  hub.tick(1 / 240);
  assert.equal(room.match.physics.isMoving(), true);
  assert.equal(room.match.state, "SHOT_IN_PROGRESS");
  assert.equal(room.match.canShoot, false);
  for (let i = 0; i < 7200; i++) hub.tick(1 / 240);
  assert.equal(room.match.physics.isMoving(), false);
  assert.ok(["PLAYER_TURN", "BALL_IN_HAND"].includes(room.match.state));
  assert.equal(room.snapshot().aim.jump, 0);
  assert.ok(
    room.match.physics.balls.every(
      (ball) => ball.height === 0 && ball.vy === 0,
    ),
  );
});

test("jump preparation and execution remain exclusive to the active player", () => {
  const { hub, a, b, room } = openRoom({}, "nine"),
    viewer = peer();
  hub.handle(viewer, { type: "join", roomId: room.id, spectate: true });
  hub.handle(a, command(room, "aim", { ...shot, jump: 0.8 }));
  for (const type of ["aim", "shoot"]) {
    assert.throws(
      () => hub.handle(b, command(room, type, { ...shot, jump: 0 })),
      /lượt/,
    );
    assert.throws(
      () => hub.handle(viewer, command(room, type, { ...shot, jump: 1 })),
      /Khán giả/,
    );
  }
  assert.equal(room.match.shots, 0);
  assert.equal(room.snapshot().aim.jump, 0.8);
  assert.equal(room.match.physics.isMoving(), false);
});

test("room chat broadcasts authoritative names and roles without changing a moving match", () => {
  const { hub, a, b, room } = openRoom({ chatCooldownMs: 0 }, "nine"),
    s = peer();
  hub.handle(s, {
    type: "join",
    roomId: room.id,
    spectate: true,
    name: "Khán giả",
  });
  hub.handle(a, command(room, "shoot", shot));
  const before = room.match.snapshot();
  hub.handle(a, {
    type: "chat",
    text: "Chào mọi người 👋",
    requestId: "a1",
    name: "Giả mạo",
    seat: 1,
  });
  hub.handle(b, { type: "chat", text: "Chúc một trận hay!", requestId: "b1" });
  hub.handle(s, {
    type: "chat",
    text: "<img src=x onerror=alert(1)>",
    requestId: "s1",
  });
  assert.deepEqual(room.match.snapshot(), before);
  for (const member of [a, b, s]) {
    const messages = member.messages.filter((x) => x.type === "chat");
    assert.deepEqual(
      messages.map((x) => [x.message.name, x.message.seat]),
      [
        ["An", 0],
        ["Bình", 1],
        ["Khán giả", null],
      ],
    );
    assert.equal(messages[2].message.text, "<img src=x onerror=alert(1)>");
    assert.ok(messages.every((x) => x.roomId === room.id));
  }
});

test("room chat validates text and rate limits independently of shooting", () => {
  const { hub, a, b, room } = openRoom();
  for (const text of [null, {}, "", "  \n ", "x".repeat(301), "\u0000"])
    assert.throws(() => hub.handle(a, { type: "chat", text }), /Tin nhắn/);
  assert.throws(
    () => hub.handle(a, { type: "chat", text: "Hi", requestId: {} }),
    /Mã tin nhắn/,
  );
  assert.equal(room.chat.messages.length, 0);
  hub.handle(a, {
    type: "chat",
    text: "  Chào\r\nnhé\u0000  ",
    requestId: "valid",
  });
  assert.equal(room.chat.messages[0].text, "Chào\nnhé");
  assert.throws(
    () => hub.handle(a, { type: "chat", text: "Quá nhanh" }),
    /hơi nhanh/,
  );
  hub.handle(b, { type: "chat", text: "Tôi vẫn gửi được" });
  assert.equal(room.chat.messages.length, 2);
  assert.equal(room.match.shots, 0);
  hub.handle(a, command(room, "shoot", shot));
  assert.equal(room.match.shots, 1);
});

test("chat retains fifty messages for late join and reconnect without exposing seat tokens", () => {
  const { hub, a, room } = openRoom({ chatCooldownMs: 0 });
  const oldId = a.chatId,
    resumeToken = room.players[0].token;
  for (let i = 1; i <= 55; i++)
    hub.handle(a, { type: "chat", text: "Tin " + i, requestId: "id" + i });
  assert.equal(room.chat.messages.length, 50);
  assert.equal(room.chat.messages[0].id, 6);
  const spectator = peer();
  hub.handle(spectator, {
    type: "join",
    roomId: room.id,
    spectate: true,
    name: "Xem",
  });
  const joined = spectator.messages.find((x) => x.type === "joined");
  assert.equal(joined.messages.length, 50);
  assert.equal(joined.messages.at(-1).text, "Tin 55");
  assert.equal(JSON.stringify(joined.messages).includes(resumeToken), false);
  const history = JSON.stringify(room.chat.messages);
  room.start();
  assert.equal(JSON.stringify(room.chat.messages), history);
  room.remove(a, false);
  const resumed = peer();
  hub.handle(resumed, { type: "join", roomId: room.id, resumeToken });
  assert.equal(resumed.chatId, oldId);
  assert.equal(
    resumed.messages.find((x) => x.type === "joined").messages.length,
    50,
  );
  hub.handle(resumed, { type: "rename", name: "An mới" });
  hub.handle(resumed, { type: "chat", text: "Đã quay lại" });
  assert.equal(room.chat.messages.at(-1).name, "An mới");
  assert.equal(room.chat.messages[0].name, "An");
});

test("chat stays in its room and removed peers cannot send", () => {
  const hub = new RoomHub({ chatCooldownMs: 0 }),
    a = peer(),
    other = peer();
  hub.handle(a, { type: "create", mode: "eight", name: "An" });
  hub.handle(other, { type: "create", mode: "eight", name: "Bình" });
  const room = a.room;
  hub.handle(a, {
    type: "chat",
    roomId: other.room.id,
    text: "Đúng phòng của tôi",
  });
  assert.equal(
    other.messages.some((x) => x.type === "chat"),
    false,
  );
  room.remove(a, true);
  assert.throws(
    () => hub.handle(a, { type: "chat", text: "Đã rời" }),
    /chưa vào phòng/,
  );
  assert.throws(() => room.chat.post(a, { text: "Đã rời" }), /chưa vào phòng/);
});
