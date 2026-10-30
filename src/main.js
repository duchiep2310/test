import "./styles/main.css";
import { RoomLobby } from "./ui/RoomLobby.js";
import { Game } from "./core/Game.js";
import { MODES, BALL_COLORS, POCKETS } from "./core/Constants.js";

const icons = {
  cue: '<path d="m5 19 14-14M4 20l2-2M17 3l4 4"/>',
  settings:
    '<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="3"/><circle cx="15" cy="17" r="3"/>',
  sound: '<path d="m11 4-6 5H2v6h3l6 5zM15 8c3 2 3 6 0 8m3-11c5 4 5 10 0 14"/>',
  mute: '<path d="m11 4-6 5H2v6h3l6 5zM16 9l5 6m0-6-5 6"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9 9a3 3 0 1 1 5 2c-2 1-2 2-2 3m0 3h.01"/>',
  arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
  pause: '<path d="M8 5v14M16 5v14"/>',
  play: '<path d="m8 5 11 7-11 7z"/>',
  restart: '<path d="M4 10a8 8 0 1 1 1 8M4 4v6h6"/>',
  top: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M12 6v12"/>',
  angle: '<path d="m2 14 10-7 10 7-10 7zM2 10l10-7 10 7"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  trophy:
    '<path d="M8 3h8v6a4 4 0 0 1-8 0zM8 5H4v3a4 4 0 0 0 4 4m8-7h4v3a4 4 0 0 1-4 4m-4 1v7m-4 0h8"/>',
  chevron: '<path d="m9 5 7 7-7 7"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
};
const icon = (name, size = 20) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.cue}</svg>`;
const miniBall = (id, cls = "") =>
  `<span class="ball-chip ${id > 8 ? "striped" : ""} ${cls}" style="--ball:${BALL_COLORS[id] || "#e8c95b"}"><span>${id}</span></span>`;
const modePicture = (id) =>
  id === "carom" || id === "three"
    ? `<div class="mode-art carom-art"><i></i><i></i><i></i>${id === "three" ? "<span>⌁</span>" : ""}</div>`
    : `<div class="mode-art">${miniBall(id === "eight" ? 8 : id === "nine" ? 9 : 10, "large")}${miniBall(id === "eight" ? 1 : id === "nine" ? 2 : 3, "small")}</div>`;

