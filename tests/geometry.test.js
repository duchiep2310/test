import test from "node:test";
import assert from "node:assert/strict";
import * as THREE from "three";
import {
  bedGeometry,
  clothGeometry,
  FRAME_WIDTH,
  FRAME_DEPTH,
  POCKET_OPENING,
} from "../src/rendering/PocketGeometry.js";
import { POCKETS } from "../src/core/Constants.js";

function hits(geometry, x, z) {
  const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.updateMatrixWorld();
  const hit = new THREE.Raycaster(
    new THREE.Vector3(x, -z, 2),
    new THREE.Vector3(0, 0, -1),
  ).intersectObject(mesh).length;
  material.dispose();
  return hit;
}
test("all six pool pockets cut through the bed and bite into the felt", () => {
  for (const geometry of [bedGeometry(true), clothGeometry(true)]) {
    for (const p of POCKETS) {
      assert.equal(
        hits(geometry, p.x, p.z),
        0,
        p.name + " center must be open",
      );
      assert.equal(
        hits(
          geometry,
          p.x - Math.sign(p.x) * 0.06,
          p.z - Math.sign(p.z) * 0.06,
        ),
        0,
        p.name + " must extend inside the playing field",
      );
      assert.ok(Math.abs(p.x) + POCKET_OPENING < FRAME_WIDTH / 2);
      assert.ok(Math.abs(p.z) + POCKET_OPENING < FRAME_DEPTH / 2);
    }
    assert.ok(
      hits(geometry, 0.4, 0.3) > 0,
      "normal table surface must remain solid",
    );
    geometry.dispose();
  }
});
test("carom tables have a continuous surface where pool pockets would be", () => {
  for (const geometry of [bedGeometry(false), clothGeometry(false)]) {
    for (const p of POCKETS)
      assert.ok(
        hits(
          geometry,
          p.x - Math.sign(p.x) * 0.06,
          p.z - Math.sign(p.z) * 0.06,
        ) > 0,
        p.name,
      );
    geometry.dispose();
  }
});
