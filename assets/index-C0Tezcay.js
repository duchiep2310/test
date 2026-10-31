(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();class Oh{constructor(t,e){this.game=t,document.querySelector("#online-room").insertAdjacentHTML("beforebegin",`
      <section id="match-tools" class="match-tools" aria-label="Thanh điều hướng trận đấu">
        <nav aria-label="Điều hướng"><button id="tools-lobby">Sảnh chơi</button><button id="tools-rules">Luật chơi</button><button id="tools-names">Đổi tên</button><button id="tools-settings">Cài đặt</button></nav>
        <div class="camera-pad" role="group" aria-label="Điều hướng góc nhìn"><span>Góc nhìn</span><button data-camera="KeyA" aria-label="Dịch góc nhìn sang trái">←</button><button data-camera="KeyW" aria-label="Dịch góc nhìn tiến">↑</button><button data-camera="KeyS" aria-label="Dịch góc nhìn lùi">↓</button><button data-camera="KeyD" aria-label="Dịch góc nhìn sang phải">→</button></div>
      </section>
      <section id="series-scoreboard" class="series-scoreboard" aria-label="Tỉ số chung cuộc hai người">
        <div class="series-heading"><span id="series-heading">TỈ SỐ ĐỐI ĐẦU</span><small>SỐ VÁN THẮNG</small></div>
        <div class="series-duel"><strong id="series-name-0"></strong><span id="series-values">0 — 0</span><strong id="series-name-1"></strong></div>
        <div class="series-meta"><span id="series-explanation"></span><button id="reset-series">Đặt lại tỉ số</button></div>
      </section>
      <div id="cue-placement-tools" class="cue-placement-tools" hidden><button id="reposition-cue">Đặt lại bi trắng</button><span id="placement-help"></span></div>`);const n=s=>document.getElementById(s);n("tools-lobby").onclick=()=>e.show(),n("tools-rules").onclick=()=>n("instructions").click(),n("tools-names").onclick=()=>e.editNames(),n("tools-settings").onclick=()=>n("settings").click(),n("reposition-cue").onclick=()=>t.repositionCue(),n("reset-series").onclick=()=>{!t.online&&window.confirm("Đặt tỉ số số ván thắng về 0 — 0?")&&t.resetSeries()};for(const s of document.querySelectorAll("[data-camera]")){const r=s.dataset.camera;s.onpointerdown=o=>{o.button===0&&(o.preventDefault(),s.focus({preventScroll:!0}),s.setPointerCapture(o.pointerId),t.input.keys.add(r))};const a=()=>t.input.keys.delete(r);s.onpointerup=a,s.onpointercancel=a,s.onlostpointercapture=a,s.onclick=o=>{if(o.detail===0){const c={KeyA:[-.2,0],KeyD:[.2,0],KeyW:[0,.2],KeyS:[0,-.2]};t.scene.pan(...c[r])}}}this.update()}update(){const t=this.game,e=a=>document.getElementById(a),n=t.seriesScores;for(let a=0;a<2;a++){const o=e("series-name-"+a),c=t.playerName(a);o.textContent!==c&&(o.textContent=c),o.title=c}const s=`${n[0]} — ${n[1]}`;e("series-values").textContent!==s&&(e("series-values").textContent=s),e("series-heading").textContent=t.state==="GAME_OVER"?"TỈ SỐ CHUNG CUỘC":"TỈ SỐ ĐỐI ĐẦU",e("series-explanation").textContent=t.online?"Giữ tỉ số qua các ván tái đấu. Đổi người chơi sẽ bắt đầu lại. Aim guide dùng chung cho cả phòng.":"Giữ số ván thắng khi tải lại trang; điểm trong ván hiển thị ở bảng người chơi.",e("reset-series").hidden=!!t.online;const r=t.online?t.online.canAct:!t.isAI;e("cue-placement-tools").hidden=!(r&&t.placementAllowed&&["PLAYER_TURN","BALL_IN_HAND"].includes(t.state)),e("reposition-cue").hidden=!t.canReposition,e("placement-help").textContent=t.state==="BALL_IN_HAND"?"Nhấn một vị trí trống trên bàn để đặt bi trắng.":"Có thể đặt lại nhiều lần; quyền đặt bi kết thúc khi bạn đánh."}}class Bh{constructor(t){this.game=t,document.querySelector(".table-footer").insertAdjacentHTML("beforebegin",`
      <section class="cue-angle-control" id="cue-angle-control" aria-label="Điều chỉnh góc cơ">
        <div class="cue-angle-heading"><label for="cue-angle-range">GÓC CƠ</label><output id="cue-angle-value" for="cue-angle-range">0.0°</output></div>
        <button type="button" id="cue-angle-left" aria-label="Xoay cơ ngược chiều kim đồng hồ" title="Xoay cơ −0,1° · giữ để xoay liên tục">↶</button>
        <div class="cue-angle-track"><input type="range" id="cue-angle-range" min="0" max="359.9" step="0.1" value="0" aria-label="Điều chỉnh góc cơ"><div class="cue-angle-scale"><span>0°</span><span>180°</span><span>360°</span></div></div>
        <button type="button" id="cue-angle-right" aria-label="Xoay cơ cùng chiều kim đồng hồ" title="Xoay cơ +0,1° · giữ để xoay liên tục">↷</button>
        <span id="cue-angle-help">Kéo để ngắm · ← / → chỉnh 0,1° · Giữ nút để xoay liên tục</span>
      </section>`),this.range=document.getElementById("cue-angle-range"),this.value=document.getElementById("cue-angle-value"),this.buttons=[-1,1].map(e=>{const n=document.getElementById(e<0?"cue-angle-left":"cue-angle-right");n.onpointerdown=r=>{r.button!==0||n.disabled||(r.preventDefault(),n.focus({preventScroll:!0}),n.setPointerCapture(r.pointerId),t.input.beginCueTurn(e))};const s=()=>t.input.endCueTurn(e);return n.onpointerup=s,n.onpointercancel=s,n.onlostpointercapture=s,n.onclick=r=>{r.detail===0&&t.setAngle(t.angle+e*Math.PI/1800)},n}),this.range.oninput=()=>t.setAngle(Number(this.range.value)*Math.PI/180),this.update()}update(){const t=this.game,e=t.lobbyOpen||!t.canShoot||t.isAI;this.range.disabled=e;for(const r of this.buttons)r.disabled=e;const n=(t.angle*180/Math.PI%360+360)%360,s=Math.round(n*10)%3600/10;Number(this.range.value)!==s&&(this.range.value=String(s)),this.range.setAttribute("aria-valuetext",`${s.toFixed(1)} độ`),this.value.textContent=`${s.toFixed(1)}°`,document.getElementById("cue-angle-help").textContent=e?"Chỉnh góc cơ khi đến lượt bạn và tất cả bi đã dừng.":"Kéo để ngắm · ← / → chỉnh 0,1° · Giữ nút để xoay liên tục"}}const nl=["Trên trái","Trên giữa","Trên phải","Dưới trái","Dưới giữa","Dưới phải"];class zh{constructor(t){this.game=t,document.body.insertAdjacentHTML("beforeend",`
      <dialog id="shot-call-dialog" aria-labelledby="shot-call-title" aria-describedby="shot-call-description">
        <div class="eyebrow">HOÀN TẤT CÚ ĐÁNH</div><h2 id="shot-call-title">Chọn lỗ cho bi số 8</h2>
        <p id="shot-call-description"></p>
        <div class="shot-call-board" role="group" aria-label="Chọn lỗ được gọi">
          ${nl.map((e,n)=>`<button type="button" data-shot-pocket="${n}" aria-pressed="false"><strong>${n+1}</strong><span>${e}</span></button>`).join("")}
          <span id="shot-call-ball" aria-hidden="true">8</span>
        </div>
        <p id="shot-call-selection" role="status">Chưa chọn lỗ.</p>
        <div class="modal-buttons"><button type="button" class="secondary" id="shot-call-cancel">Quay lại ngắm</button><button type="button" class="primary" id="shot-call-confirm" disabled>Đánh bi số 8</button></div>
      </dialog>`),this.dialog=document.getElementById("shot-call-dialog"),this.confirm=document.getElementById("shot-call-confirm"),this.pockets=[...this.dialog.querySelectorAll("[data-shot-pocket]")],t.onCallRequired=()=>this.open();for(const e of this.pockets)e.onclick=()=>{if(!this.isCurrent())return this.dialog.close();this.selected=Number(e.dataset.shotPocket);for(const n of this.pockets)n.setAttribute("aria-pressed",String(n===e));this.confirm.disabled=!1,document.getElementById("shot-call-selection").textContent=`Lỗ ${this.selected+1} · ${nl[this.selected]}`};document.getElementById("shot-call-cancel").onclick=()=>this.dialog.close(),this.confirm.onclick=()=>{if(!this.isCurrent()||this.selected==null)return this.dialog.close();t.calledPocket=this.selected,this.dialog.close(),t.shoot()},this.dialog.onclose=()=>{this.context=null}}open(){const t=this.game;if(this.dialog.open||!t.canShoot||t.isAI||!t.needsPocketCall)return;this.context={mode:t.mode,player:t.mode.currentPlayer,shots:t.shots,matchId:t.online?.info?.matchId},this.selected=null,this.confirm.disabled=!0;for(const n of this.pockets)n.setAttribute("aria-pressed","false");const e=t.mode.id==="eight";document.getElementById("shot-call-title").textContent=e?"Chọn lỗ cho bi số 8":"Chọn lỗ cho cú đánh",document.getElementById("shot-call-description").textContent=e?"Bạn đã dọn hết nhóm bi. Chọn lỗ muốn đưa bi đen vào, rồi xác nhận đánh. Bi số 8 vào lỗ khác sẽ thua.":"Chọn lỗ cho bi đã gọi, rồi xác nhận đánh. Cú đánh dùng góc cơ, lực và xoáy bạn vừa chọn.",document.getElementById("shot-call-ball").textContent=e?"8":String(t.calledBall??t.mode.legalTargets(t.physics.balls)[0]??10),document.getElementById("shot-call-selection").textContent="Chưa chọn lỗ. Chọn số tương ứng với lỗ trên bàn.",this.confirm.textContent=e?"Đánh bi số 8":"Xác nhận và đánh",this.dialog.showModal()}isCurrent(){const t=this.game,e=this.context;return e&&!t.lobbyOpen&&t.canShoot&&!t.isAI&&t.needsPocketCall&&e.mode===t.mode&&e.player===t.mode.currentPlayer&&e.shots===t.shots&&e.matchId===t.online?.info?.matchId}update(){this.dialog.open&&!this.isCurrent()&&this.dialog.close()}}class kh{constructor(t){this.game=t,this.level=.8,document.getElementById("cue-angle-control").insertAdjacentHTML("afterend",`
      <section id="jump-control" class="jump-control" aria-label="Điều khiển nhảy bi">
        <button type="button" id="jump-toggle" aria-pressed="false">↗ Nhảy bi</button>
        <div class="jump-level"><label for="jump-level">MỨC NHẢY <output id="jump-value" for="jump-level">80%</output></label><input type="range" id="jump-level" min="10" max="100" step="5" value="80" aria-label="Mức nhảy"></div>
        <span id="jump-help">Đánh thường · bật Nhảy bi để vượt bi cản.</span>
      </section>`),this.toggle=document.getElementById("jump-toggle"),this.range=document.getElementById("jump-level"),this.toggle.onclick=()=>t.setJump(t.jump>0?0:this.level),this.range.oninput=()=>{this.level=Number(this.range.value)/100,t.setJump(this.level)},this.update()}update(){const t=this.game,e=t.jump>0,n=t.lobbyOpen||!t.canShoot||t.isAI;e&&(this.level=t.jump),this.toggle.disabled=n,this.toggle.setAttribute("aria-pressed",String(e)),this.toggle.textContent=e?"↗ Nhảy bi · BẬT":"↗ Nhảy bi",this.range.disabled=n||!e,this.range.value=String(Math.round(this.level*100)),document.getElementById("jump-value").textContent=`${Math.round(this.level*100)}%`,document.getElementById("jump-help").textContent=e?"Tăng mức nhảy và lực đánh để vượt bi cản. Không có đường dự đoán cho cú nhảy.":"Đánh thường · bật Nhảy bi để vượt bi cản."}}class Hh{constructor(t){this.game=t,document.querySelector(".table-toolbar").insertAdjacentHTML("afterend",`
      <section id="player-view-controls" class="player-view-controls" aria-label="Góc nhìn và nhân vật">
        <label>GÓC NHÌN<select id="player-view" aria-label="Chọn góc nhìn"><option value="angle">Toàn bàn</option><option value="first">Ngôi I · qua mắt nhân vật</option><option value="third">Ngôi III · sau lưng nhân vật</option><option value="top">Từ trên xuống</option></select></label>
        <label>THEO NHÂN VẬT<select id="player-follow" aria-label="Theo dõi người chơi"><option value="self">Bạn</option><option value="opponent">Đối thủ</option><option value="turn">Người đang đánh</option></select></label>
        <button type="button" id="center-player-view" title="Đưa camera về hướng cơ">Về hướng cơ</button>
        <span id="player-view-subject"></span>
      </section>`),this.view=document.getElementById("player-view"),this.follow=document.getElementById("player-follow"),this.center=document.getElementById("center-player-view"),this.view.onchange=()=>{t.scene.setView(this.view.value),t.notify()},this.follow.onchange=()=>{t.scene.setFollow(this.follow.value),t.notify()},this.center.onclick=()=>{t.scene.centerPlayerView(),t.notify()},this.update()}update(){const t=this.game,e=t.scene;this.view.value=e.view,this.follow.value=e.follow;const n=t.online?t.online.seat:t.settings.opponent==="ai"?0:t.mode.currentPlayer;this.follow.options[0].textContent=n==null?t.playerName(0):`Bạn · ${t.playerName(n)}`,this.follow.options[1].textContent=n==null?t.playerName(1):`Đối thủ · ${t.playerName(1-n)}`;const s=["first","third"].includes(e.view);this.center.disabled=this.follow.disabled=!s,document.getElementById("player-view-subject").textContent=s?`${t.playerName(e.followSeat)} · kéo chuột phải để nhìn quanh`:"Hai nhân vật đứng theo hướng cơ · camera riêng cho mỗi người"}}class Gh{constructor(t){this.game=t,this.open=window.innerWidth>=1280;try{const n=localStorage.getItem("velvet-chat-open");n!=null&&(this.open=n==="1")}catch{}this.unread=0,this.nodes=new Map,this.time=new Intl.DateTimeFormat("vi-VN",{hour:"2-digit",minute:"2-digit"}),document.body.insertAdjacentHTML("beforeend",`
      <section id="room-chat" class="room-chat" hidden aria-label="Chat trong phòng">
        <button type="button" id="chat-toggle" aria-expanded="false" aria-controls="chat-panel"><span class="chat-toggle-title"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M20 15a3 3 0 0 1-3 3H9l-5 3V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3z"/><path d="M8 8h8M8 12h5"/></svg>Trò chuyện</span><span id="chat-badge" hidden>0</span><span id="chat-chevron">＋</span></button>
        <div id="chat-panel" hidden>
          <div class="chat-heading"><strong id="chat-room-title">CHAT PHÒNG</strong><span id="chat-state"></span></div>
          <div id="chat-messages" role="log" aria-label="Tin nhắn trong phòng" aria-live="polite" aria-relevant="additions"></div>
          <form id="chat-form"><label class="chat-input-label" for="chat-input">TIN NHẮN</label><textarea id="chat-input" rows="2" maxlength="300" placeholder="Gửi lời chào tới mọi người…" aria-describedby="chat-error"></textarea><div class="chat-compose-meta"><small id="chat-count">0 / 300 · Enter để gửi</small><button type="submit" id="chat-send">Gửi ↗</button></div></form>
          <p id="chat-error" role="alert" hidden></p>
        </div>
      </section>`);const e=n=>document.getElementById(n);this.root=e("room-chat"),this.panel=e("chat-panel"),this.list=e("chat-messages"),this.input=e("chat-input"),this.send=e("chat-send"),e("chat-toggle").onclick=()=>{this.open=!this.open;try{localStorage.setItem("velvet-chat-open",this.open?"1":"0")}catch{}this.update(),this.open&&(this.list.scrollTop=this.list.scrollHeight)},this.input.oninput=()=>this.update(),this.input.onkeydown=n=>{n.key==="Enter"&&!n.shiftKey&&!n.isComposing&&(n.preventDefault(),e("chat-form").requestSubmit()),n.key==="Escape"&&(n.preventDefault(),this.open=!1,this.update(),e("chat-toggle").focus())},e("chat-form").onsubmit=n=>{n.preventDefault();const s=t.online;if(!this.input.value.trim()||!s)return;const r=this.input.value;s.sendChat(r)&&(this.draft={id:s.chatPending.id,text:r}),this.update()},this.update()}messageNode(t,e){const n=document.createElement("article");n.className="chat-message",n.classList.toggle("is-own",t.authorId===e.chatId),n.dataset.messageId=t.id;const s=document.createElement("div");s.className="chat-author";const r=document.createElement("strong");r.textContent=t.name;const a=document.createElement("span");a.className="chat-role",a.textContent=t.seat==null?"Khán giả":`Người chơi ${t.seat+1}`;const o=document.createElement("time");o.dateTime=new Date(t.at).toISOString(),o.textContent=this.time.format(t.at),s.append(r,a,o);const c=document.createElement("p");return c.className="chat-text",c.textContent=t.text,n.append(s,c),n}update(){const t=this.game.online,e=s=>document.getElementById(s);if(this.root.hidden=!t||this.game.lobbyOpen,!t){this.client=null;return}if((this.client!==t||this.roomId!==t.roomId)&&(this.client=t,this.roomId=t.roomId,this.version=-1,this.lastId=t.chatMessages.at(-1)?.id??0,this.unread=0,this.draft=null,this.input.value="",this.nodes.clear(),this.list.replaceChildren()),this.root.hidden)return;const n=t.connected&&!!t.chatId;if(e("chat-room-title").textContent=`PHÒNG ${t.roomId}`,e("chat-state").textContent=t.connected?t.chatId?"Người chơi & khán giả":"Máy chủ cần cập nhật chat":"Đang kết nối lại…",this.draft&&!t.chatPending&&t.chatMessages.some(r=>r.requestId===this.draft.id&&r.authorId===t.chatId)&&(this.input.value===this.draft.text&&(this.input.value=""),this.draft=null),this.version!==t.chatVersion){const s=this.list.scrollHeight-this.list.scrollTop-this.list.clientHeight<50;this.unread+=t.chatMessages.filter(a=>a.id>this.lastId&&a.authorId!==t.chatId).length;const r=new Set(t.chatMessages.map(a=>a.id));for(const[a,o]of this.nodes)r.has(a)||(o.remove(),this.nodes.delete(a));if(t.chatMessages.length)this.list.querySelector(".chat-empty")?.remove();else if(!this.list.children.length){const a=document.createElement("p");a.className="chat-empty",a.textContent="Một lời chào, một trận đấu hay. Tin nhắn hiển thị với mọi người trong phòng.",this.list.append(a)}for(const a of t.chatMessages)if(!this.nodes.has(a.id)){const o=this.messageNode(a,t);this.nodes.set(a.id,o),this.list.append(o)}this.lastId=t.chatMessages.at(-1)?.id??0,this.version=t.chatVersion,(s||t.chatMessages.at(-1)?.authorId===t.chatId)&&(this.list.scrollTop=this.list.scrollHeight)}this.open&&(this.unread=0),this.panel.hidden=!this.open,this.root.classList.toggle("is-collapsed",!this.open),e("chat-toggle").setAttribute("aria-expanded",String(this.open)),e("chat-chevron").textContent=this.open?"−":"＋",e("chat-badge").hidden=!this.unread,e("chat-badge").textContent=this.unread>99?"99+":String(this.unread),this.input.disabled=!n,this.send.disabled=!n||!!t.chatPending||!this.input.value.trim(),this.send.textContent=t.chatPending?"Đang gửi…":"Gửi ↗",e("chat-count").textContent=`${this.input.value.length} / 300 · Enter để gửi`,e("chat-error").hidden=!t.chatError,e("chat-error").textContent=t.chatError}}const Et={halfWidth:2.8,halfHeight:1.4,radius:.065,pocketRadius:.15},be=[{x:-2.8,z:-1.4,name:"Top left"},{x:0,z:-1.4,name:"Top middle"},{x:2.8,z:-1.4,name:"Top right"},{x:-2.8,z:1.4,name:"Bottom left"},{x:0,z:1.4,name:"Bottom middle"},{x:2.8,z:1.4,name:"Bottom right"}],di=[{id:"eight",name:"8-Ball Pool",short:"8-BALL",tag:"THE CLASSIC",description:"Solids or stripes. Clear your colors, then sink the eight.",balls:15},{id:"nine",name:"9-Ball Pool",short:"9-BALL",tag:"FAST & TACTICAL",description:"Play the lowest ball first. A legal nine takes the match.",balls:9},{id:"ten",name:"10-Ball Pool",short:"10-BALL",tag:"PRECISION PLAY",description:"Every shot has a purpose. Call your ball and pocket.",balls:10},{id:"carom",name:"Carom Billiards",short:"CAROM",tag:"PURE TECHNIQUE",description:"Three balls. No pockets. Connect with both to score.",balls:3},{id:"three",name:"Three-Cushion",short:"3-CUSHION",tag:"MASTER THE ANGLES",description:"Find three cushions before the second object ball.",balls:3}],Ec=["#f6f5e9","#e9b724","#2866c2","#d2453e","#8051a4","#e77830","#2a8b6b","#8c3644","#20262a","#e9b724","#2866c2","#d2453e","#8051a4","#e77830","#2a8b6b","#8c3644"];function oi(i,t,e){return{id:i,x:t,z:e,vx:0,vz:0,radius:Et.radius,mass:1,active:!0,spin:{x:0,y:0},angularVelocity:0}}function wc(i,t){const e=[oi(0,-1.4,0)],n=Et.radius*2+.002;let s=0;for(let r=0;r<t;r++)for(let a=0;a<=r;a++)e.push(oi(i[s++],1.05+r*n*Math.sqrt(3)/2,(a-r/2)*n));return e}class xo{constructor({id:t,name:e,pockets:n=!0,targetScore:s=5}){this.id=t,this.name=e,this.pockets=n,this.targetScore=Math.max(1,Math.min(50,Number(s)||5)),this.currentPlayer=0,this.scores=[0,0],this.groups=[null,null],this.winner=null,this.isBreak=!0}cueId(){return 0}switchTurn(){this.currentPlayer=1-this.currentPlayer}legalTargets(t){return t.filter(e=>e.active&&e.id!==this.cueId()).map(e=>e.id)}result(t,e={}){return{foul:!1,ballInHand:!1,message:t,winner:this.winner,respot:[],...e}}shotFacts({events:t=[],balls:e=[],initialBalls:n=null}){const s=this.cueId(),r=t.filter(d=>d.type==="pocket"),a=r.map(d=>d.ball),o=n||e.filter(d=>d.active||a.includes(d.id)),c=t.findIndex(d=>d.type==="collision"&&(d.a===s||d.b===s)),l=c<0?null:t[c].a===s?t[c].b:t[c].a,h=c<0?[]:t.slice(c+1),u=h.some(d=>d.type==="cushion"||d.type==="pocket"),f=new Set(h.filter(d=>d.type==="cushion"&&d.ball!==s).map(d=>d.ball)).size;return{cue:s,pockets:r,potted:a,before:o,first:l,railOrPocket:u,breakRails:f,events:t}}poolFoul(t,e){if(t.potted.includes(t.cue))return"Scratch — cue ball pocketed.";if(t.first===null)return"No object ball contacted.";if(!e.includes(t.first))return"Wrong first contact.";const n=t.potted.some(s=>s!==t.cue);return this.isBreak&&!n&&t.breakRails<4?"Illegal break — pocket a ball or send four object balls to cushions.":!this.isBreak&&!t.railOrPocket?"No cushion or pocket after contact.":null}foul(t,e={}){return this.isBreak=!1,this.switchTurn(),this.result(`${t} Ball in hand for Player ${this.currentPlayer+1}.`,{foul:!0,ballInHand:!0,...e})}display(t){return{objective:"Choose your line. Commit to the shot.",players:[0,1].map(e=>({label:`Player ${e+1}`,detail:`${this.scores[e]} points`,remaining:[]}))}}}const Dn=i=>i>=1&&i<=7?"solids":i>=9&&i<=15?"stripes":null;class Vh extends xo{constructor(t={}){super({...t,id:"eight",name:"8-Ball Pool"})}setup(){return wc([1,9,2,10,8,3,11,4,12,5,6,13,7,14,15],5)}legalTargets(t){const e=this.groups[this.currentPlayer];if(!e)return t.filter(s=>s.active&&Dn(s.id)).map(s=>s.id);const n=t.filter(s=>s.active&&Dn(s.id)===e).map(s=>s.id);return n.length?n:[8]}updateScores(t){this.scores=this.groups.map(e=>e?7-t.filter(n=>n.active&&Dn(n.id)===e).length:0)}evaluateShot(t){const e=this.shotFacts(t),n=this.legalTargets(e.before),s=this.poolFoul(e,n),r=this.isBreak;this.isBreak=!1;const a=e.pockets.find(c=>c.ball===8);if(a&&!r){const c=!s&&n.includes(8)&&t.calledPocket===a.pocket;return this.winner=c?this.currentPlayer:1-this.currentPlayer,this.updateScores(t.balls),this.result(c?"Eight in the called pocket. Match won!":"Illegal eight — pocket it only after clearing your group, in the called pocket.",{foul:!c})}if(s)return this.updateScores(t.balls),this.foul(s,{respot:a?[8]:[]});if(!r&&!this.groups[this.currentPlayer]){const c=e.potted.map(Dn).find(Boolean);c&&(this.groups[this.currentPlayer]=c,this.groups[1-this.currentPlayer]=c==="solids"?"stripes":"solids")}const o=e.potted.some(c=>r?Dn(c)||c===8:Dn(c)===this.groups[this.currentPlayer]);return this.updateScores(t.balls),o||this.switchTurn(),this.result(a?"Eight on the break is spotted. Continue.":o?`Legal pocket. Player ${this.currentPlayer+1} continues.`:`Player ${this.currentPlayer+1} to shoot.`,{respot:a?[8]:[]})}display(t){const e=this.legalTargets(t);return{objective:e[0]===8&&e.length===1?"Call a pocket for the eight, then make your finish.":this.groups[this.currentPlayer]?`Pocket your ${this.groups[this.currentPlayer]}. Save the eight for last.`:this.isBreak?"Break the rack. Pocket a ball or reach four cushions.":"Open table. A legal pocket assigns solids and stripes.",players:[0,1].map(n=>({label:`Player ${n+1}`,detail:this.groups[n]||"Open table",remaining:t.filter(s=>s.active&&(this.groups[n]?Dn(s.id)===this.groups[n]:Dn(s.id))).map(s=>s.id)}))}}}class Tc extends xo{constructor(t={}){super({...t,id:"nine",name:"9-Ball Pool"})}setup(){const t=[oi(0,-1.4,0)],e=Et.radius*2+.002,n=[1,2,3,4,9,5,6,7,8];let s=0;return[1,2,3,2,1].forEach((r,a)=>{for(let o=0;o<r;o++)t.push(oi(n[s++],1.05+a*e*Math.sqrt(3)/2,(o-(r-1)/2)*e))}),t}legalTargets(t){const e=t.filter(n=>n.active&&n.id>0).map(n=>n.id);return e.length?[Math.min(...e)]:[]}evaluateShot(t){const e=this.shotFacts(t),n=this.poolFoul(e,this.legalTargets(e.before));if(this.isBreak=!1,n)return this.foul(n,{respot:e.potted.includes(9)?[9]:[]});if(e.potted.includes(9))return this.winner=this.currentPlayer,this.scores[this.currentPlayer]++,this.result("A legal nine. Match won!");const s=e.potted.filter(r=>r>0).length;return this.scores[this.currentPlayer]+=s,s||this.switchTurn(),this.result(s?"Legal pocket. Keep your turn.":`Player ${this.currentPlayer+1} to shoot.`)}display(t){return{objective:`Contact the ${this.legalTargets(t)[0]??"nine"} first. A legal nine wins, including combinations.`,players:[0,1].map(e=>({label:`Player ${e+1}`,detail:`${this.scores[e]} pocketed`,remaining:t.filter(n=>n.active&&n.id>0).map(n=>n.id).sort((n,s)=>n-s)}))}}}class Wh extends Tc{constructor(t={}){super(t),this.id="ten",this.name="10-Ball Pool"}setup(){return wc([1,2,3,4,10,5,6,7,8,9],4)}evaluateShot(t){const e=this.shotFacts(t),n=this.legalTargets(e.before),s=this.poolFoul(e,n),r=this.isBreak;this.isBreak=!1;const a=e.pockets.find(l=>l.ball===10);if(s)return this.foul(s,{respot:a?[10]:[]});const o=e.pockets.find(l=>l.ball===Number(t.calledBall)&&l.pocket===t.calledPocket);if(a&&!r&&n[0]===10&&o?.ball===10)return this.winner=this.currentPlayer,this.scores[this.currentPlayer]++,this.result("Ten in the called pocket. Match won!");const c=r?e.potted.some(l=>l>0&&l!==10):!!(o&&o.ball!==10);return this.scores[this.currentPlayer]+=e.potted.filter(l=>l>0&&l!==10).length,c||this.switchTurn(),this.result(a?"Ten spotted. It must be called and pocketed last.":c?"Called ball made. Keep your turn.":r?`Legal break. Player ${this.currentPlayer+1} to shoot.`:`No called pocket. Player ${this.currentPlayer+1} to shoot.`,{respot:a?[10]:[]})}display(t){const e=super.display(t);return e.objective=this.isBreak?"Break the rack. The ten is spotted on the break.":`Contact the ${this.legalTargets(t)[0]??10} first. Call a ball and pocket; finish with the ten last.`,e}}class Ac extends xo{constructor(t={}){super({...t,id:"carom",name:"Carom Billiards",pockets:!1}),this.isBreak=!1}setup(){return[oi(0,-1.4,.38),oi(1,-1.4,-.38),oi(2,1.4,0)]}cueId(){return this.currentPlayer}evaluateShot(t){const e=this.cueId(),n=new Set;let s=0,r=0;for(const o of t.events)if(o.type==="cushion"&&o.ball===e&&s++,o.type==="collision"&&(o.a===e||o.b===e)&&(n.add(o.a===e?o.b:o.a),n.size===2)){r=s;break}const a=n.size===2&&(this.id!=="three"||r>=3);return this.lastCushionCount=n.size===2?r:s,a?(this.scores[this.currentPlayer]++,this.scores[this.currentPlayer]>=this.targetScore&&(this.winner=this.currentPlayer),this.result(this.winner!==null?"Target reached. Match won!":"Carom! One point. Keep your turn.")):(this.switchTurn(),this.result(this.id==="three"?`No point — three cushions must precede the second object ball. Player ${this.currentPlayer+1} to shoot.`:`No carom. Player ${this.currentPlayer+1} to shoot.`))}display(){return{objective:this.id==="three"?`Three cushions before the second object ball. First to ${this.targetScore}.`:`Hit both object balls with your cue ball. First to ${this.targetScore}.`,players:[0,1].map(t=>({label:`Player ${t+1}`,detail:`${t===0?"White":"Yellow"} · ${this.scores[t]} / ${this.targetScore}`,remaining:[]}))}}}class Xh extends Ac{constructor(t={}){super(t),this.id="three",this.name="Three-Cushion Billiards"}}function Cc(i,t={}){const e={eight:Vh,nine:Tc,ten:Wh,carom:Ac,three:Xh};if(!e[i])throw new Error(`Unknown game mode: ${i}`);return new e[i](t)}const Fs="velvet-room-session";async function qh(){let i="";if(!i)try{const e=await fetch(new URL("./online-config.json",document.baseURI),{cache:"no-store"});e.ok&&(i=(await e.json()).serverUrl||"")}catch{}if(!i&&location.hostname.endsWith(".github.io"))throw new Error("Phòng online chưa được kích hoạt trên website này. Bạn vẫn có thể chọn Đấu với máy.");const t=new URL(i||location.origin);if(!["https:","http:","wss:","ws:"].includes(t.protocol)||t.username||t.password)throw new Error("Địa chỉ máy chủ online không hợp lệ.");if(location.protocol==="https:"&&["http:","ws:"].includes(t.protocol))throw new Error("Máy chủ online cần kết nối HTTPS an toàn.");return t.protocol=["https:","wss:"].includes(t.protocol)?"wss:":"ws:",t.pathname="/ws",t.search="",t.hash="",t.href}class Ms{constructor(t,e=()=>{}){this.game=t,this.onChange=e,this.connected=!1,this.closed=!1,this.seat=null,this.info=null,this.pending=!1,this.frames=[],this.name="Khách",this.retry=0,this.lastAimAt=0,this.chatMessages=[],this.chatVersion=0,this.chatId=null,this.chatPending=null,this.chatError="",this.chatSequence=0}static saved(){try{return JSON.parse(sessionStorage.getItem(Fs)||"null")}catch{return null}}get canAct(){return this.connected&&this.info?.ready&&this.info.phase==="playing"&&this.seat===this.game.mode.currentPlayer&&!this.pending}get canShoot(){return this.canAct&&["PLAYER_TURN","BREAK_SHOT"].includes(this.game.state)}get showAim(){return this.connected&&this.info?.ready&&["PLAYER_TURN","BREAK_SHOT"].includes(this.game.state)}async connect(t){if(this.closed=!1,this.request=t,this.name=t.name||this.name,this.url=await qh(),this.closed)throw new Error("Đã hủy kết nối.");return this.open(!1)}open(t){return new Promise((e,n)=>{const s=this.socket=new WebSocket(this.url);let r=!1;const a=c=>{r||(r=!0,clearTimeout(o),c?n(c):e(this))},o=setTimeout(()=>{a(new Error("Chưa kết nối được máy chủ. Máy chủ có thể đang khởi động; hãy thử lại sau ít phút.")),s.close()},25e3);s.addEventListener("open",()=>{const c=t?{type:"join",roomId:this.roomId,name:this.name,spectate:this.seat==null,resumeToken:this.resumeToken}:this.request;s.send(JSON.stringify(c))}),s.addEventListener("message",c=>{if(this.closed)return;let l;try{l=JSON.parse(c.data)}catch{return}if(l.type==="joined"){this.roomId=l.roomId,this.seat=l.seat,this.resumeToken=l.resumeToken,this.connected=!0,this.chatId=l.chatId??null,this.chatMessages=Array.isArray(l.messages)?l.messages.slice(-50):[],this.chatVersion++,this.chatPending=null,this.retry=0,this.game.online=this;try{sessionStorage.setItem(Fs,JSON.stringify({roomId:this.roomId,resumeToken:this.resumeToken,seat:this.seat,name:this.name}))}catch{}}else if(l.type==="chat"&&l.roomId===this.roomId){const h=l.message;if(!h||typeof h.text!="string"||!Number.isSafeInteger(h.id))return;this.chatMessages.some(u=>u.id===h.id)||(this.chatMessages.push(h),this.chatMessages=this.chatMessages.slice(-50),this.chatVersion++),h.authorId===this.chatId&&(this.chatError=""),h.authorId===this.chatId&&h.requestId===this.chatPending?.id&&(this.chatPending=null,this.chatError=""),this.game.notify()}else if(l.type==="chatError")l.requestId===this.chatPending?.id&&(this.chatPending=null,this.chatError=l.message,this.game.notify());else if(l.type==="renamed"){this.name=l.name;try{localStorage.setItem("velvet-player-name",l.name);const h=Ms.saved();h?.roomId===this.roomId&&sessionStorage.setItem(Fs,JSON.stringify({...h,name:l.name}))}catch{}this.game.setSettings({playerNames:[l.name,this.game.settings.playerNames?.[1]||"Người chơi 2"]}),this.game.notify(),this.onChange(this)}else l.type==="snapshot"&&this.connected?(this.receive(l),a()):l.type==="error"?(this.pending=!1,this.error=l.message,r||(a(new Error(l.message)),this.closed=!0,s.close(),t&&(this.connectionLost=!0)),this.game.notify(),this.onChange(this)):l.type==="replaced"&&(this.closed=!0,this.connected=!1,this.error=l.message,this.clearSaved(),this.game.notify(),this.onChange(this),a(new Error(l.message)))}),s.addEventListener("close",()=>{const c=!!this.roomId;this.connected=!1,this.pending=!1,this.chatPending=null,a(new Error("Kết nối máy chủ đã đóng. Vui lòng thử lại.")),c&&!this.closed&&(this.error="Mất kết nối. Đang thử kết nối lại…",this.frames=[],this.disconnectedAt||(this.disconnectedAt=Date.now()),Date.now()-this.disconnectedAt<6e4?this.retryTimer=setTimeout(()=>this.open(!0).catch(l=>{this.error=l.message,this.onChange(this)}),Math.min(1e3*2**this.retry++,5e3)):(this.connectionLost=!0,this.error="Kết nối đã hết thời gian giữ ghế. Hãy về sảnh và vào lại phòng.",this.clearSaved())),this.game.notify(),this.onChange(this)}),s.addEventListener("error",()=>{})})}receive(t){const e=this.game,n=this.info;if(n&&n.matchId===t.matchId&&t.seq<=n.seq)return;const s=!n||n.matchId!==t.matchId,r=s||n.revision!==t.revision;s&&(e.mode=Cc(t.mode.id,{targetScore:t.mode.targetScore}),e.scene.setMode(e.mode.pockets),this.frames=[],this.lastSavedMatch=null),this.info=t,this.error="",this.disconnectedAt=null,this.connectionLost=!1,r&&(this.pending=!1,this.lastAim=null);const a=this.seat===t.mode.currentPlayer&&t.ready&&["PLAYER_TURN","BREAK_SHOT"].includes(t.state)&&!r;Object.assign(e.mode,t.mode),e.physics.pockets=e.mode.pockets,e.physics.setBalls(t.balls),e.state=t.state,e.placementAllowed=!!t.placementAllowed;const o=typeof t.aimGuide=="boolean"&&t.aimGuide!==e.settings.aimGuide;e.applySharedAimGuide(t.aimGuide),e.shots=t.shots,e.cushions=t.cushions,e.message=t.message,a||Object.assign(e,t.aim,{jump:t.aim.jump??0,spin:{...t.aim.spin}}),this.frames.push({at:performance.now(),balls:t.balls}),this.frames.length>10&&this.frames.shift();for(const c of t.effects||[])e.audio.play(c.type,c.strength??.5);t.state==="GAME_OVER"&&this.lastSavedMatch!==t.matchId&&(this.lastSavedMatch=t.matchId,e.audio.play(this.seat!=null&&e.mode.winner!==this.seat?"lose":"win"),this.seat!=null&&e.saveMatch()),(r||o||n?.ready!==t.ready)&&e.notify(),this.onChange(this)}send(t){return!this.connected||this.socket?.readyState!==WebSocket.OPEN?!1:(this.socket.send(JSON.stringify(t)),!0)}command(t,e={}){return this.info?this.send({type:t,matchId:this.info.matchId,revision:this.info.revision,...e}):!1}shotData(){const t=this.game;return{angle:t.angle,power:t.power,jump:t.jump,spin:{...t.spin},calledBall:t.calledBall,calledPocket:t.calledPocket}}sendChat(t){if(!this.connected||!this.info||!this.chatId||this.chatPending||(t=t.trim(),!t||t.length>300))return!1;const e=`c${Date.now().toString(36)}${(++this.chatSequence).toString(36)}`,n=this.send({type:"chat",text:t,requestId:e});return n&&(this.chatPending={id:e,text:t,sentAt:performance.now()},this.chatError="",this.game.notify()),n}shoot(){if(!this.canShoot)return!1;const t=this.command("shoot",this.shotData());return t&&(this.pending=!0,this.pendingAt=performance.now(),this.game.notify()),t}place(t,e){if(!this.canAct||!(this.game.state==="BALL_IN_HAND"||this.game.canReposition))return!1;const n=this.command("place",{x:t,z:e});return n&&(this.pending=!0,this.pendingAt=performance.now()),n}repositionCue(){if(!this.game.canReposition)return!1;const t=this.command("reposition");return t&&(this.pending=!0,this.pendingAt=performance.now()),t}pause(){this.seat!=null&&this.connected&&this.info?.ready&&this.command("pause")}rematch(){this.seat!=null&&this.game.state==="GAME_OVER"?this.command("rematch"):(this.error="Phòng online chỉ tái đấu khi trận kết thúc và cả hai người đồng ý.",this.game.notify())}claimSeat(){return this.command("claim")}update(){const t=performance.now();if(this.chatPending&&t-this.chatPending.sentAt>1e4&&(this.chatPending=null,this.chatError="Chưa xác nhận tin nhắn. Kiểm tra kết nối rồi thử lại.",this.game.notify()),this.pending&&t-this.pendingAt>3e3&&(this.pending=!1,this.error="Cú đánh chưa được xác nhận. Kiểm tra kết nối rồi thử lại."),this.canShoot&&t-this.lastAimAt>80){const a=this.shotData(),o=JSON.stringify(a);o!==this.lastAim&&(this.command("aim",a),this.lastAim=o),this.lastAimAt=t}if(!this.frames.length){this.renderBalls=this.game.physics.balls;return}const e=t-90;for(;this.frames.length>2&&this.frames[1].at<e;)this.frames.shift();const n=this.frames[0],s=this.frames[1]||n,r=n===s?1:Math.max(0,Math.min(1,(e-n.at)/(s.at-n.at||1)));this.renderBalls=s.balls.map((a,o)=>{const c=n.balls[o];return!c||c.id!==a.id||c.active!==a.active||Math.hypot(c.x-a.x,c.z-a.z)>1?a:{...a,x:c.x+(a.x-c.x)*r,z:c.z+(a.z-c.z)*r,height:(c.height??0)+((a.height??0)-(c.height??0))*r,vy:(c.vy??0)+((a.vy??0)-(c.vy??0))*r}})}clearSaved(){try{Ms.saved()?.roomId===(this.roomId||this.request?.roomId)&&sessionStorage.removeItem(Fs)}catch{}}leave(){this.closed=!0,clearTimeout(this.retryTimer),this.send({type:"leave"}),this.clearSaved(),this.socket?.close(),this.connected=!1,this.game.online===this&&(this.game.online=null,this.game.start()),this.onChange(null)}}function Or(i,t="Người chơi"){return(typeof i=="string"?i:"").replace(/[\u0000-\u001f\u007f<>\u202a-\u202e\u2066-\u2069]/g,"").trim().slice(0,24)||t}const Tt=i=>document.querySelector(i),il=di.map(i=>`<option value="${i.id}">${i.name}</option>`).join("");class Yh{constructor(t){this.game=t,document.body.insertAdjacentHTML("beforeend",`
<section id="room-lobby" class="lobby-screen" aria-label="Sảnh chơi billiards">
  <header class="lobby-header"><a class="brand" href="#" id="lobby-home"><span class="brand-mark">v<span>•</span></span><span>velvet<small>BILLIARDS CLUB</small></span></a><span class="lobby-topline"><i></i> CÙNG MỘT BÀN. CÙNG MỘT NHỊP.</span><button class="secondary" id="lobby-resume" hidden>Về bàn đang chơi →</button></header>
  <div class="lobby-content"><div class="eyebrow"><span></span> MỘT TRẬN ĐẤU HAY BẮT ĐẦU TỪ ĐÂY</div><h1>Hẹn nhau ở bàn bi.</h1><p class="lobby-intro">Mời một người bạn, vào xem một trận hay, hoặc thử sức với máy.<br>Chọn cách chơi của bạn — phần còn lại, để đường bi lên tiếng.</p>
  <div class="lobby-name"><label for="room-name">TÊN NGƯỜI CHƠI</label><input id="room-name" maxlength="24" autocomplete="nickname" placeholder="Ví dụ: Hiệp" value="Người chơi"><button type="button" id="edit-player-names" class="text-button">Đặt / đổi tên người chơi →</button></div>
  <div id="lobby-feedback" role="status" hidden></div>
  <div class="lobby-grid">
    <form id="create-room-form" class="lobby-card featured"><div class="lobby-card-art"><span class="lobby-ball eight">8</span><span class="art-line"></span><span class="art-caption">YOUR TABLE, YOUR PEOPLE.</span></div><span class="lobby-card-tag">01 / MỜI BẠN CÙNG CHƠI</span><h2>Tạo phòng</h2><p>Một mã phòng riêng. Hai người thi đấu.<br>Bạn bè có thể vào xem và theo dõi trực tiếp.</p><label>CHẾ ĐỘ<select id="room-mode">${il}</select></label><label>ĐIỂM ĐÍCH CAROM<select id="room-target"><option>3</option><option selected>5</option><option>10</option><option>20</option></select></label><button class="primary full" id="create-room" type="submit">Tạo phòng mới <span>→</span></button><small>Chia sẻ mã hoặc đường dẫn để mời bạn.</small></form>
    <form id="join-room-form" class="lobby-card"><div class="lobby-card-art join-art"><span class="lobby-ball white"></span><span class="lobby-ball gold"></span><span class="art-line"></span></div><span class="lobby-card-tag">02 / GẶP NHAU TẠI ĐÂY</span><h2>Nhập mã phòng</h2><p>Đã có lời hẹn? Nhập mã để ngồi vào bàn,<br>hoặc chọn một chỗ trong hàng ghế khán giả.</p><label>MÃ PHÒNG<input id="room-code" placeholder="VD: AB3K7X" maxlength="6" minlength="6" pattern="[A-Za-z2-9]{6}" autocomplete="off" required spellcheck="false"></label><div class="join-room-actions"><button class="primary full" type="submit" data-role="player">Vào chơi <span>→</span></button><button class="secondary full" type="submit" data-role="spectator">Vào xem trận đấu <span>◎</span></button></div><small>Đủ 2 người chơi? Bạn sẽ tự vào ghế khán giả.</small></form>
    <section class="lobby-card ai-card"><div class="lobby-card-art"><span class="lobby-ball striped">9</span><span class="art-spark">✦</span><span class="art-line"></span></div><span class="lobby-card-tag">03 / MỘT CHÚT THỬ THÁCH</span><h2>Đấu với máy</h2><p>Tập một cú khó. Tìm một góc mới.<br>Đối thủ của bạn luôn sẵn sàng, kể cả offline.</p><label>CHẾ ĐỘ<select id="ai-mode">${il}</select></label><label>ĐỘ KHÓ<select id="lobby-difficulty"><option value="easy">Dễ · khởi động nhẹ nhàng</option><option value="medium" selected>Vừa · một đối thủ xứng tầm</option><option value="hard">Khó · thử thách đường bi</option></select></label><button class="primary full" id="play-ai">Chơi cùng máy <span>→</span></button><small>Không cần tạo phòng hay chờ đối thủ.</small></section>
  </div><div class="lobby-bottom"><span>2 GHẾ CHƠI <i>·</i> NHIỀU GHẾ KHÁN GIẢ <i>·</i> 5 CHẾ ĐỘ</span><button id="play-local">Chơi trên cùng thiết bị →</button></div></div>
  <footer class="lobby-footer"><span>GOOD GAMES. GREAT COMPANY.</span><span>Mỗi đường bi đều có một câu chuyện. ✦</span></footer>
</section>`),Tt("#play-area").insertAdjacentHTML("beforebegin",'<section id="online-room" class="online-room" aria-label="Thông tin phòng online" hidden><div class="room-code-block"><span class="control-label">PHÒNG ONLINE</span><button id="copy-room-code" title="Sao chép mã phòng"><strong id="current-room-code"></strong><span>⧉</span></button></div><div class="room-meta"><strong id="room-role"></strong><span id="room-status" aria-live="polite"></span></div><div class="room-spectators"><span>◎</span> <strong id="spectator-count">0</strong> người xem</div><div class="room-banner-actions"><button id="copy-play-link" class="secondary">Mời bạn</button><button id="copy-watch-link" class="secondary">Link xem</button><button id="claim-seat" class="primary" hidden>Ngồi vào bàn</button><button id="rename-in-room" class="secondary">Đổi tên</button><button id="leave-room" class="text-button">Rời phòng</button></div><p id="room-notice" role="status" hidden></p></section>'),document.body.insertAdjacentHTML("beforeend",'<dialog id="names-dialog"><form id="names-form"><div class="modal-header"><h2>Tên trên bàn bi</h2><button type="button" class="icon-button" id="close-names" aria-label="Đóng">×</button></div><label>Tên của bạn<input id="name-first" maxlength="24" required autocomplete="nickname"></label><label id="second-name-label">Tên người chơi thứ hai<input id="name-second" maxlength="24" required></label><p class="fine-print">Tối đa 24 ký tự, hỗ trợ tiếng Việt. Tên được nhớ trên trình duyệt này; trong phòng online, mọi người sẽ thấy tên mới.</p><p id="names-error" role="alert"></p><button class="primary full" type="submit">Lưu tên</button></form></dialog>'),Tt("#edit-player-names").onclick=()=>this.editNames(),Tt("#rename-in-room").onclick=()=>this.editNames(),Tt("#close-names").onclick=()=>Tt("#names-dialog").close(),Tt("#footer-help").insertAdjacentHTML("beforebegin",'<button id="edit-names-at-table">Đổi tên</button>'),Tt("#edit-names-at-table").onclick=()=>this.editNames(),Tt("#names-form").onsubmit=r=>{r.preventDefault(),this.saveNames()};try{Tt("#room-name").value=localStorage.getItem("velvet-player-name")||"Người chơi"}catch{}Tt("#lobby-home").onclick=r=>{r.preventDefault()},Tt("#create-room-form").onsubmit=r=>{r.preventDefault(),this.connect({type:"create",mode:Tt("#room-mode").value,targetScore:Number(Tt("#room-target").value),aimGuide:this.game.settings.aimGuide,name:this.name()})},Tt("#join-room-form").onsubmit=r=>{r.preventDefault(),this.connect({type:"join",roomId:Tt("#room-code").value.trim().toUpperCase(),spectate:r.submitter?.dataset.role==="spectator",name:this.name()})},Tt("#room-code").oninput=r=>{r.target.value=r.target.value.toUpperCase().replace(/[^A-Z2-9]/g,"")},Tt("#play-ai").onclick=()=>this.playOffline("ai"),Tt("#play-local").onclick=()=>this.playOffline("local"),Tt("#lobby-resume").onclick=()=>this.hide(),Tt("#leave-room").onclick=()=>{this.game.online?.seat!=null&&!window.confirm("Rời phòng sẽ nhường ghế và kết thúc trận hiện tại. Bạn muốn rời phòng?")||(this.game.online?.leave(),this.clearInvitation(),this.show(),this.update())},Tt("#copy-room-code").onclick=()=>this.copy(this.game.online.roomId,"Đã sao chép mã phòng."),Tt("#copy-play-link").onclick=()=>this.copy(this.invitation(!1),"Đã sao chép lời mời vào chơi."),Tt("#copy-watch-link").onclick=()=>this.copy(this.invitation(!0),"Đã sao chép đường dẫn xem trận đấu."),Tt("#claim-seat").onclick=()=>this.game.online?.claimSeat();const e=new URLSearchParams(location.search),n=e.get("room");n&&(Tt("#room-code").value=n.toUpperCase().slice(0,6),e.get("watch")==="1"&&Tt('#join-room-form [data-role="spectator"]').classList.add("invite-highlight"),this.feedback("Bạn được mời vào phòng "+Tt("#room-code").value+". Chọn Vào chơi hoặc Vào xem trận đấu.")),this.show();const s=Ms.saved();s&&(!n||n.toUpperCase()===s.roomId)&&(Tt("#room-name").value=s.name,this.connect({type:"join",roomId:s.roomId,name:s.name,resumeToken:s.resumeToken,spectate:s.seat==null}))}name(){const t=Or(Tt("#room-name").value);this.game.setSettings({playerNames:[t,this.game.settings.playerNames?.[1]||"Người chơi 2"]});try{localStorage.setItem("velvet-player-name",t)}catch{}return t}editNames(){const t=this.game.online;Tt("#name-first").value=t?.name||Tt("#room-name").value||this.game.playerName(0),Tt("#name-second").value=this.game.settings.playerNames?.[1]||"Người chơi 2",Tt("#second-name-label").hidden=!!t||this.game.settings.opponent==="ai",Tt("#name-second").disabled=Tt("#second-name-label").hidden,Tt("#names-error").textContent="",Tt("#names-dialog").showModal(),Tt("#name-first").focus()}saveNames(){const t=Or(Tt("#name-first").value,""),e=Or(Tt("#name-second").value,"Người chơi 2");if(!t){Tt("#names-error").textContent="Vui lòng nhập tên hợp lệ.";return}const n=this.game.online;if(n){if(!n.command("rename",{name:t})){Tt("#names-error").textContent="Chưa kết nối được máy chủ. Hãy thử lại.";return}}else{this.game.setSettings({playerNames:[t,e]});try{localStorage.setItem("velvet-player-name",t)}catch{}}Tt("#room-name").value=t,Tt("#names-dialog").close(),this.game.notify()}feedback(t,e=!1){const n=Tt("#lobby-feedback");n.hidden=!t,n.textContent=t,n.classList.toggle("error",e)}async connect(t){if(this.busy)return;if(this.game.online){this.feedback("Bạn đang ở trong một phòng. Về bàn và rời phòng trước khi vào phòng khác.",!0);return}this.busy=!0,this.setBusy(!0),this.feedback("Đang kết nối máy chủ… lần đầu có thể cần thêm thời gian.");const e=this.connectingClient=new Ms(this.game,()=>this.update());try{await e.connect(t),this.hide(),this.feedback("");const n=new URL(location.href);n.searchParams.set("room",e.roomId),e.seat==null?n.searchParams.set("watch","1"):n.searchParams.delete("watch"),history.replaceState(null,"",n)}catch(n){this.feedback(n.message,!0),this.game.online||e.leave()}finally{this.connectingClient=null,this.busy=!1,this.setBusy(!1),this.update()}}setBusy(t){Tt("#create-room").disabled=t,Tt("#join-room-form").querySelectorAll("button").forEach(e=>e.disabled=t)}show(){Tt("#room-lobby").hidden=!1,document.body.classList.add("in-lobby"),this.game.lobbyOpen=!0,Tt("#lobby-resume").hidden=!this.game.online,window.scrollTo(0,0)}hide(){Tt("#room-lobby").hidden=!0,document.body.classList.remove("in-lobby"),this.game.lobbyOpen=!1,this.game.scene.resize(),this.game.notify(),window.scrollTo(0,0)}playOffline(t){this.game.online&&!window.confirm("Rời phòng online để chơi riêng trên thiết bị này?")||(this.connectingClient?.leave(),this.game.online?.leave(),this.clearInvitation(),this.name(),this.game.setSettings({opponent:t,difficulty:Tt("#lobby-difficulty").value}),this.game.start(Tt("#ai-mode").value),this.hide())}invitation(t){const e=new URL(location.href);return e.search="",e.hash="",e.searchParams.set("room",this.game.online.roomId),t&&e.searchParams.set("watch","1"),e.href}clearInvitation(){const t=new URL(location.href);t.searchParams.delete("room"),t.searchParams.delete("watch"),history.replaceState(null,"",t)}async copy(t,e){try{await navigator.clipboard.writeText(t),this.notice(e)}catch{this.notice("Sao chép nội dung này: "+t)}}notice(t){Tt("#room-notice").textContent=t,Tt("#room-notice").hidden=!t}update(){const t=this.game.online,e=t?.info;if(Tt("#online-room").hidden=!t,document.body.classList.toggle("is-online",!!t),document.body.classList.toggle("is-spectator",!!(t&&t.seat==null)),Tt("#lobby-resume").hidden=!t,!t||!e){this.notice(""),this.lastNoticeMatch=null;return}(this.lastNoticeMatch!==e.matchId||this.lastNoticeRevision!==e.revision||this.lastConnected===!1&&t.connected)&&this.notice(""),this.lastNoticeMatch=e.matchId,this.lastNoticeRevision=e.revision,this.lastConnected=t.connected,Tt("#current-room-code").textContent=t.roomId,Tt("#room-role").textContent=t.seat==null?"Bạn đang xem trận đấu":`Bạn là người chơi ${t.seat+1} · ${e.players[t.seat]?.name||""}`,Tt("#spectator-count").textContent=e.spectatorCount,Tt("#room-status").textContent=t.connected?e.ready?this.game.state==="GAME_OVER"?"Trận đã kết thúc":`Lượt của ${e.players[this.game.mode.currentPlayer]?.name||"người chơi"}`:e.players.some(n=>n&&!n.connected)?"Người chơi mất kết nối · giữ ghế 60 giây":"Đang chờ người chơi thứ hai":"Đang kết nối lại…",Tt("#claim-seat").hidden=t.seat!=null||!e.players.some(n=>n===null)||!t.connected,t.error&&this.notice(t.error),e.rematchVotes?.length&&this.notice("Đã có "+e.rematchVotes.length+"/2 người đồng ý tái đấu. Cả hai người cần chọn Chơi lại.")}}const sl=12;function $h(i){return i.radius??=Et.radius,i.mass??=1,i.vx??=0,i.vz??=0,i.height??=0,i.vy??=0,i.active??=!0,i.spin??={x:0,y:0},i.angularVelocity??=0,i}function jh(i,t,e,n,s){const r=i.height>0||i.vy!==0;let a=null;r&&(i.height+=i.vy*t-sl*t*t*.5,i.vy-=sl*t,i.height<=0&&(i.height=0,a=Math.abs(i.vy),i.vy=a>.16?a*.18:0)),i.x+=i.vx*t,i.z+=i.vz*t;const o=Math.hypot(i.vx,i.vz);if(o){const l=r?o*Math.exp(-.04*t):Math.max(0,o*Math.exp(-n*t)-e*t),h=l<s?0:l/o;i.vx*=h,i.vz*=h,i.angularVelocity=l/i.radius}const c=Math.exp(-1.1*t);return i.spin.x*=c,i.spin.y*=c,a}function Kh(i,t,e){if((i.height||0)>0||(t.height||0)>0||i.vy||t.vy)return Jh(i,t,e);const n=t.x-i.x,s=t.z-i.z,r=i.radius+t.radius,a=n*n+s*s;if(a>r*r)return null;const o=Math.sqrt(a),c=o>1e-9?n/o:1,l=o>1e-9?s/o:0,h=1/i.mass,u=1/t.mass,f=h+u,d=r-o;if(d>0){const m=(d+1e-8)/f;i.x-=c*m*h,i.z-=l*m*h,t.x+=c*m*u,t.z+=l*m*u}const g=(t.vx-i.vx)*c+(t.vz-i.vz)*l;if(g>=-1e-7)return null;const v=-(1+e)*g/f;i.vx-=v*c*h,i.vz-=v*l*h,t.vx+=v*c*u,t.vz+=v*l*u;for(const m of[i,t])if(m._followPending&&m._shotDirection){const p=m.spin.y*Math.min(-g,m._shotSpeed)*.32;m.vx+=m._shotDirection.x*p,m.vz+=m._shotDirection.z*p,m._followPending=!1,m.spin.y*=.35}return-g}function Jh(i,t,e){let n=t.x-i.x,s=t.z-i.z;const r=t.radius+t.height-i.radius-i.height,a=i.radius+t.radius;if(n*n+r*r+s*s>a*a)return null;n*n+s*s<1e-10&&Math.abs(r)>1e-6&&(n=1e-4);const c=Math.hypot(n,r,s),l=c>1e-9?n/c:1,h=c>1e-9?r/c:0,u=c>1e-9?s/c:0,f=1/i.mass,d=1/t.mass,g=i.height<=1e-8&&i.vy<=0&&h>0,v=t.height<=1e-8&&t.vy<=0&&h<0,m=l*l+u*u,p=f*(m+(g?0:h*h))+d*(m+(v?0:h*h));if(p<1e-12)return null;const S=a-c;if(S>0){const A=(S+1e-8)/p;i.x-=l*A*f,i.z-=u*A*f,t.x+=l*A*d,t.z+=u*A*d,g||(i.height=Math.max(0,i.height-h*A*f)),v||(t.height=Math.max(0,t.height+h*A*d))}const b=(t.vx-i.vx)*l+(t.vy-i.vy)*h+(t.vz-i.vz)*u;if(b>=-1e-7)return null;const x=-(1+e)*b/p;return i.vx-=x*l*f,i.vz-=x*u*f,t.vx+=x*l*d,t.vz+=x*u*d,g||(i.vy-=x*h*f),v||(t.vy+=x*h*d),i.height===0&&i.vy<0&&(i.vy=0),t.height===0&&t.vy<0&&(t.vy=0),-b}function rl(i,t,e){const n=Et.halfWidth-i.radius,s=Et.halfHeight-i.radius;if(i.x<-n||i.x>n){const r=Math.sign(i.x);if(i.x=r*n,i.vx*r>0){const a=Math.abs(i.vx);i.vx=-i.vx*t,i.vz+=r*i.spin.x*a*.18,i.spin.x*=.65,e({type:"cushion",ball:i.id,rail:r<0?"left":"right",strength:a})}}if(i.z<-s||i.z>s){const r=Math.sign(i.z);if(i.z=r*s,i.vz*r>0){const a=Math.abs(i.vz);i.vz=-i.vz*t,i.vx-=r*i.spin.x*a*.18,i.spin.x*=.65,e({type:"cushion",ball:i.id,rail:r<0?"top":"bottom",strength:a})}}}function Zh(i){if((i.height||0)>i.radius*.3||(i.vy||0)>.15)return-1;for(let t=0;t<be.length;t++){const e=be[t];if(Math.hypot(i.x-e.x,i.z-e.z)<Et.pocketRadius)return t}return-1}class Rc{constructor({pockets:t=!0,onEvent:e=()=>{},rollingResistance:n=.42,linearDamping:s=.14,ballRestitution:r=.96,cushionRestitution:a=.8}={}){this.pockets=t,this.onEvent=e,this.balls=[],this.rollingResistance=n,this.linearDamping=s,this.ballRestitution=r,this.cushionRestitution=a,this.sleepSpeed=.018,this.events=[],this._emit=o=>{this.events.push(o),this.onEvent(o)}}setBalls(t){this.balls=t.map($h),this.events=[]}shoot(t,e,n,s={x:0,y:0},r=0){const a=this.balls.find(l=>l.id===t&&l.active);if(!a||this.isMoving()||!Number.isFinite(e)||!Number.isFinite(n)||!Number.isFinite(r)||r<0||r>1)return!1;const o=.3+Math.max(0,Math.min(1,n))*7.7,c=o*(1-.27*r);return a.vx=Math.cos(e)*c,a.vz=Math.sin(e)*c,a.height=0,a.vy=r>0?(.6+2.8*r)*Math.sqrt(Math.max(0,Math.min(1,n))):0,a.spin={x:Math.max(-1,Math.min(1,s.x||0)),y:Math.max(-1,Math.min(1,s.y||0))},a._shotDirection={x:Math.cos(e),z:Math.sin(e)},a._shotSpeed=o,a._followPending=!0,!0}isMoving(){return this.balls.some(t=>t.active&&(Math.hypot(t.vx,t.vz)>this.sleepSpeed||t.height>1e-6||Math.abs(t.vy)>this.sleepSpeed))}step(t){if(this.events=[],!Number.isFinite(t)||t<=0)return this.events;let e=0,n=Et.radius;for(const o of this.balls)o.active&&(e=Math.max(e,Math.hypot(o.vx,o.vz,o.vy)),n=Math.min(n,o.radius));const s=Math.min(1/240,n*.45/Math.max(e,.1)),r=Math.max(1,Math.ceil(Math.min(t,.25)/s)),a=Math.min(t,.25)/r;for(let o=0;o<r;o++){for(const c of this.balls){if(!c.active)continue;const l=jh(c,a,this.rollingResistance,this.linearDamping,this.sleepSpeed);if(l!==null&&l>.16&&this._emit({type:"landing",ball:c.id,strength:l}),this.pockets){const h=Zh(c);if(h>=0){c.active=!1,c.pocket=h,c.vx=c.vz=c.vy=c.height=c.angularVelocity=0,this._emit({type:"pocket",ball:c.id,pocket:h});continue}}rl(c,this.cushionRestitution,this._emit)}for(let c=0;c<6;c++)for(let l=0;l<this.balls.length;l++){const h=this.balls[l];if(h.active){for(let u=l+1;u<this.balls.length;u++){const f=this.balls[u];if(!f.active)continue;const d=Kh(h,f,this.ballRestitution);d!==null&&d>.01&&this._emit({type:"collision",a:h.id,b:f.id,strength:d})}rl(h,this.cushionRestitution,this._emit)}}}return this.events}canPlace(t,e,n){if(!Number.isFinite(t)||!Number.isFinite(e))return!1;const s=this.balls.find(r=>r.id===n)?.radius??Et.radius;return Math.abs(t)>Et.halfWidth-s||Math.abs(e)>Et.halfHeight-s||this.pockets&&be.some(r=>Math.hypot(t-r.x,e-r.z)<Et.pocketRadius+s*.5)?!1:!this.balls.some(r=>r.active&&r.id!==n&&Math.hypot(t-r.x,e-r.z)<s+r.radius+.002)}placeBall(t,e,n){const s=this.balls.find(r=>r.id===t);return!s||!this.canPlace(e,n,t)?!1:(Object.assign(s,{x:e,z:n,vx:0,vz:0,height:0,vy:0,active:!0,angularVelocity:0,spin:{x:0,y:0},pocket:void 0,_followPending:!1}),!0)}}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const yo="180",Qh=0,al=1,tu=2,Pc=1,Lc=2,An=3,Xn=0,Pe=1,dn=2,Gn=0,Oi=1,Ma=2,ol=3,ll=4,eu=5,ii=100,nu=101,iu=102,su=103,ru=104,au=200,ou=201,lu=202,cu=203,Sa=204,ba=205,hu=206,uu=207,du=208,fu=209,pu=210,mu=211,gu=212,vu=213,_u=214,Ea=0,wa=1,Ta=2,ki=3,Aa=4,Ca=5,Ra=6,Pa=7,Mo=0,xu=1,yu=2,Vn=0,Mu=1,Su=2,bu=3,Ic=4,Eu=5,wu=6,Tu=7,Dc=300,Hi=301,Gi=302,La=303,Ia=304,Cr=306,Mr=1e3,ri=1001,Da=1002,$e=1003,Au=1004,Os=1005,fn=1006,Br=1007,ai=1008,vn=1009,Nc=1010,Uc=1011,Ss=1012,So=1013,li=1014,pn=1015,Ls=1016,bo=1017,Eo=1018,bs=1020,Fc=35902,Oc=35899,Bc=1021,zc=1022,on=1023,Es=1026,ws=1027,wo=1028,To=1029,kc=1030,Ao=1031,Co=1033,mr=33776,gr=33777,vr=33778,_r=33779,Na=35840,Ua=35841,Fa=35842,Oa=35843,Ba=36196,za=37492,ka=37496,Ha=37808,Ga=37809,Va=37810,Wa=37811,Xa=37812,qa=37813,Ya=37814,$a=37815,ja=37816,Ka=37817,Ja=37818,Za=37819,Qa=37820,to=37821,eo=36492,no=36494,io=36495,so=36283,ro=36284,ao=36285,oo=36286,Cu=3200,Ru=3201,Ro=0,Pu=1,Hn="",Oe="srgb",Vi="srgb-linear",Sr="linear",ce="srgb",mi=7680,cl=519,Lu=512,Iu=513,Du=514,Hc=515,Nu=516,Uu=517,Fu=518,Ou=519,lo=35044,hl="300 es",mn=2e3,br=2001;class Yi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Ce=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ul=1234567;const ps=Math.PI/180,Ts=180/Math.PI;function gn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ce[i&255]+Ce[i>>8&255]+Ce[i>>16&255]+Ce[i>>24&255]+"-"+Ce[t&255]+Ce[t>>8&255]+"-"+Ce[t>>16&15|64]+Ce[t>>24&255]+"-"+Ce[e&63|128]+Ce[e>>8&255]+"-"+Ce[e>>16&255]+Ce[e>>24&255]+Ce[n&255]+Ce[n>>8&255]+Ce[n>>16&255]+Ce[n>>24&255]).toLowerCase()}function $t(i,t,e){return Math.max(t,Math.min(e,i))}function Po(i,t){return(i%t+t)%t}function Bu(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function zu(i,t,e){return i!==t?(e-i)/(t-i):0}function ms(i,t,e){return(1-e)*i+e*t}function ku(i,t,e,n){return ms(i,t,1-Math.exp(-e*n))}function Hu(i,t=1){return t-Math.abs(Po(i,t*2)-t)}function Gu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Vu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Wu(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Xu(i,t){return i+Math.random()*(t-i)}function qu(i){return i*(.5-Math.random())}function Yu(i){i!==void 0&&(ul=i);let t=ul+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function $u(i){return i*ps}function ju(i){return i*Ts}function Ku(i){return(i&i-1)===0&&i!==0}function Ju(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Zu(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Qu(i,t,e,n,s){const r=Math.cos,a=Math.sin,o=r(e/2),c=a(e/2),l=r((t+n)/2),h=a((t+n)/2),u=r((t-n)/2),f=a((t-n)/2),d=r((n-t)/2),g=a((n-t)/2);switch(s){case"XYX":i.set(o*h,c*u,c*f,o*l);break;case"YZY":i.set(c*f,o*h,c*u,o*l);break;case"ZXZ":i.set(c*u,c*f,o*h,o*l);break;case"XZX":i.set(o*h,c*g,c*d,o*l);break;case"YXY":i.set(c*d,o*h,c*g,o*l);break;case"ZYZ":i.set(c*g,c*d,o*h,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function an(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ae(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Mn={DEG2RAD:ps,RAD2DEG:Ts,generateUUID:gn,clamp:$t,euclideanModulo:Po,mapLinear:Bu,inverseLerp:zu,lerp:ms,damp:ku,pingpong:Hu,smoothstep:Gu,smootherstep:Vu,randInt:Wu,randFloat:Xu,randFloatSpread:qu,seededRandom:Yu,degToRad:$u,radToDeg:ju,isPowerOfTwo:Ku,ceilPowerOfTwo:Ju,floorPowerOfTwo:Zu,setQuaternionFromProperEuler:Qu,normalize:ae,denormalize:an};class nt{constructor(t=0,e=0){nt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=$t(this.x,t.x,e.x),this.y=$t(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=$t(this.x,t,e),this.y=$t(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar($t(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos($t(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Is{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3];const f=r[a+0],d=r[a+1],g=r[a+2],v=r[a+3];if(o===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=v;return}if(u!==v||c!==f||l!==d||h!==g){let m=1-o;const p=c*f+l*d+h*g+u*v,S=p>=0?1:-1,b=1-p*p;if(b>Number.EPSILON){const A=Math.sqrt(b),T=Math.atan2(A,p*S);m=Math.sin(m*T)/A,o=Math.sin(o*T)/A}const x=o*S;if(c=c*m+f*x,l=l*m+d*x,h=h*m+g*x,u=u*m+v*x,m===1-o){const A=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=A,l*=A,h*=A,u*=A}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[a],f=r[a+1],d=r[a+2],g=r[a+3];return t[e]=o*g+h*u+c*d-l*f,t[e+1]=c*g+h*f+l*u-o*d,t[e+2]=l*g+h*d+o*f-c*u,t[e+3]=h*g-o*u-c*f-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(s/2),u=o(r/2),f=c(n/2),d=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"YZX":this._x=f*h*u+l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u-f*d*g;break;case"XZY":this._x=f*h*u-l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],h=e[6],u=e[10],f=n+o+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(a-s)*d}else if(n>o&&n>u){const d=2*Math.sqrt(1+n-o-u);this._w=(h-c)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+l)/d}else if(o>u){const d=2*Math.sqrt(1+o-n-u);this._w=(r-l)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(c+h)/d}else{const d=2*Math.sqrt(1+u-n-o);this._w=(a-s)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs($t(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-s*o,this._w=a*h-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const d=1-e;return this._w=d*a+e*this._w,this._x=d*n+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-e)*h)/l,f=Math.sin(e*h)/l;return this._w=a*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{constructor(t=0,e=0,n=0){C.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(dl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(dl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*n),h=2*(o*e-r*s),u=2*(r*n-a*e);return this.x=e+c*l+a*u-o*h,this.y=n+c*h+o*l-r*u,this.z=s+c*u+r*h-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=$t(this.x,t.x,e.x),this.y=$t(this.y,t.y,e.y),this.z=$t(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=$t(this.x,t,e),this.y=$t(this.y,t,e),this.z=$t(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar($t(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return zr.copy(this).projectOnVector(t),this.sub(zr)}reflect(t){return this.sub(zr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos($t(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const zr=new C,dl=new Is;class Xt{constructor(t,e,n,s,r,a,o,c,l){Xt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l)}set(t,e,n,s,r,a,o,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],d=n[5],g=n[8],v=s[0],m=s[3],p=s[6],S=s[1],b=s[4],x=s[7],A=s[2],T=s[5],P=s[8];return r[0]=a*v+o*S+c*A,r[3]=a*m+o*b+c*T,r[6]=a*p+o*x+c*P,r[1]=l*v+h*S+u*A,r[4]=l*m+h*b+u*T,r[7]=l*p+h*x+u*P,r[2]=f*v+d*S+g*A,r[5]=f*m+d*b+g*T,r[8]=f*p+d*x+g*P,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8];return e*a*h-e*o*l-n*r*h+n*o*c+s*r*l-s*a*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],u=h*a-o*l,f=o*c-h*r,d=l*r-a*c,g=e*u+n*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=u*v,t[1]=(s*l-h*n)*v,t[2]=(o*n-s*a)*v,t[3]=f*v,t[4]=(h*e-s*c)*v,t[5]=(s*r-o*e)*v,t[6]=d*v,t[7]=(n*c-l*e)*v,t[8]=(a*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(kr.makeScale(t,e)),this}rotate(t){return this.premultiply(kr.makeRotation(-t)),this}translate(t,e){return this.premultiply(kr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const kr=new Xt;function Gc(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Er(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function td(){const i=Er("canvas");return i.style.display="block",i}const fl={};function As(i){i in fl||(fl[i]=!0,console.warn(i))}function ed(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const pl=new Xt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ml=new Xt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function nd(){const i={enabled:!0,workingColorSpace:Vi,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ce&&(s.r=Pn(s.r),s.g=Pn(s.g),s.b=Pn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ce&&(s.r=Bi(s.r),s.g=Bi(s.g),s.b=Bi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Hn?Sr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return As("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return As("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Vi]:{primaries:t,whitePoint:n,transfer:Sr,toXYZ:pl,fromXYZ:ml,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Oe},outputColorSpaceConfig:{drawingBufferColorSpace:Oe}},[Oe]:{primaries:t,whitePoint:n,transfer:ce,toXYZ:pl,fromXYZ:ml,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Oe}}}),i}const ee=nd();function Pn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Bi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let gi;class id{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{gi===void 0&&(gi=Er("canvas")),gi.width=t.width,gi.height=t.height;const s=gi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=gi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Er("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Pn(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Pn(e[n]/255)*255):e[n]=Pn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let sd=0;class Lo{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:sd++}),this.uuid=gn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Hr(s[a].image)):r.push(Hr(s[a]))}else r=Hr(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Hr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?id.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let rd=0;const Gr=new C;class Le extends Yi{constructor(t=Le.DEFAULT_IMAGE,e=Le.DEFAULT_MAPPING,n=ri,s=ri,r=fn,a=ai,o=on,c=vn,l=Le.DEFAULT_ANISOTROPY,h=Hn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:rd++}),this.uuid=gn(),this.name="",this.source=new Lo(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new nt(0,0),this.repeat=new nt(1,1),this.center=new nt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Gr).x}get height(){return this.source.getSize(Gr).y}get depth(){return this.source.getSize(Gr).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Dc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Mr:t.x=t.x-Math.floor(t.x);break;case ri:t.x=t.x<0?0:1;break;case Da:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Mr:t.y=t.y-Math.floor(t.y);break;case ri:t.y=t.y<0?0:1;break;case Da:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Le.DEFAULT_IMAGE=null;Le.DEFAULT_MAPPING=Dc;Le.DEFAULT_ANISOTROPY=1;class ue{constructor(t=0,e=0,n=0,s=1){ue.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],h=c[4],u=c[8],f=c[1],d=c[5],g=c[9],v=c[2],m=c[6],p=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const b=(l+1)/2,x=(d+1)/2,A=(p+1)/2,T=(h+f)/4,P=(u+v)/4,I=(g+m)/4;return b>x&&b>A?b<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(b),s=T/n,r=P/n):x>A?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=T/s,r=I/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=P/r,s=I/r),this.set(n,s,r,e),this}let S=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(f-h)*(f-h));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(u-v)/S,this.z=(f-h)/S,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=$t(this.x,t.x,e.x),this.y=$t(this.y,t.y,e.y),this.z=$t(this.z,t.z,e.z),this.w=$t(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=$t(this.x,t,e),this.y=$t(this.y,t,e),this.z=$t(this.z,t,e),this.w=$t(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar($t(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ad extends Yi{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:fn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ue(0,0,t,e),this.scissorTest=!1,this.viewport=new ue(0,0,t,e);const s={width:t,height:e,depth:n.depth},r=new Le(s);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:fn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Lo(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ci extends ad{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Vc extends Le{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=$e,this.minFilter=$e,this.wrapR=ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class od extends Le{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=$e,this.minFilter=$e,this.wrapR=ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class fi{constructor(t=new C(1/0,1/0,1/0),e=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(en.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(en.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=en.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,en):en.fromBufferAttribute(r,a),en.applyMatrix4(t.matrixWorld),this.expandByPoint(en);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Bs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Bs.copy(n.boundingBox)),Bs.applyMatrix4(t.matrixWorld),this.union(Bs)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,en),en.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ji),zs.subVectors(this.max,Ji),vi.subVectors(t.a,Ji),_i.subVectors(t.b,Ji),xi.subVectors(t.c,Ji),Nn.subVectors(_i,vi),Un.subVectors(xi,_i),Kn.subVectors(vi,xi);let e=[0,-Nn.z,Nn.y,0,-Un.z,Un.y,0,-Kn.z,Kn.y,Nn.z,0,-Nn.x,Un.z,0,-Un.x,Kn.z,0,-Kn.x,-Nn.y,Nn.x,0,-Un.y,Un.x,0,-Kn.y,Kn.x,0];return!Vr(e,vi,_i,xi,zs)||(e=[1,0,0,0,1,0,0,0,1],!Vr(e,vi,_i,xi,zs))?!1:(ks.crossVectors(Nn,Un),e=[ks.x,ks.y,ks.z],Vr(e,vi,_i,xi,zs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,en).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(en).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Sn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Sn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Sn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Sn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Sn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Sn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Sn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Sn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Sn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Sn=[new C,new C,new C,new C,new C,new C,new C,new C],en=new C,Bs=new fi,vi=new C,_i=new C,xi=new C,Nn=new C,Un=new C,Kn=new C,Ji=new C,zs=new C,ks=new C,Jn=new C;function Vr(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Jn.fromArray(i,r);const o=s.x*Math.abs(Jn.x)+s.y*Math.abs(Jn.y)+s.z*Math.abs(Jn.z),c=t.dot(Jn),l=e.dot(Jn),h=n.dot(Jn);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const ld=new fi,Zi=new C,Wr=new C;class $i{constructor(t=new C,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):ld.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Zi.subVectors(t,this.center);const e=Zi.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Zi,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Wr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Zi.copy(t.center).add(Wr)),this.expandByPoint(Zi.copy(t.center).sub(Wr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const bn=new C,Xr=new C,Hs=new C,Fn=new C,qr=new C,Gs=new C,Yr=new C;class Io{constructor(t=new C,e=new C(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,bn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=bn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(bn.copy(this.origin).addScaledVector(this.direction,e),bn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Xr.copy(t).add(e).multiplyScalar(.5),Hs.copy(e).sub(t).normalize(),Fn.copy(this.origin).sub(Xr);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Hs),o=Fn.dot(this.direction),c=-Fn.dot(Hs),l=Fn.lengthSq(),h=Math.abs(1-a*a);let u,f,d,g;if(h>0)if(u=a*c-o,f=a*o-c,g=r*h,u>=0)if(f>=-g)if(f<=g){const v=1/h;u*=v,f*=v,d=u*(u+a*f+2*o)+f*(a*u+f+2*c)+l}else f=r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*c)+l;else f<=-g?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l):f<=g?(u=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Xr).addScaledVector(Hs,f),d}intersectSphere(t,e){bn.subVectors(t.center,this.origin);const n=bn.dot(this.direction),s=bn.dot(bn)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(t.min.x-f.x)*l,s=(t.max.x-f.x)*l):(n=(t.max.x-f.x)*l,s=(t.min.x-f.x)*l),h>=0?(r=(t.min.y-f.y)*h,a=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,a=(t.min.y-f.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-f.z)*u,c=(t.max.z-f.z)*u):(o=(t.max.z-f.z)*u,c=(t.min.z-f.z)*u),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,bn)!==null}intersectTriangle(t,e,n,s,r){qr.subVectors(e,t),Gs.subVectors(n,t),Yr.crossVectors(qr,Gs);let a=this.direction.dot(Yr),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Fn.subVectors(this.origin,t);const c=o*this.direction.dot(Gs.crossVectors(Fn,Gs));if(c<0)return null;const l=o*this.direction.dot(qr.cross(Fn));if(l<0||c+l>a)return null;const h=-o*Fn.dot(Yr);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class oe{constructor(t,e,n,s,r,a,o,c,l,h,u,f,d,g,v,m){oe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l,h,u,f,d,g,v,m)}set(t,e,n,s,r,a,o,c,l,h,u,f,d,g,v,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new oe().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/yi.setFromMatrixColumn(t,0).length(),r=1/yi.setFromMatrixColumn(t,1).length(),a=1/yi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=a*h,d=a*u,g=o*h,v=o*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=d+g*l,e[5]=f-v*l,e[9]=-o*c,e[2]=v-f*l,e[6]=g+d*l,e[10]=a*c}else if(t.order==="YXZ"){const f=c*h,d=c*u,g=l*h,v=l*u;e[0]=f+v*o,e[4]=g*o-d,e[8]=a*l,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=d*o-g,e[6]=v+f*o,e[10]=a*c}else if(t.order==="ZXY"){const f=c*h,d=c*u,g=l*h,v=l*u;e[0]=f-v*o,e[4]=-a*u,e[8]=g+d*o,e[1]=d+g*o,e[5]=a*h,e[9]=v-f*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const f=a*h,d=a*u,g=o*h,v=o*u;e[0]=c*h,e[4]=g*l-d,e[8]=f*l+v,e[1]=c*u,e[5]=v*l+f,e[9]=d*l-g,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const f=a*c,d=a*l,g=o*c,v=o*l;e[0]=c*h,e[4]=v-f*u,e[8]=g*u+d,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-l*h,e[6]=d*u+g,e[10]=f-v*u}else if(t.order==="XZY"){const f=a*c,d=a*l,g=o*c,v=o*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=f*u+v,e[5]=a*h,e[9]=d*u-g,e[2]=g*u-d,e[6]=o*h,e[10]=v*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(cd,t,hd)}lookAt(t,e,n){const s=this.elements;return Xe.subVectors(t,e),Xe.lengthSq()===0&&(Xe.z=1),Xe.normalize(),On.crossVectors(n,Xe),On.lengthSq()===0&&(Math.abs(n.z)===1?Xe.x+=1e-4:Xe.z+=1e-4,Xe.normalize(),On.crossVectors(n,Xe)),On.normalize(),Vs.crossVectors(Xe,On),s[0]=On.x,s[4]=Vs.x,s[8]=Xe.x,s[1]=On.y,s[5]=Vs.y,s[9]=Xe.y,s[2]=On.z,s[6]=Vs.z,s[10]=Xe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],d=n[13],g=n[2],v=n[6],m=n[10],p=n[14],S=n[3],b=n[7],x=n[11],A=n[15],T=s[0],P=s[4],I=s[8],E=s[12],M=s[1],L=s[5],O=s[9],k=s[13],q=s[2],G=s[6],X=s[10],Z=s[14],V=s[3],dt=s[7],xt=s[11],St=s[15];return r[0]=a*T+o*M+c*q+l*V,r[4]=a*P+o*L+c*G+l*dt,r[8]=a*I+o*O+c*X+l*xt,r[12]=a*E+o*k+c*Z+l*St,r[1]=h*T+u*M+f*q+d*V,r[5]=h*P+u*L+f*G+d*dt,r[9]=h*I+u*O+f*X+d*xt,r[13]=h*E+u*k+f*Z+d*St,r[2]=g*T+v*M+m*q+p*V,r[6]=g*P+v*L+m*G+p*dt,r[10]=g*I+v*O+m*X+p*xt,r[14]=g*E+v*k+m*Z+p*St,r[3]=S*T+b*M+x*q+A*V,r[7]=S*P+b*L+x*G+A*dt,r[11]=S*I+b*O+x*X+A*xt,r[15]=S*E+b*k+x*Z+A*St,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],h=t[2],u=t[6],f=t[10],d=t[14],g=t[3],v=t[7],m=t[11],p=t[15];return g*(+r*c*u-s*l*u-r*o*f+n*l*f+s*o*d-n*c*d)+v*(+e*c*d-e*l*f+r*a*f-s*a*d+s*l*h-r*c*h)+m*(+e*l*u-e*o*d-r*a*u+n*a*d+r*o*h-n*l*h)+p*(-s*o*h-e*c*u+e*o*f+s*a*u-n*a*f+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],u=t[9],f=t[10],d=t[11],g=t[12],v=t[13],m=t[14],p=t[15],S=u*m*l-v*f*l+v*c*d-o*m*d-u*c*p+o*f*p,b=g*f*l-h*m*l-g*c*d+a*m*d+h*c*p-a*f*p,x=h*v*l-g*u*l+g*o*d-a*v*d-h*o*p+a*u*p,A=g*u*c-h*v*c-g*o*f+a*v*f+h*o*m-a*u*m,T=e*S+n*b+s*x+r*A;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/T;return t[0]=S*P,t[1]=(v*f*r-u*m*r-v*s*d+n*m*d+u*s*p-n*f*p)*P,t[2]=(o*m*r-v*c*r+v*s*l-n*m*l-o*s*p+n*c*p)*P,t[3]=(u*c*r-o*f*r-u*s*l+n*f*l+o*s*d-n*c*d)*P,t[4]=b*P,t[5]=(h*m*r-g*f*r+g*s*d-e*m*d-h*s*p+e*f*p)*P,t[6]=(g*c*r-a*m*r-g*s*l+e*m*l+a*s*p-e*c*p)*P,t[7]=(a*f*r-h*c*r+h*s*l-e*f*l-a*s*d+e*c*d)*P,t[8]=x*P,t[9]=(g*u*r-h*v*r-g*n*d+e*v*d+h*n*p-e*u*p)*P,t[10]=(a*v*r-g*o*r+g*n*l-e*v*l-a*n*p+e*o*p)*P,t[11]=(h*o*r-a*u*r-h*n*l+e*u*l+a*n*d-e*o*d)*P,t[12]=A*P,t[13]=(h*v*s-g*u*s+g*n*f-e*v*f-h*n*m+e*u*m)*P,t[14]=(g*o*s-a*v*s-g*n*c+e*v*c+a*n*m-e*o*m)*P,t[15]=(a*u*s-h*o*s+h*n*c-e*u*c-a*n*f+e*o*f)*P,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,c=t.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+n,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,h=a+a,u=o+o,f=r*l,d=r*h,g=r*u,v=a*h,m=a*u,p=o*u,S=c*l,b=c*h,x=c*u,A=n.x,T=n.y,P=n.z;return s[0]=(1-(v+p))*A,s[1]=(d+x)*A,s[2]=(g-b)*A,s[3]=0,s[4]=(d-x)*T,s[5]=(1-(f+p))*T,s[6]=(m+S)*T,s[7]=0,s[8]=(g+b)*P,s[9]=(m-S)*P,s[10]=(1-(f+v))*P,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=yi.set(s[0],s[1],s[2]).length();const a=yi.set(s[4],s[5],s[6]).length(),o=yi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],nn.copy(this);const l=1/r,h=1/a,u=1/o;return nn.elements[0]*=l,nn.elements[1]*=l,nn.elements[2]*=l,nn.elements[4]*=h,nn.elements[5]*=h,nn.elements[6]*=h,nn.elements[8]*=u,nn.elements[9]*=u,nn.elements[10]*=u,e.setFromRotationMatrix(nn),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=mn,c=!1){const l=this.elements,h=2*r/(e-t),u=2*r/(n-s),f=(e+t)/(e-t),d=(n+s)/(n-s);let g,v;if(c)g=r/(a-r),v=a*r/(a-r);else if(o===mn)g=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===br)g=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=mn,c=!1){const l=this.elements,h=2/(e-t),u=2/(n-s),f=-(e+t)/(e-t),d=-(n+s)/(n-s);let g,v;if(c)g=1/(a-r),v=a/(a-r);else if(o===mn)g=-2/(a-r),v=-(a+r)/(a-r);else if(o===br)g=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=u,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const yi=new C,nn=new oe,cd=new C(0,0,0),hd=new C(1,1,1),On=new C,Vs=new C,Xe=new C,gl=new oe,vl=new Is;class ln{constructor(t=0,e=0,n=0,s=ln.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin($t(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-$t(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin($t(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-$t(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin($t(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-$t(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return gl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(gl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return vl.setFromEuler(this),this.setFromQuaternion(vl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ln.DEFAULT_ORDER="XYZ";class Do{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let ud=0;const _l=new C,Mi=new Is,En=new oe,Ws=new C,Qi=new C,dd=new C,fd=new Is,xl=new C(1,0,0),yl=new C(0,1,0),Ml=new C(0,0,1),Sl={type:"added"},pd={type:"removed"},Si={type:"childadded",child:null},$r={type:"childremoved",child:null};class ye extends Yi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ud++}),this.uuid=gn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ye.DEFAULT_UP.clone();const t=new C,e=new ln,n=new Is,s=new C(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new oe},normalMatrix:{value:new Xt}}),this.matrix=new oe,this.matrixWorld=new oe,this.matrixAutoUpdate=ye.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ye.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Do,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Mi.setFromAxisAngle(t,e),this.quaternion.multiply(Mi),this}rotateOnWorldAxis(t,e){return Mi.setFromAxisAngle(t,e),this.quaternion.premultiply(Mi),this}rotateX(t){return this.rotateOnAxis(xl,t)}rotateY(t){return this.rotateOnAxis(yl,t)}rotateZ(t){return this.rotateOnAxis(Ml,t)}translateOnAxis(t,e){return _l.copy(t).applyQuaternion(this.quaternion),this.position.add(_l.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(xl,t)}translateY(t){return this.translateOnAxis(yl,t)}translateZ(t){return this.translateOnAxis(Ml,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(En.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ws.copy(t):Ws.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Qi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?En.lookAt(Qi,Ws,this.up):En.lookAt(Ws,Qi,this.up),this.quaternion.setFromRotationMatrix(En),s&&(En.extractRotation(s.matrixWorld),Mi.setFromRotationMatrix(En),this.quaternion.premultiply(Mi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Sl),Si.child=t,this.dispatchEvent(Si),Si.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(pd),$r.child=t,this.dispatchEvent($r),$r.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),En.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),En.multiply(t.parent.matrixWorld)),t.applyMatrix4(En),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Sl),Si.child=t,this.dispatchEvent(Si),Si.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qi,t,dd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qi,fd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),h=a(t.images),u=a(t.shapes),f=a(t.skeletons),d=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}ye.DEFAULT_UP=new C(0,1,0);ye.DEFAULT_MATRIX_AUTO_UPDATE=!0;ye.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const sn=new C,wn=new C,jr=new C,Tn=new C,bi=new C,Ei=new C,bl=new C,Kr=new C,Jr=new C,Zr=new C,Qr=new ue,ta=new ue,ea=new ue;class tn{constructor(t=new C,e=new C,n=new C){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),sn.subVectors(t,e),s.cross(sn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){sn.subVectors(s,e),wn.subVectors(n,e),jr.subVectors(t,e);const a=sn.dot(sn),o=sn.dot(wn),c=sn.dot(jr),l=wn.dot(wn),h=wn.dot(jr),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(l*c-o*h)*f,g=(a*h-o*c)*f;return r.set(1-d-g,g,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Tn)===null?!1:Tn.x>=0&&Tn.y>=0&&Tn.x+Tn.y<=1}static getInterpolation(t,e,n,s,r,a,o,c){return this.getBarycoord(t,e,n,s,Tn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Tn.x),c.addScaledVector(a,Tn.y),c.addScaledVector(o,Tn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,a){return Qr.setScalar(0),ta.setScalar(0),ea.setScalar(0),Qr.fromBufferAttribute(t,e),ta.fromBufferAttribute(t,n),ea.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Qr,r.x),a.addScaledVector(ta,r.y),a.addScaledVector(ea,r.z),a}static isFrontFacing(t,e,n,s){return sn.subVectors(n,e),wn.subVectors(t,e),sn.cross(wn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return sn.subVectors(this.c,this.b),wn.subVectors(this.a,this.b),sn.cross(wn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return tn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return tn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return tn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return tn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return tn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;bi.subVectors(s,n),Ei.subVectors(r,n),Kr.subVectors(t,n);const c=bi.dot(Kr),l=Ei.dot(Kr);if(c<=0&&l<=0)return e.copy(n);Jr.subVectors(t,s);const h=bi.dot(Jr),u=Ei.dot(Jr);if(h>=0&&u<=h)return e.copy(s);const f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return a=c/(c-h),e.copy(n).addScaledVector(bi,a);Zr.subVectors(t,r);const d=bi.dot(Zr),g=Ei.dot(Zr);if(g>=0&&d<=g)return e.copy(r);const v=d*l-c*g;if(v<=0&&l>=0&&g<=0)return o=l/(l-g),e.copy(n).addScaledVector(Ei,o);const m=h*g-d*u;if(m<=0&&u-h>=0&&d-g>=0)return bl.subVectors(r,s),o=(u-h)/(u-h+(d-g)),e.copy(s).addScaledVector(bl,o);const p=1/(m+v+f);return a=v*p,o=f*p,e.copy(n).addScaledVector(bi,a).addScaledVector(Ei,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Wc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Bn={h:0,s:0,l:0},Xs={h:0,s:0,l:0};function na(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class qt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Oe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ee.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=ee.workingColorSpace){return this.r=t,this.g=e,this.b=n,ee.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=ee.workingColorSpace){if(t=Po(t,1),e=$t(e,0,1),n=$t(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=na(a,r,t+1/3),this.g=na(a,r,t),this.b=na(a,r,t-1/3)}return ee.colorSpaceToWorking(this,s),this}setStyle(t,e=Oe){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Oe){const n=Wc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Pn(t.r),this.g=Pn(t.g),this.b=Pn(t.b),this}copyLinearToSRGB(t){return this.r=Bi(t.r),this.g=Bi(t.g),this.b=Bi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Oe){return ee.workingToColorSpace(Re.copy(this),t),Math.round($t(Re.r*255,0,255))*65536+Math.round($t(Re.g*255,0,255))*256+Math.round($t(Re.b*255,0,255))}getHexString(t=Oe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ee.workingColorSpace){ee.workingToColorSpace(Re.copy(this),e);const n=Re.r,s=Re.g,r=Re.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=ee.workingColorSpace){return ee.workingToColorSpace(Re.copy(this),e),t.r=Re.r,t.g=Re.g,t.b=Re.b,t}getStyle(t=Oe){ee.workingToColorSpace(Re.copy(this),t);const e=Re.r,n=Re.g,s=Re.b;return t!==Oe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Bn),this.setHSL(Bn.h+t,Bn.s+e,Bn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Bn),t.getHSL(Xs);const n=ms(Bn.h,Xs.h,e),s=ms(Bn.s,Xs.s,e),r=ms(Bn.l,Xs.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Re=new qt;qt.NAMES=Wc;let md=0;class Yn extends Yi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:md++}),this.uuid=gn(),this.name="",this.type="Material",this.blending=Oi,this.side=Xn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Sa,this.blendDst=ba,this.blendEquation=ii,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qt(0,0,0),this.blendAlpha=0,this.depthFunc=ki,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=cl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=mi,this.stencilZFail=mi,this.stencilZPass=mi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Oi&&(n.blending=this.blending),this.side!==Xn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Sa&&(n.blendSrc=this.blendSrc),this.blendDst!==ba&&(n.blendDst=this.blendDst),this.blendEquation!==ii&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ki&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==cl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==mi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==mi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==mi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Be extends Yn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ln,this.combine=Mo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Se=new C,qs=new nt;let gd=0;class ze{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:gd++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=lo,this.updateRanges=[],this.gpuType=pn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)qs.fromBufferAttribute(this,e),qs.applyMatrix3(t),this.setXY(e,qs.x,qs.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyMatrix3(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyMatrix4(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyNormalMatrix(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.transformDirection(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=an(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ae(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=an(e,this.array)),e}setX(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=an(e,this.array)),e}setY(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=an(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=an(e,this.array)),e}setW(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array),s=ae(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array),s=ae(s,this.array),r=ae(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==lo&&(t.usage=this.usage),t}}class Xc extends ze{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class qc extends ze{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ie extends ze{constructor(t,e,n){super(new Float32Array(t),e,n)}}let vd=0;const Je=new oe,ia=new ye,wi=new C,qe=new fi,ts=new fi,Ae=new C;class Me extends Yi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:vd++}),this.uuid=gn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Gc(t)?qc:Xc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Xt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Je.makeRotationFromQuaternion(t),this.applyMatrix4(Je),this}rotateX(t){return Je.makeRotationX(t),this.applyMatrix4(Je),this}rotateY(t){return Je.makeRotationY(t),this.applyMatrix4(Je),this}rotateZ(t){return Je.makeRotationZ(t),this.applyMatrix4(Je),this}translate(t,e,n){return Je.makeTranslation(t,e,n),this.applyMatrix4(Je),this}scale(t,e,n){return Je.makeScale(t,e,n),this.applyMatrix4(Je),this}lookAt(t){return ia.lookAt(t),ia.updateMatrix(),this.applyMatrix4(ia.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(wi).negate(),this.translate(wi.x,wi.y,wi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ie(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];qe.setFromBufferAttribute(r),this.morphTargetsRelative?(Ae.addVectors(this.boundingBox.min,qe.min),this.boundingBox.expandByPoint(Ae),Ae.addVectors(this.boundingBox.max,qe.max),this.boundingBox.expandByPoint(Ae)):(this.boundingBox.expandByPoint(qe.min),this.boundingBox.expandByPoint(qe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new $i);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(t){const n=this.boundingSphere.center;if(qe.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];ts.setFromBufferAttribute(o),this.morphTargetsRelative?(Ae.addVectors(qe.min,ts.min),qe.expandByPoint(Ae),Ae.addVectors(qe.max,ts.max),qe.expandByPoint(Ae)):(qe.expandByPoint(ts.min),qe.expandByPoint(ts.max))}qe.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Ae.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ae));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Ae.fromBufferAttribute(o,l),c&&(wi.fromBufferAttribute(t,l),Ae.add(wi)),s=Math.max(s,n.distanceToSquared(Ae))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ze(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let I=0;I<n.count;I++)o[I]=new C,c[I]=new C;const l=new C,h=new C,u=new C,f=new nt,d=new nt,g=new nt,v=new C,m=new C;function p(I,E,M){l.fromBufferAttribute(n,I),h.fromBufferAttribute(n,E),u.fromBufferAttribute(n,M),f.fromBufferAttribute(r,I),d.fromBufferAttribute(r,E),g.fromBufferAttribute(r,M),h.sub(l),u.sub(l),d.sub(f),g.sub(f);const L=1/(d.x*g.y-g.x*d.y);isFinite(L)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(u,-d.y).multiplyScalar(L),m.copy(u).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(L),o[I].add(v),o[E].add(v),o[M].add(v),c[I].add(m),c[E].add(m),c[M].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let I=0,E=S.length;I<E;++I){const M=S[I],L=M.start,O=M.count;for(let k=L,q=L+O;k<q;k+=3)p(t.getX(k+0),t.getX(k+1),t.getX(k+2))}const b=new C,x=new C,A=new C,T=new C;function P(I){A.fromBufferAttribute(s,I),T.copy(A);const E=o[I];b.copy(E),b.sub(A.multiplyScalar(A.dot(E))).normalize(),x.crossVectors(T,E);const L=x.dot(c[I])<0?-1:1;a.setXYZW(I,b.x,b.y,b.z,L)}for(let I=0,E=S.length;I<E;++I){const M=S[I],L=M.start,O=M.count;for(let k=L,q=L+O;k<q;k+=3)P(t.getX(k+0)),P(t.getX(k+1)),P(t.getX(k+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ze(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const s=new C,r=new C,a=new C,o=new C,c=new C,l=new C,h=new C,u=new C;if(t)for(let f=0,d=t.count;f<d;f+=3){const g=t.getX(f+0),v=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),a.fromBufferAttribute(e,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,m),o.add(h),c.add(h),l.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ae.fromBufferAttribute(t,e),Ae.normalize(),t.setXYZ(e,Ae.x,Ae.y,Ae.z)}toNonIndexed(){function t(o,c){const l=o.array,h=o.itemSize,u=o.normalized,f=new l.constructor(c.length*h);let d=0,g=0;for(let v=0,m=c.length;v<m;v++){o.isInterleavedBufferAttribute?d=c[v]*o.data.stride+o.offset:d=c[v]*h;for(let p=0;p<h;p++)f[g++]=l[d++]}return new ze(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Me,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=t(c,n);e.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let h=0,u=l.length;h<u;h++){const f=l[h],d=t(f,n);c.push(d)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){const d=l[u];h.push(d.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],u=r[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,h=a.length;l<h;l++){const u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const El=new oe,Zn=new Io,Ys=new $i,wl=new C,$s=new C,js=new C,Ks=new C,sa=new C,Js=new C,Tl=new C,Zs=new C;class Nt extends ye{constructor(t=new Me,e=new Be){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){Js.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=o[c],u=r[c];h!==0&&(sa.fromBufferAttribute(u,t),a?Js.addScaledVector(sa,h):Js.addScaledVector(sa.sub(e),h))}e.add(Js)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ys.copy(n.boundingSphere),Ys.applyMatrix4(r),Zn.copy(t.ray).recast(t.near),!(Ys.containsPoint(Zn.origin)===!1&&(Zn.intersectSphere(Ys,wl)===null||Zn.origin.distanceToSquared(wl)>(t.far-t.near)**2))&&(El.copy(r).invert(),Zn.copy(t.ray).applyMatrix4(El),!(n.boundingBox!==null&&Zn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Zn)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=f.length;g<v;g++){const m=f[g],p=a[m.materialIndex],S=Math.max(m.start,d.start),b=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let x=S,A=b;x<A;x+=3){const T=o.getX(x),P=o.getX(x+1),I=o.getX(x+2);s=Qs(this,p,t,n,l,h,u,T,P,I),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),v=Math.min(o.count,d.start+d.count);for(let m=g,p=v;m<p;m+=3){const S=o.getX(m),b=o.getX(m+1),x=o.getX(m+2);s=Qs(this,a,t,n,l,h,u,S,b,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,v=f.length;g<v;g++){const m=f[g],p=a[m.materialIndex],S=Math.max(m.start,d.start),b=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let x=S,A=b;x<A;x+=3){const T=x,P=x+1,I=x+2;s=Qs(this,p,t,n,l,h,u,T,P,I),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),v=Math.min(c.count,d.start+d.count);for(let m=g,p=v;m<p;m+=3){const S=m,b=m+1,x=m+2;s=Qs(this,a,t,n,l,h,u,S,b,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function _d(i,t,e,n,s,r,a,o){let c;if(t.side===Pe?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,t.side===Xn,o),c===null)return null;Zs.copy(o),Zs.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Zs);return l<e.near||l>e.far?null:{distance:l,point:Zs.clone(),object:i}}function Qs(i,t,e,n,s,r,a,o,c,l){i.getVertexPosition(o,$s),i.getVertexPosition(c,js),i.getVertexPosition(l,Ks);const h=_d(i,t,e,n,$s,js,Ks,Tl);if(h){const u=new C;tn.getBarycoord(Tl,$s,js,Ks,u),s&&(h.uv=tn.getInterpolatedAttribute(s,o,c,l,u,new nt)),r&&(h.uv1=tn.getInterpolatedAttribute(r,o,c,l,u,new nt)),a&&(h.normal=tn.getInterpolatedAttribute(a,o,c,l,u,new C),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a:o,b:c,c:l,normal:new C,materialIndex:0};tn.getNormal($s,js,Ks,f.normal),h.face=f,h.barycoord=u}return h}class _n extends Me{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],h=[],u=[];let f=0,d=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new ie(l,3)),this.setAttribute("normal",new ie(h,3)),this.setAttribute("uv",new ie(u,2));function g(v,m,p,S,b,x,A,T,P,I,E){const M=x/P,L=A/I,O=x/2,k=A/2,q=T/2,G=P+1,X=I+1;let Z=0,V=0;const dt=new C;for(let xt=0;xt<X;xt++){const St=xt*L-k;for(let Vt=0;Vt<G;Vt++){const Jt=Vt*M-O;dt[v]=Jt*S,dt[m]=St*b,dt[p]=q,l.push(dt.x,dt.y,dt.z),dt[v]=0,dt[m]=0,dt[p]=T>0?1:-1,h.push(dt.x,dt.y,dt.z),u.push(Vt/P),u.push(1-xt/I),Z+=1}}for(let xt=0;xt<I;xt++)for(let St=0;St<P;St++){const Vt=f+St+G*xt,Jt=f+St+G*(xt+1),re=f+(St+1)+G*(xt+1),Zt=f+(St+1)+G*xt;c.push(Vt,Jt,Zt),c.push(Jt,re,Zt),V+=6}o.addGroup(d,V,E),d+=V,f+=Z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Wi(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Fe(i){const t={};for(let e=0;e<i.length;e++){const n=Wi(i[e]);for(const s in n)t[s]=n[s]}return t}function xd(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Yc(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ee.workingColorSpace}const yd={clone:Wi,merge:Fe};var Md=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Sd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class qn extends Yn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Md,this.fragmentShader=Sd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Wi(t.uniforms),this.uniformsGroups=xd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class $c extends ye{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new oe,this.projectionMatrix=new oe,this.projectionMatrixInverse=new oe,this.coordinateSystem=mn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const zn=new C,Al=new nt,Cl=new nt;class Ye extends $c{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ts*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ps*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ts*2*Math.atan(Math.tan(ps*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){zn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(zn.x,zn.y).multiplyScalar(-t/zn.z),zn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(zn.x,zn.y).multiplyScalar(-t/zn.z)}getViewSize(t,e){return this.getViewBounds(t,Al,Cl),e.subVectors(Cl,Al)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ps*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ti=-90,Ai=1;class bd extends ye{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ye(Ti,Ai,t,e);s.layers=this.layers,this.add(s);const r=new Ye(Ti,Ai,t,e);r.layers=this.layers,this.add(r);const a=new Ye(Ti,Ai,t,e);a.layers=this.layers,this.add(a);const o=new Ye(Ti,Ai,t,e);o.layers=this.layers,this.add(o);const c=new Ye(Ti,Ai,t,e);c.layers=this.layers,this.add(c);const l=new Ye(Ti,Ai,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,c]=e;for(const l of e)this.remove(l);if(t===mn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===br)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class jc extends Le{constructor(t=[],e=Hi,n,s,r,a,o,c,l,h){super(t,e,n,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Ed extends ci{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new jc(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new _n(5,5,5),r=new qn({name:"CubemapFromEquirect",uniforms:Wi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Pe,blending:Gn});r.uniforms.tEquirect.value=e;const a=new Nt(s,r),o=e.minFilter;return e.minFilter===ai&&(e.minFilter=fn),new bd(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}class Ee extends ye{constructor(){super(),this.isGroup=!0,this.type="Group"}}const wd={type:"move"};class ra{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ee,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ee,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ee,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,n),p=this._getHandJoint(l,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;l.inputState.pinching&&f>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(wd)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Ee;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class No{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new qt(t),this.near=e,this.far=n}clone(){return new No(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Kc extends ye{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ln,this.environmentIntensity=1,this.environmentRotation=new ln,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Td{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=lo,this.updateRanges=[],this.version=0,this.uuid=gn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=gn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=gn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const De=new C;class wr{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)De.fromBufferAttribute(this,e),De.applyMatrix4(t),this.setXYZ(e,De.x,De.y,De.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)De.fromBufferAttribute(this,e),De.applyNormalMatrix(t),this.setXYZ(e,De.x,De.y,De.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)De.fromBufferAttribute(this,e),De.transformDirection(t),this.setXYZ(e,De.x,De.y,De.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=an(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ae(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=an(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=an(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=an(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=an(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array),s=ae(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array),s=ae(s,this.array),r=ae(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new ze(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new wr(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Jc extends Yn{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new qt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Ci;const es=new C,Ri=new C,Pi=new C,Li=new nt,ns=new nt,Zc=new oe,tr=new C,is=new C,er=new C,Rl=new nt,aa=new nt,Pl=new nt;class Ad extends ye{constructor(t=new Jc){if(super(),this.isSprite=!0,this.type="Sprite",Ci===void 0){Ci=new Me;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Td(e,5);Ci.setIndex([0,1,2,0,2,3]),Ci.setAttribute("position",new wr(n,3,0,!1)),Ci.setAttribute("uv",new wr(n,2,3,!1))}this.geometry=Ci,this.material=t,this.center=new nt(.5,.5),this.count=1}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ri.setFromMatrixScale(this.matrixWorld),Zc.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Pi.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ri.multiplyScalar(-Pi.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;nr(tr.set(-.5,-.5,0),Pi,a,Ri,s,r),nr(is.set(.5,-.5,0),Pi,a,Ri,s,r),nr(er.set(.5,.5,0),Pi,a,Ri,s,r),Rl.set(0,0),aa.set(1,0),Pl.set(1,1);let o=t.ray.intersectTriangle(tr,is,er,!1,es);if(o===null&&(nr(is.set(-.5,.5,0),Pi,a,Ri,s,r),aa.set(0,1),o=t.ray.intersectTriangle(tr,er,is,!1,es),o===null))return;const c=t.ray.origin.distanceTo(es);c<t.near||c>t.far||e.push({distance:c,point:es.clone(),uv:tn.getInterpolation(es,tr,is,er,Rl,aa,Pl,new nt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function nr(i,t,e,n,s,r){Li.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(ns.x=r*Li.x-s*Li.y,ns.y=s*Li.x+r*Li.y):ns.copy(Li),i.copy(t),i.x+=ns.x,i.y+=ns.y,i.applyMatrix4(Zc)}class Cd extends Le{constructor(t=null,e=1,n=1,s,r,a,o,c,l=$e,h=$e,u,f){super(null,a,o,c,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ll extends ze{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Ii=new oe,Il=new oe,ir=[],Dl=new fi,Rd=new oe,ss=new Nt,rs=new $i;class Pd extends Nt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Ll(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Rd)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new fi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ii),Dl.copy(t.boundingBox).applyMatrix4(Ii),this.boundingBox.union(Dl)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new $i),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ii),rs.copy(t.boundingSphere).applyMatrix4(Ii),this.boundingSphere.union(rs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(ss.geometry=this.geometry,ss.material=this.material,ss.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),rs.copy(this.boundingSphere),rs.applyMatrix4(n),t.ray.intersectsSphere(rs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ii),Il.multiplyMatrices(n,Ii),ss.matrixWorld=Il,ss.raycast(t,ir);for(let a=0,o=ir.length;a<o;a++){const c=ir[a];c.instanceId=r,c.object=this,e.push(c)}ir.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Ll(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Cd(new Float32Array(s*this.count),s,this.count,wo,pn));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=s*t;r[c]=o,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const oa=new C,Ld=new C,Id=new Xt;class kn{constructor(t=new C(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=oa.subVectors(n,e).cross(Ld.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(oa),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Id.getNormalMatrix(t),s=this.coplanarPoint(oa).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Qn=new $i,Dd=new nt(.5,.5),sr=new C;class Uo{constructor(t=new kn,e=new kn,n=new kn,s=new kn,r=new kn,a=new kn){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=mn,n=!1){const s=this.planes,r=t.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],u=r[5],f=r[6],d=r[7],g=r[8],v=r[9],m=r[10],p=r[11],S=r[12],b=r[13],x=r[14],A=r[15];if(s[0].setComponents(l-a,d-h,p-g,A-S).normalize(),s[1].setComponents(l+a,d+h,p+g,A+S).normalize(),s[2].setComponents(l+o,d+u,p+v,A+b).normalize(),s[3].setComponents(l-o,d-u,p-v,A-b).normalize(),n)s[4].setComponents(c,f,m,x).normalize(),s[5].setComponents(l-c,d-f,p-m,A-x).normalize();else if(s[4].setComponents(l-c,d-f,p-m,A-x).normalize(),e===mn)s[5].setComponents(l+c,d+f,p+m,A+x).normalize();else if(e===br)s[5].setComponents(c,f,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Qn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Qn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Qn)}intersectsSprite(t){Qn.center.set(0,0,0);const e=Dd.distanceTo(t.center);return Qn.radius=.7071067811865476+e,Qn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Qn)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(sr.x=s.normal.x>0?t.max.x:t.min.x,sr.y=s.normal.y>0?t.max.y:t.min.y,sr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(sr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Fo extends Yn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new qt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Tr=new C,Ar=new C,Nl=new oe,as=new Io,rr=new $i,la=new C,Ul=new C;class xr extends ye{constructor(t=new Me,e=new Fo){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Tr.fromBufferAttribute(e,s-1),Ar.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Tr.distanceTo(Ar);t.setAttribute("lineDistance",new ie(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),rr.copy(n.boundingSphere),rr.applyMatrix4(s),rr.radius+=r,t.ray.intersectsSphere(rr)===!1)return;Nl.copy(s).invert(),as.copy(t.ray).applyMatrix4(Nl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){const d=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let v=d,m=g-1;v<m;v+=l){const p=h.getX(v),S=h.getX(v+1),b=ar(this,t,as,c,p,S,v);b&&e.push(b)}if(this.isLineLoop){const v=h.getX(g-1),m=h.getX(d),p=ar(this,t,as,c,v,m,g-1);p&&e.push(p)}}else{const d=Math.max(0,a.start),g=Math.min(f.count,a.start+a.count);for(let v=d,m=g-1;v<m;v+=l){const p=ar(this,t,as,c,v,v+1,v);p&&e.push(p)}if(this.isLineLoop){const v=ar(this,t,as,c,g-1,d,g-1);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function ar(i,t,e,n,s,r,a){const o=i.geometry.attributes.position;if(Tr.fromBufferAttribute(o,s),Ar.fromBufferAttribute(o,r),e.distanceSqToSegment(Tr,Ar,la,Ul)>n)return;la.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(la);if(!(l<t.near||l>t.far))return{distance:l,point:Ul.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}class Oo extends Le{constructor(t,e,n,s,r,a,o,c,l){super(t,e,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Qc extends Le{constructor(t,e,n=li,s,r,a,o=$e,c=$e,l,h=Es,u=1){if(h!==Es&&h!==ws)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:t,height:e,depth:u};super(f,s,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Lo(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class th extends Le{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Rr extends Me{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],a=[],o=[],c=[],l=new C,h=new nt;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){const d=n+u/e*s;l.x=t*Math.cos(d),l.y=t*Math.sin(d),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[f]/t+1)/2,h.y=(a[f+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new ie(a,3)),this.setAttribute("normal",new ie(o,3)),this.setAttribute("uv",new ie(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Rr(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Qe extends Me{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],d=[];let g=0;const v=[],m=n/2;let p=0;S(),a===!1&&(t>0&&b(!0),e>0&&b(!1)),this.setIndex(h),this.setAttribute("position",new ie(u,3)),this.setAttribute("normal",new ie(f,3)),this.setAttribute("uv",new ie(d,2));function S(){const x=new C,A=new C;let T=0;const P=(e-t)/n;for(let I=0;I<=r;I++){const E=[],M=I/r,L=M*(e-t)+t;for(let O=0;O<=s;O++){const k=O/s,q=k*c+o,G=Math.sin(q),X=Math.cos(q);A.x=L*G,A.y=-M*n+m,A.z=L*X,u.push(A.x,A.y,A.z),x.set(G,P,X).normalize(),f.push(x.x,x.y,x.z),d.push(k,1-M),E.push(g++)}v.push(E)}for(let I=0;I<s;I++)for(let E=0;E<r;E++){const M=v[E][I],L=v[E+1][I],O=v[E+1][I+1],k=v[E][I+1];(t>0||E!==0)&&(h.push(M,L,k),T+=3),(e>0||E!==r-1)&&(h.push(L,O,k),T+=3)}l.addGroup(p,T,0),p+=T}function b(x){const A=g,T=new nt,P=new C;let I=0;const E=x===!0?t:e,M=x===!0?1:-1;for(let O=1;O<=s;O++)u.push(0,m*M,0),f.push(0,M,0),d.push(.5,.5),g++;const L=g;for(let O=0;O<=s;O++){const q=O/s*c+o,G=Math.cos(q),X=Math.sin(q);P.x=E*X,P.y=m*M,P.z=E*G,u.push(P.x,P.y,P.z),f.push(0,M,0),T.x=G*.5+.5,T.y=X*.5*M+.5,d.push(T.x,T.y),g++}for(let O=0;O<s;O++){const k=A+O,q=L+O;x===!0?h.push(q,q+1,k):h.push(q+1,q,k),I+=3}l.addGroup(p,I,x===!0?1:2),p+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Qe(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Bo extends Me{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],a=[];o(s),l(n),h(),this.setAttribute("position",new ie(r,3)),this.setAttribute("normal",new ie(r.slice(),3)),this.setAttribute("uv",new ie(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(S){const b=new C,x=new C,A=new C;for(let T=0;T<e.length;T+=3)d(e[T+0],b),d(e[T+1],x),d(e[T+2],A),c(b,x,A,S)}function c(S,b,x,A){const T=A+1,P=[];for(let I=0;I<=T;I++){P[I]=[];const E=S.clone().lerp(x,I/T),M=b.clone().lerp(x,I/T),L=T-I;for(let O=0;O<=L;O++)O===0&&I===T?P[I][O]=E:P[I][O]=E.clone().lerp(M,O/L)}for(let I=0;I<T;I++)for(let E=0;E<2*(T-I)-1;E++){const M=Math.floor(E/2);E%2===0?(f(P[I][M+1]),f(P[I+1][M]),f(P[I][M])):(f(P[I][M+1]),f(P[I+1][M+1]),f(P[I+1][M]))}}function l(S){const b=new C;for(let x=0;x<r.length;x+=3)b.x=r[x+0],b.y=r[x+1],b.z=r[x+2],b.normalize().multiplyScalar(S),r[x+0]=b.x,r[x+1]=b.y,r[x+2]=b.z}function h(){const S=new C;for(let b=0;b<r.length;b+=3){S.x=r[b+0],S.y=r[b+1],S.z=r[b+2];const x=m(S)/2/Math.PI+.5,A=p(S)/Math.PI+.5;a.push(x,1-A)}g(),u()}function u(){for(let S=0;S<a.length;S+=6){const b=a[S+0],x=a[S+2],A=a[S+4],T=Math.max(b,x,A),P=Math.min(b,x,A);T>.9&&P<.1&&(b<.2&&(a[S+0]+=1),x<.2&&(a[S+2]+=1),A<.2&&(a[S+4]+=1))}}function f(S){r.push(S.x,S.y,S.z)}function d(S,b){const x=S*3;b.x=t[x+0],b.y=t[x+1],b.z=t[x+2]}function g(){const S=new C,b=new C,x=new C,A=new C,T=new nt,P=new nt,I=new nt;for(let E=0,M=0;E<r.length;E+=9,M+=6){S.set(r[E+0],r[E+1],r[E+2]),b.set(r[E+3],r[E+4],r[E+5]),x.set(r[E+6],r[E+7],r[E+8]),T.set(a[M+0],a[M+1]),P.set(a[M+2],a[M+3]),I.set(a[M+4],a[M+5]),A.copy(S).add(b).add(x).divideScalar(3);const L=m(A);v(T,M+0,S,L),v(P,M+2,b,L),v(I,M+4,x,L)}}function v(S,b,x,A){A<0&&S.x===1&&(a[b]=S.x-1),x.x===0&&x.z===0&&(a[b]=A/2/Math.PI+.5)}function m(S){return Math.atan2(S.z,-S.x)}function p(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Bo(t.vertices,t.indices,t.radius,t.details)}}class xn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let s=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=n[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===a)return s/(r-1);const h=n[s],f=n[s+1]-h,d=(a-h)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),c=e||(a.isVector2?new nt:new C);return c.copy(o).sub(a).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new C,s=[],r=[],a=[],o=new C,c=new oe;for(let d=0;d<=t;d++){const g=d/t;s[d]=this.getTangentAt(g,new C)}r[0]=new C,a[0]=new C;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),f<=l&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(s[d-1],s[d]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos($t(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(o,g))}a[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos($t(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(d=-d);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],d*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class zo extends xn{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(t,e=new nt){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*h-d*u+this.aX,l=f*u+d*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Nd extends zo{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function ko(){let i=0,t=0,e=0,n=0;function s(r,a,o,c){i=r,t=o,e=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){s(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,h,u){let f=(a-r)/l-(o-r)/(l+h)+(o-a)/h,d=(o-a)/h-(c-a)/(h+u)+(c-o)/u;f*=h,d*=h,s(a,o,f,d)},calc:function(r){const a=r*r,o=a*r;return i+t*r+e*a+n*o}}}const or=new C,ca=new ko,ha=new ko,ua=new ko;class Ud extends xn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new C){const n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,h;this.closed||o>0?l=s[(o-1)%r]:(or.subVectors(s[0],s[1]).add(s[0]),l=or);const u=s[o%r],f=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(or.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=or),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(u),d),v=Math.pow(u.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(h),d);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),ca.initNonuniformCatmullRom(l.x,u.x,f.x,h.x,g,v,m),ha.initNonuniformCatmullRom(l.y,u.y,f.y,h.y,g,v,m),ua.initNonuniformCatmullRom(l.z,u.z,f.z,h.z,g,v,m)}else this.curveType==="catmullrom"&&(ca.initCatmullRom(l.x,u.x,f.x,h.x,this.tension),ha.initCatmullRom(l.y,u.y,f.y,h.y,this.tension),ua.initCatmullRom(l.z,u.z,f.z,h.z,this.tension));return n.set(ca.calc(c),ha.calc(c),ua.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new C().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Fl(i,t,e,n,s){const r=(n-t)*.5,a=(s-e)*.5,o=i*i,c=i*o;return(2*e-2*n+r+a)*c+(-3*e+3*n-2*r-a)*o+r*i+e}function Fd(i,t){const e=1-i;return e*e*t}function Od(i,t){return 2*(1-i)*i*t}function Bd(i,t){return i*i*t}function gs(i,t,e,n){return Fd(i,t)+Od(i,e)+Bd(i,n)}function zd(i,t){const e=1-i;return e*e*e*t}function kd(i,t){const e=1-i;return 3*e*e*i*t}function Hd(i,t){return 3*(1-i)*i*i*t}function Gd(i,t){return i*i*i*t}function vs(i,t,e,n,s){return zd(i,t)+kd(i,e)+Hd(i,n)+Gd(i,s)}class eh extends xn{constructor(t=new nt,e=new nt,n=new nt,s=new nt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new nt){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(vs(t,s.x,r.x,a.x,o.x),vs(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Vd extends xn{constructor(t=new C,e=new C,n=new C,s=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new C){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(vs(t,s.x,r.x,a.x,o.x),vs(t,s.y,r.y,a.y,o.y),vs(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class nh extends xn{constructor(t=new nt,e=new nt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new nt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new nt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Wd extends xn{constructor(t=new C,e=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new C){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new C){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class ih extends xn{constructor(t=new nt,e=new nt,n=new nt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new nt){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(gs(t,s.x,r.x,a.x),gs(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Xd extends xn{constructor(t=new C,e=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new C){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(gs(t,s.x,r.x,a.x),gs(t,s.y,r.y,a.y),gs(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class sh extends xn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new nt){const n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,c=s[a===0?a:a-1],l=s[a],h=s[a>s.length-2?s.length-1:a+1],u=s[a>s.length-3?s.length-1:a+2];return n.set(Fl(o,c.x,l.x,h.x,u.x),Fl(o,c.y,l.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new nt().fromArray(s))}return this}}var co=Object.freeze({__proto__:null,ArcCurve:Nd,CatmullRomCurve3:Ud,CubicBezierCurve:eh,CubicBezierCurve3:Vd,EllipseCurve:zo,LineCurve:nh,LineCurve3:Wd,QuadraticBezierCurve:ih,QuadraticBezierCurve3:Xd,SplineCurve:sh});class qd extends xn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new co[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,c=a.getPoints(o);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new co[s.type]().fromJSON(s))}return this}}class ho extends qd{constructor(t){super(),this.type="Path",this.currentPoint=new nt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new nh(this.currentPoint.clone(),new nt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new ih(this.currentPoint.clone(),new nt(t,e),new nt(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,a){const o=new eh(this.currentPoint.clone(),new nt(t,e),new nt(n,s),new nt(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new sh(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,a){const o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+o,e+c,n,s,r,a),this}absarc(t,e,n,s,r,a){return this.absellipse(t,e,n,n,s,r,a),this}ellipse(t,e,n,s,r,a,o,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,s,r,a,o,c),this}absellipse(t,e,n,s,r,a,o,c){const l=new zo(t,e,n,s,r,a,o,c);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Pr extends ho{constructor(t){super(t),this.uuid=gn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new ho().fromJSON(s))}return this}}function Yd(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let r=rh(i,0,s,e,!0);const a=[];if(!r||r.next===r.prev)return a;let o,c,l;if(n&&(r=Zd(i,t,r,e)),i.length>80*e){o=1/0,c=1/0;let h=-1/0,u=-1/0;for(let f=e;f<s;f+=e){const d=i[f],g=i[f+1];d<o&&(o=d),g<c&&(c=g),d>h&&(h=d),g>u&&(u=g)}l=Math.max(h-o,u-c),l=l!==0?32767/l:0}return Cs(r,a,e,o,c,l,0),a}function rh(i,t,e,n,s){let r;if(s===hf(i,t,e,n)>0)for(let a=t;a<e;a+=n)r=Ol(a/n|0,i[a],i[a+1],r);else for(let a=e-n;a>=t;a-=n)r=Ol(a/n|0,i[a],i[a+1],r);return r&&Xi(r,r.next)&&(Ps(r),r=r.next),r}function hi(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Xi(e,e.next)||_e(e.prev,e,e.next)===0)){if(Ps(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Cs(i,t,e,n,s,r,a){if(!i)return;!a&&r&&sf(i,n,s,r);let o=i;for(;i.prev!==i.next;){const c=i.prev,l=i.next;if(r?jd(i,n,s,r):$d(i)){t.push(c.i,i.i,l.i),Ps(i),i=l.next,o=l.next;continue}if(i=l,i===o){a?a===1?(i=Kd(hi(i),t),Cs(i,t,e,n,s,r,2)):a===2&&Jd(i,t,e,n,s,r):Cs(hi(i),t,e,n,s,r,1);break}}}function $d(i){const t=i.prev,e=i,n=i.next;if(_e(t,e,n)>=0)return!1;const s=t.x,r=e.x,a=n.x,o=t.y,c=e.y,l=n.y,h=Math.min(s,r,a),u=Math.min(o,c,l),f=Math.max(s,r,a),d=Math.max(o,c,l);let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=f&&g.y>=u&&g.y<=d&&us(s,o,r,c,a,l,g.x,g.y)&&_e(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function jd(i,t,e,n){const s=i.prev,r=i,a=i.next;if(_e(s,r,a)>=0)return!1;const o=s.x,c=r.x,l=a.x,h=s.y,u=r.y,f=a.y,d=Math.min(o,c,l),g=Math.min(h,u,f),v=Math.max(o,c,l),m=Math.max(h,u,f),p=uo(d,g,t,e,n),S=uo(v,m,t,e,n);let b=i.prevZ,x=i.nextZ;for(;b&&b.z>=p&&x&&x.z<=S;){if(b.x>=d&&b.x<=v&&b.y>=g&&b.y<=m&&b!==s&&b!==a&&us(o,h,c,u,l,f,b.x,b.y)&&_e(b.prev,b,b.next)>=0||(b=b.prevZ,x.x>=d&&x.x<=v&&x.y>=g&&x.y<=m&&x!==s&&x!==a&&us(o,h,c,u,l,f,x.x,x.y)&&_e(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;b&&b.z>=p;){if(b.x>=d&&b.x<=v&&b.y>=g&&b.y<=m&&b!==s&&b!==a&&us(o,h,c,u,l,f,b.x,b.y)&&_e(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;x&&x.z<=S;){if(x.x>=d&&x.x<=v&&x.y>=g&&x.y<=m&&x!==s&&x!==a&&us(o,h,c,u,l,f,x.x,x.y)&&_e(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function Kd(i,t){let e=i;do{const n=e.prev,s=e.next.next;!Xi(n,s)&&oh(n,e,e.next,s)&&Rs(n,s)&&Rs(s,n)&&(t.push(n.i,e.i,s.i),Ps(e),Ps(e.next),e=i=s),e=e.next}while(e!==i);return hi(e)}function Jd(i,t,e,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&of(a,o)){let c=lh(a,o);a=hi(a,a.next),c=hi(c,c.next),Cs(a,t,e,n,s,r,0),Cs(c,t,e,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function Zd(i,t,e,n){const s=[];for(let r=0,a=t.length;r<a;r++){const o=t[r]*n,c=r<a-1?t[r+1]*n:i.length,l=rh(i,o,c,n,!1);l===l.next&&(l.steiner=!0),s.push(af(l))}s.sort(Qd);for(let r=0;r<s.length;r++)e=tf(s[r],e);return e}function Qd(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function tf(i,t){const e=ef(i,t);if(!e)return t;const n=lh(e,i);return hi(n,n.next),hi(e,e.next)}function ef(i,t){let e=t;const n=i.x,s=i.y;let r=-1/0,a;if(Xi(i,e))return e;do{if(Xi(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){const u=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=n&&u>r&&(r=u,a=e.x<e.next.x?e:e.next,u===n))return a}e=e.next}while(e!==t);if(!a)return null;const o=a,c=a.x,l=a.y;let h=1/0;e=a;do{if(n>=e.x&&e.x>=c&&n!==e.x&&ah(s<l?n:r,s,c,l,s<l?r:n,s,e.x,e.y)){const u=Math.abs(s-e.y)/(n-e.x);Rs(e,i)&&(u<h||u===h&&(e.x>a.x||e.x===a.x&&nf(a,e)))&&(a=e,h=u)}e=e.next}while(e!==o);return a}function nf(i,t){return _e(i.prev,i,t.prev)<0&&_e(t.next,i,i.next)<0}function sf(i,t,e,n){let s=i;do s.z===0&&(s.z=uo(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,rf(s)}function rf(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let a=n,o=0;for(let l=0;l<e&&(o++,a=a.nextZ,!!a);l++);let c=e;for(;o>0||c>0&&a;)o!==0&&(c===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,e*=2}while(t>1);return i}function uo(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function af(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function ah(i,t,e,n,s,r,a,o){return(s-a)*(t-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(n-o)}function us(i,t,e,n,s,r,a,o){return!(i===a&&t===o)&&ah(i,t,e,n,s,r,a,o)}function of(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!lf(i,t)&&(Rs(i,t)&&Rs(t,i)&&cf(i,t)&&(_e(i.prev,i,t.prev)||_e(i,t.prev,t))||Xi(i,t)&&_e(i.prev,i,i.next)>0&&_e(t.prev,t,t.next)>0)}function _e(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Xi(i,t){return i.x===t.x&&i.y===t.y}function oh(i,t,e,n){const s=cr(_e(i,t,e)),r=cr(_e(i,t,n)),a=cr(_e(e,n,i)),o=cr(_e(e,n,t));return!!(s!==r&&a!==o||s===0&&lr(i,e,t)||r===0&&lr(i,n,t)||a===0&&lr(e,i,n)||o===0&&lr(e,t,n))}function lr(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function cr(i){return i>0?1:i<0?-1:0}function lf(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&oh(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Rs(i,t){return _e(i.prev,i,i.next)<0?_e(i,t,i.next)>=0&&_e(i,i.prev,t)>=0:_e(i,t,i.prev)<0||_e(i,i.next,t)<0}function cf(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function lh(i,t){const e=fo(i.i,i.x,i.y),n=fo(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Ol(i,t,e,n){const s=fo(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Ps(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function fo(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function hf(i,t,e,n){let s=0;for(let r=t,a=e-n;r<e;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}class uf{static triangulate(t,e,n=2){return Yd(t,e,n)}}class Cn{static area(t){const e=t.length;let n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return Cn.area(t)<0}static triangulateShape(t,e){const n=[],s=[],r=[];Bl(t),zl(n,t);let a=t.length;e.forEach(Bl);for(let c=0;c<e.length;c++)s.push(a),a+=e[c].length,zl(n,e[c]);const o=uf.triangulate(n,s);for(let c=0;c<o.length;c+=3)r.push(o.slice(c,c+3));return r}}function Bl(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function zl(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class Lr extends Me{constructor(t=new Pr([new nt(.5,.5),new nt(-.5,.5),new nt(-.5,-.5),new nt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],r=[];for(let o=0,c=t.length;o<c;o++){const l=t[o];a(l)}this.setAttribute("position",new ie(s,3)),this.setAttribute("uv",new ie(r,2)),this.computeVertexNormals();function a(o){const c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:d-.1,v=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,S=e.UVGenerator!==void 0?e.UVGenerator:df;let b,x=!1,A,T,P,I;p&&(b=p.getSpacedPoints(h),x=!0,f=!1,A=p.computeFrenetFrames(h,!1),T=new C,P=new C,I=new C),f||(m=0,d=0,g=0,v=0);const E=o.extractPoints(l);let M=E.shape;const L=E.holes;if(!Cn.isClockWise(M)){M=M.reverse();for(let tt=0,K=L.length;tt<K;tt++){const j=L[tt];Cn.isClockWise(j)&&(L[tt]=j.reverse())}}function k(tt){const j=10000000000000001e-36;let $=tt[0];for(let ht=1;ht<=tt.length;ht++){const it=ht%tt.length,ut=tt[it],Ht=ut.x-$.x,kt=ut.y-$.y,w=Ht*Ht+kt*kt,_=Math.max(Math.abs(ut.x),Math.abs(ut.y),Math.abs($.x),Math.abs($.y)),F=j*_*_;if(w<=F){tt.splice(it,1),ht--;continue}$=ut}}k(M),L.forEach(k);const q=L.length,G=M;for(let tt=0;tt<q;tt++){const K=L[tt];M=M.concat(K)}function X(tt,K,j){return K||console.error("THREE.ExtrudeGeometry: vec does not exist"),tt.clone().addScaledVector(K,j)}const Z=M.length;function V(tt,K,j){let $,ht,it;const ut=tt.x-K.x,Ht=tt.y-K.y,kt=j.x-tt.x,w=j.y-tt.y,_=ut*ut+Ht*Ht,F=ut*w-Ht*kt;if(Math.abs(F)>Number.EPSILON){const H=Math.sqrt(_),Q=Math.sqrt(kt*kt+w*w),W=K.x-Ht/H,Lt=K.y+ut/H,ct=j.x-w/Q,Ct=j.y+kt/Q,Rt=((ct-W)*w-(Ct-Lt)*kt)/(ut*w-Ht*kt);$=W+ut*Rt-tt.x,ht=Lt+Ht*Rt-tt.y;const st=$*$+ht*ht;if(st<=2)return new nt($,ht);it=Math.sqrt(st/2)}else{let H=!1;ut>Number.EPSILON?kt>Number.EPSILON&&(H=!0):ut<-Number.EPSILON?kt<-Number.EPSILON&&(H=!0):Math.sign(Ht)===Math.sign(w)&&(H=!0),H?($=-Ht,ht=ut,it=Math.sqrt(_)):($=ut,ht=Ht,it=Math.sqrt(_/2))}return new nt($/it,ht/it)}const dt=[];for(let tt=0,K=G.length,j=K-1,$=tt+1;tt<K;tt++,j++,$++)j===K&&(j=0),$===K&&($=0),dt[tt]=V(G[tt],G[j],G[$]);const xt=[];let St,Vt=dt.concat();for(let tt=0,K=q;tt<K;tt++){const j=L[tt];St=[];for(let $=0,ht=j.length,it=ht-1,ut=$+1;$<ht;$++,it++,ut++)it===ht&&(it=0),ut===ht&&(ut=0),St[$]=V(j[$],j[it],j[ut]);xt.push(St),Vt=Vt.concat(St)}let Jt;if(m===0)Jt=Cn.triangulateShape(G,L);else{const tt=[],K=[];for(let j=0;j<m;j++){const $=j/m,ht=d*Math.cos($*Math.PI/2),it=g*Math.sin($*Math.PI/2)+v;for(let ut=0,Ht=G.length;ut<Ht;ut++){const kt=X(G[ut],dt[ut],it);Dt(kt.x,kt.y,-ht),$===0&&tt.push(kt)}for(let ut=0,Ht=q;ut<Ht;ut++){const kt=L[ut];St=xt[ut];const w=[];for(let _=0,F=kt.length;_<F;_++){const H=X(kt[_],St[_],it);Dt(H.x,H.y,-ht),$===0&&w.push(H)}$===0&&K.push(w)}}Jt=Cn.triangulateShape(tt,K)}const re=Jt.length,Zt=g+v;for(let tt=0;tt<Z;tt++){const K=f?X(M[tt],Vt[tt],Zt):M[tt];x?(P.copy(A.normals[0]).multiplyScalar(K.x),T.copy(A.binormals[0]).multiplyScalar(K.y),I.copy(b[0]).add(P).add(T),Dt(I.x,I.y,I.z)):Dt(K.x,K.y,0)}for(let tt=1;tt<=h;tt++)for(let K=0;K<Z;K++){const j=f?X(M[K],Vt[K],Zt):M[K];x?(P.copy(A.normals[tt]).multiplyScalar(j.x),T.copy(A.binormals[tt]).multiplyScalar(j.y),I.copy(b[tt]).add(P).add(T),Dt(I.x,I.y,I.z)):Dt(j.x,j.y,u/h*tt)}for(let tt=m-1;tt>=0;tt--){const K=tt/m,j=d*Math.cos(K*Math.PI/2),$=g*Math.sin(K*Math.PI/2)+v;for(let ht=0,it=G.length;ht<it;ht++){const ut=X(G[ht],dt[ht],$);Dt(ut.x,ut.y,u+j)}for(let ht=0,it=L.length;ht<it;ht++){const ut=L[ht];St=xt[ht];for(let Ht=0,kt=ut.length;Ht<kt;Ht++){const w=X(ut[Ht],St[Ht],$);x?Dt(w.x,w.y+b[h-1].y,b[h-1].x+j):Dt(w.x,w.y,u+j)}}}Y(),et();function Y(){const tt=s.length/3;if(f){let K=0,j=Z*K;for(let $=0;$<re;$++){const ht=Jt[$];At(ht[2]+j,ht[1]+j,ht[0]+j)}K=h+m*2,j=Z*K;for(let $=0;$<re;$++){const ht=Jt[$];At(ht[0]+j,ht[1]+j,ht[2]+j)}}else{for(let K=0;K<re;K++){const j=Jt[K];At(j[2],j[1],j[0])}for(let K=0;K<re;K++){const j=Jt[K];At(j[0]+Z*h,j[1]+Z*h,j[2]+Z*h)}}n.addGroup(tt,s.length/3-tt,0)}function et(){const tt=s.length/3;let K=0;Mt(G,K),K+=G.length;for(let j=0,$=L.length;j<$;j++){const ht=L[j];Mt(ht,K),K+=ht.length}n.addGroup(tt,s.length/3-tt,1)}function Mt(tt,K){let j=tt.length;for(;--j>=0;){const $=j;let ht=j-1;ht<0&&(ht=tt.length-1);for(let it=0,ut=h+m*2;it<ut;it++){const Ht=Z*it,kt=Z*(it+1),w=K+$+Ht,_=K+ht+Ht,F=K+ht+kt,H=K+$+kt;jt(w,_,F,H)}}}function Dt(tt,K,j){c.push(tt),c.push(K),c.push(j)}function At(tt,K,j){fe(tt),fe(K),fe(j);const $=s.length/3,ht=S.generateTopUV(n,s,$-3,$-2,$-1);R(ht[0]),R(ht[1]),R(ht[2])}function jt(tt,K,j,$){fe(tt),fe(K),fe($),fe(K),fe(j),fe($);const ht=s.length/3,it=S.generateSideWallUV(n,s,ht-6,ht-3,ht-2,ht-1);R(it[0]),R(it[1]),R(it[3]),R(it[1]),R(it[2]),R(it[3])}function fe(tt){s.push(c[tt*3+0]),s.push(c[tt*3+1]),s.push(c[tt*3+2])}function R(tt){r.push(tt.x),r.push(tt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return ff(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,a=t.shapes.length;r<a;r++){const o=e[t.shapes[r]];n.push(o)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new co[s.type]().fromJSON(s)),new Lr(n,t.options)}}const df={generateTopUV:function(i,t,e,n,s){const r=t[e*3],a=t[e*3+1],o=t[n*3],c=t[n*3+1],l=t[s*3],h=t[s*3+1];return[new nt(r,a),new nt(o,c),new nt(l,h)]},generateSideWallUV:function(i,t,e,n,s,r){const a=t[e*3],o=t[e*3+1],c=t[e*3+2],l=t[n*3],h=t[n*3+1],u=t[n*3+2],f=t[s*3],d=t[s*3+1],g=t[s*3+2],v=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(o-h)<Math.abs(a-l)?[new nt(a,1-c),new nt(l,1-u),new nt(f,1-g),new nt(v,1-p)]:[new nt(o,1-c),new nt(h,1-u),new nt(d,1-g),new nt(m,1-p)]}};function ff(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Ho extends Bo{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Ho(t.radius,t.detail)}}class Ge extends Me{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),c=Math.floor(s),l=o+1,h=c+1,u=t/o,f=e/c,d=[],g=[],v=[],m=[];for(let p=0;p<h;p++){const S=p*f-a;for(let b=0;b<l;b++){const x=b*u-r;g.push(x,-S,0),v.push(0,0,1),m.push(b/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let S=0;S<o;S++){const b=S+l*p,x=S+l*(p+1),A=S+1+l*(p+1),T=S+1+l*p;d.push(b,x,T),d.push(x,A,T)}this.setIndex(d),this.setAttribute("position",new ie(g,3)),this.setAttribute("normal",new ie(v,3)),this.setAttribute("uv",new ie(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ge(t.width,t.height,t.widthSegments,t.heightSegments)}}class qi extends Me{constructor(t=.5,e=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],c=[],l=[],h=[];let u=t;const f=(e-t)/s,d=new C,g=new nt;for(let v=0;v<=s;v++){for(let m=0;m<=n;m++){const p=r+m/n*a;d.x=u*Math.cos(p),d.y=u*Math.sin(p),c.push(d.x,d.y,d.z),l.push(0,0,1),g.x=(d.x/e+1)/2,g.y=(d.y/e+1)/2,h.push(g.x,g.y)}u+=f}for(let v=0;v<s;v++){const m=v*(n+1);for(let p=0;p<n;p++){const S=p+m,b=S,x=S+n+1,A=S+n+2,T=S+1;o.push(b,x,T),o.push(x,A,T)}}this.setIndex(o),this.setAttribute("position",new ie(c,3)),this.setAttribute("normal",new ie(l,3)),this.setAttribute("uv",new ie(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new qi(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Go extends Me{constructor(t=new Pr([new nt(0,.5),new nt(-.5,-.5),new nt(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],s=[],r=[],a=[];let o=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let h=0;h<t.length;h++)l(t[h]),this.addGroup(o,c,h),o+=c,c=0;this.setIndex(n),this.setAttribute("position",new ie(s,3)),this.setAttribute("normal",new ie(r,3)),this.setAttribute("uv",new ie(a,2));function l(h){const u=s.length/3,f=h.extractPoints(e);let d=f.shape;const g=f.holes;Cn.isClockWise(d)===!1&&(d=d.reverse());for(let m=0,p=g.length;m<p;m++){const S=g[m];Cn.isClockWise(S)===!0&&(g[m]=S.reverse())}const v=Cn.triangulateShape(d,g);for(let m=0,p=g.length;m<p;m++){const S=g[m];d=d.concat(S)}for(let m=0,p=d.length;m<p;m++){const S=d[m];s.push(S.x,S.y,0),r.push(0,0,1),a.push(S.x,S.y)}for(let m=0,p=v.length;m<p;m++){const S=v[m],b=S[0]+u,x=S[1]+u,A=S[2]+u;n.push(b,x,A),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return pf(e,t)}static fromJSON(t,e){const n=[];for(let s=0,r=t.shapes.length;s<r;s++){const a=e[t.shapes[s]];n.push(a)}return new Go(n,t.curveSegments)}}function pf(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){const s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}class ui extends Me{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const h=[],u=new C,f=new C,d=[],g=[],v=[],m=[];for(let p=0;p<=n;p++){const S=[],b=p/n;let x=0;p===0&&a===0?x=.5/e:p===n&&c===Math.PI&&(x=-.5/e);for(let A=0;A<=e;A++){const T=A/e;u.x=-t*Math.cos(s+T*r)*Math.sin(a+b*o),u.y=t*Math.cos(a+b*o),u.z=t*Math.sin(s+T*r)*Math.sin(a+b*o),g.push(u.x,u.y,u.z),f.copy(u).normalize(),v.push(f.x,f.y,f.z),m.push(T+x,1-b),S.push(l++)}h.push(S)}for(let p=0;p<n;p++)for(let S=0;S<e;S++){const b=h[p][S+1],x=h[p][S],A=h[p+1][S],T=h[p+1][S+1];(p!==0||a>0)&&d.push(b,x,T),(p!==n-1||c<Math.PI)&&d.push(x,A,T)}this.setIndex(d),this.setAttribute("position",new ie(g,3)),this.setAttribute("normal",new ie(v,3)),this.setAttribute("uv",new ie(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ui(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Vo extends Me{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const a=[],o=[],c=[],l=[],h=new C,u=new C,f=new C;for(let d=0;d<=n;d++)for(let g=0;g<=s;g++){const v=g/s*r,m=d/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(v),u.y=(t+e*Math.cos(m))*Math.sin(v),u.z=e*Math.sin(m),o.push(u.x,u.y,u.z),h.x=t*Math.cos(v),h.y=t*Math.sin(v),f.subVectors(u,h).normalize(),c.push(f.x,f.y,f.z),l.push(g/s),l.push(d/n)}for(let d=1;d<=n;d++)for(let g=1;g<=s;g++){const v=(s+1)*d+g-1,m=(s+1)*(d-1)+g-1,p=(s+1)*(d-1)+g,S=(s+1)*d+g;a.push(v,m,S),a.push(m,p,S)}this.setIndex(a),this.setAttribute("position",new ie(o,3)),this.setAttribute("normal",new ie(c,3)),this.setAttribute("uv",new ie(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Vo(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class ne extends Yn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new qt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ro,this.normalScale=new nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ln,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class ds extends ne{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new nt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return $t(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new qt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new qt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new qt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class mf extends Yn{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ro,this.normalScale=new nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ln,this.combine=Mo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class gf extends Yn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Cu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class vf extends Yn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class da extends Fo{constructor(t){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}}class Wo extends ye{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new qt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class _f extends Wo{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ye.DEFAULT_UP),this.updateMatrix(),this.groundColor=new qt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const fa=new oe,kl=new C,Hl=new C;class ch{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new nt(512,512),this.mapType=vn,this.map=null,this.mapPass=null,this.matrix=new oe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Uo,this._frameExtents=new nt(1,1),this._viewportCount=1,this._viewports=[new ue(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;kl.setFromMatrixPosition(t.matrixWorld),e.position.copy(kl),Hl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Hl),e.updateMatrixWorld(),fa.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(fa,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(fa)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Gl=new oe,os=new C,pa=new C;class xf extends ch{constructor(){super(new Ye(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new nt(4,2),this._viewportCount=6,this._viewports=[new ue(2,1,1,1),new ue(0,1,1,1),new ue(3,1,1,1),new ue(1,1,1,1),new ue(3,0,1,1),new ue(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),os.setFromMatrixPosition(t.matrixWorld),n.position.copy(os),pa.copy(n.position),pa.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(pa),n.updateMatrixWorld(),s.makeTranslation(-os.x,-os.y,-os.z),Gl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Gl,n.coordinateSystem,n.reversedDepth)}}class yf extends Wo{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new xf}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class hh extends $c{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Mf extends ch{constructor(){super(new hh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Vl extends Wo{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ye.DEFAULT_UP),this.updateMatrix(),this.target=new ye,this.shadow=new Mf}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Sf extends Ye{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const Wl=new oe;class bf{constructor(t,e,n=0,s=1/0){this.ray=new Io(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Do,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Wl.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Wl),this}intersectObject(t,e=!0,n=[]){return po(t,this,n,e),n.sort(Xl),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)po(t[s],this,n,e);return n.sort(Xl),n}}function Xl(i,t){return i.distance-t.distance}function po(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)po(r[a],t,e,!0)}}const ql=new nt;class Yl{constructor(t=new nt(1/0,1/0),e=new nt(-1/0,-1/0)){this.isBox2=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=ql.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(t){return this.isEmpty()?t.set(0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ql).distanceTo(t)}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}function $l(i,t,e,n){const s=Ef(n);switch(e){case Bc:return i*t;case wo:return i*t/s.components*s.byteLength;case To:return i*t/s.components*s.byteLength;case kc:return i*t*2/s.components*s.byteLength;case Ao:return i*t*2/s.components*s.byteLength;case zc:return i*t*3/s.components*s.byteLength;case on:return i*t*4/s.components*s.byteLength;case Co:return i*t*4/s.components*s.byteLength;case mr:case gr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case vr:case _r:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ua:case Oa:return Math.max(i,16)*Math.max(t,8)/4;case Na:case Fa:return Math.max(i,8)*Math.max(t,8)/2;case Ba:case za:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ka:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ha:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ga:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Va:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Wa:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Xa:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case qa:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Ya:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case $a:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case ja:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Ka:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Ja:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Za:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Qa:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case to:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case eo:case no:case io:return Math.ceil(i/4)*Math.ceil(t/4)*16;case so:case ro:return Math.ceil(i/4)*Math.ceil(t/4)*8;case ao:case oo:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Ef(i){switch(i){case vn:case Nc:return{byteLength:1,components:1};case Ss:case Uc:case Ls:return{byteLength:2,components:1};case bo:case Eo:return{byteLength:2,components:4};case li:case So:case pn:return{byteLength:4,components:1};case Fc:case Oc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:yo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=yo);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function uh(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function wf(i){const t=new WeakMap;function e(o,c){const l=o.array,h=o.usage,u=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,h),o.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,c,l){const h=c.array,u=c.updateRanges;if(i.bindBuffer(l,o),u.length===0)i.bufferSubData(l,0,h);else{u.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<u.length;d++){const g=u[f],v=u[d];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++f,u[f]=v)}u.length=f+1;for(let d=0,g=u.length;d<g;d++){const v=u[d];i.bufferSubData(l,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(i.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var Tf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Af=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Cf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Rf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Pf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Lf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,If=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Df=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Nf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Uf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ff=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Of=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Bf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,zf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,kf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Hf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Gf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Vf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Wf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Xf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,qf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Yf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,$f=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,jf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Kf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Jf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Zf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Qf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,tp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ep=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,np="gl_FragColor = linearToOutputTexel( gl_FragColor );",ip=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,sp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,rp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ap=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,op=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,lp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,cp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,hp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,up=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,dp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,fp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,pp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,mp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,gp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,vp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,_p=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,xp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,yp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Mp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Sp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,bp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Ep=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,wp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Tp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Ap=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Cp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Rp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Pp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Lp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ip=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Dp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Np=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Up=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Fp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Op=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Bp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,zp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,kp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Hp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Gp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Vp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Wp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Xp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Yp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,$p=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,jp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Kp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Jp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Zp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Qp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,tm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,em=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,nm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,im=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,sm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,rm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,am=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,om=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,lm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,cm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,hm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,um=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,dm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,fm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,pm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,mm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,gm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,vm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,_m=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,xm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,ym=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Mm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Sm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,bm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Em=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const wm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Tm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Am=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Cm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Pm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Im=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Dm=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Nm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Um=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Fm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Om=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Bm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,zm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,km=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Gm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Wm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,qm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Ym=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$m=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Km=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Zm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,tg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,eg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ng=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ig=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Yt={alphahash_fragment:Tf,alphahash_pars_fragment:Af,alphamap_fragment:Cf,alphamap_pars_fragment:Rf,alphatest_fragment:Pf,alphatest_pars_fragment:Lf,aomap_fragment:If,aomap_pars_fragment:Df,batching_pars_vertex:Nf,batching_vertex:Uf,begin_vertex:Ff,beginnormal_vertex:Of,bsdfs:Bf,iridescence_fragment:zf,bumpmap_pars_fragment:kf,clipping_planes_fragment:Hf,clipping_planes_pars_fragment:Gf,clipping_planes_pars_vertex:Vf,clipping_planes_vertex:Wf,color_fragment:Xf,color_pars_fragment:qf,color_pars_vertex:Yf,color_vertex:$f,common:jf,cube_uv_reflection_fragment:Kf,defaultnormal_vertex:Jf,displacementmap_pars_vertex:Zf,displacementmap_vertex:Qf,emissivemap_fragment:tp,emissivemap_pars_fragment:ep,colorspace_fragment:np,colorspace_pars_fragment:ip,envmap_fragment:sp,envmap_common_pars_fragment:rp,envmap_pars_fragment:ap,envmap_pars_vertex:op,envmap_physical_pars_fragment:_p,envmap_vertex:lp,fog_vertex:cp,fog_pars_vertex:hp,fog_fragment:up,fog_pars_fragment:dp,gradientmap_pars_fragment:fp,lightmap_pars_fragment:pp,lights_lambert_fragment:mp,lights_lambert_pars_fragment:gp,lights_pars_begin:vp,lights_toon_fragment:xp,lights_toon_pars_fragment:yp,lights_phong_fragment:Mp,lights_phong_pars_fragment:Sp,lights_physical_fragment:bp,lights_physical_pars_fragment:Ep,lights_fragment_begin:wp,lights_fragment_maps:Tp,lights_fragment_end:Ap,logdepthbuf_fragment:Cp,logdepthbuf_pars_fragment:Rp,logdepthbuf_pars_vertex:Pp,logdepthbuf_vertex:Lp,map_fragment:Ip,map_pars_fragment:Dp,map_particle_fragment:Np,map_particle_pars_fragment:Up,metalnessmap_fragment:Fp,metalnessmap_pars_fragment:Op,morphinstance_vertex:Bp,morphcolor_vertex:zp,morphnormal_vertex:kp,morphtarget_pars_vertex:Hp,morphtarget_vertex:Gp,normal_fragment_begin:Vp,normal_fragment_maps:Wp,normal_pars_fragment:Xp,normal_pars_vertex:qp,normal_vertex:Yp,normalmap_pars_fragment:$p,clearcoat_normal_fragment_begin:jp,clearcoat_normal_fragment_maps:Kp,clearcoat_pars_fragment:Jp,iridescence_pars_fragment:Zp,opaque_fragment:Qp,packing:tm,premultiplied_alpha_fragment:em,project_vertex:nm,dithering_fragment:im,dithering_pars_fragment:sm,roughnessmap_fragment:rm,roughnessmap_pars_fragment:am,shadowmap_pars_fragment:om,shadowmap_pars_vertex:lm,shadowmap_vertex:cm,shadowmask_pars_fragment:hm,skinbase_vertex:um,skinning_pars_vertex:dm,skinning_vertex:fm,skinnormal_vertex:pm,specularmap_fragment:mm,specularmap_pars_fragment:gm,tonemapping_fragment:vm,tonemapping_pars_fragment:_m,transmission_fragment:xm,transmission_pars_fragment:ym,uv_pars_fragment:Mm,uv_pars_vertex:Sm,uv_vertex:bm,worldpos_vertex:Em,background_vert:wm,background_frag:Tm,backgroundCube_vert:Am,backgroundCube_frag:Cm,cube_vert:Rm,cube_frag:Pm,depth_vert:Lm,depth_frag:Im,distanceRGBA_vert:Dm,distanceRGBA_frag:Nm,equirect_vert:Um,equirect_frag:Fm,linedashed_vert:Om,linedashed_frag:Bm,meshbasic_vert:zm,meshbasic_frag:km,meshlambert_vert:Hm,meshlambert_frag:Gm,meshmatcap_vert:Vm,meshmatcap_frag:Wm,meshnormal_vert:Xm,meshnormal_frag:qm,meshphong_vert:Ym,meshphong_frag:$m,meshphysical_vert:jm,meshphysical_frag:Km,meshtoon_vert:Jm,meshtoon_frag:Zm,points_vert:Qm,points_frag:tg,shadow_vert:eg,shadow_frag:ng,sprite_vert:ig,sprite_frag:sg},pt={common:{diffuse:{value:new qt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xt}},envmap:{envMap:{value:null},envMapRotation:{value:new Xt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xt},normalScale:{value:new nt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new qt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0},uvTransform:{value:new Xt}},sprite:{diffuse:{value:new qt(16777215)},opacity:{value:1},center:{value:new nt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}}},un={basic:{uniforms:Fe([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.fog]),vertexShader:Yt.meshbasic_vert,fragmentShader:Yt.meshbasic_frag},lambert:{uniforms:Fe([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new qt(0)}}]),vertexShader:Yt.meshlambert_vert,fragmentShader:Yt.meshlambert_frag},phong:{uniforms:Fe([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new qt(0)},specular:{value:new qt(1118481)},shininess:{value:30}}]),vertexShader:Yt.meshphong_vert,fragmentShader:Yt.meshphong_frag},standard:{uniforms:Fe([pt.common,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.roughnessmap,pt.metalnessmap,pt.fog,pt.lights,{emissive:{value:new qt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag},toon:{uniforms:Fe([pt.common,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.gradientmap,pt.fog,pt.lights,{emissive:{value:new qt(0)}}]),vertexShader:Yt.meshtoon_vert,fragmentShader:Yt.meshtoon_frag},matcap:{uniforms:Fe([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,{matcap:{value:null}}]),vertexShader:Yt.meshmatcap_vert,fragmentShader:Yt.meshmatcap_frag},points:{uniforms:Fe([pt.points,pt.fog]),vertexShader:Yt.points_vert,fragmentShader:Yt.points_frag},dashed:{uniforms:Fe([pt.common,pt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Yt.linedashed_vert,fragmentShader:Yt.linedashed_frag},depth:{uniforms:Fe([pt.common,pt.displacementmap]),vertexShader:Yt.depth_vert,fragmentShader:Yt.depth_frag},normal:{uniforms:Fe([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,{opacity:{value:1}}]),vertexShader:Yt.meshnormal_vert,fragmentShader:Yt.meshnormal_frag},sprite:{uniforms:Fe([pt.sprite,pt.fog]),vertexShader:Yt.sprite_vert,fragmentShader:Yt.sprite_frag},background:{uniforms:{uvTransform:{value:new Xt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Yt.background_vert,fragmentShader:Yt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xt}},vertexShader:Yt.backgroundCube_vert,fragmentShader:Yt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Yt.cube_vert,fragmentShader:Yt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Yt.equirect_vert,fragmentShader:Yt.equirect_frag},distanceRGBA:{uniforms:Fe([pt.common,pt.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Yt.distanceRGBA_vert,fragmentShader:Yt.distanceRGBA_frag},shadow:{uniforms:Fe([pt.lights,pt.fog,{color:{value:new qt(0)},opacity:{value:1}}]),vertexShader:Yt.shadow_vert,fragmentShader:Yt.shadow_frag}};un.physical={uniforms:Fe([un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xt},clearcoatNormalScale:{value:new nt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xt},sheen:{value:0},sheenColor:{value:new qt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xt},transmissionSamplerSize:{value:new nt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xt},attenuationDistance:{value:0},attenuationColor:{value:new qt(0)},specularColor:{value:new qt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xt},anisotropyVector:{value:new nt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xt}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag};const hr={r:0,b:0,g:0},ti=new ln,rg=new oe;function ag(i,t,e,n,s,r,a){const o=new qt(0);let c=r===!0?0:1,l,h,u=null,f=0,d=null;function g(b){let x=b.isScene===!0?b.background:null;return x&&x.isTexture&&(x=(b.backgroundBlurriness>0?e:t).get(x)),x}function v(b){let x=!1;const A=g(b);A===null?p(o,c):A&&A.isColor&&(p(A,1),x=!0);const T=i.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,a):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(b,x){const A=g(x);A&&(A.isCubeTexture||A.mapping===Cr)?(h===void 0&&(h=new Nt(new _n(1,1,1),new qn({name:"BackgroundCubeMaterial",uniforms:Wi(un.backgroundCube.uniforms),vertexShader:un.backgroundCube.vertexShader,fragmentShader:un.backgroundCube.fragmentShader,side:Pe,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(T,P,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),ti.copy(x.backgroundRotation),ti.x*=-1,ti.y*=-1,ti.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(ti.y*=-1,ti.z*=-1),h.material.uniforms.envMap.value=A,h.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(rg.makeRotationFromEuler(ti)),h.material.toneMapped=ee.getTransfer(A.colorSpace)!==ce,(u!==A||f!==A.version||d!==i.toneMapping)&&(h.material.needsUpdate=!0,u=A,f=A.version,d=i.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null)):A&&A.isTexture&&(l===void 0&&(l=new Nt(new Ge(2,2),new qn({name:"BackgroundMaterial",uniforms:Wi(un.background.uniforms),vertexShader:un.background.vertexShader,fragmentShader:un.background.fragmentShader,side:Xn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=A,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.toneMapped=ee.getTransfer(A.colorSpace)!==ce,A.matrixAutoUpdate===!0&&A.updateMatrix(),l.material.uniforms.uvTransform.value.copy(A.matrix),(u!==A||f!==A.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,u=A,f=A.version,d=i.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function p(b,x){b.getRGB(hr,Yc(i)),n.buffers.color.setClear(hr.r,hr.g,hr.b,x,a)}function S(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(b,x=1){o.set(b),c=x,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(b){c=b,p(o,c)},render:v,addToRenderList:m,dispose:S}}function og(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,a=!1;function o(M,L,O,k,q){let G=!1;const X=u(k,O,L);r!==X&&(r=X,l(r.object)),G=d(M,k,O,q),G&&g(M,k,O,q),q!==null&&t.update(q,i.ELEMENT_ARRAY_BUFFER),(G||a)&&(a=!1,x(M,L,O,k),q!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(q).buffer))}function c(){return i.createVertexArray()}function l(M){return i.bindVertexArray(M)}function h(M){return i.deleteVertexArray(M)}function u(M,L,O){const k=O.wireframe===!0;let q=n[M.id];q===void 0&&(q={},n[M.id]=q);let G=q[L.id];G===void 0&&(G={},q[L.id]=G);let X=G[k];return X===void 0&&(X=f(c()),G[k]=X),X}function f(M){const L=[],O=[],k=[];for(let q=0;q<e;q++)L[q]=0,O[q]=0,k[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:O,attributeDivisors:k,object:M,attributes:{},index:null}}function d(M,L,O,k){const q=r.attributes,G=L.attributes;let X=0;const Z=O.getAttributes();for(const V in Z)if(Z[V].location>=0){const xt=q[V];let St=G[V];if(St===void 0&&(V==="instanceMatrix"&&M.instanceMatrix&&(St=M.instanceMatrix),V==="instanceColor"&&M.instanceColor&&(St=M.instanceColor)),xt===void 0||xt.attribute!==St||St&&xt.data!==St.data)return!0;X++}return r.attributesNum!==X||r.index!==k}function g(M,L,O,k){const q={},G=L.attributes;let X=0;const Z=O.getAttributes();for(const V in Z)if(Z[V].location>=0){let xt=G[V];xt===void 0&&(V==="instanceMatrix"&&M.instanceMatrix&&(xt=M.instanceMatrix),V==="instanceColor"&&M.instanceColor&&(xt=M.instanceColor));const St={};St.attribute=xt,xt&&xt.data&&(St.data=xt.data),q[V]=St,X++}r.attributes=q,r.attributesNum=X,r.index=k}function v(){const M=r.newAttributes;for(let L=0,O=M.length;L<O;L++)M[L]=0}function m(M){p(M,0)}function p(M,L){const O=r.newAttributes,k=r.enabledAttributes,q=r.attributeDivisors;O[M]=1,k[M]===0&&(i.enableVertexAttribArray(M),k[M]=1),q[M]!==L&&(i.vertexAttribDivisor(M,L),q[M]=L)}function S(){const M=r.newAttributes,L=r.enabledAttributes;for(let O=0,k=L.length;O<k;O++)L[O]!==M[O]&&(i.disableVertexAttribArray(O),L[O]=0)}function b(M,L,O,k,q,G,X){X===!0?i.vertexAttribIPointer(M,L,O,q,G):i.vertexAttribPointer(M,L,O,k,q,G)}function x(M,L,O,k){v();const q=k.attributes,G=O.getAttributes(),X=L.defaultAttributeValues;for(const Z in G){const V=G[Z];if(V.location>=0){let dt=q[Z];if(dt===void 0&&(Z==="instanceMatrix"&&M.instanceMatrix&&(dt=M.instanceMatrix),Z==="instanceColor"&&M.instanceColor&&(dt=M.instanceColor)),dt!==void 0){const xt=dt.normalized,St=dt.itemSize,Vt=t.get(dt);if(Vt===void 0)continue;const Jt=Vt.buffer,re=Vt.type,Zt=Vt.bytesPerElement,Y=re===i.INT||re===i.UNSIGNED_INT||dt.gpuType===So;if(dt.isInterleavedBufferAttribute){const et=dt.data,Mt=et.stride,Dt=dt.offset;if(et.isInstancedInterleavedBuffer){for(let At=0;At<V.locationSize;At++)p(V.location+At,et.meshPerAttribute);M.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let At=0;At<V.locationSize;At++)m(V.location+At);i.bindBuffer(i.ARRAY_BUFFER,Jt);for(let At=0;At<V.locationSize;At++)b(V.location+At,St/V.locationSize,re,xt,Mt*Zt,(Dt+St/V.locationSize*At)*Zt,Y)}else{if(dt.isInstancedBufferAttribute){for(let et=0;et<V.locationSize;et++)p(V.location+et,dt.meshPerAttribute);M.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=dt.meshPerAttribute*dt.count)}else for(let et=0;et<V.locationSize;et++)m(V.location+et);i.bindBuffer(i.ARRAY_BUFFER,Jt);for(let et=0;et<V.locationSize;et++)b(V.location+et,St/V.locationSize,re,xt,St*Zt,St/V.locationSize*et*Zt,Y)}}else if(X!==void 0){const xt=X[Z];if(xt!==void 0)switch(xt.length){case 2:i.vertexAttrib2fv(V.location,xt);break;case 3:i.vertexAttrib3fv(V.location,xt);break;case 4:i.vertexAttrib4fv(V.location,xt);break;default:i.vertexAttrib1fv(V.location,xt)}}}}S()}function A(){I();for(const M in n){const L=n[M];for(const O in L){const k=L[O];for(const q in k)h(k[q].object),delete k[q];delete L[O]}delete n[M]}}function T(M){if(n[M.id]===void 0)return;const L=n[M.id];for(const O in L){const k=L[O];for(const q in k)h(k[q].object),delete k[q];delete L[O]}delete n[M.id]}function P(M){for(const L in n){const O=n[L];if(O[M.id]===void 0)continue;const k=O[M.id];for(const q in k)h(k[q].object),delete k[q];delete O[M.id]}}function I(){E(),a=!0,r!==s&&(r=s,l(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:I,resetDefaultState:E,dispose:A,releaseStatesOfGeometry:T,releaseStatesOfProgram:P,initAttributes:v,enableAttribute:m,disableUnusedAttributes:S}}function lg(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function a(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function o(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let d=0;for(let g=0;g<u;g++)d+=h[g];e.update(d,n,1)}function c(l,h,u,f){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<l.length;g++)a(l[g],h[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,h,0,f,0,u);let g=0;for(let v=0;v<u;v++)g+=h[v]*f[v];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function cg(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const P=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(P){return!(P!==on&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const I=P===Ls&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(P!==vn&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==pn&&!I)}function c(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=g>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:S,maxVaryings:b,maxFragmentUniforms:x,vertexTextures:A,maxSamples:T}}function hg(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new kn,o=new Xt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){const g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{const S=r?0:n,b=S*4;let x=p.clippingState||null;c.value=x,x=h(g,f,b,d);for(let A=0;A!==b;++A)x[A]=e[A];p.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,g){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=c.value,g!==!0||m===null){const p=d+v*4,S=f.matrixWorldInverse;o.getNormalMatrix(S),(m===null||m.length<p)&&(m=new Float32Array(p));for(let b=0,x=d;b!==v;++b,x+=4)a.copy(u[b]).applyMatrix4(S,o),a.normal.toArray(m,x),m[x+3]=a.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function ug(i){let t=new WeakMap;function e(a,o){return o===La?a.mapping=Hi:o===Ia&&(a.mapping=Gi),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===La||o===Ia)if(t.has(a)){const c=t.get(a).texture;return e(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new Ed(c.height);return l.fromEquirectangularTexture(i,a),t.set(a,l),a.addEventListener("dispose",s),e(l.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const c=t.get(o);c!==void 0&&(t.delete(o),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const Ui=4,jl=[.125,.215,.35,.446,.526,.582],si=20,ma=new hh,Kl=new qt;let ga=null,va=0,_a=0,xa=!1;const ni=(1+Math.sqrt(5))/2,Di=1/ni,Jl=[new C(-ni,Di,0),new C(ni,Di,0),new C(-Di,0,ni),new C(Di,0,ni),new C(0,ni,-Di),new C(0,ni,Di),new C(-1,1,-1),new C(1,1,-1),new C(-1,1,1),new C(1,1,1)],dg=new C;class mo{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){const{size:a=256,position:o=dg}=r;ga=this._renderer.getRenderTarget(),va=this._renderer.getActiveCubeFace(),_a=this._renderer.getActiveMipmapLevel(),xa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,o),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=tc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ql(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ga,va,_a),this._renderer.xr.enabled=xa,t.scissorTest=!1,ur(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Hi||t.mapping===Gi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ga=this._renderer.getRenderTarget(),va=this._renderer.getActiveCubeFace(),_a=this._renderer.getActiveMipmapLevel(),xa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:fn,minFilter:fn,generateMipmaps:!1,type:Ls,format:on,colorSpace:Vi,depthBuffer:!1},s=Zl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Zl(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=fg(r)),this._blurMaterial=pg(r,t,e)}return s}_compileMaterial(t){const e=new Nt(this._lodPlanes[0],t);this._renderer.compile(e,ma)}_sceneToCubeUV(t,e,n,s,r){const c=new Ye(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(Kl),u.toneMapping=Vn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const v=new Be({name:"PMREM.Background",side:Pe,depthWrite:!1,depthTest:!1}),m=new Nt(new _n,v);let p=!1;const S=t.background;S?S.isColor&&(v.color.copy(S),t.background=null,p=!0):(v.color.copy(Kl),p=!0);for(let b=0;b<6;b++){const x=b%3;x===0?(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[b],r.y,r.z)):x===1?(c.up.set(0,0,l[b]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[b],r.z)):(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[b]));const A=this._cubeSize;ur(s,x*A,b>2?A:0,A,A),u.setRenderTarget(s),p&&u.render(m,c),u.render(t,c)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=d,u.autoClear=f,t.background=S}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Hi||t.mapping===Gi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=tc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ql());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Nt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const c=this._cubeSize;ur(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,ma)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Jl[(s-r-1)%Jl.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Nt(this._lodPlanes[s],l),f=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*si-1),v=r/g,m=isFinite(r)?1+Math.floor(h*v):si;m>si&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${si}`);const p=[];let S=0;for(let P=0;P<si;++P){const I=P/v,E=Math.exp(-I*I/2);p.push(E),P===0?S+=E:P<m&&(S+=2*E)}for(let P=0;P<p.length;P++)p[P]=p[P]/S;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:b}=this;f.dTheta.value=g,f.mipInt.value=b-n;const x=this._sizeLods[s],A=3*x*(s>b-Ui?s-b+Ui:0),T=4*(this._cubeSize-x);ur(e,A,T,3*x,2*x),c.setRenderTarget(e),c.render(u,ma)}}function fg(i){const t=[],e=[],n=[];let s=i;const r=i-Ui+1+jl.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let c=1/o;a>i-Ui?c=jl[a-i+Ui-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,v=3,m=2,p=1,S=new Float32Array(v*g*d),b=new Float32Array(m*g*d),x=new Float32Array(p*g*d);for(let T=0;T<d;T++){const P=T%3*2/3-1,I=T>2?0:-1,E=[P,I,0,P+2/3,I,0,P+2/3,I+1,0,P,I,0,P+2/3,I+1,0,P,I+1,0];S.set(E,v*g*T),b.set(f,m*g*T);const M=[T,T,T,T,T,T];x.set(M,p*g*T)}const A=new Me;A.setAttribute("position",new ze(S,v)),A.setAttribute("uv",new ze(b,m)),A.setAttribute("faceIndex",new ze(x,p)),t.push(A),s>Ui&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Zl(i,t,e){const n=new ci(i,t,e);return n.texture.mapping=Cr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ur(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function pg(i,t,e){const n=new Float32Array(si),s=new C(0,1,0);return new qn({name:"SphericalGaussianBlur",defines:{n:si,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Xo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function Ql(){return new qn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Xo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function tc(){return new qn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Xo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function Xo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function mg(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===La||c===Ia,h=c===Hi||c===Gi;if(l||h){let u=t.get(o);const f=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return e===null&&(e=new mo(i)),u=l?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const d=o.image;return l&&d&&d.height>0||h&&d&&s(d)?(e===null&&(e=new mo(i)),u=l?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let c=0;const l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function gg(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&As("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function vg(i,t,e,n){const s={},r=new WeakMap;function a(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);f.removeEventListener("dispose",a),delete s[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(u,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,e.memory.geometries++),f}function c(u){const f=u.attributes;for(const d in f)t.update(f[d],i.ARRAY_BUFFER)}function l(u){const f=[],d=u.index,g=u.attributes.position;let v=0;if(d!==null){const S=d.array;v=d.version;for(let b=0,x=S.length;b<x;b+=3){const A=S[b+0],T=S[b+1],P=S[b+2];f.push(A,T,T,P,P,A)}}else if(g!==void 0){const S=g.array;v=g.version;for(let b=0,x=S.length/3-1;b<x;b+=3){const A=b+0,T=b+1,P=b+2;f.push(A,T,T,P,P,A)}}else return;const m=new(Gc(f)?qc:Xc)(f,1);m.version=v;const p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){const f=r.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&l(u)}else l(u);return r.get(u)}return{get:o,update:c,getWireframeAttribute:h}}function _g(i,t,e){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function c(f,d){i.drawElements(n,d,r,f*a),e.update(d,n,1)}function l(f,d,g){g!==0&&(i.drawElementsInstanced(n,d,r,f*a,g),e.update(d,n,g))}function h(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];e.update(m,n,1)}function u(f,d,g,v){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)l(f[p]/a,d[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,v,0,g);let p=0;for(let S=0;S<g;S++)p+=d[S]*v[S];e.update(p,n,1)}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function xg(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function yg(i,t,e){const n=new WeakMap,s=new ue;function r(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(o);if(f===void 0||f.count!==u){let M=function(){I.dispose(),n.delete(o),o.removeEventListener("dispose",M)};var d=M;f!==void 0&&f.texture.dispose();const g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],S=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let x=0;g===!0&&(x=1),v===!0&&(x=2),m===!0&&(x=3);let A=o.attributes.position.count*x,T=1;A>t.maxTextureSize&&(T=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);const P=new Float32Array(A*T*4*u),I=new Vc(P,A,T,u);I.type=pn,I.needsUpdate=!0;const E=x*4;for(let L=0;L<u;L++){const O=p[L],k=S[L],q=b[L],G=A*T*4*L;for(let X=0;X<O.count;X++){const Z=X*E;g===!0&&(s.fromBufferAttribute(O,X),P[G+Z+0]=s.x,P[G+Z+1]=s.y,P[G+Z+2]=s.z,P[G+Z+3]=0),v===!0&&(s.fromBufferAttribute(k,X),P[G+Z+4]=s.x,P[G+Z+5]=s.y,P[G+Z+6]=s.z,P[G+Z+7]=0),m===!0&&(s.fromBufferAttribute(q,X),P[G+Z+8]=s.x,P[G+Z+9]=s.y,P[G+Z+10]=s.z,P[G+Z+11]=q.itemSize===4?s.w:1)}}f={count:u,texture:I,size:new nt(A,T)},n.set(o,f),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const v=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",v),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function Mg(i,t,e,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return u}function a(){s=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:a}}const dh=new Le,ec=new Qc(1,1),fh=new Vc,ph=new od,mh=new jc,nc=[],ic=[],sc=new Float32Array(16),rc=new Float32Array(9),ac=new Float32Array(4);function ji(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=nc[s];if(r===void 0&&(r=new Float32Array(s),nc[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function we(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Te(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Ir(i,t){let e=ic[t];e===void 0&&(e=new Int32Array(t),ic[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Sg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function bg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;i.uniform2fv(this.addr,t),Te(e,t)}}function Eg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(we(e,t))return;i.uniform3fv(this.addr,t),Te(e,t)}}function wg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;i.uniform4fv(this.addr,t),Te(e,t)}}function Tg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(we(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Te(e,t)}else{if(we(e,n))return;ac.set(n),i.uniformMatrix2fv(this.addr,!1,ac),Te(e,n)}}function Ag(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(we(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Te(e,t)}else{if(we(e,n))return;rc.set(n),i.uniformMatrix3fv(this.addr,!1,rc),Te(e,n)}}function Cg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(we(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Te(e,t)}else{if(we(e,n))return;sc.set(n),i.uniformMatrix4fv(this.addr,!1,sc),Te(e,n)}}function Rg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Pg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;i.uniform2iv(this.addr,t),Te(e,t)}}function Lg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(we(e,t))return;i.uniform3iv(this.addr,t),Te(e,t)}}function Ig(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;i.uniform4iv(this.addr,t),Te(e,t)}}function Dg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Ng(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;i.uniform2uiv(this.addr,t),Te(e,t)}}function Ug(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(we(e,t))return;i.uniform3uiv(this.addr,t),Te(e,t)}}function Fg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;i.uniform4uiv(this.addr,t),Te(e,t)}}function Og(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(ec.compareFunction=Hc,r=ec):r=dh,e.setTexture2D(t||r,s)}function Bg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||ph,s)}function zg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||mh,s)}function kg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||fh,s)}function Hg(i){switch(i){case 5126:return Sg;case 35664:return bg;case 35665:return Eg;case 35666:return wg;case 35674:return Tg;case 35675:return Ag;case 35676:return Cg;case 5124:case 35670:return Rg;case 35667:case 35671:return Pg;case 35668:case 35672:return Lg;case 35669:case 35673:return Ig;case 5125:return Dg;case 36294:return Ng;case 36295:return Ug;case 36296:return Fg;case 35678:case 36198:case 36298:case 36306:case 35682:return Og;case 35679:case 36299:case 36307:return Bg;case 35680:case 36300:case 36308:case 36293:return zg;case 36289:case 36303:case 36311:case 36292:return kg}}function Gg(i,t){i.uniform1fv(this.addr,t)}function Vg(i,t){const e=ji(t,this.size,2);i.uniform2fv(this.addr,e)}function Wg(i,t){const e=ji(t,this.size,3);i.uniform3fv(this.addr,e)}function Xg(i,t){const e=ji(t,this.size,4);i.uniform4fv(this.addr,e)}function qg(i,t){const e=ji(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Yg(i,t){const e=ji(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function $g(i,t){const e=ji(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function jg(i,t){i.uniform1iv(this.addr,t)}function Kg(i,t){i.uniform2iv(this.addr,t)}function Jg(i,t){i.uniform3iv(this.addr,t)}function Zg(i,t){i.uniform4iv(this.addr,t)}function Qg(i,t){i.uniform1uiv(this.addr,t)}function t0(i,t){i.uniform2uiv(this.addr,t)}function e0(i,t){i.uniform3uiv(this.addr,t)}function n0(i,t){i.uniform4uiv(this.addr,t)}function i0(i,t,e){const n=this.cache,s=t.length,r=Ir(e,s);we(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||dh,r[a])}function s0(i,t,e){const n=this.cache,s=t.length,r=Ir(e,s);we(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||ph,r[a])}function r0(i,t,e){const n=this.cache,s=t.length,r=Ir(e,s);we(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||mh,r[a])}function a0(i,t,e){const n=this.cache,s=t.length,r=Ir(e,s);we(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||fh,r[a])}function o0(i){switch(i){case 5126:return Gg;case 35664:return Vg;case 35665:return Wg;case 35666:return Xg;case 35674:return qg;case 35675:return Yg;case 35676:return $g;case 5124:case 35670:return jg;case 35667:case 35671:return Kg;case 35668:case 35672:return Jg;case 35669:case 35673:return Zg;case 5125:return Qg;case 36294:return t0;case 36295:return e0;case 36296:return n0;case 35678:case 36198:case 36298:case 36306:case 35682:return i0;case 35679:case 36299:case 36307:return s0;case 35680:case 36300:case 36308:case 36293:return r0;case 36289:case 36303:case 36311:case 36292:return a0}}class l0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Hg(e.type)}}class c0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=o0(e.type)}}class h0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const ya=/(\w+)(\])?(\[|\.)?/g;function oc(i,t){i.seq.push(t),i.map[t.id]=t}function u0(i,t,e){const n=i.name,s=n.length;for(ya.lastIndex=0;;){const r=ya.exec(n),a=ya.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){oc(e,l===void 0?new l0(o,i,t):new c0(o,i,t));break}else{let u=e.map[o];u===void 0&&(u=new h0(o),oc(e,u)),e=u}}}class yr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);u0(r,a,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function lc(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const d0=37297;let f0=0;function p0(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const cc=new Xt;function m0(i){ee._getMatrix(cc,ee.workingColorSpace,i);const t=`mat3( ${cc.elements.map(e=>e.toFixed(4))} )`;switch(ee.getTransfer(i)){case Sr:return[t,"LinearTransferOETF"];case ce:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function hc(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+p0(i.getShaderSource(t),o)}else return r}function g0(i,t){const e=m0(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function v0(i,t){let e;switch(t){case Mu:e="Linear";break;case Su:e="Reinhard";break;case bu:e="Cineon";break;case Ic:e="ACESFilmic";break;case wu:e="AgX";break;case Tu:e="Neutral";break;case Eu:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const dr=new C;function _0(){ee.getLuminanceCoefficients(dr);const i=dr.x.toFixed(4),t=dr.y.toFixed(4),e=dr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function x0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(fs).join(`
`)}function y0(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function M0(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function fs(i){return i!==""}function uc(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function dc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const S0=/^[ \t]*#include +<([\w\d./]+)>/gm;function go(i){return i.replace(S0,E0)}const b0=new Map;function E0(i,t){let e=Yt[t];if(e===void 0){const n=b0.get(t);if(n!==void 0)e=Yt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return go(e)}const w0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function fc(i){return i.replace(w0,T0)}function T0(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function pc(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function A0(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Pc?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Lc?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===An&&(t="SHADOWMAP_TYPE_VSM"),t}function C0(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Hi:case Gi:t="ENVMAP_TYPE_CUBE";break;case Cr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function R0(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Gi:t="ENVMAP_MODE_REFRACTION";break}return t}function P0(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Mo:t="ENVMAP_BLENDING_MULTIPLY";break;case xu:t="ENVMAP_BLENDING_MIX";break;case yu:t="ENVMAP_BLENDING_ADD";break}return t}function L0(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function I0(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=A0(e),l=C0(e),h=R0(e),u=P0(e),f=L0(e),d=x0(e),g=y0(r),v=s.createProgram();let m,p,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(fs).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(fs).join(`
`),p.length>0&&(p+=`
`)):(m=[pc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(fs).join(`
`),p=[pc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Vn?"#define TONE_MAPPING":"",e.toneMapping!==Vn?Yt.tonemapping_pars_fragment:"",e.toneMapping!==Vn?v0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Yt.colorspace_pars_fragment,g0("linearToOutputTexel",e.outputColorSpace),_0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(fs).join(`
`)),a=go(a),a=uc(a,e),a=dc(a,e),o=go(o),o=uc(o,e),o=dc(o,e),a=fc(a),o=fc(o),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===hl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===hl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const b=S+m+a,x=S+p+o,A=lc(s,s.VERTEX_SHADER,b),T=lc(s,s.FRAGMENT_SHADER,x);s.attachShader(v,A),s.attachShader(v,T),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function P(L){if(i.debug.checkShaderErrors){const O=s.getProgramInfoLog(v)||"",k=s.getShaderInfoLog(A)||"",q=s.getShaderInfoLog(T)||"",G=O.trim(),X=k.trim(),Z=q.trim();let V=!0,dt=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(V=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,A,T);else{const xt=hc(s,A,"vertex"),St=hc(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+G+`
`+xt+`
`+St)}else G!==""?console.warn("THREE.WebGLProgram: Program Info Log:",G):(X===""||Z==="")&&(dt=!1);dt&&(L.diagnostics={runnable:V,programLog:G,vertexShader:{log:X,prefix:m},fragmentShader:{log:Z,prefix:p}})}s.deleteShader(A),s.deleteShader(T),I=new yr(s,v),E=M0(s,v)}let I;this.getUniforms=function(){return I===void 0&&P(this),I};let E;this.getAttributes=function(){return E===void 0&&P(this),E};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(v,d0)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=f0++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=A,this.fragmentShader=T,this}let D0=0;class N0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new U0(t),e.set(t,n)),n}}class U0{constructor(t){this.id=D0++,this.code=t,this.usedTimes=0}}function F0(i,t,e,n,s,r,a){const o=new Do,c=new N0,l=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures;let d=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(E){return l.add(E),E===0?"uv":`uv${E}`}function m(E,M,L,O,k){const q=O.fog,G=k.geometry,X=E.isMeshStandardMaterial?O.environment:null,Z=(E.isMeshStandardMaterial?e:t).get(E.envMap||X),V=Z&&Z.mapping===Cr?Z.image.height:null,dt=g[E.type];E.precision!==null&&(d=s.getMaxPrecision(E.precision),d!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",d,"instead."));const xt=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,St=xt!==void 0?xt.length:0;let Vt=0;G.morphAttributes.position!==void 0&&(Vt=1),G.morphAttributes.normal!==void 0&&(Vt=2),G.morphAttributes.color!==void 0&&(Vt=3);let Jt,re,Zt,Y;if(dt){const se=un[dt];Jt=se.vertexShader,re=se.fragmentShader}else Jt=E.vertexShader,re=E.fragmentShader,c.update(E),Zt=c.getVertexShaderID(E),Y=c.getFragmentShaderID(E);const et=i.getRenderTarget(),Mt=i.state.buffers.depth.getReversed(),Dt=k.isInstancedMesh===!0,At=k.isBatchedMesh===!0,jt=!!E.map,fe=!!E.matcap,R=!!Z,tt=!!E.aoMap,K=!!E.lightMap,j=!!E.bumpMap,$=!!E.normalMap,ht=!!E.displacementMap,it=!!E.emissiveMap,ut=!!E.metalnessMap,Ht=!!E.roughnessMap,kt=E.anisotropy>0,w=E.clearcoat>0,_=E.dispersion>0,F=E.iridescence>0,H=E.sheen>0,Q=E.transmission>0,W=kt&&!!E.anisotropyMap,Lt=w&&!!E.clearcoatMap,ct=w&&!!E.clearcoatNormalMap,Ct=w&&!!E.clearcoatRoughnessMap,Rt=F&&!!E.iridescenceMap,st=F&&!!E.iridescenceThicknessMap,_t=H&&!!E.sheenColorMap,Bt=H&&!!E.sheenRoughnessMap,It=!!E.specularMap,gt=!!E.specularColorMap,Wt=!!E.specularIntensityMap,D=Q&&!!E.transmissionMap,ot=Q&&!!E.thicknessMap,ft=!!E.gradientMap,bt=!!E.alphaMap,rt=E.alphaTest>0,J=!!E.alphaHash,Pt=!!E.extensions;let Gt=Vn;E.toneMapped&&(et===null||et.isXRRenderTarget===!0)&&(Gt=i.toneMapping);const pe={shaderID:dt,shaderType:E.type,shaderName:E.name,vertexShader:Jt,fragmentShader:re,defines:E.defines,customVertexShaderID:Zt,customFragmentShaderID:Y,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:d,batching:At,batchingColor:At&&k._colorsTexture!==null,instancing:Dt,instancingColor:Dt&&k.instanceColor!==null,instancingMorph:Dt&&k.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:et===null?i.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:Vi,alphaToCoverage:!!E.alphaToCoverage,map:jt,matcap:fe,envMap:R,envMapMode:R&&Z.mapping,envMapCubeUVHeight:V,aoMap:tt,lightMap:K,bumpMap:j,normalMap:$,displacementMap:f&&ht,emissiveMap:it,normalMapObjectSpace:$&&E.normalMapType===Pu,normalMapTangentSpace:$&&E.normalMapType===Ro,metalnessMap:ut,roughnessMap:Ht,anisotropy:kt,anisotropyMap:W,clearcoat:w,clearcoatMap:Lt,clearcoatNormalMap:ct,clearcoatRoughnessMap:Ct,dispersion:_,iridescence:F,iridescenceMap:Rt,iridescenceThicknessMap:st,sheen:H,sheenColorMap:_t,sheenRoughnessMap:Bt,specularMap:It,specularColorMap:gt,specularIntensityMap:Wt,transmission:Q,transmissionMap:D,thicknessMap:ot,gradientMap:ft,opaque:E.transparent===!1&&E.blending===Oi&&E.alphaToCoverage===!1,alphaMap:bt,alphaTest:rt,alphaHash:J,combine:E.combine,mapUv:jt&&v(E.map.channel),aoMapUv:tt&&v(E.aoMap.channel),lightMapUv:K&&v(E.lightMap.channel),bumpMapUv:j&&v(E.bumpMap.channel),normalMapUv:$&&v(E.normalMap.channel),displacementMapUv:ht&&v(E.displacementMap.channel),emissiveMapUv:it&&v(E.emissiveMap.channel),metalnessMapUv:ut&&v(E.metalnessMap.channel),roughnessMapUv:Ht&&v(E.roughnessMap.channel),anisotropyMapUv:W&&v(E.anisotropyMap.channel),clearcoatMapUv:Lt&&v(E.clearcoatMap.channel),clearcoatNormalMapUv:ct&&v(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ct&&v(E.clearcoatRoughnessMap.channel),iridescenceMapUv:Rt&&v(E.iridescenceMap.channel),iridescenceThicknessMapUv:st&&v(E.iridescenceThicknessMap.channel),sheenColorMapUv:_t&&v(E.sheenColorMap.channel),sheenRoughnessMapUv:Bt&&v(E.sheenRoughnessMap.channel),specularMapUv:It&&v(E.specularMap.channel),specularColorMapUv:gt&&v(E.specularColorMap.channel),specularIntensityMapUv:Wt&&v(E.specularIntensityMap.channel),transmissionMapUv:D&&v(E.transmissionMap.channel),thicknessMapUv:ot&&v(E.thicknessMap.channel),alphaMapUv:bt&&v(E.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&($||kt),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!G.attributes.uv&&(jt||bt),fog:!!q,useFog:E.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:E.flatShading===!0&&E.wireframe===!1,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Mt,skinning:k.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:St,morphTextureStride:Vt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:Gt,decodeVideoTexture:jt&&E.map.isVideoTexture===!0&&ee.getTransfer(E.map.colorSpace)===ce,decodeVideoTextureEmissive:it&&E.emissiveMap.isVideoTexture===!0&&ee.getTransfer(E.emissiveMap.colorSpace)===ce,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===dn,flipSided:E.side===Pe,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Pt&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Pt&&E.extensions.multiDraw===!0||At)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return pe.vertexUv1s=l.has(1),pe.vertexUv2s=l.has(2),pe.vertexUv3s=l.has(3),l.clear(),pe}function p(E){const M=[];if(E.shaderID?M.push(E.shaderID):(M.push(E.customVertexShaderID),M.push(E.customFragmentShaderID)),E.defines!==void 0)for(const L in E.defines)M.push(L),M.push(E.defines[L]);return E.isRawShaderMaterial===!1&&(S(M,E),b(M,E),M.push(i.outputColorSpace)),M.push(E.customProgramCacheKey),M.join()}function S(E,M){E.push(M.precision),E.push(M.outputColorSpace),E.push(M.envMapMode),E.push(M.envMapCubeUVHeight),E.push(M.mapUv),E.push(M.alphaMapUv),E.push(M.lightMapUv),E.push(M.aoMapUv),E.push(M.bumpMapUv),E.push(M.normalMapUv),E.push(M.displacementMapUv),E.push(M.emissiveMapUv),E.push(M.metalnessMapUv),E.push(M.roughnessMapUv),E.push(M.anisotropyMapUv),E.push(M.clearcoatMapUv),E.push(M.clearcoatNormalMapUv),E.push(M.clearcoatRoughnessMapUv),E.push(M.iridescenceMapUv),E.push(M.iridescenceThicknessMapUv),E.push(M.sheenColorMapUv),E.push(M.sheenRoughnessMapUv),E.push(M.specularMapUv),E.push(M.specularColorMapUv),E.push(M.specularIntensityMapUv),E.push(M.transmissionMapUv),E.push(M.thicknessMapUv),E.push(M.combine),E.push(M.fogExp2),E.push(M.sizeAttenuation),E.push(M.morphTargetsCount),E.push(M.morphAttributeCount),E.push(M.numDirLights),E.push(M.numPointLights),E.push(M.numSpotLights),E.push(M.numSpotLightMaps),E.push(M.numHemiLights),E.push(M.numRectAreaLights),E.push(M.numDirLightShadows),E.push(M.numPointLightShadows),E.push(M.numSpotLightShadows),E.push(M.numSpotLightShadowsWithMaps),E.push(M.numLightProbes),E.push(M.shadowMapType),E.push(M.toneMapping),E.push(M.numClippingPlanes),E.push(M.numClipIntersection),E.push(M.depthPacking)}function b(E,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),M.gradientMap&&o.enable(22),E.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reversedDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),E.push(o.mask)}function x(E){const M=g[E.type];let L;if(M){const O=un[M];L=yd.clone(O.uniforms)}else L=E.uniforms;return L}function A(E,M){let L;for(let O=0,k=h.length;O<k;O++){const q=h[O];if(q.cacheKey===M){L=q,++L.usedTimes;break}}return L===void 0&&(L=new I0(i,M,E,r),h.push(L)),L}function T(E){if(--E.usedTimes===0){const M=h.indexOf(E);h[M]=h[h.length-1],h.pop(),E.destroy()}}function P(E){c.remove(E)}function I(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:A,releaseProgram:T,releaseShaderCache:P,programs:h,dispose:I}}function O0(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function B0(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function mc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function gc(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(u,f,d,g,v,m){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:g,renderOrder:u.renderOrder,z:v,group:m},i[t]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=v,p.group=m),t++,p}function o(u,f,d,g,v,m){const p=a(u,f,d,g,v,m);d.transmission>0?n.push(p):d.transparent===!0?s.push(p):e.push(p)}function c(u,f,d,g,v,m){const p=a(u,f,d,g,v,m);d.transmission>0?n.unshift(p):d.transparent===!0?s.unshift(p):e.unshift(p)}function l(u,f){e.length>1&&e.sort(u||B0),n.length>1&&n.sort(f||mc),s.length>1&&s.sort(f||mc)}function h(){for(let u=t,f=i.length;u<f;u++){const d=i[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:h,sort:l}}function z0(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new gc,i.set(n,[a])):s>=r.length?(a=new gc,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function k0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new C,color:new qt};break;case"SpotLight":e={position:new C,direction:new C,color:new qt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new C,color:new qt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new C,skyColor:new qt,groundColor:new qt};break;case"RectAreaLight":e={color:new qt,position:new C,halfWidth:new C,halfHeight:new C};break}return i[t.id]=e,e}}}function H0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let G0=0;function V0(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function W0(i){const t=new k0,e=H0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new C);const s=new C,r=new oe,a=new oe;function o(l){let h=0,u=0,f=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let d=0,g=0,v=0,m=0,p=0,S=0,b=0,x=0,A=0,T=0,P=0;l.sort(V0);for(let E=0,M=l.length;E<M;E++){const L=l[E],O=L.color,k=L.intensity,q=L.distance,G=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)h+=O.r*k,u+=O.g*k,f+=O.b*k;else if(L.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(L.sh.coefficients[X],k);P++}else if(L.isDirectionalLight){const X=t.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const Z=L.shadow,V=e.get(L);V.shadowIntensity=Z.intensity,V.shadowBias=Z.bias,V.shadowNormalBias=Z.normalBias,V.shadowRadius=Z.radius,V.shadowMapSize=Z.mapSize,n.directionalShadow[d]=V,n.directionalShadowMap[d]=G,n.directionalShadowMatrix[d]=L.shadow.matrix,S++}n.directional[d]=X,d++}else if(L.isSpotLight){const X=t.get(L);X.position.setFromMatrixPosition(L.matrixWorld),X.color.copy(O).multiplyScalar(k),X.distance=q,X.coneCos=Math.cos(L.angle),X.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),X.decay=L.decay,n.spot[v]=X;const Z=L.shadow;if(L.map&&(n.spotLightMap[A]=L.map,A++,Z.updateMatrices(L),L.castShadow&&T++),n.spotLightMatrix[v]=Z.matrix,L.castShadow){const V=e.get(L);V.shadowIntensity=Z.intensity,V.shadowBias=Z.bias,V.shadowNormalBias=Z.normalBias,V.shadowRadius=Z.radius,V.shadowMapSize=Z.mapSize,n.spotShadow[v]=V,n.spotShadowMap[v]=G,x++}v++}else if(L.isRectAreaLight){const X=t.get(L);X.color.copy(O).multiplyScalar(k),X.halfWidth.set(L.width*.5,0,0),X.halfHeight.set(0,L.height*.5,0),n.rectArea[m]=X,m++}else if(L.isPointLight){const X=t.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),X.distance=L.distance,X.decay=L.decay,L.castShadow){const Z=L.shadow,V=e.get(L);V.shadowIntensity=Z.intensity,V.shadowBias=Z.bias,V.shadowNormalBias=Z.normalBias,V.shadowRadius=Z.radius,V.shadowMapSize=Z.mapSize,V.shadowCameraNear=Z.camera.near,V.shadowCameraFar=Z.camera.far,n.pointShadow[g]=V,n.pointShadowMap[g]=G,n.pointShadowMatrix[g]=L.shadow.matrix,b++}n.point[g]=X,g++}else if(L.isHemisphereLight){const X=t.get(L);X.skyColor.copy(L.color).multiplyScalar(k),X.groundColor.copy(L.groundColor).multiplyScalar(k),n.hemi[p]=X,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=pt.LTC_FLOAT_1,n.rectAreaLTC2=pt.LTC_FLOAT_2):(n.rectAreaLTC1=pt.LTC_HALF_1,n.rectAreaLTC2=pt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const I=n.hash;(I.directionalLength!==d||I.pointLength!==g||I.spotLength!==v||I.rectAreaLength!==m||I.hemiLength!==p||I.numDirectionalShadows!==S||I.numPointShadows!==b||I.numSpotShadows!==x||I.numSpotMaps!==A||I.numLightProbes!==P)&&(n.directional.length=d,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=x+A-T,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=P,I.directionalLength=d,I.pointLength=g,I.spotLength=v,I.rectAreaLength=m,I.hemiLength=p,I.numDirectionalShadows=S,I.numPointShadows=b,I.numSpotShadows=x,I.numSpotMaps=A,I.numLightProbes=P,n.version=G0++)}function c(l,h){let u=0,f=0,d=0,g=0,v=0;const m=h.matrixWorldInverse;for(let p=0,S=l.length;p<S;p++){const b=l[p];if(b.isDirectionalLight){const x=n.directional[u];x.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),u++}else if(b.isSpotLight){const x=n.spot[d];x.position.setFromMatrixPosition(b.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),d++}else if(b.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(b.matrixWorld),x.position.applyMatrix4(m),a.identity(),r.copy(b.matrixWorld),r.premultiply(m),a.extractRotation(r),x.halfWidth.set(b.width*.5,0,0),x.halfHeight.set(0,b.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),g++}else if(b.isPointLight){const x=n.point[f];x.position.setFromMatrixPosition(b.matrixWorld),x.position.applyMatrix4(m),f++}else if(b.isHemisphereLight){const x=n.hemi[v];x.direction.setFromMatrixPosition(b.matrixWorld),x.direction.transformDirection(m),v++}}}return{setup:o,setupView:c,state:n}}function vc(i){const t=new W0(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function X0(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new vc(i),t.set(s,[o])):r>=a.length?(o=new vc(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const q0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Y0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function $0(i,t,e){let n=new Uo;const s=new nt,r=new nt,a=new ue,o=new gf({depthPacking:Ru}),c=new vf,l={},h=e.maxTextureSize,u={[Xn]:Pe,[Pe]:Xn,[dn]:dn},f=new qn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new nt},radius:{value:4}},vertexShader:q0,fragmentShader:Y0}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new Me;g.setAttribute("position",new ze(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Nt(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Pc;let p=this.type;this.render=function(T,P,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const E=i.getRenderTarget(),M=i.getActiveCubeFace(),L=i.getActiveMipmapLevel(),O=i.state;O.setBlending(Gn),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const k=p!==An&&this.type===An,q=p===An&&this.type!==An;for(let G=0,X=T.length;G<X;G++){const Z=T[G],V=Z.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);const dt=V.getFrameExtents();if(s.multiply(dt),r.copy(V.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/dt.x),s.x=r.x*dt.x,V.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/dt.y),s.y=r.y*dt.y,V.mapSize.y=r.y)),V.map===null||k===!0||q===!0){const St=this.type!==An?{minFilter:$e,magFilter:$e}:{};V.map!==null&&V.map.dispose(),V.map=new ci(s.x,s.y,St),V.map.texture.name=Z.name+".shadowMap",V.camera.updateProjectionMatrix()}i.setRenderTarget(V.map),i.clear();const xt=V.getViewportCount();for(let St=0;St<xt;St++){const Vt=V.getViewport(St);a.set(r.x*Vt.x,r.y*Vt.y,r.x*Vt.z,r.y*Vt.w),O.viewport(a),V.updateMatrices(Z,St),n=V.getFrustum(),x(P,I,V.camera,Z,this.type)}V.isPointLightShadow!==!0&&this.type===An&&S(V,I),V.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(E,M,L)};function S(T,P){const I=t.update(v);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,d.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new ci(s.x,s.y)),f.uniforms.shadow_pass.value=T.map.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(P,null,I,f,v,null),d.uniforms.shadow_pass.value=T.mapPass.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(P,null,I,d,v,null)}function b(T,P,I,E){let M=null;const L=I.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(L!==void 0)M=L;else if(M=I.isPointLight===!0?c:o,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const O=M.uuid,k=P.uuid;let q=l[O];q===void 0&&(q={},l[O]=q);let G=q[k];G===void 0&&(G=M.clone(),q[k]=G,P.addEventListener("dispose",A)),M=G}if(M.visible=P.visible,M.wireframe=P.wireframe,E===An?M.side=P.shadowSide!==null?P.shadowSide:P.side:M.side=P.shadowSide!==null?P.shadowSide:u[P.side],M.alphaMap=P.alphaMap,M.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,M.map=P.map,M.clipShadows=P.clipShadows,M.clippingPlanes=P.clippingPlanes,M.clipIntersection=P.clipIntersection,M.displacementMap=P.displacementMap,M.displacementScale=P.displacementScale,M.displacementBias=P.displacementBias,M.wireframeLinewidth=P.wireframeLinewidth,M.linewidth=P.linewidth,I.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const O=i.properties.get(M);O.light=I}return M}function x(T,P,I,E,M){if(T.visible===!1)return;if(T.layers.test(P.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&M===An)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,T.matrixWorld);const k=t.update(T),q=T.material;if(Array.isArray(q)){const G=k.groups;for(let X=0,Z=G.length;X<Z;X++){const V=G[X],dt=q[V.materialIndex];if(dt&&dt.visible){const xt=b(T,dt,E,M);T.onBeforeShadow(i,T,P,I,k,xt,V),i.renderBufferDirect(I,null,k,xt,T,V),T.onAfterShadow(i,T,P,I,k,xt,V)}}}else if(q.visible){const G=b(T,q,E,M);T.onBeforeShadow(i,T,P,I,k,G,null),i.renderBufferDirect(I,null,k,G,T,null),T.onAfterShadow(i,T,P,I,k,G,null)}}const O=T.children;for(let k=0,q=O.length;k<q;k++)x(O[k],P,I,E,M)}function A(T){T.target.removeEventListener("dispose",A);for(const I in l){const E=l[I],M=T.target.uuid;M in E&&(E[M].dispose(),delete E[M])}}}const j0={[Ea]:wa,[Ta]:Ra,[Aa]:Pa,[ki]:Ca,[wa]:Ea,[Ra]:Ta,[Pa]:Aa,[Ca]:ki};function K0(i,t){function e(){let D=!1;const ot=new ue;let ft=null;const bt=new ue(0,0,0,0);return{setMask:function(rt){ft!==rt&&!D&&(i.colorMask(rt,rt,rt,rt),ft=rt)},setLocked:function(rt){D=rt},setClear:function(rt,J,Pt,Gt,pe){pe===!0&&(rt*=Gt,J*=Gt,Pt*=Gt),ot.set(rt,J,Pt,Gt),bt.equals(ot)===!1&&(i.clearColor(rt,J,Pt,Gt),bt.copy(ot))},reset:function(){D=!1,ft=null,bt.set(-1,0,0,0)}}}function n(){let D=!1,ot=!1,ft=null,bt=null,rt=null;return{setReversed:function(J){if(ot!==J){const Pt=t.get("EXT_clip_control");J?Pt.clipControlEXT(Pt.LOWER_LEFT_EXT,Pt.ZERO_TO_ONE_EXT):Pt.clipControlEXT(Pt.LOWER_LEFT_EXT,Pt.NEGATIVE_ONE_TO_ONE_EXT),ot=J;const Gt=rt;rt=null,this.setClear(Gt)}},getReversed:function(){return ot},setTest:function(J){J?et(i.DEPTH_TEST):Mt(i.DEPTH_TEST)},setMask:function(J){ft!==J&&!D&&(i.depthMask(J),ft=J)},setFunc:function(J){if(ot&&(J=j0[J]),bt!==J){switch(J){case Ea:i.depthFunc(i.NEVER);break;case wa:i.depthFunc(i.ALWAYS);break;case Ta:i.depthFunc(i.LESS);break;case ki:i.depthFunc(i.LEQUAL);break;case Aa:i.depthFunc(i.EQUAL);break;case Ca:i.depthFunc(i.GEQUAL);break;case Ra:i.depthFunc(i.GREATER);break;case Pa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}bt=J}},setLocked:function(J){D=J},setClear:function(J){rt!==J&&(ot&&(J=1-J),i.clearDepth(J),rt=J)},reset:function(){D=!1,ft=null,bt=null,rt=null,ot=!1}}}function s(){let D=!1,ot=null,ft=null,bt=null,rt=null,J=null,Pt=null,Gt=null,pe=null;return{setTest:function(se){D||(se?et(i.STENCIL_TEST):Mt(i.STENCIL_TEST))},setMask:function(se){ot!==se&&!D&&(i.stencilMask(se),ot=se)},setFunc:function(se,yn,cn){(ft!==se||bt!==yn||rt!==cn)&&(i.stencilFunc(se,yn,cn),ft=se,bt=yn,rt=cn)},setOp:function(se,yn,cn){(J!==se||Pt!==yn||Gt!==cn)&&(i.stencilOp(se,yn,cn),J=se,Pt=yn,Gt=cn)},setLocked:function(se){D=se},setClear:function(se){pe!==se&&(i.clearStencil(se),pe=se)},reset:function(){D=!1,ot=null,ft=null,bt=null,rt=null,J=null,Pt=null,Gt=null,pe=null}}}const r=new e,a=new n,o=new s,c=new WeakMap,l=new WeakMap;let h={},u={},f=new WeakMap,d=[],g=null,v=!1,m=null,p=null,S=null,b=null,x=null,A=null,T=null,P=new qt(0,0,0),I=0,E=!1,M=null,L=null,O=null,k=null,q=null;const G=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,Z=0;const V=i.getParameter(i.VERSION);V.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(V)[1]),X=Z>=1):V.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),X=Z>=2);let dt=null,xt={};const St=i.getParameter(i.SCISSOR_BOX),Vt=i.getParameter(i.VIEWPORT),Jt=new ue().fromArray(St),re=new ue().fromArray(Vt);function Zt(D,ot,ft,bt){const rt=new Uint8Array(4),J=i.createTexture();i.bindTexture(D,J),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Pt=0;Pt<ft;Pt++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(ot,0,i.RGBA,1,1,bt,0,i.RGBA,i.UNSIGNED_BYTE,rt):i.texImage2D(ot+Pt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,rt);return J}const Y={};Y[i.TEXTURE_2D]=Zt(i.TEXTURE_2D,i.TEXTURE_2D,1),Y[i.TEXTURE_CUBE_MAP]=Zt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[i.TEXTURE_2D_ARRAY]=Zt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Y[i.TEXTURE_3D]=Zt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),et(i.DEPTH_TEST),a.setFunc(ki),j(!1),$(al),et(i.CULL_FACE),tt(Gn);function et(D){h[D]!==!0&&(i.enable(D),h[D]=!0)}function Mt(D){h[D]!==!1&&(i.disable(D),h[D]=!1)}function Dt(D,ot){return u[D]!==ot?(i.bindFramebuffer(D,ot),u[D]=ot,D===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ot),D===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ot),!0):!1}function At(D,ot){let ft=d,bt=!1;if(D){ft=f.get(ot),ft===void 0&&(ft=[],f.set(ot,ft));const rt=D.textures;if(ft.length!==rt.length||ft[0]!==i.COLOR_ATTACHMENT0){for(let J=0,Pt=rt.length;J<Pt;J++)ft[J]=i.COLOR_ATTACHMENT0+J;ft.length=rt.length,bt=!0}}else ft[0]!==i.BACK&&(ft[0]=i.BACK,bt=!0);bt&&i.drawBuffers(ft)}function jt(D){return g!==D?(i.useProgram(D),g=D,!0):!1}const fe={[ii]:i.FUNC_ADD,[nu]:i.FUNC_SUBTRACT,[iu]:i.FUNC_REVERSE_SUBTRACT};fe[su]=i.MIN,fe[ru]=i.MAX;const R={[au]:i.ZERO,[ou]:i.ONE,[lu]:i.SRC_COLOR,[Sa]:i.SRC_ALPHA,[pu]:i.SRC_ALPHA_SATURATE,[du]:i.DST_COLOR,[hu]:i.DST_ALPHA,[cu]:i.ONE_MINUS_SRC_COLOR,[ba]:i.ONE_MINUS_SRC_ALPHA,[fu]:i.ONE_MINUS_DST_COLOR,[uu]:i.ONE_MINUS_DST_ALPHA,[mu]:i.CONSTANT_COLOR,[gu]:i.ONE_MINUS_CONSTANT_COLOR,[vu]:i.CONSTANT_ALPHA,[_u]:i.ONE_MINUS_CONSTANT_ALPHA};function tt(D,ot,ft,bt,rt,J,Pt,Gt,pe,se){if(D===Gn){v===!0&&(Mt(i.BLEND),v=!1);return}if(v===!1&&(et(i.BLEND),v=!0),D!==eu){if(D!==m||se!==E){if((p!==ii||x!==ii)&&(i.blendEquation(i.FUNC_ADD),p=ii,x=ii),se)switch(D){case Oi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ma:i.blendFunc(i.ONE,i.ONE);break;case ol:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ll:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Oi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ma:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case ol:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ll:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}S=null,b=null,A=null,T=null,P.set(0,0,0),I=0,m=D,E=se}return}rt=rt||ot,J=J||ft,Pt=Pt||bt,(ot!==p||rt!==x)&&(i.blendEquationSeparate(fe[ot],fe[rt]),p=ot,x=rt),(ft!==S||bt!==b||J!==A||Pt!==T)&&(i.blendFuncSeparate(R[ft],R[bt],R[J],R[Pt]),S=ft,b=bt,A=J,T=Pt),(Gt.equals(P)===!1||pe!==I)&&(i.blendColor(Gt.r,Gt.g,Gt.b,pe),P.copy(Gt),I=pe),m=D,E=!1}function K(D,ot){D.side===dn?Mt(i.CULL_FACE):et(i.CULL_FACE);let ft=D.side===Pe;ot&&(ft=!ft),j(ft),D.blending===Oi&&D.transparent===!1?tt(Gn):tt(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);const bt=D.stencilWrite;o.setTest(bt),bt&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),it(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?et(i.SAMPLE_ALPHA_TO_COVERAGE):Mt(i.SAMPLE_ALPHA_TO_COVERAGE)}function j(D){M!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),M=D)}function $(D){D!==Qh?(et(i.CULL_FACE),D!==L&&(D===al?i.cullFace(i.BACK):D===tu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Mt(i.CULL_FACE),L=D}function ht(D){D!==O&&(X&&i.lineWidth(D),O=D)}function it(D,ot,ft){D?(et(i.POLYGON_OFFSET_FILL),(k!==ot||q!==ft)&&(i.polygonOffset(ot,ft),k=ot,q=ft)):Mt(i.POLYGON_OFFSET_FILL)}function ut(D){D?et(i.SCISSOR_TEST):Mt(i.SCISSOR_TEST)}function Ht(D){D===void 0&&(D=i.TEXTURE0+G-1),dt!==D&&(i.activeTexture(D),dt=D)}function kt(D,ot,ft){ft===void 0&&(dt===null?ft=i.TEXTURE0+G-1:ft=dt);let bt=xt[ft];bt===void 0&&(bt={type:void 0,texture:void 0},xt[ft]=bt),(bt.type!==D||bt.texture!==ot)&&(dt!==ft&&(i.activeTexture(ft),dt=ft),i.bindTexture(D,ot||Y[D]),bt.type=D,bt.texture=ot)}function w(){const D=xt[dt];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function _(){try{i.compressedTexImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function F(){try{i.compressedTexImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function H(){try{i.texSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Q(){try{i.texSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function W(){try{i.compressedTexSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Lt(){try{i.compressedTexSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ct(){try{i.texStorage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ct(){try{i.texStorage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Rt(){try{i.texImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function st(){try{i.texImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function _t(D){Jt.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),Jt.copy(D))}function Bt(D){re.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),re.copy(D))}function It(D,ot){let ft=l.get(ot);ft===void 0&&(ft=new WeakMap,l.set(ot,ft));let bt=ft.get(D);bt===void 0&&(bt=i.getUniformBlockIndex(ot,D.name),ft.set(D,bt))}function gt(D,ot){const bt=l.get(ot).get(D);c.get(ot)!==bt&&(i.uniformBlockBinding(ot,bt,D.__bindingPointIndex),c.set(ot,bt))}function Wt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},dt=null,xt={},u={},f=new WeakMap,d=[],g=null,v=!1,m=null,p=null,S=null,b=null,x=null,A=null,T=null,P=new qt(0,0,0),I=0,E=!1,M=null,L=null,O=null,k=null,q=null,Jt.set(0,0,i.canvas.width,i.canvas.height),re.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:et,disable:Mt,bindFramebuffer:Dt,drawBuffers:At,useProgram:jt,setBlending:tt,setMaterial:K,setFlipSided:j,setCullFace:$,setLineWidth:ht,setPolygonOffset:it,setScissorTest:ut,activeTexture:Ht,bindTexture:kt,unbindTexture:w,compressedTexImage2D:_,compressedTexImage3D:F,texImage2D:Rt,texImage3D:st,updateUBOMapping:It,uniformBlockBinding:gt,texStorage2D:ct,texStorage3D:Ct,texSubImage2D:H,texSubImage3D:Q,compressedTexSubImage2D:W,compressedTexSubImage3D:Lt,scissor:_t,viewport:Bt,reset:Wt}}function J0(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new nt,h=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,_){return d?new OffscreenCanvas(w,_):Er("canvas")}function v(w,_,F){let H=1;const Q=kt(w);if((Q.width>F||Q.height>F)&&(H=F/Math.max(Q.width,Q.height)),H<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const W=Math.floor(H*Q.width),Lt=Math.floor(H*Q.height);u===void 0&&(u=g(W,Lt));const ct=_?g(W,Lt):u;return ct.width=W,ct.height=Lt,ct.getContext("2d").drawImage(w,0,0,W,Lt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+W+"x"+Lt+")."),ct}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),w;return w}function m(w){return w.generateMipmaps}function p(w){i.generateMipmap(w)}function S(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(w,_,F,H,Q=!1){if(w!==null){if(i[w]!==void 0)return i[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let W=_;if(_===i.RED&&(F===i.FLOAT&&(W=i.R32F),F===i.HALF_FLOAT&&(W=i.R16F),F===i.UNSIGNED_BYTE&&(W=i.R8)),_===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(W=i.R8UI),F===i.UNSIGNED_SHORT&&(W=i.R16UI),F===i.UNSIGNED_INT&&(W=i.R32UI),F===i.BYTE&&(W=i.R8I),F===i.SHORT&&(W=i.R16I),F===i.INT&&(W=i.R32I)),_===i.RG&&(F===i.FLOAT&&(W=i.RG32F),F===i.HALF_FLOAT&&(W=i.RG16F),F===i.UNSIGNED_BYTE&&(W=i.RG8)),_===i.RG_INTEGER&&(F===i.UNSIGNED_BYTE&&(W=i.RG8UI),F===i.UNSIGNED_SHORT&&(W=i.RG16UI),F===i.UNSIGNED_INT&&(W=i.RG32UI),F===i.BYTE&&(W=i.RG8I),F===i.SHORT&&(W=i.RG16I),F===i.INT&&(W=i.RG32I)),_===i.RGB_INTEGER&&(F===i.UNSIGNED_BYTE&&(W=i.RGB8UI),F===i.UNSIGNED_SHORT&&(W=i.RGB16UI),F===i.UNSIGNED_INT&&(W=i.RGB32UI),F===i.BYTE&&(W=i.RGB8I),F===i.SHORT&&(W=i.RGB16I),F===i.INT&&(W=i.RGB32I)),_===i.RGBA_INTEGER&&(F===i.UNSIGNED_BYTE&&(W=i.RGBA8UI),F===i.UNSIGNED_SHORT&&(W=i.RGBA16UI),F===i.UNSIGNED_INT&&(W=i.RGBA32UI),F===i.BYTE&&(W=i.RGBA8I),F===i.SHORT&&(W=i.RGBA16I),F===i.INT&&(W=i.RGBA32I)),_===i.RGB&&(F===i.UNSIGNED_INT_5_9_9_9_REV&&(W=i.RGB9_E5),F===i.UNSIGNED_INT_10F_11F_11F_REV&&(W=i.R11F_G11F_B10F)),_===i.RGBA){const Lt=Q?Sr:ee.getTransfer(H);F===i.FLOAT&&(W=i.RGBA32F),F===i.HALF_FLOAT&&(W=i.RGBA16F),F===i.UNSIGNED_BYTE&&(W=Lt===ce?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&(W=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(W=i.RGB5_A1)}return(W===i.R16F||W===i.R32F||W===i.RG16F||W===i.RG32F||W===i.RGBA16F||W===i.RGBA32F)&&t.get("EXT_color_buffer_float"),W}function x(w,_){let F;return w?_===null||_===li||_===bs?F=i.DEPTH24_STENCIL8:_===pn?F=i.DEPTH32F_STENCIL8:_===Ss&&(F=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===li||_===bs?F=i.DEPTH_COMPONENT24:_===pn?F=i.DEPTH_COMPONENT32F:_===Ss&&(F=i.DEPTH_COMPONENT16),F}function A(w,_){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==$e&&w.minFilter!==fn?Math.log2(Math.max(_.width,_.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?_.mipmaps.length:1}function T(w){const _=w.target;_.removeEventListener("dispose",T),I(_),_.isVideoTexture&&h.delete(_)}function P(w){const _=w.target;_.removeEventListener("dispose",P),M(_)}function I(w){const _=n.get(w);if(_.__webglInit===void 0)return;const F=w.source,H=f.get(F);if(H){const Q=H[_.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&E(w),Object.keys(H).length===0&&f.delete(F)}n.remove(w)}function E(w){const _=n.get(w);i.deleteTexture(_.__webglTexture);const F=w.source,H=f.get(F);delete H[_.__cacheKey],a.memory.textures--}function M(w){const _=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let H=0;H<6;H++){if(Array.isArray(_.__webglFramebuffer[H]))for(let Q=0;Q<_.__webglFramebuffer[H].length;Q++)i.deleteFramebuffer(_.__webglFramebuffer[H][Q]);else i.deleteFramebuffer(_.__webglFramebuffer[H]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[H])}else{if(Array.isArray(_.__webglFramebuffer))for(let H=0;H<_.__webglFramebuffer.length;H++)i.deleteFramebuffer(_.__webglFramebuffer[H]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let H=0;H<_.__webglColorRenderbuffer.length;H++)_.__webglColorRenderbuffer[H]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[H]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const F=w.textures;for(let H=0,Q=F.length;H<Q;H++){const W=n.get(F[H]);W.__webglTexture&&(i.deleteTexture(W.__webglTexture),a.memory.textures--),n.remove(F[H])}n.remove(w)}let L=0;function O(){L=0}function k(){const w=L;return w>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),L+=1,w}function q(w){const _=[];return _.push(w.wrapS),_.push(w.wrapT),_.push(w.wrapR||0),_.push(w.magFilter),_.push(w.minFilter),_.push(w.anisotropy),_.push(w.internalFormat),_.push(w.format),_.push(w.type),_.push(w.generateMipmaps),_.push(w.premultiplyAlpha),_.push(w.flipY),_.push(w.unpackAlignment),_.push(w.colorSpace),_.join()}function G(w,_){const F=n.get(w);if(w.isVideoTexture&&ut(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&F.__version!==w.version){const H=w.image;if(H===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(H.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(F,w,_);return}}else w.isExternalTexture&&(F.__webglTexture=w.sourceTexture?w.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+_)}function X(w,_){const F=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&F.__version!==w.version){Y(F,w,_);return}e.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+_)}function Z(w,_){const F=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&F.__version!==w.version){Y(F,w,_);return}e.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+_)}function V(w,_){const F=n.get(w);if(w.version>0&&F.__version!==w.version){et(F,w,_);return}e.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+_)}const dt={[Mr]:i.REPEAT,[ri]:i.CLAMP_TO_EDGE,[Da]:i.MIRRORED_REPEAT},xt={[$e]:i.NEAREST,[Au]:i.NEAREST_MIPMAP_NEAREST,[Os]:i.NEAREST_MIPMAP_LINEAR,[fn]:i.LINEAR,[Br]:i.LINEAR_MIPMAP_NEAREST,[ai]:i.LINEAR_MIPMAP_LINEAR},St={[Lu]:i.NEVER,[Ou]:i.ALWAYS,[Iu]:i.LESS,[Hc]:i.LEQUAL,[Du]:i.EQUAL,[Fu]:i.GEQUAL,[Nu]:i.GREATER,[Uu]:i.NOTEQUAL};function Vt(w,_){if(_.type===pn&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===fn||_.magFilter===Br||_.magFilter===Os||_.magFilter===ai||_.minFilter===fn||_.minFilter===Br||_.minFilter===Os||_.minFilter===ai)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,dt[_.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,dt[_.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,dt[_.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,xt[_.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,xt[_.minFilter]),_.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,St[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===$e||_.minFilter!==Os&&_.minFilter!==ai||_.type===pn&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const F=t.get("EXT_texture_filter_anisotropic");i.texParameterf(w,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function Jt(w,_){let F=!1;w.__webglInit===void 0&&(w.__webglInit=!0,_.addEventListener("dispose",T));const H=_.source;let Q=f.get(H);Q===void 0&&(Q={},f.set(H,Q));const W=q(_);if(W!==w.__cacheKey){Q[W]===void 0&&(Q[W]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,F=!0),Q[W].usedTimes++;const Lt=Q[w.__cacheKey];Lt!==void 0&&(Q[w.__cacheKey].usedTimes--,Lt.usedTimes===0&&E(_)),w.__cacheKey=W,w.__webglTexture=Q[W].texture}return F}function re(w,_,F){return Math.floor(Math.floor(w/F)/_)}function Zt(w,_,F,H){const W=w.updateRanges;if(W.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,F,H,_.data);else{W.sort((st,_t)=>st.start-_t.start);let Lt=0;for(let st=1;st<W.length;st++){const _t=W[Lt],Bt=W[st],It=_t.start+_t.count,gt=re(Bt.start,_.width,4),Wt=re(_t.start,_.width,4);Bt.start<=It+1&&gt===Wt&&re(Bt.start+Bt.count-1,_.width,4)===gt?_t.count=Math.max(_t.count,Bt.start+Bt.count-_t.start):(++Lt,W[Lt]=Bt)}W.length=Lt+1;const ct=i.getParameter(i.UNPACK_ROW_LENGTH),Ct=i.getParameter(i.UNPACK_SKIP_PIXELS),Rt=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let st=0,_t=W.length;st<_t;st++){const Bt=W[st],It=Math.floor(Bt.start/4),gt=Math.ceil(Bt.count/4),Wt=It%_.width,D=Math.floor(It/_.width),ot=gt,ft=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Wt),i.pixelStorei(i.UNPACK_SKIP_ROWS,D),e.texSubImage2D(i.TEXTURE_2D,0,Wt,D,ot,ft,F,H,_.data)}w.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ct),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ct),i.pixelStorei(i.UNPACK_SKIP_ROWS,Rt)}}function Y(w,_,F){let H=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(H=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(H=i.TEXTURE_3D);const Q=Jt(w,_),W=_.source;e.bindTexture(H,w.__webglTexture,i.TEXTURE0+F);const Lt=n.get(W);if(W.version!==Lt.__version||Q===!0){e.activeTexture(i.TEXTURE0+F);const ct=ee.getPrimaries(ee.workingColorSpace),Ct=_.colorSpace===Hn?null:ee.getPrimaries(_.colorSpace),Rt=_.colorSpace===Hn||ct===Ct?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Rt);let st=v(_.image,!1,s.maxTextureSize);st=Ht(_,st);const _t=r.convert(_.format,_.colorSpace),Bt=r.convert(_.type);let It=b(_.internalFormat,_t,Bt,_.colorSpace,_.isVideoTexture);Vt(H,_);let gt;const Wt=_.mipmaps,D=_.isVideoTexture!==!0,ot=Lt.__version===void 0||Q===!0,ft=W.dataReady,bt=A(_,st);if(_.isDepthTexture)It=x(_.format===ws,_.type),ot&&(D?e.texStorage2D(i.TEXTURE_2D,1,It,st.width,st.height):e.texImage2D(i.TEXTURE_2D,0,It,st.width,st.height,0,_t,Bt,null));else if(_.isDataTexture)if(Wt.length>0){D&&ot&&e.texStorage2D(i.TEXTURE_2D,bt,It,Wt[0].width,Wt[0].height);for(let rt=0,J=Wt.length;rt<J;rt++)gt=Wt[rt],D?ft&&e.texSubImage2D(i.TEXTURE_2D,rt,0,0,gt.width,gt.height,_t,Bt,gt.data):e.texImage2D(i.TEXTURE_2D,rt,It,gt.width,gt.height,0,_t,Bt,gt.data);_.generateMipmaps=!1}else D?(ot&&e.texStorage2D(i.TEXTURE_2D,bt,It,st.width,st.height),ft&&Zt(_,st,_t,Bt)):e.texImage2D(i.TEXTURE_2D,0,It,st.width,st.height,0,_t,Bt,st.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){D&&ot&&e.texStorage3D(i.TEXTURE_2D_ARRAY,bt,It,Wt[0].width,Wt[0].height,st.depth);for(let rt=0,J=Wt.length;rt<J;rt++)if(gt=Wt[rt],_.format!==on)if(_t!==null)if(D){if(ft)if(_.layerUpdates.size>0){const Pt=$l(gt.width,gt.height,_.format,_.type);for(const Gt of _.layerUpdates){const pe=gt.data.subarray(Gt*Pt/gt.data.BYTES_PER_ELEMENT,(Gt+1)*Pt/gt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,rt,0,0,Gt,gt.width,gt.height,1,_t,pe)}_.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,rt,0,0,0,gt.width,gt.height,st.depth,_t,gt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,rt,It,gt.width,gt.height,st.depth,0,gt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?ft&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,rt,0,0,0,gt.width,gt.height,st.depth,_t,Bt,gt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,rt,It,gt.width,gt.height,st.depth,0,_t,Bt,gt.data)}else{D&&ot&&e.texStorage2D(i.TEXTURE_2D,bt,It,Wt[0].width,Wt[0].height);for(let rt=0,J=Wt.length;rt<J;rt++)gt=Wt[rt],_.format!==on?_t!==null?D?ft&&e.compressedTexSubImage2D(i.TEXTURE_2D,rt,0,0,gt.width,gt.height,_t,gt.data):e.compressedTexImage2D(i.TEXTURE_2D,rt,It,gt.width,gt.height,0,gt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?ft&&e.texSubImage2D(i.TEXTURE_2D,rt,0,0,gt.width,gt.height,_t,Bt,gt.data):e.texImage2D(i.TEXTURE_2D,rt,It,gt.width,gt.height,0,_t,Bt,gt.data)}else if(_.isDataArrayTexture)if(D){if(ot&&e.texStorage3D(i.TEXTURE_2D_ARRAY,bt,It,st.width,st.height,st.depth),ft)if(_.layerUpdates.size>0){const rt=$l(st.width,st.height,_.format,_.type);for(const J of _.layerUpdates){const Pt=st.data.subarray(J*rt/st.data.BYTES_PER_ELEMENT,(J+1)*rt/st.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,J,st.width,st.height,1,_t,Bt,Pt)}_.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,st.width,st.height,st.depth,_t,Bt,st.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,It,st.width,st.height,st.depth,0,_t,Bt,st.data);else if(_.isData3DTexture)D?(ot&&e.texStorage3D(i.TEXTURE_3D,bt,It,st.width,st.height,st.depth),ft&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,st.width,st.height,st.depth,_t,Bt,st.data)):e.texImage3D(i.TEXTURE_3D,0,It,st.width,st.height,st.depth,0,_t,Bt,st.data);else if(_.isFramebufferTexture){if(ot)if(D)e.texStorage2D(i.TEXTURE_2D,bt,It,st.width,st.height);else{let rt=st.width,J=st.height;for(let Pt=0;Pt<bt;Pt++)e.texImage2D(i.TEXTURE_2D,Pt,It,rt,J,0,_t,Bt,null),rt>>=1,J>>=1}}else if(Wt.length>0){if(D&&ot){const rt=kt(Wt[0]);e.texStorage2D(i.TEXTURE_2D,bt,It,rt.width,rt.height)}for(let rt=0,J=Wt.length;rt<J;rt++)gt=Wt[rt],D?ft&&e.texSubImage2D(i.TEXTURE_2D,rt,0,0,_t,Bt,gt):e.texImage2D(i.TEXTURE_2D,rt,It,_t,Bt,gt);_.generateMipmaps=!1}else if(D){if(ot){const rt=kt(st);e.texStorage2D(i.TEXTURE_2D,bt,It,rt.width,rt.height)}ft&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,_t,Bt,st)}else e.texImage2D(i.TEXTURE_2D,0,It,_t,Bt,st);m(_)&&p(H),Lt.__version=W.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function et(w,_,F){if(_.image.length!==6)return;const H=Jt(w,_),Q=_.source;e.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+F);const W=n.get(Q);if(Q.version!==W.__version||H===!0){e.activeTexture(i.TEXTURE0+F);const Lt=ee.getPrimaries(ee.workingColorSpace),ct=_.colorSpace===Hn?null:ee.getPrimaries(_.colorSpace),Ct=_.colorSpace===Hn||Lt===ct?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ct);const Rt=_.isCompressedTexture||_.image[0].isCompressedTexture,st=_.image[0]&&_.image[0].isDataTexture,_t=[];for(let J=0;J<6;J++)!Rt&&!st?_t[J]=v(_.image[J],!0,s.maxCubemapSize):_t[J]=st?_.image[J].image:_.image[J],_t[J]=Ht(_,_t[J]);const Bt=_t[0],It=r.convert(_.format,_.colorSpace),gt=r.convert(_.type),Wt=b(_.internalFormat,It,gt,_.colorSpace),D=_.isVideoTexture!==!0,ot=W.__version===void 0||H===!0,ft=Q.dataReady;let bt=A(_,Bt);Vt(i.TEXTURE_CUBE_MAP,_);let rt;if(Rt){D&&ot&&e.texStorage2D(i.TEXTURE_CUBE_MAP,bt,Wt,Bt.width,Bt.height);for(let J=0;J<6;J++){rt=_t[J].mipmaps;for(let Pt=0;Pt<rt.length;Pt++){const Gt=rt[Pt];_.format!==on?It!==null?D?ft&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Pt,0,0,Gt.width,Gt.height,It,Gt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Pt,Wt,Gt.width,Gt.height,0,Gt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?ft&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Pt,0,0,Gt.width,Gt.height,It,gt,Gt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Pt,Wt,Gt.width,Gt.height,0,It,gt,Gt.data)}}}else{if(rt=_.mipmaps,D&&ot){rt.length>0&&bt++;const J=kt(_t[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,bt,Wt,J.width,J.height)}for(let J=0;J<6;J++)if(st){D?ft&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,_t[J].width,_t[J].height,It,gt,_t[J].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Wt,_t[J].width,_t[J].height,0,It,gt,_t[J].data);for(let Pt=0;Pt<rt.length;Pt++){const pe=rt[Pt].image[J].image;D?ft&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Pt+1,0,0,pe.width,pe.height,It,gt,pe.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Pt+1,Wt,pe.width,pe.height,0,It,gt,pe.data)}}else{D?ft&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,It,gt,_t[J]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Wt,It,gt,_t[J]);for(let Pt=0;Pt<rt.length;Pt++){const Gt=rt[Pt];D?ft&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Pt+1,0,0,It,gt,Gt.image[J]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Pt+1,Wt,It,gt,Gt.image[J])}}}m(_)&&p(i.TEXTURE_CUBE_MAP),W.__version=Q.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function Mt(w,_,F,H,Q,W){const Lt=r.convert(F.format,F.colorSpace),ct=r.convert(F.type),Ct=b(F.internalFormat,Lt,ct,F.colorSpace),Rt=n.get(_),st=n.get(F);if(st.__renderTarget=_,!Rt.__hasExternalTextures){const _t=Math.max(1,_.width>>W),Bt=Math.max(1,_.height>>W);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?e.texImage3D(Q,W,Ct,_t,Bt,_.depth,0,Lt,ct,null):e.texImage2D(Q,W,Ct,_t,Bt,0,Lt,ct,null)}e.bindFramebuffer(i.FRAMEBUFFER,w),it(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,H,Q,st.__webglTexture,0,ht(_)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,H,Q,st.__webglTexture,W),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Dt(w,_,F){if(i.bindRenderbuffer(i.RENDERBUFFER,w),_.depthBuffer){const H=_.depthTexture,Q=H&&H.isDepthTexture?H.type:null,W=x(_.stencilBuffer,Q),Lt=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ct=ht(_);it(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ct,W,_.width,_.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,ct,W,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,W,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Lt,i.RENDERBUFFER,w)}else{const H=_.textures;for(let Q=0;Q<H.length;Q++){const W=H[Q],Lt=r.convert(W.format,W.colorSpace),ct=r.convert(W.type),Ct=b(W.internalFormat,Lt,ct,W.colorSpace),Rt=ht(_);F&&it(_)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Rt,Ct,_.width,_.height):it(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Rt,Ct,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,Ct,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function At(w,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,w),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const H=n.get(_.depthTexture);H.__renderTarget=_,(!H.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),G(_.depthTexture,0);const Q=H.__webglTexture,W=ht(_);if(_.depthTexture.format===Es)it(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0,W):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0);else if(_.depthTexture.format===ws)it(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0,W):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function jt(w){const _=n.get(w),F=w.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==w.depthTexture){const H=w.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),H){const Q=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,H.removeEventListener("dispose",Q)};H.addEventListener("dispose",Q),_.__depthDisposeCallback=Q}_.__boundDepthTexture=H}if(w.depthTexture&&!_.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");const H=w.texture.mipmaps;H&&H.length>0?At(_.__webglFramebuffer[0],w):At(_.__webglFramebuffer,w)}else if(F){_.__webglDepthbuffer=[];for(let H=0;H<6;H++)if(e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[H]),_.__webglDepthbuffer[H]===void 0)_.__webglDepthbuffer[H]=i.createRenderbuffer(),Dt(_.__webglDepthbuffer[H],w,!1);else{const Q=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,W=_.__webglDepthbuffer[H];i.bindRenderbuffer(i.RENDERBUFFER,W),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,W)}}else{const H=w.texture.mipmaps;if(H&&H.length>0?e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),Dt(_.__webglDepthbuffer,w,!1);else{const Q=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,W=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,W),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,W)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function fe(w,_,F){const H=n.get(w);_!==void 0&&Mt(H.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&jt(w)}function R(w){const _=w.texture,F=n.get(w),H=n.get(_);w.addEventListener("dispose",P);const Q=w.textures,W=w.isWebGLCubeRenderTarget===!0,Lt=Q.length>1;if(Lt||(H.__webglTexture===void 0&&(H.__webglTexture=i.createTexture()),H.__version=_.version,a.memory.textures++),W){F.__webglFramebuffer=[];for(let ct=0;ct<6;ct++)if(_.mipmaps&&_.mipmaps.length>0){F.__webglFramebuffer[ct]=[];for(let Ct=0;Ct<_.mipmaps.length;Ct++)F.__webglFramebuffer[ct][Ct]=i.createFramebuffer()}else F.__webglFramebuffer[ct]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){F.__webglFramebuffer=[];for(let ct=0;ct<_.mipmaps.length;ct++)F.__webglFramebuffer[ct]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(Lt)for(let ct=0,Ct=Q.length;ct<Ct;ct++){const Rt=n.get(Q[ct]);Rt.__webglTexture===void 0&&(Rt.__webglTexture=i.createTexture(),a.memory.textures++)}if(w.samples>0&&it(w)===!1){F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let ct=0;ct<Q.length;ct++){const Ct=Q[ct];F.__webglColorRenderbuffer[ct]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[ct]);const Rt=r.convert(Ct.format,Ct.colorSpace),st=r.convert(Ct.type),_t=b(Ct.internalFormat,Rt,st,Ct.colorSpace,w.isXRRenderTarget===!0),Bt=ht(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,Bt,_t,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ct,i.RENDERBUFFER,F.__webglColorRenderbuffer[ct])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),Dt(F.__webglDepthRenderbuffer,w,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(W){e.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture),Vt(i.TEXTURE_CUBE_MAP,_);for(let ct=0;ct<6;ct++)if(_.mipmaps&&_.mipmaps.length>0)for(let Ct=0;Ct<_.mipmaps.length;Ct++)Mt(F.__webglFramebuffer[ct][Ct],w,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,Ct);else Mt(F.__webglFramebuffer[ct],w,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0);m(_)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Lt){for(let ct=0,Ct=Q.length;ct<Ct;ct++){const Rt=Q[ct],st=n.get(Rt);let _t=i.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(_t=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(_t,st.__webglTexture),Vt(_t,Rt),Mt(F.__webglFramebuffer,w,Rt,i.COLOR_ATTACHMENT0+ct,_t,0),m(Rt)&&p(_t)}e.unbindTexture()}else{let ct=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ct=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ct,H.__webglTexture),Vt(ct,_),_.mipmaps&&_.mipmaps.length>0)for(let Ct=0;Ct<_.mipmaps.length;Ct++)Mt(F.__webglFramebuffer[Ct],w,_,i.COLOR_ATTACHMENT0,ct,Ct);else Mt(F.__webglFramebuffer,w,_,i.COLOR_ATTACHMENT0,ct,0);m(_)&&p(ct),e.unbindTexture()}w.depthBuffer&&jt(w)}function tt(w){const _=w.textures;for(let F=0,H=_.length;F<H;F++){const Q=_[F];if(m(Q)){const W=S(w),Lt=n.get(Q).__webglTexture;e.bindTexture(W,Lt),p(W),e.unbindTexture()}}}const K=[],j=[];function $(w){if(w.samples>0){if(it(w)===!1){const _=w.textures,F=w.width,H=w.height;let Q=i.COLOR_BUFFER_BIT;const W=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Lt=n.get(w),ct=_.length>1;if(ct)for(let Rt=0;Rt<_.length;Rt++)e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Rt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Rt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer);const Ct=w.texture.mipmaps;Ct&&Ct.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Lt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Lt.__webglFramebuffer);for(let Rt=0;Rt<_.length;Rt++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),ct){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Lt.__webglColorRenderbuffer[Rt]);const st=n.get(_[Rt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,st,0)}i.blitFramebuffer(0,0,F,H,0,0,F,H,Q,i.NEAREST),c===!0&&(K.length=0,j.length=0,K.push(i.COLOR_ATTACHMENT0+Rt),w.depthBuffer&&w.resolveDepthBuffer===!1&&(K.push(W),j.push(W),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,j)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,K))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ct)for(let Rt=0;Rt<_.length;Rt++){e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Rt,i.RENDERBUFFER,Lt.__webglColorRenderbuffer[Rt]);const st=n.get(_[Rt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Rt,i.TEXTURE_2D,st,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&c){const _=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function ht(w){return Math.min(s.maxSamples,w.samples)}function it(w){const _=n.get(w);return w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function ut(w){const _=a.render.frame;h.get(w)!==_&&(h.set(w,_),w.update())}function Ht(w,_){const F=w.colorSpace,H=w.format,Q=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||F!==Vi&&F!==Hn&&(ee.getTransfer(F)===ce?(H!==on||Q!==vn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),_}function kt(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(l.width=w.naturalWidth||w.width,l.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(l.width=w.displayWidth,l.height=w.displayHeight):(l.width=w.width,l.height=w.height),l}this.allocateTextureUnit=k,this.resetTextureUnits=O,this.setTexture2D=G,this.setTexture2DArray=X,this.setTexture3D=Z,this.setTextureCube=V,this.rebindTextures=fe,this.setupRenderTarget=R,this.updateRenderTargetMipmap=tt,this.updateMultisampleRenderTarget=$,this.setupDepthRenderbuffer=jt,this.setupFrameBufferTexture=Mt,this.useMultisampledRTT=it}function Z0(i,t){function e(n,s=Hn){let r;const a=ee.getTransfer(s);if(n===vn)return i.UNSIGNED_BYTE;if(n===bo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Eo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Fc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Oc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Nc)return i.BYTE;if(n===Uc)return i.SHORT;if(n===Ss)return i.UNSIGNED_SHORT;if(n===So)return i.INT;if(n===li)return i.UNSIGNED_INT;if(n===pn)return i.FLOAT;if(n===Ls)return i.HALF_FLOAT;if(n===Bc)return i.ALPHA;if(n===zc)return i.RGB;if(n===on)return i.RGBA;if(n===Es)return i.DEPTH_COMPONENT;if(n===ws)return i.DEPTH_STENCIL;if(n===wo)return i.RED;if(n===To)return i.RED_INTEGER;if(n===kc)return i.RG;if(n===Ao)return i.RG_INTEGER;if(n===Co)return i.RGBA_INTEGER;if(n===mr||n===gr||n===vr||n===_r)if(a===ce)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===mr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===gr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===vr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===_r)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===mr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===gr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===vr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===_r)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Na||n===Ua||n===Fa||n===Oa)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Na)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ua)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Fa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Oa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ba||n===za||n===ka)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ba||n===za)return a===ce?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ka)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ha||n===Ga||n===Va||n===Wa||n===Xa||n===qa||n===Ya||n===$a||n===ja||n===Ka||n===Ja||n===Za||n===Qa||n===to)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ha)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ga)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Va)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Wa)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Xa)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===qa)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ya)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===$a)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ja)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ka)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ja)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Za)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Qa)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===to)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===eo||n===no||n===io)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===eo)return a===ce?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===no)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===io)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===so||n===ro||n===ao||n===oo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===so)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ro)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ao)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===oo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===bs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const Q0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,tv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class ev{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new th(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new qn({vertexShader:Q0,fragmentShader:tv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Nt(new Ge(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class nv extends Yi{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,f=null,d=null,g=null;const v=typeof XRWebGLBinding<"u",m=new ev,p={},S=e.getContextAttributes();let b=null,x=null;const A=[],T=[],P=new nt;let I=null;const E=new Ye;E.viewport=new ue;const M=new Ye;M.viewport=new ue;const L=[E,M],O=new Sf;let k=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let et=A[Y];return et===void 0&&(et=new ra,A[Y]=et),et.getTargetRaySpace()},this.getControllerGrip=function(Y){let et=A[Y];return et===void 0&&(et=new ra,A[Y]=et),et.getGripSpace()},this.getHand=function(Y){let et=A[Y];return et===void 0&&(et=new ra,A[Y]=et),et.getHandSpace()};function G(Y){const et=T.indexOf(Y.inputSource);if(et===-1)return;const Mt=A[et];Mt!==void 0&&(Mt.update(Y.inputSource,Y.frame,l||a),Mt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function X(){s.removeEventListener("select",G),s.removeEventListener("selectstart",G),s.removeEventListener("selectend",G),s.removeEventListener("squeeze",G),s.removeEventListener("squeezestart",G),s.removeEventListener("squeezeend",G),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",Z);for(let Y=0;Y<A.length;Y++){const et=T[Y];et!==null&&(T[Y]=null,A[Y].disconnect(et))}k=null,q=null,m.reset();for(const Y in p)delete p[Y];t.setRenderTarget(b),d=null,f=null,u=null,s=null,x=null,Zt.stop(),n.isPresenting=!1,t.setPixelRatio(I),t.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(b=t.getRenderTarget(),s.addEventListener("select",G),s.addEventListener("selectstart",G),s.addEventListener("selectend",G),s.addEventListener("squeeze",G),s.addEventListener("squeezestart",G),s.addEventListener("squeezeend",G),s.addEventListener("end",X),s.addEventListener("inputsourceschange",Z),S.xrCompatible!==!0&&await e.makeXRCompatible(),I=t.getPixelRatio(),t.getSize(P),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let Mt=null,Dt=null,At=null;S.depth&&(At=S.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Mt=S.stencil?ws:Es,Dt=S.stencil?bs:li);const jt={colorFormat:e.RGBA8,depthFormat:At,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(jt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),x=new ci(f.textureWidth,f.textureHeight,{format:on,type:vn,depthTexture:new Qc(f.textureWidth,f.textureHeight,Dt,void 0,void 0,void 0,void 0,void 0,void 0,Mt),stencilBuffer:S.stencil,colorSpace:t.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const Mt={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,Mt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),x=new ci(d.framebufferWidth,d.framebufferHeight,{format:on,type:vn,colorSpace:t.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Zt.setContext(s),Zt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function Z(Y){for(let et=0;et<Y.removed.length;et++){const Mt=Y.removed[et],Dt=T.indexOf(Mt);Dt>=0&&(T[Dt]=null,A[Dt].disconnect(Mt))}for(let et=0;et<Y.added.length;et++){const Mt=Y.added[et];let Dt=T.indexOf(Mt);if(Dt===-1){for(let jt=0;jt<A.length;jt++)if(jt>=T.length){T.push(Mt),Dt=jt;break}else if(T[jt]===null){T[jt]=Mt,Dt=jt;break}if(Dt===-1)break}const At=A[Dt];At&&At.connect(Mt)}}const V=new C,dt=new C;function xt(Y,et,Mt){V.setFromMatrixPosition(et.matrixWorld),dt.setFromMatrixPosition(Mt.matrixWorld);const Dt=V.distanceTo(dt),At=et.projectionMatrix.elements,jt=Mt.projectionMatrix.elements,fe=At[14]/(At[10]-1),R=At[14]/(At[10]+1),tt=(At[9]+1)/At[5],K=(At[9]-1)/At[5],j=(At[8]-1)/At[0],$=(jt[8]+1)/jt[0],ht=fe*j,it=fe*$,ut=Dt/(-j+$),Ht=ut*-j;if(et.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Ht),Y.translateZ(ut),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),At[10]===-1)Y.projectionMatrix.copy(et.projectionMatrix),Y.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{const kt=fe+ut,w=R+ut,_=ht-Ht,F=it+(Dt-Ht),H=tt*R/w*kt,Q=K*R/w*kt;Y.projectionMatrix.makePerspective(_,F,H,Q,kt,w),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function St(Y,et){et===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(et.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let et=Y.near,Mt=Y.far;m.texture!==null&&(m.depthNear>0&&(et=m.depthNear),m.depthFar>0&&(Mt=m.depthFar)),O.near=M.near=E.near=et,O.far=M.far=E.far=Mt,(k!==O.near||q!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),k=O.near,q=O.far),O.layers.mask=Y.layers.mask|6,E.layers.mask=O.layers.mask&3,M.layers.mask=O.layers.mask&5;const Dt=Y.parent,At=O.cameras;St(O,Dt);for(let jt=0;jt<At.length;jt++)St(At[jt],Dt);At.length===2?xt(O,E,M):O.projectionMatrix.copy(E.projectionMatrix),Vt(Y,O,Dt)};function Vt(Y,et,Mt){Mt===null?Y.matrix.copy(et.matrixWorld):(Y.matrix.copy(Mt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(et.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(et.projectionMatrix),Y.projectionMatrixInverse.copy(et.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Ts*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(Y){c=Y,f!==null&&(f.fixedFoveation=Y),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Y)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(O)},this.getCameraTexture=function(Y){return p[Y]};let Jt=null;function re(Y,et){if(h=et.getViewerPose(l||a),g=et,h!==null){const Mt=h.views;d!==null&&(t.setRenderTargetFramebuffer(x,d.framebuffer),t.setRenderTarget(x));let Dt=!1;Mt.length!==O.cameras.length&&(O.cameras.length=0,Dt=!0);for(let R=0;R<Mt.length;R++){const tt=Mt[R];let K=null;if(d!==null)K=d.getViewport(tt);else{const $=u.getViewSubImage(f,tt);K=$.viewport,R===0&&(t.setRenderTargetTextures(x,$.colorTexture,$.depthStencilTexture),t.setRenderTarget(x))}let j=L[R];j===void 0&&(j=new Ye,j.layers.enable(R),j.viewport=new ue,L[R]=j),j.matrix.fromArray(tt.transform.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale),j.projectionMatrix.fromArray(tt.projectionMatrix),j.projectionMatrixInverse.copy(j.projectionMatrix).invert(),j.viewport.set(K.x,K.y,K.width,K.height),R===0&&(O.matrix.copy(j.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Dt===!0&&O.cameras.push(j)}const At=s.enabledFeatures;if(At&&At.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){u=n.getBinding();const R=u.getDepthInformation(Mt[0]);R&&R.isValid&&R.texture&&m.init(R,s.renderState)}if(At&&At.includes("camera-access")&&v){t.state.unbindTexture(),u=n.getBinding();for(let R=0;R<Mt.length;R++){const tt=Mt[R].camera;if(tt){let K=p[tt];K||(K=new th,p[tt]=K);const j=u.getCameraImage(tt);K.sourceTexture=j}}}}for(let Mt=0;Mt<A.length;Mt++){const Dt=T[Mt],At=A[Mt];Dt!==null&&At!==void 0&&At.update(Dt,et,l||a)}Jt&&Jt(Y,et),et.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:et}),g=null}const Zt=new uh;Zt.setAnimationLoop(re),this.setAnimationLoop=function(Y){Jt=Y},this.dispose=function(){}}}const ei=new ln,iv=new oe;function sv(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Yc(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,S,b,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,S,b):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Pe&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Pe&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const S=t.get(p),b=S.envMap,x=S.envMapRotation;b&&(m.envMap.value=b,ei.copy(x),ei.x*=-1,ei.y*=-1,ei.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(ei.y*=-1,ei.z*=-1),m.envMapRotation.value.setFromMatrix4(iv.makeRotationFromEuler(ei)),m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,S,b){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*S,m.scale.value=b*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,S){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Pe&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const S=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function rv(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(S,b){const x=b.program;n.uniformBlockBinding(S,x)}function l(S,b){let x=s[S.id];x===void 0&&(g(S),x=h(S),s[S.id]=x,S.addEventListener("dispose",m));const A=b.program;n.updateUBOMapping(S,A);const T=t.render.frame;r[S.id]!==T&&(f(S),r[S.id]=T)}function h(S){const b=u();S.__bindingPointIndex=b;const x=i.createBuffer(),A=S.__size,T=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,A,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,x),x}function u(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(S){const b=s[S.id],x=S.uniforms,A=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let T=0,P=x.length;T<P;T++){const I=Array.isArray(x[T])?x[T]:[x[T]];for(let E=0,M=I.length;E<M;E++){const L=I[E];if(d(L,T,E,A)===!0){const O=L.__offset,k=Array.isArray(L.value)?L.value:[L.value];let q=0;for(let G=0;G<k.length;G++){const X=k[G],Z=v(X);typeof X=="number"||typeof X=="boolean"?(L.__data[0]=X,i.bufferSubData(i.UNIFORM_BUFFER,O+q,L.__data)):X.isMatrix3?(L.__data[0]=X.elements[0],L.__data[1]=X.elements[1],L.__data[2]=X.elements[2],L.__data[3]=0,L.__data[4]=X.elements[3],L.__data[5]=X.elements[4],L.__data[6]=X.elements[5],L.__data[7]=0,L.__data[8]=X.elements[6],L.__data[9]=X.elements[7],L.__data[10]=X.elements[8],L.__data[11]=0):(X.toArray(L.__data,q),q+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,O,L.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(S,b,x,A){const T=S.value,P=b+"_"+x;if(A[P]===void 0)return typeof T=="number"||typeof T=="boolean"?A[P]=T:A[P]=T.clone(),!0;{const I=A[P];if(typeof T=="number"||typeof T=="boolean"){if(I!==T)return A[P]=T,!0}else if(I.equals(T)===!1)return I.copy(T),!0}return!1}function g(S){const b=S.uniforms;let x=0;const A=16;for(let P=0,I=b.length;P<I;P++){const E=Array.isArray(b[P])?b[P]:[b[P]];for(let M=0,L=E.length;M<L;M++){const O=E[M],k=Array.isArray(O.value)?O.value:[O.value];for(let q=0,G=k.length;q<G;q++){const X=k[q],Z=v(X),V=x%A,dt=V%Z.boundary,xt=V+dt;x+=dt,xt!==0&&A-xt<Z.storage&&(x+=A-xt),O.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=x,x+=Z.storage}}}const T=x%A;return T>0&&(x+=A-T),S.__size=x,S.__cache={},this}function v(S){const b={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(b.boundary=4,b.storage=4):S.isVector2?(b.boundary=8,b.storage=8):S.isVector3||S.isColor?(b.boundary=16,b.storage=12):S.isVector4?(b.boundary=16,b.storage=16):S.isMatrix3?(b.boundary=48,b.storage=48):S.isMatrix4?(b.boundary=64,b.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),b}function m(S){const b=S.target;b.removeEventListener("dispose",m);const x=a.indexOf(b.__bindingPointIndex);a.splice(x,1),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function p(){for(const S in s)i.deleteBuffer(s[S]);a=[],s={},r={}}return{bind:c,update:l,dispose:p}}class av{constructor(t={}){const{canvas:e=td(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=a;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,p=null;const S=[],b=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Vn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const x=this;let A=!1;this._outputColorSpace=Oe;let T=0,P=0,I=null,E=-1,M=null;const L=new ue,O=new ue;let k=null;const q=new qt(0);let G=0,X=e.width,Z=e.height,V=1,dt=null,xt=null;const St=new ue(0,0,X,Z),Vt=new ue(0,0,X,Z);let Jt=!1;const re=new Uo;let Zt=!1,Y=!1;const et=new oe,Mt=new C,Dt=new ue,At={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let jt=!1;function fe(){return I===null?V:1}let R=n;function tt(y,N){return e.getContext(y,N)}try{const y={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${yo}`),e.addEventListener("webglcontextlost",ft,!1),e.addEventListener("webglcontextrestored",bt,!1),e.addEventListener("webglcontextcreationerror",rt,!1),R===null){const N="webgl2";if(R=tt(N,y),R===null)throw tt(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let K,j,$,ht,it,ut,Ht,kt,w,_,F,H,Q,W,Lt,ct,Ct,Rt,st,_t,Bt,It,gt,Wt;function D(){K=new gg(R),K.init(),It=new Z0(R,K),j=new cg(R,K,t,It),$=new K0(R,K),j.reversedDepthBuffer&&f&&$.buffers.depth.setReversed(!0),ht=new xg(R),it=new O0,ut=new J0(R,K,$,it,j,It,ht),Ht=new ug(x),kt=new mg(x),w=new wf(R),gt=new og(R,w),_=new vg(R,w,ht,gt),F=new Mg(R,_,w,ht),st=new yg(R,j,ut),ct=new hg(it),H=new F0(x,Ht,kt,K,j,gt,ct),Q=new sv(x,it),W=new z0,Lt=new X0(K),Rt=new ag(x,Ht,kt,$,F,d,c),Ct=new $0(x,F,j),Wt=new rv(R,ht,j,$),_t=new lg(R,K,ht),Bt=new _g(R,K,ht),ht.programs=H.programs,x.capabilities=j,x.extensions=K,x.properties=it,x.renderLists=W,x.shadowMap=Ct,x.state=$,x.info=ht}D();const ot=new nv(x,R);this.xr=ot,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){const y=K.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=K.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(y){y!==void 0&&(V=y,this.setSize(X,Z,!1))},this.getSize=function(y){return y.set(X,Z)},this.setSize=function(y,N,B=!0){if(ot.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=y,Z=N,e.width=Math.floor(y*V),e.height=Math.floor(N*V),B===!0&&(e.style.width=y+"px",e.style.height=N+"px"),this.setViewport(0,0,y,N)},this.getDrawingBufferSize=function(y){return y.set(X*V,Z*V).floor()},this.setDrawingBufferSize=function(y,N,B){X=y,Z=N,V=B,e.width=Math.floor(y*B),e.height=Math.floor(N*B),this.setViewport(0,0,y,N)},this.getCurrentViewport=function(y){return y.copy(L)},this.getViewport=function(y){return y.copy(St)},this.setViewport=function(y,N,B,z){y.isVector4?St.set(y.x,y.y,y.z,y.w):St.set(y,N,B,z),$.viewport(L.copy(St).multiplyScalar(V).round())},this.getScissor=function(y){return y.copy(Vt)},this.setScissor=function(y,N,B,z){y.isVector4?Vt.set(y.x,y.y,y.z,y.w):Vt.set(y,N,B,z),$.scissor(O.copy(Vt).multiplyScalar(V).round())},this.getScissorTest=function(){return Jt},this.setScissorTest=function(y){$.setScissorTest(Jt=y)},this.setOpaqueSort=function(y){dt=y},this.setTransparentSort=function(y){xt=y},this.getClearColor=function(y){return y.copy(Rt.getClearColor())},this.setClearColor=function(){Rt.setClearColor(...arguments)},this.getClearAlpha=function(){return Rt.getClearAlpha()},this.setClearAlpha=function(){Rt.setClearAlpha(...arguments)},this.clear=function(y=!0,N=!0,B=!0){let z=0;if(y){let U=!1;if(I!==null){const at=I.texture.format;U=at===Co||at===Ao||at===To}if(U){const at=I.texture.type,vt=at===vn||at===li||at===Ss||at===bs||at===bo||at===Eo,wt=Rt.getClearColor(),yt=Rt.getClearAlpha(),Ot=wt.r,zt=wt.g,Ut=wt.b;vt?(g[0]=Ot,g[1]=zt,g[2]=Ut,g[3]=yt,R.clearBufferuiv(R.COLOR,0,g)):(v[0]=Ot,v[1]=zt,v[2]=Ut,v[3]=yt,R.clearBufferiv(R.COLOR,0,v))}else z|=R.COLOR_BUFFER_BIT}N&&(z|=R.DEPTH_BUFFER_BIT),B&&(z|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),R.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ft,!1),e.removeEventListener("webglcontextrestored",bt,!1),e.removeEventListener("webglcontextcreationerror",rt,!1),Rt.dispose(),W.dispose(),Lt.dispose(),it.dispose(),Ht.dispose(),kt.dispose(),F.dispose(),gt.dispose(),Wt.dispose(),H.dispose(),ot.dispose(),ot.removeEventListener("sessionstart",cn),ot.removeEventListener("sessionend",Ko),$n.stop()};function ft(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function bt(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const y=ht.autoReset,N=Ct.enabled,B=Ct.autoUpdate,z=Ct.needsUpdate,U=Ct.type;D(),ht.autoReset=y,Ct.enabled=N,Ct.autoUpdate=B,Ct.needsUpdate=z,Ct.type=U}function rt(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function J(y){const N=y.target;N.removeEventListener("dispose",J),Pt(N)}function Pt(y){Gt(y),it.remove(y)}function Gt(y){const N=it.get(y).programs;N!==void 0&&(N.forEach(function(B){H.releaseProgram(B)}),y.isShaderMaterial&&H.releaseShaderCache(y))}this.renderBufferDirect=function(y,N,B,z,U,at){N===null&&(N=At);const vt=U.isMesh&&U.matrixWorld.determinant()<0,wt=Lh(y,N,B,z,U);$.setMaterial(z,vt);let yt=B.index,Ot=1;if(z.wireframe===!0){if(yt=_.getWireframeAttribute(B),yt===void 0)return;Ot=2}const zt=B.drawRange,Ut=B.attributes.position;let Kt=zt.start*Ot,le=(zt.start+zt.count)*Ot;at!==null&&(Kt=Math.max(Kt,at.start*Ot),le=Math.min(le,(at.start+at.count)*Ot)),yt!==null?(Kt=Math.max(Kt,0),le=Math.min(le,yt.count)):Ut!=null&&(Kt=Math.max(Kt,0),le=Math.min(le,Ut.count));const xe=le-Kt;if(xe<0||xe===1/0)return;gt.setup(U,z,wt,B,yt);let me,de=_t;if(yt!==null&&(me=w.get(yt),de=Bt,de.setIndex(me)),U.isMesh)z.wireframe===!0?($.setLineWidth(z.wireframeLinewidth*fe()),de.setMode(R.LINES)):de.setMode(R.TRIANGLES);else if(U.isLine){let Ft=z.linewidth;Ft===void 0&&(Ft=1),$.setLineWidth(Ft*fe()),U.isLineSegments?de.setMode(R.LINES):U.isLineLoop?de.setMode(R.LINE_LOOP):de.setMode(R.LINE_STRIP)}else U.isPoints?de.setMode(R.POINTS):U.isSprite&&de.setMode(R.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)As("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),de.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(K.get("WEBGL_multi_draw"))de.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const Ft=U._multiDrawStarts,ge=U._multiDrawCounts,Qt=U._multiDrawCount,Ve=yt?w.get(yt).bytesPerElement:1,pi=it.get(z).currentProgram.getUniforms();for(let We=0;We<Qt;We++)pi.setValue(R,"_gl_DrawID",We),de.render(Ft[We]/Ve,ge[We])}else if(U.isInstancedMesh)de.renderInstances(Kt,xe,U.count);else if(B.isInstancedBufferGeometry){const Ft=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,ge=Math.min(B.instanceCount,Ft);de.renderInstances(Kt,xe,ge)}else de.render(Kt,xe)};function pe(y,N,B){y.transparent===!0&&y.side===dn&&y.forceSinglePass===!1?(y.side=Pe,y.needsUpdate=!0,Us(y,N,B),y.side=Xn,y.needsUpdate=!0,Us(y,N,B),y.side=dn):Us(y,N,B)}this.compile=function(y,N,B=null){B===null&&(B=y),p=Lt.get(B),p.init(N),b.push(p),B.traverseVisible(function(U){U.isLight&&U.layers.test(N.layers)&&(p.pushLight(U),U.castShadow&&p.pushShadow(U))}),y!==B&&y.traverseVisible(function(U){U.isLight&&U.layers.test(N.layers)&&(p.pushLight(U),U.castShadow&&p.pushShadow(U))}),p.setupLights();const z=new Set;return y.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;const at=U.material;if(at)if(Array.isArray(at))for(let vt=0;vt<at.length;vt++){const wt=at[vt];pe(wt,B,U),z.add(wt)}else pe(at,B,U),z.add(at)}),p=b.pop(),z},this.compileAsync=function(y,N,B=null){const z=this.compile(y,N,B);return new Promise(U=>{function at(){if(z.forEach(function(vt){it.get(vt).currentProgram.isReady()&&z.delete(vt)}),z.size===0){U(y);return}setTimeout(at,10)}K.get("KHR_parallel_shader_compile")!==null?at():setTimeout(at,10)})};let se=null;function yn(y){se&&se(y)}function cn(){$n.stop()}function Ko(){$n.start()}const $n=new uh;$n.setAnimationLoop(yn),typeof self<"u"&&$n.setContext(self),this.setAnimationLoop=function(y){se=y,ot.setAnimationLoop(y),y===null?$n.stop():$n.start()},ot.addEventListener("sessionstart",cn),ot.addEventListener("sessionend",Ko),this.render=function(y,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),ot.enabled===!0&&ot.isPresenting===!0&&(ot.cameraAutoUpdate===!0&&ot.updateCamera(N),N=ot.getCamera()),y.isScene===!0&&y.onBeforeRender(x,y,N,I),p=Lt.get(y,b.length),p.init(N),b.push(p),et.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),re.setFromProjectionMatrix(et,mn,N.reversedDepth),Y=this.localClippingEnabled,Zt=ct.init(this.clippingPlanes,Y),m=W.get(y,S.length),m.init(),S.push(m),ot.enabled===!0&&ot.isPresenting===!0){const at=x.xr.getDepthSensingMesh();at!==null&&Ur(at,N,-1/0,x.sortObjects)}Ur(y,N,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(dt,xt),jt=ot.enabled===!1||ot.isPresenting===!1||ot.hasDepthSensing()===!1,jt&&Rt.addToRenderList(m,y),this.info.render.frame++,Zt===!0&&ct.beginShadows();const B=p.state.shadowsArray;Ct.render(B,y,N),Zt===!0&&ct.endShadows(),this.info.autoReset===!0&&this.info.reset();const z=m.opaque,U=m.transmissive;if(p.setupLights(),N.isArrayCamera){const at=N.cameras;if(U.length>0)for(let vt=0,wt=at.length;vt<wt;vt++){const yt=at[vt];Zo(z,U,y,yt)}jt&&Rt.render(y);for(let vt=0,wt=at.length;vt<wt;vt++){const yt=at[vt];Jo(m,y,yt,yt.viewport)}}else U.length>0&&Zo(z,U,y,N),jt&&Rt.render(y),Jo(m,y,N);I!==null&&P===0&&(ut.updateMultisampleRenderTarget(I),ut.updateRenderTargetMipmap(I)),y.isScene===!0&&y.onAfterRender(x,y,N),gt.resetDefaultState(),E=-1,M=null,b.pop(),b.length>0?(p=b[b.length-1],Zt===!0&&ct.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,S.pop(),S.length>0?m=S[S.length-1]:m=null};function Ur(y,N,B,z){if(y.visible===!1)return;if(y.layers.test(N.layers)){if(y.isGroup)B=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(N);else if(y.isLight)p.pushLight(y),y.castShadow&&p.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||re.intersectsSprite(y)){z&&Dt.setFromMatrixPosition(y.matrixWorld).applyMatrix4(et);const vt=F.update(y),wt=y.material;wt.visible&&m.push(y,vt,wt,B,Dt.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||re.intersectsObject(y))){const vt=F.update(y),wt=y.material;if(z&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Dt.copy(y.boundingSphere.center)):(vt.boundingSphere===null&&vt.computeBoundingSphere(),Dt.copy(vt.boundingSphere.center)),Dt.applyMatrix4(y.matrixWorld).applyMatrix4(et)),Array.isArray(wt)){const yt=vt.groups;for(let Ot=0,zt=yt.length;Ot<zt;Ot++){const Ut=yt[Ot],Kt=wt[Ut.materialIndex];Kt&&Kt.visible&&m.push(y,vt,Kt,B,Dt.z,Ut)}}else wt.visible&&m.push(y,vt,wt,B,Dt.z,null)}}const at=y.children;for(let vt=0,wt=at.length;vt<wt;vt++)Ur(at[vt],N,B,z)}function Jo(y,N,B,z){const U=y.opaque,at=y.transmissive,vt=y.transparent;p.setupLightsView(B),Zt===!0&&ct.setGlobalState(x.clippingPlanes,B),z&&$.viewport(L.copy(z)),U.length>0&&Ns(U,N,B),at.length>0&&Ns(at,N,B),vt.length>0&&Ns(vt,N,B),$.buffers.depth.setTest(!0),$.buffers.depth.setMask(!0),$.buffers.color.setMask(!0),$.setPolygonOffset(!1)}function Zo(y,N,B,z){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[z.id]===void 0&&(p.state.transmissionRenderTarget[z.id]=new ci(1,1,{generateMipmaps:!0,type:K.has("EXT_color_buffer_half_float")||K.has("EXT_color_buffer_float")?Ls:vn,minFilter:ai,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ee.workingColorSpace}));const at=p.state.transmissionRenderTarget[z.id],vt=z.viewport||L;at.setSize(vt.z*x.transmissionResolutionScale,vt.w*x.transmissionResolutionScale);const wt=x.getRenderTarget(),yt=x.getActiveCubeFace(),Ot=x.getActiveMipmapLevel();x.setRenderTarget(at),x.getClearColor(q),G=x.getClearAlpha(),G<1&&x.setClearColor(16777215,.5),x.clear(),jt&&Rt.render(B);const zt=x.toneMapping;x.toneMapping=Vn;const Ut=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),p.setupLightsView(z),Zt===!0&&ct.setGlobalState(x.clippingPlanes,z),Ns(y,B,z),ut.updateMultisampleRenderTarget(at),ut.updateRenderTargetMipmap(at),K.has("WEBGL_multisampled_render_to_texture")===!1){let Kt=!1;for(let le=0,xe=N.length;le<xe;le++){const me=N[le],de=me.object,Ft=me.geometry,ge=me.material,Qt=me.group;if(ge.side===dn&&de.layers.test(z.layers)){const Ve=ge.side;ge.side=Pe,ge.needsUpdate=!0,Qo(de,B,z,Ft,ge,Qt),ge.side=Ve,ge.needsUpdate=!0,Kt=!0}}Kt===!0&&(ut.updateMultisampleRenderTarget(at),ut.updateRenderTargetMipmap(at))}x.setRenderTarget(wt,yt,Ot),x.setClearColor(q,G),Ut!==void 0&&(z.viewport=Ut),x.toneMapping=zt}function Ns(y,N,B){const z=N.isScene===!0?N.overrideMaterial:null;for(let U=0,at=y.length;U<at;U++){const vt=y[U],wt=vt.object,yt=vt.geometry,Ot=vt.group;let zt=vt.material;zt.allowOverride===!0&&z!==null&&(zt=z),wt.layers.test(B.layers)&&Qo(wt,N,B,yt,zt,Ot)}}function Qo(y,N,B,z,U,at){y.onBeforeRender(x,N,B,z,U,at),y.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),U.onBeforeRender(x,N,B,z,y,at),U.transparent===!0&&U.side===dn&&U.forceSinglePass===!1?(U.side=Pe,U.needsUpdate=!0,x.renderBufferDirect(B,N,z,U,y,at),U.side=Xn,U.needsUpdate=!0,x.renderBufferDirect(B,N,z,U,y,at),U.side=dn):x.renderBufferDirect(B,N,z,U,y,at),y.onAfterRender(x,N,B,z,U,at)}function Us(y,N,B){N.isScene!==!0&&(N=At);const z=it.get(y),U=p.state.lights,at=p.state.shadowsArray,vt=U.state.version,wt=H.getParameters(y,U.state,at,N,B),yt=H.getProgramCacheKey(wt);let Ot=z.programs;z.environment=y.isMeshStandardMaterial?N.environment:null,z.fog=N.fog,z.envMap=(y.isMeshStandardMaterial?kt:Ht).get(y.envMap||z.environment),z.envMapRotation=z.environment!==null&&y.envMap===null?N.environmentRotation:y.envMapRotation,Ot===void 0&&(y.addEventListener("dispose",J),Ot=new Map,z.programs=Ot);let zt=Ot.get(yt);if(zt!==void 0){if(z.currentProgram===zt&&z.lightsStateVersion===vt)return el(y,wt),zt}else wt.uniforms=H.getUniforms(y),y.onBeforeCompile(wt,x),zt=H.acquireProgram(wt,yt),Ot.set(yt,zt),z.uniforms=wt.uniforms;const Ut=z.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Ut.clippingPlanes=ct.uniform),el(y,wt),z.needsLights=Dh(y),z.lightsStateVersion=vt,z.needsLights&&(Ut.ambientLightColor.value=U.state.ambient,Ut.lightProbe.value=U.state.probe,Ut.directionalLights.value=U.state.directional,Ut.directionalLightShadows.value=U.state.directionalShadow,Ut.spotLights.value=U.state.spot,Ut.spotLightShadows.value=U.state.spotShadow,Ut.rectAreaLights.value=U.state.rectArea,Ut.ltc_1.value=U.state.rectAreaLTC1,Ut.ltc_2.value=U.state.rectAreaLTC2,Ut.pointLights.value=U.state.point,Ut.pointLightShadows.value=U.state.pointShadow,Ut.hemisphereLights.value=U.state.hemi,Ut.directionalShadowMap.value=U.state.directionalShadowMap,Ut.directionalShadowMatrix.value=U.state.directionalShadowMatrix,Ut.spotShadowMap.value=U.state.spotShadowMap,Ut.spotLightMatrix.value=U.state.spotLightMatrix,Ut.spotLightMap.value=U.state.spotLightMap,Ut.pointShadowMap.value=U.state.pointShadowMap,Ut.pointShadowMatrix.value=U.state.pointShadowMatrix),z.currentProgram=zt,z.uniformsList=null,zt}function tl(y){if(y.uniformsList===null){const N=y.currentProgram.getUniforms();y.uniformsList=yr.seqWithValue(N.seq,y.uniforms)}return y.uniformsList}function el(y,N){const B=it.get(y);B.outputColorSpace=N.outputColorSpace,B.batching=N.batching,B.batchingColor=N.batchingColor,B.instancing=N.instancing,B.instancingColor=N.instancingColor,B.instancingMorph=N.instancingMorph,B.skinning=N.skinning,B.morphTargets=N.morphTargets,B.morphNormals=N.morphNormals,B.morphColors=N.morphColors,B.morphTargetsCount=N.morphTargetsCount,B.numClippingPlanes=N.numClippingPlanes,B.numIntersection=N.numClipIntersection,B.vertexAlphas=N.vertexAlphas,B.vertexTangents=N.vertexTangents,B.toneMapping=N.toneMapping}function Lh(y,N,B,z,U){N.isScene!==!0&&(N=At),ut.resetTextureUnits();const at=N.fog,vt=z.isMeshStandardMaterial?N.environment:null,wt=I===null?x.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Vi,yt=(z.isMeshStandardMaterial?kt:Ht).get(z.envMap||vt),Ot=z.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,zt=!!B.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Ut=!!B.morphAttributes.position,Kt=!!B.morphAttributes.normal,le=!!B.morphAttributes.color;let xe=Vn;z.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(xe=x.toneMapping);const me=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,de=me!==void 0?me.length:0,Ft=it.get(z),ge=p.state.lights;if(Zt===!0&&(Y===!0||y!==M)){const Ie=y===M&&z.id===E;ct.setState(z,y,Ie)}let Qt=!1;z.version===Ft.__version?(Ft.needsLights&&Ft.lightsStateVersion!==ge.state.version||Ft.outputColorSpace!==wt||U.isBatchedMesh&&Ft.batching===!1||!U.isBatchedMesh&&Ft.batching===!0||U.isBatchedMesh&&Ft.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&Ft.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&Ft.instancing===!1||!U.isInstancedMesh&&Ft.instancing===!0||U.isSkinnedMesh&&Ft.skinning===!1||!U.isSkinnedMesh&&Ft.skinning===!0||U.isInstancedMesh&&Ft.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Ft.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&Ft.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&Ft.instancingMorph===!1&&U.morphTexture!==null||Ft.envMap!==yt||z.fog===!0&&Ft.fog!==at||Ft.numClippingPlanes!==void 0&&(Ft.numClippingPlanes!==ct.numPlanes||Ft.numIntersection!==ct.numIntersection)||Ft.vertexAlphas!==Ot||Ft.vertexTangents!==zt||Ft.morphTargets!==Ut||Ft.morphNormals!==Kt||Ft.morphColors!==le||Ft.toneMapping!==xe||Ft.morphTargetsCount!==de)&&(Qt=!0):(Qt=!0,Ft.__version=z.version);let Ve=Ft.currentProgram;Qt===!0&&(Ve=Us(z,N,U));let pi=!1,We=!1,Ki=!1;const ve=Ve.getUniforms(),je=Ft.uniforms;if($.useProgram(Ve.program)&&(pi=!0,We=!0,Ki=!0),z.id!==E&&(E=z.id,We=!0),pi||M!==y){$.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),ve.setValue(R,"projectionMatrix",y.projectionMatrix),ve.setValue(R,"viewMatrix",y.matrixWorldInverse);const He=ve.map.cameraPosition;He!==void 0&&He.setValue(R,Mt.setFromMatrixPosition(y.matrixWorld)),j.logarithmicDepthBuffer&&ve.setValue(R,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&ve.setValue(R,"isOrthographic",y.isOrthographicCamera===!0),M!==y&&(M=y,We=!0,Ki=!0)}if(U.isSkinnedMesh){ve.setOptional(R,U,"bindMatrix"),ve.setOptional(R,U,"bindMatrixInverse");const Ie=U.skeleton;Ie&&(Ie.boneTexture===null&&Ie.computeBoneTexture(),ve.setValue(R,"boneTexture",Ie.boneTexture,ut))}U.isBatchedMesh&&(ve.setOptional(R,U,"batchingTexture"),ve.setValue(R,"batchingTexture",U._matricesTexture,ut),ve.setOptional(R,U,"batchingIdTexture"),ve.setValue(R,"batchingIdTexture",U._indirectTexture,ut),ve.setOptional(R,U,"batchingColorTexture"),U._colorsTexture!==null&&ve.setValue(R,"batchingColorTexture",U._colorsTexture,ut));const Ke=B.morphAttributes;if((Ke.position!==void 0||Ke.normal!==void 0||Ke.color!==void 0)&&st.update(U,B,Ve),(We||Ft.receiveShadow!==U.receiveShadow)&&(Ft.receiveShadow=U.receiveShadow,ve.setValue(R,"receiveShadow",U.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(je.envMap.value=yt,je.flipEnvMap.value=yt.isCubeTexture&&yt.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&N.environment!==null&&(je.envMapIntensity.value=N.environmentIntensity),We&&(ve.setValue(R,"toneMappingExposure",x.toneMappingExposure),Ft.needsLights&&Ih(je,Ki),at&&z.fog===!0&&Q.refreshFogUniforms(je,at),Q.refreshMaterialUniforms(je,z,V,Z,p.state.transmissionRenderTarget[y.id]),yr.upload(R,tl(Ft),je,ut)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(yr.upload(R,tl(Ft),je,ut),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&ve.setValue(R,"center",U.center),ve.setValue(R,"modelViewMatrix",U.modelViewMatrix),ve.setValue(R,"normalMatrix",U.normalMatrix),ve.setValue(R,"modelMatrix",U.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const Ie=z.uniformsGroups;for(let He=0,Fr=Ie.length;He<Fr;He++){const jn=Ie[He];Wt.update(jn,Ve),Wt.bind(jn,Ve)}}return Ve}function Ih(y,N){y.ambientLightColor.needsUpdate=N,y.lightProbe.needsUpdate=N,y.directionalLights.needsUpdate=N,y.directionalLightShadows.needsUpdate=N,y.pointLights.needsUpdate=N,y.pointLightShadows.needsUpdate=N,y.spotLights.needsUpdate=N,y.spotLightShadows.needsUpdate=N,y.rectAreaLights.needsUpdate=N,y.hemisphereLights.needsUpdate=N}function Dh(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(y,N,B){const z=it.get(y);z.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),it.get(y.texture).__webglTexture=N,it.get(y.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:B,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,N){const B=it.get(y);B.__webglFramebuffer=N,B.__useDefaultFramebuffer=N===void 0};const Nh=R.createFramebuffer();this.setRenderTarget=function(y,N=0,B=0){I=y,T=N,P=B;let z=!0,U=null,at=!1,vt=!1;if(y){const yt=it.get(y);if(yt.__useDefaultFramebuffer!==void 0)$.bindFramebuffer(R.FRAMEBUFFER,null),z=!1;else if(yt.__webglFramebuffer===void 0)ut.setupRenderTarget(y);else if(yt.__hasExternalTextures)ut.rebindTextures(y,it.get(y.texture).__webglTexture,it.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const Ut=y.depthTexture;if(yt.__boundDepthTexture!==Ut){if(Ut!==null&&it.has(Ut)&&(y.width!==Ut.image.width||y.height!==Ut.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ut.setupDepthRenderbuffer(y)}}const Ot=y.texture;(Ot.isData3DTexture||Ot.isDataArrayTexture||Ot.isCompressedArrayTexture)&&(vt=!0);const zt=it.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(zt[N])?U=zt[N][B]:U=zt[N],at=!0):y.samples>0&&ut.useMultisampledRTT(y)===!1?U=it.get(y).__webglMultisampledFramebuffer:Array.isArray(zt)?U=zt[B]:U=zt,L.copy(y.viewport),O.copy(y.scissor),k=y.scissorTest}else L.copy(St).multiplyScalar(V).floor(),O.copy(Vt).multiplyScalar(V).floor(),k=Jt;if(B!==0&&(U=Nh),$.bindFramebuffer(R.FRAMEBUFFER,U)&&z&&$.drawBuffers(y,U),$.viewport(L),$.scissor(O),$.setScissorTest(k),at){const yt=it.get(y.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+N,yt.__webglTexture,B)}else if(vt){const yt=N;for(let Ot=0;Ot<y.textures.length;Ot++){const zt=it.get(y.textures[Ot]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+Ot,zt.__webglTexture,B,yt)}}else if(y!==null&&B!==0){const yt=it.get(y.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,yt.__webglTexture,B)}E=-1},this.readRenderTargetPixels=function(y,N,B,z,U,at,vt,wt=0){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let yt=it.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&vt!==void 0&&(yt=yt[vt]),yt){$.bindFramebuffer(R.FRAMEBUFFER,yt);try{const Ot=y.textures[wt],zt=Ot.format,Ut=Ot.type;if(!j.textureFormatReadable(zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!j.textureTypeReadable(Ut)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=y.width-z&&B>=0&&B<=y.height-U&&(y.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+wt),R.readPixels(N,B,z,U,It.convert(zt),It.convert(Ut),at))}finally{const Ot=I!==null?it.get(I).__webglFramebuffer:null;$.bindFramebuffer(R.FRAMEBUFFER,Ot)}}},this.readRenderTargetPixelsAsync=async function(y,N,B,z,U,at,vt,wt=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let yt=it.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&vt!==void 0&&(yt=yt[vt]),yt)if(N>=0&&N<=y.width-z&&B>=0&&B<=y.height-U){$.bindFramebuffer(R.FRAMEBUFFER,yt);const Ot=y.textures[wt],zt=Ot.format,Ut=Ot.type;if(!j.textureFormatReadable(zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!j.textureTypeReadable(Ut))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Kt=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,Kt),R.bufferData(R.PIXEL_PACK_BUFFER,at.byteLength,R.STREAM_READ),y.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+wt),R.readPixels(N,B,z,U,It.convert(zt),It.convert(Ut),0);const le=I!==null?it.get(I).__webglFramebuffer:null;$.bindFramebuffer(R.FRAMEBUFFER,le);const xe=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await ed(R,xe,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,Kt),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,at),R.deleteBuffer(Kt),R.deleteSync(xe),at}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,N=null,B=0){const z=Math.pow(2,-B),U=Math.floor(y.image.width*z),at=Math.floor(y.image.height*z),vt=N!==null?N.x:0,wt=N!==null?N.y:0;ut.setTexture2D(y,0),R.copyTexSubImage2D(R.TEXTURE_2D,B,0,0,vt,wt,U,at),$.unbindTexture()};const Uh=R.createFramebuffer(),Fh=R.createFramebuffer();this.copyTextureToTexture=function(y,N,B=null,z=null,U=0,at=null){at===null&&(U!==0?(As("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),at=U,U=0):at=0);let vt,wt,yt,Ot,zt,Ut,Kt,le,xe;const me=y.isCompressedTexture?y.mipmaps[at]:y.image;if(B!==null)vt=B.max.x-B.min.x,wt=B.max.y-B.min.y,yt=B.isBox3?B.max.z-B.min.z:1,Ot=B.min.x,zt=B.min.y,Ut=B.isBox3?B.min.z:0;else{const Ke=Math.pow(2,-U);vt=Math.floor(me.width*Ke),wt=Math.floor(me.height*Ke),y.isDataArrayTexture?yt=me.depth:y.isData3DTexture?yt=Math.floor(me.depth*Ke):yt=1,Ot=0,zt=0,Ut=0}z!==null?(Kt=z.x,le=z.y,xe=z.z):(Kt=0,le=0,xe=0);const de=It.convert(N.format),Ft=It.convert(N.type);let ge;N.isData3DTexture?(ut.setTexture3D(N,0),ge=R.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(ut.setTexture2DArray(N,0),ge=R.TEXTURE_2D_ARRAY):(ut.setTexture2D(N,0),ge=R.TEXTURE_2D),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,N.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,N.unpackAlignment);const Qt=R.getParameter(R.UNPACK_ROW_LENGTH),Ve=R.getParameter(R.UNPACK_IMAGE_HEIGHT),pi=R.getParameter(R.UNPACK_SKIP_PIXELS),We=R.getParameter(R.UNPACK_SKIP_ROWS),Ki=R.getParameter(R.UNPACK_SKIP_IMAGES);R.pixelStorei(R.UNPACK_ROW_LENGTH,me.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,me.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Ot),R.pixelStorei(R.UNPACK_SKIP_ROWS,zt),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Ut);const ve=y.isDataArrayTexture||y.isData3DTexture,je=N.isDataArrayTexture||N.isData3DTexture;if(y.isDepthTexture){const Ke=it.get(y),Ie=it.get(N),He=it.get(Ke.__renderTarget),Fr=it.get(Ie.__renderTarget);$.bindFramebuffer(R.READ_FRAMEBUFFER,He.__webglFramebuffer),$.bindFramebuffer(R.DRAW_FRAMEBUFFER,Fr.__webglFramebuffer);for(let jn=0;jn<yt;jn++)ve&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,it.get(y).__webglTexture,U,Ut+jn),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,it.get(N).__webglTexture,at,xe+jn)),R.blitFramebuffer(Ot,zt,vt,wt,Kt,le,vt,wt,R.DEPTH_BUFFER_BIT,R.NEAREST);$.bindFramebuffer(R.READ_FRAMEBUFFER,null),$.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(U!==0||y.isRenderTargetTexture||it.has(y)){const Ke=it.get(y),Ie=it.get(N);$.bindFramebuffer(R.READ_FRAMEBUFFER,Uh),$.bindFramebuffer(R.DRAW_FRAMEBUFFER,Fh);for(let He=0;He<yt;He++)ve?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Ke.__webglTexture,U,Ut+He):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Ke.__webglTexture,U),je?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Ie.__webglTexture,at,xe+He):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Ie.__webglTexture,at),U!==0?R.blitFramebuffer(Ot,zt,vt,wt,Kt,le,vt,wt,R.COLOR_BUFFER_BIT,R.NEAREST):je?R.copyTexSubImage3D(ge,at,Kt,le,xe+He,Ot,zt,vt,wt):R.copyTexSubImage2D(ge,at,Kt,le,Ot,zt,vt,wt);$.bindFramebuffer(R.READ_FRAMEBUFFER,null),$.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else je?y.isDataTexture||y.isData3DTexture?R.texSubImage3D(ge,at,Kt,le,xe,vt,wt,yt,de,Ft,me.data):N.isCompressedArrayTexture?R.compressedTexSubImage3D(ge,at,Kt,le,xe,vt,wt,yt,de,me.data):R.texSubImage3D(ge,at,Kt,le,xe,vt,wt,yt,de,Ft,me):y.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,at,Kt,le,vt,wt,de,Ft,me.data):y.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,at,Kt,le,me.width,me.height,de,me.data):R.texSubImage2D(R.TEXTURE_2D,at,Kt,le,vt,wt,de,Ft,me);R.pixelStorei(R.UNPACK_ROW_LENGTH,Qt),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,Ve),R.pixelStorei(R.UNPACK_SKIP_PIXELS,pi),R.pixelStorei(R.UNPACK_SKIP_ROWS,We),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Ki),at===0&&N.generateMipmaps&&R.generateMipmap(ge),$.unbindTexture()},this.initRenderTarget=function(y){it.get(y).__webglFramebuffer===void 0&&ut.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?ut.setTextureCube(y,0):y.isData3DTexture?ut.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?ut.setTexture2DArray(y,0):ut.setTexture2D(y,0),$.unbindTexture()},this.resetState=function(){T=0,P=0,I=null,$.reset(),gt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return mn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=ee._getDrawingBufferColorSpace(t),e.unpackColorSpace=ee._getUnpackColorSpace()}}const ls=new C;function Ze(i,t,e,n,s,r){const a=2*Math.PI*s/4,o=Math.max(r-2*s,0),c=Math.PI/4;ls.copy(t),ls[n]=0,ls.normalize();const l=.5*a/(a+o),h=1-ls.angleTo(i)/c;return Math.sign(ls[e])===1?h*l:o/(a+o)+l+l*(1-h)}class qo extends _n{constructor(t=1,e=1,n=1,s=2,r=.1){const a=s*2+1;if(r=Math.min(t/2,e/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:n,segments:s,radius:r},a===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const c=new C,l=new C,h=new C(t,e,n).divideScalar(2).subScalar(r),u=this.attributes.position.array,f=this.attributes.normal.array,d=this.attributes.uv.array,g=u.length/6,v=new C,m=.5/a;for(let p=0,S=0;p<u.length;p+=3,S+=2)switch(c.fromArray(u,p),l.copy(c),l.x-=Math.sign(l.x)*m,l.y-=Math.sign(l.y)*m,l.z-=Math.sign(l.z)*m,l.normalize(),u[p+0]=h.x*Math.sign(c.x)+l.x*r,u[p+1]=h.y*Math.sign(c.y)+l.y*r,u[p+2]=h.z*Math.sign(c.z)+l.z*r,f[p+0]=l.x,f[p+1]=l.y,f[p+2]=l.z,Math.floor(p/g)){case 0:v.set(1,0,0),d[S+0]=Ze(v,l,"z","y",r,n),d[S+1]=1-Ze(v,l,"y","z",r,e);break;case 1:v.set(-1,0,0),d[S+0]=1-Ze(v,l,"z","y",r,n),d[S+1]=1-Ze(v,l,"y","z",r,e);break;case 2:v.set(0,1,0),d[S+0]=1-Ze(v,l,"x","z",r,t),d[S+1]=Ze(v,l,"z","x",r,n);break;case 3:v.set(0,-1,0),d[S+0]=1-Ze(v,l,"x","z",r,t),d[S+1]=1-Ze(v,l,"z","x",r,n);break;case 4:v.set(0,0,1),d[S+0]=1-Ze(v,l,"x","y",r,t),d[S+1]=1-Ze(v,l,"y","x",r,e);break;case 5:v.set(0,0,-1),d[S+0]=Ze(v,l,"x","y",r,t),d[S+1]=1-Ze(v,l,"y","x",r,e);break}}static fromJSON(t){return new qo(t.width,t.height,t.depth,t.segments,t.radius)}}function ke(i,t,e,n=[1,1]){const s=document.createElement("canvas");s.width=i,s.height=t,e(s.getContext("2d"),i,t);const r=new Oo(s);return r.colorSpace=Oe,r.wrapS=r.wrapT=Mr,r.repeat.set(...n),r.anisotropy=4,r}function Dr(i){return()=>(i=i*1664525+1013904223>>>0,i/4294967296)}function gh(){return ke(512,256,(i,t,e)=>{const n=Dr(37);i.fillStyle="#8f6245",i.fillRect(0,0,t,e);for(let s=0;s<650;s++){const r=n()*e,a=2+n()*8;i.strokeStyle=s%3?"rgba(35,15,7,.12)":"rgba(236,190,131,.14)",i.lineWidth=.3+n()*1.5,i.beginPath(),i.moveTo(0,r),i.bezierCurveTo(t*.3,r-a,t*.65,r+a,t,r+1),i.stroke()}})}function ov(){return ke(128,128,(i,t,e)=>{const n=Dr(19);i.fillStyle="#e3e9e2",i.fillRect(0,0,t,e);for(let s=0;s<e;s+=2)i.fillStyle="rgba(255,255,255,.16)",i.fillRect(0,s,t,1);for(let s=0;s<6500;s++)i.fillStyle=s%2?"rgba(0,0,0,.045)":"rgba(255,255,255,.09)",i.fillRect(n()*t,n()*e,1,1)},[18,9])}function lv(){return ke(1024,1024,(i,t,e)=>{const n=Dr(63),s=64;i.fillStyle="#1b1714",i.fillRect(0,0,t,e);for(let r=0;r<16;r++)for(let a=-1;a<4;a++){const o=a*320+r%3*106,c=r*s,l=19+n()*8;i.fillStyle=`hsl(28, 25%, ${l}%)`,i.fillRect(o+1,c+1,318,s-2);for(let h=0;h<32;h++){i.strokeStyle=h%3?"rgba(7,5,3,.13)":"rgba(209,162,109,.09)";const u=c+n()*s;i.beginPath(),i.moveTo(o,u),i.bezierCurveTo(o+95,u-2,o+240,u+2,o+320,u),i.stroke()}}},[4,4])}function cv(){return ke(1024,640,(i,t,e)=>{const n=Dr(87);i.fillStyle="#1b302e",i.fillRect(0,0,t,e);for(let r=0;r<3e4;r++)i.fillStyle=r%2?"#ffffff08":"#0000000e",i.fillRect(n()*t,n()*e,1,2);for(const[r,a,o]of[[19,"#7c6747",3],[28,"#64715b",1],[45,"#82704e",2],[51,"#82704e",1]])i.strokeStyle=a,i.lineWidth=o,i.strokeRect(r,r,t-r*2,e-r*2);i.fillStyle="#9c8254";const s=(r,a)=>{i.beginPath(),i.moveTo(r,a-4),i.lineTo(r+3,a),i.lineTo(r,a+4),i.lineTo(r-3,a),i.closePath(),i.fill()};for(let r=66;r<t-55;r+=22)s(r,37),s(r,e-37);for(let r=65;r<e-55;r+=22)s(37,r),s(t-37,r)})}function hv(){return ke(128,128,(i,t,e)=>{const n=i.createRadialGradient(t/2,e/2,10,t/2,e/2,t/2);n.addColorStop(0,"rgba(0,0,0,.65)"),n.addColorStop(.5,"rgba(0,0,0,.38)"),n.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=n,i.fillRect(0,0,t,e)})}function Yo(i){const t=new Set,e=new Set,n=new Set;i.traverse(s=>{s.geometry&&t.add(s.geometry);for(const r of s.material?Array.isArray(s.material)?s.material:[s.material]:[]){e.add(r);for(const a of Object.values(r))a?.isTexture&&n.add(a)}}),t.forEach(s=>s.dispose()),e.forEach(s=>s.dispose()),n.forEach(s=>s.dispose()),i.removeFromParent()}const zi=.18,_s=6.46,xs=3.66;function vh(i,t,e=!1){const n=new Pr,s=i/2,r=t/2;if(!e)return n.moveTo(-s,-r),n.lineTo(s,-r),n.lineTo(s,r),n.lineTo(-s,r),n.closePath(),n;const a=e?.055:0;return n.moveTo(-s+a,-r),n.lineTo(s-a,-r),n.quadraticCurveTo(s,-r,s,-r+a),n.lineTo(s,r-a),n.quadraticCurveTo(s,r,s-a,r),n.lineTo(-s+a,r),n.quadraticCurveTo(-s,r,-s,r-a),n.lineTo(-s,-r+a),n.quadraticCurveTo(-s,-r,-s+a,-r),n.closePath(),n}function _h(i){for(const t of be){const e=new ho;e.absarc(t.x,-t.z,zi,0,Math.PI*2,!0),i.holes.push(e)}return i}function uv(i){const t=vh(_s,xs,!0);return i&&_h(t),new Lr(t,{depth:.22,bevelEnabled:!1,curveSegments:32})}function dv(i){const t=i?6.04:5.6,e=i?3.24:2.8,n=vh(t,e);i&&_h(n);const s=new Go(n,32),r=s.attributes.position,a=s.attributes.uv;for(let o=0;o<a.count;o++)a.setXY(o,r.getX(o)/t+.5,r.getY(o)/e+.5);return s}function fv(i){return ke(1024,640,(t,e,n)=>{t.fillStyle="#000",t.fillRect(0,0,e,n),t.fillStyle="#fff",t.beginPath(),t.roundRect(0,0,e,n,9),t.fill(),t.fillStyle="#000";const s=5.92/_s*e,r=3.08/xs*n;if(t.fillRect((e-s)/2,(n-r)/2,s,r),i)for(const a of be)t.beginPath(),t.ellipse((a.x/_s+.5)*e,(a.z/xs+.5)*n,(zi+.002)/_s*e,(zi+.002)/xs*n,0,0,Math.PI*2),t.fill()})}function rn(i,t,e,n,s=0,r=0,a=0,o=!1){const c=new Nt(o?new qo(i,t,e,2,Math.min(t/3,.055)):new _n(i,t,e),n);return c.position.set(s,r,a),c.castShadow=!0,c.receiveShadow=!0,c}class pv{constructor(t){this.scene=t,this.group=new Ee,this.group.name="Walnut tournament table",t.add(this.group);const e=ov(),n=gh();this.cloth=new ne({color:"#087f75",map:e,bumpMap:e,bumpScale:.0015,roughness:.94}),this.cushionMaterial=new ne({color:"#09695f",map:e,roughness:.88}),this.woodMaterial=new ne({color:"#b69979",map:n,roughness:.28,metalness:.08}),this.apronMaterial=new ne({color:"#785943",map:n,roughness:.43}),this.brass=new ne({color:"#c4a775",roughness:.28,metalness:.75}),this.dark=new ne({color:"#15241e",roughness:.54}),this.leather=new ne({color:"#231c16",roughness:.86}),this.build(),this.setMode(!0)}build(){const t=this.group;this.poolBed=this.buildBed(!0),this.caromBed=this.buildBed(!1),t.add(this.poolBed,this.caromBed),t.add(rn(6.32,.028,3.52,this.brass,0,-.258,0,!0)),t.add(rn(6.2,.31,3.42,this.apronMaterial,0,-.41,0,!0)),t.add(rn(6.23,.042,3.45,this.dark,0,-.58,0,!0));for(const r of[-1,1]){for(const a of[-1.65,1.65])t.add(rn(2.35,.18,.017,this.dark,a,-.405,r*1.717)),t.add(rn(2.36,.009,.019,this.brass,a,-.5,r*1.72));t.add(rn(.017,.18,2.5,this.dark,r*3.11,-.405,0)),t.add(rn(.019,.009,2.51,this.brass,r*3.112,-.5,0))}for(const r of[-2.3,2.3])for(const a of[-1.1,1.1]){t.add(rn(.4,.13,.4,this.dark,r,-.61,a,!0));const o=new Nt(new Qe(.23,.16,.43,4),this.apronMaterial);o.rotation.y=Math.PI/4,o.position.set(r,-.865,a),o.castShadow=!0,t.add(o),t.add(rn(.28,.055,.28,this.brass,r,-1.062,a,!0))}t.add(rn(4.7,.12,.14,this.apronMaterial,0,-.88,0,!0));for(const r of[-2.3,2.3])t.add(rn(.15,.12,2.25,this.apronMaterial,r,-.88,0,!0));const e=new Ho(.033,0);for(const r of[-1,1]){for(const a of[-2.1,-1.4,-.7,.7,1.4,2.1]){const o=new Nt(e,this.brass);o.scale.y=.13,o.rotation.y=Math.PI/4,o.position.set(a,.018,r*1.69),t.add(o)}for(const a of[-.7,0,.7]){const o=new Nt(e,this.brass);o.scale.y=.13,o.rotation.y=Math.PI/4,o.position.set(r*3.065,.018,a),t.add(o)}}const n=new Be({color:"#d3e8ce",transparent:!0,opacity:.38,depthWrite:!1});for(const r of[-1.4,1.4]){const a=new Nt(new qi(.012,.02,20),n);a.rotation.x=-Math.PI/2,a.position.set(r,.007,0),t.add(a)}const s=new Me().setFromPoints([new C(-1.4,.007,-1.37),new C(-1.4,.007,1.37)]);t.add(new xr(s,new Fo({color:"#d1e1c9",transparent:!0,opacity:.09}))),this.buildBadge(),this.rails=new Ee,t.add(this.rails),this.poolRails=this.buildRails(!0),this.caromRails=this.buildRails(!1),this.rails.add(this.poolRails,this.caromRails),this.buildPockets()}buildBadge(){const t=ke(512,128,(n,s,r)=>{n.fillStyle="#aa8e58",n.fillRect(0,0,s,r),n.strokeStyle="#463a26",n.lineWidth=2,n.strokeRect(7,7,s-14,r-14),n.fillStyle="#2c3026",n.font="italic 59px Georgia",n.textAlign="center",n.fillText("velvet",s/2,75),n.font="11px Georgia",n.fillText("T O U R N A M E N T   S E R I E S",s/2,102)}),e=new Nt(new Ge(.58,.145),new ne({map:t,metalness:.35,roughness:.4}));e.position.set(0,-.405,1.724),this.group.add(e)}cushion(t,e){const n=new Pr;e.forEach(([a,o],c)=>c?n.lineTo(a,-o):n.moveTo(a,-o)),n.closePath();const s=new Lr(n,{depth:.07,bevelEnabled:!0,bevelSegments:1,steps:1,bevelSize:.012,bevelThickness:.012}),r=new Nt(s,this.cushionMaterial);r.rotation.x=-Math.PI/2,r.position.y=-.008,r.castShadow=!0,r.receiveShadow=!0,t.add(r)}buildRails(t){const e=new Ee,n=t?[[-2.65,-.16],[.16,2.65]]:[[-2.82,2.82]];for(const s of[-1,1]){for(const[o,c]of n){const l=t?.065:0;this.cushion(e,[[o+l,s*1.4],[c-l,s*1.4],[c,s*1.535],[o,s*1.535]])}const r=t?1.21:1.4,a=t?.075:0;this.cushion(e,[[s*2.8,-r+a],[s*2.8,r-a],[s*2.935,r],[s*2.935,-r]])}return e}buildBed(t){const e=new Ee,n=new Nt(uv(t),this.woodMaterial);n.name=t?"Perforated slate bed":"Solid carom bed",n.rotation.x=-Math.PI/2,n.position.y=-.245,n.castShadow=n.receiveShadow=!0,e.add(n);const s=new Nt(dv(t),this.cloth);s.name=t?"Felt with six recessed openings":"Continuous carom felt",s.rotation.x=-Math.PI/2,s.position.y=.003,s.receiveShadow=!0,e.add(s);const r=this.woodMaterial.clone();r.alphaMap=fv(t),r.alphaTest=.5;const a=new Nt(new Ge(_s,xs),r);return a.name="Flush wooden pocket surround",a.rotation.x=-Math.PI/2,a.position.y=.012,a.receiveShadow=!0,e.add(a),e}buildPockets(){this.pocketGroup=new Ee,this.group.add(this.pocketGroup);const t=new ne({color:"#211b17",roughness:.95,side:Pe}),e=new Qe(zi-.001,.13,.22,40,1,!0),n=new Rr(.131,40),s=new Be({color:"#030807"}),r=new qi(zi-.009,zi,40);be.forEach((a,o)=>{const c=new Nt(e,t);c.position.set(a.x,-.109,a.z),this.pocketGroup.add(c);const l=new Nt(n,s);l.rotation.x=-Math.PI/2,l.position.set(a.x,-.22,a.z),this.pocketGroup.add(l);const h=new Nt(r,this.leather);h.rotation.x=-Math.PI/2,h.position.set(a.x,.001,a.z),this.pocketGroup.add(h);const u=ke(64,64,d=>{d.fillStyle="#dfcb9d",d.font="500 40px Georgia",d.textAlign="center",d.textBaseline="middle",d.fillText(String(o+1),32,32)}),f=new Nt(new Ge(.1,.1),new Be({map:u,transparent:!0,depthWrite:!1}));f.rotation.x=-Math.PI/2,f.position.set(a.x+(a.x?Math.sign(a.x)*.22:0),.015,a.z+Math.sign(a.z)*.25),this.pocketGroup.add(f)})}setMode(t){this.pockets=t,this.poolBed.visible=t,this.caromBed.visible=!t,this.pocketGroup.visible=t,this.poolRails.visible=t,this.caromRails.visible=!t}setColor(t){this.cloth.color.set(t),this.cushionMaterial.color.set(t).multiplyScalar(.78)}dispose(){Yo(this.group)}}function _c(i,t=!1,e="medium"){const n=document.createElement("canvas");n.width=e==="low"?512:1024,n.height=n.width/2;const s=n.getContext("2d");s.scale(n.width/1024,n.height/512);const r=t?["#faf7e9","#e9b724","#d6483f"][i]:i===8?"#11191b":i===0?"#fcfaf3":Ec[i]||"#ffffff";if(s.fillStyle=r,s.fillRect(0,0,1024,512),!t&&i>8&&(s.fillStyle="#faf7ee",s.fillRect(0,0,1024,126),s.fillRect(0,386,1024,126)),!t&&i!==0)for(const o of[256,768])s.fillStyle="#fffcf2",s.beginPath(),s.ellipse(o,256,67,67,0,0,Math.PI*2),s.fill(),s.strokeStyle="#a18d5d7a",s.lineWidth=2,s.stroke(),s.fillStyle="#14231e",s.font="700 84px Arial",s.textAlign="center",s.textBaseline="middle",s.fillText(String(i),o,260);const a=new Oo(n);return a.colorSpace=Oe,a.anisotropy=4,a}function mv(){const i=document.createElement("canvas");i.width=i.height=64;const t=i.getContext("2d"),e=t.createRadialGradient(32,32,2,32,32,32);return e.addColorStop(0,"rgba(0,0,0,.8)"),e.addColorStop(.45,"rgba(0,0,0,.4)"),e.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=e,t.fillRect(0,0,64,64),new Oo(i)}class gv{constructor(t){this.scene=t,this.meshes=new Map,this.geometry=new ui(Et.radius,36,24),this.shadowGeometry=new Ge(1,1),this.shadowTexture=mv(),this.carom=!1,this.quality="medium",this.ballStyle="gloss",this.axis=new C,this.up=new C(0,1,0),this.cueHalo=new Nt(new qi(Et.radius*1.18,Et.radius*1.3,40),new Be({color:"#f8e5a6",transparent:!0,opacity:.65,depthWrite:!1})),this.cueHalo.rotation.x=-Math.PI/2,this.cueHalo.position.y=.012,t.add(this.cueHalo)}create(t){const e=new ds({map:_c(t.id,this.carom,this.quality),metalness:0,ior:1.5,specularIntensity:.8,envMapIntensity:1.15});this.finish(e);const n=new Nt(this.geometry,e);n.castShadow=!0,n.receiveShadow=!0,n.rotation.set(-.95+(t.id%3-1)*.08,(t.id%4-1.5)*.14,(t.id%5-2)*.28);const s=Math.max(0,t.height||0);n.position.set(t.x,(t.radius||Et.radius)+.008+s,t.z),this.scene.add(n);const r=new Nt(this.shadowGeometry,new Be({map:this.shadowTexture,transparent:!0,opacity:.24,depthWrite:!1,toneMapped:!1}));r.rotation.x=-Math.PI/2,r.position.set(t.x,.009,t.z),this.scene.add(r);const a={mesh:n,shadow:r,lastX:t.x,lastZ:t.z,lastHeight:s,sinkHeight:s,sink:0,active:t.active!==!1};return this.meshes.set(t.id,a),a}sync(t,e,n){let s=!1;const r=new Set(t.map(o=>o.id));for(const[o,c]of this.meshes)r.has(o)||(this.remove(c),this.meshes.delete(o),s=!0);for(const o of t){this.meshes.has(o.id)||(s=!0);const c=this.meshes.get(o.id)||this.create(o),l=c.mesh,h=o.x-c.lastX,u=o.z-c.lastZ,f=Math.hypot(h,u),d=Math.max(0,o.height||0);(f>0||c.lastHeight!==d||c.active!==(o.active!==!1))&&(s=!0),f>1e-6&&f<.5&&(this.axis.set(u,0,-h).normalize(),l.rotateOnWorldAxis(this.axis,f/(o.radius||Et.radius))),c.lastX=o.x,c.lastZ=o.z,c.lastHeight=d,o.active===!1?(c.active&&(c.sinkHeight=d),c.sink<1&&(s=!0),c.sink=Math.min(1,c.sink+n*2.5),l.position.set(o.x,(o.radius||Et.radius)+.008+c.sinkHeight-c.sink*.37,o.z),l.scale.setScalar(Math.max(.05,1-c.sink*.7)),l.visible=c.sink<1):(c.sink=0,l.visible=!0,l.scale.setScalar(1),l.position.set(o.x,(o.radius||Et.radius)+.008+d,o.z)),c.shadow.visible=o.active!==!1,c.shadow.position.set(o.x,.009,o.z),c.shadow.scale.setScalar((o.radius||Et.radius)*(2.8+d*4)),c.shadow.material.opacity=.24/(1+d*5),c.active=o.active!==!1}const a=t.find(o=>o.id===e&&o.active!==!1);return this.cueHalo.visible=!!a,a&&(this.cueHalo.position.x=a.x,this.cueHalo.position.z=a.z),s}setMode(t){this.carom!==t&&(this.carom=t,this.reset())}setStyle(t){this.ballStyle=t;for(const{mesh:e}of this.meshes.values())this.finish(e.material)}finish(t){const e=this.ballStyle!=="classic";t.roughness=e?.12:.24,t.clearcoat=this.quality==="low"?.45:e?1:.8,t.clearcoatRoughness=e?.065:.14}setQuality(t){if(this.quality===t)return;const e=this.quality==="low"!=(t==="low");this.quality=t;const n=this.geometry;this.geometry=new ui(Et.radius,t==="low"?24:t==="high"?48:36,t==="low"?16:t==="high"?32:24);for(const[s,{mesh:r}]of this.meshes)r.geometry=this.geometry,e&&(r.material.map.dispose(),r.material.map=_c(s,this.carom,t),r.material.needsUpdate=!0),this.finish(r.material);n.dispose()}reset(){for(const t of this.meshes.values())this.remove(t);this.meshes.clear()}remove({mesh:t,shadow:e}){this.scene.remove(t),t.material.map?.dispose(),t.material.dispose(),this.scene.remove(e),e.material.dispose()}dispose(){this.reset(),this.geometry.dispose(),this.shadowGeometry.dispose(),this.shadowTexture.dispose(),this.cueHalo.geometry.dispose(),this.cueHalo.material.dispose(),this.scene.remove(this.cueHalo)}}const fr=-1.1;class vv{constructor(t){this.scene=t,this.group=new Ee,this.group.name="Velvet billiards club",t.add(this.group),this.brass=new ne({color:"#b19460",metalness:.72,roughness:.3}),this.dark=new ne({color:"#13201d",roughness:.65}),this.walnut=new ne({map:gh(),color:"#98785f",roughness:.54}),this.walls=[],this.buildFloor(),this.buildWalls(),this.buildPendant(),this.corner=new C,this.tableBounds=new Yl,this.lampBounds=new Yl,this.projected=new nt}box(t,e,n,s,r,a,o,c){const l=new Nt(new _n(e,n,s),r);return l.position.set(a,o,c),l.receiveShadow=!0,t.add(l),l}buildFloor(){const t=new Nt(new Ge(36,36),new ne({map:lv(),roughness:.74,color:"#c0ab95"}));t.rotation.x=-Math.PI/2,t.position.y=fr,t.receiveShadow=!0,this.group.add(t),this.floor=t;const e=new Nt(new Ge(8.5,5.7),new ne({map:cv(),roughness:1}));e.position.y=fr+.008,e.rotation.x=-Math.PI/2,e.receiveShadow=!0,this.group.add(e);const n=new Nt(new Ge(8.4,5.2),new Be({map:hv(),transparent:!0,depthWrite:!1,opacity:.85}));n.rotation.x=-Math.PI/2,n.position.y=fr+.012,this.group.add(n)}buildWalls(){const t=new ne({color:"#1e3732",roughness:.96});for(const[e,n,s]of[[0,3.8,12.6],[Math.PI,5.4,12.6],[Math.PI/2,6.3,9.2],[-Math.PI/2,6.3,9.2]]){const r=new Ee;r.rotation.y=e,r.position.set(-Math.sin(e)*n,0,-Math.cos(e)*n),this.group.add(r),this.walls.push(r),this.box(r,s,4.6,.16,t,0,1.2,-.08),this.box(r,s,1.1,.13,this.walnut,0,-.55,.06),this.box(r,s,.11,.2,this.dark,0,fr+.055,.12),this.box(r,s,.09,.19,this.walnut,0,.03,.12),this.box(r,s,.012,.2,this.brass,0,.09,.13);const a=Math.floor(s/1.25);for(let o=1;o<a;o++)this.box(r,.035,.95,.035,this.dark,(o/a-.5)*s,-.52,.14);for(const o of[-3.3,3.3])this.sconce(r,o);e===0&&(this.sign(r),this.cueRack(r,-4.7),this.framedArt(r,4.7))}}sconce(t,e){this.box(t,.13,.65,.07,this.brass,e,1.17,.14);const n=new Be({color:"#ffe4a6"});this.box(t,.065,.42,.09,n,e,1.2,.2);const s=ke(128,256,(a,o,c)=>{const l=a.createRadialGradient(o/2,c/2,0,o/2,c/2,o/2);l.addColorStop(0,"#edb56345"),l.addColorStop(1,"#edb56300"),a.fillStyle=l,a.scale(1,2),a.fillRect(0,0,o,c/2)}),r=new Nt(new Ge(1.1,2.2),new Be({map:s,transparent:!0,depthWrite:!1,blending:Ma}));r.position.set(e,1.2,.015),t.add(r)}sign(t){const e=ke(1024,384,(s,r,a)=>{s.fillStyle="#112b26",s.fillRect(0,0,r,a),s.strokeStyle="#9a8054",s.lineWidth=2,s.strokeRect(14,14,r-28,a-28),s.textAlign="center",s.fillStyle="#ddc797",s.font="italic 150px Georgia",s.fillText("velvet",r/2,210),s.fillStyle="#b8a783",s.font="22px Georgia",s.fillText("B I L L I A R D S   C L U B",r/2,275),s.strokeStyle="#9a8054",s.beginPath(),s.moveTo(210,308),s.lineTo(814,308),s.stroke()});this.box(t,3.15,1.19,.06,this.brass,0,.9,.12);const n=new Nt(new Ge(3.06,1.1),new Be({map:e}));n.position.set(0,.9,.156),t.add(n)}cueRack(t,e){const n=new Ee;n.position.set(e,0,.2),t.add(n);const s=new ne({color:"#c1a16d",roughness:.5});for(const r of[-.89,.39,1.17])this.box(n,1.12,.065,.15,this.walnut,0,r,.03);for(let r=0;r<6;r++){const a=new Nt(new Qe(.013,.022,1.37,8),s);a.position.set(-.43+r*.17,.71,.04),n.add(a);const o=new Nt(new Qe(.022,.027,.94,8),this.dark);o.position.set(a.position.x,-.445,.04),n.add(o)}n.name="House cue rack"}framedArt(t,e){const n=ke(256,384,(r,a,o)=>{r.fillStyle="#142723",r.fillRect(0,0,a,o),r.strokeStyle="#bfa36f",r.lineWidth=1.5,r.strokeRect(20,20,a-40,o-40),r.beginPath(),r.moveTo(55,250),r.lineTo(176,75),r.lineTo(187,278),r.stroke();for(const[c,l,h]of[[55,250,13],[176,75,8],[187,278,16]])r.fillStyle="#c8b382",r.beginPath(),r.arc(c,l,h,0,Math.PI*2),r.fill();r.font="12px Georgia",r.textAlign="center",r.fillText("THE ART OF ANGLES",a/2,328)});this.box(t,1.02,1.5,.045,this.brass,e,1.16,.1);const s=new Nt(new Ge(.95,1.43),new Be({map:n}));s.position.set(e,1.16,.126),t.add(s)}buildPendant(){const t=this.pendant=new Ee;t.name="Brass and green billiard lamps",this.group.add(t);const e=new ne({color:"#183c30",metalness:.32,roughness:.3,side:dn}),n=new Be({color:"#ffe8b4"}),s=new Nt(new Qe(.022,.022,4.4,10),this.brass);s.rotation.z=Math.PI/2,s.position.set(0,2.5,-2.15),t.add(s);for(const a of[-1.65,0,1.65]){const o=new Nt(new Qe(.105,.43,.28,32,1,!0),e);o.position.set(a,2.04,-2.15),t.add(o);const c=new Nt(new Vo(.43,.013,6,32),this.brass);c.rotation.x=Math.PI/2,c.position.set(a,1.9,-2.15),t.add(c);const l=new Nt(new Rr(.405,32),n);l.rotation.x=Math.PI/2,l.position.set(a,1.905,-2.15),t.add(l);const h=new Nt(new Qe(.014,.014,.32,8),this.brass);h.position.set(a,2.34,-2.15),t.add(h)}const r=new ne({color:"#151c18",roughness:.75});for(const a of[-1.5,1.5]){const o=new Nt(new Qe(.009,.009,1.4,6),r);o.position.set(a,3.2,-2.15),t.add(o)}}setCamera(t,e){for(const r of this.walls){const a=Math.sin(r.rotation.y),o=Math.cos(r.rotation.y);r.visible=t.position.x*a+t.position.z*o>-.05}const n=this.tableBounds.makeEmpty(),s=this.lampBounds.makeEmpty();for(const r of[-3.22,3.22])for(const a of[-1.8,1.8])this.corner.set(r,.12,a).project(t),n.expandByPoint(this.projected.set(this.corner.x,this.corner.y));for(const r of[-2.2,2.2])for(const a of[1.88,3.9])for(const o of[-2.6,-1.7])this.corner.set(r,a,o).project(t),s.expandByPoint(this.projected.set(this.corner.x,this.corner.y));this.pendant.visible=e!=="top"&&!n.intersectsBox(s)}setQuality(t){for(const e of this.walls)for(const n of e.children)n.name==="House cue rack"&&(n.visible=t!=="low")}dispose(){Yo(this.group)}}class _v extends Kc{constructor(){super();const t=new _n;t.deleteAttribute("uv");const e=new ne({side:Pe}),n=new ne,s=new yf(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new Nt(t,e);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const a=new Pd(t,n,6),o=new ye;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);const c=new Nt(t,Ni(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);const l=new Nt(t,Ni(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);const h=new Nt(t,Ni(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);const u=new Nt(t,Ni(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);const f=new Nt(t,Ni(20));f.position.set(3.235,11.486,-12.541),f.scale.set(2.5,2,.1),this.add(f);const d=new Nt(t,Ni(100));d.position.set(0,20,0),d.scale.set(1,.1,1),this.add(d)}dispose(){const t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(const e of t)e.dispose()}}function Ni(i){return new mf({color:0,emissive:16777215,emissiveIntensity:i})}const xv=new C(0,1,0);class yv{constructor(t){this.group=new Ee,this.group.name="Billiards players",t.add(this.group),this.sphere=new ui(1,16,12),this.cylinder=new Qe(1,1,1,10),this.box=new _n(1,1,1),this.vector=new C,this.people=[this.create(0),this.create(1)],this.states=[0,1].map(()=>({position:new C,forward:new C(0,0,1),focus:new C,valid:!1})),this.activeSeat=null}mesh(t,e,n,s,r){const a=new Nt(e,n);return a.scale.set(...s),a.position.set(...r),a.castShadow=!0,a.receiveShadow=!0,t.add(a),a}create(t){const e=new Ee,n=new Ee;e.name=`Player ${t+1}`,e.userData.seat=t,e.add(n),this.group.add(e);const s=new ne({color:t===0?"#315d8b":"#873b4d",roughness:.85}),r=new ne({color:"#e6e1cc",roughness:.9}),a=new ne({color:"#202c2b",roughness:.9}),o=new ne({color:t===0?"#c99876":"#d8ac87",roughness:.72}),c=new ne({color:t===0?"#251c17":"#352622",roughness:.8}),l=new ne({color:"#151e1c",roughness:.6});for(const v of[-1,1])this.mesh(e,this.cylinder,a,[.095,.7,.1],[v*.12,-.65,0]),this.mesh(e,this.box,l,[.16,.1,.3],[v*.12,-1.045,.07]);this.mesh(e,this.sphere,a,[.21,.18,.14],[0,-.29,0]),this.mesh(n,this.sphere,s,[.25,.38,.16],[0,.05,0]),this.mesh(n,this.box,r,[.09,.25,.018],[0,.25,.15]),this.mesh(n,this.box,s,[.06,.07,.025],[0,.3,.17]),this.mesh(n,this.cylinder,o,[.07,.13,.07],[0,.43,0]);const h=new Ee;n.add(h);const u=new ye;u.position.set(0,.64,.19),n.add(u),this.mesh(h,this.sphere,o,[.155,.19,.15],[0,.64,.015]);const f=new ui(1,16,8,0,Math.PI*2,0,Math.PI*.48);this.mesh(h,f,c,[.16,.19,.155],[0,.66,.008]);for(const v of[-1,1])this.mesh(h,this.sphere,o,[.03,.05,.025],[v*.154,.63,0]),this.mesh(h,this.sphere,r,[.029,.018,.012],[v*.055,.645,.153]),this.mesh(h,this.sphere,l,[.011,.013,.009],[v*.055,.645,.164]),this.mesh(h,this.box,c,[.06,.009,.008],[v*.055,.677,.151]);this.mesh(h,this.sphere,o,[.026,.03,.032],[0,.608,.165]),this.mesh(h,this.box,c,[.046,.007,.008],[0,.563,.155]);const d=[-1,1].map(v=>({side:v,upper:this.mesh(n,this.cylinder,r,[.07,.3,.07],[0,0,0]),lower:this.mesh(n,this.cylinder,o,[.05,.3,.05],[0,0,0]),hand:this.mesh(n,this.sphere,o,[.055,.055,.065],[0,0,0])})),g=new Ad(new Jc({transparent:!0,depthTest:!0}));return g.scale.set(.9,.2,1),g.position.y=1.04,e.add(g),{root:e,upper:n,head:h,eye:u,arms:d,label:g,name:null,active:null}}bone(t,e,n,s){this.vector.subVectors(n,e),t.position.copy(e).add(n).multiplyScalar(.5),t.scale.set(s,this.vector.length(),s),t.quaternion.setFromUnitVectors(xv,this.vector.normalize())}pose(t,e){if(t.active===e)return!1;t.active=e,t.upper.rotation.x=e?.18:0,t.upper.position.z=e?.14:0;const n=new C,s=new C,r=new C;for(const a of t.arms){const o=a.side;n.set(o*.23,.3,0),s.set(o*.31,e?.06:-.03,e?.27:.02),r.set(e?o*.12:o*.3,e?o<0?.2:.14:-.37,e?o<0?.77:.4:.1),this.bone(a.upper,n,s,.065),this.bone(a.lower,s,r,.045),a.hand.position.copy(r)}return!0}name(t,e,n){return t.name===e?!1:(t.name=e,t.root.userData.playerName=e,t.label.material.map?.dispose(),t.label.material.map=ke(512,112,(s,r,a)=>{s.fillStyle="#10271ee6",s.beginPath(),s.roundRect(0,0,r,a,18),s.fill(),s.strokeStyle=n===0?"#7298c3":"#cb8a9d",s.lineWidth=4,s.stroke(),s.fillStyle="#f2e9d1",s.font="500 32px sans-serif",s.textAlign="center",s.textBaseline="middle",s.fillText(e,r/2,a/2,r-28)}),t.label.material.needsUpdate=!0,!0)}sync({cue:t,angle:e,activeSeat:n,names:s,aiming:r,view:a,followSeat:o}){let c=!1;const l=this.states[n];if(r||!l.valid||this.activeSeat!==n||this.lastAngle!==e){const h=t?.active!==!1?t?.x??0:0,u=t?.active!==!1?t?.z??0:0,f=Math.cos(e),d=Math.sin(e),g=Math.abs(f)>1e-8?(h+Math.sign(f)*3.6)/f:1/0,v=Math.abs(d)>1e-8?(u+Math.sign(d)*2.2)/d:1/0,m=Math.min(g,v),p=h-f*m,S=u-d*m;(!l.valid||Math.hypot(l.position.x-p,l.position.z-S)>1e-7||l.forward.x!==f||l.forward.z!==d||Math.abs(l.focus.x-h-f*.5)>1e-7||Math.abs(l.focus.z-u-d*.5)>1e-7)&&(c=!0),l.position.set(p,0,S),l.forward.set(f,0,d),l.focus.set(h+f*.5,.07,u+d*.5),l.valid=!0;const b=this.states[1-n],x=1-n,A=x===0?-3.7:3.7;let T=x===0?-.65:.65;Math.hypot(A-p,T-S)<.85&&(T=-Math.sign(T)*1.1),b.position.set(A,0,T),b.forward.set(-A,0,-T).normalize(),b.focus.set(h,.07,u),b.valid=!0}this.activeSeat!==n&&(c=!0),this.activeSeat=n,this.lastAngle=e;for(let h=0;h<2;h++){const u=this.people[h],f=this.states[h];this.name(u,s[h],h)&&(c=!0),this.pose(u,h===n)&&(c=!0),u.root.position.copy(f.position),u.root.rotation.y=Math.atan2(f.forward.x,f.forward.z);const d=a!=="top"&&!(a==="first"&&h===o);u.root.visible!==d&&(c=!0),u.root.visible=d;const g=!(["first","third"].includes(a)&&h===o);u.label.visible!==g&&(c=!0),u.label.visible=g}return c}dispose(){Yo(this.group)}}function Mv(){return ke(256,512,(i,t,e)=>{i.fillStyle="#e0bf82",i.fillRect(0,0,t,e);for(let n=0;n<100;n++){const s=n*73%t,r=n%7*.8;i.strokeStyle=n%3?"#78512116":"#fff0c32b",i.lineWidth=.4+n%3*.3,i.beginPath(),i.moveTo(s,0),i.bezierCurveTo(s+r,e*.3,s-r,e*.7,s+1,e),i.stroke()}})}function Sv(){return ke(512,512,(i,t,e)=>{i.fillStyle="#15201c",i.fillRect(0,0,t,e);for(let n=0;n<4;n++){const s=n*128+64;i.beginPath(),i.moveTo(s-39,35),i.lineTo(s+39,35),i.lineTo(s,458),i.closePath(),i.fillStyle="#d8c49a",i.fill(),i.strokeStyle="#b99d65",i.lineWidth=4,i.stroke(),i.beginPath(),i.moveTo(s-15,54),i.lineTo(s+15,54),i.lineTo(s,301),i.closePath(),i.fillStyle="#26352d",i.fill()}})}function bv(){return ke(128,256,(i,t,e)=>{i.fillStyle="#252b26",i.fillRect(0,0,t,e);for(let n=-t;n<e+t;n+=7)i.strokeStyle="#4c51452b",i.lineWidth=1,i.beginPath(),i.moveTo(0,n),i.lineTo(t,n+t*.22),i.stroke(),i.strokeStyle="#050c0840",i.beginPath(),i.moveTo(0,n+2),i.lineTo(t,n+t*.22+2),i.stroke()})}function Ev(){const i=new Ee;i.name="Ebony and ivory club cue";const t=Mv(),e=bv(),n=new ds({map:t,roughness:.28,clearcoat:.8,clearcoatRoughness:.16}),s=new ds({color:"#17221e",roughness:.2,clearcoat:.8,clearcoatRoughness:.12}),r=new ds({map:Sv(),roughness:.24,clearcoat:.85,clearcoatRoughness:.14}),a=new ne({map:e,bumpMap:e,bumpScale:5e-4,roughness:.76}),o=new ne({color:"#c2a576",metalness:.82,roughness:.26}),c=new ds({color:"#f2e8cf",roughness:.24,clearcoat:.5}),l=new ne({color:"#101814",roughness:.9}),h=new ne({color:"#518c99",roughness:.95}),u=(d,g,v,m,p)=>{const S=new Nt(new Qe(d,g,v,24),p);return S.rotation.z=Math.PI/2,S.position.set(m,.055,0),S.castShadow=!0,i.add(S),S};u(.022,.012,.92,-.66,n),u(.029,.022,.32,-1.28,r),u(.033,.029,.29,-1.585,a),u(.034,.033,.11,-1.785,s),u(.034,.034,.018,-1.85,l);for(const[d,g,v]of[[-1.115,.023,.012],[-1.14,.0235,.008],[-1.435,.0295,.009],[-1.455,.03,.006],[-1.73,.0335,.008],[-1.755,.034,.009],[-1.827,.0345,.012]])u(g,g,v,d,o);u(.012,.012,.055,-.172,c);const f=u(.013,.013,.016,-.136,h);return{group:i,tip:f}}class wv{constructor(t,e={}){this.container=t,this.callbacks=e,this.dirty=!0,this.scene=new Kc,this.renderer=new av({antialias:!0,alpha:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.75)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Lc,this.renderer.outputColorSpace=Oe,this.renderer.toneMapping=Ic,this.renderer.toneMappingExposure=1.05,this.canvas=this.renderer.domElement,this.canvas.setAttribute("aria-label","Interactive 3D billiards table"),this.canvas.style.touchAction="none",t.append(this.canvas),this.camera=new Ye(38,1,.05,60),this.target=new C(0,.12,0),this.azimuth=0,this.elevation=.74,this.zoomLevel=1,this.sensitivity=1,this.view="angle",this.follow="self",this.followSeat=0,this.playerYaw=this.playerPitch=0,this.playerContext={activeSeat:0,localSeat:0,names:["Người chơi 1","Người chơi 2"]},this.playerLook=new C,this.aimGuide=!0,this.showAim=!0,this.power=.4,this.angle=0,this.jump=0,this.balls=[],this.cueId=0,this.lastTime=performance.now(),this.shooting=0,this.raycaster=new bf,this.pointer=new nt,this.plane=new kn(new C(0,1,0),0),this.intersection=new C,this.setupLights(),this.environment=new vv(this.scene),this.floor=this.environment.floor,this.table=new pv(this.scene),this.ballRenderer=new gv(this.scene),this.playerRenderer=new yv(this.scene),this.buildCue(),this.cueLocalTip=new C,this.buildGuide(),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(t),this.resize()}setupLights(){this.scene.background=new qt("#15231f"),this.scene.fog=new No("#15231f",16,34),this.scene.add(new _f("#f5e8d3","#283b32",.85));const t=new Vl("#fff0d4",2.7);t.position.set(-1.8,6,1.2),t.castShadow=!0,t.shadow.mapSize.set(1024,1024),Object.assign(t.shadow.camera,{left:-4,right:4,top:3,bottom:-3,near:1,far:15}),t.shadow.bias=-4e-4,t.shadow.normalBias=.018,t.shadow.radius=3,this.scene.add(t),this.keyLight=t;const e=new Vl("#cbe7ee",.65);e.position.set(4,3,-4),this.scene.add(e);const n=new mo(this.renderer),s=new _v;this.reflections=n.fromScene(s,.04),this.scene.environment=this.reflections.texture,this.scene.environmentIntensity=.38,s.dispose(),n.dispose()}buildCue(){const t=Ev();this.cue=t.group,this.cueTip=t.tip,this.scene.add(this.cue)}buildGuide(){this.cueGapPositions=new Float32Array(6),this.cueGapGeometry=new Me,this.cueGapGeometry.setAttribute("position",new ze(this.cueGapPositions,3)),this.cueGapLine=new xr(this.cueGapGeometry,new da({color:"#fff4ce",dashSize:.025,gapSize:.018,transparent:!0,opacity:.85,depthTest:!1})),this.cueGapLine.frustumCulled=!1,this.cueGapLine.renderOrder=2,this.cueGapLine.visible=!1,this.cueGapStart=new C,this.scene.add(this.cueGapLine),this.guideGroup=new Ee,this.scene.add(this.guideGroup),this.guideGeometry=new Me,this.guidePositions=new Float32Array(6),this.guideGeometry.setAttribute("position",new ze(this.guidePositions,3)),this.guideLine=new xr(this.guideGeometry,new da({color:"#fff4ce",dashSize:.055,gapSize:.04,transparent:!0,opacity:.72,depthTest:!1})),this.guideLine.renderOrder=2,this.guideGroup.add(this.guideLine),this.objectGeometry=new Me,this.objectPositions=new Float32Array(6),this.objectGeometry.setAttribute("position",new ze(this.objectPositions,3)),this.objectLine=new xr(this.objectGeometry,new da({color:"#ecce83",dashSize:.035,gapSize:.035,transparent:!0,opacity:.8,depthTest:!1})),this.objectLine.renderOrder=2,this.guideGroup.add(this.objectLine),this.ghost=new Nt(new ui(Et.radius,20,12),new Be({color:"#fff5d7",transparent:!0,opacity:.2,depthWrite:!1})),this.guideGroup.add(this.ghost),this.hitRing=new Nt(new qi(Et.radius*1.1,Et.radius*1.18,30),new Be({color:"#f3d88e",transparent:!0,opacity:.85,depthWrite:!1})),this.hitRing.rotation.x=-Math.PI/2,this.guideGroup.add(this.hitRing)}setMode(t){this.dirty=!0,this.table.setMode(t),this.ballRenderer.setMode(!t),this.pockets=t}sync(t,e,n=1/60){this.cueId!==e&&(this.dirty=!0),this.balls=t,this.cueId=e,this.ballRenderer.sync(t,e,Math.min(n,.1))&&(this.dirty=!0),this.updateAim()}setAim(t,e,n={},s=!0,r=0){r=Math.max(0,Math.min(1,Number(r)||0)),(this.angle!==t||this.power!==e||this.showAim!==s||this.jump!==r||this.spin?.x!==n.x||this.spin?.y!==n.y)&&(this.dirty=!0),this.angle=t,this.power=e,this.spin=n,this.showAim&&!s&&(this.shootJump=this.jump,this.shooting=.22,this.shootOrigin=this.balls.find(a=>a.id===this.cueId),this.shootOrigin&&(this.shootOrigin={x:this.shootOrigin.x,z:this.shootOrigin.z,height:this.shootOrigin.height||0})),this.jump=r,this.showAim=s,this.updateAim()}updateAim(){const t=this.balls.find(u=>u.id===this.cueId&&u.active!==!1);if(this.guideGroup.visible=!!(t&&this.showAim&&this.aimGuide&&!this.jump),this.cueGapLine.visible=!!(t&&this.showAim&&(!this.aimGuide||this.jump)),this.cue.visible=!!(t&&this.showAim||this.shooting>0),this.ballRenderer.cueHalo.visible=!!(t&&this.showAim),!t)return;const e=Math.cos(this.angle),n=Math.sin(this.angle),s=.08+this.power*.34;if(this.showAim&&this.positionCue(t,s,this.jump),this.cueGapLine.visible){this.cueTip.localToWorld(this.cueGapStart.set(0,-this.cueTip.geometry.parameters.height/2,0));const u=t.radius||Et.radius,f=this.jump?.18+this.jump*.65:0;this.cueGapPositions.set([this.cueGapStart.x,this.cueGapStart.y,this.cueGapStart.z,t.x-e*Math.cos(f)*u,u+.008+(t.height||0)+Math.sin(f)*u,t.z-n*Math.cos(f)*u]),this.cueGapGeometry.attributes.position.needsUpdate=!0,this.cueGapLine.computeLineDistances()}if(!this.guideGroup.visible)return;let r=1/0,a=null;for(const u of this.balls){if(u.id===t.id||u.active===!1)continue;const f=u.x-t.x,d=u.z-t.z,g=f*e+d*n;if(g<=0)continue;const v=f*f+d*d-g*g,m=(t.radius||Et.radius)+(u.radius||Et.radius);if(v>=m*m)continue;const p=g-Math.sqrt(Math.max(0,m*m-v));p>=0&&p<r&&(r=p,a=u)}const o=[e>0?(Et.halfWidth-Et.radius-t.x)/e:e<0?(-2.8+Et.radius-t.x)/e:1/0,n>0?(Et.halfHeight-Et.radius-t.z)/n:n<0?(-1.4+Et.radius-t.z)/n:1/0],c=Math.min(...o);c<r&&(r=c,a=null),r=Math.max(0,Math.min(r,7));const l=t.x+e*r,h=t.z+n*r;if(this.guidePositions.set([t.x,.02,t.z,l,.02,h]),this.guideGeometry.attributes.position.needsUpdate=!0,this.guideLine.computeLineDistances(),this.ghost.position.set(l,Et.radius+.01,h),this.ghost.visible=!!a,this.hitRing.visible=!!a,this.objectLine.visible=!0,a){const u=a.x-l,f=a.z-h,d=Math.hypot(u,f)||1;this.hitRing.position.set(a.x,.014,a.z),this.objectPositions.set([a.x,.02,a.z,a.x+u/d*.7,.02,a.z+f/d*.7])}else{let u=e,f=n;o[0]<o[1]?u=-u:f=-f,this.objectPositions.set([l,.02,h,l+u*.55,.02,h+f*.55])}this.objectGeometry.attributes.position.needsUpdate=!0,this.objectLine.computeLineDistances()}positionCue(t,e,n=0){const s=Math.cos(this.angle),r=Math.sin(this.angle),a=n?.18+n*.65:0;if(this.cue.rotation.set(0,-this.angle,-a),!n){this.cue.position.set(t.x-s*e,.014+(t.height||0),t.z-r*e);return}const o=e-this.cueTip.position.x-this.cueTip.geometry.parameters.height/2;this.cueLocalTip.set(this.cueTip.position.x+this.cueTip.geometry.parameters.height/2,this.cueTip.position.y,0).applyEuler(this.cue.rotation),this.cue.position.set(t.x-s*Math.cos(a)*o-this.cueLocalTip.x,(t.radius||Et.radius)+.008+(t.height||0)+Math.sin(a)*o-this.cueLocalTip.y,t.z-r*Math.cos(a)*o-this.cueLocalTip.z)}render(){const t=performance.now(),e=Math.min((t-this.lastTime)/1e3,.1);if(this.lastTime=t,this.shooting>0&&!this.showAim&&this.shootOrigin){this.dirty=!0,this.shooting-=e;const n=1-Math.max(0,this.shooting)/.22,s=n<.3?.3*(1-n/.3):.25*((n-.3)/.7);this.positionCue(this.shootOrigin,s,this.shootJump),this.cue.visible=this.shooting>0}this.dirty&&(this.renderer.render(this.scene,this.camera),this.dirty=!1)}screenToTable(t,e){const n=this.canvas.getBoundingClientRect();if(!n.width||!n.height)return null;this.pointer.set((t-n.left)/n.width*2-1,-((e-n.top)/n.height)*2+1),this.raycaster.setFromCamera(this.pointer,this.camera);const s=this.raycaster.ray.intersectPlane(this.plane,this.intersection);return s?{x:s.x,z:s.z}:null}setPlayers(t){this.playerContext=t,this.syncPlayers()}syncPlayers(){const t=this.playerContext,e=t.localSeat??0,n=this.follow==="turn"?t.activeSeat:this.follow==="opponent"?1-e:e,s=n!==this.followSeat;this.followSeat=n,(this.playerRenderer.sync({cue:this.balls.find(a=>a.id===this.cueId),angle:this.angle,activeSeat:t.activeSeat,names:t.names,aiming:this.showAim,view:this.view,followSeat:n})||s)&&(this.dirty=!0,(this.view==="first"||this.view==="third")&&this.updateCamera())}setFollow(t){["self","opponent","turn"].includes(t)&&(this.follow=t,this.playerYaw=this.playerPitch=0,this.syncPlayers(),this.updateCamera())}centerPlayerView(){this.playerYaw=this.playerPitch=0,this.updateCamera()}resize(){const t=this.container.clientWidth||800,e=this.container.clientHeight||500;this.renderer.setSize(t,e),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.updateCamera()}updateCamera(){this.dirty=!0;const t=this.view==="first"||this.view==="third",e=this.view==="first"?Mn.clamp(55*this.zoomLevel,30,75):this.view==="third"?45:38;this.camera.fov!==e&&(this.camera.fov=e,this.camera.updateProjectionMatrix());const n=this.playerRenderer.states[this.followSeat];if(t&&n.valid){if(this.view==="first"){this.playerRenderer.people[this.followSeat].eye.getWorldPosition(this.camera.position),this.playerLook.copy(n.focus).sub(this.camera.position);const u=Math.atan2(this.playerLook.x,this.playerLook.z)+this.playerYaw,f=Mn.clamp(Math.atan2(this.playerLook.y,Math.hypot(this.playerLook.x,this.playerLook.z))+this.playerPitch,-1.2,1.1);this.playerLook.set(Math.sin(u)*Math.cos(f),Math.sin(f),Math.cos(u)*Math.cos(f)).add(this.camera.position),this.camera.lookAt(this.playerLook)}else{const u=Math.atan2(n.forward.x,n.forward.z)+this.playerYaw,f=1.7*this.zoomLevel;this.camera.position.set(n.position.x-Math.sin(u)*f,1.1+.9*this.zoomLevel+this.playerPitch,n.position.z-Math.cos(u)*f),this.camera.lookAt(n.focus)}this.camera.updateMatrixWorld(),this.environment.setCamera(this.camera,this.view);return}const s=this.camera.aspect,r=Math.tan(Mn.degToRad(this.camera.fov/2)),a=6.55*Math.abs(Math.cos(this.azimuth))+3.7*Math.abs(Math.sin(this.azimuth)),o=3.7*Math.abs(Math.cos(this.azimuth))+6.55*Math.abs(Math.sin(this.azimuth)),c=this.view==="top"?Math.PI/2-.001:this.elevation,l=this.view==="top"?1.18:s<1.3?1.24:1.4,h=Math.max(a/(2*r*s),(o*Math.sin(c)+.5)/(2*r))*l*this.zoomLevel;this.camera.position.set(Math.sin(this.azimuth)*Math.cos(c)*h,Math.sin(c)*h,Math.cos(this.azimuth)*Math.cos(c)*h),this.camera.position.add(this.target),this.camera.lookAt(this.target),this.camera.updateMatrixWorld(),this.environment.setCamera(this.camera,this.view)}setView(t){this.view=["angle","top","first","third"].includes(t)?t:"angle",this.azimuth=0,this.zoomLevel=1,this.playerYaw=this.playerPitch=0,this.target.set(0,t==="top"?-.04:.12,0),this.syncPlayers(),this.updateCamera()}resetCamera(){this.elevation=.74,this.setView("angle")}pan(t,e){if(this.view==="first"||this.view==="third"){this.playerYaw+=t*.5,this.playerPitch=Mn.clamp(this.playerPitch+e*.3,-.5,.8),this.updateCamera();return}this.target.x=Mn.clamp(this.target.x+t*Math.cos(this.azimuth)-e*Math.sin(this.azimuth),-2.8,Et.halfWidth),this.target.z=Mn.clamp(this.target.z-t*Math.sin(this.azimuth)-e*Math.cos(this.azimuth),-1.4,Et.halfHeight),this.updateCamera()}orbit(t,e){if(this.view==="first"||this.view==="third"){this.playerYaw-=t*.005*this.sensitivity,this.playerPitch=Mn.clamp(this.playerPitch+e*.004*this.sensitivity,-.5,.8),this.updateCamera();return}this.view="angle",this.azimuth-=t*.005*this.sensitivity,this.elevation=Mn.clamp(this.elevation+e*.004*this.sensitivity,.35,1.5),this.updateCamera()}zoom(t){this.adjustZoom(Math.sign(t)*.065)}adjustZoom(t){this.zoomLevel=Mn.clamp(this.zoomLevel*Math.exp(t),this.view==="first"||this.view==="third"?.65:.35,1.8),this.updateCamera()}setSettings(t={}){if(this.dirty=!0,t.tableColor&&this.table.setColor(t.tableColor),t.ballStyle&&this.ballRenderer.setStyle(t.ballStyle),t.sensitivity!==void 0&&(this.sensitivity=Number(t.sensitivity)),t.aimGuide!==void 0&&(this.aimGuide=t.aimGuide),t.quality&&t.quality!==this.quality){this.quality=t.quality;const e=t.quality==="low",n=t.quality==="high";this.renderer.setPixelRatio(e?1:Math.min(window.devicePixelRatio,n?2:1.5)),this.renderer.shadowMap.enabled=!e,this.keyLight.castShadow=!e,this.keyLight.shadow.mapSize.set(n?2048:1024,n?2048:1024),this.keyLight.shadow.map?.dispose(),this.keyLight.shadow.map=null,this.environment.setQuality(t.quality),this.ballRenderer.setQuality(t.quality),this.scene.traverse(s=>{if(s.material)for(const r of Array.isArray(s.material)?s.material:[s.material])r.needsUpdate=!0}),this.resize()}this.updateAim()}dispose(){this.resizeObserver.disconnect(),this.table.dispose(),this.ballRenderer.dispose(),this.playerRenderer.dispose(),this.environment.dispose(),this.reflections.dispose(),this.keyLight.shadow.dispose();const t=new Set,e=new Set,n=new Set;this.scene.traverse(s=>{if(s.geometry&&t.add(s.geometry),s.material)for(const r of Array.isArray(s.material)?s.material:[s.material])e.add(r),r.map&&n.add(r.map)}),t.forEach(s=>s.dispose()),e.forEach(s=>s.dispose()),n.forEach(s=>s.dispose()),this.renderer.dispose(),this.canvas.remove()}}const cs=(i,t,e)=>Math.max(t,Math.min(e,i)),Ne=(i,t)=>Math.hypot(i.x-t.x,i.z-t.z),hs=(i,t)=>Math.atan2(t.z-i.z,t.x-i.x),hn=(i,t)=>{const e=Math.hypot(i,t)||1;return{x:i/e,z:t/e}};class Tv{chooseShot({mode:t,balls:e,difficulty:n="medium"}){const s=e.find(l=>l.id===t.cueId()&&l.active);if(!s)return{angle:0,power:.35,spin:{x:0,y:0},calledBall:null,calledPocket:null};const r=e.filter(l=>l.active&&t.legalTargets(e).includes(l.id));if(!r.length)return{angle:0,power:.35,spin:{x:0,y:0},calledBall:null,calledPocket:null};if(!t.pockets)return this.caromShot(t,s,r,e,n);if(t.isBreak){const l=[...r].sort((h,u)=>Ne(s,h)-Ne(s,u))[0];return{angle:hs(s,l),power:.96,spin:{x:0,y:.1},calledBall:l.id,calledPocket:this.nearestPocket(l)}}const a=[];for(const l of r)for(let h=0;h<be.length;h++){const u=be[h],f=hn(u.x-l.x,u.z-l.z),d={x:l.x-f.x*Et.radius*2,z:l.z-f.z*Et.radius*2},g=hn(d.x-s.x,d.z-s.z),v=g.x*f.x+g.z*f.z;if(v<.18||!this.inside(d)||!this.pathClear(s,d,e,[s.id,l.id])||!this.pathClear(l,u,e,[s.id,l.id]))continue;const m=Ne(s,d)+Ne(l,u)/Math.max(v,.35);a.push({angle:hs(s,d),power:this.powerFor(m,v),spin:{x:0,y:.12},calledBall:l.id,calledPocket:h,score:v*6-m*.5})}n!=="easy"&&a.push(...this.combinations(s,r,e,t)),n==="hard"&&a.push(...this.bankShots(s,r,e)),a.sort((l,h)=>h.score-l.score);let o=a[0];if(!o){const l=[...r].sort((h,u)=>{const f=d=>Ne(s,d)+(this.pathClear(s,d,e,[s.id,d.id])?0:8);return f(h)-f(u)})[0];o={angle:hs(s,l),power:t.isBreak?.92:cs(.34+Ne(s,l)*.09,.38,.83),spin:{x:0,y:0},calledBall:l.id,calledPocket:this.nearestPocket(l)}}const c=n==="easy"?.035:n==="medium"?.009:.002;return{angle:o.angle+(Math.random()-.5)*c*2,power:o.power,spin:o.spin,calledBall:o.calledBall,calledPocket:o.calledPocket}}powerFor(t,e=1){return cs(.22+Math.sqrt(Math.max(0,t))*.17+(1-e)*.12,.29,.88)}inside(t){return Math.abs(t.x)<=Et.halfWidth-Et.radius&&Math.abs(t.z)<=Et.halfHeight-Et.radius}pathClear(t,e,n,s=[]){const r=e.x-t.x,a=e.z-t.z,o=r*r+a*a;return o<1e-8?!0:!n.some(c=>{if(!c.active||s.includes(c.id))return!1;const l=cs(((c.x-t.x)*r+(c.z-t.z)*a)/o,0,1);return Math.hypot(c.x-t.x-r*l,c.z-t.z-a*l)<(c.radius||Et.radius)+Et.radius+.008})}nearestPocket(t){let e=0;for(let n=1;n<be.length;n++)Ne(t,be[n])<Ne(t,be[e])&&(e=n);return e}combinations(t,e,n,s){const r=[];for(const a of e)for(const o of n)if(!(!o.active||o.id===t.id||o.id===a.id)&&!(s.id==="eight"&&!e.some(c=>c.id===o.id))&&!(s.id==="ten"&&o.id===10&&!e.some(c=>c.id===10)))for(let c=0;c<be.length;c++){const l=be[c],h=hn(l.x-o.x,l.z-o.z),u={x:o.x-h.x*Et.radius*2,z:o.z-h.z*Et.radius*2},f=hn(u.x-a.x,u.z-a.z),d={x:a.x-f.x*Et.radius*2,z:a.z-f.z*Et.radius*2},g=hn(d.x-t.x,d.z-t.z),v=Math.min(g.x*f.x+g.z*f.z,f.x*h.x+f.z*h.z);if(v<.7||!this.inside(d)||!this.inside(u)||!this.pathClear(t,d,n,[t.id,a.id])||!this.pathClear(a,u,n,[t.id,a.id,o.id])||!this.pathClear(o,l,n,[t.id,a.id,o.id]))continue;const m=Ne(t,d)+Ne(a,u)+Ne(o,l);r.push({angle:hs(t,d),power:this.powerFor(m/v,v),spin:{x:0,y:0},calledBall:o.id,calledPocket:c,score:v*4.5-m*.6-1.5})}return r}bankShots(t,e,n){const s=[],r=[["x",-2.8+Et.radius],["x",Et.halfWidth-Et.radius],["z",-1.4+Et.radius],["z",Et.halfHeight-Et.radius]];for(const a of e)for(let o=0;o<be.length;o++){const c=be[o];for(const[l,h]of r){const u={...c,[l]:2*h-c[l]},f=(h-a[l])/(u[l]-a[l]);if(f<=.03||f>=.95)continue;const d={x:a.x+(u.x-a.x)*f,z:a.z+(u.z-a.z)*f};if(!this.inside({x:d.x*.999,z:d.z*.999})||be.some(b=>Ne(d,b)<.24))continue;const g=hn(d.x-a.x,d.z-a.z),v={x:a.x-g.x*Et.radius*2,z:a.z-g.z*Et.radius*2},m=hn(v.x-t.x,v.z-t.z),p=m.x*g.x+m.z*g.z;if(p<.45||!this.inside(v)||!this.pathClear(t,v,n,[t.id,a.id])||!this.pathClear(a,d,n,[t.id,a.id])||!this.pathClear(d,c,n,[t.id,a.id]))continue;const S=Ne(t,v)+(Ne(a,d)+Ne(d,c))*1.3;s.push({angle:hs(t,v),power:this.powerFor(S/p,p),spin:{x:0,y:0},calledBall:a.id,calledPocket:o,score:p*4-S*.6-2})}}return s}caromShot(t,e,n,s,r){const a=t.id==="three"?3:0;let o=null;const c=[],l=r==="easy"?180:r==="medium"?360:720;for(let d=0;d<l;d++){const g=d/l*Math.PI*2,v=this.traceCarom(e,n,g,a);c.push({...v,angle:g}),(!o||v.score>o.score)&&(o={...v,angle:g})}c.sort((d,g)=>g.score-d.score);const h=c.slice(0,r==="hard"?10:r==="medium"?5:2);let u=null;for(const d of h){const g=cs(.4+d.travel*.045+a*.03,.42,.95);for(const v of[g,Math.min(.98,g+.12)]){const m={angle:d.angle,power:v,spin:{x:0,y:.15}},p=this.simulateCarom(s,e.id,m,a);if((!u||p.score>u.score)&&(u={...d,...m,score:p.score}),p.scored)break}if(u?.score>=100)break}u&&(o=u);const f=r==="easy"?.025:r==="medium"?.008:.001;return{angle:o.angle+(Math.random()-.5)*f*2,power:o.power||cs(.4+o.travel*.045+a*.03,.42,.95),spin:{x:0,y:.15},calledBall:null,calledPocket:null}}simulateCarom(t,e,n,s){const r=new Set;let a=0,o=!1,c=0;const l=new Rc({pockets:!1,onEvent:h=>{h.type==="cushion"&&h.ball===e&&r.size<2&&a++,h.type==="collision"&&(h.a===e||h.b===e)&&(r.add(h.a===e?h.b:h.a),r.size===2&&a>=s&&(o=!0))}});for(l.setBalls(t.map(h=>({...h,spin:{...h.spin},vx:0,vz:0}))),l.shoot(e,n.angle,n.power,n.spin);l.isMoving()&&c<14&&!o;)l.step(1/120),c+=1/120;return{scored:o,score:o?110-c*.4:r.size*10+Math.min(a,s)}}traceCarom(t,e,n,s){const r=Et.radius*2,a={x:t.x,z:t.z};let o={x:Math.cos(n),z:Math.sin(n)},c=0,l=0;const h=new Set;let u=-100;for(let f=0;f<10&&c<19;f++){const d=Math.abs(o.x)<1e-8?1/0:(Math.sign(o.x)*(Et.halfWidth-Et.radius)-a.x)/o.x,g=Math.abs(o.z)<1e-8?1/0:(Math.sign(o.z)*(Et.halfHeight-Et.radius)-a.z)/o.z;let v=Math.min(d,g),m=null;for(const p of e){if(h.has(p.id))continue;const S=p.x-a.x,b=p.z-a.z,x=S*o.x+b*o.z,A=r*r-(S*S+b*b-x*x);if(A<0)continue;const T=x-Math.sqrt(A);T>1e-4&&T<v&&(v=T,m=p)}if(!Number.isFinite(v)||v<0)break;if(a.x+=o.x*v,a.z+=o.z*v,c+=v,m){if(h.add(m.id),u=10+Math.min(l,s)*1.5-c*.1,h.size===2){u=l>=s?100-c*.8:20-(s-l)*4;break}const p=hn(m.x-a.x,m.z-a.z),S=o.x*p.x+o.z*p.z,b={x:o.x-p.x*S,z:o.z-p.z*S};if(Math.hypot(b.x,b.z)<.08)break;o=hn(b.x,b.z),a.x+=o.x*.001,a.z+=o.z*.001}else l++,d<=g?o.x*=-1:o.z*=-1,a.x+=o.x*.001,a.z+=o.z*.001,h.size===1&&(u=Math.max(u,10+Math.min(l,s)-c*.1))}return{score:u,travel:c}}choosePlacement({mode:t,physics:e}){const n=t.cueId(),s=e.balls,r=s.filter(o=>o.active&&t.legalTargets(s).includes(o.id)),a=[];for(const o of r)for(const c of be){const l=hn(o.x-c.x,o.z-c.z);for(const h of[.45,.7,1])a.push({x:o.x+l.x*h,z:o.z+l.z*h})}a.push({x:-5.6*.25,z:0});for(let o=-2.4;o<=2.4;o+=.4)for(let c=-1;c<=1;c+=.4)a.push({x:o,z:c});return a.find(o=>e.canPlace(o.x,o.z,n))||{x:0,z:0}}}const xc=i=>Math.max(0,Math.min(1,Number(i)||0));class Av{constructor(){this.volume=.55,this.musicVolume=0,this.muted=!1,this.context=null,this.lastCollision=0,this.voices=new Set,this.music=[],this.unlock=()=>this.resume(),typeof window<"u"&&(window.addEventListener("pointerdown",this.unlock),window.addEventListener("keydown",this.unlock))}resume(){if(!(typeof window>"u"))try{if(!this.context){const t=window.AudioContext||window.webkitAudioContext;if(!t)return;this.context=new t,this.master=this.context.createGain(),this.effects=this.context.createGain(),this.musicGain=this.context.createGain(),this.effects.connect(this.master),this.musicGain.connect(this.master),this.master.connect(this.context.destination),this.updateVolumes()}this.context.state==="suspended"&&this.context.resume().catch(()=>{}),this.musicVolume>0&&!this.music.length&&this.startMusic()}catch{}}updateVolumes(){if(!this.context)return;const t=this.context.currentTime;this.master.gain.setTargetAtTime(this.muted?0:1,t,.03),this.effects.gain.setTargetAtTime(this.volume*.45,t,.03),this.musicGain.gain.setTargetAtTime(this.musicVolume*.035,t,.15)}setVolume(t){this.volume=xc(t),this.updateVolumes()}setMusicVolume(t){this.musicVolume=xc(t),this.context&&this.musicVolume>0&&!this.music.length&&this.startMusic(),this.updateVolumes()}setMuted(t){this.muted=!!t,this.updateVolumes()}tone(t,e,n,s="sine",r=0,a=t){if(!this.context||this.voices.size>30)return;const o=this.context.currentTime+r,c=this.context.createOscillator(),l=this.context.createGain();c.type=s,c.frequency.setValueAtTime(t,o),c.frequency.exponentialRampToValueAtTime(Math.max(20,a),o+e),l.gain.setValueAtTime(0,o),l.gain.linearRampToValueAtTime(Math.max(1e-4,n),o+.002),l.gain.exponentialRampToValueAtTime(1e-4,o+e),c.connect(l),l.connect(this.effects),this.voices.add(c),c.onended=()=>{this.voices.delete(c),c.disconnect(),l.disconnect()},c.start(o),c.stop(o+e+.01)}play(t,e=1){if(!(this.muted||this.volume===0||!this.context||this.context.state!=="running"))if(e=Math.max(.08,Math.min(1,e)),t==="collision"||t==="ball"){const n=this.context.currentTime;if(n-this.lastCollision<.012)return;this.lastCollision=n,this.tone(1700,.045,e*.7,"sine",0,390),this.tone(450,.035,e*.22,"triangle")}else t==="cue"||t==="shoot"?(this.tone(320,.08,e*.7,"triangle",0,90),this.tone(1800,.025,e*.4,"sine",0,500)):t==="cushion"||t==="landing"?this.tone(180,.075,e*.6,"triangle",0,65):t==="pocket"?(this.tone(160,.2,e*.6,"sine",0,38),this.tone(440,.07,e*.18,"triangle",.08,190)):t==="win"||t==="victory"?[523.25,659.25,783.99,1046.5].forEach((n,s)=>this.tone(n,.45,.24,"sine",s*.13)):t==="lose"||t==="defeat"?[392,349.23,293.66].forEach((n,s)=>this.tone(n,.4,.22,"sine",s*.15)):this.tone(760,.045,.18,"sine",0,580)}startMusic(){!this.context||this.music.length||[130.8128,164.8138,195.9977].forEach((t,e)=>{const n=this.context.createOscillator(),s=this.context.createGain(),r=this.context.createOscillator(),a=this.context.createGain();n.type="sine",n.frequency.value=t,s.gain.value=.2,r.frequency.value=.07+e*.025,a.gain.value=.06,r.connect(a),a.connect(s.gain),n.connect(s),s.connect(this.musicGain),n.start(),r.start(),this.music.push({oscillator:n,gain:s,lfo:r,depth:a})})}dispose(){typeof window<"u"&&(window.removeEventListener("pointerdown",this.unlock),window.removeEventListener("keydown",this.unlock));for(const t of this.voices)try{t.stop()}catch{}this.voices.clear();for(const t of this.music)t.oscillator.stop(),t.lfo.stop(),t.oscillator.disconnect(),t.gain.disconnect(),t.lfo.disconnect(),t.depth.disconnect();this.music=[],this.context?.close().catch(()=>{}),this.context=null}}class Cv{constructor(t,e){this.update=t,this.render=e,this.accumulator=0,this.last=0,this.running=!1,this.fixedStep=1/240}start(){if(this.running)return;this.running=!0,this.last=performance.now();const t=e=>{if(!this.running)return;const n=Math.min((e-this.last)/1e3,.1);this.last=e,this.accumulator+=n;let s=0;for(;this.accumulator>=this.fixedStep&&s++<24;)this.update(this.fixedStep),this.accumulator-=this.fixedStep;this.render(n),this.id=requestAnimationFrame(t)};this.id=requestAnimationFrame(t)}stop(){this.running=!1,cancelAnimationFrame(this.id),this.accumulator=0}}const te=Object.freeze(Object.fromEntries(["MENU","MODE_SELECTION","GAME_SETUP","BREAK_SHOT","PLAYER_TURN","SHOT_IN_PROGRESS","BALLS_SETTLING","FOUL","BALL_IN_HAND","GAME_OVER","PAUSED"].map(i=>[i,i])));class Rv{constructor(t){this.game=t,this.canvas=t.scene.canvas,this.pointers=new Map,this.listeners=[],this.keys=new Set,this.cueTurns=new Map;const e=(r,a,o,c)=>{r.addEventListener(a,o,c),this.listeners.push(()=>r.removeEventListener(a,o,c))},n=r=>{const a=t.scene.screenToTable(r.clientX,r.clientY);a&&t.cue&&t.setAngle(Math.atan2(a.z-t.cue.z,a.x-t.cue.x))};e(this.canvas,"contextmenu",r=>r.preventDefault()),e(this.canvas,"pointerdown",r=>{if(!(r.button!==0&&r.button!==2)){if(t.audio.play("button",.05),this.canvas.setPointerCapture(r.pointerId),this.pointers.set(r.pointerId,{x:r.clientX,y:r.clientY,startY:r.clientY,orbit:r.button===2||r.altKey,charge:r.shiftKey,multitouch:!1}),this.pointers.size>1){for(const a of this.pointers.values())a.multitouch=!0;this.gesture=this.touchGeometry();return}if(t.ballInHand){const a=t.scene.screenToTable(r.clientX,r.clientY);a&&t.place(a.x,a.z)}else t.canShoot&&!t.isAI&&!r.altKey&&r.button===0&&!["first","third"].includes(t.scene.view)&&n(r)}}),e(this.canvas,"pointermove",r=>{const a=this.pointers.get(r.pointerId);if(!a)return;const o=r.clientX-a.x,c=r.clientY-a.y;if(a.x=r.clientX,a.y=r.clientY,this.pointers.size>1){const l=this.touchGeometry();this.gesture&&(t.scene.orbit((l.x-this.gesture.x)*1.5,(l.y-this.gesture.y)*1.5),Math.abs(l.distance-this.gesture.distance)>1&&t.scene.zoom((this.gesture.distance-l.distance)*2)),this.gesture=l;return}a.multitouch||(a.orbit?t.scene.orbit(o,c):a.charge?t.setPower(.1+(r.clientY-a.startY)/180):t.canShoot&&!t.isAI&&(["first","third"].includes(t.scene.view)?t.setAngle(t.angle+o*.003*t.scene.sensitivity):n(r)))});const s=r=>{const a=this.pointers.get(r.pointerId);a?.charge&&!a.multitouch&&t.shoot(),this.pointers.delete(r.pointerId),this.gesture=null};e(this.canvas,"pointerup",s),e(this.canvas,"pointercancel",r=>{this.pointers.delete(r.pointerId),this.gesture=null}),e(this.canvas,"wheel",r=>{r.preventDefault(),t.scene.zoom(r.deltaY)},{passive:!1}),e(window,"keydown",r=>{if(!(t.lobbyOpen||r.target.matches("input,select,textarea,[contenteditable=true]")||r.target.closest('[role="slider"]')||document.querySelector("dialog[open]"))){if(["ArrowLeft","ArrowRight"].includes(r.code)){r.preventDefault(),t.setAngle(t.angle+(r.code==="ArrowLeft"?-1:1)*Math.PI/1800);return}if(["KeyW","KeyA","KeyS","KeyD","Equal","Minus","NumpadAdd","NumpadSubtract"].includes(r.code)){r.preventDefault(),this.keys.add(r.code);return}if(r.code==="KeyR"){r.preventDefault(),r.repeat||t.scene.resetCamera();return}r.code==="Space"&&r.target.closest("button,a")||(r.code==="Space"&&(r.preventDefault(),t.shoot()),r.code==="Escape"&&t.pause())}}),e(window,"keyup",r=>this.keys.delete(r.code)),e(window,"blur",()=>{this.keys.clear(),this.cueTurns.clear()}),e(document,"visibilitychange",()=>{document.hidden&&(this.keys.clear(),this.cueTurns.clear())})}beginCueTurn(t){this.game.setAngle(this.game.angle+t*Math.PI/1800)&&this.cueTurns.set(t,performance.now())}endCueTurn(t){this.cueTurns.delete(t)}update(t){const e=document.activeElement;if(this.game.lobbyOpen||document.hidden||document.querySelector("dialog[open]")||e?.closest("input,select,textarea,[contenteditable=true]")){this.keys.clear(),this.cueTurns.clear();return}(!this.game.canShoot||this.game.isAI)&&this.cueTurns.clear();let n=0;const s=performance.now();for(const[h,u]of this.cueTurns)s-u>250&&(n+=h);if(n&&this.game.setAngle(this.game.angle+n*Math.min(t,.05)*Math.PI/18),!this.keys.size)return;const r=Number(this.keys.has("KeyD"))-Number(this.keys.has("KeyA")),a=Number(this.keys.has("KeyW"))-Number(this.keys.has("KeyS")),o=Math.hypot(r,a),c=Math.min(t,.05);if(o){const h=1.8*c*this.game.scene.zoomLevel*this.game.scene.sensitivity;this.game.scene.pan(r/o*h,a/o*h)}const l=Number(this.keys.has("Minus")||this.keys.has("NumpadSubtract"))-Number(this.keys.has("Equal")||this.keys.has("NumpadAdd"));l&&this.game.scene.adjustZoom(l*c)}touchGeometry(){const[t,e]=this.pointers.values();return{x:(t.x+e.x)/2,y:(t.y+e.y)/2,distance:Math.hypot(t.x-e.x,t.y-e.y)}}dispose(){this.listeners.forEach(t=>t()),this.pointers.clear(),this.keys.clear(),this.cueTurns.clear()}}class Pv{constructor(t,e){this.onUpdate=e,this.state=te.MENU,this.angle=0,this.power=.52,this.jump=0,this.spin={x:0,y:0},this.calledPocket=null,this.calledBall=null,this.settings={tableColor:"#087f75",quality:"medium",ballStyle:"classic",sensitivity:1,aimGuide:!0,volume:.4,music:0,language:"en",opponent:"local",difficulty:"medium",targetScore:5,playerNames:["Người chơi 1","Người chơi 2"]};try{Object.assign(this.settings,JSON.parse(localStorage.getItem("velvet-settings")||"{}"))}catch{}this.localSeries={local:[0,0],ai:[0,0]};try{const n=JSON.parse(localStorage.getItem("velvet-series")||"{}");for(const s of["local","ai"])Array.isArray(n[s])&&n[s].length===2&&n[s].every(r=>Number.isSafeInteger(r)&&r>=0)&&(this.localSeries[s]=n[s])}catch{}this.scene=new wv(t),this.audio=new Av,this.ai=new Tv,this.physics=new Rc({onEvent:n=>this.onPhysicsEvent(n)}),this.scene.setSettings(this.settings),this.audio.setVolume(this.settings.volume),this.audio.setMusicVolume(this.settings.music),this.input=new Rv(this),this.start("eight"),this.loop=new Cv(n=>this.fixedUpdate(n),n=>this.render(n)),this.loop.start(),this.visibility=()=>{!this.online&&document.hidden&&this.state!==te.PAUSED&&this.state!==te.GAME_OVER&&this.pause()},document.addEventListener("visibilitychange",this.visibility)}start(t=this.mode?.id||"eight"){if(this.online)return this.online.rematch();this.state=te.GAME_SETUP,this.mode=Cc(t,{targetScore:Number(this.settings.targetScore)}),this.physics.pockets=this.mode.pockets,this.physics.setBalls(this.mode.setup()),this.scene.setMode(this.mode.pockets),this.state=this.mode.isBreak?te.BREAK_SHOT:te.PLAYER_TURN,this.shotEvents=[],this.shots=0,this.placementAllowed=!1,this.resultRecorded=!1,this.shotLog=[],this.cushions=0,this.startedAt=Date.now(),this.pausedTime=0,this.settleTime=0,this.aiDelay=1.1,this.angle=0,this.power=this.mode.pockets?.96:.52,this.jump=0,this.spin={x:0,y:0},this.finishedAt=null,this.calledPocket=null,this.calledBall=null,this.message=this.mode.pockets?"The table is yours. Use strong power for a legal break.":"Connect with both object balls to score. Find your line.",this.notify()}get cue(){return this.physics.balls.find(t=>t.id===this.mode.cueId())}get isAI(){return this.online?!1:this.settings.opponent==="ai"&&this.mode.currentPlayer===1}get canShoot(){return this.online?this.online.canShoot:[te.PLAYER_TURN,te.BREAK_SHOT].includes(this.state)&&!this.physics.isMoving()&&this.mode.winner==null}get ballInHand(){return this.state===te.BALL_IN_HAND}get needsPocketCall(){return!this.mode.isBreak&&(this.mode.id==="ten"||this.mode.id==="eight"&&this.mode.legalTargets(this.physics.balls).includes(8))}setAngle(t){return this.lobbyOpen||!this.canShoot||this.isAI||!Number.isFinite(t)?!1:(this.angle=Math.atan2(Math.sin(t),Math.cos(t)),this.notify(),!0)}setJump(t){return this.lobbyOpen||!this.canShoot||this.isAI||!Number.isFinite(t)?!1:(this.jump=Math.max(0,Math.min(1,t)),this.notify(),!0)}onPhysicsEvent(t){[te.SHOT_IN_PROGRESS,te.BALLS_SETTLING].includes(this.state)&&(this.shotEvents.push({...t}),t.type==="cushion"&&t.ball===this.shotCue&&this.cushions++,this.audio.play(t.type,t.strength??.5))}shoot(t=!1){if(this.lobbyOpen||!this.canShoot||!t&&this.isAI)return!1;const e=this.mode.legalTargets(this.physics.balls);if(this.needsPocketCall&&this.calledPocket==null)return this.message=this.mode.id==="eight"?"Chọn lỗ cho bi số 8 để hoàn tất cú đánh.":"Chọn lỗ được gọi cho cú đánh này.",this.notify(),t||this.onCallRequired?.(),!1;if(this.online)return this.online.shoot();this.mode.id==="ten"&&!this.mode.isBreak&&this.calledBall==null&&(this.calledBall=e[0]??10),this.initialBalls=this.physics.balls.map(r=>({...r,spin:{...r.spin}})),this.shotCue=this.mode.cueId(),this.shotEvents=[],this.cushions=0,this.settleTime=0;const n=this.state;return this.state=te.SHOT_IN_PROGRESS,this.physics.shoot(this.shotCue,this.angle,Math.max(.04,this.power),this.spin,this.jump)?(this.placementAllowed=!1,this.shots++,this.audio.play("cue",this.power),this.scene.animateShot?.(),this.message="Shot in motion…",this.notify(),!0):(this.state=n,!1)}fixedUpdate(t){if(!(this.online||this.lobbyOpen)&&!(this.state===te.PAUSED||this.state===te.GAME_OVER)){if([te.SHOT_IN_PROGRESS,te.BALLS_SETTLING].includes(this.state))this.physics.step(t),this.state=this.physics.isMoving()?te.SHOT_IN_PROGRESS:te.BALLS_SETTLING,this.physics.isMoving()?this.settleTime=0:(this.settleTime+=t,this.settleTime>.42&&this.finishShot());else if(this.isAI&&(this.aiDelay-=t,this.aiDelay<=0)){if(this.ballInHand){const e=this.ai.choosePlacement({mode:this.mode,physics:this.physics});e?this.place(e.x,e.z,!0):this.aiDelay=.5}else if(this.canShoot){const e=this.ai.chooseShot({mode:this.mode,balls:this.physics.balls,difficulty:this.settings.difficulty});e&&(Object.assign(this,{angle:e.angle,power:e.power,jump:0,spin:e.spin||{x:0,y:0},calledBall:e.calledBall,calledPocket:e.calledPocket}),this.shoot(!0))}}}}finishShot(){const t=this.mode.currentPlayer,e=this.mode.evaluateShot({events:this.shotEvents,balls:this.physics.balls,initialBalls:this.initialBalls,calledBall:this.calledBall,calledPocket:this.calledPocket});for(const n of e.respot||[])this.respot(n);if(this.message=e.message,this.shotLog.unshift({player:t,message:e.message,foul:e.foul}),this.shotLog=this.shotLog.slice(0,12),this.calledPocket=null,this.calledBall=null,this.jump=0,this.aiDelay=1.25,this.mode.winner!=null||e.winner!=null)this.state=te.GAME_OVER,this.finishedAt=Date.now(),this.recordLocalResult(),this.audio.play(this.mode.winner===1&&this.settings.opponent==="ai"?"lose":"win"),this.saveMatch();else if(e.ballInHand){this.state=te.FOUL,this.placementAllowed=!0;const n=this.cue;n.active=!1,n.vx=n.vz=0,n.height=n.vy=0,this.state=te.BALL_IN_HAND}else this.state=te.PLAYER_TURN;this.notify()}respot(t){let e=this.physics.balls.find(r=>r.id===t);if(!e)return;e.active=!1;const n=[{x:1.4,z:0}];for(let r=1;r<45;r++)n.push({x:1.4-r*.135,z:0});for(let r=-1.1;r<1.2;r+=.15)for(let a=-2.5;a<2.6;a+=.15)n.push({x:a,z:r});const s=n.find(r=>this.physics.canPlace(r.x,r.z,t));s&&(e.x=s.x,e.z=s.z,e.vx=e.vz=0,e.height=e.vy=0,e.spin={x:0,y:0},e.active=!0)}place(t,e,n=!1){return this.online?this.online.place(t,e):!(this.ballInHand||this.state===te.PLAYER_TURN&&this.placementAllowed)||this.physics.isMoving()||!n&&this.isAI?!1:this.physics.placeBall(this.mode.cueId(),t,e)?(this.placementAllowed=!0,this.state=te.PLAYER_TURN,this.message="Đã đặt bi trắng. Bạn có thể chọn Đặt lại bi trắng trước khi đánh.",this.aiDelay=.7,this.notify(),!0):(this.message="Choose a clear spot inside the cushions, away from pockets and other balls.",this.notify(),!1)}get canReposition(){return this.online?this.online.canAct&&this.online.info?.placementAllowed&&this.state===te.PLAYER_TURN:this.placementAllowed&&this.state===te.PLAYER_TURN&&!this.isAI&&!this.physics.isMoving()}repositionCue(){return this.canReposition?this.online?this.online.repositionCue():(this.state=te.BALL_IN_HAND,this.message="Nhấn vị trí trống để đặt lại bi trắng.",this.notify(),!0):!1}get seriesScores(){return this.online?.info?.seriesScores||this.localSeries[this.settings.opponent==="ai"?"ai":"local"]}recordLocalResult(){const t=this.mode.winner;this.resultRecorded||t!==0&&t!==1||(this.resultRecorded=!0,this.seriesScores[t]++,this.persistSeries())}persistSeries(){try{localStorage.setItem("velvet-series",JSON.stringify(this.localSeries))}catch{}}resetSeries(){this.online||(this.seriesScores.fill(0),this.persistSeries(),this.notify())}applySharedAimGuide(t){if(!(typeof t!="boolean"||this.settings.aimGuide===t)){this.settings.aimGuide=t,this.scene.setSettings({aimGuide:t});try{localStorage.setItem("velvet-settings",JSON.stringify(this.settings))}catch{}}}pause(){if(this.lobbyOpen)return!1;if(this.online)return this.online.pause();this.state===te.PAUSED?(this.state=this.previousState,this.pausedTime+=Date.now()-this.pauseStarted):this.state!==te.GAME_OVER&&(this.previousState=this.state,this.state=te.PAUSED,this.pauseStarted=Date.now()),this.notify()}setSettings(t){this.online&&typeof t.aimGuide=="boolean"&&(t.aimGuide!==this.settings.aimGuide&&(this.online.seat==null||!this.online.connected?this.online.error="Chỉ người chơi đang kết nối được đổi Aim guide của phòng.":this.online.command("aimGuide",{enabled:t.aimGuide})),t={...t},delete t.aimGuide),Object.assign(this.settings,t),this.scene.setSettings(this.settings),this.audio.setVolume(this.settings.volume),this.audio.setMusicVolume(this.settings.music);try{localStorage.setItem("velvet-settings",JSON.stringify(this.settings))}catch{}this.notify()}setPower(t){this.power=Math.max(.04,Math.min(1,Number(t))),this.notify()}setSpin(t,e){this.spin={x:Math.max(-1,Math.min(1,t)),y:Math.max(-1,Math.min(1,e))},this.notify()}render(t){this.input.update(t),this.online?.update(),!this.lobbyOpen&&(this.scene.sync(this.online?.renderBalls||this.physics.balls,this.mode.cueId(),t),this.scene.setAim(this.angle,this.power,this.spin,this.online?this.online.showAim:this.canShoot&&!this.isAI,this.jump),this.scene.setPlayers({activeSeat:this.mode.currentPlayer,localSeat:this.online?this.online.seat:this.settings.opponent==="ai"?0:this.mode.currentPlayer,names:[this.playerName(0),this.playerName(1)]}),this.scene.render(),this.hudTimer=(this.hudTimer||0)+t,this.hudTimer>.18&&(this.hudTimer=0,this.notify()))}notify(){this.onUpdate?.(this)}saveMatch(){try{let t=JSON.parse(localStorage.getItem("velvet-history")||"[]");t.unshift({mode:di.find(e=>e.id===this.mode.id).name,winner:this.playerName(this.mode.winner),scores:this.mode.scores,seriesScores:[...this.seriesScores],duration:this.elapsed,date:new Date().toISOString()}),localStorage.setItem("velvet-history",JSON.stringify(t.slice(0,20)))}catch{}}playerName(t){return this.online?this.online.info?.players[t]?.name||`Đang chờ người chơi ${t+1}`:t===1&&this.settings.opponent==="ai"?"The house":this.settings.playerNames?.[t]||`Người chơi ${t+1}`}get elapsed(){return this.online?this.online.info?.elapsed||0:Math.max(0,Math.floor(((this.finishedAt&&this.state===te.GAME_OVER?this.finishedAt:Date.now())-this.startedAt-this.pausedTime-(this.state===te.PAUSED?Date.now()-this.pauseStarted:0))/1e3))}dispose(){this.online?.leave(),this.loop.stop(),this.scene.dispose(),this.audio.dispose(),this.input.dispose(),document.removeEventListener("visibilitychange",this.visibility)}}const yc={cue:'<path d="m5 19 14-14M4 20l2-2M17 3l4 4"/>',settings:'<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="3"/><circle cx="15" cy="17" r="3"/>',sound:'<path d="m11 4-6 5H2v6h3l6 5zM15 8c3 2 3 6 0 8m3-11c5 4 5 10 0 14"/>',mute:'<path d="m11 4-6 5H2v6h3l6 5zM16 9l5 6m0-6-5 6"/>',help:'<circle cx="12" cy="12" r="9"/><path d="M9 9a3 3 0 1 1 5 2c-2 1-2 2-2 3m0 3h.01"/>',arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',pause:'<path d="M8 5v14M16 5v14"/>',play:'<path d="m8 5 11 7-11 7z"/>',restart:'<path d="M4 10a8 8 0 1 1 1 8M4 4v6h6"/>',top:'<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M12 6v12"/>',angle:'<path d="m2 14 10-7 10 7-10 7zM2 10l10-7 10 7"/>',close:'<path d="m6 6 12 12M6 18 18 6"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',trophy:'<path d="M8 3h8v6a4 4 0 0 1-8 0zM8 5H4v3a4 4 0 0 0 4 4m8-7h4v3a4 4 0 0 1-4 4m-4 1v7m-4 0h8"/>',chevron:'<path d="m9 5 7 7-7 7"/>',check:'<path d="m5 12 4 4L19 6"/>'},he=(i,t=20)=>`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${yc[i]||yc.cue}</svg>`,vo=(i,t="")=>`<span class="ball-chip ${i>8?"striped":""} ${t}" style="--ball:${Ec[i]||"#e8c95b"}"><span>${i}</span></span>`,xh=i=>i==="carom"||i==="three"?`<div class="mode-art carom-art"><i></i><i></i><i></i>${i==="three"?"<span>⌁</span>":""}</div>`:`<div class="mode-art">${vo(i==="eight"?8:i==="nine"?9:10,"large")}${vo(i==="eight"?1:i==="nine"?2:3,"small")}</div>`,Lv=document.querySelector("#app");Lv.innerHTML=`
<header class="site-header"><a class="brand" href="#" aria-label="Velvet home"><span class="brand-mark">v<span>•</span></span><span>velvet<small>BILLIARDS CLUB</small></span></a><nav aria-label="Main navigation"><button class="nav-link active" id="nav-play" data-i18n="play">Play</button><button class="nav-link" id="instructions" data-i18n="how">How to play</button><button class="nav-link" id="history" data-i18n="history">Match history</button></nav><div class="header-actions"><span class="live-label"><i></i> YOUR PRIVATE TABLE</span><button class="icon-button" id="mute" aria-label="Mute sound">${he("sound")}</button><button class="icon-button" id="settings" aria-label="Settings">${he("settings")}</button></div></header>
<main>
<section class="hero"><div><div class="eyebrow"><span></span> A GAME OF ANGLES. A MOMENT OF CALM.</div><h1 data-i18n="title">Find your next great shot.</h1><p data-i18n="subtitle">Five ways to play. One beautiful game. Make yourself at home.</p></div><button class="new-match secondary" id="new-match">${he("cue")} <span data-i18n="new">New match</span> ${he("arrow",17)}</button></section>
<section class="mode-grid" aria-label="Game modes">${di.map((i,t)=>`<button class="mode-card ${t===0?"selected":""}" data-mode="${i.id}" aria-pressed="${t===0}">${xh(i.id)}<span class="mode-copy"><span class="mode-tag">${i.tag}</span><strong>${i.name}</strong></span><span class="mode-selected">${he("check",13)}</span></button>`).join("")}</section>
<div class="game-layout" id="play-area">
<section class="table-panel" aria-label="Billiards game">
<div class="table-toolbar"><div class="table-title"><span class="green-dot"></span><strong id="mode-title">8-Ball Pool</strong><span class="separator">/</span><span id="match-type">LOCAL MATCH</span></div><div class="table-actions"><span class="match-clock">${he("clock",14)}<span id="clock">00:00</span></span><span class="small-divider"></span><button class="icon-button small" id="zoom-out" aria-label="Thu nhỏ bàn" title="Thu nhỏ (−)">−</button><button class="icon-button small" id="zoom-in" aria-label="Phóng to bàn" title="Phóng to (+)">+</button><button class="icon-button small" id="reset-camera" aria-label="Đặt lại góc nhìn" title="Đặt lại góc nhìn (R)">${he("restart",16)}</button><button class="icon-button small" id="expand-table" aria-label="Mở rộng bàn" aria-pressed="false" title="Mở rộng bàn"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 3H3v6m12-6h6v6M3 15v6h6m6 0h6v-6"/></svg></button><button class="icon-button small" id="camera" aria-label="Switch to top view" title="Switch camera">${he("top",18)}</button><button class="icon-button small" id="pause" aria-label="Pause" title="Pause (Esc)">${he("pause",18)}</button><button class="icon-button small" id="restart" aria-label="Restart match" title="Restart">${he("restart",18)}</button></div></div>
<div class="table-stage" id="scene"><div class="canvas-label">VELVET <span>TABLE Nº 01</span></div><div id="table-state" class="table-state" hidden></div><div class="table-watermark">PRECISION IS A PRACTICE.</div><div id="render-error" hidden></div></div>
<div class="table-footer"><span><span class="key-dot"></span><span id="input-tip" data-i18n="aimtip">Drag on the table to aim</span></span><span class="desktop-tip">WASD di chuyển <span>·</span> + / − zoom <span>·</span> R đặt lại</span><button id="guide-toggle" class="text-button">Aim guide <span class="mini-toggle on"></span></button></div>
</section>
<aside class="match-sidebar"><div class="sidebar-heading"><span data-i18n="match">THE MATCH</span><span class="tiny-badge" id="round-label">OPEN TABLE</span></div><div id="player-cards"></div>
<div class="objective"><span class="eyebrow" data-i18n="objective">ON THE TABLE</span><h3 id="objective-title">Break the ice.</h3><p id="objective-text">Hit the rack to start. The table stays open after the break.</p><div id="target-balls" class="target-balls"></div><div id="cushion-counter" hidden></div></div>
<div class="shot-note"><span class="note-icon">${he("cue",18)}</span><div><strong id="note-title">A fresh rack. A fresh start.</strong><p id="message" aria-live="polite">Line up your opening shot.</p></div></div>
<button class="rules-link" id="mode-rules"><span>Learn this game</span>${he("arrow",16)}</button>
</aside>
</div>
<section class="control-deck" aria-label="Shot controls"><div class="spin-control"><div id="spin-pad" role="slider" aria-label="Cue ball spin. Arrow keys adjust, Home resets." aria-valuemin="-100" aria-valuemax="100" aria-valuenow="0" tabindex="0"><span class="spin-axis horizontal"></span><span class="spin-axis vertical"></span><span id="spin-marker"></span></div><div><span class="control-label" data-i18n="spin">CUE BALL SPIN</span><strong id="spin-label">Center ball</strong><button class="text-button reset-spin" id="reset-spin" data-i18n="reset">Reset spin</button></div></div><div class="power-control"><div class="power-heading"><label for="power" class="control-label" data-i18n="power">SHOT POWER</label><strong><span id="power-value">52</span><small>%</small></strong></div><input type="range" id="power" min="4" max="100" value="52" aria-label="Shot power"><div class="power-scale"><span>SOFT TOUCH</span><span>FULL POWER</span></div></div><div class="shoot-control"><button class="shoot-button" id="shoot"><span data-i18n="shoot">Take the shot</span>${he("arrow",21)}</button><span class="keyboard-hint">or press <kbd>space</kbd></span></div></section>
<section class="call-panel" id="call-panel" hidden><div><strong>Call your shot</strong><p id="call-description">Choose a ball and a pocket before shooting.</p></div><label id="call-ball-label">Ball <select id="call-ball"></select></label><div class="pocket-picker" role="group" aria-label="Called pocket">${be.map((i,t)=>`<button data-pocket="${t}" title="${i.name}" aria-label="Call ${i.name.toLowerCase()} pocket">${t+1}</button>`).join("")}</div><span id="called-label">No pocket called</span></section>
<footer class="page-footer"><span class="footer-brand">GOOD GAMES. GREAT MOMENTS.</span><span>Built for the love of the game <span class="footer-dot">✦</span></span><button id="footer-history">Match history</button><button id="footer-help">${he("help",15)} Quick guide</button></footer>
</main>
<dialog id="modal"><div class="modal-header"><div><div class="eyebrow">VELVET BILLIARDS CLUB</div><h2 id="modal-title"></h2></div><button class="icon-button" id="close-modal" aria-label="Close dialog">${he("close")}</button></div><div id="modal-body"></div></dialog>`;let mt,Wn=null,yh=null,Mh=null,Sh=null,bh=null,Eh=null,wh=null;const ys=i=>String(i).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);let Rn="angle",Mc="",Sc="",bc="",pr=!1;const lt=i=>document.querySelector(i),$o=i=>`${String(Math.floor(i/60)).padStart(2,"0")}:${String(i%60).padStart(2,"0")}`,Ue=(i,t)=>{const e=lt(i);e&&e.textContent!==String(t)&&(e.textContent=t)},Fi={en:{play:"Play",how:"How to play",history:"Match history",title:"Find your next great shot.",subtitle:"Five ways to play. One beautiful game. Make yourself at home.",new:"New match",match:"THE MATCH",objective:"ON THE TABLE",spin:"CUE BALL SPIN",power:"SHOT POWER",shoot:"Take the shot",reset:"Reset spin",aimtip:"Drag to aim · WASD to move view"},vi:{play:"Chơi",how:"Cách chơi",history:"Lịch sử trận",title:"Tìm đường bi hoàn hảo của bạn.",subtitle:"Năm cách chơi. Một bàn bi tuyệt đẹp. Hãy tận hưởng.",new:"Trận mới",match:"TRẬN ĐẤU",objective:"TRÊN BÀN",spin:"XOÁY BI CÁI",power:"LỰC ĐÁNH",shoot:"Đánh bi",reset:"Đặt lại xoáy",aimtip:"Kéo để ngắm · WASD di chuyển"}};function Th(){document.documentElement.lang=mt.settings.language,lt("[data-i18n]")&&document.querySelectorAll("[data-i18n]").forEach(i=>i.textContent=(Fi[mt.settings.language]||Fi.en)[i.dataset.i18n])}function Ah(i){if(!i.mode)return;const t=di.find(l=>l.id===i.mode.id),e=i.mode.display(i.physics.balls),n=i.mode.currentPlayer;lt("#guide-toggle .mini-toggle").classList.toggle("on",!!i.settings.aimGuide),lt("#guide-toggle").setAttribute("aria-pressed",String(!!i.settings.aimGuide)),Rn!==i.scene.view&&(Rn=i.scene.view,lt("#camera").innerHTML=he(Rn==="angle"?"top":"angle",18),lt("#camera").setAttribute("aria-label",`Switch to ${Rn==="angle"?"top":"angled"} view`)),Ue("#mode-title",t.name),Ue("#match-type",i.online?"PHÒNG "+i.online.roomId:i.settings.opponent==="ai"?"VS. THE HOUSE":"LOCAL MATCH"),Ue("#clock",$o(i.elapsed)),Ue("#power-value",Math.round(i.power*100)),lt("#power").value=Math.round(i.power*100),lt("#power").style.setProperty("--fill",`${i.power*100}%`),Ue("#message",i.message),Ue("#round-label",i.mode.isBreak?"BREAK SHOT":i.mode.pockets?"RACE TO THE LAST":"RACE TO "+i.mode.targetScore);const s=[0,1].map(l=>`<div class="player-card ${l===n?"is-active":""}"><div class="player-avatar ${l===1?"second":""}">${!i.online&&l===1&&i.settings.opponent==="ai"?"AI":`0${l+1}`}</div><div class="player-info"><strong title="${ys(i.playerName(l))}">${ys(i.playerName(l))} ${l===n?'<span class="turn-dot"></span>':""}</strong><span>${e.players?.[l]?.detail||e.players?.[l]?.label||"Ready to play"}</span></div><div class="player-score">${i.mode.scores[l]}<small>${i.mode.pockets?"POTTED":"POINTS"}</small></div></div>`).join("");s!==Mc&&(lt("#player-cards").innerHTML=s,Mc=s),Ue("#objective-title",i.state==="BALL_IN_HAND"?"Ball in hand.":i.mode.isBreak?"Break the ice.":i.mode.id==="three"?"Make the angles count.":i.mode.id==="carom"?"Connect all three.":"Stay on your line."),Ue("#objective-text",e.objective||t.description);const r=i.mode.legalTargets(i.physics.balls),a=r.map(l=>vo(l)).join("");a!==Sc&&(lt("#target-balls").innerHTML=a,Sc=a),lt("#cushion-counter").hidden=!["three","carom"].includes(i.mode.id),Ue("#cushion-counter",`${i.cushions} cushion contacts this shot`),Ue("#note-title",i.state==="BALL_IN_HAND"?"Your next move.":i.state==="SHOT_IN_PROGRESS"?"Let the table do the talking.":i.isAI?"The house is lining up…":i.shots===0?"A fresh rack. A fresh start.":`${i.playerName(n)}, the table is yours.`);const o=lt("#shoot");o.disabled=!i.canShoot||i.isAI,o.classList.toggle("thinking",i.isAI),!i.canShoot||i.isAI?o.innerHTML=`<span>${i.state==="BALL_IN_HAND"?"Place the cue ball":i.state==="PAUSED"?"Game paused":i.state==="GAME_OVER"?"Match complete":i.isAI?"The house is thinking…":"Balls in motion…"}</span>`:o.innerHTML=`<span>${(Fi[i.settings.language]||Fi.en).shoot}</span>${he("arrow",21)}`,i.online&&!i.canShoot&&(o.textContent=i.online.connected?i.online.seat==null?"Bạn đang xem trận đấu":i.online.info?.ready?i.state==="GAME_OVER"?"Trận đã kết thúc":i.state==="PAUSED"?"Trận đang tạm dừng":["SHOT_IN_PROGRESS","BALLS_SETTLING"].includes(i.state)?"Bi đang lăn…":i.state==="BALL_IN_HAND"?"Đặt bi cái lên bàn":"Chờ lượt của bạn":"Đang chờ đối thủ…":"Đang kết nối lại…");const c=i.needsPocketCall;if(c&&i.canShoot&&!i.isAI&&(o.innerHTML=`<span>${i.calledPocket==null?i.mode.id==="eight"?"Chọn lỗ & đánh bi 8":"Chọn lỗ & đánh":(Fi[i.settings.language]||Fi.en).shoot}</span>${he("arrow",21)}`),lt("#call-panel").hidden=!c,lt("#call-ball-label").hidden=i.mode.id!=="ten",c){Ue("#call-description",i.mode.id==="eight"?"Bi số 8 cuối cùng: chọn lỗ bên dưới hoặc bấm Đánh bi để mở bảng chọn.":"Choose a ball and a pocket before shooting.");const h=i.physics.balls.filter(u=>u.active&&u.id!==0).map(u=>u.id).sort((u,f)=>u-f).map(u=>`<option value="${u}">${u}</option>`).join("");h!==bc&&(lt("#call-ball").innerHTML=h,bc=h),lt("#call-ball").value=i.calledBall??r[0]??10,Ue("#called-label",i.calledPocket==null?"No pocket called":be[i.calledPocket].name),document.querySelectorAll("[data-pocket]").forEach(u=>u.classList.toggle("selected",Number(u.dataset.pocket)===i.calledPocket))}if(lt("#table-state").hidden=!["PAUSED","BALL_IN_HAND"].includes(i.state),lt("#table-state").className=`table-state ${i.state==="BALL_IN_HAND"?"placement":""}`,Ue("#table-state",i.state==="PAUSED"?"Paused · press Esc to resume":"Ball in hand · tap a clear spot on the table"),lt("#pause").innerHTML=he(i.state==="PAUSED"?"play":"pause",18),lt("#pause").setAttribute("aria-label",i.state==="PAUSED"?"Resume":"Pause"),lt("#spin-marker").style.transform=`translate(${i.spin.x*23}px,${-i.spin.y*23}px)`,Ue("#spin-label",Math.abs(i.spin.x)+Math.abs(i.spin.y)<.12?"Center ball":[i.spin.y>.15?"Top spin":i.spin.y<-.15?"Back spin":"",i.spin.x>.15?"Right spin":i.spin.x<-.15?"Left spin":""].filter(Boolean).join(" + ")),document.querySelectorAll("[data-mode]").forEach(l=>{l.classList.toggle("selected",l.dataset.mode===i.mode.id),l.setAttribute("aria-pressed",l.dataset.mode===i.mode.id)}),i.online){const l=!i.online.connected||!i.online.info?.ready;l&&(lt("#table-state").hidden=!1,lt("#table-state").className="table-state placement",Ue("#table-state",i.online.connected?"Đang chờ đủ hai người chơi · chia sẻ mã phòng để mời bạn":"Mất kết nối · đang thử kết nối lại"));for(const h of document.querySelectorAll("#power,#spin-pad,#reset-spin,#call-ball,[data-pocket]"))"disabled"in h&&(h.disabled=!i.online.canAct);lt("#guide-toggle").disabled=i.online.seat==null||!i.online.connected,lt("#guide-toggle").title="Aim guide được đồng bộ cho cả phòng",lt("#pause").disabled=i.online.seat==null||l,lt("#restart").disabled=i.online.seat==null||i.state!=="GAME_OVER"||l,document.querySelectorAll("[data-mode]").forEach(h=>h.disabled=!0)}else document.querySelectorAll("#power,#reset-spin,#call-ball,[data-pocket],#pause,#restart,[data-mode],#guide-toggle").forEach(l=>l.disabled=!1);Wn?.update(),yh?.update(),Mh?.update(),Sh?.update(),bh?.update(),Eh?.update(),wh?.update(),i.state==="GAME_OVER"&&!pr&&(pr=!0,queueMicrotask(Nv)),i.state!=="GAME_OVER"&&pr&&(pr=!1,lt("#modal-title").textContent==="A game well played."&&lt("#modal").close())}try{mt=new Pv(lt("#scene"),Ah),window.__game=mt,Th(),Wn=new Yh(mt),window.__lobby=Wn,yh=new Oh(mt,Wn),Mh=new Bh(mt),Sh=new zh(mt),bh=new kh(mt),Eh=new Hh(mt),wh=new Gh(mt)}catch(i){console.error(i),lt("#render-error").hidden=!1,lt("#render-error").textContent="Your browser could not start 3D rendering. Enable WebGL / hardware acceleration and refresh."}function Ds(i,t){lt("#modal-title").textContent=i,lt("#modal-body").innerHTML=t,lt("#modal").open||lt("#modal").showModal()}function In(){lt("#modal").close()}lt("#close-modal").onclick=In;lt("#modal").addEventListener("click",i=>{if(i.target===lt("#modal")){const t=lt("#modal").getBoundingClientRect();(i.clientX<t.left||i.clientX>t.right||i.clientY<t.top||i.clientY>t.bottom)&&In()}});function _o(i){mt.start(i),mt.audio.play("button"),In()}function Ch(i=mt.mode.id){if(mt.online){mt.online.rematch(),In();return}if(mt.shots===0){_o(i);return}Ds("A fresh start?",`<p class="modal-lead">Start a new ${di.find(t=>t.id===i).name} match? Your current match will be cleared.</p><div class="modal-buttons"><button class="secondary" id="cancel-restart">Keep playing</button><button class="primary" id="confirm-restart">Start new match ${he("arrow",18)}</button></div>`),lt("#cancel-restart").onclick=In,lt("#confirm-restart").onclick=()=>_o(i)}document.querySelectorAll("[data-mode]").forEach(i=>i.onclick=()=>{i.dataset.mode!==mt.mode.id&&Ch(i.dataset.mode)});lt("#shoot").onclick=()=>mt.shoot();lt("#pause").onclick=()=>mt.pause();lt("#restart").onclick=()=>Ch();lt("#power").oninput=i=>mt.setPower(i.target.value/100);lt("#zoom-in").onclick=()=>mt.scene.zoom(-1);lt("#zoom-out").onclick=()=>mt.scene.zoom(1);lt("#reset-camera").onclick=()=>{mt.scene.resetCamera(),Rn="angle",lt("#camera").innerHTML=he("top",18),lt("#camera").setAttribute("aria-label","Switch to top view"),mt.notify()};lt("#expand-table").onclick=()=>{const i=document.body.classList.toggle("table-expanded");lt("#expand-table").setAttribute("aria-pressed",String(i)),lt("#expand-table").setAttribute("aria-label",i?"Thu gọn bàn":"Mở rộng bàn"),requestAnimationFrame(()=>{mt.scene.resize(),i&&lt("#play-area").scrollIntoView({behavior:"smooth",block:"start"})})};lt("#camera").onclick=()=>{Rn=mt.scene.view==="angle"?"top":"angle",mt.scene.setView(Rn),lt("#camera").innerHTML=he(Rn==="angle"?"top":"angle",18),lt("#camera").setAttribute("aria-label",`Switch to ${Rn==="angle"?"top":"angled"} view`),mt.notify()};lt("#mute").onclick=()=>{mt.muted=!mt.muted,mt.audio.setMuted(mt.muted),lt("#mute").innerHTML=he(mt.muted?"mute":"sound"),lt("#mute").setAttribute("aria-label",mt.muted?"Unmute sound":"Mute sound")};lt("#guide-toggle").onclick=()=>{mt.setSettings({aimGuide:!mt.settings.aimGuide}),lt("#guide-toggle .mini-toggle").classList.toggle("on",mt.settings.aimGuide)};lt("#reset-spin").onclick=()=>mt.setSpin(0,0);const Ln=lt("#spin-pad");let Nr=!1;function Rh(i){const t=Ln.getBoundingClientRect();let e=(i.clientX-t.left-t.width/2)/(t.width*.36),n=-(i.clientY-t.top-t.height/2)/(t.height*.36);const s=Math.hypot(e,n);s>1&&(e/=s,n/=s),mt.setSpin(e,n),Ln.setAttribute("aria-valuenow",Math.round(n*100)),Ln.setAttribute("aria-valuetext",`Horizontal ${Math.round(e*100)}, vertical ${Math.round(n*100)}`)}Ln.onpointerdown=i=>{Nr=!0,Ln.setPointerCapture(i.pointerId),Rh(i)};Ln.onpointermove=i=>{Nr&&Rh(i)};Ln.onpointerup=()=>Nr=!1;Ln.onpointercancel=()=>Nr=!1;Ln.onkeydown=i=>{let{x:t,y:e}=mt.spin;if(i.key==="Home")t=e=0;else if(i.key==="ArrowLeft")t-=.1;else if(i.key==="ArrowRight")t+=.1;else if(i.key==="ArrowUp")e+=.1;else if(i.key==="ArrowDown")e-=.1;else return;i.preventDefault(),mt.setSpin(t,e)};lt("#call-ball").onchange=i=>{mt.calledBall=Number(i.target.value)};document.querySelectorAll("[data-pocket]").forEach(i=>i.onclick=()=>{mt.calledPocket=Number(i.dataset.pocket),Ah(mt)});lt("#nav-play").onclick=()=>{Wn?.show()};lt(".brand").onclick=i=>{i.preventDefault(),Wn?.show()};lt("#new-match").onclick=()=>Wn?.show();const Iv={eight:"After a legal break, the table is open. The first legal group pocket assigns solids or stripes. Hit one of your own balls first and pocket it, or send a ball to a cushion after contact. Clear your group, then call a pocket for the 8-ball. Pocketing the 8 early, in the wrong pocket, or with a foul loses. An 8 on the break is spotted.",nine:"Always hit the lowest-numbered ball first. After that, combinations are legal: pocketing the 9 on a legal shot wins. A foul or scratch gives your opponent ball in hand. A 9 pocketed with a foul is spotted. A legal pocket keeps your turn.",ten:"Always hit the lowest ball first. Call the ball and pocket for each shot after the break using the controls below the table. A correctly called ordinary ball keeps your turn. An uncalled ordinary pot stays down and switches turns. The 10 is spotted if pocketed early, uncalled, or with a foul. Clear 1–9 and legally call and pocket the 10 to win.",carom:"Player 1 uses white; Player 2 uses yellow. Your cue ball must contact both other balls in one shot. A successful carom earns one point and keeps your turn. A miss passes the table. There are no pockets. First to the target score wins.",three:"Player 1 uses white; Player 2 uses yellow. Contact both object balls, with at least three cushion contacts by your cue ball before contact with the second distinct object ball. Cushions before the first object count, and repeated contacts with one cushion count. A point keeps your turn; otherwise players switch."};function jo(){const i=di.find(t=>t.id===mt.mode.id);Ds("A good shot starts here.",`<div class="guide-callout">${xh(mt.mode.id)}<div><strong>${i.name}</strong><p>${Iv[mt.mode.id]}</p></div></div><div class="instruction-grid"><div><span class="instruction-number">01</span><h3>Find your line</h3><p>Drag on the table with your mouse or finger to aim. The dotted guide shows your first contact.</p></div><div><span class="instruction-number">02</span><h3>Add your touch</h3><p>Set power with the slider. Tap the cue-ball diagram for top, back, or side spin.</p></div><div><span class="instruction-number">03</span><h3>Take the shot</h3><p>Press the shot button or Space. On desktop, Shift + drag down and release also shoots.</p></div><div><span class="instruction-number">04</span><h3>Make it yours</h3><p>Hold W/A/S/D to move the view. Use + / − or the mouse wheel to zoom; R resets the camera. Right-drag to orbit. Expand the table with the corner button. Esc pauses the match.</p></div></div><p class="fine-print">Pool break: pocket an object ball or send four distinct object balls to cushions. A foul gives ball in hand anywhere: tap a clear spot to place. Simplified club rules omit push-outs, three-foul losses and 10-ball pass-back. Spin, pocket jaws, and AI are lightweight approximations.</p>`)}lt("#instructions").onclick=jo;lt("#mode-rules").onclick=jo;lt("#footer-help").onclick=jo;function Ph(){Ds("Good games, remembered.",'<div id="history-list"></div>');let i=[];try{i=JSON.parse(localStorage.getItem("velvet-history")||"[]")}catch{}if(!i.length)lt("#history-list").innerHTML=`<div class="empty-state">${he("trophy",40)}<h3>Your story starts at the table.</h3><p>Completed matches will appear here, saved on this device.</p><button class="primary" id="back-play">Let's play ${he("arrow",18)}</button></div>`,lt("#back-play").onclick=In;else for(const t of i){const e=document.createElement("div");e.className="history-row";const n=document.createElement("div"),s=document.createElement("strong");s.textContent=t.mode;const r=document.createElement("small");r.textContent=new Date(t.date).toLocaleDateString(),n.append(s,r);const a=document.createElement("span");a.textContent=`${t.winner} won · ${$o(t.duration)}`,e.append(n,a),lt("#history-list").append(e)}}lt("#history").onclick=Ph;lt("#footer-history").onclick=Ph;function Dv(){const i=mt.settings;Ds("Your club. Your way.",`<form id="settings-form"><div class="settings-grid"><label>Opponent<select name="opponent"><option value="local">Local · two players</option><option value="ai">The house · AI opponent</option></select></label><label>AI difficulty<select name="difficulty"><option value="easy">Easy · a relaxed game</option><option value="medium">Medium · a worthy rival</option><option value="hard">Hard · an exacting table</option></select></label><label>Carom target score<select name="targetScore"><option>3</option><option>5</option><option>10</option><option>20</option></select></label><label>Graphics quality<select name="quality"><option value="low">Low · best performance</option><option value="medium">Medium · balanced</option><option value="high">High · full detail</option></select></label><label>Table felt<select name="tableColor"><option value="#087f75">Club teal</option><option value="#176f48">Classic green</option><option value="#245b89">Tournament blue</option><option value="#6d3452">Burgundy velvet</option></select></label><label>Ball appearance<select name="ballStyle"><option value="classic">Classic resin · satin</option><option value="gloss">Polished resin · gloss</option></select></label><label>Camera sensitivity<input name="sensitivity" type="range" min="0.3" max="2" step="0.1"></label><label>Sound effects<input name="volume" type="range" min="0" max="1" step="0.05"></label><label>Ambient music<input name="music" type="range" min="0" max="0.4" step="0.02"></label><label>Interface language<select name="language"><option value="en">English</option><option value="vi">Tiếng Việt · core controls</option></select></label><label class="checkbox-label"><input type="checkbox" name="aimGuide"> Show aim guide</label></div><p class="fine-print">Settings are saved on this device. Carom target changes apply to your next match. Rules and commentary are in English.</p><button class="primary full" type="submit">Save preferences ${he("check",18)}</button></form>`);const t=lt("#settings-form");for(const n of t.elements)n.name in i&&(n.type==="checkbox"?n.checked=i[n.name]:n.value=i[n.name]);if(mt.online)for(const n of["opponent","targetScore"])t.elements[n].disabled=!0,t.elements[n].title="Rời phòng online để thay đổi thiết lập trận.";mt.online&&(t.elements.aimGuide.disabled=mt.online.seat==null||!mt.online.connected);let e=!1;t.elements.aimGuide.onchange=()=>{e=!0},t.onsubmit=n=>{n.preventDefault();const s={};for(const r of t.elements)r.name&&(s[r.name]=r.type==="checkbox"?r.checked:r.type==="range"||r.name==="targetScore"?Number(r.value):r.value);mt.online&&(e||delete s.aimGuide,delete s.opponent,delete s.targetScore),mt.setSettings(s),Th(),lt("#guide-toggle .mini-toggle").classList.toggle("on",mt.settings.aimGuide),In()}}lt("#settings").onclick=Dv;function Nv(){if(mt.state!=="GAME_OVER")return;const i=ys(mt.playerName(mt.mode.winner));Ds("A game well played.",`<div class="result-content"><div class="result-trophy">${he("trophy",45)}</div><div class="eyebrow">${di.find(t=>t.id===mt.mode.id).name.toUpperCase()}</div><h3>${i} wins.</h3><p>${mt.message}</p><div class="result-series"><small>TỈ SỐ CHUNG CUỘC · SỐ VÁN THẮNG</small><div><span>${ys(mt.playerName(0))}</span><strong>${mt.seriesScores[0]} — ${mt.seriesScores[1]}</strong><span>${ys(mt.playerName(1))}</span></div></div><div class="result-stats"><span><strong>${mt.mode.scores[0]} — ${mt.mode.scores[1]}</strong>FINAL SCORE</span><span><strong>${$o(mt.elapsed)}</strong>AT THE TABLE</span><span><strong>${mt.shots}</strong>SHOTS PLAYED</span></div><div class="modal-buttons"><button class="secondary" id="result-menu">Main menu</button><button class="primary" id="result-replay">Play again ${he("arrow",18)}</button></div></div>`),lt("#result-replay").onclick=()=>_o(mt.mode.id),lt("#result-menu").onclick=()=>{In(),Wn?.show()},mt.online&&(lt("#result-replay").textContent=mt.online.seat==null?"Về bàn xem":"Đồng ý tái đấu",lt("#result-replay").onclick=()=>{mt.online.seat!=null&&mt.online.rematch(),In()})}
