import "../styles/cue-controls.css";

/** Absolute angle and fine nudges control the cue, independently of the camera. */
export class CueAngleControl {
  constructor(game) {
    this.game = game;
    document.querySelector(".table-footer").insertAdjacentHTML(
      "beforebegin",
      `
      <section class="cue-angle-control" id="cue-angle-control" aria-label="Điều chỉnh góc cơ">
        <div class="cue-angle-heading"><label for="cue-angle-range">GÓC CƠ</label><output id="cue-angle-value" for="cue-angle-range">0.0°</output></div>
        <button type="button" id="cue-angle-left" aria-label="Xoay cơ ngược chiều kim đồng hồ" title="Xoay cơ −0,1° · giữ để xoay liên tục">↶</button>
        <div class="cue-angle-track"><input type="range" id="cue-angle-range" min="0" max="359.9" step="0.1" value="0" aria-label="Điều chỉnh góc cơ"><div class="cue-angle-scale"><span>0°</span><span>180°</span><span>360°</span></div></div>
        <button type="button" id="cue-angle-right" aria-label="Xoay cơ cùng chiều kim đồng hồ" title="Xoay cơ +0,1° · giữ để xoay liên tục">↷</button>
        <span id="cue-angle-help">Kéo để ngắm · ← / → chỉnh 0,1° · Giữ nút để xoay liên tục</span>
      </section>`,
    );
    this.range = document.getElementById("cue-angle-range");
    this.value = document.getElementById("cue-angle-value");
    this.buttons = [-1, 1].map((direction) => {
      const button = document.getElementById(
        direction < 0 ? "cue-angle-left" : "cue-angle-right",
      );
      button.onpointerdown = (event) => {
        if (event.button !== 0 || button.disabled) return;
        event.preventDefault();
        button.focus({ preventScroll: true });
        button.setPointerCapture(event.pointerId);
        game.input.beginCueTurn(direction);
      };
      const release = () => game.input.endCueTurn(direction);
      button.onpointerup = release;
      button.onpointercancel = release;
      button.onlostpointercapture = release;
      button.onclick = (event) => {
        if (event.detail === 0)
          game.setAngle(game.angle + (direction * Math.PI) / 1800);
      };
      return button;
    });
    this.range.oninput = () =>
      game.setAngle((Number(this.range.value) * Math.PI) / 180);
    this.update();
  }
  update() {
    const g = this.game,
      disabled = g.lobbyOpen || !g.canShoot || g.isAI;
    this.range.disabled = disabled;
    for (const button of this.buttons) button.disabled = disabled;
    const degrees = ((((g.angle * 180) / Math.PI) % 360) + 360) % 360;
    // Avoid rounding 359.99° to 360° across the range's seam.
    const value = (Math.round(degrees * 10) % 3600) / 10;
    if (Number(this.range.value) !== value) this.range.value = String(value);
    this.range.setAttribute("aria-valuetext", `${value.toFixed(1)} độ`);
    this.value.textContent = `${value.toFixed(1)}°`;
    document.getElementById("cue-angle-help").textContent = disabled
      ? "Chỉnh góc cơ khi đến lượt bạn và tất cả bi đã dừng."
      : "Kéo để ngắm · ← / → chỉnh 0,1° · Giữ nút để xoay liên tục";
  }
}
