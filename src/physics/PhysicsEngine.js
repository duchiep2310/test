import { TABLE, POCKETS } from "../core/Constants.js";
import { prepareBall, integrateBall } from "./BallPhysics.js";
import { resolveBalls } from "./CollisionResolver.js";
import { resolveCushions } from "./CushionPhysics.js";
import { findPocket } from "./PocketDetector.js";

/** Deterministic planar billiards with a vertical jump axis. Render timing never enters the solver. */
export class PhysicsEngine {
  constructor({
    pockets = true,
    onEvent = () => {},
    rollingResistance = 0.42,
    linearDamping = 0.14,
    ballRestitution = 0.96,
    cushionRestitution = 0.8,
  } = {}) {
    this.pockets = pockets;
    this.onEvent = onEvent;
    this.balls = [];
    this.rollingResistance = rollingResistance;
    this.linearDamping = linearDamping;
    this.ballRestitution = ballRestitution;
    this.cushionRestitution = cushionRestitution;
    this.sleepSpeed = 0.018;
    this.events = [];
    this._emit = (event) => {
      this.events.push(event);
      this.onEvent(event);
    };
  }

  setBalls(balls) {
    this.balls = balls.map(prepareBall);
    this.events = [];
  }

  shoot(ballId, angle, power, spin = { x: 0, y: 0 }, jump = 0) {
    const ball = this.balls.find(
      (candidate) => candidate.id === ballId && candidate.active,
    );
    if (
      !ball ||
      this.isMoving() ||
      !Number.isFinite(angle) ||
      !Number.isFinite(power) ||
      !Number.isFinite(jump) ||
      jump < 0 ||
      jump > 1
    )
      return false;
    const speed = 0.3 + Math.max(0, Math.min(1, power)) * 7.7;
    const horizontalSpeed = speed * (1 - 0.27 * jump);
    ball.vx = Math.cos(angle) * horizontalSpeed;
    ball.vz = Math.sin(angle) * horizontalSpeed;
    ball.height = 0;
    ball.vy =
      jump > 0
        ? (0.6 + 2.8 * jump) * Math.sqrt(Math.max(0, Math.min(1, power)))
        : 0;
    ball.spin = {
      x: Math.max(-1, Math.min(1, spin.x || 0)),
      y: Math.max(-1, Math.min(1, spin.y || 0)),
    };
    ball._shotDirection = { x: Math.cos(angle), z: Math.sin(angle) };
    ball._shotSpeed = speed;
    ball._followPending = true;
    return true;
  }

  isMoving() {
    return this.balls.some(
      (ball) =>
        ball.active &&
        (Math.hypot(ball.vx, ball.vz) > this.sleepSpeed ||
          ball.height > 1e-6 ||
          Math.abs(ball.vy) > this.sleepSpeed),
    );
  }

  step(dt) {
    this.events = [];
    if (!Number.isFinite(dt) || dt <= 0) return this.events;
    // Displacements stay under half a radius, including stronger test impulses.
    // Caller uses 1/240; subdivision also protects external variable-step callers.
    let maxSpeed = 0;
    let minRadius = TABLE.radius;
    for (const b of this.balls)
      if (b.active) {
        maxSpeed = Math.max(maxSpeed, Math.hypot(b.vx, b.vz, b.vy));
        minRadius = Math.min(minRadius, b.radius);
      }
    const safeStep = Math.min(
      1 / 240,
      (minRadius * 0.45) / Math.max(maxSpeed, 0.1),
    );
    const steps = Math.max(1, Math.ceil(Math.min(dt, 0.25) / safeStep));
    const h = Math.min(dt, 0.25) / steps;
    for (let sub = 0; sub < steps; sub++) {
      for (const ball of this.balls) {
        if (!ball.active) continue;
        const landing = integrateBall(
          ball,
          h,
          this.rollingResistance,
          this.linearDamping,
          this.sleepSpeed,
        );
        if (landing !== null && landing > 0.16)
          this._emit({ type: "landing", ball: ball.id, strength: landing });
        if (this.pockets) {
          const pocket = findPocket(ball);
          if (pocket >= 0) {
            ball.active = false;
            ball.pocket = pocket;
            ball.vx =
              ball.vz =
              ball.vy =
              ball.height =
              ball.angularVelocity =
                0;
            this._emit({ type: "pocket", ball: ball.id, pocket });
            continue;
          }
        }
        resolveCushions(ball, this.cushionRestitution, this._emit);
      }
      // Several sequential-impulse passes settle dense racks and simultaneous hits.
      for (let iteration = 0; iteration < 6; iteration++) {
        for (let i = 0; i < this.balls.length; i++) {
          const a = this.balls[i];
          if (!a.active) continue;
          for (let j = i + 1; j < this.balls.length; j++) {
            const b = this.balls[j];
            if (!b.active) continue;
            const impact = resolveBalls(a, b, this.ballRestitution);
            if (impact !== null && impact > 0.01)
              this._emit({
                type: "collision",
                a: a.id,
                b: b.id,
                strength: impact,
              });
          }
          resolveCushions(a, this.cushionRestitution, this._emit);
        }
      }
    }
    return this.events;
  }

  canPlace(x, z, excludeId) {
    if (!Number.isFinite(x) || !Number.isFinite(z)) return false;
    const radius =
      this.balls.find((ball) => ball.id === excludeId)?.radius ?? TABLE.radius;
    if (
      Math.abs(x) > TABLE.halfWidth - radius ||
      Math.abs(z) > TABLE.halfHeight - radius
    )
      return false;
    if (
      this.pockets &&
      POCKETS.some(
        (pocket) =>
          Math.hypot(x - pocket.x, z - pocket.z) <
          TABLE.pocketRadius + radius * 0.5,
      )
    )
      return false;
    return !this.balls.some(
      (ball) =>
        ball.active &&
        ball.id !== excludeId &&
        Math.hypot(x - ball.x, z - ball.z) < radius + ball.radius + 0.002,
    );
  }

  placeBall(id, x, z) {
    const ball = this.balls.find((candidate) => candidate.id === id);
    if (!ball || !this.canPlace(x, z, id)) return false;
    Object.assign(ball, {
      x,
      z,
      vx: 0,
      vz: 0,
      height: 0,
      vy: 0,
      active: true,
      angularVelocity: 0,
      spin: { x: 0, y: 0 },
      pocket: undefined,
      _followPending: false,
    });
    return true;
  }
}
export default PhysicsEngine;
