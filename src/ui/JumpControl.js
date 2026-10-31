import "../styles/cue-controls.css";

/** Jump controls share the same shot authorization as angle and power. */
export class JumpControl {
  constructor(game) {
    this.game = game;
    this.level = 0.8;
    document.getElementById("cue-angle-control").insertAdjacentHTML(
      "afterend",
      `
      <section id="jump-control" class="jump-control" aria-label="Điều khiển nhảy bi">
        <button type="button" id="jump-toggle" aria-pressed="false">↗ Nhảy bi</button>
        <div class="jump-level"><label for="jump-level">MỨC NHẢY <output id="jump-value" for="jump-level">80%</output></label><input type="range" id="jump-level" min="10" max="100" step="5" value="80" aria-label="Mức nhảy"></div>
        <span id="jump-help">Đánh thường · bật Nhảy bi để vượt bi cản.</span>
      </section>`,
    );
    this.toggle = document.getElementById("jump-toggle");
    this.range = document.getElementById("jump-level");
    this.toggle.onclick = () => game.setJump(game.jump > 0 ? 0 : this.level);
    this.range.oninput = () => {
      this.level = Number(this.range.value) / 100;
      game.setJump(this.level);
    };
    this.update();
  }
  update() {
    const g = this.game,
      active = g.jump > 0,
      disabled = g.lobbyOpen || !g.canShoot || g.isAI;
    if (active) this.level = g.jump;
    this.toggle.disabled = disabled;
    this.toggle.setAttribute("aria-pressed", String(active));
    this.toggle.textContent = active ? "↗ Nhảy bi · BẬT" : "↗ Nhảy bi";
    this.range.disabled = disabled || !active;
    this.range.value = String(Math.round(this.level * 100));
    document.getElementById("jump-value").textContent =
      `${Math.round(this.level * 100)}%`;
    document.getElementById("jump-help").textContent = active
      ? "Tăng mức nhảy và lực đánh để vượt bi cản. Không có đường dự đoán cho cú nhảy."
      : "Đánh thường · bật Nhảy bi để vượt bi cản.";
  }
}
