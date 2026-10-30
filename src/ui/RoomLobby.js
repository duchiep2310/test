import "../styles/lobby.css";
import { RoomClient } from "../network/RoomClient.js";
import { cleanName } from "../utils/PlayerNames.js";
import { MODES } from "../core/Constants.js";

const $ = (s) => document.querySelector(s);
const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const modeOptions = MODES.map(
  (m) => `<option value="${m.id}">${m.name}</option>`,
).join("");
export class RoomLobby {
  constructor(game) {
    this.game = game;
    document.body.insertAdjacentHTML(
      "beforeend",
      `
<section id="room-lobby" class="lobby-screen" aria-label="Sảnh chơi billiards">
  <header class="lobby-header"><a class="brand" href="#" id="lobby-home"><span class="brand-mark">v<span>•</span></span><span>velvet<small>BILLIARDS CLUB</small></span></a><span class="lobby-topline"><i></i> CÙNG MỘT BÀN. CÙNG MỘT NHỊP.</span><button class="secondary" id="lobby-resume" hidden>Về bàn đang chơi →</button></header>
  <div class="lobby-content"><div class="eyebrow"><span></span> MỘT TRẬN ĐẤU HAY BẮT ĐẦU TỪ ĐÂY</div><h1>Hẹn nhau ở bàn bi.</h1><p class="lobby-intro">Mời một người bạn, vào xem một trận hay, hoặc thử sức với máy.<br>Chọn cách chơi của bạn — phần còn lại, để đường bi lên tiếng.</p>
  <div class="lobby-name"><label for="room-name">TÊN NGƯỜI CHƠI</label><input id="room-name" maxlength="24" autocomplete="nickname" placeholder="Ví dụ: Hiệp" value="Người chơi"><button type="button" id="edit-player-names" class="text-button">Đặt / đổi tên người chơi →</button></div>
  <div id="lobby-feedback" role="status" hidden></div>
  <div class="lobby-grid">
    <form id="create-room-form" class="lobby-card featured"><div class="lobby-card-art"><span class="lobby-ball eight">8</span><span class="art-line"></span><span class="art-caption">YOUR TABLE, YOUR PEOPLE.</span></div><span class="lobby-card-tag">01 / MỜI BẠN CÙNG CHƠI</span><h2>Tạo phòng</h2><p>Một mã phòng riêng. Hai người thi đấu.<br>Bạn bè có thể vào xem và theo dõi trực tiếp.</p><label>CHẾ ĐỘ<select id="room-mode">${modeOptions}</select></label><label>ĐIỂM ĐÍCH CAROM<select id="room-target"><option>3</option><option selected>5</option><option>10</option><option>20</option></select></label><button class="primary full" id="create-room" type="submit">Tạo phòng mới <span>→</span></button><small>Chia sẻ mã hoặc đường dẫn để mời bạn.</small></form>
    <form id="join-room-form" class="lobby-card"><div class="lobby-card-art join-art"><span class="lobby-ball white"></span><span class="lobby-ball gold"></span><span class="art-line"></span></div><span class="lobby-card-tag">02 / GẶP NHAU TẠI ĐÂY</span><h2>Nhập mã phòng</h2><p>Đã có lời hẹn? Nhập mã để ngồi vào bàn,<br>hoặc chọn một chỗ trong hàng ghế khán giả.</p><label>MÃ PHÒNG<input id="room-code" placeholder="VD: AB3K7X" maxlength="6" minlength="6" pattern="[A-Za-z2-9]{6}" autocomplete="off" required spellcheck="false"></label><div class="join-room-actions"><button class="primary full" type="submit" data-role="player">Vào chơi <span>→</span></button><button class="secondary full" type="submit" data-role="spectator">Vào xem trận đấu <span>◎</span></button></div><small>Đủ 2 người chơi? Bạn sẽ tự vào ghế khán giả.</small></form>
    <section class="lobby-card ai-card"><div class="lobby-card-art"><span class="lobby-ball striped">9</span><span class="art-spark">✦</span><span class="art-line"></span></div><span class="lobby-card-tag">03 / MỘT CHÚT THỬ THÁCH</span><h2>Đấu với máy</h2><p>Tập một cú khó. Tìm một góc mới.<br>Đối thủ của bạn luôn sẵn sàng, kể cả offline.</p><label>CHẾ ĐỘ<select id="ai-mode">${modeOptions}</select></label><label>ĐỘ KHÓ<select id="lobby-difficulty"><option value="easy">Dễ · khởi động nhẹ nhàng</option><option value="medium" selected>Vừa · một đối thủ xứng tầm</option><option value="hard">Khó · thử thách đường bi</option></select></label><button class="primary full" id="play-ai">Chơi cùng máy <span>→</span></button><small>Không cần tạo phòng hay chờ đối thủ.</small></section>
  </div><div class="lobby-bottom"><span>2 GHẾ CHƠI <i>·</i> NHIỀU GHẾ KHÁN GIẢ <i>·</i> 5 CHẾ ĐỘ</span><button id="play-local">Chơi trên cùng thiết bị →</button></div></div>
  <footer class="lobby-footer"><span>GOOD GAMES. GREAT COMPANY.</span><span>Mỗi đường bi đều có một câu chuyện. ✦</span></footer>
</section>`,
    );
    $("#play-area").insertAdjacentHTML(
      "beforebegin",
      `<section id="online-room" class="online-room" aria-label="Thông tin phòng online" hidden><div class="room-code-block"><span class="control-label">PHÒNG ONLINE</span><button id="copy-room-code" title="Sao chép mã phòng"><strong id="current-room-code"></strong><span>⧉</span></button></div><div class="room-meta"><strong id="room-role"></strong><span id="room-status" aria-live="polite"></span></div><div class="room-spectators"><span>◎</span> <strong id="spectator-count">0</strong> người xem</div><div class="room-banner-actions"><button id="copy-play-link" class="secondary">Mời bạn</button><button id="copy-watch-link" class="secondary">Link xem</button><button id="claim-seat" class="primary" hidden>Ngồi vào bàn</button><button id="rename-in-room" class="secondary">Đổi tên</button><button id="leave-room" class="text-button">Rời phòng</button></div><p id="room-notice" role="status" hidden></p></section>`,
    );
    document.body.insertAdjacentHTML(
      "beforeend",
      `<dialog id="names-dialog"><form id="names-form"><div class="modal-header"><h2>Tên trên bàn bi</h2><button type="button" class="icon-button" id="close-names" aria-label="Đóng">×</button></div><label>Tên của bạn<input id="name-first" maxlength="24" required autocomplete="nickname"></label><label id="second-name-label">Tên người chơi thứ hai<input id="name-second" maxlength="24" required></label><p class="fine-print">Tối đa 24 ký tự, hỗ trợ tiếng Việt. Tên được nhớ trên trình duyệt này; trong phòng online, mọi người sẽ thấy tên mới.</p><p id="names-error" role="alert"></p><button class="primary full" type="submit">Lưu tên</button></form></dialog>`,
    );
    $("#edit-player-names").onclick = () => this.editNames();
    $("#rename-in-room").onclick = () => this.editNames();
    $("#close-names").onclick = () => $("#names-dialog").close();
    $("#footer-help").insertAdjacentHTML(
      "beforebegin",
      '<button id="edit-names-at-table">Đổi tên</button>',
    );
    $("#edit-names-at-table").onclick = () => this.editNames();
    $("#names-form").onsubmit = (e) => {
      e.preventDefault();
      this.saveNames();
    };
    try {
      $("#room-name").value =
        localStorage.getItem("velvet-player-name") || "Người chơi";
    } catch {}
    $("#lobby-home").onclick = (e) => {
      e.preventDefault();
    };
    $("#create-room-form").onsubmit = (e) => {
      e.preventDefault();
      this.connect({
        type: "create",
        mode: $("#room-mode").value,
        targetScore: Number($("#room-target").value),
        name: this.name(),
      });
    };
    $("#join-room-form").onsubmit = (e) => {
      e.preventDefault();
      this.connect({
        type: "join",
        roomId: $("#room-code").value.trim().toUpperCase(),
        spectate: e.submitter?.dataset.role === "spectator",
        name: this.name(),
      });
    };
    $("#room-code").oninput = (e) => {
      e.target.value = e.target.value.toUpperCase().replace(/[^A-Z2-9]/g, "");
    };
    $("#play-ai").onclick = () => this.playOffline("ai");
    $("#play-local").onclick = () => this.playOffline("local");
    $("#lobby-resume").onclick = () => this.hide();
    $("#leave-room").onclick = () => {
      if (
        this.game.online?.seat != null &&
        !window.confirm(
          "Rời phòng sẽ nhường ghế và kết thúc trận hiện tại. Bạn muốn rời phòng?",
        )
      )
        return;
      this.game.online?.leave();
      this.clearInvitation();
      this.show();
      this.update();
    };
    $("#copy-room-code").onclick = () =>
      this.copy(this.game.online.roomId, "Đã sao chép mã phòng.");
    $("#copy-play-link").onclick = () =>
      this.copy(this.invitation(false), "Đã sao chép lời mời vào chơi.");
    $("#copy-watch-link").onclick = () =>
      this.copy(this.invitation(true), "Đã sao chép đường dẫn xem trận đấu.");
    $("#claim-seat").onclick = () => this.game.online?.claimSeat();
    const params = new URLSearchParams(location.search),
      id = params.get("room");
    if (id) {
      $("#room-code").value = id.toUpperCase().slice(0, 6);
      if (params.get("watch") === "1")
        $('#join-room-form [data-role="spectator"]').classList.add(
          "invite-highlight",
        );
      this.feedback(
        "Bạn được mời vào phòng " +
          $("#room-code").value +
          ". Chọn Vào chơi hoặc Vào xem trận đấu.",
      );
    }
    this.show();
    const saved = RoomClient.saved();
    if (saved && (!id || id.toUpperCase() === saved.roomId)) {
      $("#room-name").value = saved.name;
      this.connect({
        type: "join",
        roomId: saved.roomId,
        name: saved.name,
        resumeToken: saved.resumeToken,
        spectate: saved.seat == null,
      });
    }
  }
  name() {
    const name = cleanName($("#room-name").value);
    this.game.setSettings({
      playerNames: [
        name,
        this.game.settings.playerNames?.[1] || "Người chơi 2",
      ],
    });
    try {
      localStorage.setItem("velvet-player-name", name);
    } catch {}
    return name;
  }
  editNames() {
    const online = this.game.online;
    $("#name-first").value =
      online?.name || $("#room-name").value || this.game.playerName(0);
    $("#name-second").value =
      this.game.settings.playerNames?.[1] || "Người chơi 2";
    $("#second-name-label").hidden =
      Boolean(online) || this.game.settings.opponent === "ai";
    $("#name-second").disabled = $("#second-name-label").hidden;
    $("#names-error").textContent = "";
    $("#names-dialog").showModal();
    $("#name-first").focus();
  }
  saveNames() {
    const name = cleanName($("#name-first").value, ""),
      second = cleanName($("#name-second").value, "Người chơi 2");
    if (!name) {
      $("#names-error").textContent = "Vui lòng nhập tên hợp lệ.";
      return;
    }
    const online = this.game.online;
    if (online) {
      if (!online.command("rename", { name })) {
        $("#names-error").textContent =
          "Chưa kết nối được máy chủ. Hãy thử lại.";
        return;
      }
    } else {
      this.game.setSettings({ playerNames: [name, second] });
      try {
        localStorage.setItem("velvet-player-name", name);
      } catch {}
    }
    $("#room-name").value = name;
    $("#names-dialog").close();
    this.game.notify();
  }
  feedback(message, error = false) {
    const el = $("#lobby-feedback");
    el.hidden = !message;
    el.textContent = message;
    el.classList.toggle("error", error);
  }
  async connect(data) {
    if (this.busy) return;
    if (this.game.online) {
      this.feedback(
        "Bạn đang ở trong một phòng. Về bàn và rời phòng trước khi vào phòng khác.",
        true,
      );
      return;
    }
    this.busy = true;
    this.setBusy(true);
    this.feedback("Đang kết nối máy chủ… lần đầu có thể cần thêm thời gian.");
    const client = (this.connectingClient = new RoomClient(this.game, () =>
      this.update(),
    ));
    try {
      await client.connect(data);
      this.hide();
      this.feedback("");
      const url = new URL(location.href);
      url.searchParams.set("room", client.roomId);
      if (client.seat == null) url.searchParams.set("watch", "1");
      else url.searchParams.delete("watch");
      history.replaceState(null, "", url);
    } catch (error) {
      this.feedback(error.message, true);
      if (!this.game.online) client.leave();
    } finally {
      this.connectingClient = null;
      this.busy = false;
      this.setBusy(false);
      this.update();
    }
  }
  setBusy(busy) {
    $("#create-room").disabled = busy;
    $("#join-room-form")
      .querySelectorAll("button")
      .forEach((b) => (b.disabled = busy));
  }
  show() {
    $("#room-lobby").hidden = false;
    document.body.classList.add("in-lobby");
    this.game.lobbyOpen = true;
    $("#lobby-resume").hidden = !this.game.online;
    window.scrollTo(0, 0);
  }
  hide() {
    $("#room-lobby").hidden = true;
    document.body.classList.remove("in-lobby");
    this.game.lobbyOpen = false;
    this.game.scene.resize();
    this.game.notify();
    window.scrollTo(0, 0);
  }
  playOffline(opponent) {
    if (
      this.game.online &&
      !window.confirm("Rời phòng online để chơi riêng trên thiết bị này?")
    )
      return;
    this.connectingClient?.leave();
    this.game.online?.leave();
    this.clearInvitation();
    this.name();
    this.game.setSettings({
      opponent,
      difficulty: $("#lobby-difficulty").value,
    });
    this.game.start($("#ai-mode").value);
    this.hide();
  }
  invitation(watch) {
    const url = new URL(location.href);
    url.search = "";
    url.hash = "";
    url.searchParams.set("room", this.game.online.roomId);
    if (watch) url.searchParams.set("watch", "1");
    return url.href;
  }
  clearInvitation() {
    const url = new URL(location.href);
    url.searchParams.delete("room");
    url.searchParams.delete("watch");
    history.replaceState(null, "", url);
  }
  async copy(value, message) {
    try {
      await navigator.clipboard.writeText(value);
      this.notice(message);
    } catch {
      this.notice("Sao chép nội dung này: " + value);
    }
  }
  notice(message) {
    $("#room-notice").textContent = message;
    $("#room-notice").hidden = !message;
  }
  update() {
    const client = this.game.online,
      info = client?.info;
    $("#online-room").hidden = !client;
    document.body.classList.toggle("is-online", Boolean(client));
    document.body.classList.toggle(
      "is-spectator",
      Boolean(client && client.seat == null),
    );
    $("#lobby-resume").hidden = !client;
    if (!client || !info) {
      this.notice("");
      this.lastNoticeMatch = null;
      return;
    }
    if (
      this.lastNoticeMatch !== info.matchId ||
      this.lastNoticeRevision !== info.revision ||
      (this.lastConnected === false && client.connected)
    )
      this.notice("");
    this.lastNoticeMatch = info.matchId;
    this.lastNoticeRevision = info.revision;
    this.lastConnected = client.connected;
    $("#current-room-code").textContent = client.roomId;
    $("#room-role").textContent =
      client.seat == null
        ? "Bạn đang xem trận đấu"
        : `Bạn là người chơi ${client.seat + 1} · ${info.players[client.seat]?.name || ""}`;
    $("#spectator-count").textContent = info.spectatorCount;
    $("#room-status").textContent = !client.connected
      ? "Đang kết nối lại…"
      : !info.ready
        ? info.players.some((p) => p && !p.connected)
          ? "Người chơi mất kết nối · giữ ghế 60 giây"
          : "Đang chờ người chơi thứ hai"
        : this.game.state === "GAME_OVER"
          ? "Trận đã kết thúc"
          : `Lượt của ${info.players[this.game.mode.currentPlayer]?.name || "người chơi"}`;
    $("#claim-seat").hidden =
      client.seat != null ||
      !info.players.some((p) => p === null) ||
      !client.connected;
    if (client.error) this.notice(client.error);
    if (info.rematchVotes?.length)
      this.notice(
        "Đã có " +
          info.rematchVotes.length +
          "/2 người đồng ý tái đấu. Cả hai người cần chọn Chơi lại.",
      );
  }
}
