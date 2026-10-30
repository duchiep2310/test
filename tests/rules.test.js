import test from "node:test";
import assert from "node:assert/strict";
import { createMode } from "../src/modes/index.js";
import { TABLE } from "../src/core/Constants.js";
import { PhysicsEngine } from "../src/physics/PhysicsEngine.js";
const collision = (a, b) => ({ type: "collision", a, b });
const rail = (ball) => ({ type: "cushion", ball });
const pocket = (ball, pocket = 0) => ({ type: "pocket", ball, pocket });
function shot(mode, events, extra = {}) {
  const balls = extra.balls || mode.setup();
  const initialBalls = balls.map((b) => ({ ...b }));
  for (const e of events)
    if (e.type === "pocket") balls.find((b) => b.id === e.ball).active = false;
  return mode.evaluateShot({ events, balls, initialBalls, ...extra });
}
function assignedEight() {
  const m = createMode("eight");
  m.isBreak = false;
  m.groups = ["solids", "stripes"];
  return m;
}
for (const [id, count] of [
  ["eight", 16],
  ["nine", 10],
  ["ten", 11],
  ["carom", 3],
  ["three", 3],
]) {
  test(`${id} correct setup, distinct balls inside table, no overlaps`, () => {
    const mode = createMode(id);
    const b = mode.setup();
    assert.equal(b.length, count);
    assert.equal(new Set(b.map((v) => v.id)).size, count);
    for (let i = 0; i < b.length; i++) {
      assert.ok(Math.abs(b[i].x) < TABLE.halfWidth - b[i].radius);
      assert.ok(Math.abs(b[i].z) < TABLE.halfHeight - b[i].radius);
      for (let j = i + 1; j < b.length; j++)
        assert.ok(
          Math.hypot(b[i].x - b[j].x, b[i].z - b[j].z) >=
            b[i].radius + b[j].radius - 1e-8,
        );
    }
  });
}
test("eight open-table legal pocket assigns groups and retains turn", () => {
  const m = createMode("eight");
  m.isBreak = false;
  const r = shot(m, [collision(0, 10), pocket(10)]);
  assert.equal(r.foul, false);
  assert.deepEqual(m.groups, ["stripes", "solids"]);
  assert.equal(m.currentPlayer, 0);
  assert.equal(m.scores[0], 1);
});
test("eight break stays open and can retain turn", () => {
  const m = createMode("eight");
  const r = shot(m, [collision(0, 1), pocket(1)]);
  assert.equal(r.foul, false);
  assert.deepEqual(m.groups, [null, null]);
  assert.equal(m.currentPlayer, 0);
});
test("eight on break respots instead of winning", () => {
  const m = createMode("eight");
  const r = shot(m, [collision(0, 1), pocket(8)]);
  assert.equal(r.winner, null);
  assert.deepEqual(r.respot, [8]);
  assert.equal(m.currentPlayer, 0);
});
test("eight legal called finish wins", () => {
  const m = assignedEight();
  const balls = m.setup();
  balls.forEach((b) => {
    if (b.id >= 1 && b.id <= 7) b.active = false;
  });
  const r = shot(m, [collision(0, 8), pocket(8, 4)], {
    balls,
    calledPocket: 4,
  });
  assert.equal(r.winner, 0);
  assert.equal(r.foul, false);
});
test("eight premature pocket loses", () => {
  const m = assignedEight();
  const r = shot(m, [collision(0, 1), pocket(8)], { calledPocket: 0 });
  assert.equal(r.winner, 1);
  assert.equal(r.foul, true);
});
test("eight uncalled or wrong pocket loses", () => {
  const m = assignedEight();
  const balls = m.setup();
  balls.forEach((b) => {
    if (b.id >= 1 && b.id <= 7) b.active = false;
  });
  const r = shot(m, [collision(0, 8), pocket(8, 4)], {
    balls,
    calledPocket: 0,
  });
  assert.equal(r.winner, 1);
});
test("eight clearing last group ball and eight in same shot loses", () => {
  const m = assignedEight();
  const balls = m.setup();
  balls.forEach((b) => {
    if (b.id >= 2 && b.id <= 7) b.active = false;
  });
  const r = shot(m, [collision(0, 1), pocket(1), pocket(8)], {
    balls,
    calledPocket: 0,
  });
  assert.equal(r.winner, 1);
});
test("eight wrong first contact gives next player ball in hand", () => {
  const m = assignedEight();
  const r = shot(m, [collision(0, 9), rail(9)]);
  assert.equal(r.foul, true);
  assert.equal(r.ballInHand, true);
  assert.equal(m.currentPlayer, 1);
});
test("eight scratch even after own pocket does not assign open group", () => {
  const m = createMode("eight");
  m.isBreak = false;
  const r = shot(m, [collision(0, 3), pocket(3), pocket(0)]);
  assert.equal(r.foul, true);
  assert.deepEqual(m.groups, [null, null]);
});
test("pool no contact foul", () => {
  const m = createMode("nine");
  m.isBreak = false;
  const r = shot(m, [rail(0)]);
  assert.equal(r.foul, true);
  assert.match(r.message, /No object/);
});
test("pool contact without later cushion or pocket is foul", () => {
  const m = createMode("nine");
  m.isBreak = false;
  const r = shot(m, [rail(0), collision(0, 1)]);
  assert.equal(r.foul, true);
  assert.match(r.message, /No cushion/);
});
test("pool illegal break checks four distinct object balls", () => {
  const m = createMode("nine");
  const r = shot(m, [collision(0, 1), rail(1), rail(1), rail(1), rail(1)]);
  assert.equal(r.foul, true);
});
test("pool four distinct cushion balls legal break switches turn", () => {
  const m = createMode("nine");
  const r = shot(m, [collision(0, 1), rail(1), rail(2), rail(3), rail(4)]);
  assert.equal(r.foul, false);
  assert.equal(m.currentPlayer, 1);
});
test("nine wrong lowest contact foul and spots nine", () => {
  const m = createMode("nine");
  m.isBreak = false;
  const r = shot(m, [collision(0, 2), pocket(9)]);
  assert.equal(r.foul, true);
  assert.deepEqual(r.respot, [9]);
  assert.equal(r.winner, null);
});
test("nine lowest-first combination can win", () => {
  const m = createMode("nine");
  m.isBreak = false;
  const r = shot(m, [collision(0, 1), collision(1, 9), pocket(9)]);
  assert.equal(r.winner, 0);
});
test("nine pocketed lowest uses pre-shot targets", () => {
  const m = createMode("nine");
  m.isBreak = false;
  const r = shot(m, [collision(0, 1), pocket(1)]);
  assert.equal(r.foul, false);
  assert.equal(m.currentPlayer, 0);
});
test("ten called ordinary pocket retains turn", () => {
  const m = createMode("ten");
  m.isBreak = false;
  const r = shot(m, [collision(0, 1), pocket(1, 3)], {
    calledBall: 1,
    calledPocket: 3,
  });
  assert.equal(r.foul, false);
  assert.equal(m.currentPlayer, 0);
});
test("ten uncalled ordinary pocket switches without ball in hand", () => {
  const m = createMode("ten");
  m.isBreak = false;
  const r = shot(m, [collision(0, 1), pocket(1, 3)]);
  assert.equal(r.foul, false);
  assert.equal(r.ballInHand, false);
  assert.equal(m.currentPlayer, 1);
});
test("ten made early is spotted and does not win", () => {
  const m = createMode("ten");
  m.isBreak = false;
  const r = shot(m, [collision(0, 1), pocket(10, 3)], {
    calledBall: 10,
    calledPocket: 3,
  });
  assert.equal(r.winner, null);
  assert.deepEqual(r.respot, [10]);
  assert.equal(m.currentPlayer, 1);
});
test("ten called last-ball finish wins", () => {
  const m = createMode("ten");
  m.isBreak = false;
  const balls = m.setup();
  balls.forEach((b) => {
    if (b.id > 0 && b.id < 10) b.active = false;
  });
  const r = shot(m, [collision(0, 10), pocket(10, 3)], {
    balls,
    calledBall: 10,
    calledPocket: 3,
  });
  assert.equal(r.winner, 0);
});
test("ten wrong pocket final ten respots, switches", () => {
  const m = createMode("ten");
  m.isBreak = false;
  const balls = m.setup();
  balls.forEach((b) => {
    if (b.id > 0 && b.id < 10) b.active = false;
  });
  const r = shot(m, [collision(0, 10), pocket(10, 3)], {
    balls,
    calledBall: 10,
    calledPocket: 4,
  });
  assert.equal(r.winner, null);
  assert.deepEqual(r.respot, [10]);
  assert.equal(m.currentPlayer, 1);
});
test("carom scores only two distinct cue contacts", () => {
  const m = createMode("carom");
  const r = shot(m, [collision(0, 1), collision(0, 1)]);
  assert.equal(m.scores[0], 0);
  assert.equal(m.currentPlayer, 1);
  assert.equal(r.foul, false);
});
test("carom first player scores from both objects and keeps white cue", () => {
  const m = createMode("carom");
  shot(m, [collision(0, 1), collision(0, 2)]);
  assert.equal(m.scores[0], 1);
  assert.equal(m.currentPlayer, 0);
  assert.equal(m.cueId(), 0);
});
test("carom player two uses yellow as cue and can win target", () => {
  const m = createMode("carom", { targetScore: 1 });
  m.currentPlayer = 1;
  const r = shot(m, [collision(1, 2), collision(1, 0)]);
  assert.equal(r.winner, 1);
  assert.equal(m.cueId(), 1);
});
test("object-object collision cannot score carom", () => {
  const m = createMode("carom");
  shot(m, [collision(0, 1), collision(1, 2)]);
  assert.equal(m.scores[0], 0);
});
test("three cushions before second object contact scores", () => {
  const m = createMode("three");
  shot(m, [rail(0), collision(0, 1), rail(0), rail(0), collision(0, 2)]);
  assert.equal(m.scores[0], 1);
  assert.equal(m.lastCushionCount, 3);
});
test("three cushion contacts after second object cannot rescue shot", () => {
  const m = createMode("three");
  shot(m, [collision(0, 1), rail(0), collision(0, 2), rail(0), rail(0)]);
  assert.equal(m.scores[0], 0);
  assert.equal(m.currentPlayer, 1);
});
test("object cushion contacts do not count in three cushion", () => {
  const m = createMode("three");
  shot(m, [collision(0, 1), rail(1), rail(2), rail(0), collision(0, 2)]);
  assert.equal(m.scores[0], 0);
});

for (const id of ["eight", "nine", "ten"]) {
  test(`${id} full-power straight opening is a legal break in actual solver`, () => {
    const mode = createMode(id),
      events = [];
    const physics = new PhysicsEngine({
      onEvent: (event) => events.push(event),
    });
    physics.setBalls(mode.setup());
    const initialBalls = physics.balls.map((ball) => ({ ...ball }));
    physics.shoot(0, 0, 0.96);
    let steps = 0;
    while (physics.isMoving() && steps++ < 7200) physics.step(1 / 240);
    assert.ok(steps < 7200, "break must come to rest");
    assert.ok(
      events.some((e) => e.type === "collision" && e.a === 0 && e.b === 1),
    );
    const result = mode.evaluateShot({
      events,
      balls: physics.balls,
      initialBalls,
    });
    assert.equal(result.foul, false, result.message);
    assert.equal(result.winner, null);
  });
}
