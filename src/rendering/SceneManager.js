import * as THREE from "three";
import { TABLE } from "../core/Constants.js";
import { TableRenderer } from "./TableRenderer.js";
import { BallRenderer } from "./BallRenderer.js";

export class SceneManager {
  constructor(container, callbacks = {}) {
    this.container = container;
    this.callbacks = callbacks;
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
    this.renderer.toneMappingExposure = 0.95;
    this.canvas = this.renderer.domElement;
    this.canvas.setAttribute("aria-label", "Interactive 3D billiards table");
    this.canvas.style.touchAction = "none";
    container.append(this.canvas);
    this.camera = new THREE.PerspectiveCamera(38, 1, 0.05, 60);
    this.target = new THREE.Vector3(0, -0.04, 0);
    this.azimuth = 0;
    this.elevation = 0.91;
    this.zoomLevel = 1;
    this.sensitivity = 1;
    this.view = "angle";
    this.aimGuide = true;
    this.showAim = true;
    this.power = 0.4;
    this.angle = 0;
    this.balls = [];
    this.cueId = 0;
    this.lastTime = performance.now();
    this.shooting = 0;
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    this.intersection = new THREE.Vector3();
    this.setupLights();
    this.table = new TableRenderer(this.scene);
    this.ballRenderer = new BallRenderer(this.scene);
    this.buildCue();
    this.buildGuide();
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(container);
    this.resize();
  }
  setupLights() {
    this.scene.add(new THREE.HemisphereLight("#ffffff", "#7e8d82", 1.3));
    const key = new THREE.DirectionalLight("#fff5da", 2.3);
    key.position.set(-2, 7, 3);
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
    const fill = new THREE.DirectionalLight("#e7fcff", 0.7);
    fill.position.set(4, 3, -4);
    this.scene.add(fill);
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(60, 60),
      new THREE.MeshStandardMaterial({ color: "#e7eae1", roughness: 1 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.1;
    floor.receiveShadow = true;
    this.scene.add(floor);
    this.floor = floor;
    this.scene.fog = new THREE.Fog("#e7eae1", 16, 35);
  }
  buildCue() {
    this.cue = new THREE.Group();
    this.scene.add(this.cue);
    const maple = new THREE.MeshStandardMaterial({
      color: "#cfab70",
      roughness: 0.42,
    });
    const ebony = new THREE.MeshStandardMaterial({
      color: "#38332c",
      roughness: 0.3,
    });
    const ferrule = new THREE.MeshStandardMaterial({
      color: "#f5e9c8",
      roughness: 0.3,
    });
    const tip = new THREE.MeshStandardMaterial({
      color: "#7fa8a1",
      roughness: 0.85,
    });
    const section = (a, b, length, x, mat) => {
      const m = new THREE.Mesh(
        new THREE.CylinderGeometry(a, b, length, 12),
        mat,
      );
      m.rotation.z = Math.PI / 2;
      m.position.set(x, 0.055, 0);
      m.castShadow = true;
      this.cue.add(m);
    };
    section(0.012, 0.022, 0.92, -0.66, maple);
    section(0.022, 0.031, 0.58, -1.41, ebony);
    section(0.012, 0.012, 0.055, -0.172, ferrule);
    section(0.013, 0.013, 0.016, -0.136, tip);
  }
  buildGuide() {
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
    this.table.setMode(pockets);
    this.ballRenderer.setMode(!pockets);
    this.pockets = pockets;
  }
  sync(balls, cueId, dt = 1 / 60) {
    this.balls = balls;
    this.cueId = cueId;
    this.ballRenderer.sync(balls, cueId, Math.min(dt, 0.1));
    this.updateAim();
  }
  setAim(angle, power, spin = {}, show = true) {
    this.angle = angle;
    this.power = power;
    this.spin = spin;
    if (this.showAim && !show) {
      this.shooting = 0.22;
      this.shootOrigin = this.balls.find((b) => b.id === this.cueId);
      if (this.shootOrigin)
        this.shootOrigin = { x: this.shootOrigin.x, z: this.shootOrigin.z };
    }
    this.showAim = show;
    this.updateAim();
  }
  updateAim() {
    const cue = this.balls.find(
      (b) => b.id === this.cueId && b.active !== false,
    );
    this.guideGroup.visible = Boolean(cue && this.showAim && this.aimGuide);
    this.cue.visible = Boolean((cue && this.showAim) || this.shooting > 0);
    this.ballRenderer.cueHalo.visible = Boolean(cue && this.showAim);
    if (!cue) return;
    const dx = Math.cos(this.angle),
      dz = Math.sin(this.angle),
      pull = 0.08 + this.power * 0.34;
    if (this.showAim) {
      this.cue.position.set(cue.x - dx * pull, 0.014, cue.z - dz * pull);
      this.cue.rotation.y = -this.angle;
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
  render() {
    const now = performance.now(),
      dt = Math.min((now - this.lastTime) / 1000, 0.1);
    this.lastTime = now;
    if (this.shooting > 0 && !this.showAim && this.shootOrigin) {
      this.shooting -= dt;
      const progress = 1 - Math.max(0, this.shooting) / 0.22;
      const offset =
        progress < 0.3
          ? 0.3 * (1 - progress / 0.3)
          : 0.25 * ((progress - 0.3) / 0.7);
      this.cue.position.set(
        this.shootOrigin.x - Math.cos(this.angle) * offset,
        0.014,
        this.shootOrigin.z - Math.sin(this.angle) * offset,
      );
      this.cue.rotation.y = -this.angle;
      this.cue.visible = this.shooting > 0;
    }
    this.renderer.render(this.scene, this.camera);
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
  resize() {
    const w = this.container.clientWidth || 800,
      h = this.container.clientHeight || 500;
    this.renderer.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.updateCamera();
  }
  updateCamera() {
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
    const distance =
      Math.max(
        width / (2 * tan * aspect),
        (depth * Math.sin(elevation) + 0.5) / (2 * tan),
      ) *
      1.26 *
      this.zoomLevel;
    this.camera.position.set(
      Math.sin(this.azimuth) * Math.cos(elevation) * distance,
      Math.sin(elevation) * distance,
      Math.cos(this.azimuth) * Math.cos(elevation) * distance,
    );
    this.camera.lookAt(this.target);
    this.camera.updateMatrixWorld();
  }
  setView(view) {
    this.view = view === "top" ? "top" : "angle";
    this.azimuth = 0;
    this.zoomLevel = 1;
    this.updateCamera();
  }
  orbit(dx, dy) {
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
    this.zoomLevel = THREE.MathUtils.clamp(
      this.zoomLevel * (1 + Math.sign(delta) * 0.065),
      0.7,
      1.6,
    );
    this.updateCamera();
  }
  setSettings(settings = {}) {
    if (settings.tableColor) this.table.setColor(settings.tableColor);
    if (settings.ballStyle) this.ballRenderer.setStyle(settings.ballStyle);
    if (settings.sensitivity !== undefined)
      this.sensitivity = Number(settings.sensitivity);
    if (settings.aimGuide !== undefined) this.aimGuide = settings.aimGuide;
    if (settings.quality) {
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
