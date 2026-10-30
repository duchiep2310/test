/** Deterministic simulation clock. A slow frame cannot inject a large physics step. */
export class GameLoop {
  constructor(update, render) {
    this.update = update;
    this.render = render;
    this.accumulator = 0;
    this.last = 0;
    this.running = false;
    this.fixedStep = 1 / 240;
  }
  start() {
    if (this.running) return;
    this.running = true;
    this.last = performance.now();
    const frame = (now) => {
      if (!this.running) return;
      const dt = Math.min((now - this.last) / 1000, 0.1);
      this.last = now;
      this.accumulator += dt;
      let steps = 0;
      while (this.accumulator >= this.fixedStep && steps++ < 24) {
        this.update(this.fixedStep);
        this.accumulator -= this.fixedStep;
      }
      this.render(dt);
      this.id = requestAnimationFrame(frame);
    };
    this.id = requestAnimationFrame(frame);
  }
  stop() {
    this.running = false;
    cancelAnimationFrame(this.id);
    this.accumulator = 0;
  }
}
