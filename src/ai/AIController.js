import { TABLE, POCKETS } from "../core/Constants.js";
import { PhysicsEngine } from "../physics/PhysicsEngine.js";

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const distance = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const direction = (a, b) => Math.atan2(b.z - a.z, b.x - a.x);
const norm = (x, z) => {
  const length = Math.hypot(x, z) || 1;
  return { x: x / length, z: z / length };
};

/** A geometric planner. It chooses impulses; the shared game physics executes them. */
export class AIController {
  chooseShot({ mode, balls, difficulty = "medium" }) {
    const cue = balls.find((ball) => ball.id === mode.cueId() && ball.active);
    if (!cue)
      return {
        angle: 0,
        power: 0.35,
        spin: { x: 0, y: 0 },
        calledBall: null,
        calledPocket: null,
      };
    const targets = balls.filter(
      (ball) => ball.active && mode.legalTargets(balls).includes(ball.id),
    );
    if (!targets.length)
      return {
        angle: 0,
        power: 0.35,
        spin: { x: 0, y: 0 },
        calledBall: null,
        calledPocket: null,
      };
    if (!mode.pockets)
      return this.caromShot(mode, cue, targets, balls, difficulty);
    if (mode.isBreak) {
      const head = [...targets].sort(
        (a, b) => distance(cue, a) - distance(cue, b),
      )[0];
      return {
        angle: direction(cue, head),
        power: 0.96,
        spin: { x: 0, y: 0.1 },
        calledBall: head.id,
        calledPocket: this.nearestPocket(head),
      };
    }

    const plans = [];
    for (const target of targets) {
      for (let pocketIndex = 0; pocketIndex < POCKETS.length; pocketIndex++) {
        const pocket = POCKETS[pocketIndex];
        const outgoing = norm(pocket.x - target.x, pocket.z - target.z);
        const ghost = {
          x: target.x - outgoing.x * TABLE.radius * 2,
          z: target.z - outgoing.z * TABLE.radius * 2,
        };
        const incoming = norm(ghost.x - cue.x, ghost.z - cue.z);
        const alignment = incoming.x * outgoing.x + incoming.z * outgoing.z;
        if (alignment < 0.18 || !this.inside(ghost)) continue;
        if (
          !this.pathClear(cue, ghost, balls, [cue.id, target.id]) ||
          !this.pathClear(target, pocket, balls, [cue.id, target.id])
        )
          continue;
        const travel =
          distance(cue, ghost) +
          distance(target, pocket) / Math.max(alignment, 0.35);
        plans.push({
          angle: direction(cue, ghost),
          power: this.powerFor(travel, alignment),
          spin: { x: 0, y: 0.12 },
          calledBall: target.id,
          calledPocket: pocketIndex,
          score: alignment * 6 - travel * 0.5,
        });
      }
    }
    if (difficulty !== "easy")
      plans.push(...this.combinations(cue, targets, balls, mode));
    if (difficulty === "hard")
      plans.push(...this.bankShots(cue, targets, balls));
    plans.sort((a, b) => b.score - a.score);
    let plan = plans[0];
    if (!plan) {
      // A legal hit is preferable to attempting a blocked pocketing route.
      const target = [...targets].sort((a, b) => {
        const cost = (ball) =>
          distance(cue, ball) +
          (this.pathClear(cue, ball, balls, [cue.id, ball.id]) ? 0 : 8);
        return cost(a) - cost(b);
      })[0];
      plan = {
        angle: direction(cue, target),
        power: mode.isBreak
          ? 0.92
          : clamp(0.34 + distance(cue, target) * 0.09, 0.38, 0.83),
        spin: { x: 0, y: 0 },
        calledBall: target.id,
        calledPocket: this.nearestPocket(target),
      };
    }
    const aimError =
      difficulty === "easy" ? 0.035 : difficulty === "medium" ? 0.009 : 0.002;
    return {
      angle: plan.angle + (Math.random() - 0.5) * aimError * 2,
      power: plan.power,
      spin: plan.spin,
      calledBall: plan.calledBall,
      calledPocket: plan.calledPocket,
    };
  }

  powerFor(travel, alignment = 1) {
    return clamp(
      0.22 + Math.sqrt(Math.max(0, travel)) * 0.17 + (1 - alignment) * 0.12,
      0.29,
      0.88,
    );
  }

