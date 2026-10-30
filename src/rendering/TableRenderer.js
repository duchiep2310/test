import * as THREE from "three";
import { TABLE, POCKETS } from "../core/Constants.js";

const wood = "#302c28";
function box(w, h, d, material, x = 0, y = 0, z = 0) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}
function feltTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, 128, 128);
  let seed = 17;
  for (let i = 0; i < 5000; i++) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const x = seed % 128;
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const y = seed % 128;
    ctx.fillStyle = i % 2 ? "rgba(0,0,0,.04)" : "rgba(255,255,255,.04)";
    ctx.fillRect(x, y, 1, 1);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(14, 7);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
export class TableRenderer {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    scene.add(this.group);
    this.cloth = new THREE.MeshStandardMaterial({
      color: "#087d74",
      roughness: 0.93,
      map: feltTexture(),
    });
    this.cushionMaterial = new THREE.MeshStandardMaterial({
      color: "#09695f",
      roughness: 0.84,
    });
    this.woodMaterial = new THREE.MeshStandardMaterial({
      color: wood,
      roughness: 0.36,
      metalness: 0.12,
    });
    this.brass = new THREE.MeshStandardMaterial({
      color: "#b7a071",
      roughness: 0.4,
      metalness: 0.7,
    });
    this.dark = new THREE.MeshStandardMaterial({
      color: "#111919",
      roughness: 0.92,
    });
    this.build();
    this.setMode(true);
  }
  build() {
    const frame = this.group;
    const base = box(6.3, 0.25, 3.5, this.woodMaterial, 0, -0.145, 0);
    frame.add(base);
    const apron = box(
      6.07,
      0.22,
      3.27,
      new THREE.MeshStandardMaterial({ color: "#1d2422", roughness: 0.55 }),
      0,
      -0.36,
      0,
    );
    frame.add(apron);
    // Thin brass seam, intentionally restrained against the dark walnut surround.
    const seam = new THREE.MeshStandardMaterial({
      color: "#8c7953",
      metalness: 0.7,
      roughness: 0.45,
    });
    frame.add(box(6.31, 0.018, 3.51, seam, 0, -0.255, 0));
    const surface = new THREE.Mesh(
      new THREE.PlaneGeometry(TABLE.width, TABLE.height),
      this.cloth,
    );
    surface.rotation.x = -Math.PI / 2;
    surface.receiveShadow = true;
    surface.position.y = 0.003;
    frame.add(surface);
    for (const x of [-2.25, 2.25])
      for (const z of [-1.05, 1.05]) {
        const leg = box(0.23, 0.75, 0.23, this.woodMaterial, x, -0.7, z);
        frame.add(leg);
        frame.add(box(0.24, 0.035, 0.24, this.brass, x, -1.06, z));
      }
    // Rail diamonds are inlaid squares; no labels obstruct the playing surface.
    const diamondGeo = new THREE.OctahedronGeometry(0.027, 0);
    for (const side of [-1, 1]) {
      for (const x of [-2.1, -1.4, -0.7, 0.7, 1.4, 2.1]) {
        const mark = new THREE.Mesh(diamondGeo, this.brass);
        mark.scale.y = 0.18;
        mark.rotation.y = Math.PI / 4;
        mark.position.set(x, 0.005, side * 1.58);
        frame.add(mark);
      }
      for (const z of [-0.7, 0, 0.7]) {
        const mark = new THREE.Mesh(diamondGeo, this.brass);
        mark.scale.y = 0.18;
        mark.rotation.y = Math.PI / 4;
        mark.position.set(side * 2.98, 0.005, z);
        frame.add(mark);
      }
    }
    const spotMat = new THREE.MeshBasicMaterial({
      color: "#c0ded1",
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    });
    for (const x of [-1.4, 1.4]) {
      const spot = new THREE.Mesh(
        new THREE.RingGeometry(0.014, 0.021, 20),
        spotMat,
      );
      spot.rotation.x = -Math.PI / 2;
      spot.position.set(x, 0.007, 0);
      frame.add(spot);
    }
    // Head-string, drawn with a whisper of opacity.
    const lineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-1.4, 0.007, -1.37),
      new THREE.Vector3(-1.4, 0.007, 1.37),
    ]);
    frame.add(
      new THREE.Line(
        lineGeo,
        new THREE.LineBasicMaterial({
          color: "#b3d3c8",
          transparent: true,
          opacity: 0.07,
        }),
      ),
    );
    this.rails = new THREE.Group();
    frame.add(this.rails);
    this.pocketGroup = new THREE.Group();
    frame.add(this.pocketGroup);
    const holeGeo = new THREE.CircleGeometry(TABLE.pocketRadius * 1.12, 36);
    const holeMat = new THREE.MeshBasicMaterial({ color: "#081312" });
    const ringGeo = new THREE.TorusGeometry(
      TABLE.pocketRadius * 1.14,
      0.018,
      8,
      40,
    );
    POCKETS.forEach((p, i) => {
      const hole = new THREE.Mesh(holeGeo, holeMat);
      hole.rotation.x = -Math.PI / 2;
      hole.position.set(p.x, 0.011, p.z);
      this.pocketGroup.add(hole);
      const ring = new THREE.Mesh(
        ringGeo,
        new THREE.MeshStandardMaterial({ color: "#171e1a", roughness: 0.8 }),
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(p.x, 0.007, p.z);
      this.pocketGroup.add(ring);
      const label = document.createElement("canvas");
      label.width = label.height = 64;
      const c = label.getContext("2d");
      c.fillStyle = "#b7a071";
      c.font = "500 34px sans-serif";
      c.textAlign = "center";
      c.textBaseline = "middle";
      c.fillText(String(i + 1), 32, 32);
      const spriteMaterial = new THREE.SpriteMaterial({
        map: new THREE.CanvasTexture(label),
        transparent: true,
        opacity: 0.7,
        depthTest: false,
      });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(0.13, 0.13, 0.13);
      sprite.position.set(
        p.x + (p.x === 0 ? 0 : Math.sign(p.x) * 0.11),
        0.14,
        p.z + Math.sign(p.z) * 0.19,
      );
      this.pocketGroup.add(sprite);
    });
  }
  setMode(pockets) {
    this.pockets = pockets;
    this.pocketGroup.visible = pockets;
    while (this.rails.children.length) {
      const child = this.rails.children[0];
      this.rails.remove(child);
      child.geometry.dispose();
    }
    const segments = pockets
      ? [
          [-2.59, -0.19],
          [0.19, 2.59],
        ]
      : [[-2.8, 2.8]];
    for (const side of [-1, 1]) {
      for (const [a, b] of segments)
        this.rails.add(
          box(
            b - a,
            0.105,
            0.115,
            this.cushionMaterial,
            (a + b) / 2,
            0.02,
            side * 1.455,
          ),
        );
      this.rails.add(
        box(
          0.115,
          0.105,
          pockets ? 2.38 : 2.8,
          this.cushionMaterial,
          side * 2.855,
          0.02,
          0,
        ),
      );
    }
  }
  setColor(color) {
    this.cloth.color.set(color);
    this.cushionMaterial.color.set(color).multiplyScalar(0.75);
  }
  dispose() {
    const geometries = new Set(),
      materials = new Set(),
      textures = new Set();
    this.group.traverse((o) => {
      if (o.geometry) geometries.add(o.geometry);
      if (o.material)
        for (const m of Array.isArray(o.material) ? o.material : [o.material]) {
          materials.add(m);
          if (m.map) textures.add(m.map);
        }
    });
    geometries.forEach((g) => g.dispose());
    materials.forEach((m) => m.dispose());
    textures.forEach((t) => t.dispose());
    this.scene.remove(this.group);
  }
}