const app = document.querySelector("#app");
app.innerHTML = `
<header class="site-header"><a class="brand" href="#" aria-label="Velvet home"><span class="brand-mark">v<span>•</span></span><span>velvet<small>BILLIARDS CLUB</small></span></a><nav aria-label="Main navigation"><button class="nav-link active" id="nav-play" data-i18n="play">Play</button><button class="nav-link" id="instructions" data-i18n="how">How to play</button><button class="nav-link" id="history" data-i18n="history">Match history</button></nav><div class="header-actions"><span class="live-label"><i></i> YOUR PRIVATE TABLE</span><button class="icon-button" id="mute" aria-label="Mute sound">${icon("sound")}</button><button class="icon-button" id="settings" aria-label="Settings">${icon("settings")}</button></div></header>
<main>
<section class="hero"><div><div class="eyebrow"><span></span> A GAME OF ANGLES. A MOMENT OF CALM.</div><h1 data-i18n="title">Find your next great shot.</h1><p data-i18n="subtitle">Five ways to play. One beautiful game. Make yourself at home.</p></div><button class="new-match secondary" id="new-match">${icon("cue")} <span data-i18n="new">New match</span> ${icon("arrow", 17)}</button></section>
<section class="mode-grid" aria-label="Game modes">${MODES.map((m, i) => `<button class="mode-card ${i === 0 ? "selected" : ""}" data-mode="${m.id}" aria-pressed="${i === 0}">${modePicture(m.id)}<span class="mode-copy"><span class="mode-tag">${m.tag}</span><strong>${m.name}</strong></span><span class="mode-selected">${icon("check", 13)}</span></button>`).join("")}</section>
<div class="game-layout" id="play-area">
<section class="table-panel" aria-label="Billiards game">
<div class="table-toolbar"><div class="table-title"><span class="green-dot"></span><strong id="mode-title">8-Ball Pool</strong><span class="separator">/</span><span id="match-type">LOCAL MATCH</span></div><div class="table-actions"><span class="match-clock">${icon("clock", 14)}<span id="clock">00:00</span></span><span class="small-divider"></span><button class="icon-button small" id="camera" aria-label="Switch to top view" title="Switch camera">${icon("top", 18)}</button><button class="icon-button small" id="pause" aria-label="Pause" title="Pause (Esc)">${icon("pause", 18)}</button><button class="icon-button small" id="restart" aria-label="Restart match" title="Restart">${icon("restart", 18)}</button></div></div>
<div class="table-stage" id="scene"><div class="canvas-label">VELVET <span>TABLE Nº 01</span></div><div id="table-state" class="table-state" hidden></div><div class="table-watermark">PRECISION IS A PRACTICE.</div><div id="render-error" hidden></div></div>
<div class="table-footer"><span><span class="key-dot"></span><span id="input-tip" data-i18n="aimtip">Drag on the table to aim</span></span><span class="desktop-tip">Right-drag to orbit <span>·</span> Scroll to zoom</span><button id="guide-toggle" class="text-button">Aim guide <span class="mini-toggle on"></span></button></div>
</section>
<aside class="match-sidebar"><div class="sidebar-heading"><span data-i18n="match">THE MATCH</span><span class="tiny-badge" id="round-label">OPEN TABLE</span></div><div id="player-cards"></div>
<div class="objective"><span class="eyebrow" data-i18n="objective">ON THE TABLE</span><h3 id="objective-title">Break the ice.</h3><p id="objective-text">Hit the rack to start. The table stays open after the break.</p><div id="target-balls" class="target-balls"></div><div id="cushion-counter" hidden></div></div>
<div class="shot-note"><span class="note-icon">${icon("cue", 18)}</span><div><strong id="note-title">A fresh rack. A fresh start.</strong><p id="message" aria-live="polite">Line up your opening shot.</p></div></div>
<button class="rules-link" id="mode-rules"><span>Learn this game</span>${icon("arrow", 16)}</button>
</aside>
</div>
<section class="control-deck" aria-label="Shot controls"><div class="spin-control"><div id="spin-pad" role="slider" aria-label="Cue ball spin. Arrow keys adjust, Home resets." aria-valuemin="-100" aria-valuemax="100" aria-valuenow="0" tabindex="0"><span class="spin-axis horizontal"></span><span class="spin-axis vertical"></span><span id="spin-marker"></span></div><div><span class="control-label" data-i18n="spin">CUE BALL SPIN</span><strong id="spin-label">Center ball</strong><button class="text-button reset-spin" id="reset-spin" data-i18n="reset">Reset spin</button></div></div><div class="power-control"><div class="power-heading"><label for="power" class="control-label" data-i18n="power">SHOT POWER</label><strong><span id="power-value">52</span><small>%</small></strong></div><input type="range" id="power" min="4" max="100" value="52" aria-label="Shot power"><div class="power-scale"><span>SOFT TOUCH</span><span>FULL POWER</span></div></div><div class="shoot-control"><button class="shoot-button" id="shoot"><span data-i18n="shoot">Take the shot</span>${icon("arrow", 21)}</button><span class="keyboard-hint">or press <kbd>space</kbd></span></div></section>
<section class="call-panel" id="call-panel" hidden><div><strong>Call your shot</strong><p id="call-description">Choose a ball and a pocket before shooting.</p></div><label id="call-ball-label">Ball <select id="call-ball"></select></label><div class="pocket-picker" role="group" aria-label="Called pocket">${POCKETS.map((p, i) => `<button data-pocket="${i}" title="${p.name}" aria-label="Call ${p.name.toLowerCase()} pocket">${i + 1}</button>`).join("")}</div><span id="called-label">No pocket called</span></section>
<footer class="page-footer"><span class="footer-brand">GOOD GAMES. GREAT MOMENTS.</span><span>Built for the love of the game <span class="footer-dot">✦</span></span><button id="footer-history">Match history</button><button id="footer-help">${icon("help", 15)} Quick guide</button></footer>
</main>
<dialog id="modal"><div class="modal-header"><div><div class="eyebrow">VELVET BILLIARDS CLUB</div><h2 id="modal-title"></h2></div><button class="icon-button" id="close-modal" aria-label="Close dialog">${icon("close")}</button></div><div id="modal-body"></div></dialog>`;

