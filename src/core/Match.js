import { PhysicsEngine } from "../physics/PhysicsEngine.js";
import { createMode } from "../modes/index.js";
import { GameState as S } from "./GameState.js";

/** Headless match used by the authoritative room server. No DOM or rendering. */
export class Match {
  constructor(modeId = "eight", targetScore = 5) {
    this.mode = createMode(modeId, { targetScore });
    this.physics = new PhysicsEngine({
      pockets: this.mode.pockets,
      onEvent: (e) => this.onEvent(e),
    });
    this.physics.setBalls(this.mode.setup());
    this.state = this.mode.isBreak ? S.BREAK_SHOT : S.PLAYER_TURN;
    this.shots = 0;
    this.revision = 0;
    this.events = [];
    this.effects = [];
    this.cushions = 0;
    this.angle = 0;
    this.power = this.mode.pockets ? 0.96 : 0.52;
    this.spin = { x: 0, y: 0 };
    this.calledPocket = this.calledBall = null;
    this.settleTime = 0;
    this.startedAt = Date.now();
    this.pausedTime = 0;
    this.finishedAt = null;
    this.message = "Đủ hai người. Chủ bàn đánh trước. Chúc một trận đấu hay!";
  }
  get canShoot() {
    return (
      [S.BREAK_SHOT, S.PLAYER_TURN].includes(this.state) &&
      !this.physics.isMoving()
    );
  }
  get cue() {
    return this.physics.balls.find((b) => b.id === this.mode.cueId());
  }
  onEvent(event) {
    this.events.push(event);
    if (event.type === "cushion" && event.ball === this.shotCue)
      this.cushions++;
    // Effects may be coalesced without losing ANY events used by rules.
    if (this.effects.length < 40) this.effects.push(event);
  }
  shoot(shot) {
    if (!this.canShoot) return false;
    const targets = this.mode.legalTargets(this.physics.balls);
    const called =
      !this.mode.isBreak &&
      (this.mode.id === "ten" ||
        (this.mode.id === "eight" && targets.includes(8)));
    if (called && shot.calledPocket == null)
      throw new Error("Chọn lỗ được gọi trước khi đánh.");
    this.initialBalls = this.physics.balls.map((b) => ({
      ...b,
      spin: { ...b.spin },
    }));
    this.shotCue = this.mode.cueId();
    this.events = [];
    this.effects = [];
    this.cushions = 0;
    Object.assign(this, shot);
    if (this.mode.id === "ten" && this.calledBall == null)
      this.calledBall = targets[0];
    if (!this.physics.shoot(this.shotCue, this.angle, this.power, this.spin))
      return false;
    this.effects.push({ type: "cue", strength: this.power });
    this.state = S.SHOT_IN_PROGRESS;
    this.settleTime = 0;
    this.shots++;
    this.revision++;
    this.message = "Bi đang lăn…";
    return true;
  }
  step(dt) {
    if (![S.SHOT_IN_PROGRESS, S.BALLS_SETTLING].includes(this.state)) return;
    this.physics.step(dt);
    if (this.physics.isMoving()) {
      this.state = S.SHOT_IN_PROGRESS;
      this.settleTime = 0;
    } else {
      this.state = S.BALLS_SETTLING;
      this.settleTime += dt;
      if (this.settleTime > 0.42) this.finish();
    }
  }
  finish() {
    const result = this.mode.evaluateShot({
      events: this.events,
      balls: this.physics.balls,
      initialBalls: this.initialBalls,
      calledPocket: this.calledPocket,
      calledBall: this.calledBall,
    });
    for (const id of result.respot || []) this.respot(id);
    this.calledPocket = this.calledBall = null;
    this.spin = { x: 0, y: 0 };
    this.message = result.message;
    if (this.mode.winner != null) {
      this.state = S.GAME_OVER;
      this.finishedAt = Date.now();
    } else if (result.ballInHand) {
      this.cue.active = false;
      this.cue.vx = this.cue.vz = 0;
      this.state = S.BALL_IN_HAND;
    } else this.state = S.PLAYER_TURN;
    this.revision++;
  }
  respot(id) {
    const b = this.physics.balls.find((b) => b.id === id);
    if (!b) return;
    b.active = false;
    for (let i = 0; i < 1600; i++) {
      const p =
        i < 40
          ? { x: 1.4 - i * 0.135, z: 0 }
          : {
              x: -2.5 + (i % 34) * 0.15,
              z: -1.1 + Math.floor((i - 40) / 34) * 0.15,
            };
      if (this.physics.canPlace(p.x, p.z, id)) {
        this.physics.placeBall(id, p.x, p.z);
        return;
      }
    }
    throw new Error("No legal respot location");
  }
  place(x, z) {
    if (
      this.state !== S.BALL_IN_HAND ||
      !this.physics.placeBall(this.mode.cueId(), x, z)
    )
      return false;
    this.state = S.PLAYER_TURN;
    this.message = "Đã đặt bi cái. Đến lượt bạn đánh.";
    this.revision++;
    return true;
  }
  pause() {
    if (this.state === S.GAME_OVER) return false;
    if (this.state === S.PAUSED) {
      this.state = this.previousState;
      this.pausedTime += Date.now() - this.pauseStarted;
    } else {
      this.previousState = this.state;
      this.state = S.PAUSED;
      this.pauseStarted = Date.now();
    }
    this.revision++;
    return true;
  }
  get elapsed() {
    return Math.max(
      0,
      Math.floor(
        ((this.finishedAt || Date.now()) -
          this.startedAt -
          this.pausedTime -
          (this.state === S.PAUSED ? Date.now() - this.pauseStarted : 0)) /
          1000,
      ),
    );
  }
  snapshot() {
    const { id, currentPlayer, scores, groups, winner, isBreak, targetScore } =
      this.mode;
    return {
      mode: { id, currentPlayer, scores, groups, winner, isBreak, targetScore },
      state: this.state,
      revision: this.revision,
      shots: this.shots,
      cushions: this.cushions,
      elapsed: this.elapsed,
      message: this.message,
      aim: {
        angle: this.angle,
        power: this.power,
        spin: { ...this.spin },
        calledPocket: this.calledPocket,
        calledBall: this.calledBall,
      },
      balls: this.physics.balls.map((b) => ({
        id: b.id,
        x: b.x,
        z: b.z,
        vx: b.vx,
        vz: b.vz,
        radius: b.radius,
        mass: b.mass,
        active: b.active,
        spin: { ...b.spin },
        angularVelocity: b.angularVelocity,
        pocket: b.pocket,
      })),
    };
  }
}
