import * as THREE from "three";
import { POCKETS } from "../core/Constants.js";
import { canvasTexture } from "./ClubMaterials.js";

export const POCKET_OPENING = 0.18;
export const FRAME_WIDTH = 6.46;
export const FRAME_DEPTH = 3.66;

function outline(width, depth, rounded = false) {
  const shape = new THREE.Shape(),
    x = width / 2,
    y = depth / 2;
  if (!rounded) {
    shape.moveTo(-x, -y);
    shape.lineTo(x, -y);
    shape.lineTo(x, y);
    shape.lineTo(-x, y);
    shape.closePath();
    return shape;
  }
  const r = rounded ? 0.055 : 0;
  shape.moveTo(-x + r, -y);
  shape.lineTo(x - r, -y);
  shape.quadraticCurveTo(x, -y, x, -y + r);
  shape.lineTo(x, y - r);
  shape.quadraticCurveTo(x, y, x - r, y);
  shape.lineTo(-x + r, y);
  shape.quadraticCurveTo(-x, y, -x, y - r);
  shape.lineTo(-x, -y + r);
  shape.quadraticCurveTo(-x, -y, -x + r, -y);
  shape.closePath();
  return shape;
}

function holes(shape) {
  for (const p of POCKETS) {
    const hole = new THREE.Path();
    hole.absarc(p.x, -p.z, POCKET_OPENING, 0, Math.PI * 2, true);
    shape.holes.push(hole);
  }
  return shape;
}

export function bedGeometry(pockets) {
  const shape = outline(FRAME_WIDTH, FRAME_DEPTH, true);
  if (pockets) holes(shape);
  return new THREE.ExtrudeGeometry(shape, {
    depth: 0.22,
    bevelEnabled: false,
    curveSegments: 32,
  });
}

export function clothGeometry(pockets) {
  // The small extra cloth allowance is hidden under the wooden deck. Each
  // pocket is a real interior hole, including the portion cut into the felt.
  const w = pockets ? 6.04 : 5.6,
    h = pockets ? 3.24 : 2.8;
  const shape = outline(w, h);
  if (pockets) holes(shape);
  const geometry = new THREE.ShapeGeometry(shape, 32);
  const positions = geometry.attributes.position,
    uv = geometry.attributes.uv;
  for (let i = 0; i < uv.count; i++)
    uv.setXY(i, positions.getX(i) / w + 0.5, positions.getY(i) / h + 0.5);
  return geometry;
}

export function deckMask(pockets) {
  return canvasTexture(1024, 640, (c, w, h) => {
    c.fillStyle = "#000";
    c.fillRect(0, 0, w, h);
    c.fillStyle = "#fff";
    c.beginPath();
    c.roundRect(0, 0, w, h, 9);
    c.fill();
    c.fillStyle = "#000";
    const innerWidth = (5.92 / FRAME_WIDTH) * w,
      innerDepth = (3.08 / FRAME_DEPTH) * h;
    c.fillRect(
      (w - innerWidth) / 2,
      (h - innerDepth) / 2,
      innerWidth,
      innerDepth,
    );
    if (pockets)
      for (const p of POCKETS) {
        c.beginPath();
        c.ellipse(
          (p.x / FRAME_WIDTH + 0.5) * w,
          (p.z / FRAME_DEPTH + 0.5) * h,
          ((POCKET_OPENING + 0.002) / FRAME_WIDTH) * w,
          ((POCKET_OPENING + 0.002) / FRAME_DEPTH) * h,
          0,
          0,
          Math.PI * 2,
        );
        c.fill();
      }
  });
}
