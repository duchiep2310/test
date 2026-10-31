import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { TABLE, POCKETS } from "../core/Constants.js";
import {
  canvasTexture,
  clothTexture,
  walnutTexture,
  disposeGroup,
} from "./ClubMaterials.js";

function box(w, h, d, material, x = 0, y = 0, z = 0, rounded = false) {
  const mesh = new THREE.Mesh(
    rounded
      ? new RoundedBoxGeometry(w, h, d, 2, Math.min(h / 3, 0.055))
      : new THREE.BoxGeometry(w, h, d),
    material,
  );
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

/** The playing plane and cushion noses match TABLE exactly; decoration stays outside it. */
export class TableRenderer {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.name = "Walnut tournament table";
    scene.add(this.group);
    const weave = clothTexture(),
      grain = walnutTexture();
    this.cloth = new THREE.MeshStandardMaterial({
      color: "#087f75",
      map: weave,
      bumpMap: weave,
      bumpScale: 0.0015,
      roughness: 0.94,
    });
    this.cushionMaterial = new THREE.MeshStandardMaterial({
      color: "#09695f",
      map: weave,
      roughness: 0.88,
    });
    this.woodMaterial = new THREE.MeshStandardMaterial({
      color: "#b69979",
      map: grain,
      roughness: 0.28,
      metalness: 0.08,
    });
    this.apronMaterial = new THREE.MeshStandardMaterial({
      color: "#785943",
      map: grain,
      roughness: 0.43,
    });
    this.brass = new THREE.MeshStandardMaterial({
      color: "#c4a775",
      roughness: 0.28,
      metalness: 0.75,
    });
    this.dark = new THREE.MeshStandardMaterial({
      color: "#15241e",
      roughness: 0.54,
    });
    this.leather = new THREE.MeshStandardMaterial({
      color: "#231c16",
      roughness: 0.86,
    });
    this.build();
    this.setMode(true);
  }
  build() {
    const frame = this.group;
    frame.add(box(6.46, 0.22, 3.66, this.woodMaterial, 0, -0.135, 0, true));
    frame.add(box(6.32, 0.028, 3.52, this.brass, 0, -0.258, 0, true));
    frame.add(box(6.2, 0.31, 3.42, this.apronMaterial, 0, -0.41, 0, true));
    frame.add(box(6.23, 0.042, 3.45, this.dark, 0, -0.58, 0, true));
    // Recessed apron panels with a fine brass reveal.
    for (const side of [-1, 1]) {
      for (const x of [-1.65, 1.65]) {
        frame.add(box(2.35, 0.18, 0.017, this.dark, x, -0.405, side * 1.717));
        frame.add(box(2.36, 0.009, 0.019, this.brass, x, -0.5, side * 1.72));
      }
      frame.add(box(0.017, 0.18, 2.5, this.dark, side * 3.11, -0.405, 0));
      frame.add(box(0.019, 0.009, 2.51, this.brass, side * 3.112, -0.5, 0));
    }
    const surface = new THREE.Mesh(
      new THREE.PlaneGeometry(TABLE.width, TABLE.height),
      this.cloth,
    );
    surface.rotation.x = -Math.PI / 2;
    surface.receiveShadow = true;
    surface.position.y = 0.003;
    frame.add(surface);
    for (const x of [-2.3, 2.3])
      for (const z of [-1.1, 1.1]) {
        frame.add(box(0.4, 0.13, 0.4, this.dark, x, -0.61, z, true));
        const leg = new THREE.Mesh(
          new THREE.CylinderGeometry(0.23, 0.16, 0.43, 4),
          this.apronMaterial,
        );
        leg.rotation.y = Math.PI / 4;
        leg.position.set(x, -0.865, z);
        leg.castShadow = true;
        frame.add(leg);
        frame.add(box(0.28, 0.055, 0.28, this.brass, x, -1.062, z, true));
      }
    frame.add(box(4.7, 0.12, 0.14, this.apronMaterial, 0, -0.88, 0, true));
    for (const x of [-2.3, 2.3])
      frame.add(box(0.15, 0.12, 2.25, this.apronMaterial, x, -0.88, 0, true));
    const diamondGeo = new THREE.OctahedronGeometry(0.033, 0);
    for (const side of [-1, 1]) {
      for (const x of [-2.1, -1.4, -0.7, 0.7, 1.4, 2.1]) {
        const mark = new THREE.Mesh(diamondGeo, this.brass);
        mark.scale.y = 0.13;
        mark.rotation.y = Math.PI / 4;
        mark.position.set(x, 0.089, side * 1.655);
        frame.add(mark);
      }
      for (const z of [-0.7, 0, 0.7]) {
        const mark = new THREE.Mesh(diamondGeo, this.brass);
        mark.scale.y = 0.13;
        mark.rotation.y = Math.PI / 4;
        mark.position.set(side * 3.065, 0.089, z);
        frame.add(mark);
      }
    }
    const spotMat = new THREE.MeshBasicMaterial({
      color: "#d3e8ce",
      transparent: true,
      opacity: 0.38,
      depthWrite: false,
    });
    for (const x of [-1.4, 1.4]) {
      const spot = new THREE.Mesh(
        new THREE.RingGeometry(0.012, 0.02, 20),
        spotMat,
      );
      spot.rotation.x = -Math.PI / 2;
      spot.position.set(x, 0.007, 0);
      frame.add(spot);
    }
    const lineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-1.4, 0.007, -1.37),
      new THREE.Vector3(-1.4, 0.007, 1.37),
    ]);
    frame.add(
      new THREE.Line(
        lineGeo,
        new THREE.LineBasicMaterial({
          color: "#d1e1c9",
          transparent: true,
          opacity: 0.09,
        }),
      ),
    );
    this.buildBadge();
    this.rails = new THREE.Group();
    frame.add(this.rails);
    this.poolRails = this.buildRails(true);
    this.caromRails = this.buildRails(false);
    this.rails.add(this.poolRails, this.caromRails);
    this.buildPockets();
  }
  buildBadge() {
    const texture = canvasTexture(512, 128, (c, w, h) => {
      c.fillStyle = "#aa8e58";
      c.fillRect(0, 0, w, h);
      c.strokeStyle = "#463a26";
      c.lineWidth = 2;
      c.strokeRect(7, 7, w - 14, h - 14);
      c.fillStyle = "#2c3026";
      c.font = "italic 59px Georgia";
      c.textAlign = "center";
      c.fillText("velvet", w / 2, 75);
      c.font = "11px Georgia";
      c.fillText("T O U R N A M E N T   S E R I E S", w / 2, 102);
    });
    const badge = new THREE.Mesh(
      new THREE.PlaneGeometry(0.58, 0.145),
      new THREE.MeshStandardMaterial({
        map: texture,
        metalness: 0.35,
        roughness: 0.4,
      }),
    );
    badge.position.set(0, -0.405, 1.724);
    this.group.add(badge);
  }
  cushion(parent, points) {
    const shape = new THREE.Shape();
    points.forEach(([x, z], i) =>
      i ? shape.lineTo(x, -z) : shape.moveTo(x, -z),
    );
    shape.closePath();
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.07,
      bevelEnabled: true,
      bevelSegments: 1,
      steps: 1,
      bevelSize: 0.012,
      bevelThickness: 0.012,
    });
    const mesh = new THREE.Mesh(geometry, this.cushionMaterial);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = -0.008;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
  }
  buildRails(pockets) {
    const rails = new THREE.Group();
    const spans = pockets
      ? [
          [-2.65, -0.16],
          [0.16, 2.65],
        ]
      : [[-2.82, 2.82]];
    for (const side of [-1, 1]) {
      for (const [a, b] of spans) {
        const jaw = pockets ? 0.065 : 0;
        this.cushion(rails, [
          [a + jaw, side * 1.4],
          [b - jaw, side * 1.4],
          [b, side * 1.535],
          [a, side * 1.535],
        ]);
        rails.add(
          box(
            b - a + 0.06,
            0.105,
            0.25,
            this.woodMaterial,
            (a + b) / 2,
            0.027,
            side * 1.67,
            true,
          ),
        );
        rails.add(
          box(
            b - a - 0.07,
            0.007,
            0.008,
            this.brass,
            (a + b) / 2,
            0.081,
            side * 1.78,
          ),
        );
      }
      const length = pockets ? 1.21 : 1.4,
        jaw = pockets ? 0.075 : 0;
      this.cushion(rails, [
        [side * 2.8, -length + jaw],
        [side * 2.8, length - jaw],
        [side * 2.935, length],
        [side * 2.935, -length],
      ]);
      rails.add(
        box(
          0.25,
          0.105,
          pockets ? 2.65 : 2.85,
          this.woodMaterial,
          side * 3.07,
          0.027,
          0,
          true,
        ),
      );
      rails.add(
        box(
          0.008,
          0.007,
          pockets ? 2.57 : 2.77,
          this.brass,
          side * 3.18,
          0.081,
          0,
        ),
      );
      for (const x of [-2.98, 2.98])
        rails.add(
          box(
            0.45,
            0.105,
            0.34,
            this.woodMaterial,
            x,
            0.027,
            side * 1.63,
            true,
          ),
        );
      if (pockets)
        rails.add(
          box(0.27, 0.105, 0.22, this.leather, 0, 0.027, side * 1.69, true),
        );
    }
    return rails;
  }
  buildPockets() {
    this.pocketGroup = new THREE.Group();
    this.group.add(this.pocketGroup);
    const holeGeo = new THREE.CircleGeometry(TABLE.pocketRadius * 1.13, 40);
    const holeMat = new THREE.MeshBasicMaterial({ color: "#030908" });
    const ringGeo = new THREE.TorusGeometry(
      TABLE.pocketRadius * 1.16,
      0.024,
      8,
      40,
    );
    const basketGeo = new THREE.CylinderGeometry(0.15, 0.11, 0.28, 20);
    POCKETS.forEach((p, i) => {
      const hole = new THREE.Mesh(holeGeo, holeMat);
      hole.rotation.x = -Math.PI / 2;
      hole.position.set(p.x, 0.082, p.z);
      this.pocketGroup.add(hole);
      const ring = new THREE.Mesh(ringGeo, this.leather);
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(p.x, 0.067, p.z);
      this.pocketGroup.add(ring);
      const basket = new THREE.Mesh(basketGeo, this.leather);
      basket.position.set(p.x, -0.31, p.z);
      this.pocketGroup.add(basket);
      const plate = box(
        0.29,
        0.018,
        0.14,
        this.brass,
        p.x + (p.x ? Math.sign(p.x) * 0.18 : 0),
        0.084,
        p.z + Math.sign(p.z) * 0.26,
        true,
      );
      if (p.x) plate.rotation.y = (-Math.sign(p.x * p.z) * Math.PI) / 4;
      this.pocketGroup.add(plate);
      const label = canvasTexture(64, 64, (c) => {
        c.fillStyle = "#e0c694";
        c.font = "500 30px Georgia";
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.fillText(String(i + 1), 32, 32);
      });
      const sprite = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: label,
          transparent: true,
          opacity: 0.82,
          depthTest: false,
        }),
      );
      sprite.scale.setScalar(0.12);
      sprite.position.set(
        p.x + (p.x ? Math.sign(p.x) * 0.09 : 0),
        0.19,
        p.z + Math.sign(p.z) * 0.27,
      );
      this.pocketGroup.add(sprite);
    });
  }
  setMode(pockets) {
    this.pockets = pockets;
    this.pocketGroup.visible = pockets;
    this.poolRails.visible = pockets;
    this.caromRails.visible = !pockets;
  }
  setColor(color) {
    this.cloth.color.set(color);
    this.cushionMaterial.color.set(color).multiplyScalar(0.78);
  }
  dispose() {
    disposeGroup(this.group);
  }
}
