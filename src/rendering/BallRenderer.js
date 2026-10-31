import * as THREE from "three";
import { BALL_COLORS, TABLE } from "../core/Constants.js";

function ballTexture(id, carom = false) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  const color = carom
    ? ["#faf7e9", "#e9b724", "#d6483f"][id]
    : BALL_COLORS[id] || "#ffffff";
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 512, 256);
  if (!carom && id > 8) {
    ctx.fillStyle = "#f6f3e7";
    ctx.fillRect(0, 0, 512, 63);
    ctx.fillRect(0, 193, 512, 63);
  }
  if (!carom && id !== 0) {
    for (const x of [128, 384]) {
      ctx.fillStyle = "#fffdf2";
      ctx.beginPath();
      ctx.ellipse(x, 128, 34, 34, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#172128";
      ctx.font = "bold 45px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(String(id), x, 130);
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function contactShadowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(32, 32, 2, 32, 32, 32);
  gradient.addColorStop(0, "rgba(0,0,0,.8)");
  gradient.addColorStop(0.45, "rgba(0,0,0,.4)");
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
}
export class BallRenderer {
  constructor(scene) {
    this.scene = scene;
    this.meshes = new Map();
    this.geometry = new THREE.SphereGeometry(TABLE.radius, 28, 20);
    this.shadowGeometry = new THREE.PlaneGeometry(1, 1);
    this.shadowTexture = contactShadowTexture();
    this.carom = false;
    this.quality = "medium";
    this.ballStyle = "gloss";
    this.axis = new THREE.Vector3();
    this.up = new THREE.Vector3(0, 1, 0);
    this.cueHalo = new THREE.Mesh(
      new THREE.RingGeometry(TABLE.radius * 1.18, TABLE.radius * 1.3, 40),
      new THREE.MeshBasicMaterial({
        color: "#f8e5a6",
        transparent: true,
        opacity: 0.65,
        depthWrite: false,
      }),
    );
    this.cueHalo.rotation.x = -Math.PI / 2;
    this.cueHalo.position.y = 0.012;
    scene.add(this.cueHalo);
  }
  create(ball) {
    const material = new THREE.MeshStandardMaterial({
      map: ballTexture(ball.id, this.carom),
      roughness: this.ballStyle === "classic" ? 0.32 : 0.17,
      metalness: 0.03,
    });
    const mesh = new THREE.Mesh(this.geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    // Initial orientation exposes a number and gives every stripe a different roll.
    mesh.rotation.set(0.45 + (ball.id % 3) * 0.35, (ball.id % 4) * 0.4, 0);
    const height = Math.max(0, ball.height || 0);
    mesh.position.set(
      ball.x,
      (ball.radius || TABLE.radius) + 0.008 + height,
      ball.z,
    );
    this.scene.add(mesh);
    const shadow = new THREE.Mesh(
      this.shadowGeometry,
      new THREE.MeshBasicMaterial({
        map: this.shadowTexture,
        transparent: true,
        opacity: 0.24,
        depthWrite: false,
        toneMapped: false,
      }),
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.set(ball.x, 0.009, ball.z);
    this.scene.add(shadow);
    const entry = {
      mesh,
      shadow,
      lastX: ball.x,
      lastZ: ball.z,
      lastHeight: height,
      sinkHeight: height,
      sink: 0,
      active: ball.active !== false,
    };
    this.meshes.set(ball.id, entry);
    return entry;
  }
  sync(balls, cueId, dt) {
    let changed = false;
    const ids = new Set(balls.map((b) => b.id));
    for (const [id, entry] of this.meshes)
      if (!ids.has(id)) {
        this.remove(entry);
        this.meshes.delete(id);
        changed = true;
      }
    for (const ball of balls) {
      if (!this.meshes.has(ball.id)) changed = true;
      const entry = this.meshes.get(ball.id) || this.create(ball);
      const mesh = entry.mesh;
      const dx = ball.x - entry.lastX,
        dz = ball.z - entry.lastZ,
        dist = Math.hypot(dx, dz),
        height = Math.max(0, ball.height || 0);
      if (
        dist > 0 ||
        entry.lastHeight !== height ||
        entry.active !== (ball.active !== false)
      )
        changed = true;
      if (dist > 0.000001 && dist < 0.5) {
        this.axis.set(dz, 0, -dx).normalize();
        mesh.rotateOnWorldAxis(this.axis, dist / (ball.radius || TABLE.radius));
      }
      entry.lastX = ball.x;
      entry.lastZ = ball.z;
      entry.lastHeight = height;
      if (ball.active === false) {
        if (entry.active) entry.sinkHeight = height;
        if (entry.sink < 1) changed = true;
        entry.sink = Math.min(1, entry.sink + dt * 2.5);
        mesh.position.set(
          ball.x,
          (ball.radius || TABLE.radius) +
            0.008 +
            entry.sinkHeight -
            entry.sink * 0.37,
          ball.z,
        );
        mesh.scale.setScalar(Math.max(0.05, 1 - entry.sink * 0.7));
        mesh.visible = entry.sink < 1;
      } else {
        entry.sink = 0;
        mesh.visible = true;
        mesh.scale.setScalar(1);
        mesh.position.set(
          ball.x,
          (ball.radius || TABLE.radius) + 0.008 + height,
          ball.z,
        );
      }
      entry.shadow.visible = ball.active !== false;
      entry.shadow.position.set(ball.x, 0.009, ball.z);
      entry.shadow.scale.setScalar(
        (ball.radius || TABLE.radius) * (2.8 + height * 4),
      );
      entry.shadow.material.opacity = 0.24 / (1 + height * 5);
      entry.active = ball.active !== false;
    }
    const cue = balls.find((b) => b.id === cueId && b.active !== false);
    this.cueHalo.visible = Boolean(cue);
    if (cue) {
      this.cueHalo.position.x = cue.x;
      this.cueHalo.position.z = cue.z;
    }
    return changed;
  }
  setMode(carom) {
    if (this.carom === carom) return;
    this.carom = carom;
    this.reset();
  }
  setStyle(style) {
    this.ballStyle = style;
    for (const { mesh } of this.meshes.values())
      mesh.material.roughness = style === "classic" ? 0.32 : 0.17;
  }
  reset() {
    for (const entry of this.meshes.values()) this.remove(entry);
    this.meshes.clear();
  }
  remove({ mesh, shadow }) {
    this.scene.remove(mesh);
    mesh.material.map?.dispose();
    mesh.material.dispose();
    this.scene.remove(shadow);
    shadow.material.dispose();
  }
  dispose() {
    this.reset();
    this.geometry.dispose();
    this.shadowGeometry.dispose();
    this.shadowTexture.dispose();
    this.cueHalo.geometry.dispose();
    this.cueHalo.material.dispose();
    this.scene.remove(this.cueHalo);
  }
}
