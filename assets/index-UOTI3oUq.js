(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();class Th{constructor(t,e){this.game=t,document.querySelector("#online-room").insertAdjacentHTML("beforebegin",`
      <section id="match-tools" class="match-tools" aria-label="Thanh điều hướng trận đấu">
        <nav aria-label="Điều hướng"><button id="tools-lobby">Sảnh chơi</button><button id="tools-rules">Luật chơi</button><button id="tools-names">Đổi tên</button><button id="tools-settings">Cài đặt</button></nav>
        <div class="camera-pad" role="group" aria-label="Điều hướng góc nhìn"><span>Góc nhìn</span><button data-camera="KeyA" aria-label="Dịch góc nhìn sang trái">←</button><button data-camera="KeyW" aria-label="Dịch góc nhìn tiến">↑</button><button data-camera="KeyS" aria-label="Dịch góc nhìn lùi">↓</button><button data-camera="KeyD" aria-label="Dịch góc nhìn sang phải">→</button></div>
      </section>
      <section id="series-scoreboard" class="series-scoreboard" aria-label="Tỉ số chung cuộc hai người">
        <div class="series-heading"><span id="series-heading">TỈ SỐ ĐỐI ĐẦU</span><small>SỐ VÁN THẮNG</small></div>
        <div class="series-duel"><strong id="series-name-0"></strong><span id="series-values">0 — 0</span><strong id="series-name-1"></strong></div>
        <div class="series-meta"><span id="series-explanation"></span><button id="reset-series">Đặt lại tỉ số</button></div>
      </section>
      <div id="cue-placement-tools" class="cue-placement-tools" hidden><button id="reposition-cue">Đặt lại bi trắng</button><span id="placement-help"></span></div>`);const n=s=>document.getElementById(s);n("tools-lobby").onclick=()=>e.show(),n("tools-rules").onclick=()=>n("instructions").click(),n("tools-names").onclick=()=>e.editNames(),n("tools-settings").onclick=()=>n("settings").click(),n("reposition-cue").onclick=()=>t.repositionCue(),n("reset-series").onclick=()=>{!t.online&&window.confirm("Đặt tỉ số số ván thắng về 0 — 0?")&&t.resetSeries()};for(const s of document.querySelectorAll("[data-camera]")){const r=s.dataset.camera;s.onpointerdown=o=>{o.button===0&&(o.preventDefault(),s.focus({preventScroll:!0}),s.setPointerCapture(o.pointerId),t.input.keys.add(r))};const a=()=>t.input.keys.delete(r);s.onpointerup=a,s.onpointercancel=a,s.onlostpointercapture=a,s.onclick=o=>{if(o.detail===0){const l={KeyA:[-.2,0],KeyD:[.2,0],KeyW:[0,.2],KeyS:[0,-.2]};t.scene.pan(...l[r])}}}this.update()}update(){const t=this.game,e=a=>document.getElementById(a),n=t.seriesScores;for(let a=0;a<2;a++){const o=e("series-name-"+a),l=t.playerName(a);o.textContent!==l&&(o.textContent=l),o.title=l}const s=`${n[0]} — ${n[1]}`;e("series-values").textContent!==s&&(e("series-values").textContent=s),e("series-heading").textContent=t.state==="GAME_OVER"?"TỈ SỐ CHUNG CUỘC":"TỈ SỐ ĐỐI ĐẦU",e("series-explanation").textContent=t.online?"Giữ tỉ số qua các ván tái đấu. Đổi người chơi sẽ bắt đầu lại. Aim guide dùng chung cho cả phòng.":"Giữ số ván thắng khi tải lại trang; điểm trong ván hiển thị ở bảng người chơi.",e("reset-series").hidden=!!t.online;const r=t.online?t.online.canAct:!t.isAI;e("cue-placement-tools").hidden=!(r&&t.placementAllowed&&["PLAYER_TURN","BALL_IN_HAND"].includes(t.state)),e("reposition-cue").hidden=!t.canReposition,e("placement-help").textContent=t.state==="BALL_IN_HAND"?"Nhấn một vị trí trống trên bàn để đặt bi trắng.":"Có thể đặt lại nhiều lần; quyền đặt bi kết thúc khi bạn đánh."}}class wh{constructor(t){this.game=t,document.querySelector(".table-footer").insertAdjacentHTML("beforebegin",`
      <section class="cue-angle-control" id="cue-angle-control" aria-label="Điều chỉnh góc cơ">
        <div class="cue-angle-heading"><label for="cue-angle-range">GÓC CƠ</label><output id="cue-angle-value" for="cue-angle-range">0.0°</output></div>
        <button type="button" id="cue-angle-left" aria-label="Xoay cơ ngược chiều kim đồng hồ" title="Xoay cơ −0,1° · giữ để xoay liên tục">↶</button>
        <div class="cue-angle-track"><input type="range" id="cue-angle-range" min="0" max="359.9" step="0.1" value="0" aria-label="Điều chỉnh góc cơ"><div class="cue-angle-scale"><span>0°</span><span>180°</span><span>360°</span></div></div>
        <button type="button" id="cue-angle-right" aria-label="Xoay cơ cùng chiều kim đồng hồ" title="Xoay cơ +0,1° · giữ để xoay liên tục">↷</button>
        <span id="cue-angle-help">Kéo để ngắm · ← / → chỉnh 0,1° · Giữ nút để xoay liên tục</span>
      </section>`),this.range=document.getElementById("cue-angle-range"),this.value=document.getElementById("cue-angle-value"),this.buttons=[-1,1].map(e=>{const n=document.getElementById(e<0?"cue-angle-left":"cue-angle-right");n.onpointerdown=r=>{r.button!==0||n.disabled||(r.preventDefault(),n.focus({preventScroll:!0}),n.setPointerCapture(r.pointerId),t.input.beginCueTurn(e))};const s=()=>t.input.endCueTurn(e);return n.onpointerup=s,n.onpointercancel=s,n.onlostpointercapture=s,n.onclick=r=>{r.detail===0&&t.setAngle(t.angle+e*Math.PI/1800)},n}),this.range.oninput=()=>t.setAngle(Number(this.range.value)*Math.PI/180),this.update()}update(){const t=this.game,e=t.lobbyOpen||!t.canShoot||t.isAI;this.range.disabled=e;for(const r of this.buttons)r.disabled=e;const n=(t.angle*180/Math.PI%360+360)%360,s=Math.round(n*10)%3600/10;Number(this.range.value)!==s&&(this.range.value=String(s)),this.range.setAttribute("aria-valuetext",`${s.toFixed(1)} độ`),this.value.textContent=`${s.toFixed(1)}°`,document.getElementById("cue-angle-help").textContent=e?"Chỉnh góc cơ khi đến lượt bạn và tất cả bi đã dừng.":"Kéo để ngắm · ← / → chỉnh 0,1° · Giữ nút để xoay liên tục"}}const Yo=["Trên trái","Trên giữa","Trên phải","Dưới trái","Dưới giữa","Dưới phải"];class Ah{constructor(t){this.game=t,document.body.insertAdjacentHTML("beforeend",`
      <dialog id="shot-call-dialog" aria-labelledby="shot-call-title" aria-describedby="shot-call-description">
        <div class="eyebrow">HOÀN TẤT CÚ ĐÁNH</div><h2 id="shot-call-title">Chọn lỗ cho bi số 8</h2>
        <p id="shot-call-description"></p>
        <div class="shot-call-board" role="group" aria-label="Chọn lỗ được gọi">
          ${Yo.map((e,n)=>`<button type="button" data-shot-pocket="${n}" aria-pressed="false"><strong>${n+1}</strong><span>${e}</span></button>`).join("")}
          <span id="shot-call-ball" aria-hidden="true">8</span>
        </div>
        <p id="shot-call-selection" role="status">Chưa chọn lỗ.</p>
        <div class="modal-buttons"><button type="button" class="secondary" id="shot-call-cancel">Quay lại ngắm</button><button type="button" class="primary" id="shot-call-confirm" disabled>Đánh bi số 8</button></div>
      </dialog>`),this.dialog=document.getElementById("shot-call-dialog"),this.confirm=document.getElementById("shot-call-confirm"),this.pockets=[...this.dialog.querySelectorAll("[data-shot-pocket]")],t.onCallRequired=()=>this.open();for(const e of this.pockets)e.onclick=()=>{if(!this.isCurrent())return this.dialog.close();this.selected=Number(e.dataset.shotPocket);for(const n of this.pockets)n.setAttribute("aria-pressed",String(n===e));this.confirm.disabled=!1,document.getElementById("shot-call-selection").textContent=`Lỗ ${this.selected+1} · ${Yo[this.selected]}`};document.getElementById("shot-call-cancel").onclick=()=>this.dialog.close(),this.confirm.onclick=()=>{if(!this.isCurrent()||this.selected==null)return this.dialog.close();t.calledPocket=this.selected,this.dialog.close(),t.shoot()},this.dialog.onclose=()=>{this.context=null}}open(){const t=this.game;if(this.dialog.open||!t.canShoot||t.isAI||!t.needsPocketCall)return;this.context={mode:t.mode,player:t.mode.currentPlayer,shots:t.shots,matchId:t.online?.info?.matchId},this.selected=null,this.confirm.disabled=!0;for(const n of this.pockets)n.setAttribute("aria-pressed","false");const e=t.mode.id==="eight";document.getElementById("shot-call-title").textContent=e?"Chọn lỗ cho bi số 8":"Chọn lỗ cho cú đánh",document.getElementById("shot-call-description").textContent=e?"Bạn đã dọn hết nhóm bi. Chọn lỗ muốn đưa bi đen vào, rồi xác nhận đánh. Bi số 8 vào lỗ khác sẽ thua.":"Chọn lỗ cho bi đã gọi, rồi xác nhận đánh. Cú đánh dùng góc cơ, lực và xoáy bạn vừa chọn.",document.getElementById("shot-call-ball").textContent=e?"8":String(t.calledBall??t.mode.legalTargets(t.physics.balls)[0]??10),document.getElementById("shot-call-selection").textContent="Chưa chọn lỗ. Chọn số tương ứng với lỗ trên bàn.",this.confirm.textContent=e?"Đánh bi số 8":"Xác nhận và đánh",this.dialog.showModal()}isCurrent(){const t=this.game,e=this.context;return e&&!t.lobbyOpen&&t.canShoot&&!t.isAI&&t.needsPocketCall&&e.mode===t.mode&&e.player===t.mode.currentPlayer&&e.shots===t.shots&&e.matchId===t.online?.info?.matchId}update(){this.dialog.open&&!this.isCurrent()&&this.dialog.close()}}const Et={width:5.6,height:2.8,halfWidth:2.8,halfHeight:1.4,radius:.065,pocketRadius:.15},Ae=[{x:-2.8,z:-1.4,name:"Top left"},{x:0,z:-1.4,name:"Top middle"},{x:2.8,z:-1.4,name:"Top right"},{x:-2.8,z:1.4,name:"Bottom left"},{x:0,z:1.4,name:"Bottom middle"},{x:2.8,z:1.4,name:"Bottom right"}],ci=[{id:"eight",name:"8-Ball Pool",short:"8-BALL",tag:"THE CLASSIC",description:"Solids or stripes. Clear your colors, then sink the eight.",balls:15},{id:"nine",name:"9-Ball Pool",short:"9-BALL",tag:"FAST & TACTICAL",description:"Play the lowest ball first. A legal nine takes the match.",balls:9},{id:"ten",name:"10-Ball Pool",short:"10-BALL",tag:"PRECISION PLAY",description:"Every shot has a purpose. Call your ball and pocket.",balls:10},{id:"carom",name:"Carom Billiards",short:"CAROM",tag:"PURE TECHNIQUE",description:"Three balls. No pockets. Connect with both to score.",balls:3},{id:"three",name:"Three-Cushion",short:"3-CUSHION",tag:"MASTER THE ANGLES",description:"Find three cushions before the second object ball.",balls:3}],pc=["#f6f5e9","#e9b724","#2866c2","#d2453e","#8051a4","#e77830","#2a8b6b","#8c3644","#20262a","#e9b724","#2866c2","#d2453e","#8051a4","#e77830","#2a8b6b","#8c3644"];function ri(i,t,e){return{id:i,x:t,z:e,vx:0,vz:0,radius:Et.radius,mass:1,active:!0,spin:{x:0,y:0},angularVelocity:0}}function mc(i,t){const e=[ri(0,-1.4,0)],n=Et.radius*2+.002;let s=0;for(let r=0;r<t;r++)for(let a=0;a<=r;a++)e.push(ri(i[s++],1.05+r*n*Math.sqrt(3)/2,(a-r/2)*n));return e}class fo{constructor({id:t,name:e,pockets:n=!0,targetScore:s=5}){this.id=t,this.name=e,this.pockets=n,this.targetScore=Math.max(1,Math.min(50,Number(s)||5)),this.currentPlayer=0,this.scores=[0,0],this.groups=[null,null],this.winner=null,this.isBreak=!0}cueId(){return 0}switchTurn(){this.currentPlayer=1-this.currentPlayer}legalTargets(t){return t.filter(e=>e.active&&e.id!==this.cueId()).map(e=>e.id)}result(t,e={}){return{foul:!1,ballInHand:!1,message:t,winner:this.winner,respot:[],...e}}shotFacts({events:t=[],balls:e=[],initialBalls:n=null}){const s=this.cueId(),r=t.filter(d=>d.type==="pocket"),a=r.map(d=>d.ball),o=n||e.filter(d=>d.active||a.includes(d.id)),l=t.findIndex(d=>d.type==="collision"&&(d.a===s||d.b===s)),c=l<0?null:t[l].a===s?t[l].b:t[l].a,h=l<0?[]:t.slice(l+1),u=h.some(d=>d.type==="cushion"||d.type==="pocket"),f=new Set(h.filter(d=>d.type==="cushion"&&d.ball!==s).map(d=>d.ball)).size;return{cue:s,pockets:r,potted:a,before:o,first:c,railOrPocket:u,breakRails:f,events:t}}poolFoul(t,e){if(t.potted.includes(t.cue))return"Scratch — cue ball pocketed.";if(t.first===null)return"No object ball contacted.";if(!e.includes(t.first))return"Wrong first contact.";const n=t.potted.some(s=>s!==t.cue);return this.isBreak&&!n&&t.breakRails<4?"Illegal break — pocket a ball or send four object balls to cushions.":!this.isBreak&&!t.railOrPocket?"No cushion or pocket after contact.":null}foul(t,e={}){return this.isBreak=!1,this.switchTurn(),this.result(`${t} Ball in hand for Player ${this.currentPlayer+1}.`,{foul:!0,ballInHand:!0,...e})}display(t){return{objective:"Choose your line. Commit to the shot.",players:[0,1].map(e=>({label:`Player ${e+1}`,detail:`${this.scores[e]} points`,remaining:[]}))}}}const Ln=i=>i>=1&&i<=7?"solids":i>=9&&i<=15?"stripes":null;class Rh extends fo{constructor(t={}){super({...t,id:"eight",name:"8-Ball Pool"})}setup(){return mc([1,9,2,10,8,3,11,4,12,5,6,13,7,14,15],5)}legalTargets(t){const e=this.groups[this.currentPlayer];if(!e)return t.filter(s=>s.active&&Ln(s.id)).map(s=>s.id);const n=t.filter(s=>s.active&&Ln(s.id)===e).map(s=>s.id);return n.length?n:[8]}updateScores(t){this.scores=this.groups.map(e=>e?7-t.filter(n=>n.active&&Ln(n.id)===e).length:0)}evaluateShot(t){const e=this.shotFacts(t),n=this.legalTargets(e.before),s=this.poolFoul(e,n),r=this.isBreak;this.isBreak=!1;const a=e.pockets.find(l=>l.ball===8);if(a&&!r){const l=!s&&n.includes(8)&&t.calledPocket===a.pocket;return this.winner=l?this.currentPlayer:1-this.currentPlayer,this.updateScores(t.balls),this.result(l?"Eight in the called pocket. Match won!":"Illegal eight — pocket it only after clearing your group, in the called pocket.",{foul:!l})}if(s)return this.updateScores(t.balls),this.foul(s,{respot:a?[8]:[]});if(!r&&!this.groups[this.currentPlayer]){const l=e.potted.map(Ln).find(Boolean);l&&(this.groups[this.currentPlayer]=l,this.groups[1-this.currentPlayer]=l==="solids"?"stripes":"solids")}const o=e.potted.some(l=>r?Ln(l)||l===8:Ln(l)===this.groups[this.currentPlayer]);return this.updateScores(t.balls),o||this.switchTurn(),this.result(a?"Eight on the break is spotted. Continue.":o?`Legal pocket. Player ${this.currentPlayer+1} continues.`:`Player ${this.currentPlayer+1} to shoot.`,{respot:a?[8]:[]})}display(t){const e=this.legalTargets(t);return{objective:e[0]===8&&e.length===1?"Call a pocket for the eight, then make your finish.":this.groups[this.currentPlayer]?`Pocket your ${this.groups[this.currentPlayer]}. Save the eight for last.`:this.isBreak?"Break the rack. Pocket a ball or reach four cushions.":"Open table. A legal pocket assigns solids and stripes.",players:[0,1].map(n=>({label:`Player ${n+1}`,detail:this.groups[n]||"Open table",remaining:t.filter(s=>s.active&&(this.groups[n]?Ln(s.id)===this.groups[n]:Ln(s.id))).map(s=>s.id)}))}}}class gc extends fo{constructor(t={}){super({...t,id:"nine",name:"9-Ball Pool"})}setup(){const t=[ri(0,-1.4,0)],e=Et.radius*2+.002,n=[1,2,3,4,9,5,6,7,8];let s=0;return[1,2,3,2,1].forEach((r,a)=>{for(let o=0;o<r;o++)t.push(ri(n[s++],1.05+a*e*Math.sqrt(3)/2,(o-(r-1)/2)*e))}),t}legalTargets(t){const e=t.filter(n=>n.active&&n.id>0).map(n=>n.id);return e.length?[Math.min(...e)]:[]}evaluateShot(t){const e=this.shotFacts(t),n=this.poolFoul(e,this.legalTargets(e.before));if(this.isBreak=!1,n)return this.foul(n,{respot:e.potted.includes(9)?[9]:[]});if(e.potted.includes(9))return this.winner=this.currentPlayer,this.scores[this.currentPlayer]++,this.result("A legal nine. Match won!");const s=e.potted.filter(r=>r>0).length;return this.scores[this.currentPlayer]+=s,s||this.switchTurn(),this.result(s?"Legal pocket. Keep your turn.":`Player ${this.currentPlayer+1} to shoot.`)}display(t){return{objective:`Contact the ${this.legalTargets(t)[0]??"nine"} first. A legal nine wins, including combinations.`,players:[0,1].map(e=>({label:`Player ${e+1}`,detail:`${this.scores[e]} pocketed`,remaining:t.filter(n=>n.active&&n.id>0).map(n=>n.id).sort((n,s)=>n-s)}))}}}class Ch extends gc{constructor(t={}){super(t),this.id="ten",this.name="10-Ball Pool"}setup(){return mc([1,2,3,4,10,5,6,7,8,9],4)}evaluateShot(t){const e=this.shotFacts(t),n=this.legalTargets(e.before),s=this.poolFoul(e,n),r=this.isBreak;this.isBreak=!1;const a=e.pockets.find(c=>c.ball===10);if(s)return this.foul(s,{respot:a?[10]:[]});const o=e.pockets.find(c=>c.ball===Number(t.calledBall)&&c.pocket===t.calledPocket);if(a&&!r&&n[0]===10&&o?.ball===10)return this.winner=this.currentPlayer,this.scores[this.currentPlayer]++,this.result("Ten in the called pocket. Match won!");const l=r?e.potted.some(c=>c>0&&c!==10):!!(o&&o.ball!==10);return this.scores[this.currentPlayer]+=e.potted.filter(c=>c>0&&c!==10).length,l||this.switchTurn(),this.result(a?"Ten spotted. It must be called and pocketed last.":l?"Called ball made. Keep your turn.":r?`Legal break. Player ${this.currentPlayer+1} to shoot.`:`No called pocket. Player ${this.currentPlayer+1} to shoot.`,{respot:a?[10]:[]})}display(t){const e=super.display(t);return e.objective=this.isBreak?"Break the rack. The ten is spotted on the break.":`Contact the ${this.legalTargets(t)[0]??10} first. Call a ball and pocket; finish with the ten last.`,e}}class vc extends fo{constructor(t={}){super({...t,id:"carom",name:"Carom Billiards",pockets:!1}),this.isBreak=!1}setup(){return[ri(0,-1.4,.38),ri(1,-1.4,-.38),ri(2,1.4,0)]}cueId(){return this.currentPlayer}evaluateShot(t){const e=this.cueId(),n=new Set;let s=0,r=0;for(const o of t.events)if(o.type==="cushion"&&o.ball===e&&s++,o.type==="collision"&&(o.a===e||o.b===e)&&(n.add(o.a===e?o.b:o.a),n.size===2)){r=s;break}const a=n.size===2&&(this.id!=="three"||r>=3);return this.lastCushionCount=n.size===2?r:s,a?(this.scores[this.currentPlayer]++,this.scores[this.currentPlayer]>=this.targetScore&&(this.winner=this.currentPlayer),this.result(this.winner!==null?"Target reached. Match won!":"Carom! One point. Keep your turn.")):(this.switchTurn(),this.result(this.id==="three"?`No point — three cushions must precede the second object ball. Player ${this.currentPlayer+1} to shoot.`:`No carom. Player ${this.currentPlayer+1} to shoot.`))}display(){return{objective:this.id==="three"?`Three cushions before the second object ball. First to ${this.targetScore}.`:`Hit both object balls with your cue ball. First to ${this.targetScore}.`,players:[0,1].map(t=>({label:`Player ${t+1}`,detail:`${t===0?"White":"Yellow"} · ${this.scores[t]} / ${this.targetScore}`,remaining:[]}))}}}class Ph extends vc{constructor(t={}){super(t),this.id="three",this.name="Three-Cushion Billiards"}}function _c(i,t={}){const e={eight:Rh,nine:gc,ten:Ch,carom:vc,three:Ph};if(!e[i])throw new Error(`Unknown game mode: ${i}`);return new e[i](t)}const Ls="velvet-room-session";async function Lh(){let i="";if(!i)try{const e=await fetch(new URL("./online-config.json",document.baseURI),{cache:"no-store"});e.ok&&(i=(await e.json()).serverUrl||"")}catch{}if(!i&&location.hostname.endsWith(".github.io"))throw new Error("Phòng online chưa được kích hoạt trên website này. Bạn vẫn có thể chọn Đấu với máy.");const t=new URL(i||location.origin);if(!["https:","http:","wss:","ws:"].includes(t.protocol)||t.username||t.password)throw new Error("Địa chỉ máy chủ online không hợp lệ.");if(location.protocol==="https:"&&["http:","ws:"].includes(t.protocol))throw new Error("Máy chủ online cần kết nối HTTPS an toàn.");return t.protocol=["https:","wss:"].includes(t.protocol)?"wss:":"ws:",t.pathname="/ws",t.search="",t.hash="",t.href}class ms{constructor(t,e=()=>{}){this.game=t,this.onChange=e,this.connected=!1,this.closed=!1,this.seat=null,this.info=null,this.pending=!1,this.frames=[],this.name="Khách",this.retry=0,this.lastAimAt=0}static saved(){try{return JSON.parse(sessionStorage.getItem(Ls)||"null")}catch{return null}}get canAct(){return this.connected&&this.info?.ready&&this.info.phase==="playing"&&this.seat===this.game.mode.currentPlayer&&!this.pending}get canShoot(){return this.canAct&&["PLAYER_TURN","BREAK_SHOT"].includes(this.game.state)}get showAim(){return this.connected&&this.info?.ready&&["PLAYER_TURN","BREAK_SHOT"].includes(this.game.state)}async connect(t){if(this.closed=!1,this.request=t,this.name=t.name||this.name,this.url=await Lh(),this.closed)throw new Error("Đã hủy kết nối.");return this.open(!1)}open(t){return new Promise((e,n)=>{const s=this.socket=new WebSocket(this.url);let r=!1;const a=l=>{r||(r=!0,clearTimeout(o),l?n(l):e(this))},o=setTimeout(()=>{a(new Error("Chưa kết nối được máy chủ. Máy chủ có thể đang khởi động; hãy thử lại sau ít phút.")),s.close()},25e3);s.addEventListener("open",()=>{const l=t?{type:"join",roomId:this.roomId,name:this.name,spectate:this.seat==null,resumeToken:this.resumeToken}:this.request;s.send(JSON.stringify(l))}),s.addEventListener("message",l=>{if(this.closed)return;let c;try{c=JSON.parse(l.data)}catch{return}if(c.type==="joined"){this.roomId=c.roomId,this.seat=c.seat,this.resumeToken=c.resumeToken,this.connected=!0,this.retry=0,this.game.online=this;try{sessionStorage.setItem(Ls,JSON.stringify({roomId:this.roomId,resumeToken:this.resumeToken,seat:this.seat,name:this.name}))}catch{}}else if(c.type==="renamed"){this.name=c.name;try{localStorage.setItem("velvet-player-name",c.name);const h=ms.saved();h?.roomId===this.roomId&&sessionStorage.setItem(Ls,JSON.stringify({...h,name:c.name}))}catch{}this.game.setSettings({playerNames:[c.name,this.game.settings.playerNames?.[1]||"Người chơi 2"]}),this.game.notify(),this.onChange(this)}else c.type==="snapshot"&&this.connected?(this.receive(c),a()):c.type==="error"?(this.pending=!1,this.error=c.message,r||(a(new Error(c.message)),this.closed=!0,s.close(),t&&(this.connectionLost=!0)),this.game.notify(),this.onChange(this)):c.type==="replaced"&&(this.closed=!0,this.connected=!1,this.error=c.message,this.clearSaved(),this.game.notify(),this.onChange(this),a(new Error(c.message)))}),s.addEventListener("close",()=>{const l=!!this.roomId;this.connected=!1,this.pending=!1,a(new Error("Kết nối máy chủ đã đóng. Vui lòng thử lại.")),l&&!this.closed&&(this.error="Mất kết nối. Đang thử kết nối lại…",this.frames=[],this.disconnectedAt||(this.disconnectedAt=Date.now()),Date.now()-this.disconnectedAt<6e4?this.retryTimer=setTimeout(()=>this.open(!0).catch(c=>{this.error=c.message,this.onChange(this)}),Math.min(1e3*2**this.retry++,5e3)):(this.connectionLost=!0,this.error="Kết nối đã hết thời gian giữ ghế. Hãy về sảnh và vào lại phòng.",this.clearSaved())),this.game.notify(),this.onChange(this)}),s.addEventListener("error",()=>{})})}receive(t){const e=this.game,n=this.info;if(n&&n.matchId===t.matchId&&t.seq<=n.seq)return;const s=!n||n.matchId!==t.matchId,r=s||n.revision!==t.revision;s&&(e.mode=_c(t.mode.id,{targetScore:t.mode.targetScore}),e.scene.setMode(e.mode.pockets),this.frames=[],this.lastSavedMatch=null),this.info=t,this.error="",this.disconnectedAt=null,this.connectionLost=!1,r&&(this.pending=!1,this.lastAim=null);const a=this.seat===t.mode.currentPlayer&&t.ready&&["PLAYER_TURN","BREAK_SHOT"].includes(t.state)&&!r;Object.assign(e.mode,t.mode),e.physics.pockets=e.mode.pockets,e.physics.setBalls(t.balls),e.state=t.state,e.placementAllowed=!!t.placementAllowed;const o=typeof t.aimGuide=="boolean"&&t.aimGuide!==e.settings.aimGuide;e.applySharedAimGuide(t.aimGuide),e.shots=t.shots,e.cushions=t.cushions,e.message=t.message,a||Object.assign(e,t.aim,{spin:{...t.aim.spin}}),this.frames.push({at:performance.now(),balls:t.balls}),this.frames.length>10&&this.frames.shift();for(const l of t.effects||[])e.audio.play(l.type,l.strength??.5);t.state==="GAME_OVER"&&this.lastSavedMatch!==t.matchId&&(this.lastSavedMatch=t.matchId,e.audio.play(this.seat!=null&&e.mode.winner!==this.seat?"lose":"win"),this.seat!=null&&e.saveMatch()),(r||o||n?.ready!==t.ready)&&e.notify(),this.onChange(this)}send(t){return!this.connected||this.socket?.readyState!==WebSocket.OPEN?!1:(this.socket.send(JSON.stringify(t)),!0)}command(t,e={}){return this.info?this.send({type:t,matchId:this.info.matchId,revision:this.info.revision,...e}):!1}shotData(){const t=this.game;return{angle:t.angle,power:t.power,spin:{...t.spin},calledBall:t.calledBall,calledPocket:t.calledPocket}}shoot(){if(!this.canShoot)return!1;const t=this.command("shoot",this.shotData());return t&&(this.pending=!0,this.pendingAt=performance.now(),this.game.notify()),t}place(t,e){if(!this.canAct||!(this.game.state==="BALL_IN_HAND"||this.game.canReposition))return!1;const n=this.command("place",{x:t,z:e});return n&&(this.pending=!0,this.pendingAt=performance.now()),n}repositionCue(){if(!this.game.canReposition)return!1;const t=this.command("reposition");return t&&(this.pending=!0,this.pendingAt=performance.now()),t}pause(){this.seat!=null&&this.connected&&this.info?.ready&&this.command("pause")}rematch(){this.seat!=null&&this.game.state==="GAME_OVER"?this.command("rematch"):(this.error="Phòng online chỉ tái đấu khi trận kết thúc và cả hai người đồng ý.",this.game.notify())}claimSeat(){return this.command("claim")}update(){const t=performance.now();if(this.pending&&t-this.pendingAt>3e3&&(this.pending=!1,this.error="Cú đánh chưa được xác nhận. Kiểm tra kết nối rồi thử lại."),this.canShoot&&t-this.lastAimAt>80){const a=this.shotData(),o=JSON.stringify(a);o!==this.lastAim&&(this.command("aim",a),this.lastAim=o),this.lastAimAt=t}if(!this.frames.length){this.renderBalls=this.game.physics.balls;return}const e=t-90;for(;this.frames.length>2&&this.frames[1].at<e;)this.frames.shift();const n=this.frames[0],s=this.frames[1]||n,r=n===s?1:Math.max(0,Math.min(1,(e-n.at)/(s.at-n.at||1)));this.renderBalls=s.balls.map((a,o)=>{const l=n.balls[o];return!l||l.id!==a.id||l.active!==a.active||Math.hypot(l.x-a.x,l.z-a.z)>1?a:{...a,x:l.x+(a.x-l.x)*r,z:l.z+(a.z-l.z)*r}})}clearSaved(){try{ms.saved()?.roomId===(this.roomId||this.request?.roomId)&&sessionStorage.removeItem(Ls)}catch{}}leave(){this.closed=!0,clearTimeout(this.retryTimer),this.send({type:"leave"}),this.clearSaved(),this.socket?.close(),this.connected=!1,this.game.online===this&&(this.game.online=null,this.game.start()),this.onChange(null)}}function Ir(i,t="Người chơi"){return(typeof i=="string"?i:"").replace(/[\u0000-\u001f\u007f<>\u202a-\u202e\u2066-\u2069]/g,"").trim().slice(0,24)||t}const wt=i=>document.querySelector(i),$o=ci.map(i=>`<option value="${i.id}">${i.name}</option>`).join("");class Ih{constructor(t){this.game=t,document.body.insertAdjacentHTML("beforeend",`
<section id="room-lobby" class="lobby-screen" aria-label="Sảnh chơi billiards">
  <header class="lobby-header"><a class="brand" href="#" id="lobby-home"><span class="brand-mark">v<span>•</span></span><span>velvet<small>BILLIARDS CLUB</small></span></a><span class="lobby-topline"><i></i> CÙNG MỘT BÀN. CÙNG MỘT NHỊP.</span><button class="secondary" id="lobby-resume" hidden>Về bàn đang chơi →</button></header>
  <div class="lobby-content"><div class="eyebrow"><span></span> MỘT TRẬN ĐẤU HAY BẮT ĐẦU TỪ ĐÂY</div><h1>Hẹn nhau ở bàn bi.</h1><p class="lobby-intro">Mời một người bạn, vào xem một trận hay, hoặc thử sức với máy.<br>Chọn cách chơi của bạn — phần còn lại, để đường bi lên tiếng.</p>
  <div class="lobby-name"><label for="room-name">TÊN NGƯỜI CHƠI</label><input id="room-name" maxlength="24" autocomplete="nickname" placeholder="Ví dụ: Hiệp" value="Người chơi"><button type="button" id="edit-player-names" class="text-button">Đặt / đổi tên người chơi →</button></div>
  <div id="lobby-feedback" role="status" hidden></div>
  <div class="lobby-grid">
    <form id="create-room-form" class="lobby-card featured"><div class="lobby-card-art"><span class="lobby-ball eight">8</span><span class="art-line"></span><span class="art-caption">YOUR TABLE, YOUR PEOPLE.</span></div><span class="lobby-card-tag">01 / MỜI BẠN CÙNG CHƠI</span><h2>Tạo phòng</h2><p>Một mã phòng riêng. Hai người thi đấu.<br>Bạn bè có thể vào xem và theo dõi trực tiếp.</p><label>CHẾ ĐỘ<select id="room-mode">${$o}</select></label><label>ĐIỂM ĐÍCH CAROM<select id="room-target"><option>3</option><option selected>5</option><option>10</option><option>20</option></select></label><button class="primary full" id="create-room" type="submit">Tạo phòng mới <span>→</span></button><small>Chia sẻ mã hoặc đường dẫn để mời bạn.</small></form>
    <form id="join-room-form" class="lobby-card"><div class="lobby-card-art join-art"><span class="lobby-ball white"></span><span class="lobby-ball gold"></span><span class="art-line"></span></div><span class="lobby-card-tag">02 / GẶP NHAU TẠI ĐÂY</span><h2>Nhập mã phòng</h2><p>Đã có lời hẹn? Nhập mã để ngồi vào bàn,<br>hoặc chọn một chỗ trong hàng ghế khán giả.</p><label>MÃ PHÒNG<input id="room-code" placeholder="VD: AB3K7X" maxlength="6" minlength="6" pattern="[A-Za-z2-9]{6}" autocomplete="off" required spellcheck="false"></label><div class="join-room-actions"><button class="primary full" type="submit" data-role="player">Vào chơi <span>→</span></button><button class="secondary full" type="submit" data-role="spectator">Vào xem trận đấu <span>◎</span></button></div><small>Đủ 2 người chơi? Bạn sẽ tự vào ghế khán giả.</small></form>
    <section class="lobby-card ai-card"><div class="lobby-card-art"><span class="lobby-ball striped">9</span><span class="art-spark">✦</span><span class="art-line"></span></div><span class="lobby-card-tag">03 / MỘT CHÚT THỬ THÁCH</span><h2>Đấu với máy</h2><p>Tập một cú khó. Tìm một góc mới.<br>Đối thủ của bạn luôn sẵn sàng, kể cả offline.</p><label>CHẾ ĐỘ<select id="ai-mode">${$o}</select></label><label>ĐỘ KHÓ<select id="lobby-difficulty"><option value="easy">Dễ · khởi động nhẹ nhàng</option><option value="medium" selected>Vừa · một đối thủ xứng tầm</option><option value="hard">Khó · thử thách đường bi</option></select></label><button class="primary full" id="play-ai">Chơi cùng máy <span>→</span></button><small>Không cần tạo phòng hay chờ đối thủ.</small></section>
  </div><div class="lobby-bottom"><span>2 GHẾ CHƠI <i>·</i> NHIỀU GHẾ KHÁN GIẢ <i>·</i> 5 CHẾ ĐỘ</span><button id="play-local">Chơi trên cùng thiết bị →</button></div></div>
  <footer class="lobby-footer"><span>GOOD GAMES. GREAT COMPANY.</span><span>Mỗi đường bi đều có một câu chuyện. ✦</span></footer>
</section>`),wt("#play-area").insertAdjacentHTML("beforebegin",'<section id="online-room" class="online-room" aria-label="Thông tin phòng online" hidden><div class="room-code-block"><span class="control-label">PHÒNG ONLINE</span><button id="copy-room-code" title="Sao chép mã phòng"><strong id="current-room-code"></strong><span>⧉</span></button></div><div class="room-meta"><strong id="room-role"></strong><span id="room-status" aria-live="polite"></span></div><div class="room-spectators"><span>◎</span> <strong id="spectator-count">0</strong> người xem</div><div class="room-banner-actions"><button id="copy-play-link" class="secondary">Mời bạn</button><button id="copy-watch-link" class="secondary">Link xem</button><button id="claim-seat" class="primary" hidden>Ngồi vào bàn</button><button id="rename-in-room" class="secondary">Đổi tên</button><button id="leave-room" class="text-button">Rời phòng</button></div><p id="room-notice" role="status" hidden></p></section>'),document.body.insertAdjacentHTML("beforeend",'<dialog id="names-dialog"><form id="names-form"><div class="modal-header"><h2>Tên trên bàn bi</h2><button type="button" class="icon-button" id="close-names" aria-label="Đóng">×</button></div><label>Tên của bạn<input id="name-first" maxlength="24" required autocomplete="nickname"></label><label id="second-name-label">Tên người chơi thứ hai<input id="name-second" maxlength="24" required></label><p class="fine-print">Tối đa 24 ký tự, hỗ trợ tiếng Việt. Tên được nhớ trên trình duyệt này; trong phòng online, mọi người sẽ thấy tên mới.</p><p id="names-error" role="alert"></p><button class="primary full" type="submit">Lưu tên</button></form></dialog>'),wt("#edit-player-names").onclick=()=>this.editNames(),wt("#rename-in-room").onclick=()=>this.editNames(),wt("#close-names").onclick=()=>wt("#names-dialog").close(),wt("#footer-help").insertAdjacentHTML("beforebegin",'<button id="edit-names-at-table">Đổi tên</button>'),wt("#edit-names-at-table").onclick=()=>this.editNames(),wt("#names-form").onsubmit=r=>{r.preventDefault(),this.saveNames()};try{wt("#room-name").value=localStorage.getItem("velvet-player-name")||"Người chơi"}catch{}wt("#lobby-home").onclick=r=>{r.preventDefault()},wt("#create-room-form").onsubmit=r=>{r.preventDefault(),this.connect({type:"create",mode:wt("#room-mode").value,targetScore:Number(wt("#room-target").value),aimGuide:this.game.settings.aimGuide,name:this.name()})},wt("#join-room-form").onsubmit=r=>{r.preventDefault(),this.connect({type:"join",roomId:wt("#room-code").value.trim().toUpperCase(),spectate:r.submitter?.dataset.role==="spectator",name:this.name()})},wt("#room-code").oninput=r=>{r.target.value=r.target.value.toUpperCase().replace(/[^A-Z2-9]/g,"")},wt("#play-ai").onclick=()=>this.playOffline("ai"),wt("#play-local").onclick=()=>this.playOffline("local"),wt("#lobby-resume").onclick=()=>this.hide(),wt("#leave-room").onclick=()=>{this.game.online?.seat!=null&&!window.confirm("Rời phòng sẽ nhường ghế và kết thúc trận hiện tại. Bạn muốn rời phòng?")||(this.game.online?.leave(),this.clearInvitation(),this.show(),this.update())},wt("#copy-room-code").onclick=()=>this.copy(this.game.online.roomId,"Đã sao chép mã phòng."),wt("#copy-play-link").onclick=()=>this.copy(this.invitation(!1),"Đã sao chép lời mời vào chơi."),wt("#copy-watch-link").onclick=()=>this.copy(this.invitation(!0),"Đã sao chép đường dẫn xem trận đấu."),wt("#claim-seat").onclick=()=>this.game.online?.claimSeat();const e=new URLSearchParams(location.search),n=e.get("room");n&&(wt("#room-code").value=n.toUpperCase().slice(0,6),e.get("watch")==="1"&&wt('#join-room-form [data-role="spectator"]').classList.add("invite-highlight"),this.feedback("Bạn được mời vào phòng "+wt("#room-code").value+". Chọn Vào chơi hoặc Vào xem trận đấu.")),this.show();const s=ms.saved();s&&(!n||n.toUpperCase()===s.roomId)&&(wt("#room-name").value=s.name,this.connect({type:"join",roomId:s.roomId,name:s.name,resumeToken:s.resumeToken,spectate:s.seat==null}))}name(){const t=Ir(wt("#room-name").value);this.game.setSettings({playerNames:[t,this.game.settings.playerNames?.[1]||"Người chơi 2"]});try{localStorage.setItem("velvet-player-name",t)}catch{}return t}editNames(){const t=this.game.online;wt("#name-first").value=t?.name||wt("#room-name").value||this.game.playerName(0),wt("#name-second").value=this.game.settings.playerNames?.[1]||"Người chơi 2",wt("#second-name-label").hidden=!!t||this.game.settings.opponent==="ai",wt("#name-second").disabled=wt("#second-name-label").hidden,wt("#names-error").textContent="",wt("#names-dialog").showModal(),wt("#name-first").focus()}saveNames(){const t=Ir(wt("#name-first").value,""),e=Ir(wt("#name-second").value,"Người chơi 2");if(!t){wt("#names-error").textContent="Vui lòng nhập tên hợp lệ.";return}const n=this.game.online;if(n){if(!n.command("rename",{name:t})){wt("#names-error").textContent="Chưa kết nối được máy chủ. Hãy thử lại.";return}}else{this.game.setSettings({playerNames:[t,e]});try{localStorage.setItem("velvet-player-name",t)}catch{}}wt("#room-name").value=t,wt("#names-dialog").close(),this.game.notify()}feedback(t,e=!1){const n=wt("#lobby-feedback");n.hidden=!t,n.textContent=t,n.classList.toggle("error",e)}async connect(t){if(this.busy)return;if(this.game.online){this.feedback("Bạn đang ở trong một phòng. Về bàn và rời phòng trước khi vào phòng khác.",!0);return}this.busy=!0,this.setBusy(!0),this.feedback("Đang kết nối máy chủ… lần đầu có thể cần thêm thời gian.");const e=this.connectingClient=new ms(this.game,()=>this.update());try{await e.connect(t),this.hide(),this.feedback("");const n=new URL(location.href);n.searchParams.set("room",e.roomId),e.seat==null?n.searchParams.set("watch","1"):n.searchParams.delete("watch"),history.replaceState(null,"",n)}catch(n){this.feedback(n.message,!0),this.game.online||e.leave()}finally{this.connectingClient=null,this.busy=!1,this.setBusy(!1),this.update()}}setBusy(t){wt("#create-room").disabled=t,wt("#join-room-form").querySelectorAll("button").forEach(e=>e.disabled=t)}show(){wt("#room-lobby").hidden=!1,document.body.classList.add("in-lobby"),this.game.lobbyOpen=!0,wt("#lobby-resume").hidden=!this.game.online,window.scrollTo(0,0)}hide(){wt("#room-lobby").hidden=!0,document.body.classList.remove("in-lobby"),this.game.lobbyOpen=!1,this.game.scene.resize(),this.game.notify(),window.scrollTo(0,0)}playOffline(t){this.game.online&&!window.confirm("Rời phòng online để chơi riêng trên thiết bị này?")||(this.connectingClient?.leave(),this.game.online?.leave(),this.clearInvitation(),this.name(),this.game.setSettings({opponent:t,difficulty:wt("#lobby-difficulty").value}),this.game.start(wt("#ai-mode").value),this.hide())}invitation(t){const e=new URL(location.href);return e.search="",e.hash="",e.searchParams.set("room",this.game.online.roomId),t&&e.searchParams.set("watch","1"),e.href}clearInvitation(){const t=new URL(location.href);t.searchParams.delete("room"),t.searchParams.delete("watch"),history.replaceState(null,"",t)}async copy(t,e){try{await navigator.clipboard.writeText(t),this.notice(e)}catch{this.notice("Sao chép nội dung này: "+t)}}notice(t){wt("#room-notice").textContent=t,wt("#room-notice").hidden=!t}update(){const t=this.game.online,e=t?.info;if(wt("#online-room").hidden=!t,document.body.classList.toggle("is-online",!!t),document.body.classList.toggle("is-spectator",!!(t&&t.seat==null)),wt("#lobby-resume").hidden=!t,!t||!e){this.notice(""),this.lastNoticeMatch=null;return}(this.lastNoticeMatch!==e.matchId||this.lastNoticeRevision!==e.revision||this.lastConnected===!1&&t.connected)&&this.notice(""),this.lastNoticeMatch=e.matchId,this.lastNoticeRevision=e.revision,this.lastConnected=t.connected,wt("#current-room-code").textContent=t.roomId,wt("#room-role").textContent=t.seat==null?"Bạn đang xem trận đấu":`Bạn là người chơi ${t.seat+1} · ${e.players[t.seat]?.name||""}`,wt("#spectator-count").textContent=e.spectatorCount,wt("#room-status").textContent=t.connected?e.ready?this.game.state==="GAME_OVER"?"Trận đã kết thúc":`Lượt của ${e.players[this.game.mode.currentPlayer]?.name||"người chơi"}`:e.players.some(n=>n&&!n.connected)?"Người chơi mất kết nối · giữ ghế 60 giây":"Đang chờ người chơi thứ hai":"Đang kết nối lại…",wt("#claim-seat").hidden=t.seat!=null||!e.players.some(n=>n===null)||!t.connected,t.error&&this.notice(t.error),e.rematchVotes?.length&&this.notice("Đã có "+e.rematchVotes.length+"/2 người đồng ý tái đấu. Cả hai người cần chọn Chơi lại.")}}function Dh(i){return i.radius??=Et.radius,i.mass??=1,i.vx??=0,i.vz??=0,i.active??=!0,i.spin??={x:0,y:0},i.angularVelocity??=0,i}function Uh(i,t,e,n,s){i.x+=i.vx*t,i.z+=i.vz*t;const r=Math.hypot(i.vx,i.vz);if(r){const o=Math.max(0,r*Math.exp(-n*t)-e*t),l=o<s?0:o/r;i.vx*=l,i.vz*=l,i.angularVelocity=o/i.radius}const a=Math.exp(-1.1*t);i.spin.x*=a,i.spin.y*=a}function Nh(i,t,e){const n=t.x-i.x,s=t.z-i.z,r=i.radius+t.radius,a=n*n+s*s;if(a>r*r)return null;const o=Math.sqrt(a),l=o>1e-9?n/o:1,c=o>1e-9?s/o:0,h=1/i.mass,u=1/t.mass,f=h+u,d=r-o;if(d>0){const m=(d+1e-8)/f;i.x-=l*m*h,i.z-=c*m*h,t.x+=l*m*u,t.z+=c*m*u}const g=(t.vx-i.vx)*l+(t.vz-i.vz)*c;if(g>=-1e-7)return null;const v=-(1+e)*g/f;i.vx-=v*l*h,i.vz-=v*c*h,t.vx+=v*l*u,t.vz+=v*c*u;for(const m of[i,t])if(m._followPending&&m._shotDirection){const p=m.spin.y*Math.min(-g,m._shotSpeed)*.32;m.vx+=m._shotDirection.x*p,m.vz+=m._shotDirection.z*p,m._followPending=!1,m.spin.y*=.35}return-g}function Ko(i,t,e){const n=Et.halfWidth-i.radius,s=Et.halfHeight-i.radius;if(i.x<-n||i.x>n){const r=Math.sign(i.x);if(i.x=r*n,i.vx*r>0){const a=Math.abs(i.vx);i.vx=-i.vx*t,i.vz+=r*i.spin.x*a*.18,i.spin.x*=.65,e({type:"cushion",ball:i.id,rail:r<0?"left":"right",strength:a})}}if(i.z<-s||i.z>s){const r=Math.sign(i.z);if(i.z=r*s,i.vz*r>0){const a=Math.abs(i.vz);i.vz=-i.vz*t,i.vx-=r*i.spin.x*a*.18,i.spin.x*=.65,e({type:"cushion",ball:i.id,rail:r<0?"top":"bottom",strength:a})}}}function Fh(i){for(let t=0;t<Ae.length;t++){const e=Ae[t];if(Math.hypot(i.x-e.x,i.z-e.z)<Et.pocketRadius)return t}return-1}class xc{constructor({pockets:t=!0,onEvent:e=()=>{},rollingResistance:n=.42,linearDamping:s=.14,ballRestitution:r=.96,cushionRestitution:a=.8}={}){this.pockets=t,this.onEvent=e,this.balls=[],this.rollingResistance=n,this.linearDamping=s,this.ballRestitution=r,this.cushionRestitution=a,this.sleepSpeed=.018,this.events=[],this._emit=o=>{this.events.push(o),this.onEvent(o)}}setBalls(t){this.balls=t.map(Dh),this.events=[]}shoot(t,e,n,s={x:0,y:0}){const r=this.balls.find(o=>o.id===t&&o.active);if(!r||this.isMoving()||!Number.isFinite(e)||!Number.isFinite(n))return!1;const a=.3+Math.max(0,Math.min(1,n))*7.7;return r.vx=Math.cos(e)*a,r.vz=Math.sin(e)*a,r.spin={x:Math.max(-1,Math.min(1,s.x||0)),y:Math.max(-1,Math.min(1,s.y||0))},r._shotDirection={x:Math.cos(e),z:Math.sin(e)},r._shotSpeed=a,r._followPending=!0,!0}isMoving(){return this.balls.some(t=>t.active&&Math.hypot(t.vx,t.vz)>this.sleepSpeed)}step(t){if(this.events=[],!Number.isFinite(t)||t<=0)return this.events;let e=0,n=Et.radius;for(const o of this.balls)o.active&&(e=Math.max(e,Math.hypot(o.vx,o.vz)),n=Math.min(n,o.radius));const s=Math.min(1/240,n*.45/Math.max(e,.1)),r=Math.max(1,Math.ceil(Math.min(t,.25)/s)),a=Math.min(t,.25)/r;for(let o=0;o<r;o++){for(const l of this.balls)if(l.active){if(Uh(l,a,this.rollingResistance,this.linearDamping,this.sleepSpeed),this.pockets){const c=Fh(l);if(c>=0){l.active=!1,l.pocket=c,l.vx=l.vz=l.angularVelocity=0,this._emit({type:"pocket",ball:l.id,pocket:c});continue}}Ko(l,this.cushionRestitution,this._emit)}for(let l=0;l<6;l++)for(let c=0;c<this.balls.length;c++){const h=this.balls[c];if(h.active){for(let u=c+1;u<this.balls.length;u++){const f=this.balls[u];if(!f.active)continue;const d=Nh(h,f,this.ballRestitution);d!==null&&d>.01&&this._emit({type:"collision",a:h.id,b:f.id,strength:d})}Ko(h,this.cushionRestitution,this._emit)}}}return this.events}canPlace(t,e,n){if(!Number.isFinite(t)||!Number.isFinite(e))return!1;const s=this.balls.find(r=>r.id===n)?.radius??Et.radius;return Math.abs(t)>Et.halfWidth-s||Math.abs(e)>Et.halfHeight-s||this.pockets&&Ae.some(r=>Math.hypot(t-r.x,e-r.z)<Et.pocketRadius+s*.5)?!1:!this.balls.some(r=>r.active&&r.id!==n&&Math.hypot(t-r.x,e-r.z)<s+r.radius+.002)}placeBall(t,e,n){const s=this.balls.find(r=>r.id===t);return!s||!this.canPlace(e,n,t)?!1:(Object.assign(s,{x:e,z:n,vx:0,vz:0,active:!0,angularVelocity:0,spin:{x:0,y:0},pocket:void 0,_followPending:!1}),!0)}}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const po="180",Oh=0,jo=1,Bh=2,yc=1,Mc=2,Tn=3,Vn=0,Oe=1,un=2,kn=0,Ni=1,ga=2,Zo=3,Jo=4,zh=5,ei=100,kh=101,Hh=102,Gh=103,Vh=104,Wh=200,Xh=201,qh=202,Yh=203,va=204,_a=205,$h=206,Kh=207,jh=208,Zh=209,Jh=210,Qh=211,tu=212,eu=213,nu=214,xa=0,ya=1,Ma=2,Oi=3,Sa=4,ba=5,Ea=6,Ta=7,mo=0,iu=1,su=2,Hn=0,ru=1,au=2,ou=3,Sc=4,lu=5,cu=6,hu=7,bc=300,Bi=301,zi=302,wa=303,Aa=304,br=306,gr=1e3,ii=1001,Ra=1002,Ye=1003,uu=1004,Is=1005,dn=1006,Dr=1007,si=1008,vn=1009,Ec=1010,Tc=1011,gs=1012,go=1013,ai=1014,fn=1015,Ts=1016,vo=1017,_o=1018,vs=1020,wc=35902,Ac=35899,Rc=1021,Cc=1022,an=1023,_s=1026,xs=1027,xo=1028,yo=1029,Pc=1030,Mo=1031,So=1033,hr=33776,ur=33777,dr=33778,fr=33779,Ca=35840,Pa=35841,La=35842,Ia=35843,Da=36196,Ua=37492,Na=37496,Fa=37808,Oa=37809,Ba=37810,za=37811,ka=37812,Ha=37813,Ga=37814,Va=37815,Wa=37816,Xa=37817,qa=37818,Ya=37819,$a=37820,Ka=37821,ja=36492,Za=36494,Ja=36495,Qa=36283,to=36284,eo=36285,no=36286,du=3200,fu=3201,bo=0,pu=1,zn="",Fe="srgb",ki="srgb-linear",vr="linear",oe="srgb",di=7680,Qo=519,mu=512,gu=513,vu=514,Lc=515,_u=516,xu=517,yu=518,Mu=519,io=35044,tl="300 es",pn=2e3,_r=2001;class Vi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Re=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let el=1234567;const hs=Math.PI/180,ys=180/Math.PI;function mn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Re[i&255]+Re[i>>8&255]+Re[i>>16&255]+Re[i>>24&255]+"-"+Re[t&255]+Re[t>>8&255]+"-"+Re[t>>16&15|64]+Re[t>>24&255]+"-"+Re[e&63|128]+Re[e>>8&255]+"-"+Re[e>>16&255]+Re[e>>24&255]+Re[n&255]+Re[n>>8&255]+Re[n>>16&255]+Re[n>>24&255]).toLowerCase()}function Yt(i,t,e){return Math.max(t,Math.min(e,i))}function Eo(i,t){return(i%t+t)%t}function Su(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function bu(i,t,e){return i!==t?(e-i)/(t-i):0}function us(i,t,e){return(1-e)*i+e*t}function Eu(i,t,e,n){return us(i,t,1-Math.exp(-e*n))}function Tu(i,t=1){return t-Math.abs(Eo(i,t*2)-t)}function wu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Au(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Ru(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Cu(i,t){return i+Math.random()*(t-i)}function Pu(i){return i*(.5-Math.random())}function Lu(i){i!==void 0&&(el=i);let t=el+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Iu(i){return i*hs}function Du(i){return i*ys}function Uu(i){return(i&i-1)===0&&i!==0}function Nu(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Fu(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Ou(i,t,e,n,s){const r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),h=a((t+n)/2),u=r((t-n)/2),f=a((t-n)/2),d=r((n-t)/2),g=a((n-t)/2);switch(s){case"XYX":i.set(o*h,l*u,l*f,o*c);break;case"YZY":i.set(l*f,o*h,l*u,o*c);break;case"ZXZ":i.set(l*u,l*f,o*h,o*c);break;case"XZX":i.set(o*h,l*g,l*d,o*c);break;case"YXY":i.set(l*d,o*h,l*g,o*c);break;case"ZYZ":i.set(l*g,l*d,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function rn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function se(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Yi={DEG2RAD:hs,RAD2DEG:ys,generateUUID:mn,clamp:Yt,euclideanModulo:Eo,mapLinear:Su,inverseLerp:bu,lerp:us,damp:Eu,pingpong:Tu,smoothstep:wu,smootherstep:Au,randInt:Ru,randFloat:Cu,randFloatSpread:Pu,seededRandom:Lu,degToRad:Iu,radToDeg:Du,isPowerOfTwo:Uu,ceilPowerOfTwo:Nu,floorPowerOfTwo:Fu,setQuaternionFromProperEuler:Ou,normalize:se,denormalize:rn};class it{constructor(t=0,e=0){it.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Yt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Yt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ws{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3];const f=r[a+0],d=r[a+1],g=r[a+2],v=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=v;return}if(u!==v||l!==f||c!==d||h!==g){let m=1-o;const p=l*f+c*d+h*g+u*v,E=p>=0?1:-1,S=1-p*p;if(S>Number.EPSILON){const R=Math.sqrt(S),w=Math.atan2(R,p*E);m=Math.sin(m*w)/R,o=Math.sin(o*w)/R}const x=o*E;if(l=l*m+f*x,c=c*m+d*x,h=h*m+g*x,u=u*m+v*x,m===1-o){const R=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=R,c*=R,h*=R,u*=R}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[a],f=r[a+1],d=r[a+2],g=r[a+3];return t[e]=o*g+h*u+l*d-c*f,t[e+1]=l*g+h*f+c*u-o*d,t[e+2]=c*g+h*d+o*f-l*u,t[e+3]=h*g-o*u-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),u=o(r/2),f=l(n/2),d=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=f*h*u+c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u+f*d*g;break;case"YZX":this._x=f*h*u+c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u-f*d*g;break;case"XZY":this._x=f*h*u-c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=n+o+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(a-s)*d}else if(n>o&&n>u){const d=2*Math.sqrt(1+n-o-u);this._w=(h-l)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+c)/d}else if(o>u){const d=2*Math.sqrt(1+o-n-u);this._w=(r-c)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(l+h)/d}else{const d=2*Math.sqrt(1+u-n-o);this._w=(a-s)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Yt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const d=1-e;return this._w=d*a+e*this._w,this._x=d*n+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=a*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{constructor(t=0,e=0,n=0){C.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(nl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(nl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),h=2*(o*e-r*s),u=2*(r*n-a*e);return this.x=e+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=s+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this.z=Yt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this.z=Yt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Yt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ur.copy(this).projectOnVector(t),this.sub(Ur)}reflect(t){return this.sub(Ur.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Yt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ur=new C,nl=new ws;class Xt{constructor(t,e,n,s,r,a,o,l,c){Xt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],d=n[5],g=n[8],v=s[0],m=s[3],p=s[6],E=s[1],S=s[4],x=s[7],R=s[2],w=s[5],P=s[8];return r[0]=a*v+o*E+l*R,r[3]=a*m+o*S+l*w,r[6]=a*p+o*x+l*P,r[1]=c*v+h*E+u*R,r[4]=c*m+h*S+u*w,r[7]=c*p+h*x+u*P,r[2]=f*v+d*E+g*R,r[5]=f*m+d*S+g*w,r[8]=f*p+d*x+g*P,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,f=o*l-h*r,d=c*r-a*l,g=e*u+n*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=u*v,t[1]=(s*c-h*n)*v,t[2]=(o*n-s*a)*v,t[3]=f*v,t[4]=(h*e-s*l)*v,t[5]=(s*r-o*e)*v,t[6]=d*v,t[7]=(n*l-c*e)*v,t[8]=(a*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Nr.makeScale(t,e)),this}rotate(t){return this.premultiply(Nr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Nr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Nr=new Xt;function Ic(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function xr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Bu(){const i=xr("canvas");return i.style.display="block",i}const il={};function Ms(i){i in il||(il[i]=!0,console.warn(i))}function zu(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const sl=new Xt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),rl=new Xt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ku(){const i={enabled:!0,workingColorSpace:ki,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===oe&&(s.r=An(s.r),s.g=An(s.g),s.b=An(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===oe&&(s.r=Fi(s.r),s.g=Fi(s.g),s.b=Fi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===zn?vr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Ms("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Ms("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ki]:{primaries:t,whitePoint:n,transfer:vr,toXYZ:sl,fromXYZ:rl,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Fe},outputColorSpaceConfig:{drawingBufferColorSpace:Fe}},[Fe]:{primaries:t,whitePoint:n,transfer:oe,toXYZ:sl,fromXYZ:rl,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Fe}}}),i}const ee=ku();function An(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Fi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let fi;class Hu{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{fi===void 0&&(fi=xr("canvas")),fi.width=t.width,fi.height=t.height;const s=fi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=fi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=xr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=An(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(An(e[n]/255)*255):e[n]=An(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Gu=0;class To{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Gu++}),this.uuid=mn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Fr(s[a].image)):r.push(Fr(s[a]))}else r=Fr(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Fr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Hu.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Vu=0;const Or=new C;class Pe extends Vi{constructor(t=Pe.DEFAULT_IMAGE,e=Pe.DEFAULT_MAPPING,n=ii,s=ii,r=dn,a=si,o=an,l=vn,c=Pe.DEFAULT_ANISOTROPY,h=zn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Vu++}),this.uuid=mn(),this.name="",this.source=new To(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new it(0,0),this.repeat=new it(1,1),this.center=new it(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Or).x}get height(){return this.source.getSize(Or).y}get depth(){return this.source.getSize(Or).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==bc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case gr:t.x=t.x-Math.floor(t.x);break;case ii:t.x=t.x<0?0:1;break;case Ra:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case gr:t.y=t.y-Math.floor(t.y);break;case ii:t.y=t.y<0?0:1;break;case Ra:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Pe.DEFAULT_IMAGE=null;Pe.DEFAULT_MAPPING=bc;Pe.DEFAULT_ANISOTROPY=1;class ce{constructor(t=0,e=0,n=0,s=1){ce.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],d=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const S=(c+1)/2,x=(d+1)/2,R=(p+1)/2,w=(h+f)/4,P=(u+v)/4,I=(g+m)/4;return S>x&&S>R?S<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(S),s=w/n,r=P/n):x>R?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=w/s,r=I/s):R<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),n=P/r,s=I/r),this.set(n,s,r,e),this}let E=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(f-h)*(f-h));return Math.abs(E)<.001&&(E=1),this.x=(m-g)/E,this.y=(u-v)/E,this.z=(f-h)/E,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this.z=Yt(this.z,t.z,e.z),this.w=Yt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this.z=Yt(this.z,t,e),this.w=Yt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Yt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Wu extends Vi{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:dn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ce(0,0,t,e),this.scissorTest=!1,this.viewport=new ce(0,0,t,e);const s={width:t,height:e,depth:n.depth},r=new Pe(s);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:dn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new To(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class oi extends Wu{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Dc extends Pe{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ye,this.minFilter=Ye,this.wrapR=ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Xu extends Pe{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ye,this.minFilter=Ye,this.wrapR=ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class hi{constructor(t=new C(1/0,1/0,1/0),e=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(tn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(tn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=tn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,tn):tn.fromBufferAttribute(r,a),tn.applyMatrix4(t.matrixWorld),this.expandByPoint(tn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ds.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ds.copy(n.boundingBox)),Ds.applyMatrix4(t.matrixWorld),this.union(Ds)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,tn),tn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter($i),Us.subVectors(this.max,$i),pi.subVectors(t.a,$i),mi.subVectors(t.b,$i),gi.subVectors(t.c,$i),In.subVectors(mi,pi),Dn.subVectors(gi,mi),$n.subVectors(pi,gi);let e=[0,-In.z,In.y,0,-Dn.z,Dn.y,0,-$n.z,$n.y,In.z,0,-In.x,Dn.z,0,-Dn.x,$n.z,0,-$n.x,-In.y,In.x,0,-Dn.y,Dn.x,0,-$n.y,$n.x,0];return!Br(e,pi,mi,gi,Us)||(e=[1,0,0,0,1,0,0,0,1],!Br(e,pi,mi,gi,Us))?!1:(Ns.crossVectors(In,Dn),e=[Ns.x,Ns.y,Ns.z],Br(e,pi,mi,gi,Us))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,tn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(tn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(yn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),yn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),yn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),yn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),yn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),yn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),yn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),yn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(yn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const yn=[new C,new C,new C,new C,new C,new C,new C,new C],tn=new C,Ds=new hi,pi=new C,mi=new C,gi=new C,In=new C,Dn=new C,$n=new C,$i=new C,Us=new C,Ns=new C,Kn=new C;function Br(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Kn.fromArray(i,r);const o=s.x*Math.abs(Kn.x)+s.y*Math.abs(Kn.y)+s.z*Math.abs(Kn.z),l=t.dot(Kn),c=e.dot(Kn),h=n.dot(Kn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const qu=new hi,Ki=new C,zr=new C;class Wi{constructor(t=new C,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):qu.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ki.subVectors(t,this.center);const e=Ki.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Ki,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(zr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ki.copy(t.center).add(zr)),this.expandByPoint(Ki.copy(t.center).sub(zr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const Mn=new C,kr=new C,Fs=new C,Un=new C,Hr=new C,Os=new C,Gr=new C;class wo{constructor(t=new C,e=new C(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Mn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Mn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Mn.copy(this.origin).addScaledVector(this.direction,e),Mn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){kr.copy(t).add(e).multiplyScalar(.5),Fs.copy(e).sub(t).normalize(),Un.copy(this.origin).sub(kr);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Fs),o=Un.dot(this.direction),l=-Un.dot(Fs),c=Un.lengthSq(),h=Math.abs(1-a*a);let u,f,d,g;if(h>0)if(u=a*l-o,f=a*o-l,g=r*h,u>=0)if(f>=-g)if(f<=g){const v=1/h;u*=v,f*=v,d=u*(u+a*f+2*o)+f*(a*u+f+2*l)+c}else f=r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(kr).addScaledVector(Fs,f),d}intersectSphere(t,e){Mn.subVectors(t.center,this.origin);const n=Mn.dot(this.direction),s=Mn.dot(Mn)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,a=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,a=(t.min.y-f.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(o=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Mn)!==null}intersectTriangle(t,e,n,s,r){Hr.subVectors(e,t),Os.subVectors(n,t),Gr.crossVectors(Hr,Os);let a=this.direction.dot(Gr),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Un.subVectors(this.origin,t);const l=o*this.direction.dot(Os.crossVectors(Un,Os));if(l<0)return null;const c=o*this.direction.dot(Hr.cross(Un));if(c<0||l+c>a)return null;const h=-o*Un.dot(Gr);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class re{constructor(t,e,n,s,r,a,o,l,c,h,u,f,d,g,v,m){re.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,h,u,f,d,g,v,m)}set(t,e,n,s,r,a,o,l,c,h,u,f,d,g,v,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new re().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/vi.setFromMatrixColumn(t,0).length(),r=1/vi.setFromMatrixColumn(t,1).length(),a=1/vi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=a*h,d=a*u,g=o*h,v=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=d+g*c,e[5]=f-v*c,e[9]=-o*l,e[2]=v-f*c,e[6]=g+d*c,e[10]=a*l}else if(t.order==="YXZ"){const f=l*h,d=l*u,g=c*h,v=c*u;e[0]=f+v*o,e[4]=g*o-d,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=d*o-g,e[6]=v+f*o,e[10]=a*l}else if(t.order==="ZXY"){const f=l*h,d=l*u,g=c*h,v=c*u;e[0]=f-v*o,e[4]=-a*u,e[8]=g+d*o,e[1]=d+g*o,e[5]=a*h,e[9]=v-f*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const f=a*h,d=a*u,g=o*h,v=o*u;e[0]=l*h,e[4]=g*c-d,e[8]=f*c+v,e[1]=l*u,e[5]=v*c+f,e[9]=d*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const f=a*l,d=a*c,g=o*l,v=o*c;e[0]=l*h,e[4]=v-f*u,e[8]=g*u+d,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=d*u+g,e[10]=f-v*u}else if(t.order==="XZY"){const f=a*l,d=a*c,g=o*l,v=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+v,e[5]=a*h,e[9]=d*u-g,e[2]=g*u-d,e[6]=o*h,e[10]=v*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Yu,t,$u)}lookAt(t,e,n){const s=this.elements;return Ve.subVectors(t,e),Ve.lengthSq()===0&&(Ve.z=1),Ve.normalize(),Nn.crossVectors(n,Ve),Nn.lengthSq()===0&&(Math.abs(n.z)===1?Ve.x+=1e-4:Ve.z+=1e-4,Ve.normalize(),Nn.crossVectors(n,Ve)),Nn.normalize(),Bs.crossVectors(Ve,Nn),s[0]=Nn.x,s[4]=Bs.x,s[8]=Ve.x,s[1]=Nn.y,s[5]=Bs.y,s[9]=Ve.y,s[2]=Nn.z,s[6]=Bs.z,s[10]=Ve.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],d=n[13],g=n[2],v=n[6],m=n[10],p=n[14],E=n[3],S=n[7],x=n[11],R=n[15],w=s[0],P=s[4],I=s[8],b=s[12],M=s[1],L=s[5],O=s[9],k=s[13],q=s[2],G=s[6],X=s[10],J=s[14],V=s[3],dt=s[7],_t=s[11],St=s[15];return r[0]=a*w+o*M+l*q+c*V,r[4]=a*P+o*L+l*G+c*dt,r[8]=a*I+o*O+l*X+c*_t,r[12]=a*b+o*k+l*J+c*St,r[1]=h*w+u*M+f*q+d*V,r[5]=h*P+u*L+f*G+d*dt,r[9]=h*I+u*O+f*X+d*_t,r[13]=h*b+u*k+f*J+d*St,r[2]=g*w+v*M+m*q+p*V,r[6]=g*P+v*L+m*G+p*dt,r[10]=g*I+v*O+m*X+p*_t,r[14]=g*b+v*k+m*J+p*St,r[3]=E*w+S*M+x*q+R*V,r[7]=E*P+S*L+x*G+R*dt,r[11]=E*I+S*O+x*X+R*_t,r[15]=E*b+S*k+x*J+R*St,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],d=t[14],g=t[3],v=t[7],m=t[11],p=t[15];return g*(+r*l*u-s*c*u-r*o*f+n*c*f+s*o*d-n*l*d)+v*(+e*l*d-e*c*f+r*a*f-s*a*d+s*c*h-r*l*h)+m*(+e*c*u-e*o*d-r*a*u+n*a*d+r*o*h-n*c*h)+p*(-s*o*h-e*l*u+e*o*f+s*a*u-n*a*f+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],d=t[11],g=t[12],v=t[13],m=t[14],p=t[15],E=u*m*c-v*f*c+v*l*d-o*m*d-u*l*p+o*f*p,S=g*f*c-h*m*c-g*l*d+a*m*d+h*l*p-a*f*p,x=h*v*c-g*u*c+g*o*d-a*v*d-h*o*p+a*u*p,R=g*u*l-h*v*l-g*o*f+a*v*f+h*o*m-a*u*m,w=e*E+n*S+s*x+r*R;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/w;return t[0]=E*P,t[1]=(v*f*r-u*m*r-v*s*d+n*m*d+u*s*p-n*f*p)*P,t[2]=(o*m*r-v*l*r+v*s*c-n*m*c-o*s*p+n*l*p)*P,t[3]=(u*l*r-o*f*r-u*s*c+n*f*c+o*s*d-n*l*d)*P,t[4]=S*P,t[5]=(h*m*r-g*f*r+g*s*d-e*m*d-h*s*p+e*f*p)*P,t[6]=(g*l*r-a*m*r-g*s*c+e*m*c+a*s*p-e*l*p)*P,t[7]=(a*f*r-h*l*r+h*s*c-e*f*c-a*s*d+e*l*d)*P,t[8]=x*P,t[9]=(g*u*r-h*v*r-g*n*d+e*v*d+h*n*p-e*u*p)*P,t[10]=(a*v*r-g*o*r+g*n*c-e*v*c-a*n*p+e*o*p)*P,t[11]=(h*o*r-a*u*r-h*n*c+e*u*c+a*n*d-e*o*d)*P,t[12]=R*P,t[13]=(h*v*s-g*u*s+g*n*f-e*v*f-h*n*m+e*u*m)*P,t[14]=(g*o*s-a*v*s-g*n*l+e*v*l+a*n*m-e*o*m)*P,t[15]=(a*u*s-h*o*s+h*n*l-e*u*l-a*n*f+e*o*f)*P,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,f=r*c,d=r*h,g=r*u,v=a*h,m=a*u,p=o*u,E=l*c,S=l*h,x=l*u,R=n.x,w=n.y,P=n.z;return s[0]=(1-(v+p))*R,s[1]=(d+x)*R,s[2]=(g-S)*R,s[3]=0,s[4]=(d-x)*w,s[5]=(1-(f+p))*w,s[6]=(m+E)*w,s[7]=0,s[8]=(g+S)*P,s[9]=(m-E)*P,s[10]=(1-(f+v))*P,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=vi.set(s[0],s[1],s[2]).length();const a=vi.set(s[4],s[5],s[6]).length(),o=vi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],en.copy(this);const c=1/r,h=1/a,u=1/o;return en.elements[0]*=c,en.elements[1]*=c,en.elements[2]*=c,en.elements[4]*=h,en.elements[5]*=h,en.elements[6]*=h,en.elements[8]*=u,en.elements[9]*=u,en.elements[10]*=u,e.setFromRotationMatrix(en),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=pn,l=!1){const c=this.elements,h=2*r/(e-t),u=2*r/(n-s),f=(e+t)/(e-t),d=(n+s)/(n-s);let g,v;if(l)g=r/(a-r),v=a*r/(a-r);else if(o===pn)g=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===_r)g=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=pn,l=!1){const c=this.elements,h=2/(e-t),u=2/(n-s),f=-(e+t)/(e-t),d=-(n+s)/(n-s);let g,v;if(l)g=1/(a-r),v=a/(a-r);else if(o===pn)g=-2/(a-r),v=-(a+r)/(a-r);else if(o===_r)g=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=u,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const vi=new C,en=new re,Yu=new C(0,0,0),$u=new C(1,1,1),Nn=new C,Bs=new C,Ve=new C,al=new re,ol=new ws;class on{constructor(t=0,e=0,n=0,s=on.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(Yt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Yt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Yt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Yt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Yt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Yt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return al.makeRotationFromQuaternion(t),this.setFromRotationMatrix(al,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ol.setFromEuler(this),this.setFromQuaternion(ol,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}on.DEFAULT_ORDER="XYZ";class Ao{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Ku=0;const ll=new C,_i=new ws,Sn=new re,zs=new C,ji=new C,ju=new C,Zu=new ws,cl=new C(1,0,0),hl=new C(0,1,0),ul=new C(0,0,1),dl={type:"added"},Ju={type:"removed"},xi={type:"childadded",child:null},Vr={type:"childremoved",child:null};class Me extends Vi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ku++}),this.uuid=mn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Me.DEFAULT_UP.clone();const t=new C,e=new on,n=new ws,s=new C(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new re},normalMatrix:{value:new Xt}}),this.matrix=new re,this.matrixWorld=new re,this.matrixAutoUpdate=Me.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Me.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ao,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return _i.setFromAxisAngle(t,e),this.quaternion.multiply(_i),this}rotateOnWorldAxis(t,e){return _i.setFromAxisAngle(t,e),this.quaternion.premultiply(_i),this}rotateX(t){return this.rotateOnAxis(cl,t)}rotateY(t){return this.rotateOnAxis(hl,t)}rotateZ(t){return this.rotateOnAxis(ul,t)}translateOnAxis(t,e){return ll.copy(t).applyQuaternion(this.quaternion),this.position.add(ll.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(cl,t)}translateY(t){return this.translateOnAxis(hl,t)}translateZ(t){return this.translateOnAxis(ul,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Sn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?zs.copy(t):zs.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),ji.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Sn.lookAt(ji,zs,this.up):Sn.lookAt(zs,ji,this.up),this.quaternion.setFromRotationMatrix(Sn),s&&(Sn.extractRotation(s.matrixWorld),_i.setFromRotationMatrix(Sn),this.quaternion.premultiply(_i.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(dl),xi.child=t,this.dispatchEvent(xi),xi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Ju),Vr.child=t,this.dispatchEvent(Vr),Vr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Sn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Sn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Sn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(dl),xi.child=t,this.dispatchEvent(xi),xi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ji,t,ju),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ji,Zu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),f=a(t.skeletons),d=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Me.DEFAULT_UP=new C(0,1,0);Me.DEFAULT_MATRIX_AUTO_UPDATE=!0;Me.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const nn=new C,bn=new C,Wr=new C,En=new C,yi=new C,Mi=new C,fl=new C,Xr=new C,qr=new C,Yr=new C,$r=new ce,Kr=new ce,jr=new ce;class Qe{constructor(t=new C,e=new C,n=new C){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),nn.subVectors(t,e),s.cross(nn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){nn.subVectors(s,e),bn.subVectors(n,e),Wr.subVectors(t,e);const a=nn.dot(nn),o=nn.dot(bn),l=nn.dot(Wr),c=bn.dot(bn),h=bn.dot(Wr),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(c*l-o*h)*f,g=(a*h-o*l)*f;return r.set(1-d-g,g,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,En)===null?!1:En.x>=0&&En.y>=0&&En.x+En.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,En)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,En.x),l.addScaledVector(a,En.y),l.addScaledVector(o,En.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return $r.setScalar(0),Kr.setScalar(0),jr.setScalar(0),$r.fromBufferAttribute(t,e),Kr.fromBufferAttribute(t,n),jr.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector($r,r.x),a.addScaledVector(Kr,r.y),a.addScaledVector(jr,r.z),a}static isFrontFacing(t,e,n,s){return nn.subVectors(n,e),bn.subVectors(t,e),nn.cross(bn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return nn.subVectors(this.c,this.b),bn.subVectors(this.a,this.b),nn.cross(bn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Qe.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Qe.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return Qe.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Qe.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Qe.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;yi.subVectors(s,n),Mi.subVectors(r,n),Xr.subVectors(t,n);const l=yi.dot(Xr),c=Mi.dot(Xr);if(l<=0&&c<=0)return e.copy(n);qr.subVectors(t,s);const h=yi.dot(qr),u=Mi.dot(qr);if(h>=0&&u<=h)return e.copy(s);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(yi,a);Yr.subVectors(t,r);const d=yi.dot(Yr),g=Mi.dot(Yr);if(g>=0&&d<=g)return e.copy(r);const v=d*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(Mi,o);const m=h*g-d*u;if(m<=0&&u-h>=0&&d-g>=0)return fl.subVectors(r,s),o=(u-h)/(u-h+(d-g)),e.copy(s).addScaledVector(fl,o);const p=1/(m+v+f);return a=v*p,o=f*p,e.copy(n).addScaledVector(yi,a).addScaledVector(Mi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Uc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Fn={h:0,s:0,l:0},ks={h:0,s:0,l:0};function Zr(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class $t{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Fe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ee.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=ee.workingColorSpace){return this.r=t,this.g=e,this.b=n,ee.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=ee.workingColorSpace){if(t=Eo(t,1),e=Yt(e,0,1),n=Yt(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Zr(a,r,t+1/3),this.g=Zr(a,r,t),this.b=Zr(a,r,t-1/3)}return ee.colorSpaceToWorking(this,s),this}setStyle(t,e=Fe){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Fe){const n=Uc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=An(t.r),this.g=An(t.g),this.b=An(t.b),this}copyLinearToSRGB(t){return this.r=Fi(t.r),this.g=Fi(t.g),this.b=Fi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Fe){return ee.workingToColorSpace(Ce.copy(this),t),Math.round(Yt(Ce.r*255,0,255))*65536+Math.round(Yt(Ce.g*255,0,255))*256+Math.round(Yt(Ce.b*255,0,255))}getHexString(t=Fe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ee.workingColorSpace){ee.workingToColorSpace(Ce.copy(this),e);const n=Ce.r,s=Ce.g,r=Ce.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ee.workingColorSpace){return ee.workingToColorSpace(Ce.copy(this),e),t.r=Ce.r,t.g=Ce.g,t.b=Ce.b,t}getStyle(t=Fe){ee.workingToColorSpace(Ce.copy(this),t);const e=Ce.r,n=Ce.g,s=Ce.b;return t!==Fe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Fn),this.setHSL(Fn.h+t,Fn.s+e,Fn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Fn),t.getHSL(ks);const n=us(Fn.h,ks.h,e),s=us(Fn.s,ks.s,e),r=us(Fn.l,ks.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ce=new $t;$t.NAMES=Uc;let Qu=0;class Xn extends Vi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Qu++}),this.uuid=mn(),this.name="",this.type="Material",this.blending=Ni,this.side=Vn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=va,this.blendDst=_a,this.blendEquation=ei,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new $t(0,0,0),this.blendAlpha=0,this.depthFunc=Oi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Qo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=di,this.stencilZFail=di,this.stencilZPass=di,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ni&&(n.blending=this.blending),this.side!==Vn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==va&&(n.blendSrc=this.blendSrc),this.blendDst!==_a&&(n.blendDst=this.blendDst),this.blendEquation!==ei&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Oi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Qo&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==di&&(n.stencilFail=this.stencilFail),this.stencilZFail!==di&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==di&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Xe extends Xn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new $t(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.combine=mo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ye=new C,Hs=new it;let td=0;class Be{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:td++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=io,this.updateRanges=[],this.gpuType=fn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Hs.fromBufferAttribute(this,e),Hs.applyMatrix3(t),this.setXY(e,Hs.x,Hs.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix3(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix4(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.applyNormalMatrix(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.transformDirection(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=rn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=se(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=rn(e,this.array)),e}setX(t,e){return this.normalized&&(e=se(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=rn(e,this.array)),e}setY(t,e){return this.normalized&&(e=se(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=rn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=se(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=rn(e,this.array)),e}setW(t,e){return this.normalized&&(e=se(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=se(e,this.array),n=se(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=se(e,this.array),n=se(n,this.array),s=se(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=se(e,this.array),n=se(n,this.array),s=se(s,this.array),r=se(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==io&&(t.usage=this.usage),t}}class Nc extends Be{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Fc extends Be{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class he extends Be{constructor(t,e,n){super(new Float32Array(t),e,n)}}let ed=0;const je=new re,Jr=new Me,Si=new C,We=new hi,Zi=new hi,we=new C;class Se extends Vi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ed++}),this.uuid=mn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ic(t)?Fc:Nc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Xt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return je.makeRotationFromQuaternion(t),this.applyMatrix4(je),this}rotateX(t){return je.makeRotationX(t),this.applyMatrix4(je),this}rotateY(t){return je.makeRotationY(t),this.applyMatrix4(je),this}rotateZ(t){return je.makeRotationZ(t),this.applyMatrix4(je),this}translate(t,e,n){return je.makeTranslation(t,e,n),this.applyMatrix4(je),this}scale(t,e,n){return je.makeScale(t,e,n),this.applyMatrix4(je),this}lookAt(t){return Jr.lookAt(t),Jr.updateMatrix(),this.applyMatrix4(Jr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Si).negate(),this.translate(Si.x,Si.y,Si.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new he(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new hi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];We.setFromBufferAttribute(r),this.morphTargetsRelative?(we.addVectors(this.boundingBox.min,We.min),this.boundingBox.expandByPoint(we),we.addVectors(this.boundingBox.max,We.max),this.boundingBox.expandByPoint(we)):(this.boundingBox.expandByPoint(We.min),this.boundingBox.expandByPoint(We.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Wi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(t){const n=this.boundingSphere.center;if(We.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];Zi.setFromBufferAttribute(o),this.morphTargetsRelative?(we.addVectors(We.min,Zi.min),We.expandByPoint(we),we.addVectors(We.max,Zi.max),We.expandByPoint(we)):(We.expandByPoint(Zi.min),We.expandByPoint(Zi.max))}We.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)we.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(we));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)we.fromBufferAttribute(o,c),l&&(Si.fromBufferAttribute(t,c),we.add(Si)),s=Math.max(s,n.distanceToSquared(we))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Be(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let I=0;I<n.count;I++)o[I]=new C,l[I]=new C;const c=new C,h=new C,u=new C,f=new it,d=new it,g=new it,v=new C,m=new C;function p(I,b,M){c.fromBufferAttribute(n,I),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,M),f.fromBufferAttribute(r,I),d.fromBufferAttribute(r,b),g.fromBufferAttribute(r,M),h.sub(c),u.sub(c),d.sub(f),g.sub(f);const L=1/(d.x*g.y-g.x*d.y);isFinite(L)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(u,-d.y).multiplyScalar(L),m.copy(u).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(L),o[I].add(v),o[b].add(v),o[M].add(v),l[I].add(m),l[b].add(m),l[M].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let I=0,b=E.length;I<b;++I){const M=E[I],L=M.start,O=M.count;for(let k=L,q=L+O;k<q;k+=3)p(t.getX(k+0),t.getX(k+1),t.getX(k+2))}const S=new C,x=new C,R=new C,w=new C;function P(I){R.fromBufferAttribute(s,I),w.copy(R);const b=o[I];S.copy(b),S.sub(R.multiplyScalar(R.dot(b))).normalize(),x.crossVectors(w,b);const L=x.dot(l[I])<0?-1:1;a.setXYZW(I,S.x,S.y,S.z,L)}for(let I=0,b=E.length;I<b;++I){const M=E[I],L=M.start,O=M.count;for(let k=L,q=L+O;k<q;k+=3)P(t.getX(k+0)),P(t.getX(k+1)),P(t.getX(k+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Be(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const s=new C,r=new C,a=new C,o=new C,l=new C,c=new C,h=new C,u=new C;if(t)for(let f=0,d=t.count;f<d;f+=3){const g=t.getX(f+0),v=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),a.fromBufferAttribute(e,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)we.fromBufferAttribute(t,e),we.normalize(),t.setXYZ(e,we.x,we.y,we.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,u=o.normalized,f=new c.constructor(l.length*h);let d=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?d=l[v]*o.data.stride+o.offset:d=l[v]*h;for(let p=0;p<h;p++)f[g++]=c[d++]}return new Be(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Se,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const f=c[h],d=t(f,n);l.push(d)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const d=c[u];h.push(d.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const pl=new re,jn=new wo,Gs=new Wi,ml=new C,Vs=new C,Ws=new C,Xs=new C,Qr=new C,qs=new C,gl=new C,Ys=new C;class Ot extends Me{constructor(t=new Se,e=new Xe){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){qs.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(Qr.fromBufferAttribute(u,t),a?qs.addScaledVector(Qr,h):qs.addScaledVector(Qr.sub(e),h))}e.add(qs)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Gs.copy(n.boundingSphere),Gs.applyMatrix4(r),jn.copy(t.ray).recast(t.near),!(Gs.containsPoint(jn.origin)===!1&&(jn.intersectSphere(Gs,ml)===null||jn.origin.distanceToSquared(ml)>(t.far-t.near)**2))&&(pl.copy(r).invert(),jn.copy(t.ray).applyMatrix4(pl),!(n.boundingBox!==null&&jn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,jn)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=f.length;g<v;g++){const m=f[g],p=a[m.materialIndex],E=Math.max(m.start,d.start),S=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let x=E,R=S;x<R;x+=3){const w=o.getX(x),P=o.getX(x+1),I=o.getX(x+2);s=$s(this,p,t,n,c,h,u,w,P,I),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),v=Math.min(o.count,d.start+d.count);for(let m=g,p=v;m<p;m+=3){const E=o.getX(m),S=o.getX(m+1),x=o.getX(m+2);s=$s(this,a,t,n,c,h,u,E,S,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=f.length;g<v;g++){const m=f[g],p=a[m.materialIndex],E=Math.max(m.start,d.start),S=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let x=E,R=S;x<R;x+=3){const w=x,P=x+1,I=x+2;s=$s(this,p,t,n,c,h,u,w,P,I),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),v=Math.min(l.count,d.start+d.count);for(let m=g,p=v;m<p;m+=3){const E=m,S=m+1,x=m+2;s=$s(this,a,t,n,c,h,u,E,S,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function nd(i,t,e,n,s,r,a,o){let l;if(t.side===Oe?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===Vn,o),l===null)return null;Ys.copy(o),Ys.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Ys);return c<e.near||c>e.far?null:{distance:c,point:Ys.clone(),object:i}}function $s(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,Vs),i.getVertexPosition(l,Ws),i.getVertexPosition(c,Xs);const h=nd(i,t,e,n,Vs,Ws,Xs,gl);if(h){const u=new C;Qe.getBarycoord(gl,Vs,Ws,Xs,u),s&&(h.uv=Qe.getInterpolatedAttribute(s,o,l,c,u,new it)),r&&(h.uv1=Qe.getInterpolatedAttribute(r,o,l,c,u,new it)),a&&(h.normal=Qe.getInterpolatedAttribute(a,o,l,c,u,new C),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new C,materialIndex:0};Qe.getNormal(Vs,Ws,Xs,f.normal),h.face=f,h.barycoord=u}return h}class Pn extends Se{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let f=0,d=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new he(c,3)),this.setAttribute("normal",new he(h,3)),this.setAttribute("uv",new he(u,2));function g(v,m,p,E,S,x,R,w,P,I,b){const M=x/P,L=R/I,O=x/2,k=R/2,q=w/2,G=P+1,X=I+1;let J=0,V=0;const dt=new C;for(let _t=0;_t<X;_t++){const St=_t*L-k;for(let Vt=0;Vt<G;Vt++){const Zt=Vt*M-O;dt[v]=Zt*E,dt[m]=St*S,dt[p]=q,c.push(dt.x,dt.y,dt.z),dt[v]=0,dt[m]=0,dt[p]=w>0?1:-1,h.push(dt.x,dt.y,dt.z),u.push(Vt/P),u.push(1-_t/I),J+=1}}for(let _t=0;_t<I;_t++)for(let St=0;St<P;St++){const Vt=f+St+G*_t,Zt=f+St+G*(_t+1),ie=f+(St+1)+G*(_t+1),Jt=f+(St+1)+G*_t;l.push(Vt,Zt,Jt),l.push(Zt,ie,Jt),V+=6}o.addGroup(d,V,b),d+=V,f+=J}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Pn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Hi(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Ne(i){const t={};for(let e=0;e<i.length;e++){const n=Hi(i[e]);for(const s in n)t[s]=n[s]}return t}function id(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Oc(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ee.workingColorSpace}const sd={clone:Hi,merge:Ne};var rd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ad=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Wn extends Xn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=rd,this.fragmentShader=ad,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Hi(t.uniforms),this.uniformsGroups=id(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Bc extends Me{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new re,this.projectionMatrix=new re,this.projectionMatrixInverse=new re,this.coordinateSystem=pn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const On=new C,vl=new it,_l=new it;class qe extends Bc{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ys*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(hs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ys*2*Math.atan(Math.tan(hs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){On.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(On.x,On.y).multiplyScalar(-t/On.z),On.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(On.x,On.y).multiplyScalar(-t/On.z)}getViewSize(t,e){return this.getViewBounds(t,vl,_l),e.subVectors(_l,vl)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(hs*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const bi=-90,Ei=1;class od extends Me{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new qe(bi,Ei,t,e);s.layers=this.layers,this.add(s);const r=new qe(bi,Ei,t,e);r.layers=this.layers,this.add(r);const a=new qe(bi,Ei,t,e);a.layers=this.layers,this.add(a);const o=new qe(bi,Ei,t,e);o.layers=this.layers,this.add(o);const l=new qe(bi,Ei,t,e);l.layers=this.layers,this.add(l);const c=new qe(bi,Ei,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===pn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===_r)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class zc extends Pe{constructor(t=[],e=Bi,n,s,r,a,o,l,c,h){super(t,e,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class ld extends oi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new zc(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Pn(5,5,5),r=new Wn({name:"CubemapFromEquirect",uniforms:Hi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Oe,blending:kn});r.uniforms.tEquirect.value=e;const a=new Ot(s,r),o=e.minFilter;return e.minFilter===si&&(e.minFilter=dn),new od(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}class ke extends Me{constructor(){super(),this.isGroup=!0,this.type="Group"}}const cd={type:"move"};class ta{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ke,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ke,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ke,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,n),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;c.inputState.pinching&&f>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(cd)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new ke;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class Ro{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new $t(t),this.near=e,this.far=n}clone(){return new Ro(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class kc extends Me{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new on,this.environmentIntensity=1,this.environmentRotation=new on,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class hd{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=io,this.updateRanges=[],this.version=0,this.uuid=mn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=mn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=mn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ie=new C;class yr{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.applyMatrix4(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.applyNormalMatrix(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.transformDirection(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=rn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=se(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=se(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=se(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=se(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=se(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=rn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=rn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=rn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=rn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=se(e,this.array),n=se(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=se(e,this.array),n=se(n,this.array),s=se(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=se(e,this.array),n=se(n,this.array),s=se(s,this.array),r=se(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Be(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new yr(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Hc extends Xn{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new $t(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Ti;const Ji=new C,wi=new C,Ai=new C,Ri=new it,Qi=new it,Gc=new re,Ks=new C,ts=new C,js=new C,xl=new it,ea=new it,yl=new it;class ud extends Me{constructor(t=new Hc){if(super(),this.isSprite=!0,this.type="Sprite",Ti===void 0){Ti=new Se;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new hd(e,5);Ti.setIndex([0,1,2,0,2,3]),Ti.setAttribute("position",new yr(n,3,0,!1)),Ti.setAttribute("uv",new yr(n,2,3,!1))}this.geometry=Ti,this.material=t,this.center=new it(.5,.5),this.count=1}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),wi.setFromMatrixScale(this.matrixWorld),Gc.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Ai.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&wi.multiplyScalar(-Ai.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;Zs(Ks.set(-.5,-.5,0),Ai,a,wi,s,r),Zs(ts.set(.5,-.5,0),Ai,a,wi,s,r),Zs(js.set(.5,.5,0),Ai,a,wi,s,r),xl.set(0,0),ea.set(1,0),yl.set(1,1);let o=t.ray.intersectTriangle(Ks,ts,js,!1,Ji);if(o===null&&(Zs(ts.set(-.5,.5,0),Ai,a,wi,s,r),ea.set(0,1),o=t.ray.intersectTriangle(Ks,js,ts,!1,Ji),o===null))return;const l=t.ray.origin.distanceTo(Ji);l<t.near||l>t.far||e.push({distance:l,point:Ji.clone(),uv:Qe.getInterpolation(Ji,Ks,ts,js,xl,ea,yl,new it),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Zs(i,t,e,n,s,r){Ri.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(Qi.x=r*Ri.x-s*Ri.y,Qi.y=s*Ri.x+r*Ri.y):Qi.copy(Ri),i.copy(t),i.x+=Qi.x,i.y+=Qi.y,i.applyMatrix4(Gc)}class dd extends Pe{constructor(t=null,e=1,n=1,s,r,a,o,l,c=Ye,h=Ye,u,f){super(null,a,o,l,c,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ml extends Be{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Ci=new re,Sl=new re,Js=[],bl=new hi,fd=new re,es=new Ot,ns=new Wi;class pd extends Ot{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Ml(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,fd)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new hi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ci),bl.copy(t.boundingBox).applyMatrix4(Ci),this.boundingBox.union(bl)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Wi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ci),ns.copy(t.boundingSphere).applyMatrix4(Ci),this.boundingSphere.union(ns)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(es.geometry=this.geometry,es.material=this.material,es.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ns.copy(this.boundingSphere),ns.applyMatrix4(n),t.ray.intersectsSphere(ns)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ci),Sl.multiplyMatrices(n,Ci),es.matrixWorld=Sl,es.raycast(t,Js);for(let a=0,o=Js.length;a<o;a++){const l=Js[a];l.instanceId=r,l.object=this,e.push(l)}Js.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Ml(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new dd(new Float32Array(s*this.count),s,this.count,xo,fn));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*t;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const na=new C,md=new C,gd=new Xt;class Bn{constructor(t=new C(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=na.subVectors(n,e).cross(md.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(na),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||gd.getNormalMatrix(t),s=this.coplanarPoint(na).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Zn=new Wi,vd=new it(.5,.5),Qs=new C;class Co{constructor(t=new Bn,e=new Bn,n=new Bn,s=new Bn,r=new Bn,a=new Bn){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=pn,n=!1){const s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],u=r[5],f=r[6],d=r[7],g=r[8],v=r[9],m=r[10],p=r[11],E=r[12],S=r[13],x=r[14],R=r[15];if(s[0].setComponents(c-a,d-h,p-g,R-E).normalize(),s[1].setComponents(c+a,d+h,p+g,R+E).normalize(),s[2].setComponents(c+o,d+u,p+v,R+S).normalize(),s[3].setComponents(c-o,d-u,p-v,R-S).normalize(),n)s[4].setComponents(l,f,m,x).normalize(),s[5].setComponents(c-l,d-f,p-m,R-x).normalize();else if(s[4].setComponents(c-l,d-f,p-m,R-x).normalize(),e===pn)s[5].setComponents(c+l,d+f,p+m,R+x).normalize();else if(e===_r)s[5].setComponents(l,f,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Zn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Zn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Zn)}intersectsSprite(t){Zn.center.set(0,0,0);const e=vd.distanceTo(t.center);return Zn.radius=.7071067811865476+e,Zn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Zn)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Qs.x=s.normal.x>0?t.max.x:t.min.x,Qs.y=s.normal.y>0?t.max.y:t.min.y,Qs.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Qs)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Po extends Xn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new $t(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Mr=new C,Sr=new C,El=new re,is=new wo,tr=new Wi,ia=new C,Tl=new C;class pr extends Me{constructor(t=new Se,e=new Po){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Mr.fromBufferAttribute(e,s-1),Sr.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Mr.distanceTo(Sr);t.setAttribute("lineDistance",new he(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),tr.copy(n.boundingSphere),tr.applyMatrix4(s),tr.radius+=r,t.ray.intersectsSphere(tr)===!1)return;El.copy(s).invert(),is.copy(t.ray).applyMatrix4(El);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){const d=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let v=d,m=g-1;v<m;v+=c){const p=h.getX(v),E=h.getX(v+1),S=er(this,t,is,l,p,E,v);S&&e.push(S)}if(this.isLineLoop){const v=h.getX(g-1),m=h.getX(d),p=er(this,t,is,l,v,m,g-1);p&&e.push(p)}}else{const d=Math.max(0,a.start),g=Math.min(f.count,a.start+a.count);for(let v=d,m=g-1;v<m;v+=c){const p=er(this,t,is,l,v,v+1,v);p&&e.push(p)}if(this.isLineLoop){const v=er(this,t,is,l,g-1,d,g-1);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function er(i,t,e,n,s,r,a){const o=i.geometry.attributes.position;if(Mr.fromBufferAttribute(o,s),Sr.fromBufferAttribute(o,r),e.distanceSqToSegment(Mr,Sr,ia,Tl)>n)return;ia.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(ia);if(!(c<t.near||c>t.far))return{distance:c,point:Tl.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}class Vc extends Pe{constructor(t,e,n,s,r,a,o,l,c){super(t,e,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Wc extends Pe{constructor(t,e,n=ai,s,r,a,o=Ye,l=Ye,c,h=_s,u=1){if(h!==_s&&h!==xs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:t,height:e,depth:u};super(f,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new To(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Xc extends Pe{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Er extends Se{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],a=[],o=[],l=[],c=new C,h=new it;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){const d=n+u/e*s;c.x=t*Math.cos(d),c.y=t*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[f]/t+1)/2,h.y=(a[f+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new he(a,3)),this.setAttribute("normal",new he(o,3)),this.setAttribute("uv",new he(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Er(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class sn extends Se{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],d=[];let g=0;const v=[],m=n/2;let p=0;E(),a===!1&&(t>0&&S(!0),e>0&&S(!1)),this.setIndex(h),this.setAttribute("position",new he(u,3)),this.setAttribute("normal",new he(f,3)),this.setAttribute("uv",new he(d,2));function E(){const x=new C,R=new C;let w=0;const P=(e-t)/n;for(let I=0;I<=r;I++){const b=[],M=I/r,L=M*(e-t)+t;for(let O=0;O<=s;O++){const k=O/s,q=k*l+o,G=Math.sin(q),X=Math.cos(q);R.x=L*G,R.y=-M*n+m,R.z=L*X,u.push(R.x,R.y,R.z),x.set(G,P,X).normalize(),f.push(x.x,x.y,x.z),d.push(k,1-M),b.push(g++)}v.push(b)}for(let I=0;I<s;I++)for(let b=0;b<r;b++){const M=v[b][I],L=v[b+1][I],O=v[b+1][I+1],k=v[b][I+1];(t>0||b!==0)&&(h.push(M,L,k),w+=3),(e>0||b!==r-1)&&(h.push(L,O,k),w+=3)}c.addGroup(p,w,0),p+=w}function S(x){const R=g,w=new it,P=new C;let I=0;const b=x===!0?t:e,M=x===!0?1:-1;for(let O=1;O<=s;O++)u.push(0,m*M,0),f.push(0,M,0),d.push(.5,.5),g++;const L=g;for(let O=0;O<=s;O++){const q=O/s*l+o,G=Math.cos(q),X=Math.sin(q);P.x=b*X,P.y=m*M,P.z=b*G,u.push(P.x,P.y,P.z),f.push(0,M,0),w.x=G*.5+.5,w.y=X*.5*M+.5,d.push(w.x,w.y),g++}for(let O=0;O<s;O++){const k=R+O,q=L+O;x===!0?h.push(q,q+1,k):h.push(q+1,q,k),I+=3}c.addGroup(p,I,x===!0?1:2),p+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new sn(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Lo extends Se{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],a=[];o(s),c(n),h(),this.setAttribute("position",new he(r,3)),this.setAttribute("normal",new he(r.slice(),3)),this.setAttribute("uv",new he(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(E){const S=new C,x=new C,R=new C;for(let w=0;w<e.length;w+=3)d(e[w+0],S),d(e[w+1],x),d(e[w+2],R),l(S,x,R,E)}function l(E,S,x,R){const w=R+1,P=[];for(let I=0;I<=w;I++){P[I]=[];const b=E.clone().lerp(x,I/w),M=S.clone().lerp(x,I/w),L=w-I;for(let O=0;O<=L;O++)O===0&&I===w?P[I][O]=b:P[I][O]=b.clone().lerp(M,O/L)}for(let I=0;I<w;I++)for(let b=0;b<2*(w-I)-1;b++){const M=Math.floor(b/2);b%2===0?(f(P[I][M+1]),f(P[I+1][M]),f(P[I][M])):(f(P[I][M+1]),f(P[I+1][M+1]),f(P[I+1][M]))}}function c(E){const S=new C;for(let x=0;x<r.length;x+=3)S.x=r[x+0],S.y=r[x+1],S.z=r[x+2],S.normalize().multiplyScalar(E),r[x+0]=S.x,r[x+1]=S.y,r[x+2]=S.z}function h(){const E=new C;for(let S=0;S<r.length;S+=3){E.x=r[S+0],E.y=r[S+1],E.z=r[S+2];const x=m(E)/2/Math.PI+.5,R=p(E)/Math.PI+.5;a.push(x,1-R)}g(),u()}function u(){for(let E=0;E<a.length;E+=6){const S=a[E+0],x=a[E+2],R=a[E+4],w=Math.max(S,x,R),P=Math.min(S,x,R);w>.9&&P<.1&&(S<.2&&(a[E+0]+=1),x<.2&&(a[E+2]+=1),R<.2&&(a[E+4]+=1))}}function f(E){r.push(E.x,E.y,E.z)}function d(E,S){const x=E*3;S.x=t[x+0],S.y=t[x+1],S.z=t[x+2]}function g(){const E=new C,S=new C,x=new C,R=new C,w=new it,P=new it,I=new it;for(let b=0,M=0;b<r.length;b+=9,M+=6){E.set(r[b+0],r[b+1],r[b+2]),S.set(r[b+3],r[b+4],r[b+5]),x.set(r[b+6],r[b+7],r[b+8]),w.set(a[M+0],a[M+1]),P.set(a[M+2],a[M+3]),I.set(a[M+4],a[M+5]),R.copy(E).add(S).add(x).divideScalar(3);const L=m(R);v(w,M+0,E,L),v(P,M+2,S,L),v(I,M+4,x,L)}}function v(E,S,x,R){R<0&&E.x===1&&(a[S]=E.x-1),x.x===0&&x.z===0&&(a[S]=R/2/Math.PI+.5)}function m(E){return Math.atan2(E.z,-E.x)}function p(E){return Math.atan2(-E.y,Math.sqrt(E.x*E.x+E.z*E.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Lo(t.vertices,t.indices,t.radius,t.details)}}class _n{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let s=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);const h=n[s],f=n[s+1]-h,d=(a-h)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new it:new C);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new C,s=[],r=[],a=[],o=new C,l=new re;for(let d=0;d<=t;d++){const g=d/t;s[d]=this.getTangentAt(g,new C)}r[0]=new C,a[0]=new C;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),f<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(s[d-1],s[d]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Yt(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(o,g))}a[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(Yt(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(d=-d);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],d*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Io extends _n{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new it){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*h-d*u+this.aX,c=f*u+d*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class _d extends Io{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Do(){let i=0,t=0,e=0,n=0;function s(r,a,o,l){i=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let f=(a-r)/c-(o-r)/(c+h)+(o-a)/h,d=(o-a)/h-(l-a)/(h+u)+(l-o)/u;f*=h,d*=h,s(a,o,f,d)},calc:function(r){const a=r*r,o=a*r;return i+t*r+e*a+n*o}}}const nr=new C,sa=new Do,ra=new Do,aa=new Do;class xd extends _n{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new C){const n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(nr.subVectors(s[0],s[1]).add(s[0]),c=nr);const u=s[o%r],f=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(nr.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=nr),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),d),v=Math.pow(u.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(h),d);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),sa.initNonuniformCatmullRom(c.x,u.x,f.x,h.x,g,v,m),ra.initNonuniformCatmullRom(c.y,u.y,f.y,h.y,g,v,m),aa.initNonuniformCatmullRom(c.z,u.z,f.z,h.z,g,v,m)}else this.curveType==="catmullrom"&&(sa.initCatmullRom(c.x,u.x,f.x,h.x,this.tension),ra.initCatmullRom(c.y,u.y,f.y,h.y,this.tension),aa.initCatmullRom(c.z,u.z,f.z,h.z,this.tension));return n.set(sa.calc(l),ra.calc(l),aa.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new C().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function wl(i,t,e,n,s){const r=(n-t)*.5,a=(s-e)*.5,o=i*i,l=i*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*i+e}function yd(i,t){const e=1-i;return e*e*t}function Md(i,t){return 2*(1-i)*i*t}function Sd(i,t){return i*i*t}function ds(i,t,e,n){return yd(i,t)+Md(i,e)+Sd(i,n)}function bd(i,t){const e=1-i;return e*e*e*t}function Ed(i,t){const e=1-i;return 3*e*e*i*t}function Td(i,t){return 3*(1-i)*i*i*t}function wd(i,t){return i*i*i*t}function fs(i,t,e,n,s){return bd(i,t)+Ed(i,e)+Td(i,n)+wd(i,s)}class qc extends _n{constructor(t=new it,e=new it,n=new it,s=new it){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new it){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(fs(t,s.x,r.x,a.x,o.x),fs(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Ad extends _n{constructor(t=new C,e=new C,n=new C,s=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new C){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(fs(t,s.x,r.x,a.x,o.x),fs(t,s.y,r.y,a.y,o.y),fs(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Yc extends _n{constructor(t=new it,e=new it){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new it){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new it){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Rd extends _n{constructor(t=new C,e=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new C){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new C){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class $c extends _n{constructor(t=new it,e=new it,n=new it){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new it){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(ds(t,s.x,r.x,a.x),ds(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Cd extends _n{constructor(t=new C,e=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new C){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(ds(t,s.x,r.x,a.x),ds(t,s.y,r.y,a.y),ds(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Kc extends _n{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new it){const n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],u=s[a>s.length-3?s.length-1:a+2];return n.set(wl(o,l.x,c.x,h.x,u.x),wl(o,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new it().fromArray(s))}return this}}var so=Object.freeze({__proto__:null,ArcCurve:_d,CatmullRomCurve3:xd,CubicBezierCurve:qc,CubicBezierCurve3:Ad,EllipseCurve:Io,LineCurve:Yc,LineCurve3:Rd,QuadraticBezierCurve:$c,QuadraticBezierCurve3:Cd,SplineCurve:Kc});class Pd extends _n{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new so[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new so[s.type]().fromJSON(s))}return this}}class Al extends Pd{constructor(t){super(),this.type="Path",this.currentPoint=new it,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Yc(this.currentPoint.clone(),new it(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new $c(this.currentPoint.clone(),new it(t,e),new it(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,a){const o=new qc(this.currentPoint.clone(),new it(t,e),new it(n,s),new it(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Kc(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,s,r,a),this}absarc(t,e,n,s,r,a){return this.absellipse(t,e,n,n,s,r,a),this}ellipse(t,e,n,s,r,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,a,o,l),this}absellipse(t,e,n,s,r,a,o,l){const c=new Io(t,e,n,s,r,a,o,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class jc extends Al{constructor(t){super(t),this.uuid=mn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new Al().fromJSON(s))}return this}}function Ld(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let r=Zc(i,0,s,e,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=Fd(i,t,r,e)),i.length>80*e){o=1/0,l=1/0;let h=-1/0,u=-1/0;for(let f=e;f<s;f+=e){const d=i[f],g=i[f+1];d<o&&(o=d),g<l&&(l=g),d>h&&(h=d),g>u&&(u=g)}c=Math.max(h-o,u-l),c=c!==0?32767/c:0}return Ss(r,a,e,o,l,c,0),a}function Zc(i,t,e,n,s){let r;if(s===Yd(i,t,e,n)>0)for(let a=t;a<e;a+=n)r=Rl(a/n|0,i[a],i[a+1],r);else for(let a=e-n;a>=t;a-=n)r=Rl(a/n|0,i[a],i[a+1],r);return r&&Gi(r,r.next)&&(Es(r),r=r.next),r}function li(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Gi(e,e.next)||_e(e.prev,e,e.next)===0)){if(Es(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Ss(i,t,e,n,s,r,a){if(!i)return;!a&&r&&Hd(i,n,s,r);let o=i;for(;i.prev!==i.next;){const l=i.prev,c=i.next;if(r?Dd(i,n,s,r):Id(i)){t.push(l.i,i.i,c.i),Es(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=Ud(li(i),t),Ss(i,t,e,n,s,r,2)):a===2&&Nd(i,t,e,n,s,r):Ss(li(i),t,e,n,s,r,1);break}}}function Id(i){const t=i.prev,e=i,n=i.next;if(_e(t,e,n)>=0)return!1;const s=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=Math.min(s,r,a),u=Math.min(o,l,c),f=Math.max(s,r,a),d=Math.max(o,l,c);let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=f&&g.y>=u&&g.y<=d&&ls(s,o,r,l,a,c,g.x,g.y)&&_e(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Dd(i,t,e,n){const s=i.prev,r=i,a=i.next;if(_e(s,r,a)>=0)return!1;const o=s.x,l=r.x,c=a.x,h=s.y,u=r.y,f=a.y,d=Math.min(o,l,c),g=Math.min(h,u,f),v=Math.max(o,l,c),m=Math.max(h,u,f),p=ro(d,g,t,e,n),E=ro(v,m,t,e,n);let S=i.prevZ,x=i.nextZ;for(;S&&S.z>=p&&x&&x.z<=E;){if(S.x>=d&&S.x<=v&&S.y>=g&&S.y<=m&&S!==s&&S!==a&&ls(o,h,l,u,c,f,S.x,S.y)&&_e(S.prev,S,S.next)>=0||(S=S.prevZ,x.x>=d&&x.x<=v&&x.y>=g&&x.y<=m&&x!==s&&x!==a&&ls(o,h,l,u,c,f,x.x,x.y)&&_e(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;S&&S.z>=p;){if(S.x>=d&&S.x<=v&&S.y>=g&&S.y<=m&&S!==s&&S!==a&&ls(o,h,l,u,c,f,S.x,S.y)&&_e(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;x&&x.z<=E;){if(x.x>=d&&x.x<=v&&x.y>=g&&x.y<=m&&x!==s&&x!==a&&ls(o,h,l,u,c,f,x.x,x.y)&&_e(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function Ud(i,t){let e=i;do{const n=e.prev,s=e.next.next;!Gi(n,s)&&Qc(n,e,e.next,s)&&bs(n,s)&&bs(s,n)&&(t.push(n.i,e.i,s.i),Es(e),Es(e.next),e=i=s),e=e.next}while(e!==i);return li(e)}function Nd(i,t,e,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Wd(a,o)){let l=th(a,o);a=li(a,a.next),l=li(l,l.next),Ss(a,t,e,n,s,r,0),Ss(l,t,e,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function Fd(i,t,e,n){const s=[];for(let r=0,a=t.length;r<a;r++){const o=t[r]*n,l=r<a-1?t[r+1]*n:i.length,c=Zc(i,o,l,n,!1);c===c.next&&(c.steiner=!0),s.push(Vd(c))}s.sort(Od);for(let r=0;r<s.length;r++)e=Bd(s[r],e);return e}function Od(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function Bd(i,t){const e=zd(i,t);if(!e)return t;const n=th(e,i);return li(n,n.next),li(e,e.next)}function zd(i,t){let e=t;const n=i.x,s=i.y;let r=-1/0,a;if(Gi(i,e))return e;do{if(Gi(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){const u=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=n&&u>r&&(r=u,a=e.x<e.next.x?e:e.next,u===n))return a}e=e.next}while(e!==t);if(!a)return null;const o=a,l=a.x,c=a.y;let h=1/0;e=a;do{if(n>=e.x&&e.x>=l&&n!==e.x&&Jc(s<c?n:r,s,l,c,s<c?r:n,s,e.x,e.y)){const u=Math.abs(s-e.y)/(n-e.x);bs(e,i)&&(u<h||u===h&&(e.x>a.x||e.x===a.x&&kd(a,e)))&&(a=e,h=u)}e=e.next}while(e!==o);return a}function kd(i,t){return _e(i.prev,i,t.prev)<0&&_e(t.next,i,i.next)<0}function Hd(i,t,e,n){let s=i;do s.z===0&&(s.z=ro(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Gd(s)}function Gd(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let a=n,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let l=e;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,e*=2}while(t>1);return i}function ro(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function Vd(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Jc(i,t,e,n,s,r,a,o){return(s-a)*(t-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(n-o)}function ls(i,t,e,n,s,r,a,o){return!(i===a&&t===o)&&Jc(i,t,e,n,s,r,a,o)}function Wd(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!Xd(i,t)&&(bs(i,t)&&bs(t,i)&&qd(i,t)&&(_e(i.prev,i,t.prev)||_e(i,t.prev,t))||Gi(i,t)&&_e(i.prev,i,i.next)>0&&_e(t.prev,t,t.next)>0)}function _e(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Gi(i,t){return i.x===t.x&&i.y===t.y}function Qc(i,t,e,n){const s=sr(_e(i,t,e)),r=sr(_e(i,t,n)),a=sr(_e(e,n,i)),o=sr(_e(e,n,t));return!!(s!==r&&a!==o||s===0&&ir(i,e,t)||r===0&&ir(i,n,t)||a===0&&ir(e,i,n)||o===0&&ir(e,t,n))}function ir(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function sr(i){return i>0?1:i<0?-1:0}function Xd(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&Qc(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function bs(i,t){return _e(i.prev,i,i.next)<0?_e(i,t,i.next)>=0&&_e(i,i.prev,t)>=0:_e(i,t,i.prev)<0||_e(i,i.next,t)<0}function qd(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function th(i,t){const e=ao(i.i,i.x,i.y),n=ao(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Rl(i,t,e,n){const s=ao(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Es(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function ao(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Yd(i,t,e,n){let s=0;for(let r=t,a=e-n;r<e;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}class $d{static triangulate(t,e,n=2){return Ld(t,e,n)}}class Ii{static area(t){const e=t.length;let n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return Ii.area(t)<0}static triangulateShape(t,e){const n=[],s=[],r=[];Cl(t),Pl(n,t);let a=t.length;e.forEach(Cl);for(let l=0;l<e.length;l++)s.push(a),a+=e[l].length,Pl(n,e[l]);const o=$d.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function Cl(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Pl(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class Uo extends Se{constructor(t=new jc([new it(.5,.5),new it(-.5,.5),new it(-.5,-.5),new it(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],r=[];for(let o=0,l=t.length;o<l;o++){const c=t[o];a(c)}this.setAttribute("position",new he(s,3)),this.setAttribute("uv",new he(r,2)),this.computeVertexNormals();function a(o){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:d-.1,v=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,E=e.UVGenerator!==void 0?e.UVGenerator:Kd;let S,x=!1,R,w,P,I;p&&(S=p.getSpacedPoints(h),x=!0,f=!1,R=p.computeFrenetFrames(h,!1),w=new C,P=new C,I=new C),f||(m=0,d=0,g=0,v=0);const b=o.extractPoints(c);let M=b.shape;const L=b.holes;if(!Ii.isClockWise(M)){M=M.reverse();for(let tt=0,j=L.length;tt<j;tt++){const K=L[tt];Ii.isClockWise(K)&&(L[tt]=K.reverse())}}function k(tt){const K=10000000000000001e-36;let $=tt[0];for(let ht=1;ht<=tt.length;ht++){const nt=ht%tt.length,ut=tt[nt],Ht=ut.x-$.x,kt=ut.y-$.y,T=Ht*Ht+kt*kt,_=Math.max(Math.abs(ut.x),Math.abs(ut.y),Math.abs($.x),Math.abs($.y)),F=K*_*_;if(T<=F){tt.splice(nt,1),ht--;continue}$=ut}}k(M),L.forEach(k);const q=L.length,G=M;for(let tt=0;tt<q;tt++){const j=L[tt];M=M.concat(j)}function X(tt,j,K){return j||console.error("THREE.ExtrudeGeometry: vec does not exist"),tt.clone().addScaledVector(j,K)}const J=M.length;function V(tt,j,K){let $,ht,nt;const ut=tt.x-j.x,Ht=tt.y-j.y,kt=K.x-tt.x,T=K.y-tt.y,_=ut*ut+Ht*Ht,F=ut*T-Ht*kt;if(Math.abs(F)>Number.EPSILON){const H=Math.sqrt(_),Q=Math.sqrt(kt*kt+T*T),W=j.x-Ht/H,Lt=j.y+ut/H,ct=K.x-T/Q,Rt=K.y+kt/Q,Ct=((ct-W)*T-(Rt-Lt)*kt)/(ut*T-Ht*kt);$=W+ut*Ct-tt.x,ht=Lt+Ht*Ct-tt.y;const st=$*$+ht*ht;if(st<=2)return new it($,ht);nt=Math.sqrt(st/2)}else{let H=!1;ut>Number.EPSILON?kt>Number.EPSILON&&(H=!0):ut<-Number.EPSILON?kt<-Number.EPSILON&&(H=!0):Math.sign(Ht)===Math.sign(T)&&(H=!0),H?($=-Ht,ht=ut,nt=Math.sqrt(_)):($=ut,ht=Ht,nt=Math.sqrt(_/2))}return new it($/nt,ht/nt)}const dt=[];for(let tt=0,j=G.length,K=j-1,$=tt+1;tt<j;tt++,K++,$++)K===j&&(K=0),$===j&&($=0),dt[tt]=V(G[tt],G[K],G[$]);const _t=[];let St,Vt=dt.concat();for(let tt=0,j=q;tt<j;tt++){const K=L[tt];St=[];for(let $=0,ht=K.length,nt=ht-1,ut=$+1;$<ht;$++,nt++,ut++)nt===ht&&(nt=0),ut===ht&&(ut=0),St[$]=V(K[$],K[nt],K[ut]);_t.push(St),Vt=Vt.concat(St)}let Zt;if(m===0)Zt=Ii.triangulateShape(G,L);else{const tt=[],j=[];for(let K=0;K<m;K++){const $=K/m,ht=d*Math.cos($*Math.PI/2),nt=g*Math.sin($*Math.PI/2)+v;for(let ut=0,Ht=G.length;ut<Ht;ut++){const kt=X(G[ut],dt[ut],nt);Dt(kt.x,kt.y,-ht),$===0&&tt.push(kt)}for(let ut=0,Ht=q;ut<Ht;ut++){const kt=L[ut];St=_t[ut];const T=[];for(let _=0,F=kt.length;_<F;_++){const H=X(kt[_],St[_],nt);Dt(H.x,H.y,-ht),$===0&&T.push(H)}$===0&&j.push(T)}}Zt=Ii.triangulateShape(tt,j)}const ie=Zt.length,Jt=g+v;for(let tt=0;tt<J;tt++){const j=f?X(M[tt],Vt[tt],Jt):M[tt];x?(P.copy(R.normals[0]).multiplyScalar(j.x),w.copy(R.binormals[0]).multiplyScalar(j.y),I.copy(S[0]).add(P).add(w),Dt(I.x,I.y,I.z)):Dt(j.x,j.y,0)}for(let tt=1;tt<=h;tt++)for(let j=0;j<J;j++){const K=f?X(M[j],Vt[j],Jt):M[j];x?(P.copy(R.normals[tt]).multiplyScalar(K.x),w.copy(R.binormals[tt]).multiplyScalar(K.y),I.copy(S[tt]).add(P).add(w),Dt(I.x,I.y,I.z)):Dt(K.x,K.y,u/h*tt)}for(let tt=m-1;tt>=0;tt--){const j=tt/m,K=d*Math.cos(j*Math.PI/2),$=g*Math.sin(j*Math.PI/2)+v;for(let ht=0,nt=G.length;ht<nt;ht++){const ut=X(G[ht],dt[ht],$);Dt(ut.x,ut.y,u+K)}for(let ht=0,nt=L.length;ht<nt;ht++){const ut=L[ht];St=_t[ht];for(let Ht=0,kt=ut.length;Ht<kt;Ht++){const T=X(ut[Ht],St[Ht],$);x?Dt(T.x,T.y+S[h-1].y,S[h-1].x+K):Dt(T.x,T.y,u+K)}}}Y(),et();function Y(){const tt=s.length/3;if(f){let j=0,K=J*j;for(let $=0;$<ie;$++){const ht=Zt[$];At(ht[2]+K,ht[1]+K,ht[0]+K)}j=h+m*2,K=J*j;for(let $=0;$<ie;$++){const ht=Zt[$];At(ht[0]+K,ht[1]+K,ht[2]+K)}}else{for(let j=0;j<ie;j++){const K=Zt[j];At(K[2],K[1],K[0])}for(let j=0;j<ie;j++){const K=Zt[j];At(K[0]+J*h,K[1]+J*h,K[2]+J*h)}}n.addGroup(tt,s.length/3-tt,0)}function et(){const tt=s.length/3;let j=0;Mt(G,j),j+=G.length;for(let K=0,$=L.length;K<$;K++){const ht=L[K];Mt(ht,j),j+=ht.length}n.addGroup(tt,s.length/3-tt,1)}function Mt(tt,j){let K=tt.length;for(;--K>=0;){const $=K;let ht=K-1;ht<0&&(ht=tt.length-1);for(let nt=0,ut=h+m*2;nt<ut;nt++){const Ht=J*nt,kt=J*(nt+1),T=j+$+Ht,_=j+ht+Ht,F=j+ht+kt,H=j+$+kt;Kt(T,_,F,H)}}}function Dt(tt,j,K){l.push(tt),l.push(j),l.push(K)}function At(tt,j,K){de(tt),de(j),de(K);const $=s.length/3,ht=E.generateTopUV(n,s,$-3,$-2,$-1);A(ht[0]),A(ht[1]),A(ht[2])}function Kt(tt,j,K,$){de(tt),de(j),de($),de(j),de(K),de($);const ht=s.length/3,nt=E.generateSideWallUV(n,s,ht-6,ht-3,ht-2,ht-1);A(nt[0]),A(nt[1]),A(nt[3]),A(nt[1]),A(nt[2]),A(nt[3])}function de(tt){s.push(l[tt*3+0]),s.push(l[tt*3+1]),s.push(l[tt*3+2])}function A(tt){r.push(tt.x),r.push(tt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return jd(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,a=t.shapes.length;r<a;r++){const o=e[t.shapes[r]];n.push(o)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new so[s.type]().fromJSON(s)),new Uo(n,t.options)}}const Kd={generateTopUV:function(i,t,e,n,s){const r=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],c=t[s*3],h=t[s*3+1];return[new it(r,a),new it(o,l),new it(c,h)]},generateSideWallUV:function(i,t,e,n,s,r){const a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],u=t[n*3+2],f=t[s*3],d=t[s*3+1],g=t[s*3+2],v=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new it(a,1-l),new it(c,1-u),new it(f,1-g),new it(v,1-p)]:[new it(o,1-l),new it(h,1-u),new it(d,1-g),new it(m,1-p)]}};function jd(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class No extends Lo{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new No(t.radius,t.detail)}}class Je extends Se{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,u=t/o,f=e/l,d=[],g=[],v=[],m=[];for(let p=0;p<h;p++){const E=p*f-a;for(let S=0;S<c;S++){const x=S*u-r;g.push(x,-E,0),v.push(0,0,1),m.push(S/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let E=0;E<o;E++){const S=E+c*p,x=E+c*(p+1),R=E+1+c*(p+1),w=E+1+c*p;d.push(S,x,w),d.push(x,R,w)}this.setIndex(d),this.setAttribute("position",new he(g,3)),this.setAttribute("normal",new he(v,3)),this.setAttribute("uv",new he(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Je(t.width,t.height,t.widthSegments,t.heightSegments)}}class As extends Se{constructor(t=.5,e=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],l=[],c=[],h=[];let u=t;const f=(e-t)/s,d=new C,g=new it;for(let v=0;v<=s;v++){for(let m=0;m<=n;m++){const p=r+m/n*a;d.x=u*Math.cos(p),d.y=u*Math.sin(p),l.push(d.x,d.y,d.z),c.push(0,0,1),g.x=(d.x/e+1)/2,g.y=(d.y/e+1)/2,h.push(g.x,g.y)}u+=f}for(let v=0;v<s;v++){const m=v*(n+1);for(let p=0;p<n;p++){const E=p+m,S=E,x=E+n+1,R=E+n+2,w=E+1;o.push(S,x,w),o.push(x,R,w)}}this.setIndex(o),this.setAttribute("position",new he(l,3)),this.setAttribute("normal",new he(c,3)),this.setAttribute("uv",new he(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new As(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Tr extends Se{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new C,f=new C,d=[],g=[],v=[],m=[];for(let p=0;p<=n;p++){const E=[],S=p/n;let x=0;p===0&&a===0?x=.5/e:p===n&&l===Math.PI&&(x=-.5/e);for(let R=0;R<=e;R++){const w=R/e;u.x=-t*Math.cos(s+w*r)*Math.sin(a+S*o),u.y=t*Math.cos(a+S*o),u.z=t*Math.sin(s+w*r)*Math.sin(a+S*o),g.push(u.x,u.y,u.z),f.copy(u).normalize(),v.push(f.x,f.y,f.z),m.push(w+x,1-S),E.push(c++)}h.push(E)}for(let p=0;p<n;p++)for(let E=0;E<e;E++){const S=h[p][E+1],x=h[p][E],R=h[p+1][E],w=h[p+1][E+1];(p!==0||a>0)&&d.push(S,x,w),(p!==n-1||l<Math.PI)&&d.push(x,R,w)}this.setIndex(d),this.setAttribute("position",new he(g,3)),this.setAttribute("normal",new he(v,3)),this.setAttribute("uv",new he(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Tr(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class wr extends Se{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const a=[],o=[],l=[],c=[],h=new C,u=new C,f=new C;for(let d=0;d<=n;d++)for(let g=0;g<=s;g++){const v=g/s*r,m=d/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(v),u.y=(t+e*Math.cos(m))*Math.sin(v),u.z=e*Math.sin(m),o.push(u.x,u.y,u.z),h.x=t*Math.cos(v),h.y=t*Math.sin(v),f.subVectors(u,h).normalize(),l.push(f.x,f.y,f.z),c.push(g/s),c.push(d/n)}for(let d=1;d<=n;d++)for(let g=1;g<=s;g++){const v=(s+1)*d+g-1,m=(s+1)*(d-1)+g-1,p=(s+1)*(d-1)+g,E=(s+1)*d+g;a.push(v,m,E),a.push(m,p,E)}this.setIndex(a),this.setAttribute("position",new he(o,3)),this.setAttribute("normal",new he(l,3)),this.setAttribute("uv",new he(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new wr(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class me extends Xn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new $t(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $t(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=bo,this.normalScale=new it(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Zd extends Xn{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new $t(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $t(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=bo,this.normalScale=new it(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.combine=mo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Jd extends Xn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=du,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Qd extends Xn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class oa extends Po{constructor(t){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}}class Fo extends Me{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new $t(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class tf extends Fo{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Me.DEFAULT_UP),this.updateMatrix(),this.groundColor=new $t(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const la=new re,Ll=new C,Il=new C;class eh{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new it(512,512),this.mapType=vn,this.map=null,this.mapPass=null,this.matrix=new re,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Co,this._frameExtents=new it(1,1),this._viewportCount=1,this._viewports=[new ce(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Ll.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ll),Il.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Il),e.updateMatrixWorld(),la.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(la,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(la)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Dl=new re,ss=new C,ca=new C;class ef extends eh{constructor(){super(new qe(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new it(4,2),this._viewportCount=6,this._viewports=[new ce(2,1,1,1),new ce(0,1,1,1),new ce(3,1,1,1),new ce(1,1,1,1),new ce(3,0,1,1),new ce(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ss.setFromMatrixPosition(t.matrixWorld),n.position.copy(ss),ca.copy(n.position),ca.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(ca),n.updateMatrixWorld(),s.makeTranslation(-ss.x,-ss.y,-ss.z),Dl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Dl,n.coordinateSystem,n.reversedDepth)}}class nf extends Fo{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new ef}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class nh extends Bc{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class sf extends eh{constructor(){super(new nh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ul extends Fo{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Me.DEFAULT_UP),this.updateMatrix(),this.target=new Me,this.shadow=new sf}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class rf extends qe{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const Nl=new re;class af{constructor(t,e,n=0,s=1/0){this.ray=new wo(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Ao,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Nl.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Nl),this}intersectObject(t,e=!0,n=[]){return oo(t,this,n,e),n.sort(Fl),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)oo(t[s],this,n,e);return n.sort(Fl),n}}function Fl(i,t){return i.distance-t.distance}function oo(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)oo(r[a],t,e,!0)}}const Ol=new it;class Bl{constructor(t=new it(1/0,1/0),e=new it(-1/0,-1/0)){this.isBox2=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Ol.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(t){return this.isEmpty()?t.set(0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ol).distanceTo(t)}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}function zl(i,t,e,n){const s=of(n);switch(e){case Rc:return i*t;case xo:return i*t/s.components*s.byteLength;case yo:return i*t/s.components*s.byteLength;case Pc:return i*t*2/s.components*s.byteLength;case Mo:return i*t*2/s.components*s.byteLength;case Cc:return i*t*3/s.components*s.byteLength;case an:return i*t*4/s.components*s.byteLength;case So:return i*t*4/s.components*s.byteLength;case hr:case ur:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case dr:case fr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Pa:case Ia:return Math.max(i,16)*Math.max(t,8)/4;case Ca:case La:return Math.max(i,8)*Math.max(t,8)/2;case Da:case Ua:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Na:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Fa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Oa:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Ba:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case za:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case ka:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Ha:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Ga:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Va:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Wa:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Xa:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case qa:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Ya:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case $a:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Ka:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case ja:case Za:case Ja:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Qa:case to:return Math.ceil(i/4)*Math.ceil(t/4)*8;case eo:case no:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function of(i){switch(i){case vn:case Ec:return{byteLength:1,components:1};case gs:case Tc:case Ts:return{byteLength:2,components:1};case vo:case _o:return{byteLength:2,components:4};case ai:case go:case fn:return{byteLength:4,components:1};case wc:case Ac:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:po}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=po);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function ih(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function lf(i){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,u=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,h),o.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const h=l.array,u=l.updateRanges;if(i.bindBuffer(c,o),u.length===0)i.bufferSubData(c,0,h);else{u.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<u.length;d++){const g=u[f],v=u[d];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++f,u[f]=v)}u.length=f+1;for(let d=0,g=u.length;d<g;d++){const v=u[d];i.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var cf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,hf=`#ifdef USE_ALPHAHASH
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
#endif`,uf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,df=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ff=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,pf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,mf=`#ifdef USE_AOMAP
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
#endif`,gf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,vf=`#ifdef USE_BATCHING
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
#endif`,_f=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,xf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,yf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Mf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Sf=`#ifdef USE_IRIDESCENCE
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
#endif`,bf=`#ifdef USE_BUMPMAP
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
#endif`,Ef=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Tf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,wf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Af=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Rf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Cf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Pf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Lf=`#if defined( USE_COLOR_ALPHA )
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
#endif`,If=`#define PI 3.141592653589793
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
} // validated`,Df=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Uf=`vec3 transformedNormal = objectNormal;
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
#endif`,Nf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ff=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Of=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Bf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,zf="gl_FragColor = linearToOutputTexel( gl_FragColor );",kf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Hf=`#ifdef USE_ENVMAP
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
#endif`,Gf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Vf=`#ifdef USE_ENVMAP
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
#endif`,Wf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Xf=`#ifdef USE_ENVMAP
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
#endif`,qf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Yf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,$f=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Kf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,jf=`#ifdef USE_GRADIENTMAP
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
}`,Zf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Jf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Qf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,tp=`uniform bool receiveShadow;
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
#endif`,ep=`#ifdef USE_ENVMAP
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
#endif`,np=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ip=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,sp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,rp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ap=`PhysicalMaterial material;
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
#endif`,op=`struct PhysicalMaterial {
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
}`,lp=`
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
#endif`,cp=`#if defined( RE_IndirectDiffuse )
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
#endif`,hp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,up=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,dp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,pp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,mp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,gp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,vp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,_p=`#if defined( USE_POINTS_UV )
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
#endif`,xp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,yp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Mp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Sp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,bp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ep=`#ifdef USE_MORPHTARGETS
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
#endif`,Tp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,wp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Ap=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Rp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Cp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Pp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Lp=`#ifdef USE_NORMALMAP
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
#endif`,Ip=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Dp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Up=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Np=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Fp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Op=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Bp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,zp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,kp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Hp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Gp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Vp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Wp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Xp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,qp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Yp=`float getShadowMask() {
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
}`,$p=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Kp=`#ifdef USE_SKINNING
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
#endif`,jp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Zp=`#ifdef USE_SKINNING
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
#endif`,Jp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Qp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,em=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,nm=`#ifdef USE_TRANSMISSION
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
#endif`,im=`#ifdef USE_TRANSMISSION
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
#endif`,sm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,rm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,am=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,om=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const lm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,cm=`uniform sampler2D t2D;
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
}`,hm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,um=`#ifdef ENVMAP_TYPE_CUBE
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
}`,dm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pm=`#include <common>
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
}`,mm=`#if DEPTH_PACKING == 3200
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
}`,gm=`#define DISTANCE
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
}`,vm=`#define DISTANCE
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
}`,_m=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,xm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ym=`uniform float scale;
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
}`,Mm=`uniform vec3 diffuse;
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
}`,Sm=`#include <common>
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
}`,bm=`uniform vec3 diffuse;
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
}`,Em=`#define LAMBERT
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
}`,Tm=`#define LAMBERT
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
}`,wm=`#define MATCAP
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
}`,Am=`#define MATCAP
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
}`,Rm=`#define NORMAL
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
}`,Cm=`#define NORMAL
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
}`,Pm=`#define PHONG
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
}`,Lm=`#define PHONG
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
}`,Im=`#define STANDARD
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
}`,Dm=`#define STANDARD
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
}`,Um=`#define TOON
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
}`,Nm=`#define TOON
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
}`,Fm=`uniform float size;
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
}`,Om=`uniform vec3 diffuse;
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
}`,Bm=`#include <common>
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
}`,zm=`uniform vec3 color;
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
}`,km=`uniform float rotation;
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
}`,Hm=`uniform vec3 diffuse;
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
}`,qt={alphahash_fragment:cf,alphahash_pars_fragment:hf,alphamap_fragment:uf,alphamap_pars_fragment:df,alphatest_fragment:ff,alphatest_pars_fragment:pf,aomap_fragment:mf,aomap_pars_fragment:gf,batching_pars_vertex:vf,batching_vertex:_f,begin_vertex:xf,beginnormal_vertex:yf,bsdfs:Mf,iridescence_fragment:Sf,bumpmap_pars_fragment:bf,clipping_planes_fragment:Ef,clipping_planes_pars_fragment:Tf,clipping_planes_pars_vertex:wf,clipping_planes_vertex:Af,color_fragment:Rf,color_pars_fragment:Cf,color_pars_vertex:Pf,color_vertex:Lf,common:If,cube_uv_reflection_fragment:Df,defaultnormal_vertex:Uf,displacementmap_pars_vertex:Nf,displacementmap_vertex:Ff,emissivemap_fragment:Of,emissivemap_pars_fragment:Bf,colorspace_fragment:zf,colorspace_pars_fragment:kf,envmap_fragment:Hf,envmap_common_pars_fragment:Gf,envmap_pars_fragment:Vf,envmap_pars_vertex:Wf,envmap_physical_pars_fragment:ep,envmap_vertex:Xf,fog_vertex:qf,fog_pars_vertex:Yf,fog_fragment:$f,fog_pars_fragment:Kf,gradientmap_pars_fragment:jf,lightmap_pars_fragment:Zf,lights_lambert_fragment:Jf,lights_lambert_pars_fragment:Qf,lights_pars_begin:tp,lights_toon_fragment:np,lights_toon_pars_fragment:ip,lights_phong_fragment:sp,lights_phong_pars_fragment:rp,lights_physical_fragment:ap,lights_physical_pars_fragment:op,lights_fragment_begin:lp,lights_fragment_maps:cp,lights_fragment_end:hp,logdepthbuf_fragment:up,logdepthbuf_pars_fragment:dp,logdepthbuf_pars_vertex:fp,logdepthbuf_vertex:pp,map_fragment:mp,map_pars_fragment:gp,map_particle_fragment:vp,map_particle_pars_fragment:_p,metalnessmap_fragment:xp,metalnessmap_pars_fragment:yp,morphinstance_vertex:Mp,morphcolor_vertex:Sp,morphnormal_vertex:bp,morphtarget_pars_vertex:Ep,morphtarget_vertex:Tp,normal_fragment_begin:wp,normal_fragment_maps:Ap,normal_pars_fragment:Rp,normal_pars_vertex:Cp,normal_vertex:Pp,normalmap_pars_fragment:Lp,clearcoat_normal_fragment_begin:Ip,clearcoat_normal_fragment_maps:Dp,clearcoat_pars_fragment:Up,iridescence_pars_fragment:Np,opaque_fragment:Fp,packing:Op,premultiplied_alpha_fragment:Bp,project_vertex:zp,dithering_fragment:kp,dithering_pars_fragment:Hp,roughnessmap_fragment:Gp,roughnessmap_pars_fragment:Vp,shadowmap_pars_fragment:Wp,shadowmap_pars_vertex:Xp,shadowmap_vertex:qp,shadowmask_pars_fragment:Yp,skinbase_vertex:$p,skinning_pars_vertex:Kp,skinning_vertex:jp,skinnormal_vertex:Zp,specularmap_fragment:Jp,specularmap_pars_fragment:Qp,tonemapping_fragment:tm,tonemapping_pars_fragment:em,transmission_fragment:nm,transmission_pars_fragment:im,uv_pars_fragment:sm,uv_pars_vertex:rm,uv_vertex:am,worldpos_vertex:om,background_vert:lm,background_frag:cm,backgroundCube_vert:hm,backgroundCube_frag:um,cube_vert:dm,cube_frag:fm,depth_vert:pm,depth_frag:mm,distanceRGBA_vert:gm,distanceRGBA_frag:vm,equirect_vert:_m,equirect_frag:xm,linedashed_vert:ym,linedashed_frag:Mm,meshbasic_vert:Sm,meshbasic_frag:bm,meshlambert_vert:Em,meshlambert_frag:Tm,meshmatcap_vert:wm,meshmatcap_frag:Am,meshnormal_vert:Rm,meshnormal_frag:Cm,meshphong_vert:Pm,meshphong_frag:Lm,meshphysical_vert:Im,meshphysical_frag:Dm,meshtoon_vert:Um,meshtoon_frag:Nm,points_vert:Fm,points_frag:Om,shadow_vert:Bm,shadow_frag:zm,sprite_vert:km,sprite_frag:Hm},pt={common:{diffuse:{value:new $t(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xt}},envmap:{envMap:{value:null},envMapRotation:{value:new Xt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xt},normalScale:{value:new it(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new $t(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new $t(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0},uvTransform:{value:new Xt}},sprite:{diffuse:{value:new $t(16777215)},opacity:{value:1},center:{value:new it(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}}},hn={basic:{uniforms:Ne([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.fog]),vertexShader:qt.meshbasic_vert,fragmentShader:qt.meshbasic_frag},lambert:{uniforms:Ne([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new $t(0)}}]),vertexShader:qt.meshlambert_vert,fragmentShader:qt.meshlambert_frag},phong:{uniforms:Ne([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new $t(0)},specular:{value:new $t(1118481)},shininess:{value:30}}]),vertexShader:qt.meshphong_vert,fragmentShader:qt.meshphong_frag},standard:{uniforms:Ne([pt.common,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.roughnessmap,pt.metalnessmap,pt.fog,pt.lights,{emissive:{value:new $t(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag},toon:{uniforms:Ne([pt.common,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.gradientmap,pt.fog,pt.lights,{emissive:{value:new $t(0)}}]),vertexShader:qt.meshtoon_vert,fragmentShader:qt.meshtoon_frag},matcap:{uniforms:Ne([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,{matcap:{value:null}}]),vertexShader:qt.meshmatcap_vert,fragmentShader:qt.meshmatcap_frag},points:{uniforms:Ne([pt.points,pt.fog]),vertexShader:qt.points_vert,fragmentShader:qt.points_frag},dashed:{uniforms:Ne([pt.common,pt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qt.linedashed_vert,fragmentShader:qt.linedashed_frag},depth:{uniforms:Ne([pt.common,pt.displacementmap]),vertexShader:qt.depth_vert,fragmentShader:qt.depth_frag},normal:{uniforms:Ne([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,{opacity:{value:1}}]),vertexShader:qt.meshnormal_vert,fragmentShader:qt.meshnormal_frag},sprite:{uniforms:Ne([pt.sprite,pt.fog]),vertexShader:qt.sprite_vert,fragmentShader:qt.sprite_frag},background:{uniforms:{uvTransform:{value:new Xt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qt.background_vert,fragmentShader:qt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xt}},vertexShader:qt.backgroundCube_vert,fragmentShader:qt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qt.cube_vert,fragmentShader:qt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qt.equirect_vert,fragmentShader:qt.equirect_frag},distanceRGBA:{uniforms:Ne([pt.common,pt.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qt.distanceRGBA_vert,fragmentShader:qt.distanceRGBA_frag},shadow:{uniforms:Ne([pt.lights,pt.fog,{color:{value:new $t(0)},opacity:{value:1}}]),vertexShader:qt.shadow_vert,fragmentShader:qt.shadow_frag}};hn.physical={uniforms:Ne([hn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xt},clearcoatNormalScale:{value:new it(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xt},sheen:{value:0},sheenColor:{value:new $t(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xt},transmissionSamplerSize:{value:new it},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xt},attenuationDistance:{value:0},attenuationColor:{value:new $t(0)},specularColor:{value:new $t(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xt},anisotropyVector:{value:new it},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xt}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag};const rr={r:0,b:0,g:0},Jn=new on,Gm=new re;function Vm(i,t,e,n,s,r,a){const o=new $t(0);let l=r===!0?0:1,c,h,u=null,f=0,d=null;function g(S){let x=S.isScene===!0?S.background:null;return x&&x.isTexture&&(x=(S.backgroundBlurriness>0?e:t).get(x)),x}function v(S){let x=!1;const R=g(S);R===null?p(o,l):R&&R.isColor&&(p(R,1),x=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,a):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(S,x){const R=g(x);R&&(R.isCubeTexture||R.mapping===br)?(h===void 0&&(h=new Ot(new Pn(1,1,1),new Wn({name:"BackgroundCubeMaterial",uniforms:Hi(hn.backgroundCube.uniforms),vertexShader:hn.backgroundCube.vertexShader,fragmentShader:hn.backgroundCube.fragmentShader,side:Oe,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(w,P,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Jn.copy(x.backgroundRotation),Jn.x*=-1,Jn.y*=-1,Jn.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(Jn.y*=-1,Jn.z*=-1),h.material.uniforms.envMap.value=R,h.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Gm.makeRotationFromEuler(Jn)),h.material.toneMapped=ee.getTransfer(R.colorSpace)!==oe,(u!==R||f!==R.version||d!==i.toneMapping)&&(h.material.needsUpdate=!0,u=R,f=R.version,d=i.toneMapping),h.layers.enableAll(),S.unshift(h,h.geometry,h.material,0,0,null)):R&&R.isTexture&&(c===void 0&&(c=new Ot(new Je(2,2),new Wn({name:"BackgroundMaterial",uniforms:Hi(hn.background.uniforms),vertexShader:hn.background.vertexShader,fragmentShader:hn.background.fragmentShader,side:Vn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=R,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=ee.getTransfer(R.colorSpace)!==oe,R.matrixAutoUpdate===!0&&R.updateMatrix(),c.material.uniforms.uvTransform.value.copy(R.matrix),(u!==R||f!==R.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,u=R,f=R.version,d=i.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function p(S,x){S.getRGB(rr,Oc(i)),n.buffers.color.setClear(rr.r,rr.g,rr.b,x,a)}function E(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(S,x=1){o.set(S),l=x,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,p(o,l)},render:v,addToRenderList:m,dispose:E}}function Wm(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,a=!1;function o(M,L,O,k,q){let G=!1;const X=u(k,O,L);r!==X&&(r=X,c(r.object)),G=d(M,k,O,q),G&&g(M,k,O,q),q!==null&&t.update(q,i.ELEMENT_ARRAY_BUFFER),(G||a)&&(a=!1,x(M,L,O,k),q!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(q).buffer))}function l(){return i.createVertexArray()}function c(M){return i.bindVertexArray(M)}function h(M){return i.deleteVertexArray(M)}function u(M,L,O){const k=O.wireframe===!0;let q=n[M.id];q===void 0&&(q={},n[M.id]=q);let G=q[L.id];G===void 0&&(G={},q[L.id]=G);let X=G[k];return X===void 0&&(X=f(l()),G[k]=X),X}function f(M){const L=[],O=[],k=[];for(let q=0;q<e;q++)L[q]=0,O[q]=0,k[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:O,attributeDivisors:k,object:M,attributes:{},index:null}}function d(M,L,O,k){const q=r.attributes,G=L.attributes;let X=0;const J=O.getAttributes();for(const V in J)if(J[V].location>=0){const _t=q[V];let St=G[V];if(St===void 0&&(V==="instanceMatrix"&&M.instanceMatrix&&(St=M.instanceMatrix),V==="instanceColor"&&M.instanceColor&&(St=M.instanceColor)),_t===void 0||_t.attribute!==St||St&&_t.data!==St.data)return!0;X++}return r.attributesNum!==X||r.index!==k}function g(M,L,O,k){const q={},G=L.attributes;let X=0;const J=O.getAttributes();for(const V in J)if(J[V].location>=0){let _t=G[V];_t===void 0&&(V==="instanceMatrix"&&M.instanceMatrix&&(_t=M.instanceMatrix),V==="instanceColor"&&M.instanceColor&&(_t=M.instanceColor));const St={};St.attribute=_t,_t&&_t.data&&(St.data=_t.data),q[V]=St,X++}r.attributes=q,r.attributesNum=X,r.index=k}function v(){const M=r.newAttributes;for(let L=0,O=M.length;L<O;L++)M[L]=0}function m(M){p(M,0)}function p(M,L){const O=r.newAttributes,k=r.enabledAttributes,q=r.attributeDivisors;O[M]=1,k[M]===0&&(i.enableVertexAttribArray(M),k[M]=1),q[M]!==L&&(i.vertexAttribDivisor(M,L),q[M]=L)}function E(){const M=r.newAttributes,L=r.enabledAttributes;for(let O=0,k=L.length;O<k;O++)L[O]!==M[O]&&(i.disableVertexAttribArray(O),L[O]=0)}function S(M,L,O,k,q,G,X){X===!0?i.vertexAttribIPointer(M,L,O,q,G):i.vertexAttribPointer(M,L,O,k,q,G)}function x(M,L,O,k){v();const q=k.attributes,G=O.getAttributes(),X=L.defaultAttributeValues;for(const J in G){const V=G[J];if(V.location>=0){let dt=q[J];if(dt===void 0&&(J==="instanceMatrix"&&M.instanceMatrix&&(dt=M.instanceMatrix),J==="instanceColor"&&M.instanceColor&&(dt=M.instanceColor)),dt!==void 0){const _t=dt.normalized,St=dt.itemSize,Vt=t.get(dt);if(Vt===void 0)continue;const Zt=Vt.buffer,ie=Vt.type,Jt=Vt.bytesPerElement,Y=ie===i.INT||ie===i.UNSIGNED_INT||dt.gpuType===go;if(dt.isInterleavedBufferAttribute){const et=dt.data,Mt=et.stride,Dt=dt.offset;if(et.isInstancedInterleavedBuffer){for(let At=0;At<V.locationSize;At++)p(V.location+At,et.meshPerAttribute);M.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let At=0;At<V.locationSize;At++)m(V.location+At);i.bindBuffer(i.ARRAY_BUFFER,Zt);for(let At=0;At<V.locationSize;At++)S(V.location+At,St/V.locationSize,ie,_t,Mt*Jt,(Dt+St/V.locationSize*At)*Jt,Y)}else{if(dt.isInstancedBufferAttribute){for(let et=0;et<V.locationSize;et++)p(V.location+et,dt.meshPerAttribute);M.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=dt.meshPerAttribute*dt.count)}else for(let et=0;et<V.locationSize;et++)m(V.location+et);i.bindBuffer(i.ARRAY_BUFFER,Zt);for(let et=0;et<V.locationSize;et++)S(V.location+et,St/V.locationSize,ie,_t,St*Jt,St/V.locationSize*et*Jt,Y)}}else if(X!==void 0){const _t=X[J];if(_t!==void 0)switch(_t.length){case 2:i.vertexAttrib2fv(V.location,_t);break;case 3:i.vertexAttrib3fv(V.location,_t);break;case 4:i.vertexAttrib4fv(V.location,_t);break;default:i.vertexAttrib1fv(V.location,_t)}}}}E()}function R(){I();for(const M in n){const L=n[M];for(const O in L){const k=L[O];for(const q in k)h(k[q].object),delete k[q];delete L[O]}delete n[M]}}function w(M){if(n[M.id]===void 0)return;const L=n[M.id];for(const O in L){const k=L[O];for(const q in k)h(k[q].object),delete k[q];delete L[O]}delete n[M.id]}function P(M){for(const L in n){const O=n[L];if(O[M.id]===void 0)continue;const k=O[M.id];for(const q in k)h(k[q].object),delete k[q];delete O[M.id]}}function I(){b(),a=!0,r!==s&&(r=s,c(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:I,resetDefaultState:b,dispose:R,releaseStatesOfGeometry:w,releaseStatesOfProgram:P,initAttributes:v,enableAttribute:m,disableUnusedAttributes:E}}function Xm(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function a(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function o(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let d=0;for(let g=0;g<u;g++)d+=h[g];e.update(d,n,1)}function l(c,h,u,f){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<c.length;g++)a(c[g],h[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,h,0,f,0,u);let g=0;for(let v=0;v<u;v++)g+=h[v]*f[v];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function qm(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const P=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(P){return!(P!==an&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const I=P===Ts&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(P!==vn&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==fn&&!I)}function l(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,w=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:E,maxVaryings:S,maxFragmentUniforms:x,vertexTextures:R,maxSamples:w}}function Ym(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new Bn,o=new Xt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){const g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{const E=r?0:n,S=E*4;let x=p.clippingState||null;l.value=x,x=h(g,f,S,d);for(let R=0;R!==S;++R)x[R]=e[R];p.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,g){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const p=d+v*4,E=f.matrixWorldInverse;o.getNormalMatrix(E),(m===null||m.length<p)&&(m=new Float32Array(p));for(let S=0,x=d;S!==v;++S,x+=4)a.copy(u[S]).applyMatrix4(E,o),a.normal.toArray(m,x),m[x+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function $m(i){let t=new WeakMap;function e(a,o){return o===wa?a.mapping=Bi:o===Aa&&(a.mapping=zi),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===wa||o===Aa)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new ld(l.height);return c.fromEquirectangularTexture(i,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const Di=4,kl=[.125,.215,.35,.446,.526,.582],ni=20,ha=new nh,Hl=new $t;let ua=null,da=0,fa=0,pa=!1;const ti=(1+Math.sqrt(5))/2,Pi=1/ti,Gl=[new C(-ti,Pi,0),new C(ti,Pi,0),new C(-Pi,0,ti),new C(Pi,0,ti),new C(0,ti,-Pi),new C(0,ti,Pi),new C(-1,1,-1),new C(1,1,-1),new C(-1,1,1),new C(1,1,1)],Km=new C;class lo{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){const{size:a=256,position:o=Km}=r;ua=this._renderer.getRenderTarget(),da=this._renderer.getActiveCubeFace(),fa=this._renderer.getActiveMipmapLevel(),pa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Wl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ua,da,fa),this._renderer.xr.enabled=pa,t.scissorTest=!1,ar(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Bi||t.mapping===zi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ua=this._renderer.getRenderTarget(),da=this._renderer.getActiveCubeFace(),fa=this._renderer.getActiveMipmapLevel(),pa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:dn,minFilter:dn,generateMipmaps:!1,type:Ts,format:an,colorSpace:ki,depthBuffer:!1},s=Vl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Vl(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=jm(r)),this._blurMaterial=Zm(r,t,e)}return s}_compileMaterial(t){const e=new Ot(this._lodPlanes[0],t);this._renderer.compile(e,ha)}_sceneToCubeUV(t,e,n,s,r){const l=new qe(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(Hl),u.toneMapping=Hn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const v=new Xe({name:"PMREM.Background",side:Oe,depthWrite:!1,depthTest:!1}),m=new Ot(new Pn,v);let p=!1;const E=t.background;E?E.isColor&&(v.color.copy(E),t.background=null,p=!0):(v.color.copy(Hl),p=!0);for(let S=0;S<6;S++){const x=S%3;x===0?(l.up.set(0,c[S],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[S],r.y,r.z)):x===1?(l.up.set(0,0,c[S]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[S],r.z)):(l.up.set(0,c[S],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[S]));const R=this._cubeSize;ar(s,x*R,S>2?R:0,R,R),u.setRenderTarget(s),p&&u.render(m,l),u.render(t,l)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=d,u.autoClear=f,t.background=E}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Bi||t.mapping===zi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Wl());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Ot(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;ar(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,ha)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Gl[(s-r-1)%Gl.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Ot(this._lodPlanes[s],c),f=c.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*ni-1),v=r/g,m=isFinite(r)?1+Math.floor(h*v):ni;m>ni&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ni}`);const p=[];let E=0;for(let P=0;P<ni;++P){const I=P/v,b=Math.exp(-I*I/2);p.push(b),P===0?E+=b:P<m&&(E+=2*b)}for(let P=0;P<p.length;P++)p[P]=p[P]/E;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:S}=this;f.dTheta.value=g,f.mipInt.value=S-n;const x=this._sizeLods[s],R=3*x*(s>S-Di?s-S+Di:0),w=4*(this._cubeSize-x);ar(e,R,w,3*x,2*x),l.setRenderTarget(e),l.render(u,ha)}}function jm(i){const t=[],e=[],n=[];let s=i;const r=i-Di+1+kl.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>i-Di?l=kl[a-i+Di-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,v=3,m=2,p=1,E=new Float32Array(v*g*d),S=new Float32Array(m*g*d),x=new Float32Array(p*g*d);for(let w=0;w<d;w++){const P=w%3*2/3-1,I=w>2?0:-1,b=[P,I,0,P+2/3,I,0,P+2/3,I+1,0,P,I,0,P+2/3,I+1,0,P,I+1,0];E.set(b,v*g*w),S.set(f,m*g*w);const M=[w,w,w,w,w,w];x.set(M,p*g*w)}const R=new Se;R.setAttribute("position",new Be(E,v)),R.setAttribute("uv",new Be(S,m)),R.setAttribute("faceIndex",new Be(x,p)),t.push(R),s>Di&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Vl(i,t,e){const n=new oi(i,t,e);return n.texture.mapping=br,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ar(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Zm(i,t,e){const n=new Float32Array(ni),s=new C(0,1,0);return new Wn({name:"SphericalGaussianBlur",defines:{n:ni,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Oo(),fragmentShader:`

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
		`,blending:kn,depthTest:!1,depthWrite:!1})}function Wl(){return new Wn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Oo(),fragmentShader:`

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
		`,blending:kn,depthTest:!1,depthWrite:!1})}function Xl(){return new Wn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Oo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:kn,depthTest:!1,depthWrite:!1})}function Oo(){return`

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
	`}function Jm(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===wa||l===Aa,h=l===Bi||l===zi;if(c||h){let u=t.get(o);const f=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return e===null&&(e=new lo(i)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const d=o.image;return c&&d&&d.height>0||h&&d&&s(d)?(e===null&&(e=new lo(i)),u=c?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function Qm(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Ms("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function tg(i,t,e,n){const s={},r=new WeakMap;function a(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);f.removeEventListener("dispose",a),delete s[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(u,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,e.memory.geometries++),f}function l(u){const f=u.attributes;for(const d in f)t.update(f[d],i.ARRAY_BUFFER)}function c(u){const f=[],d=u.index,g=u.attributes.position;let v=0;if(d!==null){const E=d.array;v=d.version;for(let S=0,x=E.length;S<x;S+=3){const R=E[S+0],w=E[S+1],P=E[S+2];f.push(R,w,w,P,P,R)}}else if(g!==void 0){const E=g.array;v=g.version;for(let S=0,x=E.length/3-1;S<x;S+=3){const R=S+0,w=S+1,P=S+2;f.push(R,w,w,P,P,R)}}else return;const m=new(Ic(f)?Fc:Nc)(f,1);m.version=v;const p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){const f=r.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function eg(i,t,e){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,d){i.drawElements(n,d,r,f*a),e.update(d,n,1)}function c(f,d,g){g!==0&&(i.drawElementsInstanced(n,d,r,f*a,g),e.update(d,n,g))}function h(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];e.update(m,n,1)}function u(f,d,g,v){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/a,d[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,v,0,g);let p=0;for(let E=0;E<g;E++)p+=d[E]*v[E];e.update(p,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function ng(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function ig(i,t,e){const n=new WeakMap,s=new ce;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(o);if(f===void 0||f.count!==u){let M=function(){I.dispose(),n.delete(o),o.removeEventListener("dispose",M)};var d=M;f!==void 0&&f.texture.dispose();const g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],E=o.morphAttributes.normal||[],S=o.morphAttributes.color||[];let x=0;g===!0&&(x=1),v===!0&&(x=2),m===!0&&(x=3);let R=o.attributes.position.count*x,w=1;R>t.maxTextureSize&&(w=Math.ceil(R/t.maxTextureSize),R=t.maxTextureSize);const P=new Float32Array(R*w*4*u),I=new Dc(P,R,w,u);I.type=fn,I.needsUpdate=!0;const b=x*4;for(let L=0;L<u;L++){const O=p[L],k=E[L],q=S[L],G=R*w*4*L;for(let X=0;X<O.count;X++){const J=X*b;g===!0&&(s.fromBufferAttribute(O,X),P[G+J+0]=s.x,P[G+J+1]=s.y,P[G+J+2]=s.z,P[G+J+3]=0),v===!0&&(s.fromBufferAttribute(k,X),P[G+J+4]=s.x,P[G+J+5]=s.y,P[G+J+6]=s.z,P[G+J+7]=0),m===!0&&(s.fromBufferAttribute(q,X),P[G+J+8]=s.x,P[G+J+9]=s.y,P[G+J+10]=s.z,P[G+J+11]=q.itemSize===4?s.w:1)}}f={count:u,texture:I,size:new it(R,w)},n.set(o,f),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const v=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",v),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function sg(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return u}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}const sh=new Pe,ql=new Wc(1,1),rh=new Dc,ah=new Xu,oh=new zc,Yl=[],$l=[],Kl=new Float32Array(16),jl=new Float32Array(9),Zl=new Float32Array(4);function Xi(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Yl[s];if(r===void 0&&(r=new Float32Array(s),Yl[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Ee(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Te(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Ar(i,t){let e=$l[t];e===void 0&&(e=new Int32Array(t),$l[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function rg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function ag(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;i.uniform2fv(this.addr,t),Te(e,t)}}function og(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ee(e,t))return;i.uniform3fv(this.addr,t),Te(e,t)}}function lg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;i.uniform4fv(this.addr,t),Te(e,t)}}function cg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Te(e,t)}else{if(Ee(e,n))return;Zl.set(n),i.uniformMatrix2fv(this.addr,!1,Zl),Te(e,n)}}function hg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Te(e,t)}else{if(Ee(e,n))return;jl.set(n),i.uniformMatrix3fv(this.addr,!1,jl),Te(e,n)}}function ug(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Te(e,t)}else{if(Ee(e,n))return;Kl.set(n),i.uniformMatrix4fv(this.addr,!1,Kl),Te(e,n)}}function dg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function fg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;i.uniform2iv(this.addr,t),Te(e,t)}}function pg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;i.uniform3iv(this.addr,t),Te(e,t)}}function mg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;i.uniform4iv(this.addr,t),Te(e,t)}}function gg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function vg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;i.uniform2uiv(this.addr,t),Te(e,t)}}function _g(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;i.uniform3uiv(this.addr,t),Te(e,t)}}function xg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;i.uniform4uiv(this.addr,t),Te(e,t)}}function yg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(ql.compareFunction=Lc,r=ql):r=sh,e.setTexture2D(t||r,s)}function Mg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||ah,s)}function Sg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||oh,s)}function bg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||rh,s)}function Eg(i){switch(i){case 5126:return rg;case 35664:return ag;case 35665:return og;case 35666:return lg;case 35674:return cg;case 35675:return hg;case 35676:return ug;case 5124:case 35670:return dg;case 35667:case 35671:return fg;case 35668:case 35672:return pg;case 35669:case 35673:return mg;case 5125:return gg;case 36294:return vg;case 36295:return _g;case 36296:return xg;case 35678:case 36198:case 36298:case 36306:case 35682:return yg;case 35679:case 36299:case 36307:return Mg;case 35680:case 36300:case 36308:case 36293:return Sg;case 36289:case 36303:case 36311:case 36292:return bg}}function Tg(i,t){i.uniform1fv(this.addr,t)}function wg(i,t){const e=Xi(t,this.size,2);i.uniform2fv(this.addr,e)}function Ag(i,t){const e=Xi(t,this.size,3);i.uniform3fv(this.addr,e)}function Rg(i,t){const e=Xi(t,this.size,4);i.uniform4fv(this.addr,e)}function Cg(i,t){const e=Xi(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Pg(i,t){const e=Xi(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Lg(i,t){const e=Xi(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Ig(i,t){i.uniform1iv(this.addr,t)}function Dg(i,t){i.uniform2iv(this.addr,t)}function Ug(i,t){i.uniform3iv(this.addr,t)}function Ng(i,t){i.uniform4iv(this.addr,t)}function Fg(i,t){i.uniform1uiv(this.addr,t)}function Og(i,t){i.uniform2uiv(this.addr,t)}function Bg(i,t){i.uniform3uiv(this.addr,t)}function zg(i,t){i.uniform4uiv(this.addr,t)}function kg(i,t,e){const n=this.cache,s=t.length,r=Ar(e,s);Ee(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||sh,r[a])}function Hg(i,t,e){const n=this.cache,s=t.length,r=Ar(e,s);Ee(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||ah,r[a])}function Gg(i,t,e){const n=this.cache,s=t.length,r=Ar(e,s);Ee(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||oh,r[a])}function Vg(i,t,e){const n=this.cache,s=t.length,r=Ar(e,s);Ee(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||rh,r[a])}function Wg(i){switch(i){case 5126:return Tg;case 35664:return wg;case 35665:return Ag;case 35666:return Rg;case 35674:return Cg;case 35675:return Pg;case 35676:return Lg;case 5124:case 35670:return Ig;case 35667:case 35671:return Dg;case 35668:case 35672:return Ug;case 35669:case 35673:return Ng;case 5125:return Fg;case 36294:return Og;case 36295:return Bg;case 36296:return zg;case 35678:case 36198:case 36298:case 36306:case 35682:return kg;case 35679:case 36299:case 36307:return Hg;case 35680:case 36300:case 36308:case 36293:return Gg;case 36289:case 36303:case 36311:case 36292:return Vg}}class Xg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Eg(e.type)}}class qg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Wg(e.type)}}class Yg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const ma=/(\w+)(\])?(\[|\.)?/g;function Jl(i,t){i.seq.push(t),i.map[t.id]=t}function $g(i,t,e){const n=i.name,s=n.length;for(ma.lastIndex=0;;){const r=ma.exec(n),a=ma.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Jl(e,c===void 0?new Xg(o,i,t):new qg(o,i,t));break}else{let u=e.map[o];u===void 0&&(u=new Yg(o),Jl(e,u)),e=u}}}class mr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);$g(r,a,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function Ql(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Kg=37297;let jg=0;function Zg(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const tc=new Xt;function Jg(i){ee._getMatrix(tc,ee.workingColorSpace,i);const t=`mat3( ${tc.elements.map(e=>e.toFixed(4))} )`;switch(ee.getTransfer(i)){case vr:return[t,"LinearTransferOETF"];case oe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function ec(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+Zg(i.getShaderSource(t),o)}else return r}function Qg(i,t){const e=Jg(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function t0(i,t){let e;switch(t){case ru:e="Linear";break;case au:e="Reinhard";break;case ou:e="Cineon";break;case Sc:e="ACESFilmic";break;case cu:e="AgX";break;case hu:e="Neutral";break;case lu:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const or=new C;function e0(){ee.getLuminanceCoefficients(or);const i=or.x.toFixed(4),t=or.y.toFixed(4),e=or.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function n0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(cs).join(`
`)}function i0(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function s0(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function cs(i){return i!==""}function nc(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ic(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const r0=/^[ \t]*#include +<([\w\d./]+)>/gm;function co(i){return i.replace(r0,o0)}const a0=new Map;function o0(i,t){let e=qt[t];if(e===void 0){const n=a0.get(t);if(n!==void 0)e=qt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return co(e)}const l0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function sc(i){return i.replace(l0,c0)}function c0(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function rc(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function h0(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===yc?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Mc?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Tn&&(t="SHADOWMAP_TYPE_VSM"),t}function u0(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Bi:case zi:t="ENVMAP_TYPE_CUBE";break;case br:t="ENVMAP_TYPE_CUBE_UV";break}return t}function d0(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case zi:t="ENVMAP_MODE_REFRACTION";break}return t}function f0(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case mo:t="ENVMAP_BLENDING_MULTIPLY";break;case iu:t="ENVMAP_BLENDING_MIX";break;case su:t="ENVMAP_BLENDING_ADD";break}return t}function p0(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function m0(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=h0(e),c=u0(e),h=d0(e),u=f0(e),f=p0(e),d=n0(e),g=i0(r),v=s.createProgram();let m,p,E=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(cs).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(cs).join(`
`),p.length>0&&(p+=`
`)):(m=[rc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(cs).join(`
`),p=[rc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Hn?"#define TONE_MAPPING":"",e.toneMapping!==Hn?qt.tonemapping_pars_fragment:"",e.toneMapping!==Hn?t0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",qt.colorspace_pars_fragment,Qg("linearToOutputTexel",e.outputColorSpace),e0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(cs).join(`
`)),a=co(a),a=nc(a,e),a=ic(a,e),o=co(o),o=nc(o,e),o=ic(o,e),a=sc(a),o=sc(o),e.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===tl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===tl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const S=E+m+a,x=E+p+o,R=Ql(s,s.VERTEX_SHADER,S),w=Ql(s,s.FRAGMENT_SHADER,x);s.attachShader(v,R),s.attachShader(v,w),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function P(L){if(i.debug.checkShaderErrors){const O=s.getProgramInfoLog(v)||"",k=s.getShaderInfoLog(R)||"",q=s.getShaderInfoLog(w)||"",G=O.trim(),X=k.trim(),J=q.trim();let V=!0,dt=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(V=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,R,w);else{const _t=ec(s,R,"vertex"),St=ec(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+G+`
`+_t+`
`+St)}else G!==""?console.warn("THREE.WebGLProgram: Program Info Log:",G):(X===""||J==="")&&(dt=!1);dt&&(L.diagnostics={runnable:V,programLog:G,vertexShader:{log:X,prefix:m},fragmentShader:{log:J,prefix:p}})}s.deleteShader(R),s.deleteShader(w),I=new mr(s,v),b=s0(s,v)}let I;this.getUniforms=function(){return I===void 0&&P(this),I};let b;this.getAttributes=function(){return b===void 0&&P(this),b};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(v,Kg)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=jg++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=R,this.fragmentShader=w,this}let g0=0;class v0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new _0(t),e.set(t,n)),n}}class _0{constructor(t){this.id=g0++,this.code=t,this.usedTimes=0}}function x0(i,t,e,n,s,r,a){const o=new Ao,l=new v0,c=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures;let d=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(b){return c.add(b),b===0?"uv":`uv${b}`}function m(b,M,L,O,k){const q=O.fog,G=k.geometry,X=b.isMeshStandardMaterial?O.environment:null,J=(b.isMeshStandardMaterial?e:t).get(b.envMap||X),V=J&&J.mapping===br?J.image.height:null,dt=g[b.type];b.precision!==null&&(d=s.getMaxPrecision(b.precision),d!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",d,"instead."));const _t=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,St=_t!==void 0?_t.length:0;let Vt=0;G.morphAttributes.position!==void 0&&(Vt=1),G.morphAttributes.normal!==void 0&&(Vt=2),G.morphAttributes.color!==void 0&&(Vt=3);let Zt,ie,Jt,Y;if(dt){const ne=hn[dt];Zt=ne.vertexShader,ie=ne.fragmentShader}else Zt=b.vertexShader,ie=b.fragmentShader,l.update(b),Jt=l.getVertexShaderID(b),Y=l.getFragmentShaderID(b);const et=i.getRenderTarget(),Mt=i.state.buffers.depth.getReversed(),Dt=k.isInstancedMesh===!0,At=k.isBatchedMesh===!0,Kt=!!b.map,de=!!b.matcap,A=!!J,tt=!!b.aoMap,j=!!b.lightMap,K=!!b.bumpMap,$=!!b.normalMap,ht=!!b.displacementMap,nt=!!b.emissiveMap,ut=!!b.metalnessMap,Ht=!!b.roughnessMap,kt=b.anisotropy>0,T=b.clearcoat>0,_=b.dispersion>0,F=b.iridescence>0,H=b.sheen>0,Q=b.transmission>0,W=kt&&!!b.anisotropyMap,Lt=T&&!!b.clearcoatMap,ct=T&&!!b.clearcoatNormalMap,Rt=T&&!!b.clearcoatRoughnessMap,Ct=F&&!!b.iridescenceMap,st=F&&!!b.iridescenceThicknessMap,vt=H&&!!b.sheenColorMap,Bt=H&&!!b.sheenRoughnessMap,It=!!b.specularMap,mt=!!b.specularColorMap,Wt=!!b.specularIntensityMap,D=Q&&!!b.transmissionMap,ot=Q&&!!b.thicknessMap,ft=!!b.gradientMap,bt=!!b.alphaMap,rt=b.alphaTest>0,Z=!!b.alphaHash,Pt=!!b.extensions;let Gt=Hn;b.toneMapped&&(et===null||et.isXRRenderTarget===!0)&&(Gt=i.toneMapping);const fe={shaderID:dt,shaderType:b.type,shaderName:b.name,vertexShader:Zt,fragmentShader:ie,defines:b.defines,customVertexShaderID:Jt,customFragmentShaderID:Y,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:d,batching:At,batchingColor:At&&k._colorsTexture!==null,instancing:Dt,instancingColor:Dt&&k.instanceColor!==null,instancingMorph:Dt&&k.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:et===null?i.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:ki,alphaToCoverage:!!b.alphaToCoverage,map:Kt,matcap:de,envMap:A,envMapMode:A&&J.mapping,envMapCubeUVHeight:V,aoMap:tt,lightMap:j,bumpMap:K,normalMap:$,displacementMap:f&&ht,emissiveMap:nt,normalMapObjectSpace:$&&b.normalMapType===pu,normalMapTangentSpace:$&&b.normalMapType===bo,metalnessMap:ut,roughnessMap:Ht,anisotropy:kt,anisotropyMap:W,clearcoat:T,clearcoatMap:Lt,clearcoatNormalMap:ct,clearcoatRoughnessMap:Rt,dispersion:_,iridescence:F,iridescenceMap:Ct,iridescenceThicknessMap:st,sheen:H,sheenColorMap:vt,sheenRoughnessMap:Bt,specularMap:It,specularColorMap:mt,specularIntensityMap:Wt,transmission:Q,transmissionMap:D,thicknessMap:ot,gradientMap:ft,opaque:b.transparent===!1&&b.blending===Ni&&b.alphaToCoverage===!1,alphaMap:bt,alphaTest:rt,alphaHash:Z,combine:b.combine,mapUv:Kt&&v(b.map.channel),aoMapUv:tt&&v(b.aoMap.channel),lightMapUv:j&&v(b.lightMap.channel),bumpMapUv:K&&v(b.bumpMap.channel),normalMapUv:$&&v(b.normalMap.channel),displacementMapUv:ht&&v(b.displacementMap.channel),emissiveMapUv:nt&&v(b.emissiveMap.channel),metalnessMapUv:ut&&v(b.metalnessMap.channel),roughnessMapUv:Ht&&v(b.roughnessMap.channel),anisotropyMapUv:W&&v(b.anisotropyMap.channel),clearcoatMapUv:Lt&&v(b.clearcoatMap.channel),clearcoatNormalMapUv:ct&&v(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Rt&&v(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Ct&&v(b.iridescenceMap.channel),iridescenceThicknessMapUv:st&&v(b.iridescenceThicknessMap.channel),sheenColorMapUv:vt&&v(b.sheenColorMap.channel),sheenRoughnessMapUv:Bt&&v(b.sheenRoughnessMap.channel),specularMapUv:It&&v(b.specularMap.channel),specularColorMapUv:mt&&v(b.specularColorMap.channel),specularIntensityMapUv:Wt&&v(b.specularIntensityMap.channel),transmissionMapUv:D&&v(b.transmissionMap.channel),thicknessMapUv:ot&&v(b.thicknessMap.channel),alphaMapUv:bt&&v(b.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&($||kt),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!G.attributes.uv&&(Kt||bt),fog:!!q,useFog:b.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Mt,skinning:k.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:St,morphTextureStride:Vt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:Gt,decodeVideoTexture:Kt&&b.map.isVideoTexture===!0&&ee.getTransfer(b.map.colorSpace)===oe,decodeVideoTextureEmissive:nt&&b.emissiveMap.isVideoTexture===!0&&ee.getTransfer(b.emissiveMap.colorSpace)===oe,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===un,flipSided:b.side===Oe,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Pt&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Pt&&b.extensions.multiDraw===!0||At)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return fe.vertexUv1s=c.has(1),fe.vertexUv2s=c.has(2),fe.vertexUv3s=c.has(3),c.clear(),fe}function p(b){const M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(const L in b.defines)M.push(L),M.push(b.defines[L]);return b.isRawShaderMaterial===!1&&(E(M,b),S(M,b),M.push(i.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function E(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function S(b,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),M.gradientMap&&o.enable(22),b.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reversedDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),b.push(o.mask)}function x(b){const M=g[b.type];let L;if(M){const O=hn[M];L=sd.clone(O.uniforms)}else L=b.uniforms;return L}function R(b,M){let L;for(let O=0,k=h.length;O<k;O++){const q=h[O];if(q.cacheKey===M){L=q,++L.usedTimes;break}}return L===void 0&&(L=new m0(i,M,b,r),h.push(L)),L}function w(b){if(--b.usedTimes===0){const M=h.indexOf(b);h[M]=h[h.length-1],h.pop(),b.destroy()}}function P(b){l.remove(b)}function I(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:R,releaseProgram:w,releaseShaderCache:P,programs:h,dispose:I}}function y0(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function M0(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function ac(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function oc(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(u,f,d,g,v,m){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:g,renderOrder:u.renderOrder,z:v,group:m},i[t]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=v,p.group=m),t++,p}function o(u,f,d,g,v,m){const p=a(u,f,d,g,v,m);d.transmission>0?n.push(p):d.transparent===!0?s.push(p):e.push(p)}function l(u,f,d,g,v,m){const p=a(u,f,d,g,v,m);d.transmission>0?n.unshift(p):d.transparent===!0?s.unshift(p):e.unshift(p)}function c(u,f){e.length>1&&e.sort(u||M0),n.length>1&&n.sort(f||ac),s.length>1&&s.sort(f||ac)}function h(){for(let u=t,f=i.length;u<f;u++){const d=i[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function S0(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new oc,i.set(n,[a])):s>=r.length?(a=new oc,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function b0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new C,color:new $t};break;case"SpotLight":e={position:new C,direction:new C,color:new $t,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new C,color:new $t,distance:0,decay:0};break;case"HemisphereLight":e={direction:new C,skyColor:new $t,groundColor:new $t};break;case"RectAreaLight":e={color:new $t,position:new C,halfWidth:new C,halfHeight:new C};break}return i[t.id]=e,e}}}function E0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let T0=0;function w0(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function A0(i){const t=new b0,e=E0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new C);const s=new C,r=new re,a=new re;function o(c){let h=0,u=0,f=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let d=0,g=0,v=0,m=0,p=0,E=0,S=0,x=0,R=0,w=0,P=0;c.sort(w0);for(let b=0,M=c.length;b<M;b++){const L=c[b],O=L.color,k=L.intensity,q=L.distance,G=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)h+=O.r*k,u+=O.g*k,f+=O.b*k;else if(L.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(L.sh.coefficients[X],k);P++}else if(L.isDirectionalLight){const X=t.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const J=L.shadow,V=e.get(L);V.shadowIntensity=J.intensity,V.shadowBias=J.bias,V.shadowNormalBias=J.normalBias,V.shadowRadius=J.radius,V.shadowMapSize=J.mapSize,n.directionalShadow[d]=V,n.directionalShadowMap[d]=G,n.directionalShadowMatrix[d]=L.shadow.matrix,E++}n.directional[d]=X,d++}else if(L.isSpotLight){const X=t.get(L);X.position.setFromMatrixPosition(L.matrixWorld),X.color.copy(O).multiplyScalar(k),X.distance=q,X.coneCos=Math.cos(L.angle),X.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),X.decay=L.decay,n.spot[v]=X;const J=L.shadow;if(L.map&&(n.spotLightMap[R]=L.map,R++,J.updateMatrices(L),L.castShadow&&w++),n.spotLightMatrix[v]=J.matrix,L.castShadow){const V=e.get(L);V.shadowIntensity=J.intensity,V.shadowBias=J.bias,V.shadowNormalBias=J.normalBias,V.shadowRadius=J.radius,V.shadowMapSize=J.mapSize,n.spotShadow[v]=V,n.spotShadowMap[v]=G,x++}v++}else if(L.isRectAreaLight){const X=t.get(L);X.color.copy(O).multiplyScalar(k),X.halfWidth.set(L.width*.5,0,0),X.halfHeight.set(0,L.height*.5,0),n.rectArea[m]=X,m++}else if(L.isPointLight){const X=t.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),X.distance=L.distance,X.decay=L.decay,L.castShadow){const J=L.shadow,V=e.get(L);V.shadowIntensity=J.intensity,V.shadowBias=J.bias,V.shadowNormalBias=J.normalBias,V.shadowRadius=J.radius,V.shadowMapSize=J.mapSize,V.shadowCameraNear=J.camera.near,V.shadowCameraFar=J.camera.far,n.pointShadow[g]=V,n.pointShadowMap[g]=G,n.pointShadowMatrix[g]=L.shadow.matrix,S++}n.point[g]=X,g++}else if(L.isHemisphereLight){const X=t.get(L);X.skyColor.copy(L.color).multiplyScalar(k),X.groundColor.copy(L.groundColor).multiplyScalar(k),n.hemi[p]=X,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=pt.LTC_FLOAT_1,n.rectAreaLTC2=pt.LTC_FLOAT_2):(n.rectAreaLTC1=pt.LTC_HALF_1,n.rectAreaLTC2=pt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const I=n.hash;(I.directionalLength!==d||I.pointLength!==g||I.spotLength!==v||I.rectAreaLength!==m||I.hemiLength!==p||I.numDirectionalShadows!==E||I.numPointShadows!==S||I.numSpotShadows!==x||I.numSpotMaps!==R||I.numLightProbes!==P)&&(n.directional.length=d,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=x+R-w,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=P,I.directionalLength=d,I.pointLength=g,I.spotLength=v,I.rectAreaLength=m,I.hemiLength=p,I.numDirectionalShadows=E,I.numPointShadows=S,I.numSpotShadows=x,I.numSpotMaps=R,I.numLightProbes=P,n.version=T0++)}function l(c,h){let u=0,f=0,d=0,g=0,v=0;const m=h.matrixWorldInverse;for(let p=0,E=c.length;p<E;p++){const S=c[p];if(S.isDirectionalLight){const x=n.directional[u];x.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),u++}else if(S.isSpotLight){const x=n.spot[d];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),d++}else if(S.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(m),a.identity(),r.copy(S.matrixWorld),r.premultiply(m),a.extractRotation(r),x.halfWidth.set(S.width*.5,0,0),x.halfHeight.set(0,S.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),g++}else if(S.isPointLight){const x=n.point[f];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(m),f++}else if(S.isHemisphereLight){const x=n.hemi[v];x.direction.setFromMatrixPosition(S.matrixWorld),x.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:n}}function lc(i){const t=new A0(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function R0(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new lc(i),t.set(s,[o])):r>=a.length?(o=new lc(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const C0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,P0=`uniform sampler2D shadow_pass;
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
}`;function L0(i,t,e){let n=new Co;const s=new it,r=new it,a=new ce,o=new Jd({depthPacking:fu}),l=new Qd,c={},h=e.maxTextureSize,u={[Vn]:Oe,[Oe]:Vn,[un]:un},f=new Wn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new it},radius:{value:4}},vertexShader:C0,fragmentShader:P0}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new Se;g.setAttribute("position",new Be(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Ot(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=yc;let p=this.type;this.render=function(w,P,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const b=i.getRenderTarget(),M=i.getActiveCubeFace(),L=i.getActiveMipmapLevel(),O=i.state;O.setBlending(kn),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const k=p!==Tn&&this.type===Tn,q=p===Tn&&this.type!==Tn;for(let G=0,X=w.length;G<X;G++){const J=w[G],V=J.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);const dt=V.getFrameExtents();if(s.multiply(dt),r.copy(V.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/dt.x),s.x=r.x*dt.x,V.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/dt.y),s.y=r.y*dt.y,V.mapSize.y=r.y)),V.map===null||k===!0||q===!0){const St=this.type!==Tn?{minFilter:Ye,magFilter:Ye}:{};V.map!==null&&V.map.dispose(),V.map=new oi(s.x,s.y,St),V.map.texture.name=J.name+".shadowMap",V.camera.updateProjectionMatrix()}i.setRenderTarget(V.map),i.clear();const _t=V.getViewportCount();for(let St=0;St<_t;St++){const Vt=V.getViewport(St);a.set(r.x*Vt.x,r.y*Vt.y,r.x*Vt.z,r.y*Vt.w),O.viewport(a),V.updateMatrices(J,St),n=V.getFrustum(),x(P,I,V.camera,J,this.type)}V.isPointLightShadow!==!0&&this.type===Tn&&E(V,I),V.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(b,M,L)};function E(w,P){const I=t.update(v);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new oi(s.x,s.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(P,null,I,f,v,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(P,null,I,d,v,null)}function S(w,P,I,b){let M=null;const L=I.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(L!==void 0)M=L;else if(M=I.isPointLight===!0?l:o,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const O=M.uuid,k=P.uuid;let q=c[O];q===void 0&&(q={},c[O]=q);let G=q[k];G===void 0&&(G=M.clone(),q[k]=G,P.addEventListener("dispose",R)),M=G}if(M.visible=P.visible,M.wireframe=P.wireframe,b===Tn?M.side=P.shadowSide!==null?P.shadowSide:P.side:M.side=P.shadowSide!==null?P.shadowSide:u[P.side],M.alphaMap=P.alphaMap,M.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,M.map=P.map,M.clipShadows=P.clipShadows,M.clippingPlanes=P.clippingPlanes,M.clipIntersection=P.clipIntersection,M.displacementMap=P.displacementMap,M.displacementScale=P.displacementScale,M.displacementBias=P.displacementBias,M.wireframeLinewidth=P.wireframeLinewidth,M.linewidth=P.linewidth,I.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const O=i.properties.get(M);O.light=I}return M}function x(w,P,I,b,M){if(w.visible===!1)return;if(w.layers.test(P.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&M===Tn)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,w.matrixWorld);const k=t.update(w),q=w.material;if(Array.isArray(q)){const G=k.groups;for(let X=0,J=G.length;X<J;X++){const V=G[X],dt=q[V.materialIndex];if(dt&&dt.visible){const _t=S(w,dt,b,M);w.onBeforeShadow(i,w,P,I,k,_t,V),i.renderBufferDirect(I,null,k,_t,w,V),w.onAfterShadow(i,w,P,I,k,_t,V)}}}else if(q.visible){const G=S(w,q,b,M);w.onBeforeShadow(i,w,P,I,k,G,null),i.renderBufferDirect(I,null,k,G,w,null),w.onAfterShadow(i,w,P,I,k,G,null)}}const O=w.children;for(let k=0,q=O.length;k<q;k++)x(O[k],P,I,b,M)}function R(w){w.target.removeEventListener("dispose",R);for(const I in c){const b=c[I],M=w.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}const I0={[xa]:ya,[Ma]:Ea,[Sa]:Ta,[Oi]:ba,[ya]:xa,[Ea]:Ma,[Ta]:Sa,[ba]:Oi};function D0(i,t){function e(){let D=!1;const ot=new ce;let ft=null;const bt=new ce(0,0,0,0);return{setMask:function(rt){ft!==rt&&!D&&(i.colorMask(rt,rt,rt,rt),ft=rt)},setLocked:function(rt){D=rt},setClear:function(rt,Z,Pt,Gt,fe){fe===!0&&(rt*=Gt,Z*=Gt,Pt*=Gt),ot.set(rt,Z,Pt,Gt),bt.equals(ot)===!1&&(i.clearColor(rt,Z,Pt,Gt),bt.copy(ot))},reset:function(){D=!1,ft=null,bt.set(-1,0,0,0)}}}function n(){let D=!1,ot=!1,ft=null,bt=null,rt=null;return{setReversed:function(Z){if(ot!==Z){const Pt=t.get("EXT_clip_control");Z?Pt.clipControlEXT(Pt.LOWER_LEFT_EXT,Pt.ZERO_TO_ONE_EXT):Pt.clipControlEXT(Pt.LOWER_LEFT_EXT,Pt.NEGATIVE_ONE_TO_ONE_EXT),ot=Z;const Gt=rt;rt=null,this.setClear(Gt)}},getReversed:function(){return ot},setTest:function(Z){Z?et(i.DEPTH_TEST):Mt(i.DEPTH_TEST)},setMask:function(Z){ft!==Z&&!D&&(i.depthMask(Z),ft=Z)},setFunc:function(Z){if(ot&&(Z=I0[Z]),bt!==Z){switch(Z){case xa:i.depthFunc(i.NEVER);break;case ya:i.depthFunc(i.ALWAYS);break;case Ma:i.depthFunc(i.LESS);break;case Oi:i.depthFunc(i.LEQUAL);break;case Sa:i.depthFunc(i.EQUAL);break;case ba:i.depthFunc(i.GEQUAL);break;case Ea:i.depthFunc(i.GREATER);break;case Ta:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}bt=Z}},setLocked:function(Z){D=Z},setClear:function(Z){rt!==Z&&(ot&&(Z=1-Z),i.clearDepth(Z),rt=Z)},reset:function(){D=!1,ft=null,bt=null,rt=null,ot=!1}}}function s(){let D=!1,ot=null,ft=null,bt=null,rt=null,Z=null,Pt=null,Gt=null,fe=null;return{setTest:function(ne){D||(ne?et(i.STENCIL_TEST):Mt(i.STENCIL_TEST))},setMask:function(ne){ot!==ne&&!D&&(i.stencilMask(ne),ot=ne)},setFunc:function(ne,xn,ln){(ft!==ne||bt!==xn||rt!==ln)&&(i.stencilFunc(ne,xn,ln),ft=ne,bt=xn,rt=ln)},setOp:function(ne,xn,ln){(Z!==ne||Pt!==xn||Gt!==ln)&&(i.stencilOp(ne,xn,ln),Z=ne,Pt=xn,Gt=ln)},setLocked:function(ne){D=ne},setClear:function(ne){fe!==ne&&(i.clearStencil(ne),fe=ne)},reset:function(){D=!1,ot=null,ft=null,bt=null,rt=null,Z=null,Pt=null,Gt=null,fe=null}}}const r=new e,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let h={},u={},f=new WeakMap,d=[],g=null,v=!1,m=null,p=null,E=null,S=null,x=null,R=null,w=null,P=new $t(0,0,0),I=0,b=!1,M=null,L=null,O=null,k=null,q=null;const G=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,J=0;const V=i.getParameter(i.VERSION);V.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(V)[1]),X=J>=1):V.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),X=J>=2);let dt=null,_t={};const St=i.getParameter(i.SCISSOR_BOX),Vt=i.getParameter(i.VIEWPORT),Zt=new ce().fromArray(St),ie=new ce().fromArray(Vt);function Jt(D,ot,ft,bt){const rt=new Uint8Array(4),Z=i.createTexture();i.bindTexture(D,Z),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Pt=0;Pt<ft;Pt++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(ot,0,i.RGBA,1,1,bt,0,i.RGBA,i.UNSIGNED_BYTE,rt):i.texImage2D(ot+Pt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,rt);return Z}const Y={};Y[i.TEXTURE_2D]=Jt(i.TEXTURE_2D,i.TEXTURE_2D,1),Y[i.TEXTURE_CUBE_MAP]=Jt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[i.TEXTURE_2D_ARRAY]=Jt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Y[i.TEXTURE_3D]=Jt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),et(i.DEPTH_TEST),a.setFunc(Oi),K(!1),$(jo),et(i.CULL_FACE),tt(kn);function et(D){h[D]!==!0&&(i.enable(D),h[D]=!0)}function Mt(D){h[D]!==!1&&(i.disable(D),h[D]=!1)}function Dt(D,ot){return u[D]!==ot?(i.bindFramebuffer(D,ot),u[D]=ot,D===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ot),D===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ot),!0):!1}function At(D,ot){let ft=d,bt=!1;if(D){ft=f.get(ot),ft===void 0&&(ft=[],f.set(ot,ft));const rt=D.textures;if(ft.length!==rt.length||ft[0]!==i.COLOR_ATTACHMENT0){for(let Z=0,Pt=rt.length;Z<Pt;Z++)ft[Z]=i.COLOR_ATTACHMENT0+Z;ft.length=rt.length,bt=!0}}else ft[0]!==i.BACK&&(ft[0]=i.BACK,bt=!0);bt&&i.drawBuffers(ft)}function Kt(D){return g!==D?(i.useProgram(D),g=D,!0):!1}const de={[ei]:i.FUNC_ADD,[kh]:i.FUNC_SUBTRACT,[Hh]:i.FUNC_REVERSE_SUBTRACT};de[Gh]=i.MIN,de[Vh]=i.MAX;const A={[Wh]:i.ZERO,[Xh]:i.ONE,[qh]:i.SRC_COLOR,[va]:i.SRC_ALPHA,[Jh]:i.SRC_ALPHA_SATURATE,[jh]:i.DST_COLOR,[$h]:i.DST_ALPHA,[Yh]:i.ONE_MINUS_SRC_COLOR,[_a]:i.ONE_MINUS_SRC_ALPHA,[Zh]:i.ONE_MINUS_DST_COLOR,[Kh]:i.ONE_MINUS_DST_ALPHA,[Qh]:i.CONSTANT_COLOR,[tu]:i.ONE_MINUS_CONSTANT_COLOR,[eu]:i.CONSTANT_ALPHA,[nu]:i.ONE_MINUS_CONSTANT_ALPHA};function tt(D,ot,ft,bt,rt,Z,Pt,Gt,fe,ne){if(D===kn){v===!0&&(Mt(i.BLEND),v=!1);return}if(v===!1&&(et(i.BLEND),v=!0),D!==zh){if(D!==m||ne!==b){if((p!==ei||x!==ei)&&(i.blendEquation(i.FUNC_ADD),p=ei,x=ei),ne)switch(D){case Ni:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ga:i.blendFunc(i.ONE,i.ONE);break;case Zo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Jo:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Ni:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ga:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Zo:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Jo:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}E=null,S=null,R=null,w=null,P.set(0,0,0),I=0,m=D,b=ne}return}rt=rt||ot,Z=Z||ft,Pt=Pt||bt,(ot!==p||rt!==x)&&(i.blendEquationSeparate(de[ot],de[rt]),p=ot,x=rt),(ft!==E||bt!==S||Z!==R||Pt!==w)&&(i.blendFuncSeparate(A[ft],A[bt],A[Z],A[Pt]),E=ft,S=bt,R=Z,w=Pt),(Gt.equals(P)===!1||fe!==I)&&(i.blendColor(Gt.r,Gt.g,Gt.b,fe),P.copy(Gt),I=fe),m=D,b=!1}function j(D,ot){D.side===un?Mt(i.CULL_FACE):et(i.CULL_FACE);let ft=D.side===Oe;ot&&(ft=!ft),K(ft),D.blending===Ni&&D.transparent===!1?tt(kn):tt(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);const bt=D.stencilWrite;o.setTest(bt),bt&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),nt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?et(i.SAMPLE_ALPHA_TO_COVERAGE):Mt(i.SAMPLE_ALPHA_TO_COVERAGE)}function K(D){M!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),M=D)}function $(D){D!==Oh?(et(i.CULL_FACE),D!==L&&(D===jo?i.cullFace(i.BACK):D===Bh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Mt(i.CULL_FACE),L=D}function ht(D){D!==O&&(X&&i.lineWidth(D),O=D)}function nt(D,ot,ft){D?(et(i.POLYGON_OFFSET_FILL),(k!==ot||q!==ft)&&(i.polygonOffset(ot,ft),k=ot,q=ft)):Mt(i.POLYGON_OFFSET_FILL)}function ut(D){D?et(i.SCISSOR_TEST):Mt(i.SCISSOR_TEST)}function Ht(D){D===void 0&&(D=i.TEXTURE0+G-1),dt!==D&&(i.activeTexture(D),dt=D)}function kt(D,ot,ft){ft===void 0&&(dt===null?ft=i.TEXTURE0+G-1:ft=dt);let bt=_t[ft];bt===void 0&&(bt={type:void 0,texture:void 0},_t[ft]=bt),(bt.type!==D||bt.texture!==ot)&&(dt!==ft&&(i.activeTexture(ft),dt=ft),i.bindTexture(D,ot||Y[D]),bt.type=D,bt.texture=ot)}function T(){const D=_t[dt];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function _(){try{i.compressedTexImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function F(){try{i.compressedTexImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function H(){try{i.texSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Q(){try{i.texSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function W(){try{i.compressedTexSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Lt(){try{i.compressedTexSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ct(){try{i.texStorage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Rt(){try{i.texStorage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ct(){try{i.texImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function st(){try{i.texImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function vt(D){Zt.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),Zt.copy(D))}function Bt(D){ie.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),ie.copy(D))}function It(D,ot){let ft=c.get(ot);ft===void 0&&(ft=new WeakMap,c.set(ot,ft));let bt=ft.get(D);bt===void 0&&(bt=i.getUniformBlockIndex(ot,D.name),ft.set(D,bt))}function mt(D,ot){const bt=c.get(ot).get(D);l.get(ot)!==bt&&(i.uniformBlockBinding(ot,bt,D.__bindingPointIndex),l.set(ot,bt))}function Wt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},dt=null,_t={},u={},f=new WeakMap,d=[],g=null,v=!1,m=null,p=null,E=null,S=null,x=null,R=null,w=null,P=new $t(0,0,0),I=0,b=!1,M=null,L=null,O=null,k=null,q=null,Zt.set(0,0,i.canvas.width,i.canvas.height),ie.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:et,disable:Mt,bindFramebuffer:Dt,drawBuffers:At,useProgram:Kt,setBlending:tt,setMaterial:j,setFlipSided:K,setCullFace:$,setLineWidth:ht,setPolygonOffset:nt,setScissorTest:ut,activeTexture:Ht,bindTexture:kt,unbindTexture:T,compressedTexImage2D:_,compressedTexImage3D:F,texImage2D:Ct,texImage3D:st,updateUBOMapping:It,uniformBlockBinding:mt,texStorage2D:ct,texStorage3D:Rt,texSubImage2D:H,texSubImage3D:Q,compressedTexSubImage2D:W,compressedTexSubImage3D:Lt,scissor:vt,viewport:Bt,reset:Wt}}function U0(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new it,h=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,_){return d?new OffscreenCanvas(T,_):xr("canvas")}function v(T,_,F){let H=1;const Q=kt(T);if((Q.width>F||Q.height>F)&&(H=F/Math.max(Q.width,Q.height)),H<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const W=Math.floor(H*Q.width),Lt=Math.floor(H*Q.height);u===void 0&&(u=g(W,Lt));const ct=_?g(W,Lt):u;return ct.width=W,ct.height=Lt,ct.getContext("2d").drawImage(T,0,0,W,Lt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+W+"x"+Lt+")."),ct}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),T;return T}function m(T){return T.generateMipmaps}function p(T){i.generateMipmap(T)}function E(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(T,_,F,H,Q=!1){if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let W=_;if(_===i.RED&&(F===i.FLOAT&&(W=i.R32F),F===i.HALF_FLOAT&&(W=i.R16F),F===i.UNSIGNED_BYTE&&(W=i.R8)),_===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(W=i.R8UI),F===i.UNSIGNED_SHORT&&(W=i.R16UI),F===i.UNSIGNED_INT&&(W=i.R32UI),F===i.BYTE&&(W=i.R8I),F===i.SHORT&&(W=i.R16I),F===i.INT&&(W=i.R32I)),_===i.RG&&(F===i.FLOAT&&(W=i.RG32F),F===i.HALF_FLOAT&&(W=i.RG16F),F===i.UNSIGNED_BYTE&&(W=i.RG8)),_===i.RG_INTEGER&&(F===i.UNSIGNED_BYTE&&(W=i.RG8UI),F===i.UNSIGNED_SHORT&&(W=i.RG16UI),F===i.UNSIGNED_INT&&(W=i.RG32UI),F===i.BYTE&&(W=i.RG8I),F===i.SHORT&&(W=i.RG16I),F===i.INT&&(W=i.RG32I)),_===i.RGB_INTEGER&&(F===i.UNSIGNED_BYTE&&(W=i.RGB8UI),F===i.UNSIGNED_SHORT&&(W=i.RGB16UI),F===i.UNSIGNED_INT&&(W=i.RGB32UI),F===i.BYTE&&(W=i.RGB8I),F===i.SHORT&&(W=i.RGB16I),F===i.INT&&(W=i.RGB32I)),_===i.RGBA_INTEGER&&(F===i.UNSIGNED_BYTE&&(W=i.RGBA8UI),F===i.UNSIGNED_SHORT&&(W=i.RGBA16UI),F===i.UNSIGNED_INT&&(W=i.RGBA32UI),F===i.BYTE&&(W=i.RGBA8I),F===i.SHORT&&(W=i.RGBA16I),F===i.INT&&(W=i.RGBA32I)),_===i.RGB&&(F===i.UNSIGNED_INT_5_9_9_9_REV&&(W=i.RGB9_E5),F===i.UNSIGNED_INT_10F_11F_11F_REV&&(W=i.R11F_G11F_B10F)),_===i.RGBA){const Lt=Q?vr:ee.getTransfer(H);F===i.FLOAT&&(W=i.RGBA32F),F===i.HALF_FLOAT&&(W=i.RGBA16F),F===i.UNSIGNED_BYTE&&(W=Lt===oe?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&(W=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(W=i.RGB5_A1)}return(W===i.R16F||W===i.R32F||W===i.RG16F||W===i.RG32F||W===i.RGBA16F||W===i.RGBA32F)&&t.get("EXT_color_buffer_float"),W}function x(T,_){let F;return T?_===null||_===ai||_===vs?F=i.DEPTH24_STENCIL8:_===fn?F=i.DEPTH32F_STENCIL8:_===gs&&(F=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===ai||_===vs?F=i.DEPTH_COMPONENT24:_===fn?F=i.DEPTH_COMPONENT32F:_===gs&&(F=i.DEPTH_COMPONENT16),F}function R(T,_){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==Ye&&T.minFilter!==dn?Math.log2(Math.max(_.width,_.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?_.mipmaps.length:1}function w(T){const _=T.target;_.removeEventListener("dispose",w),I(_),_.isVideoTexture&&h.delete(_)}function P(T){const _=T.target;_.removeEventListener("dispose",P),M(_)}function I(T){const _=n.get(T);if(_.__webglInit===void 0)return;const F=T.source,H=f.get(F);if(H){const Q=H[_.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&b(T),Object.keys(H).length===0&&f.delete(F)}n.remove(T)}function b(T){const _=n.get(T);i.deleteTexture(_.__webglTexture);const F=T.source,H=f.get(F);delete H[_.__cacheKey],a.memory.textures--}function M(T){const _=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let H=0;H<6;H++){if(Array.isArray(_.__webglFramebuffer[H]))for(let Q=0;Q<_.__webglFramebuffer[H].length;Q++)i.deleteFramebuffer(_.__webglFramebuffer[H][Q]);else i.deleteFramebuffer(_.__webglFramebuffer[H]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[H])}else{if(Array.isArray(_.__webglFramebuffer))for(let H=0;H<_.__webglFramebuffer.length;H++)i.deleteFramebuffer(_.__webglFramebuffer[H]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let H=0;H<_.__webglColorRenderbuffer.length;H++)_.__webglColorRenderbuffer[H]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[H]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const F=T.textures;for(let H=0,Q=F.length;H<Q;H++){const W=n.get(F[H]);W.__webglTexture&&(i.deleteTexture(W.__webglTexture),a.memory.textures--),n.remove(F[H])}n.remove(T)}let L=0;function O(){L=0}function k(){const T=L;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),L+=1,T}function q(T){const _=[];return _.push(T.wrapS),_.push(T.wrapT),_.push(T.wrapR||0),_.push(T.magFilter),_.push(T.minFilter),_.push(T.anisotropy),_.push(T.internalFormat),_.push(T.format),_.push(T.type),_.push(T.generateMipmaps),_.push(T.premultiplyAlpha),_.push(T.flipY),_.push(T.unpackAlignment),_.push(T.colorSpace),_.join()}function G(T,_){const F=n.get(T);if(T.isVideoTexture&&ut(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&F.__version!==T.version){const H=T.image;if(H===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(H.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(F,T,_);return}}else T.isExternalTexture&&(F.__webglTexture=T.sourceTexture?T.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+_)}function X(T,_){const F=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&F.__version!==T.version){Y(F,T,_);return}e.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+_)}function J(T,_){const F=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&F.__version!==T.version){Y(F,T,_);return}e.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+_)}function V(T,_){const F=n.get(T);if(T.version>0&&F.__version!==T.version){et(F,T,_);return}e.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+_)}const dt={[gr]:i.REPEAT,[ii]:i.CLAMP_TO_EDGE,[Ra]:i.MIRRORED_REPEAT},_t={[Ye]:i.NEAREST,[uu]:i.NEAREST_MIPMAP_NEAREST,[Is]:i.NEAREST_MIPMAP_LINEAR,[dn]:i.LINEAR,[Dr]:i.LINEAR_MIPMAP_NEAREST,[si]:i.LINEAR_MIPMAP_LINEAR},St={[mu]:i.NEVER,[Mu]:i.ALWAYS,[gu]:i.LESS,[Lc]:i.LEQUAL,[vu]:i.EQUAL,[yu]:i.GEQUAL,[_u]:i.GREATER,[xu]:i.NOTEQUAL};function Vt(T,_){if(_.type===fn&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===dn||_.magFilter===Dr||_.magFilter===Is||_.magFilter===si||_.minFilter===dn||_.minFilter===Dr||_.minFilter===Is||_.minFilter===si)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,dt[_.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,dt[_.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,dt[_.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,_t[_.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,_t[_.minFilter]),_.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,St[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Ye||_.minFilter!==Is&&_.minFilter!==si||_.type===fn&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const F=t.get("EXT_texture_filter_anisotropic");i.texParameterf(T,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function Zt(T,_){let F=!1;T.__webglInit===void 0&&(T.__webglInit=!0,_.addEventListener("dispose",w));const H=_.source;let Q=f.get(H);Q===void 0&&(Q={},f.set(H,Q));const W=q(_);if(W!==T.__cacheKey){Q[W]===void 0&&(Q[W]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,F=!0),Q[W].usedTimes++;const Lt=Q[T.__cacheKey];Lt!==void 0&&(Q[T.__cacheKey].usedTimes--,Lt.usedTimes===0&&b(_)),T.__cacheKey=W,T.__webglTexture=Q[W].texture}return F}function ie(T,_,F){return Math.floor(Math.floor(T/F)/_)}function Jt(T,_,F,H){const W=T.updateRanges;if(W.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,F,H,_.data);else{W.sort((st,vt)=>st.start-vt.start);let Lt=0;for(let st=1;st<W.length;st++){const vt=W[Lt],Bt=W[st],It=vt.start+vt.count,mt=ie(Bt.start,_.width,4),Wt=ie(vt.start,_.width,4);Bt.start<=It+1&&mt===Wt&&ie(Bt.start+Bt.count-1,_.width,4)===mt?vt.count=Math.max(vt.count,Bt.start+Bt.count-vt.start):(++Lt,W[Lt]=Bt)}W.length=Lt+1;const ct=i.getParameter(i.UNPACK_ROW_LENGTH),Rt=i.getParameter(i.UNPACK_SKIP_PIXELS),Ct=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let st=0,vt=W.length;st<vt;st++){const Bt=W[st],It=Math.floor(Bt.start/4),mt=Math.ceil(Bt.count/4),Wt=It%_.width,D=Math.floor(It/_.width),ot=mt,ft=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Wt),i.pixelStorei(i.UNPACK_SKIP_ROWS,D),e.texSubImage2D(i.TEXTURE_2D,0,Wt,D,ot,ft,F,H,_.data)}T.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ct),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Rt),i.pixelStorei(i.UNPACK_SKIP_ROWS,Ct)}}function Y(T,_,F){let H=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(H=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(H=i.TEXTURE_3D);const Q=Zt(T,_),W=_.source;e.bindTexture(H,T.__webglTexture,i.TEXTURE0+F);const Lt=n.get(W);if(W.version!==Lt.__version||Q===!0){e.activeTexture(i.TEXTURE0+F);const ct=ee.getPrimaries(ee.workingColorSpace),Rt=_.colorSpace===zn?null:ee.getPrimaries(_.colorSpace),Ct=_.colorSpace===zn||ct===Rt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ct);let st=v(_.image,!1,s.maxTextureSize);st=Ht(_,st);const vt=r.convert(_.format,_.colorSpace),Bt=r.convert(_.type);let It=S(_.internalFormat,vt,Bt,_.colorSpace,_.isVideoTexture);Vt(H,_);let mt;const Wt=_.mipmaps,D=_.isVideoTexture!==!0,ot=Lt.__version===void 0||Q===!0,ft=W.dataReady,bt=R(_,st);if(_.isDepthTexture)It=x(_.format===xs,_.type),ot&&(D?e.texStorage2D(i.TEXTURE_2D,1,It,st.width,st.height):e.texImage2D(i.TEXTURE_2D,0,It,st.width,st.height,0,vt,Bt,null));else if(_.isDataTexture)if(Wt.length>0){D&&ot&&e.texStorage2D(i.TEXTURE_2D,bt,It,Wt[0].width,Wt[0].height);for(let rt=0,Z=Wt.length;rt<Z;rt++)mt=Wt[rt],D?ft&&e.texSubImage2D(i.TEXTURE_2D,rt,0,0,mt.width,mt.height,vt,Bt,mt.data):e.texImage2D(i.TEXTURE_2D,rt,It,mt.width,mt.height,0,vt,Bt,mt.data);_.generateMipmaps=!1}else D?(ot&&e.texStorage2D(i.TEXTURE_2D,bt,It,st.width,st.height),ft&&Jt(_,st,vt,Bt)):e.texImage2D(i.TEXTURE_2D,0,It,st.width,st.height,0,vt,Bt,st.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){D&&ot&&e.texStorage3D(i.TEXTURE_2D_ARRAY,bt,It,Wt[0].width,Wt[0].height,st.depth);for(let rt=0,Z=Wt.length;rt<Z;rt++)if(mt=Wt[rt],_.format!==an)if(vt!==null)if(D){if(ft)if(_.layerUpdates.size>0){const Pt=zl(mt.width,mt.height,_.format,_.type);for(const Gt of _.layerUpdates){const fe=mt.data.subarray(Gt*Pt/mt.data.BYTES_PER_ELEMENT,(Gt+1)*Pt/mt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,rt,0,0,Gt,mt.width,mt.height,1,vt,fe)}_.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,rt,0,0,0,mt.width,mt.height,st.depth,vt,mt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,rt,It,mt.width,mt.height,st.depth,0,mt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?ft&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,rt,0,0,0,mt.width,mt.height,st.depth,vt,Bt,mt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,rt,It,mt.width,mt.height,st.depth,0,vt,Bt,mt.data)}else{D&&ot&&e.texStorage2D(i.TEXTURE_2D,bt,It,Wt[0].width,Wt[0].height);for(let rt=0,Z=Wt.length;rt<Z;rt++)mt=Wt[rt],_.format!==an?vt!==null?D?ft&&e.compressedTexSubImage2D(i.TEXTURE_2D,rt,0,0,mt.width,mt.height,vt,mt.data):e.compressedTexImage2D(i.TEXTURE_2D,rt,It,mt.width,mt.height,0,mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?ft&&e.texSubImage2D(i.TEXTURE_2D,rt,0,0,mt.width,mt.height,vt,Bt,mt.data):e.texImage2D(i.TEXTURE_2D,rt,It,mt.width,mt.height,0,vt,Bt,mt.data)}else if(_.isDataArrayTexture)if(D){if(ot&&e.texStorage3D(i.TEXTURE_2D_ARRAY,bt,It,st.width,st.height,st.depth),ft)if(_.layerUpdates.size>0){const rt=zl(st.width,st.height,_.format,_.type);for(const Z of _.layerUpdates){const Pt=st.data.subarray(Z*rt/st.data.BYTES_PER_ELEMENT,(Z+1)*rt/st.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Z,st.width,st.height,1,vt,Bt,Pt)}_.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,st.width,st.height,st.depth,vt,Bt,st.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,It,st.width,st.height,st.depth,0,vt,Bt,st.data);else if(_.isData3DTexture)D?(ot&&e.texStorage3D(i.TEXTURE_3D,bt,It,st.width,st.height,st.depth),ft&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,st.width,st.height,st.depth,vt,Bt,st.data)):e.texImage3D(i.TEXTURE_3D,0,It,st.width,st.height,st.depth,0,vt,Bt,st.data);else if(_.isFramebufferTexture){if(ot)if(D)e.texStorage2D(i.TEXTURE_2D,bt,It,st.width,st.height);else{let rt=st.width,Z=st.height;for(let Pt=0;Pt<bt;Pt++)e.texImage2D(i.TEXTURE_2D,Pt,It,rt,Z,0,vt,Bt,null),rt>>=1,Z>>=1}}else if(Wt.length>0){if(D&&ot){const rt=kt(Wt[0]);e.texStorage2D(i.TEXTURE_2D,bt,It,rt.width,rt.height)}for(let rt=0,Z=Wt.length;rt<Z;rt++)mt=Wt[rt],D?ft&&e.texSubImage2D(i.TEXTURE_2D,rt,0,0,vt,Bt,mt):e.texImage2D(i.TEXTURE_2D,rt,It,vt,Bt,mt);_.generateMipmaps=!1}else if(D){if(ot){const rt=kt(st);e.texStorage2D(i.TEXTURE_2D,bt,It,rt.width,rt.height)}ft&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,vt,Bt,st)}else e.texImage2D(i.TEXTURE_2D,0,It,vt,Bt,st);m(_)&&p(H),Lt.__version=W.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function et(T,_,F){if(_.image.length!==6)return;const H=Zt(T,_),Q=_.source;e.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+F);const W=n.get(Q);if(Q.version!==W.__version||H===!0){e.activeTexture(i.TEXTURE0+F);const Lt=ee.getPrimaries(ee.workingColorSpace),ct=_.colorSpace===zn?null:ee.getPrimaries(_.colorSpace),Rt=_.colorSpace===zn||Lt===ct?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Rt);const Ct=_.isCompressedTexture||_.image[0].isCompressedTexture,st=_.image[0]&&_.image[0].isDataTexture,vt=[];for(let Z=0;Z<6;Z++)!Ct&&!st?vt[Z]=v(_.image[Z],!0,s.maxCubemapSize):vt[Z]=st?_.image[Z].image:_.image[Z],vt[Z]=Ht(_,vt[Z]);const Bt=vt[0],It=r.convert(_.format,_.colorSpace),mt=r.convert(_.type),Wt=S(_.internalFormat,It,mt,_.colorSpace),D=_.isVideoTexture!==!0,ot=W.__version===void 0||H===!0,ft=Q.dataReady;let bt=R(_,Bt);Vt(i.TEXTURE_CUBE_MAP,_);let rt;if(Ct){D&&ot&&e.texStorage2D(i.TEXTURE_CUBE_MAP,bt,Wt,Bt.width,Bt.height);for(let Z=0;Z<6;Z++){rt=vt[Z].mipmaps;for(let Pt=0;Pt<rt.length;Pt++){const Gt=rt[Pt];_.format!==an?It!==null?D?ft&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Pt,0,0,Gt.width,Gt.height,It,Gt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Pt,Wt,Gt.width,Gt.height,0,Gt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?ft&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Pt,0,0,Gt.width,Gt.height,It,mt,Gt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Pt,Wt,Gt.width,Gt.height,0,It,mt,Gt.data)}}}else{if(rt=_.mipmaps,D&&ot){rt.length>0&&bt++;const Z=kt(vt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,bt,Wt,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(st){D?ft&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,vt[Z].width,vt[Z].height,It,mt,vt[Z].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Wt,vt[Z].width,vt[Z].height,0,It,mt,vt[Z].data);for(let Pt=0;Pt<rt.length;Pt++){const fe=rt[Pt].image[Z].image;D?ft&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Pt+1,0,0,fe.width,fe.height,It,mt,fe.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Pt+1,Wt,fe.width,fe.height,0,It,mt,fe.data)}}else{D?ft&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,It,mt,vt[Z]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Wt,It,mt,vt[Z]);for(let Pt=0;Pt<rt.length;Pt++){const Gt=rt[Pt];D?ft&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Pt+1,0,0,It,mt,Gt.image[Z]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Pt+1,Wt,It,mt,Gt.image[Z])}}}m(_)&&p(i.TEXTURE_CUBE_MAP),W.__version=Q.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function Mt(T,_,F,H,Q,W){const Lt=r.convert(F.format,F.colorSpace),ct=r.convert(F.type),Rt=S(F.internalFormat,Lt,ct,F.colorSpace),Ct=n.get(_),st=n.get(F);if(st.__renderTarget=_,!Ct.__hasExternalTextures){const vt=Math.max(1,_.width>>W),Bt=Math.max(1,_.height>>W);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?e.texImage3D(Q,W,Rt,vt,Bt,_.depth,0,Lt,ct,null):e.texImage2D(Q,W,Rt,vt,Bt,0,Lt,ct,null)}e.bindFramebuffer(i.FRAMEBUFFER,T),nt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,H,Q,st.__webglTexture,0,ht(_)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,H,Q,st.__webglTexture,W),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Dt(T,_,F){if(i.bindRenderbuffer(i.RENDERBUFFER,T),_.depthBuffer){const H=_.depthTexture,Q=H&&H.isDepthTexture?H.type:null,W=x(_.stencilBuffer,Q),Lt=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ct=ht(_);nt(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ct,W,_.width,_.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,ct,W,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,W,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Lt,i.RENDERBUFFER,T)}else{const H=_.textures;for(let Q=0;Q<H.length;Q++){const W=H[Q],Lt=r.convert(W.format,W.colorSpace),ct=r.convert(W.type),Rt=S(W.internalFormat,Lt,ct,W.colorSpace),Ct=ht(_);F&&nt(_)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ct,Rt,_.width,_.height):nt(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ct,Rt,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,Rt,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function At(T,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,T),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const H=n.get(_.depthTexture);H.__renderTarget=_,(!H.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),G(_.depthTexture,0);const Q=H.__webglTexture,W=ht(_);if(_.depthTexture.format===_s)nt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0,W):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0);else if(_.depthTexture.format===xs)nt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0,W):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Kt(T){const _=n.get(T),F=T.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==T.depthTexture){const H=T.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),H){const Q=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,H.removeEventListener("dispose",Q)};H.addEventListener("dispose",Q),_.__depthDisposeCallback=Q}_.__boundDepthTexture=H}if(T.depthTexture&&!_.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");const H=T.texture.mipmaps;H&&H.length>0?At(_.__webglFramebuffer[0],T):At(_.__webglFramebuffer,T)}else if(F){_.__webglDepthbuffer=[];for(let H=0;H<6;H++)if(e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[H]),_.__webglDepthbuffer[H]===void 0)_.__webglDepthbuffer[H]=i.createRenderbuffer(),Dt(_.__webglDepthbuffer[H],T,!1);else{const Q=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,W=_.__webglDepthbuffer[H];i.bindRenderbuffer(i.RENDERBUFFER,W),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,W)}}else{const H=T.texture.mipmaps;if(H&&H.length>0?e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),Dt(_.__webglDepthbuffer,T,!1);else{const Q=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,W=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,W),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,W)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function de(T,_,F){const H=n.get(T);_!==void 0&&Mt(H.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&Kt(T)}function A(T){const _=T.texture,F=n.get(T),H=n.get(_);T.addEventListener("dispose",P);const Q=T.textures,W=T.isWebGLCubeRenderTarget===!0,Lt=Q.length>1;if(Lt||(H.__webglTexture===void 0&&(H.__webglTexture=i.createTexture()),H.__version=_.version,a.memory.textures++),W){F.__webglFramebuffer=[];for(let ct=0;ct<6;ct++)if(_.mipmaps&&_.mipmaps.length>0){F.__webglFramebuffer[ct]=[];for(let Rt=0;Rt<_.mipmaps.length;Rt++)F.__webglFramebuffer[ct][Rt]=i.createFramebuffer()}else F.__webglFramebuffer[ct]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){F.__webglFramebuffer=[];for(let ct=0;ct<_.mipmaps.length;ct++)F.__webglFramebuffer[ct]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(Lt)for(let ct=0,Rt=Q.length;ct<Rt;ct++){const Ct=n.get(Q[ct]);Ct.__webglTexture===void 0&&(Ct.__webglTexture=i.createTexture(),a.memory.textures++)}if(T.samples>0&&nt(T)===!1){F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let ct=0;ct<Q.length;ct++){const Rt=Q[ct];F.__webglColorRenderbuffer[ct]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[ct]);const Ct=r.convert(Rt.format,Rt.colorSpace),st=r.convert(Rt.type),vt=S(Rt.internalFormat,Ct,st,Rt.colorSpace,T.isXRRenderTarget===!0),Bt=ht(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,Bt,vt,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ct,i.RENDERBUFFER,F.__webglColorRenderbuffer[ct])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),Dt(F.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(W){e.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture),Vt(i.TEXTURE_CUBE_MAP,_);for(let ct=0;ct<6;ct++)if(_.mipmaps&&_.mipmaps.length>0)for(let Rt=0;Rt<_.mipmaps.length;Rt++)Mt(F.__webglFramebuffer[ct][Rt],T,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,Rt);else Mt(F.__webglFramebuffer[ct],T,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0);m(_)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Lt){for(let ct=0,Rt=Q.length;ct<Rt;ct++){const Ct=Q[ct],st=n.get(Ct);let vt=i.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(vt=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(vt,st.__webglTexture),Vt(vt,Ct),Mt(F.__webglFramebuffer,T,Ct,i.COLOR_ATTACHMENT0+ct,vt,0),m(Ct)&&p(vt)}e.unbindTexture()}else{let ct=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ct=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ct,H.__webglTexture),Vt(ct,_),_.mipmaps&&_.mipmaps.length>0)for(let Rt=0;Rt<_.mipmaps.length;Rt++)Mt(F.__webglFramebuffer[Rt],T,_,i.COLOR_ATTACHMENT0,ct,Rt);else Mt(F.__webglFramebuffer,T,_,i.COLOR_ATTACHMENT0,ct,0);m(_)&&p(ct),e.unbindTexture()}T.depthBuffer&&Kt(T)}function tt(T){const _=T.textures;for(let F=0,H=_.length;F<H;F++){const Q=_[F];if(m(Q)){const W=E(T),Lt=n.get(Q).__webglTexture;e.bindTexture(W,Lt),p(W),e.unbindTexture()}}}const j=[],K=[];function $(T){if(T.samples>0){if(nt(T)===!1){const _=T.textures,F=T.width,H=T.height;let Q=i.COLOR_BUFFER_BIT;const W=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Lt=n.get(T),ct=_.length>1;if(ct)for(let Ct=0;Ct<_.length;Ct++)e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ct,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ct,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer);const Rt=T.texture.mipmaps;Rt&&Rt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Lt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Lt.__webglFramebuffer);for(let Ct=0;Ct<_.length;Ct++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),ct){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Lt.__webglColorRenderbuffer[Ct]);const st=n.get(_[Ct]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,st,0)}i.blitFramebuffer(0,0,F,H,0,0,F,H,Q,i.NEAREST),l===!0&&(j.length=0,K.length=0,j.push(i.COLOR_ATTACHMENT0+Ct),T.depthBuffer&&T.resolveDepthBuffer===!1&&(j.push(W),K.push(W),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,K)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,j))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ct)for(let Ct=0;Ct<_.length;Ct++){e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ct,i.RENDERBUFFER,Lt.__webglColorRenderbuffer[Ct]);const st=n.get(_[Ct]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ct,i.TEXTURE_2D,st,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){const _=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function ht(T){return Math.min(s.maxSamples,T.samples)}function nt(T){const _=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function ut(T){const _=a.render.frame;h.get(T)!==_&&(h.set(T,_),T.update())}function Ht(T,_){const F=T.colorSpace,H=T.format,Q=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||F!==ki&&F!==zn&&(ee.getTransfer(F)===oe?(H!==an||Q!==vn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),_}function kt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=k,this.resetTextureUnits=O,this.setTexture2D=G,this.setTexture2DArray=X,this.setTexture3D=J,this.setTextureCube=V,this.rebindTextures=de,this.setupRenderTarget=A,this.updateRenderTargetMipmap=tt,this.updateMultisampleRenderTarget=$,this.setupDepthRenderbuffer=Kt,this.setupFrameBufferTexture=Mt,this.useMultisampledRTT=nt}function N0(i,t){function e(n,s=zn){let r;const a=ee.getTransfer(s);if(n===vn)return i.UNSIGNED_BYTE;if(n===vo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===_o)return i.UNSIGNED_SHORT_5_5_5_1;if(n===wc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Ac)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Ec)return i.BYTE;if(n===Tc)return i.SHORT;if(n===gs)return i.UNSIGNED_SHORT;if(n===go)return i.INT;if(n===ai)return i.UNSIGNED_INT;if(n===fn)return i.FLOAT;if(n===Ts)return i.HALF_FLOAT;if(n===Rc)return i.ALPHA;if(n===Cc)return i.RGB;if(n===an)return i.RGBA;if(n===_s)return i.DEPTH_COMPONENT;if(n===xs)return i.DEPTH_STENCIL;if(n===xo)return i.RED;if(n===yo)return i.RED_INTEGER;if(n===Pc)return i.RG;if(n===Mo)return i.RG_INTEGER;if(n===So)return i.RGBA_INTEGER;if(n===hr||n===ur||n===dr||n===fr)if(a===oe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===hr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ur)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===dr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===fr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===hr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ur)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===dr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===fr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ca||n===Pa||n===La||n===Ia)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ca)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Pa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===La)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ia)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Da||n===Ua||n===Na)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Da||n===Ua)return a===oe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Na)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Fa||n===Oa||n===Ba||n===za||n===ka||n===Ha||n===Ga||n===Va||n===Wa||n===Xa||n===qa||n===Ya||n===$a||n===Ka)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Fa)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Oa)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ba)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===za)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ka)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ha)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ga)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Va)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Wa)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Xa)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===qa)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ya)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===$a)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ka)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ja||n===Za||n===Ja)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===ja)return a===oe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Za)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ja)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Qa||n===to||n===eo||n===no)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Qa)return r.COMPRESSED_RED_RGTC1_EXT;if(n===to)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===eo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===no)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===vs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const F0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,O0=`
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

}`;class B0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Xc(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Wn({vertexShader:F0,fragmentShader:O0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ot(new Je(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class z0 extends Vi{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,f=null,d=null,g=null;const v=typeof XRWebGLBinding<"u",m=new B0,p={},E=e.getContextAttributes();let S=null,x=null;const R=[],w=[],P=new it;let I=null;const b=new qe;b.viewport=new ce;const M=new qe;M.viewport=new ce;const L=[b,M],O=new rf;let k=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let et=R[Y];return et===void 0&&(et=new ta,R[Y]=et),et.getTargetRaySpace()},this.getControllerGrip=function(Y){let et=R[Y];return et===void 0&&(et=new ta,R[Y]=et),et.getGripSpace()},this.getHand=function(Y){let et=R[Y];return et===void 0&&(et=new ta,R[Y]=et),et.getHandSpace()};function G(Y){const et=w.indexOf(Y.inputSource);if(et===-1)return;const Mt=R[et];Mt!==void 0&&(Mt.update(Y.inputSource,Y.frame,c||a),Mt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function X(){s.removeEventListener("select",G),s.removeEventListener("selectstart",G),s.removeEventListener("selectend",G),s.removeEventListener("squeeze",G),s.removeEventListener("squeezestart",G),s.removeEventListener("squeezeend",G),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",J);for(let Y=0;Y<R.length;Y++){const et=w[Y];et!==null&&(w[Y]=null,R[Y].disconnect(et))}k=null,q=null,m.reset();for(const Y in p)delete p[Y];t.setRenderTarget(S),d=null,f=null,u=null,s=null,x=null,Jt.stop(),n.isPresenting=!1,t.setPixelRatio(I),t.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(S=t.getRenderTarget(),s.addEventListener("select",G),s.addEventListener("selectstart",G),s.addEventListener("selectend",G),s.addEventListener("squeeze",G),s.addEventListener("squeezestart",G),s.addEventListener("squeezeend",G),s.addEventListener("end",X),s.addEventListener("inputsourceschange",J),E.xrCompatible!==!0&&await e.makeXRCompatible(),I=t.getPixelRatio(),t.getSize(P),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let Mt=null,Dt=null,At=null;E.depth&&(At=E.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Mt=E.stencil?xs:_s,Dt=E.stencil?vs:ai);const Kt={colorFormat:e.RGBA8,depthFormat:At,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(Kt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),x=new oi(f.textureWidth,f.textureHeight,{format:an,type:vn,depthTexture:new Wc(f.textureWidth,f.textureHeight,Dt,void 0,void 0,void 0,void 0,void 0,void 0,Mt),stencilBuffer:E.stencil,colorSpace:t.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const Mt={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,Mt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),x=new oi(d.framebufferWidth,d.framebufferHeight,{format:an,type:vn,colorSpace:t.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Jt.setContext(s),Jt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function J(Y){for(let et=0;et<Y.removed.length;et++){const Mt=Y.removed[et],Dt=w.indexOf(Mt);Dt>=0&&(w[Dt]=null,R[Dt].disconnect(Mt))}for(let et=0;et<Y.added.length;et++){const Mt=Y.added[et];let Dt=w.indexOf(Mt);if(Dt===-1){for(let Kt=0;Kt<R.length;Kt++)if(Kt>=w.length){w.push(Mt),Dt=Kt;break}else if(w[Kt]===null){w[Kt]=Mt,Dt=Kt;break}if(Dt===-1)break}const At=R[Dt];At&&At.connect(Mt)}}const V=new C,dt=new C;function _t(Y,et,Mt){V.setFromMatrixPosition(et.matrixWorld),dt.setFromMatrixPosition(Mt.matrixWorld);const Dt=V.distanceTo(dt),At=et.projectionMatrix.elements,Kt=Mt.projectionMatrix.elements,de=At[14]/(At[10]-1),A=At[14]/(At[10]+1),tt=(At[9]+1)/At[5],j=(At[9]-1)/At[5],K=(At[8]-1)/At[0],$=(Kt[8]+1)/Kt[0],ht=de*K,nt=de*$,ut=Dt/(-K+$),Ht=ut*-K;if(et.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Ht),Y.translateZ(ut),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),At[10]===-1)Y.projectionMatrix.copy(et.projectionMatrix),Y.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{const kt=de+ut,T=A+ut,_=ht-Ht,F=nt+(Dt-Ht),H=tt*A/T*kt,Q=j*A/T*kt;Y.projectionMatrix.makePerspective(_,F,H,Q,kt,T),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function St(Y,et){et===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(et.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let et=Y.near,Mt=Y.far;m.texture!==null&&(m.depthNear>0&&(et=m.depthNear),m.depthFar>0&&(Mt=m.depthFar)),O.near=M.near=b.near=et,O.far=M.far=b.far=Mt,(k!==O.near||q!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),k=O.near,q=O.far),O.layers.mask=Y.layers.mask|6,b.layers.mask=O.layers.mask&3,M.layers.mask=O.layers.mask&5;const Dt=Y.parent,At=O.cameras;St(O,Dt);for(let Kt=0;Kt<At.length;Kt++)St(At[Kt],Dt);At.length===2?_t(O,b,M):O.projectionMatrix.copy(b.projectionMatrix),Vt(Y,O,Dt)};function Vt(Y,et,Mt){Mt===null?Y.matrix.copy(et.matrixWorld):(Y.matrix.copy(Mt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(et.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(et.projectionMatrix),Y.projectionMatrixInverse.copy(et.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=ys*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(Y){l=Y,f!==null&&(f.fixedFoveation=Y),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Y)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(O)},this.getCameraTexture=function(Y){return p[Y]};let Zt=null;function ie(Y,et){if(h=et.getViewerPose(c||a),g=et,h!==null){const Mt=h.views;d!==null&&(t.setRenderTargetFramebuffer(x,d.framebuffer),t.setRenderTarget(x));let Dt=!1;Mt.length!==O.cameras.length&&(O.cameras.length=0,Dt=!0);for(let A=0;A<Mt.length;A++){const tt=Mt[A];let j=null;if(d!==null)j=d.getViewport(tt);else{const $=u.getViewSubImage(f,tt);j=$.viewport,A===0&&(t.setRenderTargetTextures(x,$.colorTexture,$.depthStencilTexture),t.setRenderTarget(x))}let K=L[A];K===void 0&&(K=new qe,K.layers.enable(A),K.viewport=new ce,L[A]=K),K.matrix.fromArray(tt.transform.matrix),K.matrix.decompose(K.position,K.quaternion,K.scale),K.projectionMatrix.fromArray(tt.projectionMatrix),K.projectionMatrixInverse.copy(K.projectionMatrix).invert(),K.viewport.set(j.x,j.y,j.width,j.height),A===0&&(O.matrix.copy(K.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Dt===!0&&O.cameras.push(K)}const At=s.enabledFeatures;if(At&&At.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){u=n.getBinding();const A=u.getDepthInformation(Mt[0]);A&&A.isValid&&A.texture&&m.init(A,s.renderState)}if(At&&At.includes("camera-access")&&v){t.state.unbindTexture(),u=n.getBinding();for(let A=0;A<Mt.length;A++){const tt=Mt[A].camera;if(tt){let j=p[tt];j||(j=new Xc,p[tt]=j);const K=u.getCameraImage(tt);j.sourceTexture=K}}}}for(let Mt=0;Mt<R.length;Mt++){const Dt=w[Mt],At=R[Mt];Dt!==null&&At!==void 0&&At.update(Dt,et,c||a)}Zt&&Zt(Y,et),et.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:et}),g=null}const Jt=new ih;Jt.setAnimationLoop(ie),this.setAnimationLoop=function(Y){Zt=Y},this.dispose=function(){}}}const Qn=new on,k0=new re;function H0(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Oc(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,E,S,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,E,S):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Oe&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Oe&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const E=t.get(p),S=E.envMap,x=E.envMapRotation;S&&(m.envMap.value=S,Qn.copy(x),Qn.x*=-1,Qn.y*=-1,Qn.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Qn.y*=-1,Qn.z*=-1),m.envMapRotation.value.setFromMatrix4(k0.makeRotationFromEuler(Qn)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,E,S){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*E,m.scale.value=S*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,E){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Oe&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const E=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function G0(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(E,S){const x=S.program;n.uniformBlockBinding(E,x)}function c(E,S){let x=s[E.id];x===void 0&&(g(E),x=h(E),s[E.id]=x,E.addEventListener("dispose",m));const R=S.program;n.updateUBOMapping(E,R);const w=t.render.frame;r[E.id]!==w&&(f(E),r[E.id]=w)}function h(E){const S=u();E.__bindingPointIndex=S;const x=i.createBuffer(),R=E.__size,w=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,R,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,x),x}function u(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(E){const S=s[E.id],x=E.uniforms,R=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let w=0,P=x.length;w<P;w++){const I=Array.isArray(x[w])?x[w]:[x[w]];for(let b=0,M=I.length;b<M;b++){const L=I[b];if(d(L,w,b,R)===!0){const O=L.__offset,k=Array.isArray(L.value)?L.value:[L.value];let q=0;for(let G=0;G<k.length;G++){const X=k[G],J=v(X);typeof X=="number"||typeof X=="boolean"?(L.__data[0]=X,i.bufferSubData(i.UNIFORM_BUFFER,O+q,L.__data)):X.isMatrix3?(L.__data[0]=X.elements[0],L.__data[1]=X.elements[1],L.__data[2]=X.elements[2],L.__data[3]=0,L.__data[4]=X.elements[3],L.__data[5]=X.elements[4],L.__data[6]=X.elements[5],L.__data[7]=0,L.__data[8]=X.elements[6],L.__data[9]=X.elements[7],L.__data[10]=X.elements[8],L.__data[11]=0):(X.toArray(L.__data,q),q+=J.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,O,L.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(E,S,x,R){const w=E.value,P=S+"_"+x;if(R[P]===void 0)return typeof w=="number"||typeof w=="boolean"?R[P]=w:R[P]=w.clone(),!0;{const I=R[P];if(typeof w=="number"||typeof w=="boolean"){if(I!==w)return R[P]=w,!0}else if(I.equals(w)===!1)return I.copy(w),!0}return!1}function g(E){const S=E.uniforms;let x=0;const R=16;for(let P=0,I=S.length;P<I;P++){const b=Array.isArray(S[P])?S[P]:[S[P]];for(let M=0,L=b.length;M<L;M++){const O=b[M],k=Array.isArray(O.value)?O.value:[O.value];for(let q=0,G=k.length;q<G;q++){const X=k[q],J=v(X),V=x%R,dt=V%J.boundary,_t=V+dt;x+=dt,_t!==0&&R-_t<J.storage&&(x+=R-_t),O.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=x,x+=J.storage}}}const w=x%R;return w>0&&(x+=R-w),E.__size=x,E.__cache={},this}function v(E){const S={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(S.boundary=4,S.storage=4):E.isVector2?(S.boundary=8,S.storage=8):E.isVector3||E.isColor?(S.boundary=16,S.storage=12):E.isVector4?(S.boundary=16,S.storage=16):E.isMatrix3?(S.boundary=48,S.storage=48):E.isMatrix4?(S.boundary=64,S.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),S}function m(E){const S=E.target;S.removeEventListener("dispose",m);const x=a.indexOf(S.__bindingPointIndex);a.splice(x,1),i.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function p(){for(const E in s)i.deleteBuffer(s[E]);a=[],s={},r={}}return{bind:l,update:c,dispose:p}}class V0{constructor(t={}){const{canvas:e=Bu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=a;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,p=null;const E=[],S=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Hn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const x=this;let R=!1;this._outputColorSpace=Fe;let w=0,P=0,I=null,b=-1,M=null;const L=new ce,O=new ce;let k=null;const q=new $t(0);let G=0,X=e.width,J=e.height,V=1,dt=null,_t=null;const St=new ce(0,0,X,J),Vt=new ce(0,0,X,J);let Zt=!1;const ie=new Co;let Jt=!1,Y=!1;const et=new re,Mt=new C,Dt=new ce,At={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Kt=!1;function de(){return I===null?V:1}let A=n;function tt(y,U){return e.getContext(y,U)}try{const y={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${po}`),e.addEventListener("webglcontextlost",ft,!1),e.addEventListener("webglcontextrestored",bt,!1),e.addEventListener("webglcontextcreationerror",rt,!1),A===null){const U="webgl2";if(A=tt(U,y),A===null)throw tt(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let j,K,$,ht,nt,ut,Ht,kt,T,_,F,H,Q,W,Lt,ct,Rt,Ct,st,vt,Bt,It,mt,Wt;function D(){j=new Qm(A),j.init(),It=new N0(A,j),K=new qm(A,j,t,It),$=new D0(A,j),K.reversedDepthBuffer&&f&&$.buffers.depth.setReversed(!0),ht=new ng(A),nt=new y0,ut=new U0(A,j,$,nt,K,It,ht),Ht=new $m(x),kt=new Jm(x),T=new lf(A),mt=new Wm(A,T),_=new tg(A,T,ht,mt),F=new sg(A,_,T,ht),st=new ig(A,K,ut),ct=new Ym(nt),H=new x0(x,Ht,kt,j,K,mt,ct),Q=new H0(x,nt),W=new S0,Lt=new R0(j),Ct=new Vm(x,Ht,kt,$,F,d,l),Rt=new L0(x,F,K),Wt=new G0(A,ht,K,$),vt=new Xm(A,j,ht),Bt=new eg(A,j,ht),ht.programs=H.programs,x.capabilities=K,x.extensions=j,x.properties=nt,x.renderLists=W,x.shadowMap=Rt,x.state=$,x.info=ht}D();const ot=new z0(x,A);this.xr=ot,this.getContext=function(){return A},this.getContextAttributes=function(){return A.getContextAttributes()},this.forceContextLoss=function(){const y=j.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=j.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(y){y!==void 0&&(V=y,this.setSize(X,J,!1))},this.getSize=function(y){return y.set(X,J)},this.setSize=function(y,U,B=!0){if(ot.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=y,J=U,e.width=Math.floor(y*V),e.height=Math.floor(U*V),B===!0&&(e.style.width=y+"px",e.style.height=U+"px"),this.setViewport(0,0,y,U)},this.getDrawingBufferSize=function(y){return y.set(X*V,J*V).floor()},this.setDrawingBufferSize=function(y,U,B){X=y,J=U,V=B,e.width=Math.floor(y*B),e.height=Math.floor(U*B),this.setViewport(0,0,y,U)},this.getCurrentViewport=function(y){return y.copy(L)},this.getViewport=function(y){return y.copy(St)},this.setViewport=function(y,U,B,z){y.isVector4?St.set(y.x,y.y,y.z,y.w):St.set(y,U,B,z),$.viewport(L.copy(St).multiplyScalar(V).round())},this.getScissor=function(y){return y.copy(Vt)},this.setScissor=function(y,U,B,z){y.isVector4?Vt.set(y.x,y.y,y.z,y.w):Vt.set(y,U,B,z),$.scissor(O.copy(Vt).multiplyScalar(V).round())},this.getScissorTest=function(){return Zt},this.setScissorTest=function(y){$.setScissorTest(Zt=y)},this.setOpaqueSort=function(y){dt=y},this.setTransparentSort=function(y){_t=y},this.getClearColor=function(y){return y.copy(Ct.getClearColor())},this.setClearColor=function(){Ct.setClearColor(...arguments)},this.getClearAlpha=function(){return Ct.getClearAlpha()},this.setClearAlpha=function(){Ct.setClearAlpha(...arguments)},this.clear=function(y=!0,U=!0,B=!0){let z=0;if(y){let N=!1;if(I!==null){const at=I.texture.format;N=at===So||at===Mo||at===yo}if(N){const at=I.texture.type,gt=at===vn||at===ai||at===gs||at===vs||at===vo||at===_o,Tt=Ct.getClearColor(),yt=Ct.getClearAlpha(),Ft=Tt.r,zt=Tt.g,Ut=Tt.b;gt?(g[0]=Ft,g[1]=zt,g[2]=Ut,g[3]=yt,A.clearBufferuiv(A.COLOR,0,g)):(v[0]=Ft,v[1]=zt,v[2]=Ut,v[3]=yt,A.clearBufferiv(A.COLOR,0,v))}else z|=A.COLOR_BUFFER_BIT}U&&(z|=A.DEPTH_BUFFER_BIT),B&&(z|=A.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),A.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ft,!1),e.removeEventListener("webglcontextrestored",bt,!1),e.removeEventListener("webglcontextcreationerror",rt,!1),Ct.dispose(),W.dispose(),Lt.dispose(),nt.dispose(),Ht.dispose(),kt.dispose(),F.dispose(),mt.dispose(),Wt.dispose(),H.dispose(),ot.dispose(),ot.removeEventListener("sessionstart",ln),ot.removeEventListener("sessionend",Ho),qn.stop()};function ft(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function bt(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;const y=ht.autoReset,U=Rt.enabled,B=Rt.autoUpdate,z=Rt.needsUpdate,N=Rt.type;D(),ht.autoReset=y,Rt.enabled=U,Rt.autoUpdate=B,Rt.needsUpdate=z,Rt.type=N}function rt(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function Z(y){const U=y.target;U.removeEventListener("dispose",Z),Pt(U)}function Pt(y){Gt(y),nt.remove(y)}function Gt(y){const U=nt.get(y).programs;U!==void 0&&(U.forEach(function(B){H.releaseProgram(B)}),y.isShaderMaterial&&H.releaseShaderCache(y))}this.renderBufferDirect=function(y,U,B,z,N,at){U===null&&(U=At);const gt=N.isMesh&&N.matrixWorld.determinant()<0,Tt=xh(y,U,B,z,N);$.setMaterial(z,gt);let yt=B.index,Ft=1;if(z.wireframe===!0){if(yt=_.getWireframeAttribute(B),yt===void 0)return;Ft=2}const zt=B.drawRange,Ut=B.attributes.position;let jt=zt.start*Ft,ae=(zt.start+zt.count)*Ft;at!==null&&(jt=Math.max(jt,at.start*Ft),ae=Math.min(ae,(at.start+at.count)*Ft)),yt!==null?(jt=Math.max(jt,0),ae=Math.min(ae,yt.count)):Ut!=null&&(jt=Math.max(jt,0),ae=Math.min(ae,Ut.count));const xe=ae-jt;if(xe<0||xe===1/0)return;mt.setup(N,z,Tt,B,yt);let pe,ue=vt;if(yt!==null&&(pe=T.get(yt),ue=Bt,ue.setIndex(pe)),N.isMesh)z.wireframe===!0?($.setLineWidth(z.wireframeLinewidth*de()),ue.setMode(A.LINES)):ue.setMode(A.TRIANGLES);else if(N.isLine){let Nt=z.linewidth;Nt===void 0&&(Nt=1),$.setLineWidth(Nt*de()),N.isLineSegments?ue.setMode(A.LINES):N.isLineLoop?ue.setMode(A.LINE_LOOP):ue.setMode(A.LINE_STRIP)}else N.isPoints?ue.setMode(A.POINTS):N.isSprite&&ue.setMode(A.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)Ms("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ue.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(j.get("WEBGL_multi_draw"))ue.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const Nt=N._multiDrawStarts,ge=N._multiDrawCounts,Qt=N._multiDrawCount,He=yt?T.get(yt).bytesPerElement:1,ui=nt.get(z).currentProgram.getUniforms();for(let Ge=0;Ge<Qt;Ge++)ui.setValue(A,"_gl_DrawID",Ge),ue.render(Nt[Ge]/He,ge[Ge])}else if(N.isInstancedMesh)ue.renderInstances(jt,xe,N.count);else if(B.isInstancedBufferGeometry){const Nt=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,ge=Math.min(B.instanceCount,Nt);ue.renderInstances(jt,xe,ge)}else ue.render(jt,xe)};function fe(y,U,B){y.transparent===!0&&y.side===un&&y.forceSinglePass===!1?(y.side=Oe,y.needsUpdate=!0,Ps(y,U,B),y.side=Vn,y.needsUpdate=!0,Ps(y,U,B),y.side=un):Ps(y,U,B)}this.compile=function(y,U,B=null){B===null&&(B=y),p=Lt.get(B),p.init(U),S.push(p),B.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),y!==B&&y.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),p.setupLights();const z=new Set;return y.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const at=N.material;if(at)if(Array.isArray(at))for(let gt=0;gt<at.length;gt++){const Tt=at[gt];fe(Tt,B,N),z.add(Tt)}else fe(at,B,N),z.add(at)}),p=S.pop(),z},this.compileAsync=function(y,U,B=null){const z=this.compile(y,U,B);return new Promise(N=>{function at(){if(z.forEach(function(gt){nt.get(gt).currentProgram.isReady()&&z.delete(gt)}),z.size===0){N(y);return}setTimeout(at,10)}j.get("KHR_parallel_shader_compile")!==null?at():setTimeout(at,10)})};let ne=null;function xn(y){ne&&ne(y)}function ln(){qn.stop()}function Ho(){qn.start()}const qn=new ih;qn.setAnimationLoop(xn),typeof self<"u"&&qn.setContext(self),this.setAnimationLoop=function(y){ne=y,ot.setAnimationLoop(y),y===null?qn.stop():qn.start()},ot.addEventListener("sessionstart",ln),ot.addEventListener("sessionend",Ho),this.render=function(y,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),ot.enabled===!0&&ot.isPresenting===!0&&(ot.cameraAutoUpdate===!0&&ot.updateCamera(U),U=ot.getCamera()),y.isScene===!0&&y.onBeforeRender(x,y,U,I),p=Lt.get(y,S.length),p.init(U),S.push(p),et.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),ie.setFromProjectionMatrix(et,pn,U.reversedDepth),Y=this.localClippingEnabled,Jt=ct.init(this.clippingPlanes,Y),m=W.get(y,E.length),m.init(),E.push(m),ot.enabled===!0&&ot.isPresenting===!0){const at=x.xr.getDepthSensingMesh();at!==null&&Pr(at,U,-1/0,x.sortObjects)}Pr(y,U,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(dt,_t),Kt=ot.enabled===!1||ot.isPresenting===!1||ot.hasDepthSensing()===!1,Kt&&Ct.addToRenderList(m,y),this.info.render.frame++,Jt===!0&&ct.beginShadows();const B=p.state.shadowsArray;Rt.render(B,y,U),Jt===!0&&ct.endShadows(),this.info.autoReset===!0&&this.info.reset();const z=m.opaque,N=m.transmissive;if(p.setupLights(),U.isArrayCamera){const at=U.cameras;if(N.length>0)for(let gt=0,Tt=at.length;gt<Tt;gt++){const yt=at[gt];Vo(z,N,y,yt)}Kt&&Ct.render(y);for(let gt=0,Tt=at.length;gt<Tt;gt++){const yt=at[gt];Go(m,y,yt,yt.viewport)}}else N.length>0&&Vo(z,N,y,U),Kt&&Ct.render(y),Go(m,y,U);I!==null&&P===0&&(ut.updateMultisampleRenderTarget(I),ut.updateRenderTargetMipmap(I)),y.isScene===!0&&y.onAfterRender(x,y,U),mt.resetDefaultState(),b=-1,M=null,S.pop(),S.length>0?(p=S[S.length-1],Jt===!0&&ct.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,E.pop(),E.length>0?m=E[E.length-1]:m=null};function Pr(y,U,B,z){if(y.visible===!1)return;if(y.layers.test(U.layers)){if(y.isGroup)B=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(U);else if(y.isLight)p.pushLight(y),y.castShadow&&p.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||ie.intersectsSprite(y)){z&&Dt.setFromMatrixPosition(y.matrixWorld).applyMatrix4(et);const gt=F.update(y),Tt=y.material;Tt.visible&&m.push(y,gt,Tt,B,Dt.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||ie.intersectsObject(y))){const gt=F.update(y),Tt=y.material;if(z&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Dt.copy(y.boundingSphere.center)):(gt.boundingSphere===null&&gt.computeBoundingSphere(),Dt.copy(gt.boundingSphere.center)),Dt.applyMatrix4(y.matrixWorld).applyMatrix4(et)),Array.isArray(Tt)){const yt=gt.groups;for(let Ft=0,zt=yt.length;Ft<zt;Ft++){const Ut=yt[Ft],jt=Tt[Ut.materialIndex];jt&&jt.visible&&m.push(y,gt,jt,B,Dt.z,Ut)}}else Tt.visible&&m.push(y,gt,Tt,B,Dt.z,null)}}const at=y.children;for(let gt=0,Tt=at.length;gt<Tt;gt++)Pr(at[gt],U,B,z)}function Go(y,U,B,z){const N=y.opaque,at=y.transmissive,gt=y.transparent;p.setupLightsView(B),Jt===!0&&ct.setGlobalState(x.clippingPlanes,B),z&&$.viewport(L.copy(z)),N.length>0&&Cs(N,U,B),at.length>0&&Cs(at,U,B),gt.length>0&&Cs(gt,U,B),$.buffers.depth.setTest(!0),$.buffers.depth.setMask(!0),$.buffers.color.setMask(!0),$.setPolygonOffset(!1)}function Vo(y,U,B,z){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[z.id]===void 0&&(p.state.transmissionRenderTarget[z.id]=new oi(1,1,{generateMipmaps:!0,type:j.has("EXT_color_buffer_half_float")||j.has("EXT_color_buffer_float")?Ts:vn,minFilter:si,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ee.workingColorSpace}));const at=p.state.transmissionRenderTarget[z.id],gt=z.viewport||L;at.setSize(gt.z*x.transmissionResolutionScale,gt.w*x.transmissionResolutionScale);const Tt=x.getRenderTarget(),yt=x.getActiveCubeFace(),Ft=x.getActiveMipmapLevel();x.setRenderTarget(at),x.getClearColor(q),G=x.getClearAlpha(),G<1&&x.setClearColor(16777215,.5),x.clear(),Kt&&Ct.render(B);const zt=x.toneMapping;x.toneMapping=Hn;const Ut=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),p.setupLightsView(z),Jt===!0&&ct.setGlobalState(x.clippingPlanes,z),Cs(y,B,z),ut.updateMultisampleRenderTarget(at),ut.updateRenderTargetMipmap(at),j.has("WEBGL_multisampled_render_to_texture")===!1){let jt=!1;for(let ae=0,xe=U.length;ae<xe;ae++){const pe=U[ae],ue=pe.object,Nt=pe.geometry,ge=pe.material,Qt=pe.group;if(ge.side===un&&ue.layers.test(z.layers)){const He=ge.side;ge.side=Oe,ge.needsUpdate=!0,Wo(ue,B,z,Nt,ge,Qt),ge.side=He,ge.needsUpdate=!0,jt=!0}}jt===!0&&(ut.updateMultisampleRenderTarget(at),ut.updateRenderTargetMipmap(at))}x.setRenderTarget(Tt,yt,Ft),x.setClearColor(q,G),Ut!==void 0&&(z.viewport=Ut),x.toneMapping=zt}function Cs(y,U,B){const z=U.isScene===!0?U.overrideMaterial:null;for(let N=0,at=y.length;N<at;N++){const gt=y[N],Tt=gt.object,yt=gt.geometry,Ft=gt.group;let zt=gt.material;zt.allowOverride===!0&&z!==null&&(zt=z),Tt.layers.test(B.layers)&&Wo(Tt,U,B,yt,zt,Ft)}}function Wo(y,U,B,z,N,at){y.onBeforeRender(x,U,B,z,N,at),y.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),N.onBeforeRender(x,U,B,z,y,at),N.transparent===!0&&N.side===un&&N.forceSinglePass===!1?(N.side=Oe,N.needsUpdate=!0,x.renderBufferDirect(B,U,z,N,y,at),N.side=Vn,N.needsUpdate=!0,x.renderBufferDirect(B,U,z,N,y,at),N.side=un):x.renderBufferDirect(B,U,z,N,y,at),y.onAfterRender(x,U,B,z,N,at)}function Ps(y,U,B){U.isScene!==!0&&(U=At);const z=nt.get(y),N=p.state.lights,at=p.state.shadowsArray,gt=N.state.version,Tt=H.getParameters(y,N.state,at,U,B),yt=H.getProgramCacheKey(Tt);let Ft=z.programs;z.environment=y.isMeshStandardMaterial?U.environment:null,z.fog=U.fog,z.envMap=(y.isMeshStandardMaterial?kt:Ht).get(y.envMap||z.environment),z.envMapRotation=z.environment!==null&&y.envMap===null?U.environmentRotation:y.envMapRotation,Ft===void 0&&(y.addEventListener("dispose",Z),Ft=new Map,z.programs=Ft);let zt=Ft.get(yt);if(zt!==void 0){if(z.currentProgram===zt&&z.lightsStateVersion===gt)return qo(y,Tt),zt}else Tt.uniforms=H.getUniforms(y),y.onBeforeCompile(Tt,x),zt=H.acquireProgram(Tt,yt),Ft.set(yt,zt),z.uniforms=Tt.uniforms;const Ut=z.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Ut.clippingPlanes=ct.uniform),qo(y,Tt),z.needsLights=Mh(y),z.lightsStateVersion=gt,z.needsLights&&(Ut.ambientLightColor.value=N.state.ambient,Ut.lightProbe.value=N.state.probe,Ut.directionalLights.value=N.state.directional,Ut.directionalLightShadows.value=N.state.directionalShadow,Ut.spotLights.value=N.state.spot,Ut.spotLightShadows.value=N.state.spotShadow,Ut.rectAreaLights.value=N.state.rectArea,Ut.ltc_1.value=N.state.rectAreaLTC1,Ut.ltc_2.value=N.state.rectAreaLTC2,Ut.pointLights.value=N.state.point,Ut.pointLightShadows.value=N.state.pointShadow,Ut.hemisphereLights.value=N.state.hemi,Ut.directionalShadowMap.value=N.state.directionalShadowMap,Ut.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Ut.spotShadowMap.value=N.state.spotShadowMap,Ut.spotLightMatrix.value=N.state.spotLightMatrix,Ut.spotLightMap.value=N.state.spotLightMap,Ut.pointShadowMap.value=N.state.pointShadowMap,Ut.pointShadowMatrix.value=N.state.pointShadowMatrix),z.currentProgram=zt,z.uniformsList=null,zt}function Xo(y){if(y.uniformsList===null){const U=y.currentProgram.getUniforms();y.uniformsList=mr.seqWithValue(U.seq,y.uniforms)}return y.uniformsList}function qo(y,U){const B=nt.get(y);B.outputColorSpace=U.outputColorSpace,B.batching=U.batching,B.batchingColor=U.batchingColor,B.instancing=U.instancing,B.instancingColor=U.instancingColor,B.instancingMorph=U.instancingMorph,B.skinning=U.skinning,B.morphTargets=U.morphTargets,B.morphNormals=U.morphNormals,B.morphColors=U.morphColors,B.morphTargetsCount=U.morphTargetsCount,B.numClippingPlanes=U.numClippingPlanes,B.numIntersection=U.numClipIntersection,B.vertexAlphas=U.vertexAlphas,B.vertexTangents=U.vertexTangents,B.toneMapping=U.toneMapping}function xh(y,U,B,z,N){U.isScene!==!0&&(U=At),ut.resetTextureUnits();const at=U.fog,gt=z.isMeshStandardMaterial?U.environment:null,Tt=I===null?x.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:ki,yt=(z.isMeshStandardMaterial?kt:Ht).get(z.envMap||gt),Ft=z.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,zt=!!B.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Ut=!!B.morphAttributes.position,jt=!!B.morphAttributes.normal,ae=!!B.morphAttributes.color;let xe=Hn;z.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(xe=x.toneMapping);const pe=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,ue=pe!==void 0?pe.length:0,Nt=nt.get(z),ge=p.state.lights;if(Jt===!0&&(Y===!0||y!==M)){const Le=y===M&&z.id===b;ct.setState(z,y,Le)}let Qt=!1;z.version===Nt.__version?(Nt.needsLights&&Nt.lightsStateVersion!==ge.state.version||Nt.outputColorSpace!==Tt||N.isBatchedMesh&&Nt.batching===!1||!N.isBatchedMesh&&Nt.batching===!0||N.isBatchedMesh&&Nt.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&Nt.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&Nt.instancing===!1||!N.isInstancedMesh&&Nt.instancing===!0||N.isSkinnedMesh&&Nt.skinning===!1||!N.isSkinnedMesh&&Nt.skinning===!0||N.isInstancedMesh&&Nt.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Nt.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&Nt.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Nt.instancingMorph===!1&&N.morphTexture!==null||Nt.envMap!==yt||z.fog===!0&&Nt.fog!==at||Nt.numClippingPlanes!==void 0&&(Nt.numClippingPlanes!==ct.numPlanes||Nt.numIntersection!==ct.numIntersection)||Nt.vertexAlphas!==Ft||Nt.vertexTangents!==zt||Nt.morphTargets!==Ut||Nt.morphNormals!==jt||Nt.morphColors!==ae||Nt.toneMapping!==xe||Nt.morphTargetsCount!==ue)&&(Qt=!0):(Qt=!0,Nt.__version=z.version);let He=Nt.currentProgram;Qt===!0&&(He=Ps(z,U,N));let ui=!1,Ge=!1,qi=!1;const ve=He.getUniforms(),$e=Nt.uniforms;if($.useProgram(He.program)&&(ui=!0,Ge=!0,qi=!0),z.id!==b&&(b=z.id,Ge=!0),ui||M!==y){$.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),ve.setValue(A,"projectionMatrix",y.projectionMatrix),ve.setValue(A,"viewMatrix",y.matrixWorldInverse);const ze=ve.map.cameraPosition;ze!==void 0&&ze.setValue(A,Mt.setFromMatrixPosition(y.matrixWorld)),K.logarithmicDepthBuffer&&ve.setValue(A,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&ve.setValue(A,"isOrthographic",y.isOrthographicCamera===!0),M!==y&&(M=y,Ge=!0,qi=!0)}if(N.isSkinnedMesh){ve.setOptional(A,N,"bindMatrix"),ve.setOptional(A,N,"bindMatrixInverse");const Le=N.skeleton;Le&&(Le.boneTexture===null&&Le.computeBoneTexture(),ve.setValue(A,"boneTexture",Le.boneTexture,ut))}N.isBatchedMesh&&(ve.setOptional(A,N,"batchingTexture"),ve.setValue(A,"batchingTexture",N._matricesTexture,ut),ve.setOptional(A,N,"batchingIdTexture"),ve.setValue(A,"batchingIdTexture",N._indirectTexture,ut),ve.setOptional(A,N,"batchingColorTexture"),N._colorsTexture!==null&&ve.setValue(A,"batchingColorTexture",N._colorsTexture,ut));const Ke=B.morphAttributes;if((Ke.position!==void 0||Ke.normal!==void 0||Ke.color!==void 0)&&st.update(N,B,He),(Ge||Nt.receiveShadow!==N.receiveShadow)&&(Nt.receiveShadow=N.receiveShadow,ve.setValue(A,"receiveShadow",N.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&($e.envMap.value=yt,$e.flipEnvMap.value=yt.isCubeTexture&&yt.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&U.environment!==null&&($e.envMapIntensity.value=U.environmentIntensity),Ge&&(ve.setValue(A,"toneMappingExposure",x.toneMappingExposure),Nt.needsLights&&yh($e,qi),at&&z.fog===!0&&Q.refreshFogUniforms($e,at),Q.refreshMaterialUniforms($e,z,V,J,p.state.transmissionRenderTarget[y.id]),mr.upload(A,Xo(Nt),$e,ut)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(mr.upload(A,Xo(Nt),$e,ut),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&ve.setValue(A,"center",N.center),ve.setValue(A,"modelViewMatrix",N.modelViewMatrix),ve.setValue(A,"normalMatrix",N.normalMatrix),ve.setValue(A,"modelMatrix",N.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const Le=z.uniformsGroups;for(let ze=0,Lr=Le.length;ze<Lr;ze++){const Yn=Le[ze];Wt.update(Yn,He),Wt.bind(Yn,He)}}return He}function yh(y,U){y.ambientLightColor.needsUpdate=U,y.lightProbe.needsUpdate=U,y.directionalLights.needsUpdate=U,y.directionalLightShadows.needsUpdate=U,y.pointLights.needsUpdate=U,y.pointLightShadows.needsUpdate=U,y.spotLights.needsUpdate=U,y.spotLightShadows.needsUpdate=U,y.rectAreaLights.needsUpdate=U,y.hemisphereLights.needsUpdate=U}function Mh(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(y,U,B){const z=nt.get(y);z.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),nt.get(y.texture).__webglTexture=U,nt.get(y.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:B,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,U){const B=nt.get(y);B.__webglFramebuffer=U,B.__useDefaultFramebuffer=U===void 0};const Sh=A.createFramebuffer();this.setRenderTarget=function(y,U=0,B=0){I=y,w=U,P=B;let z=!0,N=null,at=!1,gt=!1;if(y){const yt=nt.get(y);if(yt.__useDefaultFramebuffer!==void 0)$.bindFramebuffer(A.FRAMEBUFFER,null),z=!1;else if(yt.__webglFramebuffer===void 0)ut.setupRenderTarget(y);else if(yt.__hasExternalTextures)ut.rebindTextures(y,nt.get(y.texture).__webglTexture,nt.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const Ut=y.depthTexture;if(yt.__boundDepthTexture!==Ut){if(Ut!==null&&nt.has(Ut)&&(y.width!==Ut.image.width||y.height!==Ut.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ut.setupDepthRenderbuffer(y)}}const Ft=y.texture;(Ft.isData3DTexture||Ft.isDataArrayTexture||Ft.isCompressedArrayTexture)&&(gt=!0);const zt=nt.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(zt[U])?N=zt[U][B]:N=zt[U],at=!0):y.samples>0&&ut.useMultisampledRTT(y)===!1?N=nt.get(y).__webglMultisampledFramebuffer:Array.isArray(zt)?N=zt[B]:N=zt,L.copy(y.viewport),O.copy(y.scissor),k=y.scissorTest}else L.copy(St).multiplyScalar(V).floor(),O.copy(Vt).multiplyScalar(V).floor(),k=Zt;if(B!==0&&(N=Sh),$.bindFramebuffer(A.FRAMEBUFFER,N)&&z&&$.drawBuffers(y,N),$.viewport(L),$.scissor(O),$.setScissorTest(k),at){const yt=nt.get(y.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_CUBE_MAP_POSITIVE_X+U,yt.__webglTexture,B)}else if(gt){const yt=U;for(let Ft=0;Ft<y.textures.length;Ft++){const zt=nt.get(y.textures[Ft]);A.framebufferTextureLayer(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0+Ft,zt.__webglTexture,B,yt)}}else if(y!==null&&B!==0){const yt=nt.get(y.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,yt.__webglTexture,B)}b=-1},this.readRenderTargetPixels=function(y,U,B,z,N,at,gt,Tt=0){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let yt=nt.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&gt!==void 0&&(yt=yt[gt]),yt){$.bindFramebuffer(A.FRAMEBUFFER,yt);try{const Ft=y.textures[Tt],zt=Ft.format,Ut=Ft.type;if(!K.textureFormatReadable(zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!K.textureTypeReadable(Ut)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=y.width-z&&B>=0&&B<=y.height-N&&(y.textures.length>1&&A.readBuffer(A.COLOR_ATTACHMENT0+Tt),A.readPixels(U,B,z,N,It.convert(zt),It.convert(Ut),at))}finally{const Ft=I!==null?nt.get(I).__webglFramebuffer:null;$.bindFramebuffer(A.FRAMEBUFFER,Ft)}}},this.readRenderTargetPixelsAsync=async function(y,U,B,z,N,at,gt,Tt=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let yt=nt.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&gt!==void 0&&(yt=yt[gt]),yt)if(U>=0&&U<=y.width-z&&B>=0&&B<=y.height-N){$.bindFramebuffer(A.FRAMEBUFFER,yt);const Ft=y.textures[Tt],zt=Ft.format,Ut=Ft.type;if(!K.textureFormatReadable(zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!K.textureTypeReadable(Ut))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const jt=A.createBuffer();A.bindBuffer(A.PIXEL_PACK_BUFFER,jt),A.bufferData(A.PIXEL_PACK_BUFFER,at.byteLength,A.STREAM_READ),y.textures.length>1&&A.readBuffer(A.COLOR_ATTACHMENT0+Tt),A.readPixels(U,B,z,N,It.convert(zt),It.convert(Ut),0);const ae=I!==null?nt.get(I).__webglFramebuffer:null;$.bindFramebuffer(A.FRAMEBUFFER,ae);const xe=A.fenceSync(A.SYNC_GPU_COMMANDS_COMPLETE,0);return A.flush(),await zu(A,xe,4),A.bindBuffer(A.PIXEL_PACK_BUFFER,jt),A.getBufferSubData(A.PIXEL_PACK_BUFFER,0,at),A.deleteBuffer(jt),A.deleteSync(xe),at}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,U=null,B=0){const z=Math.pow(2,-B),N=Math.floor(y.image.width*z),at=Math.floor(y.image.height*z),gt=U!==null?U.x:0,Tt=U!==null?U.y:0;ut.setTexture2D(y,0),A.copyTexSubImage2D(A.TEXTURE_2D,B,0,0,gt,Tt,N,at),$.unbindTexture()};const bh=A.createFramebuffer(),Eh=A.createFramebuffer();this.copyTextureToTexture=function(y,U,B=null,z=null,N=0,at=null){at===null&&(N!==0?(Ms("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),at=N,N=0):at=0);let gt,Tt,yt,Ft,zt,Ut,jt,ae,xe;const pe=y.isCompressedTexture?y.mipmaps[at]:y.image;if(B!==null)gt=B.max.x-B.min.x,Tt=B.max.y-B.min.y,yt=B.isBox3?B.max.z-B.min.z:1,Ft=B.min.x,zt=B.min.y,Ut=B.isBox3?B.min.z:0;else{const Ke=Math.pow(2,-N);gt=Math.floor(pe.width*Ke),Tt=Math.floor(pe.height*Ke),y.isDataArrayTexture?yt=pe.depth:y.isData3DTexture?yt=Math.floor(pe.depth*Ke):yt=1,Ft=0,zt=0,Ut=0}z!==null?(jt=z.x,ae=z.y,xe=z.z):(jt=0,ae=0,xe=0);const ue=It.convert(U.format),Nt=It.convert(U.type);let ge;U.isData3DTexture?(ut.setTexture3D(U,0),ge=A.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(ut.setTexture2DArray(U,0),ge=A.TEXTURE_2D_ARRAY):(ut.setTexture2D(U,0),ge=A.TEXTURE_2D),A.pixelStorei(A.UNPACK_FLIP_Y_WEBGL,U.flipY),A.pixelStorei(A.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),A.pixelStorei(A.UNPACK_ALIGNMENT,U.unpackAlignment);const Qt=A.getParameter(A.UNPACK_ROW_LENGTH),He=A.getParameter(A.UNPACK_IMAGE_HEIGHT),ui=A.getParameter(A.UNPACK_SKIP_PIXELS),Ge=A.getParameter(A.UNPACK_SKIP_ROWS),qi=A.getParameter(A.UNPACK_SKIP_IMAGES);A.pixelStorei(A.UNPACK_ROW_LENGTH,pe.width),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,pe.height),A.pixelStorei(A.UNPACK_SKIP_PIXELS,Ft),A.pixelStorei(A.UNPACK_SKIP_ROWS,zt),A.pixelStorei(A.UNPACK_SKIP_IMAGES,Ut);const ve=y.isDataArrayTexture||y.isData3DTexture,$e=U.isDataArrayTexture||U.isData3DTexture;if(y.isDepthTexture){const Ke=nt.get(y),Le=nt.get(U),ze=nt.get(Ke.__renderTarget),Lr=nt.get(Le.__renderTarget);$.bindFramebuffer(A.READ_FRAMEBUFFER,ze.__webglFramebuffer),$.bindFramebuffer(A.DRAW_FRAMEBUFFER,Lr.__webglFramebuffer);for(let Yn=0;Yn<yt;Yn++)ve&&(A.framebufferTextureLayer(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,nt.get(y).__webglTexture,N,Ut+Yn),A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,nt.get(U).__webglTexture,at,xe+Yn)),A.blitFramebuffer(Ft,zt,gt,Tt,jt,ae,gt,Tt,A.DEPTH_BUFFER_BIT,A.NEAREST);$.bindFramebuffer(A.READ_FRAMEBUFFER,null),$.bindFramebuffer(A.DRAW_FRAMEBUFFER,null)}else if(N!==0||y.isRenderTargetTexture||nt.has(y)){const Ke=nt.get(y),Le=nt.get(U);$.bindFramebuffer(A.READ_FRAMEBUFFER,bh),$.bindFramebuffer(A.DRAW_FRAMEBUFFER,Eh);for(let ze=0;ze<yt;ze++)ve?A.framebufferTextureLayer(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,Ke.__webglTexture,N,Ut+ze):A.framebufferTexture2D(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,Ke.__webglTexture,N),$e?A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,Le.__webglTexture,at,xe+ze):A.framebufferTexture2D(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,Le.__webglTexture,at),N!==0?A.blitFramebuffer(Ft,zt,gt,Tt,jt,ae,gt,Tt,A.COLOR_BUFFER_BIT,A.NEAREST):$e?A.copyTexSubImage3D(ge,at,jt,ae,xe+ze,Ft,zt,gt,Tt):A.copyTexSubImage2D(ge,at,jt,ae,Ft,zt,gt,Tt);$.bindFramebuffer(A.READ_FRAMEBUFFER,null),$.bindFramebuffer(A.DRAW_FRAMEBUFFER,null)}else $e?y.isDataTexture||y.isData3DTexture?A.texSubImage3D(ge,at,jt,ae,xe,gt,Tt,yt,ue,Nt,pe.data):U.isCompressedArrayTexture?A.compressedTexSubImage3D(ge,at,jt,ae,xe,gt,Tt,yt,ue,pe.data):A.texSubImage3D(ge,at,jt,ae,xe,gt,Tt,yt,ue,Nt,pe):y.isDataTexture?A.texSubImage2D(A.TEXTURE_2D,at,jt,ae,gt,Tt,ue,Nt,pe.data):y.isCompressedTexture?A.compressedTexSubImage2D(A.TEXTURE_2D,at,jt,ae,pe.width,pe.height,ue,pe.data):A.texSubImage2D(A.TEXTURE_2D,at,jt,ae,gt,Tt,ue,Nt,pe);A.pixelStorei(A.UNPACK_ROW_LENGTH,Qt),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,He),A.pixelStorei(A.UNPACK_SKIP_PIXELS,ui),A.pixelStorei(A.UNPACK_SKIP_ROWS,Ge),A.pixelStorei(A.UNPACK_SKIP_IMAGES,qi),at===0&&U.generateMipmaps&&A.generateMipmap(ge),$.unbindTexture()},this.initRenderTarget=function(y){nt.get(y).__webglFramebuffer===void 0&&ut.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?ut.setTextureCube(y,0):y.isData3DTexture?ut.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?ut.setTexture2DArray(y,0):ut.setTexture2D(y,0),$.unbindTexture()},this.resetState=function(){w=0,P=0,I=null,$.reset(),mt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return pn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=ee._getDrawingBufferColorSpace(t),e.unpackColorSpace=ee._getUnpackColorSpace()}}const rs=new C;function Ze(i,t,e,n,s,r){const a=2*Math.PI*s/4,o=Math.max(r-2*s,0),l=Math.PI/4;rs.copy(t),rs[n]=0,rs.normalize();const c=.5*a/(a+o),h=1-rs.angleTo(i)/l;return Math.sign(rs[e])===1?h*c:o/(a+o)+c+c*(1-h)}class Bo extends Pn{constructor(t=1,e=1,n=1,s=2,r=.1){const a=s*2+1;if(r=Math.min(t/2,e/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:n,segments:s,radius:r},a===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const l=new C,c=new C,h=new C(t,e,n).divideScalar(2).subScalar(r),u=this.attributes.position.array,f=this.attributes.normal.array,d=this.attributes.uv.array,g=u.length/6,v=new C,m=.5/a;for(let p=0,E=0;p<u.length;p+=3,E+=2)switch(l.fromArray(u,p),c.copy(l),c.x-=Math.sign(c.x)*m,c.y-=Math.sign(c.y)*m,c.z-=Math.sign(c.z)*m,c.normalize(),u[p+0]=h.x*Math.sign(l.x)+c.x*r,u[p+1]=h.y*Math.sign(l.y)+c.y*r,u[p+2]=h.z*Math.sign(l.z)+c.z*r,f[p+0]=c.x,f[p+1]=c.y,f[p+2]=c.z,Math.floor(p/g)){case 0:v.set(1,0,0),d[E+0]=Ze(v,c,"z","y",r,n),d[E+1]=1-Ze(v,c,"y","z",r,e);break;case 1:v.set(-1,0,0),d[E+0]=1-Ze(v,c,"z","y",r,n),d[E+1]=1-Ze(v,c,"y","z",r,e);break;case 2:v.set(0,1,0),d[E+0]=1-Ze(v,c,"x","z",r,t),d[E+1]=Ze(v,c,"z","x",r,n);break;case 3:v.set(0,-1,0),d[E+0]=1-Ze(v,c,"x","z",r,t),d[E+1]=1-Ze(v,c,"z","x",r,n);break;case 4:v.set(0,0,1),d[E+0]=1-Ze(v,c,"x","y",r,t),d[E+1]=1-Ze(v,c,"y","x",r,e);break;case 5:v.set(0,0,-1),d[E+0]=Ze(v,c,"x","y",r,t),d[E+1]=1-Ze(v,c,"y","x",r,e);break}}static fromJSON(t){return new Bo(t.width,t.height,t.depth,t.segments,t.radius)}}function gn(i,t,e,n=[1,1]){const s=document.createElement("canvas");s.width=i,s.height=t,e(s.getContext("2d"),i,t);const r=new Vc(s);return r.colorSpace=Fe,r.wrapS=r.wrapT=gr,r.repeat.set(...n),r.anisotropy=4,r}function Rr(i){return()=>(i=i*1664525+1013904223>>>0,i/4294967296)}function lh(){return gn(512,256,(i,t,e)=>{const n=Rr(37);i.fillStyle="#8f6245",i.fillRect(0,0,t,e);for(let s=0;s<650;s++){const r=n()*e,a=2+n()*8;i.strokeStyle=s%3?"rgba(35,15,7,.12)":"rgba(236,190,131,.14)",i.lineWidth=.3+n()*1.5,i.beginPath(),i.moveTo(0,r),i.bezierCurveTo(t*.3,r-a,t*.65,r+a,t,r+1),i.stroke()}})}function W0(){return gn(128,128,(i,t,e)=>{const n=Rr(19);i.fillStyle="#e3e9e2",i.fillRect(0,0,t,e);for(let s=0;s<e;s+=2)i.fillStyle="rgba(255,255,255,.16)",i.fillRect(0,s,t,1);for(let s=0;s<6500;s++)i.fillStyle=s%2?"rgba(0,0,0,.045)":"rgba(255,255,255,.09)",i.fillRect(n()*t,n()*e,1,1)},[18,9])}function X0(){return gn(1024,1024,(i,t,e)=>{const n=Rr(63),s=64;i.fillStyle="#1b1714",i.fillRect(0,0,t,e);for(let r=0;r<16;r++)for(let a=-1;a<4;a++){const o=a*320+r%3*106,l=r*s,c=19+n()*8;i.fillStyle=`hsl(28, 25%, ${c}%)`,i.fillRect(o+1,l+1,318,s-2);for(let h=0;h<32;h++){i.strokeStyle=h%3?"rgba(7,5,3,.13)":"rgba(209,162,109,.09)";const u=l+n()*s;i.beginPath(),i.moveTo(o,u),i.bezierCurveTo(o+95,u-2,o+240,u+2,o+320,u),i.stroke()}}},[4,4])}function q0(){return gn(1024,640,(i,t,e)=>{const n=Rr(87);i.fillStyle="#1b302e",i.fillRect(0,0,t,e);for(let r=0;r<3e4;r++)i.fillStyle=r%2?"#ffffff08":"#0000000e",i.fillRect(n()*t,n()*e,1,2);for(const[r,a,o]of[[19,"#7c6747",3],[28,"#64715b",1],[45,"#82704e",2],[51,"#82704e",1]])i.strokeStyle=a,i.lineWidth=o,i.strokeRect(r,r,t-r*2,e-r*2);i.fillStyle="#9c8254";const s=(r,a)=>{i.beginPath(),i.moveTo(r,a-4),i.lineTo(r+3,a),i.lineTo(r,a+4),i.lineTo(r-3,a),i.closePath(),i.fill()};for(let r=66;r<t-55;r+=22)s(r,37),s(r,e-37);for(let r=65;r<e-55;r+=22)s(37,r),s(t-37,r)})}function Y0(){return gn(128,128,(i,t,e)=>{const n=i.createRadialGradient(t/2,e/2,10,t/2,e/2,t/2);n.addColorStop(0,"rgba(0,0,0,.65)"),n.addColorStop(.5,"rgba(0,0,0,.38)"),n.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=n,i.fillRect(0,0,t,e)})}function ch(i){const t=new Set,e=new Set,n=new Set;i.traverse(s=>{s.geometry&&t.add(s.geometry);for(const r of s.material?Array.isArray(s.material)?s.material:[s.material]:[]){e.add(r);for(const a of Object.values(r))a?.isTexture&&n.add(a)}}),t.forEach(s=>s.dispose()),e.forEach(s=>s.dispose()),n.forEach(s=>s.dispose()),i.removeFromParent()}function be(i,t,e,n,s=0,r=0,a=0,o=!1){const l=new Ot(o?new Bo(i,t,e,2,Math.min(t/3,.055)):new Pn(i,t,e),n);return l.position.set(s,r,a),l.castShadow=!0,l.receiveShadow=!0,l}class $0{constructor(t){this.scene=t,this.group=new ke,this.group.name="Walnut tournament table",t.add(this.group);const e=W0(),n=lh();this.cloth=new me({color:"#087f75",map:e,bumpMap:e,bumpScale:.0015,roughness:.94}),this.cushionMaterial=new me({color:"#09695f",map:e,roughness:.88}),this.woodMaterial=new me({color:"#b69979",map:n,roughness:.28,metalness:.08}),this.apronMaterial=new me({color:"#785943",map:n,roughness:.43}),this.brass=new me({color:"#c4a775",roughness:.28,metalness:.75}),this.dark=new me({color:"#15241e",roughness:.54}),this.leather=new me({color:"#231c16",roughness:.86}),this.build(),this.setMode(!0)}build(){const t=this.group;t.add(be(6.46,.22,3.66,this.woodMaterial,0,-.135,0,!0)),t.add(be(6.32,.028,3.52,this.brass,0,-.258,0,!0)),t.add(be(6.2,.31,3.42,this.apronMaterial,0,-.41,0,!0)),t.add(be(6.23,.042,3.45,this.dark,0,-.58,0,!0));for(const a of[-1,1]){for(const o of[-1.65,1.65])t.add(be(2.35,.18,.017,this.dark,o,-.405,a*1.717)),t.add(be(2.36,.009,.019,this.brass,o,-.5,a*1.72));t.add(be(.017,.18,2.5,this.dark,a*3.11,-.405,0)),t.add(be(.019,.009,2.51,this.brass,a*3.112,-.5,0))}const e=new Ot(new Je(Et.width,Et.height),this.cloth);e.rotation.x=-Math.PI/2,e.receiveShadow=!0,e.position.y=.003,t.add(e);for(const a of[-2.3,2.3])for(const o of[-1.1,1.1]){t.add(be(.4,.13,.4,this.dark,a,-.61,o,!0));const l=new Ot(new sn(.23,.16,.43,4),this.apronMaterial);l.rotation.y=Math.PI/4,l.position.set(a,-.865,o),l.castShadow=!0,t.add(l),t.add(be(.28,.055,.28,this.brass,a,-1.062,o,!0))}t.add(be(4.7,.12,.14,this.apronMaterial,0,-.88,0,!0));for(const a of[-2.3,2.3])t.add(be(.15,.12,2.25,this.apronMaterial,a,-.88,0,!0));const n=new No(.033,0);for(const a of[-1,1]){for(const o of[-2.1,-1.4,-.7,.7,1.4,2.1]){const l=new Ot(n,this.brass);l.scale.y=.13,l.rotation.y=Math.PI/4,l.position.set(o,.089,a*1.655),t.add(l)}for(const o of[-.7,0,.7]){const l=new Ot(n,this.brass);l.scale.y=.13,l.rotation.y=Math.PI/4,l.position.set(a*3.065,.089,o),t.add(l)}}const s=new Xe({color:"#d3e8ce",transparent:!0,opacity:.38,depthWrite:!1});for(const a of[-1.4,1.4]){const o=new Ot(new As(.012,.02,20),s);o.rotation.x=-Math.PI/2,o.position.set(a,.007,0),t.add(o)}const r=new Se().setFromPoints([new C(-1.4,.007,-1.37),new C(-1.4,.007,1.37)]);t.add(new pr(r,new Po({color:"#d1e1c9",transparent:!0,opacity:.09}))),this.buildBadge(),this.rails=new ke,t.add(this.rails),this.poolRails=this.buildRails(!0),this.caromRails=this.buildRails(!1),this.rails.add(this.poolRails,this.caromRails),this.buildPockets()}buildBadge(){const t=gn(512,128,(n,s,r)=>{n.fillStyle="#aa8e58",n.fillRect(0,0,s,r),n.strokeStyle="#463a26",n.lineWidth=2,n.strokeRect(7,7,s-14,r-14),n.fillStyle="#2c3026",n.font="italic 59px Georgia",n.textAlign="center",n.fillText("velvet",s/2,75),n.font="11px Georgia",n.fillText("T O U R N A M E N T   S E R I E S",s/2,102)}),e=new Ot(new Je(.58,.145),new me({map:t,metalness:.35,roughness:.4}));e.position.set(0,-.405,1.724),this.group.add(e)}cushion(t,e){const n=new jc;e.forEach(([a,o],l)=>l?n.lineTo(a,-o):n.moveTo(a,-o)),n.closePath();const s=new Uo(n,{depth:.07,bevelEnabled:!0,bevelSegments:1,steps:1,bevelSize:.012,bevelThickness:.012}),r=new Ot(s,this.cushionMaterial);r.rotation.x=-Math.PI/2,r.position.y=-.008,r.castShadow=!0,r.receiveShadow=!0,t.add(r)}buildRails(t){const e=new ke,n=t?[[-2.65,-.16],[.16,2.65]]:[[-2.82,2.82]];for(const s of[-1,1]){for(const[o,l]of n){const c=t?.065:0;this.cushion(e,[[o+c,s*1.4],[l-c,s*1.4],[l,s*1.535],[o,s*1.535]]),e.add(be(l-o+.06,.105,.25,this.woodMaterial,(o+l)/2,.027,s*1.67,!0)),e.add(be(l-o-.07,.007,.008,this.brass,(o+l)/2,.081,s*1.78))}const r=t?1.21:1.4,a=t?.075:0;this.cushion(e,[[s*2.8,-r+a],[s*2.8,r-a],[s*2.935,r],[s*2.935,-r]]),e.add(be(.25,.105,t?2.65:2.85,this.woodMaterial,s*3.07,.027,0,!0)),e.add(be(.008,.007,t?2.57:2.77,this.brass,s*3.18,.081,0));for(const o of[-2.98,2.98])e.add(be(.45,.105,.34,this.woodMaterial,o,.027,s*1.63,!0));t&&e.add(be(.27,.105,.22,this.leather,0,.027,s*1.69,!0))}return e}buildPockets(){this.pocketGroup=new ke,this.group.add(this.pocketGroup);const t=new Er(Et.pocketRadius*1.13,40),e=new Xe({color:"#030908"}),n=new wr(Et.pocketRadius*1.16,.024,8,40),s=new sn(.15,.11,.28,20);Ae.forEach((r,a)=>{const o=new Ot(t,e);o.rotation.x=-Math.PI/2,o.position.set(r.x,.082,r.z),this.pocketGroup.add(o);const l=new Ot(n,this.leather);l.rotation.x=-Math.PI/2,l.position.set(r.x,.067,r.z),this.pocketGroup.add(l);const c=new Ot(s,this.leather);c.position.set(r.x,-.31,r.z),this.pocketGroup.add(c);const h=be(.29,.018,.14,this.brass,r.x+(r.x?Math.sign(r.x)*.18:0),.084,r.z+Math.sign(r.z)*.26,!0);r.x&&(h.rotation.y=-Math.sign(r.x*r.z)*Math.PI/4),this.pocketGroup.add(h);const u=gn(64,64,d=>{d.fillStyle="#e0c694",d.font="500 30px Georgia",d.textAlign="center",d.textBaseline="middle",d.fillText(String(a+1),32,32)}),f=new ud(new Hc({map:u,transparent:!0,opacity:.82,depthTest:!1}));f.scale.setScalar(.12),f.position.set(r.x+(r.x?Math.sign(r.x)*.09:0),.19,r.z+Math.sign(r.z)*.27),this.pocketGroup.add(f)})}setMode(t){this.pockets=t,this.pocketGroup.visible=t,this.poolRails.visible=t,this.caromRails.visible=!t}setColor(t){this.cloth.color.set(t),this.cushionMaterial.color.set(t).multiplyScalar(.78)}dispose(){ch(this.group)}}function K0(i,t=!1){const e=document.createElement("canvas");e.width=512,e.height=256;const n=e.getContext("2d"),s=t?["#faf7e9","#e9b724","#d6483f"][i]:pc[i]||"#ffffff";if(n.fillStyle=s,n.fillRect(0,0,512,256),!t&&i>8&&(n.fillStyle="#f6f3e7",n.fillRect(0,0,512,63),n.fillRect(0,193,512,63)),!t&&i!==0)for(const a of[128,384])n.fillStyle="#fffdf2",n.beginPath(),n.ellipse(a,128,34,34,0,0,Math.PI*2),n.fill(),n.fillStyle="#172128",n.font="bold 45px Arial",n.textAlign="center",n.textBaseline="middle",n.fillText(String(i),a,130);const r=new Vc(e);return r.colorSpace=Fe,r.anisotropy=4,r}class j0{constructor(t){this.scene=t,this.meshes=new Map,this.geometry=new Tr(Et.radius,28,20),this.carom=!1,this.quality="medium",this.ballStyle="gloss",this.axis=new C,this.up=new C(0,1,0),this.cueHalo=new Ot(new As(Et.radius*1.18,Et.radius*1.3,40),new Xe({color:"#f8e5a6",transparent:!0,opacity:.65,depthWrite:!1})),this.cueHalo.rotation.x=-Math.PI/2,this.cueHalo.position.y=.012,t.add(this.cueHalo)}create(t){const e=new me({map:K0(t.id,this.carom),roughness:this.ballStyle==="classic"?.32:.17,metalness:.03}),n=new Ot(this.geometry,e);n.castShadow=!0,n.receiveShadow=!0,n.rotation.set(.45+t.id%3*.35,t.id%4*.4,0),n.position.set(t.x,Et.radius+.008,t.z),this.scene.add(n);const s={mesh:n,lastX:t.x,lastZ:t.z,sink:0,active:t.active!==!1};return this.meshes.set(t.id,s),s}sync(t,e,n){let s=!1;const r=new Set(t.map(o=>o.id));for(const[o,l]of this.meshes)r.has(o)||(this.remove(l),this.meshes.delete(o),s=!0);for(const o of t){this.meshes.has(o.id)||(s=!0);const l=this.meshes.get(o.id)||this.create(o),c=l.mesh,h=o.x-l.lastX,u=o.z-l.lastZ,f=Math.hypot(h,u);(f>0||l.active!==(o.active!==!1))&&(s=!0),f>1e-6&&f<.5&&(this.axis.set(u,0,-h).normalize(),c.rotateOnWorldAxis(this.axis,f/(o.radius||Et.radius))),l.lastX=o.x,l.lastZ=o.z,o.active===!1?(l.sink<1&&(s=!0),l.sink=Math.min(1,l.sink+n*2.5),c.position.set(o.x,Et.radius+.008-l.sink*.37,o.z),c.scale.setScalar(Math.max(.05,1-l.sink*.7)),c.visible=l.sink<1):(l.sink=0,c.visible=!0,c.scale.setScalar(1),c.position.set(o.x,(o.radius||Et.radius)+.008,o.z)),l.active=o.active!==!1}const a=t.find(o=>o.id===e&&o.active!==!1);return this.cueHalo.visible=!!a,a&&(this.cueHalo.position.x=a.x,this.cueHalo.position.z=a.z),s}setMode(t){this.carom!==t&&(this.carom=t,this.reset())}setStyle(t){this.ballStyle=t;for(const{mesh:e}of this.meshes.values())e.material.roughness=t==="classic"?.32:.17}reset(){for(const t of this.meshes.values())this.remove(t);this.meshes.clear()}remove({mesh:t}){this.scene.remove(t),t.material.map?.dispose(),t.material.dispose()}dispose(){this.reset(),this.geometry.dispose(),this.cueHalo.geometry.dispose(),this.cueHalo.material.dispose(),this.scene.remove(this.cueHalo)}}const lr=-1.1;class Z0{constructor(t){this.scene=t,this.group=new ke,this.group.name="Velvet billiards club",t.add(this.group),this.brass=new me({color:"#b19460",metalness:.72,roughness:.3}),this.dark=new me({color:"#13201d",roughness:.65}),this.walnut=new me({map:lh(),color:"#98785f",roughness:.54}),this.walls=[],this.buildFloor(),this.buildWalls(),this.buildPendant(),this.corner=new C,this.tableBounds=new Bl,this.lampBounds=new Bl,this.projected=new it}box(t,e,n,s,r,a,o,l){const c=new Ot(new Pn(e,n,s),r);return c.position.set(a,o,l),c.receiveShadow=!0,t.add(c),c}buildFloor(){const t=new Ot(new Je(36,36),new me({map:X0(),roughness:.74,color:"#c0ab95"}));t.rotation.x=-Math.PI/2,t.position.y=lr,t.receiveShadow=!0,this.group.add(t),this.floor=t;const e=new Ot(new Je(8.5,5.7),new me({map:q0(),roughness:1}));e.position.y=lr+.008,e.rotation.x=-Math.PI/2,e.receiveShadow=!0,this.group.add(e);const n=new Ot(new Je(8.4,5.2),new Xe({map:Y0(),transparent:!0,depthWrite:!1,opacity:.85}));n.rotation.x=-Math.PI/2,n.position.y=lr+.012,this.group.add(n)}buildWalls(){const t=new me({color:"#1e3732",roughness:.96});for(const[e,n,s]of[[0,3.8,12.6],[Math.PI,5.4,12.6],[Math.PI/2,6.3,9.2],[-Math.PI/2,6.3,9.2]]){const r=new ke;r.rotation.y=e,r.position.set(-Math.sin(e)*n,0,-Math.cos(e)*n),this.group.add(r),this.walls.push(r),this.box(r,s,4.6,.16,t,0,1.2,-.08),this.box(r,s,1.1,.13,this.walnut,0,-.55,.06),this.box(r,s,.11,.2,this.dark,0,lr+.055,.12),this.box(r,s,.09,.19,this.walnut,0,.03,.12),this.box(r,s,.012,.2,this.brass,0,.09,.13);const a=Math.floor(s/1.25);for(let o=1;o<a;o++)this.box(r,.035,.95,.035,this.dark,(o/a-.5)*s,-.52,.14);for(const o of[-3.3,3.3])this.sconce(r,o);e===0&&(this.sign(r),this.cueRack(r,-4.7),this.framedArt(r,4.7))}}sconce(t,e){this.box(t,.13,.65,.07,this.brass,e,1.17,.14);const n=new Xe({color:"#ffe4a6"});this.box(t,.065,.42,.09,n,e,1.2,.2);const s=gn(128,256,(a,o,l)=>{const c=a.createRadialGradient(o/2,l/2,0,o/2,l/2,o/2);c.addColorStop(0,"#edb56345"),c.addColorStop(1,"#edb56300"),a.fillStyle=c,a.scale(1,2),a.fillRect(0,0,o,l/2)}),r=new Ot(new Je(1.1,2.2),new Xe({map:s,transparent:!0,depthWrite:!1,blending:ga}));r.position.set(e,1.2,.015),t.add(r)}sign(t){const e=gn(1024,384,(s,r,a)=>{s.fillStyle="#112b26",s.fillRect(0,0,r,a),s.strokeStyle="#9a8054",s.lineWidth=2,s.strokeRect(14,14,r-28,a-28),s.textAlign="center",s.fillStyle="#ddc797",s.font="italic 150px Georgia",s.fillText("velvet",r/2,210),s.fillStyle="#b8a783",s.font="22px Georgia",s.fillText("B I L L I A R D S   C L U B",r/2,275),s.strokeStyle="#9a8054",s.beginPath(),s.moveTo(210,308),s.lineTo(814,308),s.stroke()});this.box(t,3.15,1.19,.06,this.brass,0,.9,.12);const n=new Ot(new Je(3.06,1.1),new Xe({map:e}));n.position.set(0,.9,.156),t.add(n)}cueRack(t,e){const n=new ke;n.position.set(e,0,.2),t.add(n);const s=new me({color:"#c1a16d",roughness:.5});for(const r of[-.89,.39,1.17])this.box(n,1.12,.065,.15,this.walnut,0,r,.03);for(let r=0;r<6;r++){const a=new Ot(new sn(.013,.022,1.37,8),s);a.position.set(-.43+r*.17,.71,.04),n.add(a);const o=new Ot(new sn(.022,.027,.94,8),this.dark);o.position.set(a.position.x,-.445,.04),n.add(o)}n.name="House cue rack"}framedArt(t,e){const n=gn(256,384,(r,a,o)=>{r.fillStyle="#142723",r.fillRect(0,0,a,o),r.strokeStyle="#bfa36f",r.lineWidth=1.5,r.strokeRect(20,20,a-40,o-40),r.beginPath(),r.moveTo(55,250),r.lineTo(176,75),r.lineTo(187,278),r.stroke();for(const[l,c,h]of[[55,250,13],[176,75,8],[187,278,16]])r.fillStyle="#c8b382",r.beginPath(),r.arc(l,c,h,0,Math.PI*2),r.fill();r.font="12px Georgia",r.textAlign="center",r.fillText("THE ART OF ANGLES",a/2,328)});this.box(t,1.02,1.5,.045,this.brass,e,1.16,.1);const s=new Ot(new Je(.95,1.43),new Xe({map:n}));s.position.set(e,1.16,.126),t.add(s)}buildPendant(){const t=this.pendant=new ke;t.name="Brass and green billiard lamps",this.group.add(t);const e=new me({color:"#183c30",metalness:.32,roughness:.3,side:un}),n=new Xe({color:"#ffe8b4"}),s=new Ot(new sn(.022,.022,4.4,10),this.brass);s.rotation.z=Math.PI/2,s.position.set(0,2.5,-2.15),t.add(s);for(const a of[-1.65,0,1.65]){const o=new Ot(new sn(.105,.43,.28,32,1,!0),e);o.position.set(a,2.04,-2.15),t.add(o);const l=new Ot(new wr(.43,.013,6,32),this.brass);l.rotation.x=Math.PI/2,l.position.set(a,1.9,-2.15),t.add(l);const c=new Ot(new Er(.405,32),n);c.rotation.x=Math.PI/2,c.position.set(a,1.905,-2.15),t.add(c);const h=new Ot(new sn(.014,.014,.32,8),this.brass);h.position.set(a,2.34,-2.15),t.add(h)}const r=new me({color:"#151c18",roughness:.75});for(const a of[-1.5,1.5]){const o=new Ot(new sn(.009,.009,1.4,6),r);o.position.set(a,3.2,-2.15),t.add(o)}}setCamera(t,e){for(const r of this.walls){const a=Math.sin(r.rotation.y),o=Math.cos(r.rotation.y);r.visible=t.position.x*a+t.position.z*o>-.05}const n=this.tableBounds.makeEmpty(),s=this.lampBounds.makeEmpty();for(const r of[-3.22,3.22])for(const a of[-1.8,1.8])this.corner.set(r,.12,a).project(t),n.expandByPoint(this.projected.set(this.corner.x,this.corner.y));for(const r of[-2.2,2.2])for(const a of[1.88,3.9])for(const o of[-2.6,-1.7])this.corner.set(r,a,o).project(t),s.expandByPoint(this.projected.set(this.corner.x,this.corner.y));this.pendant.visible=e!=="top"&&!n.intersectsBox(s)}setQuality(t){for(const e of this.walls)for(const n of e.children)n.name==="House cue rack"&&(n.visible=t!=="low")}dispose(){ch(this.group)}}class J0 extends kc{constructor(){super();const t=new Pn;t.deleteAttribute("uv");const e=new me({side:Oe}),n=new me,s=new nf(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new Ot(t,e);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const a=new pd(t,n,6),o=new Me;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);const l=new Ot(t,Li(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);const c=new Ot(t,Li(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);const h=new Ot(t,Li(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);const u=new Ot(t,Li(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);const f=new Ot(t,Li(20));f.position.set(3.235,11.486,-12.541),f.scale.set(2.5,2,.1),this.add(f);const d=new Ot(t,Li(100));d.position.set(0,20,0),d.scale.set(1,.1,1),this.add(d)}dispose(){const t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(const e of t)e.dispose()}}function Li(i){return new Zd({color:0,emissive:16777215,emissiveIntensity:i})}class Q0{constructor(t,e={}){this.container=t,this.callbacks=e,this.dirty=!0,this.scene=new kc,this.renderer=new V0({antialias:!0,alpha:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.75)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Mc,this.renderer.outputColorSpace=Fe,this.renderer.toneMapping=Sc,this.renderer.toneMappingExposure=1.05,this.canvas=this.renderer.domElement,this.canvas.setAttribute("aria-label","Interactive 3D billiards table"),this.canvas.style.touchAction="none",t.append(this.canvas),this.camera=new qe(38,1,.05,60),this.target=new C(0,.12,0),this.azimuth=0,this.elevation=.74,this.zoomLevel=1,this.sensitivity=1,this.view="angle",this.aimGuide=!0,this.showAim=!0,this.power=.4,this.angle=0,this.balls=[],this.cueId=0,this.lastTime=performance.now(),this.shooting=0,this.raycaster=new af,this.pointer=new it,this.plane=new Bn(new C(0,1,0),0),this.intersection=new C,this.setupLights(),this.environment=new Z0(this.scene),this.floor=this.environment.floor,this.table=new $0(this.scene),this.ballRenderer=new j0(this.scene),this.buildCue(),this.buildGuide(),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(t),this.resize()}setupLights(){this.scene.background=new $t("#15231f"),this.scene.fog=new Ro("#15231f",16,34),this.scene.add(new tf("#f5e8d3","#283b32",.85));const t=new Ul("#fff0d4",2.7);t.position.set(-1.8,6,1.2),t.castShadow=!0,t.shadow.mapSize.set(1024,1024),Object.assign(t.shadow.camera,{left:-4,right:4,top:3,bottom:-3,near:1,far:15}),t.shadow.bias=-4e-4,t.shadow.normalBias=.018,t.shadow.radius=3,this.scene.add(t),this.keyLight=t;const e=new Ul("#cbe7ee",.65);e.position.set(4,3,-4),this.scene.add(e);const n=new lo(this.renderer),s=new J0;this.reflections=n.fromScene(s,.04),this.scene.environment=this.reflections.texture,this.scene.environmentIntensity=.38,s.dispose(),n.dispose()}buildCue(){this.cue=new ke,this.scene.add(this.cue);const t=new me({color:"#cfab70",roughness:.42}),e=new me({color:"#38332c",roughness:.3}),n=new me({color:"#f5e9c8",roughness:.3}),s=new me({color:"#7fa8a1",roughness:.85}),r=(a,o,l,c,h)=>{const u=new Ot(new sn(a,o,l,12),h);return u.rotation.z=Math.PI/2,u.position.set(c,.055,0),u.castShadow=!0,this.cue.add(u),u};r(.012,.022,.92,-.66,t),r(.022,.031,.58,-1.41,e),r(.012,.012,.055,-.172,n),this.cueTip=r(.013,.013,.016,-.136,s)}buildGuide(){this.cueGapPositions=new Float32Array(6),this.cueGapGeometry=new Se,this.cueGapGeometry.setAttribute("position",new Be(this.cueGapPositions,3)),this.cueGapLine=new pr(this.cueGapGeometry,new oa({color:"#fff4ce",dashSize:.025,gapSize:.018,transparent:!0,opacity:.85,depthTest:!1})),this.cueGapLine.frustumCulled=!1,this.cueGapLine.renderOrder=2,this.cueGapLine.visible=!1,this.cueGapStart=new C,this.scene.add(this.cueGapLine),this.guideGroup=new ke,this.scene.add(this.guideGroup),this.guideGeometry=new Se,this.guidePositions=new Float32Array(6),this.guideGeometry.setAttribute("position",new Be(this.guidePositions,3)),this.guideLine=new pr(this.guideGeometry,new oa({color:"#fff4ce",dashSize:.055,gapSize:.04,transparent:!0,opacity:.72,depthTest:!1})),this.guideLine.renderOrder=2,this.guideGroup.add(this.guideLine),this.objectGeometry=new Se,this.objectPositions=new Float32Array(6),this.objectGeometry.setAttribute("position",new Be(this.objectPositions,3)),this.objectLine=new pr(this.objectGeometry,new oa({color:"#ecce83",dashSize:.035,gapSize:.035,transparent:!0,opacity:.8,depthTest:!1})),this.objectLine.renderOrder=2,this.guideGroup.add(this.objectLine),this.ghost=new Ot(new Tr(Et.radius,20,12),new Xe({color:"#fff5d7",transparent:!0,opacity:.2,depthWrite:!1})),this.guideGroup.add(this.ghost),this.hitRing=new Ot(new As(Et.radius*1.1,Et.radius*1.18,30),new Xe({color:"#f3d88e",transparent:!0,opacity:.85,depthWrite:!1})),this.hitRing.rotation.x=-Math.PI/2,this.guideGroup.add(this.hitRing)}setMode(t){this.dirty=!0,this.table.setMode(t),this.ballRenderer.setMode(!t),this.pockets=t}sync(t,e,n=1/60){this.cueId!==e&&(this.dirty=!0),this.balls=t,this.cueId=e,this.ballRenderer.sync(t,e,Math.min(n,.1))&&(this.dirty=!0),this.updateAim()}setAim(t,e,n={},s=!0){(this.angle!==t||this.power!==e||this.showAim!==s||this.spin?.x!==n.x||this.spin?.y!==n.y)&&(this.dirty=!0),this.angle=t,this.power=e,this.spin=n,this.showAim&&!s&&(this.shooting=.22,this.shootOrigin=this.balls.find(r=>r.id===this.cueId),this.shootOrigin&&(this.shootOrigin={x:this.shootOrigin.x,z:this.shootOrigin.z})),this.showAim=s,this.updateAim()}updateAim(){const t=this.balls.find(u=>u.id===this.cueId&&u.active!==!1);if(this.guideGroup.visible=!!(t&&this.showAim&&this.aimGuide),this.cueGapLine.visible=!!(t&&this.showAim&&!this.aimGuide),this.cue.visible=!!(t&&this.showAim||this.shooting>0),this.ballRenderer.cueHalo.visible=!!(t&&this.showAim),!t)return;const e=Math.cos(this.angle),n=Math.sin(this.angle),s=.08+this.power*.34;if(this.showAim&&(this.cue.position.set(t.x-e*s,.014,t.z-n*s),this.cue.rotation.y=-this.angle),this.cueGapLine.visible){this.cueTip.localToWorld(this.cueGapStart.set(0,-this.cueTip.geometry.parameters.height/2,0));const u=t.radius||Et.radius;this.cueGapPositions.set([this.cueGapStart.x,this.cueGapStart.y,this.cueGapStart.z,t.x-e*u,u+.008,t.z-n*u]),this.cueGapGeometry.attributes.position.needsUpdate=!0,this.cueGapLine.computeLineDistances()}if(!this.guideGroup.visible)return;let r=1/0,a=null;for(const u of this.balls){if(u.id===t.id||u.active===!1)continue;const f=u.x-t.x,d=u.z-t.z,g=f*e+d*n;if(g<=0)continue;const v=f*f+d*d-g*g,m=(t.radius||Et.radius)+(u.radius||Et.radius);if(v>=m*m)continue;const p=g-Math.sqrt(Math.max(0,m*m-v));p>=0&&p<r&&(r=p,a=u)}const o=[e>0?(Et.halfWidth-Et.radius-t.x)/e:e<0?(-2.8+Et.radius-t.x)/e:1/0,n>0?(Et.halfHeight-Et.radius-t.z)/n:n<0?(-1.4+Et.radius-t.z)/n:1/0],l=Math.min(...o);l<r&&(r=l,a=null),r=Math.max(0,Math.min(r,7));const c=t.x+e*r,h=t.z+n*r;if(this.guidePositions.set([t.x,.02,t.z,c,.02,h]),this.guideGeometry.attributes.position.needsUpdate=!0,this.guideLine.computeLineDistances(),this.ghost.position.set(c,Et.radius+.01,h),this.ghost.visible=!!a,this.hitRing.visible=!!a,this.objectLine.visible=!0,a){const u=a.x-c,f=a.z-h,d=Math.hypot(u,f)||1;this.hitRing.position.set(a.x,.014,a.z),this.objectPositions.set([a.x,.02,a.z,a.x+u/d*.7,.02,a.z+f/d*.7])}else{let u=e,f=n;o[0]<o[1]?u=-u:f=-f,this.objectPositions.set([c,.02,h,c+u*.55,.02,h+f*.55])}this.objectGeometry.attributes.position.needsUpdate=!0,this.objectLine.computeLineDistances()}render(){const t=performance.now(),e=Math.min((t-this.lastTime)/1e3,.1);if(this.lastTime=t,this.shooting>0&&!this.showAim&&this.shootOrigin){this.dirty=!0,this.shooting-=e;const n=1-Math.max(0,this.shooting)/.22,s=n<.3?.3*(1-n/.3):.25*((n-.3)/.7);this.cue.position.set(this.shootOrigin.x-Math.cos(this.angle)*s,.014,this.shootOrigin.z-Math.sin(this.angle)*s),this.cue.rotation.y=-this.angle,this.cue.visible=this.shooting>0}this.dirty&&(this.renderer.render(this.scene,this.camera),this.dirty=!1)}screenToTable(t,e){const n=this.canvas.getBoundingClientRect();if(!n.width||!n.height)return null;this.pointer.set((t-n.left)/n.width*2-1,-((e-n.top)/n.height)*2+1),this.raycaster.setFromCamera(this.pointer,this.camera);const s=this.raycaster.ray.intersectPlane(this.plane,this.intersection);return s?{x:s.x,z:s.z}:null}resize(){const t=this.container.clientWidth||800,e=this.container.clientHeight||500;this.renderer.setSize(t,e),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.updateCamera()}updateCamera(){this.dirty=!0;const t=this.camera.aspect,e=Math.tan(Yi.degToRad(this.camera.fov/2)),n=6.55*Math.abs(Math.cos(this.azimuth))+3.7*Math.abs(Math.sin(this.azimuth)),s=3.7*Math.abs(Math.cos(this.azimuth))+6.55*Math.abs(Math.sin(this.azimuth)),r=this.view==="top"?Math.PI/2-.001:this.elevation,a=this.view==="top"?1.18:t<1.3?1.24:1.4,o=Math.max(n/(2*e*t),(s*Math.sin(r)+.5)/(2*e))*a*this.zoomLevel;this.camera.position.set(Math.sin(this.azimuth)*Math.cos(r)*o,Math.sin(r)*o,Math.cos(this.azimuth)*Math.cos(r)*o),this.camera.position.add(this.target),this.camera.lookAt(this.target),this.camera.updateMatrixWorld(),this.environment.setCamera(this.camera,this.view)}setView(t){this.view=t==="top"?"top":"angle",this.azimuth=0,this.zoomLevel=1,this.target.set(0,t==="top"?-.04:.12,0),this.updateCamera()}resetCamera(){this.elevation=.74,this.setView("angle")}pan(t,e){this.target.x=Yi.clamp(this.target.x+t*Math.cos(this.azimuth)-e*Math.sin(this.azimuth),-2.8,Et.halfWidth),this.target.z=Yi.clamp(this.target.z-t*Math.sin(this.azimuth)-e*Math.cos(this.azimuth),-1.4,Et.halfHeight),this.updateCamera()}orbit(t,e){this.view="angle",this.azimuth-=t*.005*this.sensitivity,this.elevation=Yi.clamp(this.elevation+e*.004*this.sensitivity,.35,1.5),this.updateCamera()}zoom(t){this.adjustZoom(Math.sign(t)*.065)}adjustZoom(t){this.zoomLevel=Yi.clamp(this.zoomLevel*Math.exp(t),.35,1.8),this.updateCamera()}setSettings(t={}){if(this.dirty=!0,t.tableColor&&this.table.setColor(t.tableColor),t.ballStyle&&this.ballRenderer.setStyle(t.ballStyle),t.sensitivity!==void 0&&(this.sensitivity=Number(t.sensitivity)),t.aimGuide!==void 0&&(this.aimGuide=t.aimGuide),t.quality&&t.quality!==this.quality){this.quality=t.quality;const e=t.quality==="low",n=t.quality==="high";this.renderer.setPixelRatio(e?1:Math.min(window.devicePixelRatio,n?2:1.5)),this.renderer.shadowMap.enabled=!e,this.keyLight.castShadow=!e,this.keyLight.shadow.mapSize.set(n?2048:1024,n?2048:1024),this.keyLight.shadow.map?.dispose(),this.keyLight.shadow.map=null,this.environment.setQuality(t.quality),this.scene.traverse(s=>{if(s.material)for(const r of Array.isArray(s.material)?s.material:[s.material])r.needsUpdate=!0}),this.resize()}this.updateAim()}dispose(){this.resizeObserver.disconnect(),this.table.dispose(),this.ballRenderer.dispose(),this.environment.dispose(),this.reflections.dispose(),this.keyLight.shadow.dispose();const t=new Set,e=new Set,n=new Set;this.scene.traverse(s=>{if(s.geometry&&t.add(s.geometry),s.material)for(const r of Array.isArray(s.material)?s.material:[s.material])e.add(r),r.map&&n.add(r.map)}),t.forEach(s=>s.dispose()),e.forEach(s=>s.dispose()),n.forEach(s=>s.dispose()),this.renderer.dispose(),this.canvas.remove()}}const as=(i,t,e)=>Math.max(t,Math.min(e,i)),De=(i,t)=>Math.hypot(i.x-t.x,i.z-t.z),os=(i,t)=>Math.atan2(t.z-i.z,t.x-i.x),cn=(i,t)=>{const e=Math.hypot(i,t)||1;return{x:i/e,z:t/e}};class tv{chooseShot({mode:t,balls:e,difficulty:n="medium"}){const s=e.find(c=>c.id===t.cueId()&&c.active);if(!s)return{angle:0,power:.35,spin:{x:0,y:0},calledBall:null,calledPocket:null};const r=e.filter(c=>c.active&&t.legalTargets(e).includes(c.id));if(!r.length)return{angle:0,power:.35,spin:{x:0,y:0},calledBall:null,calledPocket:null};if(!t.pockets)return this.caromShot(t,s,r,e,n);if(t.isBreak){const c=[...r].sort((h,u)=>De(s,h)-De(s,u))[0];return{angle:os(s,c),power:.96,spin:{x:0,y:.1},calledBall:c.id,calledPocket:this.nearestPocket(c)}}const a=[];for(const c of r)for(let h=0;h<Ae.length;h++){const u=Ae[h],f=cn(u.x-c.x,u.z-c.z),d={x:c.x-f.x*Et.radius*2,z:c.z-f.z*Et.radius*2},g=cn(d.x-s.x,d.z-s.z),v=g.x*f.x+g.z*f.z;if(v<.18||!this.inside(d)||!this.pathClear(s,d,e,[s.id,c.id])||!this.pathClear(c,u,e,[s.id,c.id]))continue;const m=De(s,d)+De(c,u)/Math.max(v,.35);a.push({angle:os(s,d),power:this.powerFor(m,v),spin:{x:0,y:.12},calledBall:c.id,calledPocket:h,score:v*6-m*.5})}n!=="easy"&&a.push(...this.combinations(s,r,e,t)),n==="hard"&&a.push(...this.bankShots(s,r,e)),a.sort((c,h)=>h.score-c.score);let o=a[0];if(!o){const c=[...r].sort((h,u)=>{const f=d=>De(s,d)+(this.pathClear(s,d,e,[s.id,d.id])?0:8);return f(h)-f(u)})[0];o={angle:os(s,c),power:t.isBreak?.92:as(.34+De(s,c)*.09,.38,.83),spin:{x:0,y:0},calledBall:c.id,calledPocket:this.nearestPocket(c)}}const l=n==="easy"?.035:n==="medium"?.009:.002;return{angle:o.angle+(Math.random()-.5)*l*2,power:o.power,spin:o.spin,calledBall:o.calledBall,calledPocket:o.calledPocket}}powerFor(t,e=1){return as(.22+Math.sqrt(Math.max(0,t))*.17+(1-e)*.12,.29,.88)}inside(t){return Math.abs(t.x)<=Et.halfWidth-Et.radius&&Math.abs(t.z)<=Et.halfHeight-Et.radius}pathClear(t,e,n,s=[]){const r=e.x-t.x,a=e.z-t.z,o=r*r+a*a;return o<1e-8?!0:!n.some(l=>{if(!l.active||s.includes(l.id))return!1;const c=as(((l.x-t.x)*r+(l.z-t.z)*a)/o,0,1);return Math.hypot(l.x-t.x-r*c,l.z-t.z-a*c)<(l.radius||Et.radius)+Et.radius+.008})}nearestPocket(t){let e=0;for(let n=1;n<Ae.length;n++)De(t,Ae[n])<De(t,Ae[e])&&(e=n);return e}combinations(t,e,n,s){const r=[];for(const a of e)for(const o of n)if(!(!o.active||o.id===t.id||o.id===a.id)&&!(s.id==="eight"&&!e.some(l=>l.id===o.id))&&!(s.id==="ten"&&o.id===10&&!e.some(l=>l.id===10)))for(let l=0;l<Ae.length;l++){const c=Ae[l],h=cn(c.x-o.x,c.z-o.z),u={x:o.x-h.x*Et.radius*2,z:o.z-h.z*Et.radius*2},f=cn(u.x-a.x,u.z-a.z),d={x:a.x-f.x*Et.radius*2,z:a.z-f.z*Et.radius*2},g=cn(d.x-t.x,d.z-t.z),v=Math.min(g.x*f.x+g.z*f.z,f.x*h.x+f.z*h.z);if(v<.7||!this.inside(d)||!this.inside(u)||!this.pathClear(t,d,n,[t.id,a.id])||!this.pathClear(a,u,n,[t.id,a.id,o.id])||!this.pathClear(o,c,n,[t.id,a.id,o.id]))continue;const m=De(t,d)+De(a,u)+De(o,c);r.push({angle:os(t,d),power:this.powerFor(m/v,v),spin:{x:0,y:0},calledBall:o.id,calledPocket:l,score:v*4.5-m*.6-1.5})}return r}bankShots(t,e,n){const s=[],r=[["x",-2.8+Et.radius],["x",Et.halfWidth-Et.radius],["z",-1.4+Et.radius],["z",Et.halfHeight-Et.radius]];for(const a of e)for(let o=0;o<Ae.length;o++){const l=Ae[o];for(const[c,h]of r){const u={...l,[c]:2*h-l[c]},f=(h-a[c])/(u[c]-a[c]);if(f<=.03||f>=.95)continue;const d={x:a.x+(u.x-a.x)*f,z:a.z+(u.z-a.z)*f};if(!this.inside({x:d.x*.999,z:d.z*.999})||Ae.some(S=>De(d,S)<.24))continue;const g=cn(d.x-a.x,d.z-a.z),v={x:a.x-g.x*Et.radius*2,z:a.z-g.z*Et.radius*2},m=cn(v.x-t.x,v.z-t.z),p=m.x*g.x+m.z*g.z;if(p<.45||!this.inside(v)||!this.pathClear(t,v,n,[t.id,a.id])||!this.pathClear(a,d,n,[t.id,a.id])||!this.pathClear(d,l,n,[t.id,a.id]))continue;const E=De(t,v)+(De(a,d)+De(d,l))*1.3;s.push({angle:os(t,v),power:this.powerFor(E/p,p),spin:{x:0,y:0},calledBall:a.id,calledPocket:o,score:p*4-E*.6-2})}}return s}caromShot(t,e,n,s,r){const a=t.id==="three"?3:0;let o=null;const l=[],c=r==="easy"?180:r==="medium"?360:720;for(let d=0;d<c;d++){const g=d/c*Math.PI*2,v=this.traceCarom(e,n,g,a);l.push({...v,angle:g}),(!o||v.score>o.score)&&(o={...v,angle:g})}l.sort((d,g)=>g.score-d.score);const h=l.slice(0,r==="hard"?10:r==="medium"?5:2);let u=null;for(const d of h){const g=as(.4+d.travel*.045+a*.03,.42,.95);for(const v of[g,Math.min(.98,g+.12)]){const m={angle:d.angle,power:v,spin:{x:0,y:.15}},p=this.simulateCarom(s,e.id,m,a);if((!u||p.score>u.score)&&(u={...d,...m,score:p.score}),p.scored)break}if(u?.score>=100)break}u&&(o=u);const f=r==="easy"?.025:r==="medium"?.008:.001;return{angle:o.angle+(Math.random()-.5)*f*2,power:o.power||as(.4+o.travel*.045+a*.03,.42,.95),spin:{x:0,y:.15},calledBall:null,calledPocket:null}}simulateCarom(t,e,n,s){const r=new Set;let a=0,o=!1,l=0;const c=new xc({pockets:!1,onEvent:h=>{h.type==="cushion"&&h.ball===e&&r.size<2&&a++,h.type==="collision"&&(h.a===e||h.b===e)&&(r.add(h.a===e?h.b:h.a),r.size===2&&a>=s&&(o=!0))}});for(c.setBalls(t.map(h=>({...h,spin:{...h.spin},vx:0,vz:0}))),c.shoot(e,n.angle,n.power,n.spin);c.isMoving()&&l<14&&!o;)c.step(1/120),l+=1/120;return{scored:o,score:o?110-l*.4:r.size*10+Math.min(a,s)}}traceCarom(t,e,n,s){const r=Et.radius*2,a={x:t.x,z:t.z};let o={x:Math.cos(n),z:Math.sin(n)},l=0,c=0;const h=new Set;let u=-100;for(let f=0;f<10&&l<19;f++){const d=Math.abs(o.x)<1e-8?1/0:(Math.sign(o.x)*(Et.halfWidth-Et.radius)-a.x)/o.x,g=Math.abs(o.z)<1e-8?1/0:(Math.sign(o.z)*(Et.halfHeight-Et.radius)-a.z)/o.z;let v=Math.min(d,g),m=null;for(const p of e){if(h.has(p.id))continue;const E=p.x-a.x,S=p.z-a.z,x=E*o.x+S*o.z,R=r*r-(E*E+S*S-x*x);if(R<0)continue;const w=x-Math.sqrt(R);w>1e-4&&w<v&&(v=w,m=p)}if(!Number.isFinite(v)||v<0)break;if(a.x+=o.x*v,a.z+=o.z*v,l+=v,m){if(h.add(m.id),u=10+Math.min(c,s)*1.5-l*.1,h.size===2){u=c>=s?100-l*.8:20-(s-c)*4;break}const p=cn(m.x-a.x,m.z-a.z),E=o.x*p.x+o.z*p.z,S={x:o.x-p.x*E,z:o.z-p.z*E};if(Math.hypot(S.x,S.z)<.08)break;o=cn(S.x,S.z),a.x+=o.x*.001,a.z+=o.z*.001}else c++,d<=g?o.x*=-1:o.z*=-1,a.x+=o.x*.001,a.z+=o.z*.001,h.size===1&&(u=Math.max(u,10+Math.min(c,s)-l*.1))}return{score:u,travel:l}}choosePlacement({mode:t,physics:e}){const n=t.cueId(),s=e.balls,r=s.filter(o=>o.active&&t.legalTargets(s).includes(o.id)),a=[];for(const o of r)for(const l of Ae){const c=cn(o.x-l.x,o.z-l.z);for(const h of[.45,.7,1])a.push({x:o.x+c.x*h,z:o.z+c.z*h})}a.push({x:-5.6*.25,z:0});for(let o=-2.4;o<=2.4;o+=.4)for(let l=-1;l<=1;l+=.4)a.push({x:o,z:l});return a.find(o=>e.canPlace(o.x,o.z,n))||{x:0,z:0}}}const cc=i=>Math.max(0,Math.min(1,Number(i)||0));class ev{constructor(){this.volume=.55,this.musicVolume=0,this.muted=!1,this.context=null,this.lastCollision=0,this.voices=new Set,this.music=[],this.unlock=()=>this.resume(),typeof window<"u"&&(window.addEventListener("pointerdown",this.unlock),window.addEventListener("keydown",this.unlock))}resume(){if(!(typeof window>"u"))try{if(!this.context){const t=window.AudioContext||window.webkitAudioContext;if(!t)return;this.context=new t,this.master=this.context.createGain(),this.effects=this.context.createGain(),this.musicGain=this.context.createGain(),this.effects.connect(this.master),this.musicGain.connect(this.master),this.master.connect(this.context.destination),this.updateVolumes()}this.context.state==="suspended"&&this.context.resume().catch(()=>{}),this.musicVolume>0&&!this.music.length&&this.startMusic()}catch{}}updateVolumes(){if(!this.context)return;const t=this.context.currentTime;this.master.gain.setTargetAtTime(this.muted?0:1,t,.03),this.effects.gain.setTargetAtTime(this.volume*.45,t,.03),this.musicGain.gain.setTargetAtTime(this.musicVolume*.035,t,.15)}setVolume(t){this.volume=cc(t),this.updateVolumes()}setMusicVolume(t){this.musicVolume=cc(t),this.context&&this.musicVolume>0&&!this.music.length&&this.startMusic(),this.updateVolumes()}setMuted(t){this.muted=!!t,this.updateVolumes()}tone(t,e,n,s="sine",r=0,a=t){if(!this.context||this.voices.size>30)return;const o=this.context.currentTime+r,l=this.context.createOscillator(),c=this.context.createGain();l.type=s,l.frequency.setValueAtTime(t,o),l.frequency.exponentialRampToValueAtTime(Math.max(20,a),o+e),c.gain.setValueAtTime(0,o),c.gain.linearRampToValueAtTime(Math.max(1e-4,n),o+.002),c.gain.exponentialRampToValueAtTime(1e-4,o+e),l.connect(c),c.connect(this.effects),this.voices.add(l),l.onended=()=>{this.voices.delete(l),l.disconnect(),c.disconnect()},l.start(o),l.stop(o+e+.01)}play(t,e=1){if(!(this.muted||this.volume===0||!this.context||this.context.state!=="running"))if(e=Math.max(.08,Math.min(1,e)),t==="collision"||t==="ball"){const n=this.context.currentTime;if(n-this.lastCollision<.012)return;this.lastCollision=n,this.tone(1700,.045,e*.7,"sine",0,390),this.tone(450,.035,e*.22,"triangle")}else t==="cue"||t==="shoot"?(this.tone(320,.08,e*.7,"triangle",0,90),this.tone(1800,.025,e*.4,"sine",0,500)):t==="cushion"?this.tone(180,.075,e*.6,"triangle",0,65):t==="pocket"?(this.tone(160,.2,e*.6,"sine",0,38),this.tone(440,.07,e*.18,"triangle",.08,190)):t==="win"||t==="victory"?[523.25,659.25,783.99,1046.5].forEach((n,s)=>this.tone(n,.45,.24,"sine",s*.13)):t==="lose"||t==="defeat"?[392,349.23,293.66].forEach((n,s)=>this.tone(n,.4,.22,"sine",s*.15)):this.tone(760,.045,.18,"sine",0,580)}startMusic(){!this.context||this.music.length||[130.8128,164.8138,195.9977].forEach((t,e)=>{const n=this.context.createOscillator(),s=this.context.createGain(),r=this.context.createOscillator(),a=this.context.createGain();n.type="sine",n.frequency.value=t,s.gain.value=.2,r.frequency.value=.07+e*.025,a.gain.value=.06,r.connect(a),a.connect(s.gain),n.connect(s),s.connect(this.musicGain),n.start(),r.start(),this.music.push({oscillator:n,gain:s,lfo:r,depth:a})})}dispose(){typeof window<"u"&&(window.removeEventListener("pointerdown",this.unlock),window.removeEventListener("keydown",this.unlock));for(const t of this.voices)try{t.stop()}catch{}this.voices.clear();for(const t of this.music)t.oscillator.stop(),t.lfo.stop(),t.oscillator.disconnect(),t.gain.disconnect(),t.lfo.disconnect(),t.depth.disconnect();this.music=[],this.context?.close().catch(()=>{}),this.context=null}}class nv{constructor(t,e){this.update=t,this.render=e,this.accumulator=0,this.last=0,this.running=!1,this.fixedStep=1/240}start(){if(this.running)return;this.running=!0,this.last=performance.now();const t=e=>{if(!this.running)return;const n=Math.min((e-this.last)/1e3,.1);this.last=e,this.accumulator+=n;let s=0;for(;this.accumulator>=this.fixedStep&&s++<24;)this.update(this.fixedStep),this.accumulator-=this.fixedStep;this.render(n),this.id=requestAnimationFrame(t)};this.id=requestAnimationFrame(t)}stop(){this.running=!1,cancelAnimationFrame(this.id),this.accumulator=0}}const te=Object.freeze(Object.fromEntries(["MENU","MODE_SELECTION","GAME_SETUP","BREAK_SHOT","PLAYER_TURN","SHOT_IN_PROGRESS","BALLS_SETTLING","FOUL","BALL_IN_HAND","GAME_OVER","PAUSED"].map(i=>[i,i])));class iv{constructor(t){this.game=t,this.canvas=t.scene.canvas,this.pointers=new Map,this.listeners=[],this.keys=new Set,this.cueTurns=new Map;const e=(r,a,o,l)=>{r.addEventListener(a,o,l),this.listeners.push(()=>r.removeEventListener(a,o,l))},n=r=>{const a=t.scene.screenToTable(r.clientX,r.clientY);a&&t.cue&&t.setAngle(Math.atan2(a.z-t.cue.z,a.x-t.cue.x))};e(this.canvas,"contextmenu",r=>r.preventDefault()),e(this.canvas,"pointerdown",r=>{if(!(r.button!==0&&r.button!==2)){if(t.audio.play("button",.05),this.canvas.setPointerCapture(r.pointerId),this.pointers.set(r.pointerId,{x:r.clientX,y:r.clientY,startY:r.clientY,orbit:r.button===2||r.altKey,charge:r.shiftKey,multitouch:!1}),this.pointers.size>1){for(const a of this.pointers.values())a.multitouch=!0;this.gesture=this.touchGeometry();return}if(t.ballInHand){const a=t.scene.screenToTable(r.clientX,r.clientY);a&&t.place(a.x,a.z)}else t.canShoot&&!t.isAI&&!r.altKey&&r.button===0&&n(r)}}),e(this.canvas,"pointermove",r=>{const a=this.pointers.get(r.pointerId);if(!a)return;const o=r.clientX-a.x,l=r.clientY-a.y;if(a.x=r.clientX,a.y=r.clientY,this.pointers.size>1){const c=this.touchGeometry();this.gesture&&(t.scene.orbit((c.x-this.gesture.x)*1.5,(c.y-this.gesture.y)*1.5),Math.abs(c.distance-this.gesture.distance)>1&&t.scene.zoom((this.gesture.distance-c.distance)*2)),this.gesture=c;return}a.multitouch||(a.orbit?t.scene.orbit(o,l):a.charge?t.setPower(.1+(r.clientY-a.startY)/180):t.canShoot&&!t.isAI&&n(r))});const s=r=>{const a=this.pointers.get(r.pointerId);a?.charge&&!a.multitouch&&t.shoot(),this.pointers.delete(r.pointerId),this.gesture=null};e(this.canvas,"pointerup",s),e(this.canvas,"pointercancel",r=>{this.pointers.delete(r.pointerId),this.gesture=null}),e(this.canvas,"wheel",r=>{r.preventDefault(),t.scene.zoom(r.deltaY)},{passive:!1}),e(window,"keydown",r=>{if(!(t.lobbyOpen||r.target.matches("input,select,textarea,[contenteditable=true]")||r.target.closest('[role="slider"]')||document.querySelector("dialog[open]"))){if(["ArrowLeft","ArrowRight"].includes(r.code)){r.preventDefault(),t.setAngle(t.angle+(r.code==="ArrowLeft"?-1:1)*Math.PI/1800);return}if(["KeyW","KeyA","KeyS","KeyD","Equal","Minus","NumpadAdd","NumpadSubtract"].includes(r.code)){r.preventDefault(),this.keys.add(r.code);return}if(r.code==="KeyR"){r.preventDefault(),r.repeat||t.scene.resetCamera();return}r.code==="Space"&&r.target.closest("button,a")||(r.code==="Space"&&(r.preventDefault(),t.shoot()),r.code==="Escape"&&t.pause())}}),e(window,"keyup",r=>this.keys.delete(r.code)),e(window,"blur",()=>{this.keys.clear(),this.cueTurns.clear()}),e(document,"visibilitychange",()=>{document.hidden&&(this.keys.clear(),this.cueTurns.clear())})}beginCueTurn(t){this.game.setAngle(this.game.angle+t*Math.PI/1800)&&this.cueTurns.set(t,performance.now())}endCueTurn(t){this.cueTurns.delete(t)}update(t){const e=document.activeElement;if(this.game.lobbyOpen||document.hidden||document.querySelector("dialog[open]")||e?.closest("input,select,textarea,[contenteditable=true]")){this.keys.clear(),this.cueTurns.clear();return}(!this.game.canShoot||this.game.isAI)&&this.cueTurns.clear();let n=0;const s=performance.now();for(const[h,u]of this.cueTurns)s-u>250&&(n+=h);if(n&&this.game.setAngle(this.game.angle+n*Math.min(t,.05)*Math.PI/18),!this.keys.size)return;const r=Number(this.keys.has("KeyD"))-Number(this.keys.has("KeyA")),a=Number(this.keys.has("KeyW"))-Number(this.keys.has("KeyS")),o=Math.hypot(r,a),l=Math.min(t,.05);if(o){const h=1.8*l*this.game.scene.zoomLevel*this.game.scene.sensitivity;this.game.scene.pan(r/o*h,a/o*h)}const c=Number(this.keys.has("Minus")||this.keys.has("NumpadSubtract"))-Number(this.keys.has("Equal")||this.keys.has("NumpadAdd"));c&&this.game.scene.adjustZoom(c*l)}touchGeometry(){const[t,e]=this.pointers.values();return{x:(t.x+e.x)/2,y:(t.y+e.y)/2,distance:Math.hypot(t.x-e.x,t.y-e.y)}}dispose(){this.listeners.forEach(t=>t()),this.pointers.clear(),this.keys.clear(),this.cueTurns.clear()}}class sv{constructor(t,e){this.onUpdate=e,this.state=te.MENU,this.angle=0,this.power=.52,this.spin={x:0,y:0},this.calledPocket=null,this.calledBall=null,this.settings={tableColor:"#087f75",quality:"medium",ballStyle:"classic",sensitivity:1,aimGuide:!0,volume:.4,music:0,language:"en",opponent:"local",difficulty:"medium",targetScore:5,playerNames:["Người chơi 1","Người chơi 2"]};try{Object.assign(this.settings,JSON.parse(localStorage.getItem("velvet-settings")||"{}"))}catch{}this.localSeries={local:[0,0],ai:[0,0]};try{const n=JSON.parse(localStorage.getItem("velvet-series")||"{}");for(const s of["local","ai"])Array.isArray(n[s])&&n[s].length===2&&n[s].every(r=>Number.isSafeInteger(r)&&r>=0)&&(this.localSeries[s]=n[s])}catch{}this.scene=new Q0(t),this.audio=new ev,this.ai=new tv,this.physics=new xc({onEvent:n=>this.onPhysicsEvent(n)}),this.scene.setSettings(this.settings),this.audio.setVolume(this.settings.volume),this.audio.setMusicVolume(this.settings.music),this.input=new iv(this),this.start("eight"),this.loop=new nv(n=>this.fixedUpdate(n),n=>this.render(n)),this.loop.start(),this.visibility=()=>{!this.online&&document.hidden&&this.state!==te.PAUSED&&this.state!==te.GAME_OVER&&this.pause()},document.addEventListener("visibilitychange",this.visibility)}start(t=this.mode?.id||"eight"){if(this.online)return this.online.rematch();this.state=te.GAME_SETUP,this.mode=_c(t,{targetScore:Number(this.settings.targetScore)}),this.physics.pockets=this.mode.pockets,this.physics.setBalls(this.mode.setup()),this.scene.setMode(this.mode.pockets),this.state=this.mode.isBreak?te.BREAK_SHOT:te.PLAYER_TURN,this.shotEvents=[],this.shots=0,this.placementAllowed=!1,this.resultRecorded=!1,this.shotLog=[],this.cushions=0,this.startedAt=Date.now(),this.pausedTime=0,this.settleTime=0,this.aiDelay=1.1,this.angle=0,this.power=this.mode.pockets?.96:.52,this.spin={x:0,y:0},this.finishedAt=null,this.calledPocket=null,this.calledBall=null,this.message=this.mode.pockets?"The table is yours. Use strong power for a legal break.":"Connect with both object balls to score. Find your line.",this.notify()}get cue(){return this.physics.balls.find(t=>t.id===this.mode.cueId())}get isAI(){return this.online?!1:this.settings.opponent==="ai"&&this.mode.currentPlayer===1}get canShoot(){return this.online?this.online.canShoot:[te.PLAYER_TURN,te.BREAK_SHOT].includes(this.state)&&!this.physics.isMoving()&&this.mode.winner==null}get ballInHand(){return this.state===te.BALL_IN_HAND}get needsPocketCall(){return!this.mode.isBreak&&(this.mode.id==="ten"||this.mode.id==="eight"&&this.mode.legalTargets(this.physics.balls).includes(8))}setAngle(t){return this.lobbyOpen||!this.canShoot||this.isAI||!Number.isFinite(t)?!1:(this.angle=Math.atan2(Math.sin(t),Math.cos(t)),this.notify(),!0)}onPhysicsEvent(t){[te.SHOT_IN_PROGRESS,te.BALLS_SETTLING].includes(this.state)&&(this.shotEvents.push({...t}),t.type==="cushion"&&t.ball===this.shotCue&&this.cushions++,this.audio.play(t.type,t.strength??.5))}shoot(t=!1){if(this.lobbyOpen||!this.canShoot||!t&&this.isAI)return!1;const e=this.mode.legalTargets(this.physics.balls);if(this.needsPocketCall&&this.calledPocket==null)return this.message=this.mode.id==="eight"?"Chọn lỗ cho bi số 8 để hoàn tất cú đánh.":"Chọn lỗ được gọi cho cú đánh này.",this.notify(),t||this.onCallRequired?.(),!1;if(this.online)return this.online.shoot();this.mode.id==="ten"&&!this.mode.isBreak&&this.calledBall==null&&(this.calledBall=e[0]??10),this.initialBalls=this.physics.balls.map(r=>({...r,spin:{...r.spin}})),this.shotCue=this.mode.cueId(),this.shotEvents=[],this.cushions=0,this.settleTime=0;const n=this.state;return this.state=te.SHOT_IN_PROGRESS,this.physics.shoot(this.shotCue,this.angle,Math.max(.04,this.power),this.spin)?(this.placementAllowed=!1,this.shots++,this.audio.play("cue",this.power),this.scene.animateShot?.(),this.message="Shot in motion…",this.notify(),!0):(this.state=n,!1)}fixedUpdate(t){if(!(this.online||this.lobbyOpen)&&!(this.state===te.PAUSED||this.state===te.GAME_OVER)){if([te.SHOT_IN_PROGRESS,te.BALLS_SETTLING].includes(this.state))this.physics.step(t),this.state=this.physics.isMoving()?te.SHOT_IN_PROGRESS:te.BALLS_SETTLING,this.physics.isMoving()?this.settleTime=0:(this.settleTime+=t,this.settleTime>.42&&this.finishShot());else if(this.isAI&&(this.aiDelay-=t,this.aiDelay<=0)){if(this.ballInHand){const e=this.ai.choosePlacement({mode:this.mode,physics:this.physics});e?this.place(e.x,e.z,!0):this.aiDelay=.5}else if(this.canShoot){const e=this.ai.chooseShot({mode:this.mode,balls:this.physics.balls,difficulty:this.settings.difficulty});e&&(Object.assign(this,{angle:e.angle,power:e.power,spin:e.spin||{x:0,y:0},calledBall:e.calledBall,calledPocket:e.calledPocket}),this.shoot(!0))}}}}finishShot(){const t=this.mode.currentPlayer,e=this.mode.evaluateShot({events:this.shotEvents,balls:this.physics.balls,initialBalls:this.initialBalls,calledBall:this.calledBall,calledPocket:this.calledPocket});for(const n of e.respot||[])this.respot(n);if(this.message=e.message,this.shotLog.unshift({player:t,message:e.message,foul:e.foul}),this.shotLog=this.shotLog.slice(0,12),this.calledPocket=null,this.calledBall=null,this.aiDelay=1.25,this.mode.winner!=null||e.winner!=null)this.state=te.GAME_OVER,this.finishedAt=Date.now(),this.recordLocalResult(),this.audio.play(this.mode.winner===1&&this.settings.opponent==="ai"?"lose":"win"),this.saveMatch();else if(e.ballInHand){this.state=te.FOUL,this.placementAllowed=!0;const n=this.cue;n.active=!1,n.vx=n.vz=0,this.state=te.BALL_IN_HAND}else this.state=te.PLAYER_TURN;this.notify()}respot(t){let e=this.physics.balls.find(r=>r.id===t);if(!e)return;e.active=!1;const n=[{x:1.4,z:0}];for(let r=1;r<45;r++)n.push({x:1.4-r*.135,z:0});for(let r=-1.1;r<1.2;r+=.15)for(let a=-2.5;a<2.6;a+=.15)n.push({x:a,z:r});const s=n.find(r=>this.physics.canPlace(r.x,r.z,t));s&&(e.x=s.x,e.z=s.z,e.vx=e.vz=0,e.spin={x:0,y:0},e.active=!0)}place(t,e,n=!1){return this.online?this.online.place(t,e):!(this.ballInHand||this.state===te.PLAYER_TURN&&this.placementAllowed)||this.physics.isMoving()||!n&&this.isAI?!1:this.physics.placeBall(this.mode.cueId(),t,e)?(this.placementAllowed=!0,this.state=te.PLAYER_TURN,this.message="Đã đặt bi trắng. Bạn có thể chọn Đặt lại bi trắng trước khi đánh.",this.aiDelay=.7,this.notify(),!0):(this.message="Choose a clear spot inside the cushions, away from pockets and other balls.",this.notify(),!1)}get canReposition(){return this.online?this.online.canAct&&this.online.info?.placementAllowed&&this.state===te.PLAYER_TURN:this.placementAllowed&&this.state===te.PLAYER_TURN&&!this.isAI&&!this.physics.isMoving()}repositionCue(){return this.canReposition?this.online?this.online.repositionCue():(this.state=te.BALL_IN_HAND,this.message="Nhấn vị trí trống để đặt lại bi trắng.",this.notify(),!0):!1}get seriesScores(){return this.online?.info?.seriesScores||this.localSeries[this.settings.opponent==="ai"?"ai":"local"]}recordLocalResult(){const t=this.mode.winner;this.resultRecorded||t!==0&&t!==1||(this.resultRecorded=!0,this.seriesScores[t]++,this.persistSeries())}persistSeries(){try{localStorage.setItem("velvet-series",JSON.stringify(this.localSeries))}catch{}}resetSeries(){this.online||(this.seriesScores.fill(0),this.persistSeries(),this.notify())}applySharedAimGuide(t){if(!(typeof t!="boolean"||this.settings.aimGuide===t)){this.settings.aimGuide=t,this.scene.setSettings({aimGuide:t});try{localStorage.setItem("velvet-settings",JSON.stringify(this.settings))}catch{}}}pause(){if(this.lobbyOpen)return!1;if(this.online)return this.online.pause();this.state===te.PAUSED?(this.state=this.previousState,this.pausedTime+=Date.now()-this.pauseStarted):this.state!==te.GAME_OVER&&(this.previousState=this.state,this.state=te.PAUSED,this.pauseStarted=Date.now()),this.notify()}setSettings(t){this.online&&typeof t.aimGuide=="boolean"&&(t.aimGuide!==this.settings.aimGuide&&(this.online.seat==null||!this.online.connected?this.online.error="Chỉ người chơi đang kết nối được đổi Aim guide của phòng.":this.online.command("aimGuide",{enabled:t.aimGuide})),t={...t},delete t.aimGuide),Object.assign(this.settings,t),this.scene.setSettings(this.settings),this.audio.setVolume(this.settings.volume),this.audio.setMusicVolume(this.settings.music);try{localStorage.setItem("velvet-settings",JSON.stringify(this.settings))}catch{}this.notify()}setPower(t){this.power=Math.max(.04,Math.min(1,Number(t))),this.notify()}setSpin(t,e){this.spin={x:Math.max(-1,Math.min(1,t)),y:Math.max(-1,Math.min(1,e))},this.notify()}render(t){this.input.update(t),this.online?.update(),!this.lobbyOpen&&(this.scene.sync(this.online?.renderBalls||this.physics.balls,this.mode.cueId(),t),this.scene.setAim(this.angle,this.power,this.spin,this.online?this.online.showAim:this.canShoot&&!this.isAI),this.scene.render(),this.hudTimer=(this.hudTimer||0)+t,this.hudTimer>.18&&(this.hudTimer=0,this.notify()))}notify(){this.onUpdate?.(this)}saveMatch(){try{let t=JSON.parse(localStorage.getItem("velvet-history")||"[]");t.unshift({mode:ci.find(e=>e.id===this.mode.id).name,winner:this.playerName(this.mode.winner),scores:this.mode.scores,seriesScores:[...this.seriesScores],duration:this.elapsed,date:new Date().toISOString()}),localStorage.setItem("velvet-history",JSON.stringify(t.slice(0,20)))}catch{}}playerName(t){return this.online?this.online.info?.players[t]?.name||`Đang chờ người chơi ${t+1}`:t===1&&this.settings.opponent==="ai"?"The house":this.settings.playerNames?.[t]||`Người chơi ${t+1}`}get elapsed(){return this.online?this.online.info?.elapsed||0:Math.max(0,Math.floor(((this.finishedAt&&this.state===te.GAME_OVER?this.finishedAt:Date.now())-this.startedAt-this.pausedTime-(this.state===te.PAUSED?Date.now()-this.pauseStarted:0))/1e3))}dispose(){this.online?.leave(),this.loop.stop(),this.scene.dispose(),this.audio.dispose(),this.input.dispose(),document.removeEventListener("visibilitychange",this.visibility)}}const hc={cue:'<path d="m5 19 14-14M4 20l2-2M17 3l4 4"/>',settings:'<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="3"/><circle cx="15" cy="17" r="3"/>',sound:'<path d="m11 4-6 5H2v6h3l6 5zM15 8c3 2 3 6 0 8m3-11c5 4 5 10 0 14"/>',mute:'<path d="m11 4-6 5H2v6h3l6 5zM16 9l5 6m0-6-5 6"/>',help:'<circle cx="12" cy="12" r="9"/><path d="M9 9a3 3 0 1 1 5 2c-2 1-2 2-2 3m0 3h.01"/>',arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',pause:'<path d="M8 5v14M16 5v14"/>',play:'<path d="m8 5 11 7-11 7z"/>',restart:'<path d="M4 10a8 8 0 1 1 1 8M4 4v6h6"/>',top:'<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M12 6v12"/>',angle:'<path d="m2 14 10-7 10 7-10 7zM2 10l10-7 10 7"/>',close:'<path d="m6 6 12 12M6 18 18 6"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',trophy:'<path d="M8 3h8v6a4 4 0 0 1-8 0zM8 5H4v3a4 4 0 0 0 4 4m8-7h4v3a4 4 0 0 1-4 4m-4 1v7m-4 0h8"/>',chevron:'<path d="m9 5 7 7-7 7"/>',check:'<path d="m5 12 4 4L19 6"/>'},le=(i,t=20)=>`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${hc[i]||hc.cue}</svg>`,ho=(i,t="")=>`<span class="ball-chip ${i>8?"striped":""} ${t}" style="--ball:${pc[i]||"#e8c95b"}"><span>${i}</span></span>`,hh=i=>i==="carom"||i==="three"?`<div class="mode-art carom-art"><i></i><i></i><i></i>${i==="three"?"<span>⌁</span>":""}</div>`:`<div class="mode-art">${ho(i==="eight"?8:i==="nine"?9:10,"large")}${ho(i==="eight"?1:i==="nine"?2:3,"small")}</div>`,rv=document.querySelector("#app");rv.innerHTML=`
<header class="site-header"><a class="brand" href="#" aria-label="Velvet home"><span class="brand-mark">v<span>•</span></span><span>velvet<small>BILLIARDS CLUB</small></span></a><nav aria-label="Main navigation"><button class="nav-link active" id="nav-play" data-i18n="play">Play</button><button class="nav-link" id="instructions" data-i18n="how">How to play</button><button class="nav-link" id="history" data-i18n="history">Match history</button></nav><div class="header-actions"><span class="live-label"><i></i> YOUR PRIVATE TABLE</span><button class="icon-button" id="mute" aria-label="Mute sound">${le("sound")}</button><button class="icon-button" id="settings" aria-label="Settings">${le("settings")}</button></div></header>
<main>
<section class="hero"><div><div class="eyebrow"><span></span> A GAME OF ANGLES. A MOMENT OF CALM.</div><h1 data-i18n="title">Find your next great shot.</h1><p data-i18n="subtitle">Five ways to play. One beautiful game. Make yourself at home.</p></div><button class="new-match secondary" id="new-match">${le("cue")} <span data-i18n="new">New match</span> ${le("arrow",17)}</button></section>
<section class="mode-grid" aria-label="Game modes">${ci.map((i,t)=>`<button class="mode-card ${t===0?"selected":""}" data-mode="${i.id}" aria-pressed="${t===0}">${hh(i.id)}<span class="mode-copy"><span class="mode-tag">${i.tag}</span><strong>${i.name}</strong></span><span class="mode-selected">${le("check",13)}</span></button>`).join("")}</section>
<div class="game-layout" id="play-area">
<section class="table-panel" aria-label="Billiards game">
<div class="table-toolbar"><div class="table-title"><span class="green-dot"></span><strong id="mode-title">8-Ball Pool</strong><span class="separator">/</span><span id="match-type">LOCAL MATCH</span></div><div class="table-actions"><span class="match-clock">${le("clock",14)}<span id="clock">00:00</span></span><span class="small-divider"></span><button class="icon-button small" id="zoom-out" aria-label="Thu nhỏ bàn" title="Thu nhỏ (−)">−</button><button class="icon-button small" id="zoom-in" aria-label="Phóng to bàn" title="Phóng to (+)">+</button><button class="icon-button small" id="reset-camera" aria-label="Đặt lại góc nhìn" title="Đặt lại góc nhìn (R)">${le("restart",16)}</button><button class="icon-button small" id="expand-table" aria-label="Mở rộng bàn" aria-pressed="false" title="Mở rộng bàn"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 3H3v6m12-6h6v6M3 15v6h6m6 0h6v-6"/></svg></button><button class="icon-button small" id="camera" aria-label="Switch to top view" title="Switch camera">${le("top",18)}</button><button class="icon-button small" id="pause" aria-label="Pause" title="Pause (Esc)">${le("pause",18)}</button><button class="icon-button small" id="restart" aria-label="Restart match" title="Restart">${le("restart",18)}</button></div></div>
<div class="table-stage" id="scene"><div class="canvas-label">VELVET <span>TABLE Nº 01</span></div><div id="table-state" class="table-state" hidden></div><div class="table-watermark">PRECISION IS A PRACTICE.</div><div id="render-error" hidden></div></div>
<div class="table-footer"><span><span class="key-dot"></span><span id="input-tip" data-i18n="aimtip">Drag on the table to aim</span></span><span class="desktop-tip">WASD di chuyển <span>·</span> + / − zoom <span>·</span> R đặt lại</span><button id="guide-toggle" class="text-button">Aim guide <span class="mini-toggle on"></span></button></div>
</section>
<aside class="match-sidebar"><div class="sidebar-heading"><span data-i18n="match">THE MATCH</span><span class="tiny-badge" id="round-label">OPEN TABLE</span></div><div id="player-cards"></div>
<div class="objective"><span class="eyebrow" data-i18n="objective">ON THE TABLE</span><h3 id="objective-title">Break the ice.</h3><p id="objective-text">Hit the rack to start. The table stays open after the break.</p><div id="target-balls" class="target-balls"></div><div id="cushion-counter" hidden></div></div>
<div class="shot-note"><span class="note-icon">${le("cue",18)}</span><div><strong id="note-title">A fresh rack. A fresh start.</strong><p id="message" aria-live="polite">Line up your opening shot.</p></div></div>
<button class="rules-link" id="mode-rules"><span>Learn this game</span>${le("arrow",16)}</button>
</aside>
</div>
<section class="control-deck" aria-label="Shot controls"><div class="spin-control"><div id="spin-pad" role="slider" aria-label="Cue ball spin. Arrow keys adjust, Home resets." aria-valuemin="-100" aria-valuemax="100" aria-valuenow="0" tabindex="0"><span class="spin-axis horizontal"></span><span class="spin-axis vertical"></span><span id="spin-marker"></span></div><div><span class="control-label" data-i18n="spin">CUE BALL SPIN</span><strong id="spin-label">Center ball</strong><button class="text-button reset-spin" id="reset-spin" data-i18n="reset">Reset spin</button></div></div><div class="power-control"><div class="power-heading"><label for="power" class="control-label" data-i18n="power">SHOT POWER</label><strong><span id="power-value">52</span><small>%</small></strong></div><input type="range" id="power" min="4" max="100" value="52" aria-label="Shot power"><div class="power-scale"><span>SOFT TOUCH</span><span>FULL POWER</span></div></div><div class="shoot-control"><button class="shoot-button" id="shoot"><span data-i18n="shoot">Take the shot</span>${le("arrow",21)}</button><span class="keyboard-hint">or press <kbd>space</kbd></span></div></section>
<section class="call-panel" id="call-panel" hidden><div><strong>Call your shot</strong><p id="call-description">Choose a ball and a pocket before shooting.</p></div><label id="call-ball-label">Ball <select id="call-ball"></select></label><div class="pocket-picker" role="group" aria-label="Called pocket">${Ae.map((i,t)=>`<button data-pocket="${t}" title="${i.name}" aria-label="Call ${i.name.toLowerCase()} pocket">${t+1}</button>`).join("")}</div><span id="called-label">No pocket called</span></section>
<footer class="page-footer"><span class="footer-brand">GOOD GAMES. GREAT MOMENTS.</span><span>Built for the love of the game <span class="footer-dot">✦</span></span><button id="footer-history">Match history</button><button id="footer-help">${le("help",15)} Quick guide</button></footer>
</main>
<dialog id="modal"><div class="modal-header"><div><div class="eyebrow">VELVET BILLIARDS CLUB</div><h2 id="modal-title"></h2></div><button class="icon-button" id="close-modal" aria-label="Close dialog">${le("close")}</button></div><div id="modal-body"></div></dialog>`;let xt,Gn=null,uh=null,dh=null,fh=null;const ps=i=>String(i).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);let wn="angle",uc="",dc="",fc="",cr=!1;const lt=i=>document.querySelector(i),zo=i=>`${String(Math.floor(i/60)).padStart(2,"0")}:${String(i%60).padStart(2,"0")}`,Ue=(i,t)=>{const e=lt(i);e&&e.textContent!==String(t)&&(e.textContent=t)},Ui={en:{play:"Play",how:"How to play",history:"Match history",title:"Find your next great shot.",subtitle:"Five ways to play. One beautiful game. Make yourself at home.",new:"New match",match:"THE MATCH",objective:"ON THE TABLE",spin:"CUE BALL SPIN",power:"SHOT POWER",shoot:"Take the shot",reset:"Reset spin",aimtip:"Drag to aim · WASD to move view"},vi:{play:"Chơi",how:"Cách chơi",history:"Lịch sử trận",title:"Tìm đường bi hoàn hảo của bạn.",subtitle:"Năm cách chơi. Một bàn bi tuyệt đẹp. Hãy tận hưởng.",new:"Trận mới",match:"TRẬN ĐẤU",objective:"TRÊN BÀN",spin:"XOÁY BI CÁI",power:"LỰC ĐÁNH",shoot:"Đánh bi",reset:"Đặt lại xoáy",aimtip:"Kéo để ngắm · WASD di chuyển"}};function ph(){document.documentElement.lang=xt.settings.language,lt("[data-i18n]")&&document.querySelectorAll("[data-i18n]").forEach(i=>i.textContent=(Ui[xt.settings.language]||Ui.en)[i.dataset.i18n])}function mh(i){if(!i.mode)return;const t=ci.find(c=>c.id===i.mode.id),e=i.mode.display(i.physics.balls),n=i.mode.currentPlayer;lt("#guide-toggle .mini-toggle").classList.toggle("on",!!i.settings.aimGuide),lt("#guide-toggle").setAttribute("aria-pressed",String(!!i.settings.aimGuide)),wn!==i.scene.view&&(wn=i.scene.view,lt("#camera").innerHTML=le(wn==="angle"?"top":"angle",18),lt("#camera").setAttribute("aria-label",`Switch to ${wn==="angle"?"top":"angled"} view`)),Ue("#mode-title",t.name),Ue("#match-type",i.online?"PHÒNG "+i.online.roomId:i.settings.opponent==="ai"?"VS. THE HOUSE":"LOCAL MATCH"),Ue("#clock",zo(i.elapsed)),Ue("#power-value",Math.round(i.power*100)),lt("#power").value=Math.round(i.power*100),lt("#power").style.setProperty("--fill",`${i.power*100}%`),Ue("#message",i.message),Ue("#round-label",i.mode.isBreak?"BREAK SHOT":i.mode.pockets?"RACE TO THE LAST":"RACE TO "+i.mode.targetScore);const s=[0,1].map(c=>`<div class="player-card ${c===n?"is-active":""}"><div class="player-avatar ${c===1?"second":""}">${!i.online&&c===1&&i.settings.opponent==="ai"?"AI":`0${c+1}`}</div><div class="player-info"><strong title="${ps(i.playerName(c))}">${ps(i.playerName(c))} ${c===n?'<span class="turn-dot"></span>':""}</strong><span>${e.players?.[c]?.detail||e.players?.[c]?.label||"Ready to play"}</span></div><div class="player-score">${i.mode.scores[c]}<small>${i.mode.pockets?"POTTED":"POINTS"}</small></div></div>`).join("");s!==uc&&(lt("#player-cards").innerHTML=s,uc=s),Ue("#objective-title",i.state==="BALL_IN_HAND"?"Ball in hand.":i.mode.isBreak?"Break the ice.":i.mode.id==="three"?"Make the angles count.":i.mode.id==="carom"?"Connect all three.":"Stay on your line."),Ue("#objective-text",e.objective||t.description);const r=i.mode.legalTargets(i.physics.balls),a=r.map(c=>ho(c)).join("");a!==dc&&(lt("#target-balls").innerHTML=a,dc=a),lt("#cushion-counter").hidden=!["three","carom"].includes(i.mode.id),Ue("#cushion-counter",`${i.cushions} cushion contacts this shot`),Ue("#note-title",i.state==="BALL_IN_HAND"?"Your next move.":i.state==="SHOT_IN_PROGRESS"?"Let the table do the talking.":i.isAI?"The house is lining up…":i.shots===0?"A fresh rack. A fresh start.":`${i.playerName(n)}, the table is yours.`);const o=lt("#shoot");o.disabled=!i.canShoot||i.isAI,o.classList.toggle("thinking",i.isAI),!i.canShoot||i.isAI?o.innerHTML=`<span>${i.state==="BALL_IN_HAND"?"Place the cue ball":i.state==="PAUSED"?"Game paused":i.state==="GAME_OVER"?"Match complete":i.isAI?"The house is thinking…":"Balls in motion…"}</span>`:o.innerHTML=`<span>${(Ui[i.settings.language]||Ui.en).shoot}</span>${le("arrow",21)}`,i.online&&!i.canShoot&&(o.textContent=i.online.connected?i.online.seat==null?"Bạn đang xem trận đấu":i.online.info?.ready?i.state==="GAME_OVER"?"Trận đã kết thúc":i.state==="PAUSED"?"Trận đang tạm dừng":["SHOT_IN_PROGRESS","BALLS_SETTLING"].includes(i.state)?"Bi đang lăn…":i.state==="BALL_IN_HAND"?"Đặt bi cái lên bàn":"Chờ lượt của bạn":"Đang chờ đối thủ…":"Đang kết nối lại…");const l=i.needsPocketCall;if(l&&i.canShoot&&!i.isAI&&(o.innerHTML=`<span>${i.calledPocket==null?i.mode.id==="eight"?"Chọn lỗ & đánh bi 8":"Chọn lỗ & đánh":(Ui[i.settings.language]||Ui.en).shoot}</span>${le("arrow",21)}`),lt("#call-panel").hidden=!l,lt("#call-ball-label").hidden=i.mode.id!=="ten",l){Ue("#call-description",i.mode.id==="eight"?"Bi số 8 cuối cùng: chọn lỗ bên dưới hoặc bấm Đánh bi để mở bảng chọn.":"Choose a ball and a pocket before shooting.");const h=i.physics.balls.filter(u=>u.active&&u.id!==0).map(u=>u.id).sort((u,f)=>u-f).map(u=>`<option value="${u}">${u}</option>`).join("");h!==fc&&(lt("#call-ball").innerHTML=h,fc=h),lt("#call-ball").value=i.calledBall??r[0]??10,Ue("#called-label",i.calledPocket==null?"No pocket called":Ae[i.calledPocket].name),document.querySelectorAll("[data-pocket]").forEach(u=>u.classList.toggle("selected",Number(u.dataset.pocket)===i.calledPocket))}if(lt("#table-state").hidden=!["PAUSED","BALL_IN_HAND"].includes(i.state),lt("#table-state").className=`table-state ${i.state==="BALL_IN_HAND"?"placement":""}`,Ue("#table-state",i.state==="PAUSED"?"Paused · press Esc to resume":"Ball in hand · tap a clear spot on the table"),lt("#pause").innerHTML=le(i.state==="PAUSED"?"play":"pause",18),lt("#pause").setAttribute("aria-label",i.state==="PAUSED"?"Resume":"Pause"),lt("#spin-marker").style.transform=`translate(${i.spin.x*23}px,${-i.spin.y*23}px)`,Ue("#spin-label",Math.abs(i.spin.x)+Math.abs(i.spin.y)<.12?"Center ball":[i.spin.y>.15?"Top spin":i.spin.y<-.15?"Back spin":"",i.spin.x>.15?"Right spin":i.spin.x<-.15?"Left spin":""].filter(Boolean).join(" + ")),document.querySelectorAll("[data-mode]").forEach(c=>{c.classList.toggle("selected",c.dataset.mode===i.mode.id),c.setAttribute("aria-pressed",c.dataset.mode===i.mode.id)}),i.online){const c=!i.online.connected||!i.online.info?.ready;c&&(lt("#table-state").hidden=!1,lt("#table-state").className="table-state placement",Ue("#table-state",i.online.connected?"Đang chờ đủ hai người chơi · chia sẻ mã phòng để mời bạn":"Mất kết nối · đang thử kết nối lại"));for(const h of document.querySelectorAll("#power,#spin-pad,#reset-spin,#call-ball,[data-pocket]"))"disabled"in h&&(h.disabled=!i.online.canAct);lt("#guide-toggle").disabled=i.online.seat==null||!i.online.connected,lt("#guide-toggle").title="Aim guide được đồng bộ cho cả phòng",lt("#pause").disabled=i.online.seat==null||c,lt("#restart").disabled=i.online.seat==null||i.state!=="GAME_OVER"||c,document.querySelectorAll("[data-mode]").forEach(h=>h.disabled=!0)}else document.querySelectorAll("#power,#reset-spin,#call-ball,[data-pocket],#pause,#restart,[data-mode],#guide-toggle").forEach(c=>c.disabled=!1);Gn?.update(),uh?.update(),dh?.update(),fh?.update(),i.state==="GAME_OVER"&&!cr&&(cr=!0,queueMicrotask(lv)),i.state!=="GAME_OVER"&&cr&&(cr=!1,lt("#modal-title").textContent==="A game well played."&&lt("#modal").close())}try{xt=new sv(lt("#scene"),mh),window.__game=xt,ph(),Gn=new Ih(xt),window.__lobby=Gn,uh=new Th(xt,Gn),dh=new wh(xt),fh=new Ah(xt)}catch(i){console.error(i),lt("#render-error").hidden=!1,lt("#render-error").textContent="Your browser could not start 3D rendering. Enable WebGL / hardware acceleration and refresh."}function Rs(i,t){lt("#modal-title").textContent=i,lt("#modal-body").innerHTML=t,lt("#modal").open||lt("#modal").showModal()}function Cn(){lt("#modal").close()}lt("#close-modal").onclick=Cn;lt("#modal").addEventListener("click",i=>{if(i.target===lt("#modal")){const t=lt("#modal").getBoundingClientRect();(i.clientX<t.left||i.clientX>t.right||i.clientY<t.top||i.clientY>t.bottom)&&Cn()}});function uo(i){xt.start(i),xt.audio.play("button"),Cn()}function gh(i=xt.mode.id){if(xt.online){xt.online.rematch(),Cn();return}if(xt.shots===0){uo(i);return}Rs("A fresh start?",`<p class="modal-lead">Start a new ${ci.find(t=>t.id===i).name} match? Your current match will be cleared.</p><div class="modal-buttons"><button class="secondary" id="cancel-restart">Keep playing</button><button class="primary" id="confirm-restart">Start new match ${le("arrow",18)}</button></div>`),lt("#cancel-restart").onclick=Cn,lt("#confirm-restart").onclick=()=>uo(i)}document.querySelectorAll("[data-mode]").forEach(i=>i.onclick=()=>{i.dataset.mode!==xt.mode.id&&gh(i.dataset.mode)});lt("#shoot").onclick=()=>xt.shoot();lt("#pause").onclick=()=>xt.pause();lt("#restart").onclick=()=>gh();lt("#power").oninput=i=>xt.setPower(i.target.value/100);lt("#zoom-in").onclick=()=>xt.scene.zoom(-1);lt("#zoom-out").onclick=()=>xt.scene.zoom(1);lt("#reset-camera").onclick=()=>{xt.scene.resetCamera(),wn="angle",lt("#camera").innerHTML=le("top",18),lt("#camera").setAttribute("aria-label","Switch to top view")};lt("#expand-table").onclick=()=>{const i=document.body.classList.toggle("table-expanded");lt("#expand-table").setAttribute("aria-pressed",String(i)),lt("#expand-table").setAttribute("aria-label",i?"Thu gọn bàn":"Mở rộng bàn"),requestAnimationFrame(()=>{xt.scene.resize(),i&&lt("#play-area").scrollIntoView({behavior:"smooth",block:"start"})})};lt("#camera").onclick=()=>{wn=xt.scene.view==="angle"?"top":"angle",xt.scene.setView(wn),lt("#camera").innerHTML=le(wn==="angle"?"top":"angle",18),lt("#camera").setAttribute("aria-label",`Switch to ${wn==="angle"?"top":"angled"} view`)};lt("#mute").onclick=()=>{xt.muted=!xt.muted,xt.audio.setMuted(xt.muted),lt("#mute").innerHTML=le(xt.muted?"mute":"sound"),lt("#mute").setAttribute("aria-label",xt.muted?"Unmute sound":"Mute sound")};lt("#guide-toggle").onclick=()=>{xt.setSettings({aimGuide:!xt.settings.aimGuide}),lt("#guide-toggle .mini-toggle").classList.toggle("on",xt.settings.aimGuide)};lt("#reset-spin").onclick=()=>xt.setSpin(0,0);const Rn=lt("#spin-pad");let Cr=!1;function vh(i){const t=Rn.getBoundingClientRect();let e=(i.clientX-t.left-t.width/2)/(t.width*.36),n=-(i.clientY-t.top-t.height/2)/(t.height*.36);const s=Math.hypot(e,n);s>1&&(e/=s,n/=s),xt.setSpin(e,n),Rn.setAttribute("aria-valuenow",Math.round(n*100)),Rn.setAttribute("aria-valuetext",`Horizontal ${Math.round(e*100)}, vertical ${Math.round(n*100)}`)}Rn.onpointerdown=i=>{Cr=!0,Rn.setPointerCapture(i.pointerId),vh(i)};Rn.onpointermove=i=>{Cr&&vh(i)};Rn.onpointerup=()=>Cr=!1;Rn.onpointercancel=()=>Cr=!1;Rn.onkeydown=i=>{let{x:t,y:e}=xt.spin;if(i.key==="Home")t=e=0;else if(i.key==="ArrowLeft")t-=.1;else if(i.key==="ArrowRight")t+=.1;else if(i.key==="ArrowUp")e+=.1;else if(i.key==="ArrowDown")e-=.1;else return;i.preventDefault(),xt.setSpin(t,e)};lt("#call-ball").onchange=i=>{xt.calledBall=Number(i.target.value)};document.querySelectorAll("[data-pocket]").forEach(i=>i.onclick=()=>{xt.calledPocket=Number(i.dataset.pocket),mh(xt)});lt("#nav-play").onclick=()=>{Gn?.show()};lt(".brand").onclick=i=>{i.preventDefault(),Gn?.show()};lt("#new-match").onclick=()=>Gn?.show();const av={eight:"After a legal break, the table is open. The first legal group pocket assigns solids or stripes. Hit one of your own balls first and pocket it, or send a ball to a cushion after contact. Clear your group, then call a pocket for the 8-ball. Pocketing the 8 early, in the wrong pocket, or with a foul loses. An 8 on the break is spotted.",nine:"Always hit the lowest-numbered ball first. After that, combinations are legal: pocketing the 9 on a legal shot wins. A foul or scratch gives your opponent ball in hand. A 9 pocketed with a foul is spotted. A legal pocket keeps your turn.",ten:"Always hit the lowest ball first. Call the ball and pocket for each shot after the break using the controls below the table. A correctly called ordinary ball keeps your turn. An uncalled ordinary pot stays down and switches turns. The 10 is spotted if pocketed early, uncalled, or with a foul. Clear 1–9 and legally call and pocket the 10 to win.",carom:"Player 1 uses white; Player 2 uses yellow. Your cue ball must contact both other balls in one shot. A successful carom earns one point and keeps your turn. A miss passes the table. There are no pockets. First to the target score wins.",three:"Player 1 uses white; Player 2 uses yellow. Contact both object balls, with at least three cushion contacts by your cue ball before contact with the second distinct object ball. Cushions before the first object count, and repeated contacts with one cushion count. A point keeps your turn; otherwise players switch."};function ko(){const i=ci.find(t=>t.id===xt.mode.id);Rs("A good shot starts here.",`<div class="guide-callout">${hh(xt.mode.id)}<div><strong>${i.name}</strong><p>${av[xt.mode.id]}</p></div></div><div class="instruction-grid"><div><span class="instruction-number">01</span><h3>Find your line</h3><p>Drag on the table with your mouse or finger to aim. The dotted guide shows your first contact.</p></div><div><span class="instruction-number">02</span><h3>Add your touch</h3><p>Set power with the slider. Tap the cue-ball diagram for top, back, or side spin.</p></div><div><span class="instruction-number">03</span><h3>Take the shot</h3><p>Press the shot button or Space. On desktop, Shift + drag down and release also shoots.</p></div><div><span class="instruction-number">04</span><h3>Make it yours</h3><p>Hold W/A/S/D to move the view. Use + / − or the mouse wheel to zoom; R resets the camera. Right-drag to orbit. Expand the table with the corner button. Esc pauses the match.</p></div></div><p class="fine-print">Pool break: pocket an object ball or send four distinct object balls to cushions. A foul gives ball in hand anywhere: tap a clear spot to place. Simplified club rules omit push-outs, three-foul losses and 10-ball pass-back. Spin, pocket jaws, and AI are lightweight approximations.</p>`)}lt("#instructions").onclick=ko;lt("#mode-rules").onclick=ko;lt("#footer-help").onclick=ko;function _h(){Rs("Good games, remembered.",'<div id="history-list"></div>');let i=[];try{i=JSON.parse(localStorage.getItem("velvet-history")||"[]")}catch{}if(!i.length)lt("#history-list").innerHTML=`<div class="empty-state">${le("trophy",40)}<h3>Your story starts at the table.</h3><p>Completed matches will appear here, saved on this device.</p><button class="primary" id="back-play">Let's play ${le("arrow",18)}</button></div>`,lt("#back-play").onclick=Cn;else for(const t of i){const e=document.createElement("div");e.className="history-row";const n=document.createElement("div"),s=document.createElement("strong");s.textContent=t.mode;const r=document.createElement("small");r.textContent=new Date(t.date).toLocaleDateString(),n.append(s,r);const a=document.createElement("span");a.textContent=`${t.winner} won · ${zo(t.duration)}`,e.append(n,a),lt("#history-list").append(e)}}lt("#history").onclick=_h;lt("#footer-history").onclick=_h;function ov(){const i=xt.settings;Rs("Your club. Your way.",`<form id="settings-form"><div class="settings-grid"><label>Opponent<select name="opponent"><option value="local">Local · two players</option><option value="ai">The house · AI opponent</option></select></label><label>AI difficulty<select name="difficulty"><option value="easy">Easy · a relaxed game</option><option value="medium">Medium · a worthy rival</option><option value="hard">Hard · an exacting table</option></select></label><label>Carom target score<select name="targetScore"><option>3</option><option>5</option><option>10</option><option>20</option></select></label><label>Graphics quality<select name="quality"><option value="low">Low · best performance</option><option value="medium">Medium · balanced</option><option value="high">High · full detail</option></select></label><label>Table felt<select name="tableColor"><option value="#087f75">Club teal</option><option value="#176f48">Classic green</option><option value="#245b89">Tournament blue</option><option value="#6d3452">Burgundy velvet</option></select></label><label>Ball appearance<select name="ballStyle"><option value="classic">Classic porcelain</option><option value="gloss">Polished gloss</option></select></label><label>Camera sensitivity<input name="sensitivity" type="range" min="0.3" max="2" step="0.1"></label><label>Sound effects<input name="volume" type="range" min="0" max="1" step="0.05"></label><label>Ambient music<input name="music" type="range" min="0" max="0.4" step="0.02"></label><label>Interface language<select name="language"><option value="en">English</option><option value="vi">Tiếng Việt · core controls</option></select></label><label class="checkbox-label"><input type="checkbox" name="aimGuide"> Show aim guide</label></div><p class="fine-print">Settings are saved on this device. Carom target changes apply to your next match. Rules and commentary are in English.</p><button class="primary full" type="submit">Save preferences ${le("check",18)}</button></form>`);const t=lt("#settings-form");for(const n of t.elements)n.name in i&&(n.type==="checkbox"?n.checked=i[n.name]:n.value=i[n.name]);if(xt.online)for(const n of["opponent","targetScore"])t.elements[n].disabled=!0,t.elements[n].title="Rời phòng online để thay đổi thiết lập trận.";xt.online&&(t.elements.aimGuide.disabled=xt.online.seat==null||!xt.online.connected);let e=!1;t.elements.aimGuide.onchange=()=>{e=!0},t.onsubmit=n=>{n.preventDefault();const s={};for(const r of t.elements)r.name&&(s[r.name]=r.type==="checkbox"?r.checked:r.type==="range"||r.name==="targetScore"?Number(r.value):r.value);xt.online&&(e||delete s.aimGuide,delete s.opponent,delete s.targetScore),xt.setSettings(s),ph(),lt("#guide-toggle .mini-toggle").classList.toggle("on",xt.settings.aimGuide),Cn()}}lt("#settings").onclick=ov;function lv(){if(xt.state!=="GAME_OVER")return;const i=ps(xt.playerName(xt.mode.winner));Rs("A game well played.",`<div class="result-content"><div class="result-trophy">${le("trophy",45)}</div><div class="eyebrow">${ci.find(t=>t.id===xt.mode.id).name.toUpperCase()}</div><h3>${i} wins.</h3><p>${xt.message}</p><div class="result-series"><small>TỈ SỐ CHUNG CUỘC · SỐ VÁN THẮNG</small><div><span>${ps(xt.playerName(0))}</span><strong>${xt.seriesScores[0]} — ${xt.seriesScores[1]}</strong><span>${ps(xt.playerName(1))}</span></div></div><div class="result-stats"><span><strong>${xt.mode.scores[0]} — ${xt.mode.scores[1]}</strong>FINAL SCORE</span><span><strong>${zo(xt.elapsed)}</strong>AT THE TABLE</span><span><strong>${xt.shots}</strong>SHOTS PLAYED</span></div><div class="modal-buttons"><button class="secondary" id="result-menu">Main menu</button><button class="primary" id="result-replay">Play again ${le("arrow",18)}</button></div></div>`),lt("#result-replay").onclick=()=>uo(xt.mode.id),lt("#result-menu").onclick=()=>{Cn(),Gn?.show()},xt.online&&(lt("#result-replay").textContent=xt.online.seat==null?"Về bàn xem":"Đồng ý tái đấu",lt("#result-replay").onclick=()=>{xt.online.seat!=null&&xt.online.rematch(),Cn()})}