  inside(point) {
    return (
      Math.abs(point.x) <= TABLE.halfWidth - TABLE.radius &&
      Math.abs(point.z) <= TABLE.halfHeight - TABLE.radius
    );
  }

  pathClear(start, end, balls, excluded = []) {
    const dx = end.x - start.x,
      dz = end.z - start.z;
    const lengthSquared = dx * dx + dz * dz;
    if (lengthSquared < 1e-8) return true;
    return !balls.some((ball) => {
      if (!ball.active || excluded.includes(ball.id)) return false;
      const t = clamp(
        ((ball.x - start.x) * dx + (ball.z - start.z) * dz) / lengthSquared,
        0,
        1,
      );
      return (
        Math.hypot(ball.x - start.x - dx * t, ball.z - start.z - dz * t) <
        (ball.radius || TABLE.radius) + TABLE.radius + 0.008
      );
    });
  }

  nearestPocket(ball) {
    let best = 0;
    for (let index = 1; index < POCKETS.length; index++)
      if (distance(ball, POCKETS[index]) < distance(ball, POCKETS[best]))
        best = index;
    return best;
  }

  combinations(cue, targets, balls, mode) {
    const plans = [];
    // Aim the legal first ball into a second object ball's pocketing ghost point.
    for (const first of targets)
      for (const second of balls) {
        if (!second.active || second.id === cue.id || second.id === first.id)
          continue;
        // The eight cannot be pocketed through another ball while a group remains.
        if (
          mode.id === "eight" &&
          !targets.some((ball) => ball.id === second.id)
        )
          continue;
        if (
          mode.id === "ten" &&
          second.id === 10 &&
          !targets.some((ball) => ball.id === 10)
        )
          continue;
        for (let pocketIndex = 0; pocketIndex < POCKETS.length; pocketIndex++) {
          const pocket = POCKETS[pocketIndex];
          const last = norm(pocket.x - second.x, pocket.z - second.z);
          const secondGhost = {
            x: second.x - last.x * TABLE.radius * 2,
            z: second.z - last.z * TABLE.radius * 2,
          };
          const middle = norm(secondGhost.x - first.x, secondGhost.z - first.z);
          const ghost = {
            x: first.x - middle.x * TABLE.radius * 2,
            z: first.z - middle.z * TABLE.radius * 2,
          };
          const incoming = norm(ghost.x - cue.x, ghost.z - cue.z);
          const alignment = Math.min(
            incoming.x * middle.x + incoming.z * middle.z,
            middle.x * last.x + middle.z * last.z,
          );
          if (
            alignment < 0.7 ||
            !this.inside(ghost) ||
            !this.inside(secondGhost)
          )
            continue;
          if (
            !this.pathClear(cue, ghost, balls, [cue.id, first.id]) ||
            !this.pathClear(first, secondGhost, balls, [
              cue.id,
              first.id,
              second.id,
            ]) ||
            !this.pathClear(second, pocket, balls, [
              cue.id,
              first.id,
              second.id,
            ])
          )
            continue;
          const travel =
            distance(cue, ghost) +
            distance(first, secondGhost) +
            distance(second, pocket);
          plans.push({
            angle: direction(cue, ghost),
            power: this.powerFor(travel / alignment, alignment),
            spin: { x: 0, y: 0 },
            calledBall: second.id,
            calledPocket: pocketIndex,
            score: alignment * 4.5 - travel * 0.6 - 1.5,
          });
        }
      }
    return plans;
  }