let game;
let lobby = null;
const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
let camera = "angle";
let lastPlayerHtml = "";
let lastTargets = "";
let lastBallOptions = "";
let resultShown = false;
const $ = (s) => document.querySelector(s);
const formatTime = (s) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
const text = (selector, value) => {
  const el = $(selector);
  if (el && el.textContent !== String(value)) el.textContent = value;
};
const labels = {
  en: {
    play: "Play",
    how: "How to play",
    history: "Match history",
    title: "Find your next great shot.",
    subtitle: "Five ways to play. One beautiful game. Make yourself at home.",
    new: "New match",
    match: "THE MATCH",
    objective: "ON THE TABLE",
    spin: "CUE BALL SPIN",
    power: "SHOT POWER",
    shoot: "Take the shot",
    reset: "Reset spin",
    aimtip: "Drag on the table to aim",
  },
  vi: {
    play: "Chơi",
    how: "Cách chơi",
    history: "Lịch sử trận",
    title: "Tìm đường bi hoàn hảo của bạn.",
    subtitle: "Năm cách chơi. Một bàn bi tuyệt đẹp. Hãy tận hưởng.",
    new: "Trận mới",
    match: "TRẬN ĐẤU",
    objective: "TRÊN BÀN",
    spin: "XOÁY BI CÁI",
    power: "LỰC ĐÁNH",
    shoot: "Đánh bi",
    reset: "Đặt lại xoáy",
    aimtip: "Kéo trên bàn để ngắm",
  },
};
function translate() {
  document.documentElement.lang = game.settings.language;
  $("[data-i18n]") &&
    document
      .querySelectorAll("[data-i18n]")
      .forEach(
        (el) =>
          (el.textContent = (labels[game.settings.language] || labels.en)[
            el.dataset.i18n
          ]),
      );
}
function update(g) {
  if (!g.mode) return;
  const mode = MODES.find((m) => m.id === g.mode.id);
  const d = g.mode.display(g.physics.balls);
  const active = g.mode.currentPlayer;
  text("#mode-title", mode.name);
  text(
    "#match-type",
    g.online
      ? "PHÒNG " + g.online.roomId
      : g.settings.opponent === "ai"
        ? "VS. THE HOUSE"
        : "LOCAL MATCH",
  );
  text("#clock", formatTime(g.elapsed));
  text("#power-value", Math.round(g.power * 100));
  $("#power").value = Math.round(g.power * 100);
  $("#power").style.setProperty("--fill", `${g.power * 100}%`);
  text("#message", g.message);
  text(
    "#round-label",
    g.mode.isBreak
      ? "BREAK SHOT"
      : g.mode.pockets
        ? "RACE TO THE LAST"
        : "RACE TO " + g.mode.targetScore,
  );
  const phtml = [0, 1]
    .map(
      (p) =>
        `<div class="player-card ${p === active ? "is-active" : ""}"><div class="player-avatar ${p === 1 ? "second" : ""}">${!g.online && p === 1 && g.settings.opponent === "ai" ? "AI" : `0${p + 1}`}</div><div class="player-info"><strong>${escapeHtml(g.playerName(p))} ${p === active ? '<span class="turn-dot"></span>' : ""}</strong><span>${d.players?.[p]?.detail || d.players?.[p]?.label || "Ready to play"}</span></div><div class="player-score">${g.mode.scores[p]}<small>${g.mode.pockets ? "POTTED" : "POINTS"}</small></div></div>`,
    )
    .join("");
  if (phtml !== lastPlayerHtml) {
    $("#player-cards").innerHTML = phtml;
    lastPlayerHtml = phtml;
  }
  text(
    "#objective-title",
    g.state === "BALL_IN_HAND"
      ? "Ball in hand."
      : g.mode.isBreak
        ? "Break the ice."
        : g.mode.id === "three"
          ? "Make the angles count."
          : g.mode.id === "carom"
            ? "Connect all three."
            : "Stay on your line.",
  );
  text("#objective-text", d.objective || mode.description);
  const targets = g.mode.legalTargets(g.physics.balls);
  const thtml = targets.map((id) => miniBall(id)).join("");
  if (thtml !== lastTargets) {
    $("#target-balls").innerHTML = thtml;
    lastTargets = thtml;
  }
  $("#cushion-counter").hidden = !["three", "carom"].includes(g.mode.id);
  text("#cushion-counter", `${g.cushions} cushion contacts this shot`);
  text(
    "#note-title",
    g.state === "BALL_IN_HAND"
      ? "Your next move."
      : g.state === "SHOT_IN_PROGRESS"
        ? "Let the table do the talking."
        : g.isAI
          ? "The house is lining up…"
          : g.shots === 0
            ? "A fresh rack. A fresh start."
            : `Player ${active + 1}, the table is yours.`,
  );
  const shoot = $("#shoot");
  shoot.disabled = !g.canShoot || g.isAI;
  shoot.classList.toggle("thinking", g.isAI);
  if (!g.canShoot || g.isAI)
    shoot.innerHTML = `<span>${g.state === "BALL_IN_HAND" ? "Place the cue ball" : g.state === "PAUSED" ? "Game paused" : g.state === "GAME_OVER" ? "Match complete" : g.isAI ? "The house is thinking…" : "Balls in motion…"}</span>`;
  else
    shoot.innerHTML = `<span>${(labels[g.settings.language] || labels.en).shoot}</span>${icon("arrow", 21)}`;
  if (g.online && !g.canShoot)
    shoot.textContent = !g.online.connected
      ? "Đang kết nối lại…"
      : g.online.seat == null
        ? "Bạn đang xem trận đấu"
        : !g.online.info?.ready
          ? "Đang chờ đối thủ…"
          : g.state === "GAME_OVER"
            ? "Trận đã kết thúc"
            : g.state === "PAUSED"
              ? "Trận đang tạm dừng"
              : ["SHOT_IN_PROGRESS", "BALLS_SETTLING"].includes(g.state)
                ? "Bi đang lăn…"
                : g.state === "BALL_IN_HAND"
                  ? "Đặt bi cái lên bàn"
                  : "Chờ lượt của bạn";
  const needsCall =
    !g.mode.isBreak &&
    (g.mode.id === "ten" || (g.mode.id === "eight" && targets.includes(8)));
  $("#call-panel").hidden = !needsCall;
  $("#call-ball-label").hidden = g.mode.id !== "ten";
  if (needsCall) {
    const available = g.physics.balls
      .filter((b) => b.active && b.id !== 0)
      .map((b) => b.id)
      .sort((a, b) => a - b);
    const options = available
      .map((id) => `<option value="${id}">${id}</option>`)
      .join("");
    if (options !== lastBallOptions) {
      $("#call-ball").innerHTML = options;
      lastBallOptions = options;
    }
    $("#call-ball").value = g.calledBall ?? targets[0] ?? 10;
    text(
      "#called-label",
      g.calledPocket == null
        ? "No pocket called"
        : POCKETS[g.calledPocket].name,
    );
    document
      .querySelectorAll("[data-pocket]")
      .forEach((b) =>
        b.classList.toggle(
          "selected",
          Number(b.dataset.pocket) === g.calledPocket,
        ),
      );
  }
  $("#table-state").hidden = !["PAUSED", "BALL_IN_HAND"].includes(g.state);
  $("#table-state").className =
    `table-state ${g.state === "BALL_IN_HAND" ? "placement" : ""}`;
  text(
    "#table-state",
    g.state === "PAUSED"
      ? "Paused · press Esc to resume"
      : "Ball in hand · tap a clear spot on the table",
  );
  $("#pause").innerHTML = icon(g.state === "PAUSED" ? "play" : "pause", 18);
  $("#pause").setAttribute(
    "aria-label",
    g.state === "PAUSED" ? "Resume" : "Pause",
  );
  $("#spin-marker").style.transform =
    `translate(${g.spin.x * 23}px,${-g.spin.y * 23}px)`;
  text(
    "#spin-label",
    Math.abs(g.spin.x) + Math.abs(g.spin.y) < 0.12
      ? "Center ball"
      : [
          g.spin.y > 0.15 ? "Top spin" : g.spin.y < -0.15 ? "Back spin" : "",
          g.spin.x > 0.15 ? "Right spin" : g.spin.x < -0.15 ? "Left spin" : "",
        ]
          .filter(Boolean)
          .join(" + "),
  );
  document.querySelectorAll("[data-mode]").forEach((b) => {
    b.classList.toggle("selected", b.dataset.mode === g.mode.id);
    b.setAttribute("aria-pressed", b.dataset.mode === g.mode.id);
  });
  if (g.online) {
    const blocked = !g.online.connected || !g.online.info?.ready;
    if (blocked) {
      $("#table-state").hidden = false;
      $("#table-state").className = "table-state placement";
      text(
        "#table-state",
        !g.online.connected
          ? "Mất kết nối · đang thử kết nối lại"
          : "Đang chờ đủ hai người chơi · chia sẻ mã phòng để mời bạn",
      );
    }
    for (const el of document.querySelectorAll(
      "#power,#spin-pad,#reset-spin,#call-ball,[data-pocket]",
    )) {
      if ("disabled" in el) el.disabled = !g.online.canAct;
    }
    $("#pause").disabled = g.online.seat == null || blocked;
    $("#restart").disabled =
      g.online.seat == null || g.state !== "GAME_OVER" || blocked;
    document
      .querySelectorAll("[data-mode]")
      .forEach((b) => (b.disabled = true));
  } else {
    document
      .querySelectorAll(
        "#power,#reset-spin,#call-ball,[data-pocket],#pause,#restart,[data-mode]",
      )
      .forEach((b) => (b.disabled = false));
  }
  lobby?.update();
  if (g.state === "GAME_OVER" && !resultShown) {
    resultShown = true;
    queueMicrotask(showResult);
  }
  if (g.state !== "GAME_OVER" && resultShown) {
    resultShown = false;
    if ($("#modal-title").textContent === "A game well played.")
      $("#modal").close();
  }
}
try {
  game = new Game($("#scene"), update);
  window.__game = game;
  translate();
  lobby = new RoomLobby(game);
  window.__lobby = lobby;
} catch (error) {
  console.error(error);
  $("#render-error").hidden = false;
  $("#render-error").textContent =
    "Your browser could not start 3D rendering. Enable WebGL / hardware acceleration and refresh.";
}

