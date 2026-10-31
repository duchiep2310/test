import * as THREE from "three";
import { TABLE } from "../core/Constants.js";
import { TableRenderer } from "./TableRenderer.js";
import { BallRenderer } from "./BallRenderer.js";
import { ClubEnvironment } from "./ClubEnvironment.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { PlayerRenderer } from "./PlayerRenderer.js";
import { createClubCue } from "./CueRenderer.js";

export class SceneManager {
  constructor(container, callbacks = {}) {
    this.container = container;
    this.callbacks = callbacks;
    this.dirty = true;
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.canvas = this.renderer.domElement;
    this.canvas.setAttribute("aria-label", "Interactive 3D billiards table");
    this.canvas.style.touchAction = "none";
    container.append(this.canvas);
    this.camera = new THREE.PerspectiveCamera(38, 1, 0.05, 60);
    this.target = new THREE.Vector3(0, 0.12, 0);
    this.azimuth = 0;
    this.elevation = 0.74;
    this.zoomLevel = 1;
    this.sensitivity = 1;
    this.view = "angle";
    this.follow = "self";
    this.followSeat = 0;
    this.playerYaw = this.playerPitch = 0;
    this.playerContext = {
      activeSeat: 0,
      localSeat: 0,
      names: ["Người chơi 1", "Người chơi 2"],
    };
    this.playerLook = new THREE.Vector3();
    this.aimGuide = true;
    this.showAim = true;
    this.power = 0.4;
    this.angle = 0;
    this.jump = 0;
    this.balls = [];
    this.cueId = 0;
    this.lastTime = performance.now();
    this.shooting = 0;
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    this.intersection = new THREE.Vector3();
    this.setupLights();
    this.environment = new ClubEnvironment(this.scene);
    this.floor = this.environment.floor;
    this.table = new TableRenderer(this.scene);
    this.ballRenderer = new BallRenderer(this.scene);
    this.playerRenderer = new PlayerRenderer(this.scene);
    this.buildCue();
    this.cueLocalTip = new THREE.Vector3();
    this.buildGuide();
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(container);
    this.resize();
  }
  setupLights() {
    this.scene.background = new THREE.Color("#15231f");
    this.scene.fog = new THREE.Fog("#15231f", 16, 34);
    this.scene.add(new THREE.HemisphereLight("#f5e8d3", "#283b32", 0.85));
    const key = new THREE.DirectionalLight("#fff0d4", 2.7);
    key.position.set(-1.8, 6, 1.2);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    Object.assign(key.shadow.camera, {
      left: -4,
      right: 4,
      top: 3,
      bottom: -3,
      near: 1,
      far: 15,
    });
    key.shadow.bias = -0.0004;
    key.shadow.normalBias = 0.018;
    key.shadow.radius = 3;
    this.scene.add(key);
    this.keyLight = key;
    const fill = new THREE.DirectionalLight("#cbe7ee", 0.65);
    fill.position.set(4, 3, -4);
    this.scene.add(fill);
    // A tiny, prefiltered studio environment adds soft lamp reflections to the balls.
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    const room = new RoomEnvironment();
    this.reflections = pmrem.fromScene(room, 0.04);
    this.scene.environment = this.reflections.texture;
    this.scene.environmentIntensity = 0.38;
    room.dispose();
    pmrem.dispose();
  }
  buildCue() {
    const model = createClubCue();
    this.cue = model.group;
    this.cueTip = model.tip;
    this.scene.add(this.cue);
  }
  buildGuide() {
    // This short alignment segment is independent of trajectory predictions.
    this.cueGapPositions = new Float32Array(6);
    this.cueGapGeometry = new THREE.BufferGeometry();
    this.cueGapGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(this.cueGapPositions, 3),
    );
    this.cueGapLine = new THREE.Line(
      this.cueGapGeometry,
      new THREE.LineDashedMaterial({
        color: "#fff4ce",
        dashSize: 0.025,
        gapSize: 0.018,
        transparent: true,
        opacity: 0.85,
        depthTest: false,
      }),
    );
    this.cueGapLine.frustumCulled = false;
    this.cueGapLine.renderOrder = 2;
    this.cueGapLine.visible = false;
    this.cueGapStart = new THREE.Vector3();
    this.scene.add(this.cueGapLine);
    this.guideGroup = new THREE.Group();
    this.scene.add(this.guideGroup);
    this.guideGeometry = new THREE.BufferGeometry();
    this.guidePositions = new Float32Array(6);
    this.guideGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(this.guidePositions, 3),
    );
    this.guideLine = new THREE.Line(
      this.guideGeometry,
      new THREE.LineDashedMaterial({
        color: "#fff4ce",
        dashSize: 0.055,
        gapSize: 0.04,
        transparent: true,
        opacity: 0.72,
        depthTest: false,
      }),
    );
    this.guideLine.renderOrder = 2;
    this.guideGroup.add(this.guideLine);
    this.objectGeometry = new THREE.BufferGeometry();
    this.objectPositions = new Float32Array(6);
    this.objectGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(this.objectPositions, 3),
    );
    this.objectLine = new THREE.Line(
      this.objectGeometry,
      new THREE.LineDashedMaterial({
        color: "#ecce83",
        dashSize: 0.035,
        gapSize: 0.035,
        transparent: true,
        opacity: 0.8,
        depthTest: false,
      }),
    );
    this.objectLine.renderOrder = 2;
    this.guideGroup.add(this.objectLine);
    this.ghost = new THREE.Mesh(
      new THREE.SphereGeometry(TABLE.radius, 20, 12),
      new THREE.MeshBasicMaterial({
        color: "#fff5d7",
        transparent: true,
        opacity: 0.2,
        depthWrite: false,
      }),
    );
    this.guideGroup.add(this.ghost);
    this.hitRing = new THREE.Mesh(
      new THREE.RingGeometry(TABLE.radius * 1.1, TABLE.radius * 1.18, 30),
      new THREE.MeshBasicMaterial({
        color: "#f3d88e",
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
      }),
    );
    this.hitRing.rotation.x = -Math.PI / 2;
    this.guideGroup.add(this.hitRing);
  }
  setMode(pockets) {
    this.dirty = true;
    this.table.setMode(pockets);
    this.ballRenderer.setMode(!pockets);
    this.pockets = pockets;
  }
  sync(balls, cueId, dt = 1 / 60) {
    if (this.cueId !== cueId) this.dirty = true;
    this.balls = balls;
    this.cueId = cueId;
    if (this.ballRenderer.sync(balls, cueId, Math.min(dt, 0.1)))
      this.dirty = true;
    this.updateAim();
  }
  setAim(angle, power, spin = {}, show = true, jump = 0) {
    jump = Math.max(0, Math.min(1, Number(jump) || 0));
    if (
      this.angle !== angle ||
      this.power !== power ||
      this.showAim !== show ||
      this.jump !== jump ||
      this.spin?.x !== spin.x ||
      this.spin?.y !== spin.y
    )
      this.dirty = true;
    this.angle = angle;
    this.power = power;
    this.spin = spin;
    if (this.showAim && !show) {
      this.shootJump = this.jump;
      this.shooting = 0.22;
      this.shootOrigin = this.balls.find((b) => b.id === this.cueId);
      if (this.shootOrigin)
        this.shootOrigin = {
          x: this.shootOrigin.x,
          z: this.shootOrigin.z,
          height: this.shootOrigin.height || 0,
        };
    }
    this.jump = jump;
    this.showAim = show;
    this.updateAim();
  }
  updateAim() {
    const cue = this.balls.find(
      (b) => b.id === this.cueId && b.active !== false,
    );
    this.guideGroup.visible = Boolean(
      cue && this.showAim && this.aimGuide && !this.jump,
    );
    this.cueGapLine.visible = Boolean(
      cue && this.showAim && (!this.aimGuide || this.jump),
    );
    this.cue.visible = Boolean((cue && this.showAim) || this.shooting > 0);
    this.ballRenderer.cueHalo.visible = Boolean(cue && this.showAim);
    if (!cue) return;
    const dx = Math.cos(this.angle),
      dz = Math.sin(this.angle),
      pull = 0.08 + this.power * 0.34;
    if (this.showAim) {
      this.positionCue(cue, pull, this.jump);
    }
    if (this.cueGapLine.visible) {
      // Cylinder local -Y is the tip face nearest the cue ball.
      this.cueTip.localToWorld(
        this.cueGapStart.set(0, -this.cueTip.geometry.parameters.height / 2, 0),
      );
      const radius = cue.radius || TABLE.radius;
      const elevation = this.jump ? 0.18 + this.jump * 0.65 : 0;
      this.cueGapPositions.set([
        this.cueGapStart.x,
        this.cueGapStart.y,
        this.cueGapStart.z,
        cue.x - dx * Math.cos(elevation) * radius,
        radius + 0.008 + (cue.height || 0) + Math.sin(elevation) * radius,
        cue.z - dz * Math.cos(elevation) * radius,
      ]);
      this.cueGapGeometry.attributes.position.needsUpdate = true;
      this.cueGapLine.computeLineDistances();
    }
    if (!this.guideGroup.visible) return;
    let t = Infinity,
      hit = null;
    for (const ball of this.balls) {
      if (ball.id === cue.id || ball.active === false) continue;
      const ox = ball.x - cue.x,
        oz = ball.z - cue.z,
        along = ox * dx + oz * dz;
      if (along <= 0) continue;
      const perp = ox * ox + oz * oz - along * along,
        diameter = (cue.radius || TABLE.radius) + (ball.radius || TABLE.radius);
      if (perp >= diameter * diameter) continue;
      const distance =
        along - Math.sqrt(Math.max(0, diameter * diameter - perp));
      if (distance >= 0 && distance < t) {
        t = distance;
        hit = ball;
      }
    }
    const limits = [
      dx > 0
        ? (TABLE.halfWidth - TABLE.radius - cue.x) / dx
        : dx < 0
          ? (-TABLE.halfWidth + TABLE.radius - cue.x) / dx
          : Infinity,
      dz > 0
        ? (TABLE.halfHeight - TABLE.radius - cue.z) / dz
        : dz < 0
          ? (-TABLE.halfHeight + TABLE.radius - cue.z) / dz
          : Infinity,
    ];
    const wall = Math.min(...limits);
    if (wall < t) {
      t = wall;
      hit = null;
    }
    t = Math.max(0, Math.min(t, 7));
    const x = cue.x + dx * t,
      z = cue.z + dz * t;
    this.guidePositions.set([cue.x, 0.02, cue.z, x, 0.02, z]);
    this.guideGeometry.attributes.position.needsUpdate = true;
    this.guideLine.computeLineDistances();
    this.ghost.position.set(x, TABLE.radius + 0.01, z);
    this.ghost.visible = Boolean(hit);
    this.hitRing.visible = Boolean(hit);
    this.objectLine.visible = true;
    if (hit) {
      const nx = hit.x - x,
        nz = hit.z - z,
        n = Math.hypot(nx, nz) || 1;
      this.hitRing.position.set(hit.x, 0.014, hit.z);
      this.objectPositions.set([
        hit.x,
        0.02,
        hit.z,
        hit.x + (nx / n) * 0.7,
        0.02,
        hit.z + (nz / n) * 0.7,
      ]);
    } else {
      let rx = dx,
        rz = dz;
      if (limits[0] < limits[1]) rx = -rx;
      else rz = -rz;
      this.objectPositions.set([
        x,
        0.02,
        z,
        x + rx * 0.55,
        0.02,
        z + rz * 0.55,
      ]);
    }
    this.objectGeometry.attributes.position.needsUpdate = true;
    this.objectLine.computeLineDistances();
  }
  positionCue(cue, pull, jump = 0) {
    const dx = Math.cos(this.angle),
      dz = Math.sin(this.angle);
    const elevation = jump ? 0.18 + jump * 0.65 : 0;
    this.cue.rotation.set(0, -this.angle, -elevation);
    if (!jump) {
      this.cue.position.set(
        cue.x - dx * pull,
        0.014 + (cue.height || 0),
        cue.z - dz * pull,
      );
      return;
    }
    // Anchor the actual tip along the raised shaft's axis, behind the impact point.
    const distance =
      pull -
      this.cueTip.position.x -
      this.cueTip.geometry.parameters.height / 2;
    this.cueLocalTip
      .set(
        this.cueTip.position.x + this.cueTip.geometry.parameters.height / 2,
        this.cueTip.position.y,
        0,
      )
      .applyEuler(this.cue.rotation);
    this.cue.position.set(
      cue.x - dx * Math.cos(elevation) * distance - this.cueLocalTip.x,
      (cue.radius || TABLE.radius) +
        0.008 +
        (cue.height || 0) +
        Math.sin(elevation) * distance -
        this.cueLocalTip.y,
      cue.z - dz * Math.cos(elevation) * distance - this.cueLocalTip.z,
    );
  }
  render() {
    const now = performance.now(),
      dt = Math.min((now - this.lastTime) / 1000, 0.1);
    this.lastTime = now;
    if (this.shooting > 0 && !this.showAim && this.shootOrigin) {
      this.dirty = true;
      this.shooting -= dt;
      const progress = 1 - Math.max(0, this.shooting) / 0.22;
      const offset =
        progress < 0.3
          ? 0.3 * (1 - progress / 0.3)
          : 0.25 * ((progress - 0.3) / 0.7);
      this.positionCue(this.shootOrigin, offset, this.shootJump);
      this.cue.visible = this.shooting > 0;
    }
    // The physics clock keeps running; an idle table does not need more GPU frames.
    if (this.dirty) {
      this.renderer.render(this.scene, this.camera);
      this.dirty = false;
    }
  }
  screenToTable(clientX, clientY) {
    const rect = this.canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;
    this.pointer.set(
      ((clientX - rect.left) / rect.width) * 2 - 1,
      -((clientY - rect.top) / rect.height) * 2 + 1,
    );
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hit = this.raycaster.ray.intersectPlane(
      this.plane,
      this.intersection,
    );
    if (!hit) return null;
    return { x: hit.x, z: hit.z };
  }
  setPlayers(context) {
    this.playerContext = context;
    this.syncPlayers();
  }
  syncPlayers() {
    const c = this.playerContext;
    const local = c.localSeat ?? 0;
    const seat =
      this.follow === "turn"
        ? c.activeSeat
        : this.follow === "opponent"
          ? 1 - local
          : local;
    const changedSeat = seat !== this.followSeat;
    this.followSeat = seat;
    const changed = this.playerRenderer.sync({
      cue: this.balls.find((b) => b.id === this.cueId),
      angle: this.angle,
      activeSeat: c.activeSeat,
      names: c.names,
      aiming: this.showAim,
      view: this.view,
      followSeat: seat,
    });
    if (changed || changedSeat) {
      this.dirty = true;
      if (this.view === "first" || this.view === "third") this.updateCamera();
    }
  }
  setFollow(value) {
    if (!["self", "opponent", "turn"].includes(value)) return;
    this.follow = value;
    this.playerYaw = this.playerPitch = 0;
    this.syncPlayers();
    this.updateCamera();
  }
  centerPlayerView() {
    this.playerYaw = this.playerPitch = 0;
    this.updateCamera();
  }
  resize() {
    const w = this.container.clientWidth || 800,
      h = this.container.clientHeight || 500;
    this.renderer.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.updateCamera();
  }
  updateCamera() {
    this.dirty = true;
    const personView = this.view === "first" || this.view === "third";
    const fov =
      this.view === "first"
        ? THREE.MathUtils.clamp(55 * this.zoomLevel, 30, 75)
        : this.view === "third"
          ? 45
          : 38;
    if (this.camera.fov !== fov) {
      this.camera.fov = fov;
      this.camera.updateProjectionMatrix();
    }
    const state = this.playerRenderer.states[this.followSeat];
    if (personView && state.valid) {
      if (this.view === "first") {
        this.playerRenderer.people[this.followSeat].eye.getWorldPosition(
          this.camera.position,
        );
        this.playerLook.copy(state.focus).sub(this.camera.position);
        const yaw =
          Math.atan2(this.playerLook.x, this.playerLook.z) + this.playerYaw;
        const pitch = THREE.MathUtils.clamp(
          Math.atan2(
            this.playerLook.y,
            Math.hypot(this.playerLook.x, this.playerLook.z),
          ) + this.playerPitch,
          -1.2,
          1.1,
        );
        this.playerLook
          .set(
            Math.sin(yaw) * Math.cos(pitch),
            Math.sin(pitch),
            Math.cos(yaw) * Math.cos(pitch),
          )
          .add(this.camera.position);
        this.camera.lookAt(this.playerLook);
      } else {
        const yaw =
          Math.atan2(state.forward.x, state.forward.z) + this.playerYaw;
        const distance = 1.7 * this.zoomLevel;
        this.camera.position.set(
          state.position.x - Math.sin(yaw) * distance,
          1.1 + 0.9 * this.zoomLevel + this.playerPitch,
          state.position.z - Math.cos(yaw) * distance,
        );
        this.camera.lookAt(state.focus);
      }
      this.camera.updateMatrixWorld();
      this.environment.setCamera(this.camera, this.view);
      return;
    }
    const aspect = this.camera.aspect,
      tan = Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2));
    const width =
      6.55 * Math.abs(Math.cos(this.azimuth)) +
      3.7 * Math.abs(Math.sin(this.azimuth));
    const depth =
      3.7 * Math.abs(Math.cos(this.azimuth)) +
      6.55 * Math.abs(Math.sin(this.azimuth));
    const elevation =
      this.view === "top" ? Math.PI / 2 - 0.001 : this.elevation;
    const framing = this.view === "top" ? 1.18 : aspect < 1.3 ? 1.24 : 1.4;
    const distance =
      Math.max(
        width / (2 * tan * aspect),
        (depth * Math.sin(elevation) + 0.5) / (2 * tan),
      ) *
      framing *
      this.zoomLevel;
    this.camera.position.set(
      Math.sin(this.azimuth) * Math.cos(elevation) * distance,
      Math.sin(elevation) * distance,
      Math.cos(this.azimuth) * Math.cos(elevation) * distance,
    );
    this.camera.position.add(this.target);
    this.camera.lookAt(this.target);
    this.camera.updateMatrixWorld();
    this.environment.setCamera(this.camera, this.view);
  }
  setView(view) {
    this.view = ["angle", "top", "first", "third"].includes(view)
      ? view
      : "angle";
    this.azimuth = 0;
    this.zoomLevel = 1;
    this.playerYaw = this.playerPitch = 0;
    this.target.set(0, view === "top" ? -0.04 : 0.12, 0);
    this.syncPlayers();
    this.updateCamera();
  }
  resetCamera() {
    this.elevation = 0.74;
    this.setView("angle");
  }
  pan(right, forward) {
    if (this.view === "first" || this.view === "third") {
      this.playerYaw += right * 0.5;
      this.playerPitch = THREE.MathUtils.clamp(
        this.playerPitch + forward * 0.3,
        -0.5,
        0.8,
      );
      this.updateCamera();
      return;
    }
    this.target.x = THREE.MathUtils.clamp(
      this.target.x +
        right * Math.cos(this.azimuth) -
        forward * Math.sin(this.azimuth),
      -TABLE.halfWidth,
      TABLE.halfWidth,
    );
    this.target.z = THREE.MathUtils.clamp(
      this.target.z -
        right * Math.sin(this.azimuth) -
        forward * Math.cos(this.azimuth),
      -TABLE.halfHeight,
      TABLE.halfHeight,
    );
    this.updateCamera();
  }
  orbit(dx, dy) {
    if (this.view === "first" || this.view === "third") {
      this.playerYaw -= dx * 0.005 * this.sensitivity;
      this.playerPitch = THREE.MathUtils.clamp(
        this.playerPitch + dy * 0.004 * this.sensitivity,
        -0.5,
        0.8,
      );
      this.updateCamera();
      return;
    }
    this.view = "angle";
    this.azimuth -= dx * 0.005 * this.sensitivity;
    this.elevation = THREE.MathUtils.clamp(
      this.elevation + dy * 0.004 * this.sensitivity,
      0.35,
      1.5,
    );
    this.updateCamera();
  }
  zoom(delta) {
    this.adjustZoom(Math.sign(delta) * 0.065);
  }
  adjustZoom(amount) {
    this.zoomLevel = THREE.MathUtils.clamp(
      this.zoomLevel * Math.exp(amount),
      this.view === "first" || this.view === "third" ? 0.65 : 0.35,
      1.8,
    );
    this.updateCamera();
  }
  setSettings(settings = {}) {
    this.dirty = true;
    if (settings.tableColor) this.table.setColor(settings.tableColor);
    if (settings.ballStyle) this.ballRenderer.setStyle(settings.ballStyle);
    if (settings.sensitivity !== undefined)
      this.sensitivity = Number(settings.sensitivity);
    if (settings.aimGuide !== undefined) this.aimGuide = settings.aimGuide;
    if (settings.quality && settings.quality !== this.quality) {
      this.quality = settings.quality;
      const low = settings.quality === "low",
        high = settings.quality === "high";
      this.renderer.setPixelRatio(
        low ? 1 : Math.min(window.devicePixelRatio, high ? 2 : 1.5),
      );
      this.renderer.shadowMap.enabled = !low;
      this.keyLight.castShadow = !low;
      this.keyLight.shadow.mapSize.set(high ? 2048 : 1024, high ? 2048 : 1024);
      this.keyLight.shadow.map?.dispose();
      this.keyLight.shadow.map = null;
      this.environment.setQuality(settings.quality);
      this.ballRenderer.setQuality(settings.quality);
      this.scene.traverse((o) => {
        if (o.material)
          for (const mat of Array.isArray(o.material)
            ? o.material
            : [o.material])
            mat.needsUpdate = true;
      });
      this.resize();
    }
    this.updateAim();
  }
  dispose() {
    this.resizeObserver.disconnect();
    this.table.dispose();
    this.ballRenderer.dispose();
    this.playerRenderer.dispose();
    this.environment.dispose();
    this.reflections.dispose();
    this.keyLight.shadow.dispose();
    const gs = new Set(),
      ms = new Set(),
      ts = new Set();
    this.scene.traverse((o) => {
      if (o.geometry) gs.add(o.geometry);
      if (o.material)
        for (const m of Array.isArray(o.material) ? o.material : [o.material]) {
          ms.add(m);
          if (m.map) ts.add(m.map);
        }
    });
    gs.forEach((g) => g.dispose());
    ms.forEach((m) => m.dispose());
    ts.forEach((t) => t.dispose());
    this.renderer.dispose();
    this.canvas.remove();
  }
}