  bankShots(cue, targets, balls) {
    const plans = [];
    const rails = [
      ["x", -TABLE.halfWidth + TABLE.radius],
      ["x", TABLE.halfWidth - TABLE.radius],
      ["z", -TABLE.halfHeight + TABLE.radius],
      ["z", TABLE.halfHeight - TABLE.radius],
    ];
    for (const target of targets)
      for (let pocketIndex = 0; pocketIndex < POCKETS.length; pocketIndex++) {
        const pocket = POCKETS[pocketIndex];
        for (const [axis, rail] of rails) {
          const mirrored = { ...pocket, [axis]: 2 * rail - pocket[axis] };
          const t = (rail - target[axis]) / (mirrored[axis] - target[axis]);
          if (t <= 0.03 || t >= 0.95) continue;
          const contact = {
            x: target.x + (mirrored.x - target.x) * t,
            z: target.z + (mirrored.z - target.z) * t,
          };
          // Avoid a bank point that instead falls through a pocket mouth.
          if (
            !this.inside({ x: contact.x * 0.999, z: contact.z * 0.999 }) ||
            POCKETS.some((p) => distance(contact, p) < 0.24)
          )
            continue;
          const outgoing = norm(contact.x - target.x, contact.z - target.z);
          const ghost = {
            x: target.x - outgoing.x * TABLE.radius * 2,
            z: target.z - outgoing.z * TABLE.radius * 2,
          };
          const incoming = norm(ghost.x - cue.x, ghost.z - cue.z);
          const alignment = incoming.x * outgoing.x + incoming.z * outgoing.z;
          if (alignment < 0.45 || !this.inside(ghost)) continue;
          if (
            !this.pathClear(cue, ghost, balls, [cue.id, target.id]) ||
            !this.pathClear(target, contact, balls, [cue.id, target.id]) ||
            !this.pathClear(contact, pocket, balls, [cue.id, target.id])
          )
            continue;
          const travel =
            distance(cue, ghost) +
            (distance(target, contact) + distance(contact, pocket)) * 1.3;
          plans.push({
            angle: direction(cue, ghost),
            power: this.powerFor(travel / alignment, alignment),
            spin: { x: 0, y: 0 },
            calledBall: target.id,
            calledPocket: pocketIndex,
            score: alignment * 4 - travel * 0.6 - 2,
          });
        }
      }
    return plans;
  }

  caromShot(mode, cue, targets, balls, difficulty) {
    const requireCushions = mode.id === "three" ? 3 : 0;
    let best = null;
    const candidates = [];
    const samples =
      difficulty === "easy" ? 180 : difficulty === "medium" ? 360 : 720;
    // Trace equal-mass cue deflections and cushion reflections for candidate angles.
    // This is a lightweight estimate; full spin and object-ball motion remain physical.
    for (let sample = 0; sample < samples; sample++) {
      const angle = (sample / samples) * Math.PI * 2;
      const estimate = this.traceCarom(cue, targets, angle, requireCushions);
      candidates.push({ ...estimate, angle });
      if (!best || estimate.score > best.score) best = { ...estimate, angle };
    }
    // Validate a small shortlist with the SAME solver used during play. This catches
    // estimates invalidated by moving object balls and energy loss at cushions.
    candidates.sort((a, b) => b.score - a.score);
    const shortlist = candidates.slice(
      0,
      difficulty === "hard" ? 10 : difficulty === "medium" ? 5 : 2,
    );
    let verified = null;
    for (const candidate of shortlist) {
      const estimatedPower = clamp(
        0.4 + candidate.travel * 0.045 + requireCushions * 0.03,
        0.42,
        0.95,
      );
      for (const power of [
        estimatedPower,
        Math.min(0.98, estimatedPower + 0.12),
      ]) {
        const shot = { angle: candidate.angle, power, spin: { x: 0, y: 0.15 } };
        const result = this.simulateCarom(balls, cue.id, shot, requireCushions);
        if (!verified || result.score > verified.score)
          verified = { ...candidate, ...shot, score: result.score };
        if (result.scored) break;
      }
      if (verified?.score >= 100) break;
    }
    if (verified) best = verified;
    const error =
      difficulty === "easy" ? 0.025 : difficulty === "medium" ? 0.008 : 0.001;
    return {
      angle: best.angle + (Math.random() - 0.5) * error * 2,
      power:
        best.power ||
        clamp(0.4 + best.travel * 0.045 + requireCushions * 0.03, 0.42, 0.95),
      spin: { x: 0, y: 0.15 },
      calledBall: null,
      calledPocket: null,
    };
  }

