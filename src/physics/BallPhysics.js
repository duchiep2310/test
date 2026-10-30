import { TABLE } from "../core/Constants.js";

export function prepareBall(ball) {
  ball.radius ??= TABLE.radius;
  ball.mass ??= 1;
  ball.vx ??= 0;
  ball.vz ??= 0;
  ball.active ??= true;
  ball.spin ??= { x: 0, y: 0 };
  ball.angularVelocity ??= 0;
  return ball;
}

/** Coulomb rolling resistance plus a small air/cloth damping term. */
export function integrateBall(ball, dt, resistance, damping, sleepSpeed) {
  ball.x += ball.vx * dt;
  ball.z += ball.vz * dt;
  const speed = Math.hypot(ball.vx, ball.vz);
  if (speed) {
    const next = Math.max(0, speed * Math.exp(-damping * dt) - resistance * dt);
    const scale = next < sleepSpeed ? 0 : next / speed;
    ball.vx *= scale;
    ball.vz *= scale;
    ball.angularVelocity = next / ball.radius;
  }
  // Side and follow/draw spin decay independently of translational motion.
  const decay = Math.exp(-1.1 * dt);
  ball.spin.x *= decay;
  ball.spin.y *= decay;
}
