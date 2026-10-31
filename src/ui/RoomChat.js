import "../styles/room-chat.css";

/** Chat uses text nodes, preserving untrusted message text as text. */
export class RoomChat {
  constructor(game) {
    this.game = game;
    this.open = window.innerWidth >= 1280;
    try {
      const saved = localStorage.getItem("velvet-chat-open");
      if (saved != null) this.open = saved === "1";
    } catch {}
    this.unread = 0;
    this.nodes = new Map();
    this.time = new Intl.DateTimeFormat("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
    document.body.insertAdjacentHTML(
      "beforeend",
      `
      <section id="room-chat" class="room-chat" hidden aria-label="Chat trong phòng">
        <button type="button" id="chat-toggle" aria-expanded="false" aria-controls="chat-panel"><span class="chat-toggle-title"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M20 15a3 3 0 0 1-3 3H9l-5 3V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3z"/><path d="M8 8h8M8 12h5"/></svg>Trò chuyện</span><span id="chat-badge" hidden>0</span><span id="chat-chevron">＋</span></button>
        <div id="chat-panel" hidden>
          <div class="chat-heading"><strong id="chat-room-title">CHAT PHÒNG</strong><span id="chat-state"></span></div>
          <div id="chat-messages" role="log" aria-label="Tin nhắn trong phòng" aria-live="polite" aria-relevant="additions"></div>
          <form id="chat-form"><label class="chat-input-label" for="chat-input">TIN NHẮN</label><textarea id="chat-input" rows="2" maxlength="300" placeholder="Gửi lời chào tới mọi người…" aria-describedby="chat-error"></textarea><div class="chat-compose-meta"><small id="chat-count">0 / 300 · Enter để gửi</small><button type="submit" id="chat-send">Gửi ↗</button></div></form>
          <p id="chat-error" role="alert" hidden></p>
        </div>
      </section>`,
    );
    const q = (id) => document.getElementById(id);
    this.root = q("room-chat");
    this.panel = q("chat-panel");
    this.list = q("chat-messages");
    this.input = q("chat-input");
    this.send = q("chat-send");
    q("chat-toggle").onclick = () => {
      this.open = !this.open;
      try {
        localStorage.setItem("velvet-chat-open", this.open ? "1" : "0");
      } catch {}
      this.update();
      if (this.open) this.list.scrollTop = this.list.scrollHeight;
    };
    this.input.oninput = () => this.update();
    this.input.onkeydown = (event) => {
      if (event.key === "Enter" && !event.shiftKey && !event.isComposing) {
        event.preventDefault();
        q("chat-form").requestSubmit();
      }
      if (event.key === "Escape") {
        event.preventDefault();
        this.open = false;
        this.update();
        q("chat-toggle").focus();
      }
    };
    q("chat-form").onsubmit = (event) => {
      event.preventDefault();
      const client = game.online;
      if (!this.input.value.trim() || !client) return;
      const text = this.input.value;
      if (client.sendChat(text))
        this.draft = { id: client.chatPending.id, text };
      this.update();
    };
    this.update();
  }
  messageNode(message, client) {
    const node = document.createElement("article");
    node.className = "chat-message";
    node.classList.toggle("is-own", message.authorId === client.chatId);
    node.dataset.messageId = message.id;
    const heading = document.createElement("div");
    heading.className = "chat-author";
    const name = document.createElement("strong");
    name.textContent = message.name;
    const role = document.createElement("span");
    role.className = "chat-role";
    role.textContent =
      message.seat == null ? "Khán giả" : `Người chơi ${message.seat + 1}`;
    const time = document.createElement("time");
    time.dateTime = new Date(message.at).toISOString();
    time.textContent = this.time.format(message.at);
    heading.append(name, role, time);
    const text = document.createElement("p");
    text.className = "chat-text";
    text.textContent = message.text;
    node.append(heading, text);
    return node;
  }
  update() {
    const c = this.game.online,
      q = (id) => document.getElementById(id);
    this.root.hidden = !c || this.game.lobbyOpen;
    if (!c) {
      this.client = null;
      return;
    }
    if (this.client !== c || this.roomId !== c.roomId) {
      this.client = c;
      this.roomId = c.roomId;
      this.version = -1;
      this.lastId = c.chatMessages.at(-1)?.id ?? 0;
      this.unread = 0;
      this.draft = null;
      this.input.value = "";
      this.nodes.clear();
      this.list.replaceChildren();
    }
    if (this.root.hidden) return;
    const canChat = c.connected && Boolean(c.chatId);
    q("chat-room-title").textContent = `PHÒNG ${c.roomId}`;
    q("chat-state").textContent = !c.connected
      ? "Đang kết nối lại…"
      : !c.chatId
        ? "Máy chủ cần cập nhật chat"
        : "Người chơi & khán giả";
    if (this.draft && !c.chatPending) {
      const acknowledged = c.chatMessages.some(
        (m) => m.requestId === this.draft.id && m.authorId === c.chatId,
      );
      if (acknowledged) {
        if (this.input.value === this.draft.text) this.input.value = "";
        this.draft = null;
      }
    }
    if (this.version !== c.chatVersion) {
      const nearBottom =
        this.list.scrollHeight - this.list.scrollTop - this.list.clientHeight <
        50;
      this.unread += c.chatMessages.filter(
        (m) => m.id > this.lastId && m.authorId !== c.chatId,
      ).length;
      const ids = new Set(c.chatMessages.map((m) => m.id));
      for (const [id, node] of this.nodes)
        if (!ids.has(id)) {
          node.remove();
          this.nodes.delete(id);
        }
      if (c.chatMessages.length)
        this.list.querySelector(".chat-empty")?.remove();
      else if (!this.list.children.length) {
        const empty = document.createElement("p");
        empty.className = "chat-empty";
        empty.textContent =
          "Một lời chào, một trận đấu hay. Tin nhắn hiển thị với mọi người trong phòng.";
        this.list.append(empty);
      }
      for (const message of c.chatMessages)
        if (!this.nodes.has(message.id)) {
          const node = this.messageNode(message, c);
          this.nodes.set(message.id, node);
          this.list.append(node);
        }
      this.lastId = c.chatMessages.at(-1)?.id ?? 0;
      this.version = c.chatVersion;
      if (nearBottom || c.chatMessages.at(-1)?.authorId === c.chatId)
        this.list.scrollTop = this.list.scrollHeight;
    }
    if (this.open) this.unread = 0;
    this.panel.hidden = !this.open;
    this.root.classList.toggle("is-collapsed", !this.open);
    q("chat-toggle").setAttribute("aria-expanded", String(this.open));
    q("chat-chevron").textContent = this.open ? "−" : "＋";
    q("chat-badge").hidden = !this.unread;
    q("chat-badge").textContent =
      this.unread > 99 ? "99+" : String(this.unread);
    this.input.disabled = !canChat;
    this.send.disabled =
      !canChat || Boolean(c.chatPending) || !this.input.value.trim();
    this.send.textContent = c.chatPending ? "Đang gửi…" : "Gửi ↗";
    q("chat-count").textContent =
      `${this.input.value.length} / 300 · Enter để gửi`;
    q("chat-error").hidden = !c.chatError;
    q("chat-error").textContent = c.chatError;
  }
}
