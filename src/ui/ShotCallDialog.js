import "../styles/cue-controls.css";

const POCKET_NAMES = [
  "Trên trái",
  "Trên giữa",
  "Trên phải",
  "Dưới trái",
  "Dưới giữa",
  "Dưới phải",
];

/** Make the required called pocket an explicit step of the Shoot action. */
export class ShotCallDialog {
  constructor(game) {
    this.game = game;
    document.body.insertAdjacentHTML(
      "beforeend",
      `
      <dialog id="shot-call-dialog" aria-labelledby="shot-call-title" aria-describedby="shot-call-description">
        <div class="eyebrow">HOÀN TẤT CÚ ĐÁNH</div><h2 id="shot-call-title">Chọn lỗ cho bi số 8</h2>
        <p id="shot-call-description"></p>
        <div class="shot-call-board" role="group" aria-label="Chọn lỗ được gọi">
          ${POCKET_NAMES.map((name, i) => `<button type="button" data-shot-pocket="${i}" aria-pressed="false"><strong>${i + 1}</strong><span>${name}</span></button>`).join("")}
          <span id="shot-call-ball" aria-hidden="true">8</span>
        </div>
        <p id="shot-call-selection" role="status">Chưa chọn lỗ.</p>
        <div class="modal-buttons"><button type="button" class="secondary" id="shot-call-cancel">Quay lại ngắm</button><button type="button" class="primary" id="shot-call-confirm" disabled>Đánh bi số 8</button></div>
      </dialog>`,
    );
    this.dialog = document.getElementById("shot-call-dialog");
    this.confirm = document.getElementById("shot-call-confirm");
    this.pockets = [...this.dialog.querySelectorAll("[data-shot-pocket]")];
    game.onCallRequired = () => this.open();
    for (const button of this.pockets)
      button.onclick = () => {
        if (!this.isCurrent()) return this.dialog.close();
        this.selected = Number(button.dataset.shotPocket);
        for (const pocket of this.pockets)
          pocket.setAttribute("aria-pressed", String(pocket === button));
        this.confirm.disabled = false;
        document.getElementById("shot-call-selection").textContent =
          `Lỗ ${this.selected + 1} · ${POCKET_NAMES[this.selected]}`;
      };
    document.getElementById("shot-call-cancel").onclick = () =>
      this.dialog.close();
    this.confirm.onclick = () => {
      if (!this.isCurrent() || this.selected == null)
        return this.dialog.close();
      game.calledPocket = this.selected;
      this.dialog.close();
      game.shoot();
    };
    this.dialog.onclose = () => {
      this.context = null;
    };
  }
  open() {
    const g = this.game;
    if (this.dialog.open || !g.canShoot || g.isAI || !g.needsPocketCall) return;
    this.context = {
      mode: g.mode,
      player: g.mode.currentPlayer,
      shots: g.shots,
      matchId: g.online?.info?.matchId,
    };
    this.selected = null;
    this.confirm.disabled = true;
    for (const pocket of this.pockets)
      pocket.setAttribute("aria-pressed", "false");
    const eight = g.mode.id === "eight";
    document.getElementById("shot-call-title").textContent = eight
      ? "Chọn lỗ cho bi số 8"
      : "Chọn lỗ cho cú đánh";
    document.getElementById("shot-call-description").textContent = eight
      ? "Bạn đã dọn hết nhóm bi. Chọn lỗ muốn đưa bi đen vào, rồi xác nhận đánh. Bi số 8 vào lỗ khác sẽ thua."
      : "Chọn lỗ cho bi đã gọi, rồi xác nhận đánh. Cú đánh dùng góc cơ, lực và xoáy bạn vừa chọn.";
    document.getElementById("shot-call-ball").textContent = eight
      ? "8"
      : String(g.calledBall ?? g.mode.legalTargets(g.physics.balls)[0] ?? 10);
    document.getElementById("shot-call-selection").textContent =
      "Chưa chọn lỗ. Chọn số tương ứng với lỗ trên bàn.";
    this.confirm.textContent = eight ? "Đánh bi số 8" : "Xác nhận và đánh";
    this.dialog.showModal();
  }
  isCurrent() {
    const g = this.game,
      c = this.context;
    return (
      c &&
      !g.lobbyOpen &&
      g.canShoot &&
      !g.isAI &&
      g.needsPocketCall &&
      c.mode === g.mode &&
      c.player === g.mode.currentPlayer &&
      c.shots === g.shots &&
      c.matchId === g.online?.info?.matchId
    );
  }
  update() {
    if (this.dialog.open && !this.isCurrent()) this.dialog.close();
  }
}
