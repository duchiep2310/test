import { createMode } from "../modes/index.js";

const STORE = "velvet-room-session";
export async function roomServerUrl() {
  let configured = import.meta.env.VITE_ROOM_SERVER || "";
  if (!configured) {
    try {
      const response = await fetch(
        new URL("./online-config.json", document.baseURI),
        { cache: "no-store" },
      );
      if (response.ok) configured = (await response.json()).serverUrl || "";
    } catch {}
  }
  if (!configured && location.hostname.endsWith(".github.io"))
    throw new Error(
      "Phòng online chưa được kích hoạt trên website này. Bạn vẫn có thể chọn Đấu với máy.",
    );
  const url = new URL(configured || location.origin);
  if (
    !["https:", "http:", "wss:", "ws:"].includes(url.protocol) ||
    url.username ||
    url.password
  )
    throw new Error("Địa chỉ máy chủ online không hợp lệ.");
  if (location.protocol === "https:" && ["http:", "ws:"].includes(url.protocol))
    throw new Error("Máy chủ online cần kết nối HTTPS an toàn.");
  url.protocol = ["https:", "wss:"].includes(url.protocol) ? "wss:" : "ws:";
  url.pathname = "/ws";
  url.search = "";
  url.hash = "";
  return url.href;
}

/** Only the server executes online physics. This client interpolates snapshots. */
export class RoomClient {
  constructor(game, onChange = () => {}) {
    this.game = game;
    this.onChange = onChange;
    this.connected = false;
    this.closed = false;
    this.seat = null;
    this.info = null;
    this.pending = false;
    this.frames = [];
    this.name = "Khách";
    this.retry = 0;
    this.lastAimAt = 0;
  }
  static saved() {
    try {
      return JSON.parse(sessionStorage.getItem(STORE) || "null");
    } catch {
      return null;
    }
  }
  get canAct() {
    return (
      this.connected &&
      this.info?.ready &&
      this.info.phase === "playing" &&
      this.seat === this.game.mode.currentPlayer &&
      !this.pending
    );
  }
  get canShoot() {
    return (
      this.canAct && ["PLAYER_TURN", "BREAK_SHOT"].includes(this.game.state)
    );
  }
  get showAim() {
    return (
      this.connected &&
      this.info?.ready &&
      ["PLAYER_TURN", "BREAK_SHOT"].includes(this.game.state)
    );
  }
  async connect(data) {
    this.closed = false;
    this.request = data;
    this.name = data.name || this.name;
    this.url = await roomServerUrl();
    if (this.closed) throw new Error("Đã hủy kết nối.");
    return this.open(false);
  }
  open(reconnecting) {
    return new Promise((resolve, reject) => {
      const socket = (this.socket = new WebSocket(this.url));
      let settled = false;
      const finish = (error) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        error ? reject(error) : resolve(this);
      };
      const timer = setTimeout(() => {
        finish(
          new Error(
            "Chưa kết nối được máy chủ. Máy chủ có thể đang khởi động; hãy thử lại sau ít phút.",
          ),
        );
        socket.close();
      }, 25000);
      socket.addEventListener("open", () => {
        const data = reconnecting
          ? {
              type: "join",
              roomId: this.roomId,
              name: this.name,
              spectate: this.seat == null,
              resumeToken: this.resumeToken,
            }
          : this.request;
        socket.send(JSON.stringify(data));
      });
      socket.addEventListener("message", (event) => {
        if (this.closed) return;
        let data;
        try {
          data = JSON.parse(event.data);
        } catch {
          return;
        }
        if (data.type === "joined") {
          this.roomId = data.roomId;
          this.seat = data.seat;
          this.resumeToken = data.resumeToken;
          this.connected = true;
          this.retry = 0;
          this.game.online = this;
          try {
            sessionStorage.setItem(
              STORE,
              JSON.stringify({
                roomId: this.roomId,
                resumeToken: this.resumeToken,
                seat: this.seat,
                name: this.name,
              }),
            );
          } catch {}
        } else if (data.type === "renamed") {
          this.name = data.name;
          try {
            localStorage.setItem("velvet-player-name", data.name);
            const saved = RoomClient.saved();
            if (saved?.roomId === this.roomId)
              sessionStorage.setItem(
                STORE,
                JSON.stringify({ ...saved, name: data.name }),
              );
          } catch {}
          this.game.setSettings({
            playerNames: [
              data.name,
              this.game.settings.playerNames?.[1] || "Người chơi 2",
            ],
          });
          this.game.notify();
          this.onChange(this);
        } else if (data.type === "snapshot" && this.connected) {
          this.receive(data);
          finish();
        } else if (data.type === "error") {
          this.pending = false;
          this.error = data.message;
          if (!settled) {
            finish(new Error(data.message));
            this.closed = true;
            socket.close();
            if (reconnecting) this.connectionLost = true;
          }
          this.game.notify();
          this.onChange(this);
        } else if (data.type === "replaced") {
          this.closed = true;
          this.connected = false;
          this.error = data.message;
          this.clearSaved();
          this.game.notify();
          this.onChange(this);
          finish(new Error(data.message));
        }
      });
      socket.addEventListener("close", () => {
        const hadSession = Boolean(this.roomId);
        this.connected = false;
        this.pending = false;
        finish(new Error("Kết nối máy chủ đã đóng. Vui lòng thử lại."));
        if (hadSession && !this.closed) {
          this.error = "Mất kết nối. Đang thử kết nối lại…";
          this.frames = [];
          if (!this.disconnectedAt) this.disconnectedAt = Date.now();
          if (Date.now() - this.disconnectedAt < 60000)
            this.retryTimer = setTimeout(
              () =>
                this.open(true).catch((error) => {
                  this.error = error.message;
                  this.onChange(this);
                }),
              Math.min(1000 * 2 ** this.retry++, 5000),
            );
          else {
            this.connectionLost = true;
            this.error =
              "Kết nối đã hết thời gian giữ ghế. Hãy về sảnh và vào lại phòng.";
            this.clearSaved();
          }
        }
        this.game.notify();
        this.onChange(this);
      });
      socket.addEventListener("error", () => {
        /* close supplies a user-facing message */
      });
    });
  }
  receive(snapshot) {
    const g = this.game;
    const previous = this.info;
    if (
      previous &&
      previous.matchId === snapshot.matchId &&
      snapshot.seq <= previous.seq
    )
      return;
    const changedMatch = !previous || previous.matchId !== snapshot.matchId;
    const changedRevision =
      changedMatch || previous.revision !== snapshot.revision;
    if (changedMatch) {
      g.mode = createMode(snapshot.mode.id, {
        targetScore: snapshot.mode.targetScore,
      });
      g.scene.setMode(g.mode.pockets);
      this.frames = [];
      this.lastSavedMatch = null;
    }
    this.info = snapshot;
    this.error = "";
    this.disconnectedAt = null;
    this.connectionLost = false;
    if (changedRevision) {
      this.pending = false;
      this.lastAim = null;
    }
    const ownsAim =
      this.seat === snapshot.mode.currentPlayer &&
      snapshot.ready &&
      ["PLAYER_TURN", "BREAK_SHOT"].includes(snapshot.state) &&
      !changedRevision;
    Object.assign(g.mode, snapshot.mode);
    g.physics.pockets = g.mode.pockets;
    g.physics.setBalls(snapshot.balls);
    g.state = snapshot.state;
    g.placementAllowed = Boolean(snapshot.placementAllowed);
    const guideChanged =
      typeof snapshot.aimGuide === "boolean" &&
      snapshot.aimGuide !== g.settings.aimGuide;
    g.applySharedAimGuide(snapshot.aimGuide);
    g.shots = snapshot.shots;
    g.cushions = snapshot.cushions;
    g.message = snapshot.message;
    if (!ownsAim)
      Object.assign(g, snapshot.aim, { spin: { ...snapshot.aim.spin } });
    this.frames.push({ at: performance.now(), balls: snapshot.balls });
    if (this.frames.length > 10) this.frames.shift();
    for (const e of snapshot.effects || [])
      g.audio.play(e.type, e.strength ?? 0.5);
    if (
      snapshot.state === "GAME_OVER" &&
      this.lastSavedMatch !== snapshot.matchId
    ) {
      this.lastSavedMatch = snapshot.matchId;
      g.audio.play(
        this.seat != null && g.mode.winner !== this.seat ? "lose" : "win",
      );
      if (this.seat != null) g.saveMatch();
    }
    if (changedRevision || guideChanged || previous?.ready !== snapshot.ready)
      g.notify();
    this.onChange(this);
  }
  send(data) {
    if (!this.connected || this.socket?.readyState !== WebSocket.OPEN)
      return false;
    this.socket.send(JSON.stringify(data));
    return true;
  }
  command(type, data = {}) {
    if (!this.info) return false;
    return this.send({
      type,
      matchId: this.info.matchId,
      revision: this.info.revision,
      ...data,
    });
  }
  shotData() {
    const g = this.game;
    return {
      angle: g.angle,
      power: g.power,
      spin: { ...g.spin },
      calledBall: g.calledBall,
      calledPocket: g.calledPocket,
    };
  }
  shoot() {
    if (!this.canShoot) return false;
    const sent = this.command("shoot", this.shotData());
    if (sent) {
      this.pending = true;
      this.pendingAt = performance.now();
      this.game.notify();
    }
    return sent;
  }
  place(x, z) {
    if (
      !this.canAct ||
      !(this.game.state === "BALL_IN_HAND" || this.game.canReposition)
    )
      return false;
    const sent = this.command("place", { x, z });
    if (sent) {
      this.pending = true;
      this.pendingAt = performance.now();
    }
    return sent;
  }
  repositionCue() {
    if (!this.game.canReposition) return false;
    const sent = this.command("reposition");
    if (sent) {
      this.pending = true;
      this.pendingAt = performance.now();
    }
    return sent;
  }
  pause() {
    if (this.seat != null && this.connected && this.info?.ready)
      this.command("pause");
  }
  rematch() {
    if (this.seat != null && this.game.state === "GAME_OVER")
      this.command("rematch");
    else {
      this.error =
        "Phòng online chỉ tái đấu khi trận kết thúc và cả hai người đồng ý.";
      this.game.notify();
    }
  }
  claimSeat() {
    return this.command("claim");
  }
  update() {
    const now = performance.now();
    if (this.pending && now - this.pendingAt > 3000) {
      this.pending = false;
      this.error = "Cú đánh chưa được xác nhận. Kiểm tra kết nối rồi thử lại.";
    }
    if (this.canShoot && now - this.lastAimAt > 80) {
      const shot = this.shotData(),
        key = JSON.stringify(shot);
      if (key !== this.lastAim) {
        this.command("aim", shot);
        this.lastAim = key;
      }
      this.lastAimAt = now;
    }
    if (!this.frames.length) {
      this.renderBalls = this.game.physics.balls;
      return;
    }
    const target = now - 90;
    while (this.frames.length > 2 && this.frames[1].at < target)
      this.frames.shift();
    const a = this.frames[0],
      b = this.frames[1] || a;
    const alpha =
      a === b
        ? 1
        : Math.max(0, Math.min(1, (target - a.at) / (b.at - a.at || 1)));
    this.renderBalls = b.balls.map((ball, i) => {
      const before = a.balls[i];
      if (
        !before ||
        before.id !== ball.id ||
        before.active !== ball.active ||
        Math.hypot(before.x - ball.x, before.z - ball.z) > 1
      )
        return ball;
      return {
        ...ball,
        x: before.x + (ball.x - before.x) * alpha,
        z: before.z + (ball.z - before.z) * alpha,
      };
    });
  }
  clearSaved() {
    try {
      const saved = RoomClient.saved();
      if (saved?.roomId === (this.roomId || this.request?.roomId))
        sessionStorage.removeItem(STORE);
    } catch {}
  }
  leave() {
    this.closed = true;
    clearTimeout(this.retryTimer);
    this.send({ type: "leave" });
    this.clearSaved();
    this.socket?.close();
    this.connected = false;
    if (this.game.online === this) {
      this.game.online = null;
      this.game.start();
    }
    this.onChange(null);
  }
}
