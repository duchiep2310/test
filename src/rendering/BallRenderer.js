import * as THREE from "three";
import { BALL_COLORS, TABLE } from "../core/Constants.js";

function ballTexture(id, carom = false, quality = "medium") {
  const canvas = document.createElement("canvas");
  canvas.width = quality === "low" ? 512 : 1024;
  canvas.height = canvas.width / 2;
  const ctx = canvas.getContext("2d");
  ctx.scale(canvas.width / 1024, canvas.height / 512);
  const color = carom
    ? ["#faf7e9", "#e9b724", "#d6483f"][id]
    : id === 8
      ? "#11191b"
      : id === 0
        ? "#fcfaf3"
        : BALL_COLORS[id] || "#ffffff";
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1024, 512);
  if (!carom && id > 8) {
    ctx.fillStyle = "#faf7ee";
    ctx.fillRect(0, 0, 1024, 126);
    ctx.fillRect(0, 386, 1024, 126);
  }
  if (!carom && id !== 0) {
    for (const x of [256, 768]) {
      ctx.fillStyle = "#fffcf2";
      ctx.beginPath();
      ctx.ellipse(x, 256, 67, 67, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#a18d5d7a";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = "#14231e";
      ctx.font = "700 84px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(String(id), x, 260);
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
    this.geometry = new THREE.SphereGeometry(TABLE.radius, 36, 24);
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
    const material = new THREE.MeshPhysicalMaterial({
      map: ballTexture(ball.id, this.carom, this.quality),
      metalness: 0,
      ior: 1.5,
      specularIntensity: 0.8,
      envMapIntensity: 1.15,
    });
    this.finish(material);
    const mesh = new THREE.Mesh(this.geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    // Face one number toward the raised camera; rolling takes over after a shot.
    mesh.rotation.set(
      -0.95 + ((ball.id % 3) - 1) * 0.08,
      ((ball.id % 4) - 1.5) * 0.14,
      ((ball.id % 5) - 2) * 0.28,
    );
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
    for (const { mesh } of this.meshes.values()) this.finish(mesh.material);
  }
  finish(material) {
    const gloss = this.ballStyle !== "classic";
    material.roughness = gloss ? 0.12 : 0.24;
    material.clearcoat = this.quality === "low" ? 0.45 : gloss ? 1 : 0.8;
    material.clearcoatRoughness = gloss ? 0.065 : 0.14;
  }
  setQuality(quality) {
    if (this.quality === quality) return;
    const resizeTextures = (this.quality === "low") !== (quality === "low");
    this.quality = quality;
    const previous = this.geometry;
    this.geometry = new THREE.SphereGeometry(
      TABLE.radius,
      quality === "low" ? 24 : quality === "high" ? 48 : 36,
      quality === "low" ? 16 : quality === "high" ? 32 : 24,
    );
    for (const [id, { mesh }] of this.meshes) {
      mesh.geometry = this.geometry;
      if (resizeTextures) {
        mesh.material.map.dispose();
        mesh.material.map = ballTexture(id, this.carom, quality);
        mesh.material.needsUpdate = true;
      }
      this.finish(mesh.material);
    }
    previous.dispose();
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
