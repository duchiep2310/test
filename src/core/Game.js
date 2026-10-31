import { PhysicsEngine } from "../physics/PhysicsEngine.js";
import { createMode } from "../modes/index.js";
import { SceneManager } from "../rendering/SceneManager.js";
import { AIController } from "../ai/AIController.js";
import { AudioManager } from "../audio/AudioManager.js";
import { GameLoop } from "./GameLoop.js";
import { GameState as S } from "./GameState.js";
import { InputController } from "../controls/InputController.js";
import { TABLE, MODES } from "./Constants.js";

export class Game {
  constructor(container, onUpdate) {
    this.onUpdate = onUpdate;
    this.state = S.MENU;
    this.angle = 0;
    this.power = 0.52;
    this.spin = { x: 0, y: 0 };
    this.calledPocket = null;
    this.calledBall = null;
    this.settings = {
      tableColor: "#087f75",
      quality: "medium",
      ballStyle: "classic",
      sensitivity: 1,
      aimGuide: true,
      volume: 0.4,
      music: 0,
      language: "en",
      opponent: "local",
      difficulty: "medium",
      targetScore: 5,
      playerNames: ["Người chơi 1", "Người chơi 2"],
    };
    try {
      Object.assign(
        this.settings,
        JSON.parse(localStorage.getItem("velvet-settings") || "{}"),
      );
    } catch {}
    this.localSeries = { local: [0, 0], ai: [0, 0] };
    try {
      const saved = JSON.parse(localStorage.getItem("velvet-series") || "{}");
      for (const key of ["local", "ai"])
        if (
          Array.isArray(saved[key]) &&
          saved[key].length === 2 &&
          saved[key].every((n) => Number.isSafeInteger(n) && n >= 0)
        )
          this.localSeries[key] = saved[key];
    } catch {}
    this.scene = new SceneManager(container);
    this.audio = new AudioManager();
    this.ai = new AIController();
    this.physics = new PhysicsEngine({
      onEvent: (event) => this.onPhysicsEvent(event),
    });
    this.scene.setSettings(this.settings);
    this.audio.setVolume(this.settings.volume);
    this.audio.setMusicVolume(this.settings.music);
    this.input = new InputController(this);
    this.start("eight");
    this.loop = new GameLoop(
      (dt) => this.fixedUpdate(dt),
      (dt) => this.render(dt),
    );
    this.loop.start();
    this.visibility = () => {
      if (
        !this.online &&
        document.hidden &&
        this.state !== S.PAUSED &&
        this.state !== S.GAME_OVER
      )
        this.pause();
    };
    document.addEventListener("visibilitychange", this.visibility);
  }
  start(id = this.mode?.id || "eight") {
    if (this.online) return this.online.rematch();
    this.state = S.GAME_SETUP;
    this.mode = createMode(id, {
      targetScore: Number(this.settings.targetScore),
    });
    this.physics.pockets = this.mode.pockets;
    // Both implementations can read the public pockets flag; no renderer data enters rules.
    this.physics.setBalls(this.mode.setup());
    this.scene.setMode(this.mode.pockets);
    this.state = this.mode.isBreak ? S.BREAK_SHOT : S.PLAYER_TURN;
    this.shotEvents = [];
    this.shots = 0;
    this.placementAllowed = false;
    this.resultRecorded = false;
    this.shotLog = [];
    this.cushions = 0;
    this.startedAt = Date.now();
    this.pausedTime = 0;
    this.settleTime = 0;
    this.aiDelay = 1.1;
    this.angle = 0;
    this.power = this.mode.pockets ? 0.96 : 0.52;
    this.spin = { x: 0, y: 0 };
    this.finishedAt = null;
    this.calledPocket = null;
    this.calledBall = null;
    this.message = this.mode.pockets
      ? "The table is yours. Use strong power for a legal break."
      : "Connect with both object balls to score. Find your line.";
    this.notify();
  }
  get cue() {
    return this.physics.balls.find((b) => b.id === this.mode.cueId());
  }
  get isAI() {
    if (this.online) return false;
    return this.settings.opponent === "ai" && this.mode.currentPlayer === 1;
  }
  get canShoot() {
    if (this.online) return this.online.canShoot;
    return (
      [S.PLAYER_TURN, S.BREAK_SHOT].includes(this.state) &&
      !this.physics.isMoving() &&
      this.mode.winner == null
    );
  }
  get ballInHand() {
    return this.state === S.BALL_IN_HAND;
  }
  onPhysicsEvent(event) {
    if (![S.SHOT_IN_PROGRESS, S.BALLS_SETTLING].includes(this.state)) return;
    this.shotEvents.push({ ...event });
    if (event.type === "cushion" && event.ball === this.shotCue)
      this.cushions++;
    this.audio.play(event.type, event.strength ?? 0.5);
  }
  shoot(automatic = false) {
    if (this.lobbyOpen) return false;
    if (this.online) return this.online.shoot();
    if (!this.canShoot || (!automatic && this.isAI)) return false;
    const remaining = this.mode.legalTargets(this.physics.balls);
    if (
      (this.mode.id === "ten" ||
        (this.mode.id === "eight" && remaining.includes(8))) &&
      !this.mode.isBreak &&
      this.calledPocket == null
    ) {
      this.message =
        "Call a pocket before shooting. Select one of the six pocket dots.";
      this.notify();
      return false;
    }
    if (
      this.mode.id === "ten" &&
      !this.mode.isBreak &&
      this.calledBall == null
    ) {
      this.calledBall = remaining[0] ?? 10;
    }
    this.initialBalls = this.physics.balls.map((b) => ({
      ...b,
      spin: { ...b.spin },
    }));
    this.shotCue = this.mode.cueId();
    this.shotEvents = [];
    this.cushions = 0;
    this.settleTime = 0;
    const previousState = this.state;
    this.state = S.SHOT_IN_PROGRESS;
    const accepted = this.physics.shoot(
      this.shotCue,
      this.angle,
      Math.max(0.04, this.power),
      this.spin,
    );
    if (!accepted) {
      this.state = previousState;
      return false;
    }
    this.placementAllowed = false;
    this.shots++;
    this.audio.play("cue", this.power);
    this.scene.animateShot?.();
    this.message = "Shot in motion…";
    this.notify();
    return true;
  }
  fixedUpdate(dt) {
    if (this.online || this.lobbyOpen) return;
    if (this.state === S.PAUSED || this.state === S.GAME_OVER) return;
    if ([S.SHOT_IN_PROGRESS, S.BALLS_SETTLING].includes(this.state)) {
      this.physics.step(dt);
      this.state = this.physics.isMoving()
        ? S.SHOT_IN_PROGRESS
        : S.BALLS_SETTLING;
      if (!this.physics.isMoving()) {
        this.settleTime += dt;
        if (this.settleTime > 0.42) this.finishShot();
      } else this.settleTime = 0;
    } else if (this.isAI) {
      this.aiDelay -= dt;
      if (this.aiDelay <= 0) {
        if (this.ballInHand) {
          const p = this.ai.choosePlacement({
            mode: this.mode,
            physics: this.physics,
          });
          if (p) this.place(p.x, p.z, true);
          else this.aiDelay = 0.5;
        } else if (this.canShoot) {
          const shot = this.ai.chooseShot({
            mode: this.mode,
            balls: this.physics.balls,
            difficulty: this.settings.difficulty,
          });
          if (shot) {
            Object.assign(this, {
              angle: shot.angle,
              power: shot.power,
              spin: shot.spin || { x: 0, y: 0 },
              calledBall: shot.calledBall,
              calledPocket: shot.calledPocket,
            });
            this.shoot(true);
          }
        }
      }
    }
  }
  finishShot() {
    const player = this.mode.currentPlayer;
    const result = this.mode.evaluateShot({
      events: this.shotEvents,
      balls: this.physics.balls,
      initialBalls: this.initialBalls,
      calledBall: this.calledBall,
      calledPocket: this.calledPocket,
    });
    for (const id of result.respot || []) this.respot(id);
    this.message = result.message;
    this.shotLog.unshift({
      player,
      message: result.message,
      foul: result.foul,
    });
    this.shotLog = this.shotLog.slice(0, 12);
    this.calledPocket = null;
    this.calledBall = null;
    this.aiDelay = 1.25;
    if (this.mode.winner != null || result.winner != null) {
      this.state = S.GAME_OVER;
      this.finishedAt = Date.now();
      this.recordLocalResult();
      this.audio.play(
        this.mode.winner === 1 && this.settings.opponent === "ai"
          ? "lose"
          : "win",
      );
      this.saveMatch();
    } else if (result.ballInHand) {
      this.state = S.FOUL;
      this.placementAllowed = true;
      const cue = this.cue;
      cue.active = false;
      cue.vx = cue.vz = 0;
      this.state = S.BALL_IN_HAND;
    } else this.state = S.PLAYER_TURN;
    this.notify();
  }
  respot(id) {
    let b = this.physics.balls.find((b) => b.id === id);
    if (!b) return;
    b.active = false;
    const positions = [{ x: 1.4, z: 0 }];
    for (let i = 1; i < 45; i++) positions.push({ x: 1.4 - i * 0.135, z: 0 });
    for (let z = -1.1; z < 1.2; z += 0.15)
      for (let x = -2.5; x < 2.6; x += 0.15) positions.push({ x, z });
    const p = positions.find((p) => this.physics.canPlace(p.x, p.z, id));
    if (p) {
      b.x = p.x;
      b.z = p.z;
      b.vx = b.vz = 0;
      b.spin = { x: 0, y: 0 };
      b.active = true;
    }
  }
  place(x, z, automatic = false) {
    if (this.online) return this.online.place(x, z);
    if (
      !(
        this.ballInHand ||
        (this.state === S.PLAYER_TURN && this.placementAllowed)
      ) ||
      this.physics.isMoving() ||
      (!automatic && this.isAI)
    )
      return false;
    if (this.physics.placeBall(this.mode.cueId(), x, z)) {
      this.placementAllowed = true;
      this.state = S.PLAYER_TURN;
      this.message =
        "Đã đặt bi trắng. Bạn có thể chọn Đặt lại bi trắng trước khi đánh.";
      this.aiDelay = 0.7;
      this.notify();
      return true;
    }
    this.message =
      "Choose a clear spot inside the cushions, away from pockets and other balls.";
    this.notify();
    return false;
  }
  get canReposition() {
    if (this.online)
      return (
        this.online.canAct &&
        this.online.info?.placementAllowed &&
        this.state === S.PLAYER_TURN
      );
    return (
      this.placementAllowed &&
      this.state === S.PLAYER_TURN &&
      !this.isAI &&
      !this.physics.isMoving()
    );
  }
  repositionCue() {
    if (!this.canReposition) return false;
    if (this.online) return this.online.repositionCue();
    this.state = S.BALL_IN_HAND;
    this.message = "Nhấn vị trí trống để đặt lại bi trắng.";
    this.notify();
    return true;
  }
  get seriesScores() {
    return (
      this.online?.info?.seriesScores ||
      this.localSeries[this.settings.opponent === "ai" ? "ai" : "local"]
    );
  }
  recordLocalResult() {
    const winner = this.mode.winner;
    if (this.resultRecorded || (winner !== 0 && winner !== 1)) return;
    this.resultRecorded = true;
    this.seriesScores[winner]++;
    this.persistSeries();
  }
  persistSeries() {
    try {
      localStorage.setItem("velvet-series", JSON.stringify(this.localSeries));
    } catch {}
  }
  resetSeries() {
    if (this.online) return;
    this.seriesScores.fill(0);
    this.persistSeries();
    this.notify();
  }
  applySharedAimGuide(enabled) {
    if (typeof enabled !== "boolean" || this.settings.aimGuide === enabled)
      return;
    this.settings.aimGuide = enabled;
    this.scene.setSettings({ aimGuide: enabled });
    try {
      localStorage.setItem("velvet-settings", JSON.stringify(this.settings));
    } catch {}
  }
  pause() {
    if (this.lobbyOpen) return false;
    if (this.online) return this.online.pause();
    if (this.state === S.PAUSED) {
      this.state = this.previousState;
      this.pausedTime += Date.now() - this.pauseStarted;
    } else if (this.state !== S.GAME_OVER) {
      this.previousState = this.state;
      this.state = S.PAUSED;
      this.pauseStarted = Date.now();
    }
    this.notify();
  }
  setSettings(settings) {
    if (this.online && typeof settings.aimGuide === "boolean") {
      if (settings.aimGuide !== this.settings.aimGuide) {
        if (this.online.seat == null || !this.online.connected)
          this.online.error =
            "Chỉ người chơi đang kết nối được đổi Aim guide của phòng.";
        else this.online.command("aimGuide", { enabled: settings.aimGuide });
      }
      settings = { ...settings };
      delete settings.aimGuide;
    }
    Object.assign(this.settings, settings);
    this.scene.setSettings(this.settings);
    this.audio.setVolume(this.settings.volume);
    this.audio.setMusicVolume(this.settings.music);
    try {
      localStorage.setItem("velvet-settings", JSON.stringify(this.settings));
    } catch {}
    this.notify();
  }
  setPower(power) {
    this.power = Math.max(0.04, Math.min(1, Number(power)));
    this.notify();
  }
  setSpin(x, y) {
    this.spin = {
      x: Math.max(-1, Math.min(1, x)),
      y: Math.max(-1, Math.min(1, y)),
    };
    this.notify();
  }
  render(dt) {
    this.input.update(dt);
    this.online?.update();
    if (this.lobbyOpen) return;
    this.scene.sync(
      this.online?.renderBalls || this.physics.balls,
      this.mode.cueId(),
      dt,
    );
    this.scene.setAim(
      this.angle,
      this.power,
      this.spin,
      this.online ? this.online.showAim : this.canShoot && !this.isAI,
    );
    this.scene.render();
    this.hudTimer = (this.hudTimer || 0) + dt;
    if (this.hudTimer > 0.18) {
      this.hudTimer = 0;
      this.notify();
    }
  }
  notify() {
    this.onUpdate?.(this);
  }
  saveMatch() {
    try {
      let list = JSON.parse(localStorage.getItem("velvet-history") || "[]");
      list.unshift({
        mode: MODES.find((m) => m.id === this.mode.id).name,
        winner: this.playerName(this.mode.winner),
        scores: this.mode.scores,
        seriesScores: [...this.seriesScores],
        duration: this.elapsed,
        date: new Date().toISOString(),
      });
      localStorage.setItem("velvet-history", JSON.stringify(list.slice(0, 20)));
    } catch {}
  }
  playerName(index) {
    return this.online
      ? this.online.info?.players[index]?.name ||
          `Đang chờ người chơi ${index + 1}`
      : index === 1 && this.settings.opponent === "ai"
        ? "The house"
        : this.settings.playerNames?.[index] || `Người chơi ${index + 1}`;
  }
  get elapsed() {
    if (this.online) return this.online.info?.elapsed || 0;
    return Math.max(
      0,
      Math.floor(
        ((this.finishedAt && this.state === S.GAME_OVER
          ? this.finishedAt
          : Date.now()) -
          this.startedAt -
          this.pausedTime -
          (this.state === S.PAUSED ? Date.now() - this.pauseStarted : 0)) /
          1000,
      ),
    );
  }
  dispose() {
    this.online?.leave();
    this.loop.stop();
    this.scene.dispose();
    this.audio.dispose();
    this.input.dispose();
    document.removeEventListener("visibilitychange", this.visibility);
  }
}
