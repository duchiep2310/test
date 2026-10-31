import * as THREE from "three";
import { canvasTexture } from "./ClubMaterials.js";

function shaftTexture() {
  return canvasTexture(256, 512, (c, w, h) => {
    c.fillStyle = "#e0bf82";
    c.fillRect(0, 0, w, h);
    for (let i = 0; i < 100; i++) {
      const x = (i * 73) % w,
        wave = (i % 7) * 0.8;
      c.strokeStyle = i % 3 ? "#78512116" : "#fff0c32b";
      c.lineWidth = 0.4 + (i % 3) * 0.3;
      c.beginPath();
      c.moveTo(x, 0);
      c.bezierCurveTo(x + wave, h * 0.3, x - wave, h * 0.7, x + 1, h);
      c.stroke();
    }
  });
}
function inlayTexture() {
  return canvasTexture(512, 512, (c, w, h) => {
    c.fillStyle = "#15201c";
    c.fillRect(0, 0, w, h);
    for (let i = 0; i < 4; i++) {
      const x = i * 128 + 64;
      c.beginPath();
      c.moveTo(x - 39, 35);
      c.lineTo(x + 39, 35);
      c.lineTo(x, 458);
      c.closePath();
      c.fillStyle = "#d8c49a";
      c.fill();
      c.strokeStyle = "#b99d65";
      c.lineWidth = 4;
      c.stroke();
      c.beginPath();
      c.moveTo(x - 15, 54);
      c.lineTo(x + 15, 54);
      c.lineTo(x, 301);
      c.closePath();
      c.fillStyle = "#26352d";
      c.fill();
    }
  });
}
function leatherTexture() {
  return canvasTexture(128, 256, (c, w, h) => {
    c.fillStyle = "#252b26";
    c.fillRect(0, 0, w, h);
    for (let y = -w; y < h + w; y += 7) {
      c.strokeStyle = "#4c51452b";
      c.lineWidth = 1;
      c.beginPath();
      c.moveTo(0, y);
      c.lineTo(w, y + w * 0.22);
      c.stroke();
      c.strokeStyle = "#050c0840";
      c.beginPath();
      c.moveTo(0, y + 2);
      c.lineTo(w, y + w * 0.22 + 2);
      c.stroke();
    }
  });
}

/** Detailed club cue. The tip face and its local coordinates remain compatible
 * with the existing aiming-gap and jump-elevation calculations. */
export function createClubCue() {
  const group = new THREE.Group();
  group.name = "Ebony and ivory club cue";
  const grain = shaftTexture(),
    wrap = leatherTexture();
  const maple = new THREE.MeshPhysicalMaterial({
    map: grain,
    roughness: 0.28,
    clearcoat: 0.8,
    clearcoatRoughness: 0.16,
  });
  const ebony = new THREE.MeshPhysicalMaterial({
    color: "#17221e",
    roughness: 0.2,
    clearcoat: 0.8,
    clearcoatRoughness: 0.12,
  });
  const inlay = new THREE.MeshPhysicalMaterial({
    map: inlayTexture(),
    roughness: 0.24,
    clearcoat: 0.85,
    clearcoatRoughness: 0.14,
  });
  const leather = new THREE.MeshStandardMaterial({
    map: wrap,
    bumpMap: wrap,
    bumpScale: 0.0005,
    roughness: 0.76,
  });
  const gold = new THREE.MeshStandardMaterial({
    color: "#c2a576",
    metalness: 0.82,
    roughness: 0.26,
  });
  const ivory = new THREE.MeshPhysicalMaterial({
    color: "#f2e8cf",
    roughness: 0.24,
    clearcoat: 0.5,
  });
  const bumper = new THREE.MeshStandardMaterial({
    color: "#101814",
    roughness: 0.9,
  });
  const chalk = new THREE.MeshStandardMaterial({
    color: "#518c99",
    roughness: 0.95,
  });
  const section = (backRadius, frontRadius, length, x, material) => {
    const mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(backRadius, frontRadius, length, 24),
      material,
    );
    mesh.rotation.z = Math.PI / 2;
    mesh.position.set(x, 0.055, 0);
    mesh.castShadow = true;
    group.add(mesh);
    return mesh;
  };
  // Local +Y rotates to the butt end (-X), so the shaft narrows toward the tip.
  section(0.022, 0.012, 0.92, -0.66, maple);
  section(0.029, 0.022, 0.32, -1.28, inlay);
  section(0.033, 0.029, 0.29, -1.585, leather);
  section(0.034, 0.033, 0.11, -1.785, ebony);
  section(0.034, 0.034, 0.018, -1.85, bumper);
  for (const [x, r, length] of [
    [-1.115, 0.023, 0.012],
    [-1.14, 0.0235, 0.008],
    [-1.435, 0.0295, 0.009],
    [-1.455, 0.03, 0.006],
    [-1.73, 0.0335, 0.008],
    [-1.755, 0.034, 0.009],
    [-1.827, 0.0345, 0.012],
  ])
    section(r, r, length, x, gold);
  section(0.012, 0.012, 0.055, -0.172, ivory);
  const tip = section(0.013, 0.013, 0.016, -0.136, chalk);
  return { group, tip };
}
