import "../styles/player-view.css";

export class PlayerViewControls {
  constructor(game) {
    this.game = game;
    document.querySelector(".table-toolbar").insertAdjacentHTML(
      "afterend",
      `
      <section id="player-view-controls" class="player-view-controls" aria-label="Góc nhìn và nhân vật">
        <label>GÓC NHÌN<select id="player-view" aria-label="Chọn góc nhìn"><option value="angle">Toàn bàn</option><option value="first">Ngôi I · qua mắt nhân vật</option><option value="third">Ngôi III · sau lưng nhân vật</option><option value="top">Từ trên xuống</option></select></label>
        <label>THEO NHÂN VẬT<select id="player-follow" aria-label="Theo dõi người chơi"><option value="self">Bạn</option><option value="opponent">Đối thủ</option><option value="turn">Người đang đánh</option></select></label>
        <button type="button" id="center-player-view" title="Đưa camera về hướng cơ">Về hướng cơ</button>
        <span id="player-view-subject"></span>
      </section>`,
    );
    this.view = document.getElementById("player-view");
    this.follow = document.getElementById("player-follow");
    this.center = document.getElementById("center-player-view");
    this.view.onchange = () => {
      game.scene.setView(this.view.value);
      game.notify();
    };
    this.follow.onchange = () => {
      game.scene.setFollow(this.follow.value);
      game.notify();
    };
    this.center.onclick = () => {
      game.scene.centerPlayerView();
      game.notify();
    };
    this.update();
  }
  update() {
    const g = this.game,
      s = g.scene;
    this.view.value = s.view;
    this.follow.value = s.follow;
    const local = g.online
      ? g.online.seat
      : g.settings.opponent === "ai"
        ? 0
        : g.mode.currentPlayer;
    this.follow.options[0].textContent =
      local == null ? g.playerName(0) : `Bạn · ${g.playerName(local)}`;
    this.follow.options[1].textContent =
      local == null ? g.playerName(1) : `Đối thủ · ${g.playerName(1 - local)}`;
    const person = ["first", "third"].includes(s.view);
    this.center.disabled = this.follow.disabled = !person;
    document.getElementById("player-view-subject").textContent = person
      ? `${g.playerName(s.followSeat)} · kéo chuột phải để nhìn quanh`
      : "Hai nhân vật đứng theo hướng cơ · camera riêng cho mỗi người";
  }
}
