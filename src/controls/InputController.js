/** Pointer and keyboard input only; world projection and shot validation stay in their owners. */
export class InputController {
  constructor(game) {
    this.game = game;
    this.canvas = game.scene.canvas;
    this.pointers = new Map();
    this.listeners = [];
    this.keys = new Set();
    this.cueTurns = new Map();
    const on = (target, type, fn, options) => {
      target.addEventListener(type, fn, options);
      this.listeners.push(() => target.removeEventListener(type, fn, options));
    };
    const aim = (e) => {
      const p = game.scene.screenToTable(e.clientX, e.clientY);
      if (p && game.cue)
        game.setAngle(Math.atan2(p.z - game.cue.z, p.x - game.cue.x));
    };
    on(this.canvas, "contextmenu", (e) => e.preventDefault());
    on(this.canvas, "pointerdown", (e) => {
      if (e.button !== 0 && e.button !== 2) return;
      game.audio.play("button", 0.05);
      this.canvas.setPointerCapture(e.pointerId);
      this.pointers.set(e.pointerId, {
        x: e.clientX,
        y: e.clientY,
        startY: e.clientY,
        orbit: e.button === 2 || e.altKey,
        charge: e.shiftKey,
        multitouch: false,
      });
      if (this.pointers.size > 1) {
        for (const p of this.pointers.values()) p.multitouch = true;
        this.gesture = this.touchGeometry();
        return;
      }
      if (game.ballInHand) {
        const p = game.scene.screenToTable(e.clientX, e.clientY);
        if (p) game.place(p.x, p.z);
      } else if (game.canShoot && !game.isAI && !e.altKey && e.button === 0)
        aim(e);
    });
    on(this.canvas, "pointermove", (e) => {
      const p = this.pointers.get(e.pointerId);
      if (!p) return;
      const dx = e.clientX - p.x,
        dy = e.clientY - p.y;
      p.x = e.clientX;
      p.y = e.clientY;
      if (this.pointers.size > 1) {
        const next = this.touchGeometry();
        if (this.gesture) {
          game.scene.orbit(
            (next.x - this.gesture.x) * 1.5,
            (next.y - this.gesture.y) * 1.5,
          );
          if (Math.abs(next.distance - this.gesture.distance) > 1)
            game.scene.zoom((this.gesture.distance - next.distance) * 2);
        }
        this.gesture = next;
        return;
      }
      if (p.multitouch) return;
      if (p.orbit) game.scene.orbit(dx, dy);
      else if (p.charge) game.setPower(0.1 + (e.clientY - p.startY) / 180);
      else if (game.canShoot && !game.isAI) aim(e);
    });
    const up = (e) => {
      const p = this.pointers.get(e.pointerId);
      if (p?.charge && !p.multitouch) game.shoot();
      this.pointers.delete(e.pointerId);
      this.gesture = null;
    };
    on(this.canvas, "pointerup", up);
    on(this.canvas, "pointercancel", (e) => {
      this.pointers.delete(e.pointerId);
      this.gesture = null;
    });
    on(
      this.canvas,
      "wheel",
      (e) => {
        e.preventDefault();
        game.scene.zoom(e.deltaY);
      },
      { passive: false },
    );
    on(window, "keydown", (e) => {
      if (
        game.lobbyOpen ||
        e.target.matches("input,select,textarea,[contenteditable=true]") ||
        e.target.closest('[role="slider"]') ||
        document.querySelector("dialog[open]")
      )
        return;
      if (["ArrowLeft", "ArrowRight"].includes(e.code)) {
        e.preventDefault();
        game.setAngle(
          game.angle + ((e.code === "ArrowLeft" ? -1 : 1) * Math.PI) / 1800,
        );
        return;
      }
      if (
        [
          "KeyW",
          "KeyA",
          "KeyS",
          "KeyD",
          "Equal",
          "Minus",
          "NumpadAdd",
          "NumpadSubtract",
        ].includes(e.code)
      ) {
        e.preventDefault();
        this.keys.add(e.code);
        return;
      }
      if (e.code === "KeyR") {
        e.preventDefault();
        if (!e.repeat) game.scene.resetCamera();
        return;
      }
      if (e.code === "Space" && e.target.closest("button,a")) return;
      if (e.code === "Space") {
        e.preventDefault();
        game.shoot();
      }
      if (e.code === "Escape") game.pause();
    });
    on(window, "keyup", (e) => this.keys.delete(e.code));
    on(window, "blur", () => {
      this.keys.clear();
      this.cueTurns.clear();
    });
    on(document, "visibilitychange", () => {
      if (document.hidden) {
        this.keys.clear();
        this.cueTurns.clear();
      }
    });
  }
  beginCueTurn(direction) {
    if (this.game.setAngle(this.game.angle + (direction * Math.PI) / 1800))
      this.cueTurns.set(direction, performance.now());
  }
  endCueTurn(direction) {
    this.cueTurns.delete(direction);
  }
  update(dt) {
    const active = document.activeElement;
    if (
      this.game.lobbyOpen ||
      document.hidden ||
      document.querySelector("dialog[open]") ||
      active?.closest("input,select,textarea,[contenteditable=true]")
    ) {
      this.keys.clear();
      this.cueTurns.clear();
      return;
    }
    if (!this.game.canShoot || this.game.isAI) this.cueTurns.clear();
    let turn = 0;
    const now = performance.now();
    for (const [direction, started] of this.cueTurns)
      if (now - started > 250) turn += direction;
    if (turn)
      this.game.setAngle(
        this.game.angle + (turn * Math.min(dt, 0.05) * Math.PI) / 18,
      );
    if (!this.keys.size) return;
    const right = Number(this.keys.has("KeyD")) - Number(this.keys.has("KeyA"));
    const forward =
      Number(this.keys.has("KeyW")) - Number(this.keys.has("KeyS"));
    const length = Math.hypot(right, forward),
      step = Math.min(dt, 0.05);
    if (length) {
      const distance =
        1.8 * step * this.game.scene.zoomLevel * this.game.scene.sensitivity;
      this.game.scene.pan(
        (right / length) * distance,
        (forward / length) * distance,
      );
    }
    const zoom =
      Number(this.keys.has("Minus") || this.keys.has("NumpadSubtract")) -
      Number(this.keys.has("Equal") || this.keys.has("NumpadAdd"));
    if (zoom) this.game.scene.adjustZoom(zoom * step);
  }
  touchGeometry() {
    const [a, b] = this.pointers.values();
    return {
      x: (a.x + b.x) / 2,
      y: (a.y + b.y) / 2,
      distance: Math.hypot(a.x - b.x, a.y - b.y),
    };
  }
  dispose() {
    this.listeners.forEach((remove) => remove());
    this.pointers.clear();
    this.keys.clear();
    this.cueTurns.clear();
  }
}