function showModal(title, html) {
  $("#modal-title").textContent = title;
  $("#modal-body").innerHTML = html;
  if (!$("#modal").open) $("#modal").showModal();
}
function closeModal() {
  $("#modal").close();
}
$("#close-modal").onclick = closeModal;
$("#modal").addEventListener("click", (e) => {
  if (e.target === $("#modal")) {
    const r = $("#modal").getBoundingClientRect();
    if (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    )
      closeModal();
  }
});
function startMode(id) {
  game.start(id);
  game.audio.play("button");
  closeModal();
}
function confirmRestart(id = game.mode.id) {
  if (game.online) {
    game.online.rematch();
    closeModal();
    return;
  }
  if (game.shots === 0) {
    startMode(id);
    return;
  }
  showModal(
    "A fresh start?",
    `<p class="modal-lead">Start a new ${MODES.find((m) => m.id === id).name} match? Your current match will be cleared.</p><div class="modal-buttons"><button class="secondary" id="cancel-restart">Keep playing</button><button class="primary" id="confirm-restart">Start new match ${icon("arrow", 18)}</button></div>`,
  );
  $("#cancel-restart").onclick = closeModal;
  $("#confirm-restart").onclick = () => startMode(id);
}
document.querySelectorAll("[data-mode]").forEach(
  (b) =>
    (b.onclick = () => {
      if (b.dataset.mode !== game.mode.id) confirmRestart(b.dataset.mode);
    }),
);
$("#shoot").onclick = () => game.shoot();
$("#pause").onclick = () => game.pause();
$("#restart").onclick = () => confirmRestart();
$("#power").oninput = (e) => game.setPower(e.target.value / 100);
$("#camera").onclick = () => {
  camera = camera === "angle" ? "top" : "angle";
  game.scene.setView(camera);
  $("#camera").innerHTML = icon(camera === "angle" ? "top" : "angle", 18);
  $("#camera").setAttribute(
    "aria-label",
    `Switch to ${camera === "angle" ? "top" : "angled"} view`,
  );
};
$("#mute").onclick = () => {
  game.muted = !game.muted;
  game.audio.setMuted(game.muted);
  $("#mute").innerHTML = icon(game.muted ? "mute" : "sound");
  $("#mute").setAttribute(
    "aria-label",
    game.muted ? "Unmute sound" : "Mute sound",
  );
};
$("#guide-toggle").onclick = () => {
  game.setSettings({ aimGuide: !game.settings.aimGuide });
  $("#guide-toggle .mini-toggle").classList.toggle(
    "on",
    game.settings.aimGuide,
  );
};
$("#reset-spin").onclick = () => game.setSpin(0, 0);
const spinPad = $("#spin-pad");
let spinDrag = false;
function spinAt(e) {
  const r = spinPad.getBoundingClientRect();
  let x = (e.clientX - r.left - r.width / 2) / (r.width * 0.36),
    y = -(e.clientY - r.top - r.height / 2) / (r.height * 0.36);
  const mag = Math.hypot(x, y);
  if (mag > 1) {
    x /= mag;
    y /= mag;
  }
  game.setSpin(x, y);
  spinPad.setAttribute("aria-valuenow", Math.round(y * 100));
  spinPad.setAttribute(
    "aria-valuetext",
    `Horizontal ${Math.round(x * 100)}, vertical ${Math.round(y * 100)}`,
  );
}
spinPad.onpointerdown = (e) => {
  spinDrag = true;
  spinPad.setPointerCapture(e.pointerId);
  spinAt(e);
};
spinPad.onpointermove = (e) => {
  if (spinDrag) spinAt(e);
};
spinPad.onpointerup = () => (spinDrag = false);
spinPad.onpointercancel = () => (spinDrag = false);
spinPad.onkeydown = (e) => {
  let { x, y } = game.spin;
  if (e.key === "Home") {
    x = y = 0;
  } else if (e.key === "ArrowLeft") x -= 0.1;
  else if (e.key === "ArrowRight") x += 0.1;
  else if (e.key === "ArrowUp") y += 0.1;
  else if (e.key === "ArrowDown") y -= 0.1;
  else return;
  e.preventDefault();
  game.setSpin(x, y);
};
$("#call-ball").onchange = (e) => {
  game.calledBall = Number(e.target.value);
};
document.querySelectorAll("[data-pocket]").forEach(
  (b) =>
    (b.onclick = () => {
      game.calledPocket = Number(b.dataset.pocket);
      update(game);
    }),
);
$("#nav-play").onclick = () => {
  lobby?.show();
};
$(".brand").onclick = (e) => {
  e.preventDefault();
  lobby?.show();
};
$("#new-match").onclick = () => lobby?.show();
function showNewMatch() {
  showModal(
    "Make it your game.",
    `<p class="modal-lead">Choose your table. Find your rhythm.</p><div class="modal-mode-list">${MODES.map((m) => `<button data-start-mode="${m.id}">${modePicture(m.id)}<span><strong>${m.name}</strong><small>${m.description}</small></span>${icon("arrow", 18)}</button>`).join("")}</div><p class="fine-print">${game.settings.opponent === "ai" ? "Playing against the house." : "Two players, one device."} Change opponent and difficulty in Settings.</p>`,
  );
  document
    .querySelectorAll("[data-start-mode]")
    .forEach((b) => (b.onclick = () => confirmRestart(b.dataset.startMode)));
}
const ruleText = {
  eight:
    "After a legal break, the table is open. The first legal group pocket assigns solids or stripes. Hit one of your own balls first and pocket it, or send a ball to a cushion after contact. Clear your group, then call a pocket for the 8-ball. Pocketing the 8 early, in the wrong pocket, or with a foul loses. An 8 on the break is spotted.",
  nine: "Always hit the lowest-numbered ball first. After that, combinations are legal: pocketing the 9 on a legal shot wins. A foul or scratch gives your opponent ball in hand. A 9 pocketed with a foul is spotted. A legal pocket keeps your turn.",
  ten: "Always hit the lowest ball first. Call the ball and pocket for each shot after the break using the controls below the table. A correctly called ordinary ball keeps your turn. An uncalled ordinary pot stays down and switches turns. The 10 is spotted if pocketed early, uncalled, or with a foul. Clear 1–9 and legally call and pocket the 10 to win.",
  carom:
    "Player 1 uses white; Player 2 uses yellow. Your cue ball must contact both other balls in one shot. A successful carom earns one point and keeps your turn. A miss passes the table. There are no pockets. First to the target score wins.",
  three:
    "Player 1 uses white; Player 2 uses yellow. Contact both object balls, with at least three cushion contacts by your cue ball before contact with the second distinct object ball. Cushions before the first object count, and repeated contacts with one cushion count. A point keeps your turn; otherwise players switch.",
};
function instructions() {
  const mode = MODES.find((m) => m.id === game.mode.id);
  showModal(
    "A good shot starts here.",
    `<div class="guide-callout">${modePicture(game.mode.id)}<div><strong>${mode.name}</strong><p>${ruleText[game.mode.id]}</p></div></div><div class="instruction-grid"><div><span class="instruction-number">01</span><h3>Find your line</h3><p>Drag on the table with your mouse or finger to aim. The dotted guide shows your first contact.</p></div><div><span class="instruction-number">02</span><h3>Add your touch</h3><p>Set power with the slider. Tap the cue-ball diagram for top, back, or side spin.</p></div><div><span class="instruction-number">03</span><h3>Take the shot</h3><p>Press the shot button or Space. On desktop, Shift + drag down and release also shoots.</p></div><div><span class="instruction-number">04</span><h3>Make it yours</h3><p>Scroll to zoom; right-drag to orbit. On mobile use the camera button. Esc pauses the match.</p></div></div><p class="fine-print">Pool break: pocket an object ball or send four distinct object balls to cushions. A foul gives ball in hand anywhere: tap a clear spot to place. Simplified club rules omit push-outs, three-foul losses and 10-ball pass-back. Spin, pocket jaws, and AI are lightweight approximations.</p>`,
  );
}
$("#instructions").onclick = instructions;
$("#mode-rules").onclick = instructions;
$("#footer-help").onclick = instructions;
function history() {
  showModal("Good games, remembered.", `<div id="history-list"></div>`);
  let history = [];
  try {
    history = JSON.parse(localStorage.getItem("velvet-history") || "[]");
  } catch {}
  if (!history.length) {
    $("#history-list").innerHTML =
      `<div class="empty-state">${icon("trophy", 40)}<h3>Your story starts at the table.</h3><p>Completed matches will appear here, saved on this device.</p><button class="primary" id="back-play">Let's play ${icon("arrow", 18)}</button></div>`;
    $("#back-play").onclick = closeModal;
  } else
    for (const match of history) {
      const el = document.createElement("div");
      el.className = "history-row";
      const left = document.createElement("div");
      const strong = document.createElement("strong");
      strong.textContent = match.mode;
      const small = document.createElement("small");
      small.textContent = new Date(match.date).toLocaleDateString();
      left.append(strong, small);
      const right = document.createElement("span");
      right.textContent = `${match.winner} won · ${formatTime(match.duration)}`;
      el.append(left, right);
      $("#history-list").append(el);
    }
}
$("#history").onclick = history;
$("#footer-history").onclick = history;
function settings() {
  const s = game.settings;
  showModal(
    "Your club. Your way.",
    `<form id="settings-form"><div class="settings-grid"><label>Opponent<select name="opponent"><option value="local">Local · two players</option><option value="ai">The house · AI opponent</option></select></label><label>AI difficulty<select name="difficulty"><option value="easy">Easy · a relaxed game</option><option value="medium">Medium · a worthy rival</option><option value="hard">Hard · an exacting table</option></select></label><label>Carom target score<select name="targetScore"><option>3</option><option>5</option><option>10</option><option>20</option></select></label><label>Graphics quality<select name="quality"><option value="low">Low · best performance</option><option value="medium">Medium · balanced</option><option value="high">High · full detail</option></select></label><label>Table felt<select name="tableColor"><option value="#087f75">Club teal</option><option value="#176f48">Classic green</option><option value="#245b89">Tournament blue</option><option value="#6d3452">Burgundy velvet</option></select></label><label>Ball appearance<select name="ballStyle"><option value="classic">Classic porcelain</option><option value="gloss">Polished gloss</option></select></label><label>Camera sensitivity<input name="sensitivity" type="range" min="0.3" max="2" step="0.1"></label><label>Sound effects<input name="volume" type="range" min="0" max="1" step="0.05"></label><label>Ambient music<input name="music" type="range" min="0" max="0.4" step="0.02"></label><label>Interface language<select name="language"><option value="en">English</option><option value="vi">Tiếng Việt · core controls</option></select></label><label class="checkbox-label"><input type="checkbox" name="aimGuide"> Show aim guide</label></div><p class="fine-print">Settings are saved on this device. Carom target changes apply to your next match. Rules and commentary are in English.</p><button class="primary full" type="submit">Save preferences ${icon("check", 18)}</button></form>`,
  );
  const form = $("#settings-form");
  for (const el of form.elements) {
    if (el.name in s) {
      if (el.type === "checkbox") el.checked = s[el.name];
      else el.value = s[el.name];
    }
  }
  if (game.online)
    for (const name of ["opponent", "targetScore"]) {
      form.elements[name].disabled = true;
      form.elements[name].title =
        "Rời phòng online để thay đổi thiết lập trận.";
    }
  form.onsubmit = (e) => {
    e.preventDefault();
    const values = {};
    for (const el of form.elements) {
      if (!el.name) continue;
      values[el.name] =
        el.type === "checkbox"
          ? el.checked
          : el.type === "range" || el.name === "targetScore"
            ? Number(el.value)
            : el.value;
    }
    if (game.online) {
      delete values.opponent;
      delete values.targetScore;
    }
    game.setSettings(values);
    translate();
    $("#guide-toggle .mini-toggle").classList.toggle(
      "on",
      game.settings.aimGuide,
    );
    closeModal();
  };
}
$("#settings").onclick = settings;
function showResult() {
  if (game.state !== "GAME_OVER") return;
  const winner = escapeHtml(game.playerName(game.mode.winner));
  showModal(
    "A game well played.",
    `<div class="result-content"><div class="result-trophy">${icon("trophy", 45)}</div><div class="eyebrow">${MODES.find((m) => m.id === game.mode.id).name.toUpperCase()}</div><h3>${winner} wins.</h3><p>${game.message}</p><div class="result-stats"><span><strong>${game.mode.scores[0]} — ${game.mode.scores[1]}</strong>FINAL SCORE</span><span><strong>${formatTime(game.elapsed)}</strong>AT THE TABLE</span><span><strong>${game.shots}</strong>SHOTS PLAYED</span></div><div class="modal-buttons"><button class="secondary" id="result-menu">Main menu</button><button class="primary" id="result-replay">Play again ${icon("arrow", 18)}</button></div></div>`,
  );
  $("#result-replay").onclick = () => startMode(game.mode.id);
  $("#result-menu").onclick = () => {
    closeModal();
    lobby?.show();
  };
  if (game.online) {
    $("#result-replay").textContent =
      game.online.seat == null ? "Về bàn xem" : "Đồng ý tái đấu";
    $("#result-replay").onclick = () => {
      if (game.online.seat != null) game.online.rematch();
      closeModal();
    };
  }
}