  simulateCarom(balls, cueId, shot, required) {
    const touched = new Set();
    let cushions = 0,
      scored = false,
      time = 0;
    const solver = new PhysicsEngine({
      pockets: false,
      onEvent: (event) => {
        if (
          event.type === "cushion" &&
          event.ball === cueId &&
          touched.size < 2
        )
          cushions++;
        if (
          event.type === "collision" &&
          (event.a === cueId || event.b === cueId)
        ) {
          touched.add(event.a === cueId ? event.b : event.a);
          if (touched.size === 2 && cushions >= required) scored = true;
        }
      },
    });
    solver.setBalls(
      balls.map((ball) => ({ ...ball, spin: { ...ball.spin }, vx: 0, vz: 0 })),
    );
    solver.shoot(cueId, shot.angle, shot.power, shot.spin);
    while (solver.isMoving() && time < 14 && !scored) {
      solver.step(1 / 120);
      time += 1 / 120;
    }
    return {
      scored,
      score: scored
        ? 110 - time * 0.4
        : touched.size * 10 + Math.min(cushions, required),
    };
  }

  traceCarom(cue, targets, angle, required) {
    const radius = TABLE.radius * 2;
    const position = { x: cue.x, z: cue.z };
    let vector = { x: Math.cos(angle), z: Math.sin(angle) },
      travel = 0,
      cushions = 0;
    const touched = new Set();
    let score = -100;
    for (let segment = 0; segment < 10 && travel < 19; segment++) {
      const tx =
        Math.abs(vector.x) < 1e-8
          ? Infinity
          : (Math.sign(vector.x) * (TABLE.halfWidth - TABLE.radius) -
              position.x) /
            vector.x;
      const tz =
        Math.abs(vector.z) < 1e-8
          ? Infinity
          : (Math.sign(vector.z) * (TABLE.halfHeight - TABLE.radius) -
              position.z) /
            vector.z;
      let length = Math.min(tx, tz),
        hit = null;
      for (const target of targets) {
        if (touched.has(target.id)) continue;
        const dx = target.x - position.x,
          dz = target.z - position.z;
        const along = dx * vector.x + dz * vector.z;
        const discriminant =
          radius * radius - (dx * dx + dz * dz - along * along);
        if (discriminant < 0) continue;
        const entry = along - Math.sqrt(discriminant);
        if (entry > 0.0001 && entry < length) {
          length = entry;
          hit = target;
        }
      }
      if (!Number.isFinite(length) || length < 0) break;
      position.x += vector.x * length;
      position.z += vector.z * length;
      travel += length;
      if (hit) {
        touched.add(hit.id);
        score = 10 + Math.min(cushions, required) * 1.5 - travel * 0.1;
        if (touched.size === 2) {
          score =
            cushions >= required
              ? 100 - travel * 0.8
              : 20 - (required - cushions) * 4;
          break;
        }
        const normal = norm(hit.x - position.x, hit.z - position.z);
        const impulse = vector.x * normal.x + vector.z * normal.z;
        const tangent = {
          x: vector.x - normal.x * impulse,
          z: vector.z - normal.z * impulse,
        };
        if (Math.hypot(tangent.x, tangent.z) < 0.08) break;
        vector = norm(tangent.x, tangent.z);
        position.x += vector.x * 0.001;
        position.z += vector.z * 0.001;
      } else {
        cushions++;
        if (tx <= tz) vector.x *= -1;
        else vector.z *= -1;
        position.x += vector.x * 0.001;
        position.z += vector.z * 0.001;
        if (touched.size === 1)
          score = Math.max(
            score,
            10 + Math.min(cushions, required) - travel * 0.1,
          );
      }
    }
    return { score, travel };
  }

  choosePlacement({ mode, physics }) {
    const cueId = mode.cueId();
    const balls = physics.balls;
    const targets = balls.filter(
      (ball) => ball.active && mode.legalTargets(balls).includes(ball.id),
    );
    const candidates = [];
    for (const target of targets)
      for (const pocket of POCKETS) {
        const line = norm(target.x - pocket.x, target.z - pocket.z);
        for (const offset of [0.45, 0.7, 1])
          candidates.push({
            x: target.x + line.x * offset,
            z: target.z + line.z * offset,
          });
      }
    candidates.push({ x: -TABLE.width * 0.25, z: 0 });
    for (let x = -2.4; x <= 2.4; x += 0.4)
      for (let z = -1; z <= 1; z += 0.4) candidates.push({ x, z });
    return (
      candidates.find((point) => physics.canPlace(point.x, point.z, cueId)) || {
        x: 0,
        z: 0,
      }
    );
  }
}

export default AIController;
