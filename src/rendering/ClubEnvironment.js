import * as THREE from "three";
import {
  canvasTexture,
  floorTexture,
  rugTexture,
  softShadowTexture,
  walnutTexture,
  disposeGroup,
} from "./ClubMaterials.js";

const FLOOR_Y = -1.1;

/** A small club interior. All objects here are scenery, outside the physics world. */
export class ClubEnvironment {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.name = "Velvet billiards club";
    scene.add(this.group);
    this.brass = new THREE.MeshStandardMaterial({
      color: "#b19460",
      metalness: 0.72,
      roughness: 0.3,
    });
    this.dark = new THREE.MeshStandardMaterial({
      color: "#13201d",
      roughness: 0.65,
    });
    this.walnut = new THREE.MeshStandardMaterial({
      map: walnutTexture(),
      color: "#98785f",
      roughness: 0.54,
    });
    this.walls = [];
    this.buildFloor();
    this.buildWalls();
    this.buildPendant();
    this.corner = new THREE.Vector3();
    this.tableBounds = new THREE.Box2();
    this.lampBounds = new THREE.Box2();
    this.projected = new THREE.Vector2();
  }
  box(parent, w, h, d, material, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    mesh.position.set(x, y, z);
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }
  buildFloor() {
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(36, 36),
      new THREE.MeshStandardMaterial({
        map: floorTexture(),
        roughness: 0.74,
        color: "#c0ab95",
      }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = FLOOR_Y;
    floor.receiveShadow = true;
    this.group.add(floor);
    this.floor = floor;
    const rug = new THREE.Mesh(
      new THREE.PlaneGeometry(8.5, 5.7),
      new THREE.MeshStandardMaterial({ map: rugTexture(), roughness: 1 }),
    );
    rug.position.y = FLOOR_Y + 0.008;
    rug.rotation.x = -Math.PI / 2;
    rug.receiveShadow = true;
    this.group.add(rug);
    // A baked soft contact shadow also grounds the table when real shadows are off.
    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(8.4, 5.2),
      new THREE.MeshBasicMaterial({
        map: softShadowTexture(),
        transparent: true,
        depthWrite: false,
        opacity: 0.85,
      }),
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = FLOOR_Y + 0.012;
    this.group.add(shadow);
  }
  buildWalls() {
    const plaster = new THREE.MeshStandardMaterial({
      color: "#1e3732",
      roughness: 0.96,
    });
    for (const [rotation, distance, width] of [
      [0, 3.8, 12.6],
      [Math.PI, 5.4, 12.6],
      [Math.PI / 2, 6.3, 9.2],
      [-Math.PI / 2, 6.3, 9.2],
    ]) {
      const wall = new THREE.Group();
      wall.rotation.y = rotation;
      wall.position.set(
        -Math.sin(rotation) * distance,
        0,
        -Math.cos(rotation) * distance,
      );
      this.group.add(wall);
      this.walls.push(wall);
      this.box(wall, width, 4.6, 0.16, plaster, 0, 1.2, -0.08);
      this.box(wall, width, 1.1, 0.13, this.walnut, 0, -0.55, 0.06);
      this.box(wall, width, 0.11, 0.2, this.dark, 0, FLOOR_Y + 0.055, 0.12);
      this.box(wall, width, 0.09, 0.19, this.walnut, 0, 0.03, 0.12);
      this.box(wall, width, 0.012, 0.2, this.brass, 0, 0.09, 0.13);
      const panelCount = Math.floor(width / 1.25);
      for (let i = 1; i < panelCount; i++)
        this.box(
          wall,
          0.035,
          0.95,
          0.035,
          this.dark,
          (i / panelCount - 0.5) * width,
          -0.52,
          0.14,
        );
      for (const x of [-3.3, 3.3]) this.sconce(wall, x);
      if (rotation === 0) {
        this.sign(wall);
        this.cueRack(wall, -4.7);
        this.framedArt(wall, 4.7);
      }
    }
  }
  sconce(wall, x) {
    this.box(wall, 0.13, 0.65, 0.07, this.brass, x, 1.17, 0.14);
    const glow = new THREE.MeshBasicMaterial({ color: "#ffe4a6" });
    this.box(wall, 0.065, 0.42, 0.09, glow, x, 1.2, 0.2);
    const halo = canvasTexture(128, 256, (c, w, h) => {
      const gradient = c.createRadialGradient(
        w / 2,
        h / 2,
        0,
        w / 2,
        h / 2,
        w / 2,
      );
      gradient.addColorStop(0, "#edb56345");
      gradient.addColorStop(1, "#edb56300");
      c.fillStyle = gradient;
      c.scale(1, 2);
      c.fillRect(0, 0, w, h / 2);
    });
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1.1, 2.2),
      new THREE.MeshBasicMaterial({
        map: halo,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    mesh.position.set(x, 1.2, 0.015);
    wall.add(mesh);
  }
  sign(wall) {
    const texture = canvasTexture(1024, 384, (c, w, h) => {
      c.fillStyle = "#112b26";
      c.fillRect(0, 0, w, h);
      c.strokeStyle = "#9a8054";
      c.lineWidth = 2;
      c.strokeRect(14, 14, w - 28, h - 28);
      c.textAlign = "center";
      c.fillStyle = "#ddc797";
      c.font = "italic 150px Georgia";
      c.fillText("velvet", w / 2, 210);
      c.fillStyle = "#b8a783";
      c.font = "22px Georgia";
      c.fillText("B I L L I A R D S   C L U B", w / 2, 275);
      c.strokeStyle = "#9a8054";
      c.beginPath();
      c.moveTo(210, 308);
      c.lineTo(814, 308);
      c.stroke();
    });
    this.box(wall, 3.15, 1.19, 0.06, this.brass, 0, 0.9, 0.12);
    const sign = new THREE.Mesh(
      new THREE.PlaneGeometry(3.06, 1.1),
      new THREE.MeshBasicMaterial({ map: texture }),
    );
    sign.position.set(0, 0.9, 0.156);
    wall.add(sign);
  }
  cueRack(wall, x) {
    const rack = new THREE.Group();
    rack.position.set(x, 0, 0.2);
    wall.add(rack);
    const maple = new THREE.MeshStandardMaterial({
      color: "#c1a16d",
      roughness: 0.5,
    });
    for (const y of [-0.89, 0.39, 1.17])
      this.box(rack, 1.12, 0.065, 0.15, this.walnut, 0, y, 0.03);
    for (let i = 0; i < 6; i++) {
      const shaft = new THREE.Mesh(
        new THREE.CylinderGeometry(0.013, 0.022, 1.37, 8),
        maple,
      );
      shaft.position.set(-0.43 + i * 0.17, 0.71, 0.04);
      rack.add(shaft);
      const butt = new THREE.Mesh(
        new THREE.CylinderGeometry(0.022, 0.027, 0.94, 8),
        this.dark,
      );
      butt.position.set(shaft.position.x, -0.445, 0.04);
      rack.add(butt);
    }
    rack.name = "House cue rack";
  }
  framedArt(wall, x) {
    const texture = canvasTexture(256, 384, (c, w, h) => {
      c.fillStyle = "#142723";
      c.fillRect(0, 0, w, h);
      c.strokeStyle = "#bfa36f";
      c.lineWidth = 1.5;
      c.strokeRect(20, 20, w - 40, h - 40);
      c.beginPath();
      c.moveTo(55, 250);
      c.lineTo(176, 75);
      c.lineTo(187, 278);
      c.stroke();
      for (const [x, y, r] of [
        [55, 250, 13],
        [176, 75, 8],
        [187, 278, 16],
      ]) {
        c.fillStyle = "#c8b382";
        c.beginPath();
        c.arc(x, y, r, 0, Math.PI * 2);
        c.fill();
      }
      c.font = "12px Georgia";
      c.textAlign = "center";
      c.fillText("THE ART OF ANGLES", w / 2, 328);
    });
    this.box(wall, 1.02, 1.5, 0.045, this.brass, x, 1.16, 0.1);
    const art = new THREE.Mesh(
      new THREE.PlaneGeometry(0.95, 1.43),
      new THREE.MeshBasicMaterial({ map: texture }),
    );
    art.position.set(x, 1.16, 0.126);
    wall.add(art);
  }
  buildPendant() {
    const pendant = (this.pendant = new THREE.Group());
    pendant.name = "Brass and green billiard lamps";
    this.group.add(pendant);
    const shadeMaterial = new THREE.MeshStandardMaterial({
      color: "#183c30",
      metalness: 0.32,
      roughness: 0.3,
      side: THREE.DoubleSide,
    });
    const diffuser = new THREE.MeshBasicMaterial({ color: "#ffe8b4" });
    const bar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.022, 0.022, 4.4, 10),
      this.brass,
    );
    bar.rotation.z = Math.PI / 2;
    bar.position.set(0, 2.5, -2.15);
    pendant.add(bar);
    for (const x of [-1.65, 0, 1.65]) {
      const shade = new THREE.Mesh(
        new THREE.CylinderGeometry(0.105, 0.43, 0.28, 32, 1, true),
        shadeMaterial,
      );
      shade.position.set(x, 2.04, -2.15);
      pendant.add(shade);
      const rim = new THREE.Mesh(
        new THREE.TorusGeometry(0.43, 0.013, 6, 32),
        this.brass,
      );
      rim.rotation.x = Math.PI / 2;
      rim.position.set(x, 1.9, -2.15);
      pendant.add(rim);
      const bulb = new THREE.Mesh(
        new THREE.CircleGeometry(0.405, 32),
        diffuser,
      );
      bulb.rotation.x = Math.PI / 2;
      bulb.position.set(x, 1.905, -2.15);
      pendant.add(bulb);
      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.014, 0.014, 0.32, 8),
        this.brass,
      );
      stem.position.set(x, 2.34, -2.15);
      pendant.add(stem);
    }
    const cordMaterial = new THREE.MeshStandardMaterial({
      color: "#151c18",
      roughness: 0.75,
    });
    for (const x of [-1.5, 1.5]) {
      const cord = new THREE.Mesh(
        new THREE.CylinderGeometry(0.009, 0.009, 1.4, 6),
        cordMaterial,
      );
      cord.position.set(x, 3.2, -2.15);
      pendant.add(cord);
    }
  }
  setCamera(camera, view) {
    // Only the far walls render, so orbiting never puts a wall between you and the balls.
    for (const wall of this.walls) {
      const nx = Math.sin(wall.rotation.y),
        nz = Math.cos(wall.rotation.y);
      wall.visible = camera.position.x * nx + camera.position.z * nz > -0.05;
    }
    // Hanging fixtures disappear whenever their projection could cover the playing area.
    const table = this.tableBounds.makeEmpty(),
      lamp = this.lampBounds.makeEmpty();
    for (const x of [-3.22, 3.22])
      for (const z of [-1.8, 1.8]) {
        this.corner.set(x, 0.12, z).project(camera);
        table.expandByPoint(this.projected.set(this.corner.x, this.corner.y));
      }
    for (const x of [-2.2, 2.2])
      for (const y of [1.88, 3.9])
        for (const z of [-2.6, -1.7]) {
          this.corner.set(x, y, z).project(camera);
          lamp.expandByPoint(this.projected.set(this.corner.x, this.corner.y));
        }
    this.pendant.visible = view !== "top" && !table.intersectsBox(lamp);
  }
  setQuality(quality) {
    // Keep the room, rug and lamps even on low; skip small wall accents there.
    for (const wall of this.walls)
      for (const object of wall.children) {
        if (object.name === "House cue rack")
          object.visible = quality !== "low";
      }
  }
  dispose() {
    disposeGroup(this.group);
  }
}
