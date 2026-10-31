import * as THREE from "three";
import { canvasTexture, disposeGroup } from "./ClubMaterials.js";

const UP = new THREE.Vector3(0, 1, 0);

/** Two inexpensive, named club players. Their stance is derived from the shot,
 * so every client sees the same player at the same side of the table. */
export class PlayerRenderer {
  constructor(scene) {
    this.group = new THREE.Group();
    this.group.name = "Billiards players";
    scene.add(this.group);
    this.sphere = new THREE.SphereGeometry(1, 16, 12);
    this.cylinder = new THREE.CylinderGeometry(1, 1, 1, 10);
    this.box = new THREE.BoxGeometry(1, 1, 1);
    this.vector = new THREE.Vector3();
    this.people = [this.create(0), this.create(1)];
    this.states = [0, 1].map(() => ({
      position: new THREE.Vector3(),
      forward: new THREE.Vector3(0, 0, 1),
      focus: new THREE.Vector3(),
      valid: false,
    }));
    this.activeSeat = null;
  }
  mesh(parent, geometry, material, scale, position) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(...scale);
    mesh.position.set(...position);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }
  create(seat) {
    const root = new THREE.Group(),
      upper = new THREE.Group();
    root.name = `Player ${seat + 1}`;
    root.userData.seat = seat;
    root.add(upper);
    this.group.add(root);
    const cloth = new THREE.MeshStandardMaterial({
      color: seat === 0 ? "#315d8b" : "#873b4d",
      roughness: 0.85,
    });
    const shirt = new THREE.MeshStandardMaterial({
      color: "#e6e1cc",
      roughness: 0.9,
    });
    const trousers = new THREE.MeshStandardMaterial({
      color: "#202c2b",
      roughness: 0.9,
    });
    const skin = new THREE.MeshStandardMaterial({
      color: seat === 0 ? "#c99876" : "#d8ac87",
      roughness: 0.72,
    });
    const hair = new THREE.MeshStandardMaterial({
      color: seat === 0 ? "#251c17" : "#352622",
      roughness: 0.8,
    });
    const black = new THREE.MeshStandardMaterial({
      color: "#151e1c",
      roughness: 0.6,
    });
    for (const side of [-1, 1]) {
      this.mesh(
        root,
        this.cylinder,
        trousers,
        [0.095, 0.7, 0.1],
        [side * 0.12, -0.65, 0],
      );
      this.mesh(
        root,
        this.box,
        black,
        [0.16, 0.1, 0.3],
        [side * 0.12, -1.045, 0.07],
      );
    }
    this.mesh(root, this.sphere, trousers, [0.21, 0.18, 0.14], [0, -0.29, 0]);
    this.mesh(upper, this.sphere, cloth, [0.25, 0.38, 0.16], [0, 0.05, 0]);
    this.mesh(upper, this.box, shirt, [0.09, 0.25, 0.018], [0, 0.25, 0.15]);
    this.mesh(upper, this.box, cloth, [0.06, 0.07, 0.025], [0, 0.3, 0.17]);
    this.mesh(upper, this.cylinder, skin, [0.07, 0.13, 0.07], [0, 0.43, 0]);
    const head = new THREE.Group();
    upper.add(head);
    const eye = new THREE.Object3D();
    eye.position.set(0, 0.64, 0.19);
    upper.add(eye);
    this.mesh(head, this.sphere, skin, [0.155, 0.19, 0.15], [0, 0.64, 0.015]);
    const scalp = new THREE.SphereGeometry(
      1,
      16,
      8,
      0,
      Math.PI * 2,
      0,
      Math.PI * 0.48,
    );
    this.mesh(head, scalp, hair, [0.16, 0.19, 0.155], [0, 0.66, 0.008]);
    for (const side of [-1, 1]) {
      this.mesh(
        head,
        this.sphere,
        skin,
        [0.03, 0.05, 0.025],
        [side * 0.154, 0.63, 0],
      );
      this.mesh(
        head,
        this.sphere,
        shirt,
        [0.029, 0.018, 0.012],
        [side * 0.055, 0.645, 0.153],
      );
      this.mesh(
        head,
        this.sphere,
        black,
        [0.011, 0.013, 0.009],
        [side * 0.055, 0.645, 0.164],
      );
      this.mesh(
        head,
        this.box,
        hair,
        [0.06, 0.009, 0.008],
        [side * 0.055, 0.677, 0.151],
      );
    }
    this.mesh(head, this.sphere, skin, [0.026, 0.03, 0.032], [0, 0.608, 0.165]);
    this.mesh(head, this.box, hair, [0.046, 0.007, 0.008], [0, 0.563, 0.155]);
    const arms = [-1, 1].map((side) => ({
      side,
      upper: this.mesh(
        upper,
        this.cylinder,
        shirt,
        [0.07, 0.3, 0.07],
        [0, 0, 0],
      ),
      lower: this.mesh(
        upper,
        this.cylinder,
        skin,
        [0.05, 0.3, 0.05],
        [0, 0, 0],
      ),
      hand: this.mesh(
        upper,
        this.sphere,
        skin,
        [0.055, 0.055, 0.065],
        [0, 0, 0],
      ),
    }));
    const label = new THREE.Sprite(
      new THREE.SpriteMaterial({ transparent: true, depthTest: true }),
    );
    label.scale.set(0.9, 0.2, 1);
    label.position.y = 1.04;
    root.add(label);
    return { root, upper, head, eye, arms, label, name: null, active: null };
  }
  bone(mesh, a, b, radius) {
    this.vector.subVectors(b, a);
    mesh.position.copy(a).add(b).multiplyScalar(0.5);
    mesh.scale.set(radius, this.vector.length(), radius);
    mesh.quaternion.setFromUnitVectors(UP, this.vector.normalize());
  }
  pose(person, active) {
    if (person.active === active) return false;
    person.active = active;
    person.upper.rotation.x = active ? 0.18 : 0;
    person.upper.position.z = active ? 0.14 : 0;
    const a = new THREE.Vector3(),
      b = new THREE.Vector3(),
      c = new THREE.Vector3();
    for (const arm of person.arms) {
      const side = arm.side;
      a.set(side * 0.23, 0.3, 0);
      b.set(side * 0.31, active ? 0.06 : -0.03, active ? 0.27 : 0.02);
      c.set(
        active ? side * 0.12 : side * 0.3,
        active ? (side < 0 ? 0.2 : 0.14) : -0.37,
        active ? (side < 0 ? 0.77 : 0.4) : 0.1,
      );
      this.bone(arm.upper, a, b, 0.065);
      this.bone(arm.lower, b, c, 0.045);
      arm.hand.position.copy(c);
    }
    return true;
  }
  name(person, value, seat) {
    if (person.name === value) return false;
    person.name = value;
    person.root.userData.playerName = value;
    person.label.material.map?.dispose();
    person.label.material.map = canvasTexture(512, 112, (c, w, h) => {
      c.fillStyle = "#10271ee6";
      c.beginPath();
      c.roundRect(0, 0, w, h, 18);
      c.fill();
      c.strokeStyle = seat === 0 ? "#7298c3" : "#cb8a9d";
      c.lineWidth = 4;
      c.stroke();
      c.fillStyle = "#f2e9d1";
      c.font = "500 32px sans-serif";
      c.textAlign = "center";
      c.textBaseline = "middle";
      c.fillText(value, w / 2, h / 2, w - 28);
    });
    person.label.material.needsUpdate = true;
    return true;
  }
  sync({ cue, angle, activeSeat, names, aiming, view, followSeat }) {
    let changed = false;
    const state = this.states[activeSeat];
    if (
      aiming ||
      !state.valid ||
      this.activeSeat !== activeSeat ||
      this.lastAngle !== angle
    ) {
      const x = cue?.active !== false ? (cue?.x ?? 0) : 0;
      const z = cue?.active !== false ? (cue?.z ?? 0) : 0;
      const dx = Math.cos(angle),
        dz = Math.sin(angle);
      const tx =
        Math.abs(dx) > 1e-8 ? (x + Math.sign(dx) * 3.6) / dx : Infinity;
      const tz =
        Math.abs(dz) > 1e-8 ? (z + Math.sign(dz) * 2.2) / dz : Infinity;
      const distance = Math.min(tx, tz);
      const px = x - dx * distance,
        pz = z - dz * distance;
      if (
        !state.valid ||
        Math.hypot(state.position.x - px, state.position.z - pz) > 1e-7 ||
        state.forward.x !== dx ||
        state.forward.z !== dz ||
        Math.abs(state.focus.x - x - dx * 0.5) > 1e-7 ||
        Math.abs(state.focus.z - z - dz * 0.5) > 1e-7
      )
        changed = true;
      state.position.set(px, 0, pz);
      state.forward.set(dx, 0, dz);
      state.focus.set(x + dx * 0.5, 0.07, z + dz * 0.5);
      state.valid = true;
      const other = this.states[1 - activeSeat];
      const waitingSeat = 1 - activeSeat,
        homeX = waitingSeat === 0 ? -3.7 : 3.7;
      let homeZ = waitingSeat === 0 ? -0.65 : 0.65;
      if (Math.hypot(homeX - px, homeZ - pz) < 0.85)
        homeZ = -Math.sign(homeZ) * 1.1;
      other.position.set(homeX, 0, homeZ);
      other.forward.set(-homeX, 0, -homeZ).normalize();
      other.focus.set(x, 0.07, z);
      other.valid = true;
    }
    if (this.activeSeat !== activeSeat) changed = true;
    this.activeSeat = activeSeat;
    this.lastAngle = angle;
    for (let i = 0; i < 2; i++) {
      const person = this.people[i],
        p = this.states[i];
      if (this.name(person, names[i], i)) changed = true;
      if (this.pose(person, i === activeSeat)) changed = true;
      person.root.position.copy(p.position);
      person.root.rotation.y = Math.atan2(p.forward.x, p.forward.z);
      const visible = view !== "top" && !(view === "first" && i === followSeat);
      if (person.root.visible !== visible) changed = true;
      person.root.visible = visible;
      const labelVisible = !(
        ["first", "third"].includes(view) && i === followSeat
      );
      if (person.label.visible !== labelVisible) changed = true;
      person.label.visible = labelVisible;
    }
    return changed;
  }
  dispose() {
    disposeGroup(this.group);
  }
}
