import { randomBytes } from "node:crypto";
import { Match } from "../src/core/Match.js";
import { nameOf, shotOf } from "./validation.js";

const token = () => randomBytes(24).toString("base64url");
export class Room {
  constructor(id, modeId, targetScore, options = {}) {
    this.id = id;
    this.modeId = modeId;
    this.targetScore = targetScore;
    this.players = [null, null];
    this.spectators = new Set();
    this.match = new Match(modeId, targetScore);
    this.matchId = token();
    this.phase = "waiting";
    this.votes = new Set();
    this.sequence = 0;
    this.aimGuide = true;
    this.seriesScores = [0, 0];
    this.lastScoredMatch = null;
    this.lastActive = Date.now();
    this.emptySince = Date.now();
    this.reconnectMs = options.reconnectMs ?? 60000;
    this.maxSpectators = options.maxSpectators ?? 200;
  }
  get ready() {
    return this.players.every((p) => p?.peer && !p.peer.closed);
  }
  get people() {
    return [
      ...this.players.map((p) => p?.peer).filter(Boolean),
      ...this.spectators,
    ];
  }
  get hostSeat() {
    return this.players.findIndex((p) => p?.peer);
  }
  seatOf(peer) {
    return this.players.findIndex((p) => p?.peer === peer);
  }
  join(peer, data = {}) {
    if (data.resumeToken) {
      const seat = this.players.findIndex((p) => p?.token === data.resumeToken);
      if (seat < 0)
        throw new Error("Ghế cũ đã hết hạn. Hãy vào lại phòng bằng mã.");
      const player = this.players[seat];
      if (player.peer && player.peer !== peer) {
        player.peer.room = null;
        player.peer.send({
          type: "replaced",
          message: "Ghế chơi đã được mở ở cửa sổ khác.",
        });
        player.peer.socket.close(4001, "Session replaced");
      }
      player.peer = peer;
      player.disconnectedAt = null;
      peer.room = this;
      peer.seat = seat;
      this.emptySince = null;
      this.ack(peer, player.token);
    } else {
      const seat = data.spectate
        ? -1
        : this.players.findIndex((p) => p === null);
      if (seat < 0) {
        if (this.spectators.size >= this.maxSpectators)
          throw new Error(
            "Phòng đã đạt giới hạn khán giả. Hãy thử phòng khác.",
          );
        this.spectators.add(peer);
        peer.seat = null;
        peer.name = nameOf(data.name);
        peer.room = this;
        this.ack(peer, null);
      } else {
        const player = {
          name: nameOf(data.name),
          token: token(),
          peer,
          disconnectedAt: null,
        };
        this.players[seat] = player;
        peer.room = this;
        peer.seat = seat;
        this.ack(peer, player.token);
      }
    }
    if (this.ready && this.phase === "waiting") this.start();
    this.emptySince = null;
    this.lastActive = Date.now();
    this.broadcast();
  }
  ack(peer, resumeToken) {
    peer.send({
      type: "joined",
      roomId: this.id,
      seat: peer.seat,
      resumeToken,
      protocol: 1,
      serverTime: Date.now(),
    });
  }
  start() {
    this.match = new Match(this.modeId, this.targetScore);
    this.matchId = token();
    this.phase = "playing";
    this.votes.clear();
  }
  remove(peer, explicit = false, now = Date.now()) {
    const seat = this.seatOf(peer);
    if (seat >= 0) {
      if (explicit) {
        this.players[seat] = null;
        this.resetWaiting();
      } else {
        this.players[seat].peer = null;
        this.players[seat].disconnectedAt = now;
      }
    }
    this.spectators.delete(peer);
    peer.room = null;
    peer.seat = null;
    if (!this.people.length) this.emptySince ??= now;
    this.broadcast();
  }
  resetWaiting() {
    this.seriesScores = [0, 0];
    this.lastScoredMatch = null;
    this.phase = "waiting";
    this.votes.clear();
    this.match = new Match(this.modeId, this.targetScore);
    this.matchId = token();
  }
  expire(now = Date.now()) {
    let changed = false;
    for (let i = 0; i < 2; i++)
      if (
        this.players[i] &&
        !this.players[i].peer &&
        now - this.players[i].disconnectedAt >= this.reconnectMs
      ) {
        this.players[i] = null;
        changed = true;
      }
    if (changed) {
      this.resetWaiting();
      this.broadcast();
    }
  }
  recordResult() {
    const winner = this.match.mode.winner;
    if (
      this.match.state === "GAME_OVER" &&
      (winner === 0 || winner === 1) &&
      this.lastScoredMatch !== this.matchId
    ) {
      this.seriesScores[winner]++;
      this.lastScoredMatch = this.matchId;
    }
  }
  command(peer, data) {
    if (data.type === "aimGuide") {
      if (this.seatOf(peer) < 0)
        throw new Error("Khán giả không thể đổi Aim guide của phòng.");
      if (typeof data.enabled !== "boolean")
        throw new Error("Thiết lập Aim guide không hợp lệ.");
      this.aimGuide = data.enabled;
      this.broadcast();
      return;
    }
    if (data.type === "rename") {
      if (typeof data.name !== "string" || !data.name.trim())
        throw new Error("Vui lòng nhập tên người chơi.");
      const name = nameOf(data.name),
        seat = this.seatOf(peer);
      if (seat >= 0) this.players[seat].name = name;
      else if (this.spectators.has(peer)) peer.name = name;
      else throw new Error("Bạn chưa vào phòng.");
      peer.send({ type: "renamed", name });
      this.broadcast();
      return;
    }
    if (data.type === "claim") {
      if (this.seatOf(peer) >= 0) return;
      const seat = this.players.findIndex((p) => p === null);
      if (seat < 0)
        throw new Error(
          "Hai ghế đang có người chơi hoặc đang được giữ để kết nối lại.",
        );
      this.spectators.delete(peer);
      peer.seat = seat;
      this.players[seat] = {
        name: peer.name,
        token: token(),
        peer,
        disconnectedAt: null,
      };
      this.ack(peer, this.players[seat].token);
      if (this.ready) this.start();
      this.broadcast();
      return;
    }
    const seat = this.seatOf(peer);
    if (seat < 0)
      throw new Error(
        "Bạn đang xem trận đấu. Khán giả không thể điều khiển bi.",
      );
    if (!this.ready || this.phase !== "playing")
      throw new Error("Đang chờ đủ hai người chơi kết nối.");
    if (data.matchId !== this.matchId)
      throw new Error("Trận đã thay đổi. Vui lòng thử lại.");
    if (data.type === "rematch") {
      this.recordResult();
      if (this.match.state !== "GAME_OVER")
        throw new Error("Chỉ có thể tái đấu sau khi trận kết thúc.");
      this.votes.add(seat);
      if (this.votes.size === 2) this.start();
      this.broadcast();
      return;
    }
    if (data.revision !== this.match.revision)
      throw new Error("Trạng thái vừa thay đổi. Hãy thử lại.");
    if (data.type === "pause") {
      if (!this.match.pause()) throw new Error("Trận đã kết thúc.");
      this.broadcast();
      return;
    }
    if (seat !== this.match.mode.currentPlayer)
      throw new Error("Chưa đến lượt của bạn.");
    if (data.type === "aim" || data.type === "shoot") {
      if (!this.match.canShoot)
        throw new Error("Chờ tất cả bi dừng trước khi đánh.");
      const shot = shotOf(data);
      if (data.type === "aim") {
        Object.assign(this.match, shot);
        this.dirty = true;
      } else if (!this.match.shoot(shot))
        throw new Error("Không thể thực hiện cú đánh.");
    } else if (data.type === "reposition") {
      if (!this.match.repositionCue())
        throw new Error(
          "Bạn chỉ được đặt lại bi trắng trước cú đánh khi có quyền đặt bi.",
        );
    } else if (data.type === "place") {
      if (
        typeof data.x !== "number" ||
        !Number.isFinite(data.x) ||
        typeof data.z !== "number" ||
        !Number.isFinite(data.z) ||
        !this.match.place(data.x, data.z)
      )
        throw new Error("Đặt bi vào vị trí trống bên trong bàn, tránh các lỗ.");
    } else throw new Error("Thao tác không được hỗ trợ.");
    this.lastActive = Date.now();
    if (data.type !== "aim") this.broadcast();
  }
  tick(dt) {
    const before = this.match.revision;
    // An in-flight shot finishes even if a browser disconnects. No new shot can begin.
    if (this.phase === "playing") this.match.step(dt);
    if (before !== this.match.revision) this.broadcast();
  }
  snapshot() {
    this.recordResult();
    const players = this.players.map((p) =>
      p
        ? {
            name: p.name,
            connected: Boolean(p.peer && !p.peer.closed),
            reservedUntil: p.peer ? null : p.disconnectedAt + this.reconnectMs,
          }
        : null,
    );
    return {
      type: "snapshot",
      protocol: 1,
      roomId: this.id,
      matchId: this.matchId,
      seq: ++this.sequence,
      serverTime: Date.now(),
      phase: this.phase,
      ready: this.ready,
      hostSeat: this.hostSeat,
      aimGuide: this.aimGuide,
      seriesScores: [...this.seriesScores],
      players,
      spectatorCount: this.spectators.size,
      spectators: [...this.spectators].slice(0, 12).map((p) => p.name),
      rematchVotes: [...this.votes],
      ...this.match.snapshot(),
    };
  }
  broadcast() {
    this.lastBroadcast = Date.now();
    this.dirty = false;
    const effects = this.match.effects.splice(0);
    const snapshot = this.snapshot();
    snapshot.effects = effects;
    const encoded = JSON.stringify(snapshot);
    for (const peer of this.people) peer.sendEncoded(encoded);
  }
}
