import "../styles/match-controls.css";

/** Match navigation, local camera controls, and shared series score display. */
export class MatchControls {
  constructor(game, lobby) {
    this.game = game;
    document.querySelector("#online-room").insertAdjacentHTML(
      "beforebegin",
      `
      <section id="match-tools" class="match-tools" aria-label="Thanh điều hướng trận đấu">
        <nav aria-label="Điều hướng"><button id="tools-lobby">Sảnh chơi</button><button id="tools-rules">Luật chơi</button><button id="tools-names">Đổi tên</button><button id="tools-settings">Cài đặt</button></nav>
        <div class="camera-pad" role="group" aria-label="Điều hướng góc nhìn"><span>Góc nhìn</span><button data-camera="KeyA" aria-label="Dịch góc nhìn sang trái">←</button><button data-camera="KeyW" aria-label="Dịch góc nhìn tiến">↑</button><button data-camera="KeyS" aria-label="Dịch góc nhìn lùi">↓</button><button data-camera="KeyD" aria-label="Dịch góc nhìn sang phải">→</button></div>
      </section>
      <section id="series-scoreboard" class="series-scoreboard" aria-label="Tỉ số chung cuộc hai người">
        <div class="series-heading"><span id="series-heading">TỈ SỐ ĐỐI ĐẦU</span><small>SỐ VÁN THẮNG</small></div>
        <div class="series-duel"><strong id="series-name-0"></strong><span id="series-values">0 — 0</span><strong id="series-name-1"></strong></div>
        <div class="series-meta"><span id="series-explanation"></span><button id="reset-series">Đặt lại tỉ số</button></div>
      </section>
      <div id="cue-placement-tools" class="cue-placement-tools" hidden><button id="reposition-cue">Đặt lại bi trắng</button><span id="placement-help"></span></div>`,
    );
    const q = (id) => document.getElementById(id);
    q("tools-lobby").onclick = () => lobby.show();
    q("tools-rules").onclick = () => q("instructions").click();
    q("tools-names").onclick = () => lobby.editNames();
    q("tools-settings").onclick = () => q("settings").click();
    q("reposition-cue").onclick = () => game.repositionCue();
    q("reset-series").onclick = () => {
      if (!game.online && window.confirm("Đặt tỉ số số ván thắng về 0 — 0?"))
        game.resetSeries();
    };
    for (const button of document.querySelectorAll("[data-camera]")) {
      const code = button.dataset.camera;
      button.onpointerdown = (e) => {
        if (e.button !== 0) return;
        e.preventDefault();
        button.focus({ preventScroll: true });
        button.setPointerCapture(e.pointerId);
        game.input.keys.add(code);
      };
      const release = () => game.input.keys.delete(code);
      button.onpointerup = release;
      button.onpointercancel = release;
      button.onlostpointercapture = release;
      button.onclick = (e) => {
        if (e.detail === 0) {
          const directions = {
            KeyA: [-0.2, 0],
            KeyD: [0.2, 0],
            KeyW: [0, 0.2],
            KeyS: [0, -0.2],
          };
          game.scene.pan(...directions[code]);
        }
      };
    }
    this.update();
  }
  update() {
    const g = this.game,
      q = (id) => document.getElementById(id),
      scores = g.seriesScores;
    for (let i = 0; i < 2; i++) {
      const el = q("series-name-" + i),
        name = g.playerName(i);
      if (el.textContent !== name) el.textContent = name;
      el.title = name;
    }
    const value = `${scores[0]} — ${scores[1]}`;
    if (q("series-values").textContent !== value)
      q("series-values").textContent = value;
    q("series-heading").textContent =
      g.state === "GAME_OVER" ? "TỈ SỐ CHUNG CUỘC" : "TỈ SỐ ĐỐI ĐẦU";
    q("series-explanation").textContent = g.online
      ? "Giữ tỉ số qua các ván tái đấu. Đổi người chơi sẽ bắt đầu lại. Aim guide dùng chung cho cả phòng."
      : "Giữ số ván thắng khi tải lại trang; điểm trong ván hiển thị ở bảng người chơi.";
    q("reset-series").hidden = Boolean(g.online);
    const own = g.online ? g.online.canAct : !g.isAI;
    q("cue-placement-tools").hidden = !(
      own &&
      g.placementAllowed &&
      ["PLAYER_TURN", "BALL_IN_HAND"].includes(g.state)
    );
    q("reposition-cue").hidden = !g.canReposition;
    q("placement-help").textContent =
      g.state === "BALL_IN_HAND"
        ? "Nhấn một vị trí trống trên bàn để đặt bi trắng."
        : "Có thể đặt lại nhiều lần; quyền đặt bi kết thúc khi bạn đánh.";
  }
}
