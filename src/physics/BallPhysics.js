import { TABLE } from "../core/Constants.js";

export const JUMP_GRAVITY = 12;

export function prepareBall(ball) {
  ball.radius ??= TABLE.radius;
  ball.mass ??= 1;
  ball.vx ??= 0;
  ball.vz ??= 0;
  ball.height ??= 0;
  ball.vy ??= 0;
  ball.active ??= true;
  ball.spin ??= { x: 0, y: 0 };
  ball.angularVelocity ??= 0;
  return ball;
}

/** Coulomb rolling resistance plus a small air/cloth damping term. */
export function integrateBall(ball, dt, resistance, damping, sleepSpeed) {
  const airborne = ball.height > 0 || ball.vy !== 0;
  let landing = null;
  if (airborne) {
    ball.height += ball.vy * dt - JUMP_GRAVITY * dt * dt * 0.5;
    ball.vy -= JUMP_GRAVITY * dt;
    if (ball.height <= 0) {
      ball.height = 0;
      landing = Math.abs(ball.vy);
      // A short damped cloth bounce settles to exact rest instead of jittering.
      ball.vy = landing > 0.16 ? landing * 0.18 : 0;
    }
  }
  ball.x += ball.vx * dt;
  ball.z += ball.vz * dt;
  const speed = Math.hypot(ball.vx, ball.vz);
  if (speed) {
    const next = airborne
      ? speed * Math.exp(-0.04 * dt)
      : Math.max(0, speed * Math.exp(-damping * dt) - resistance * dt);
    const scale = next < sleepSpeed ? 0 : next / speed;
    ball.vx *= scale;
    ball.vz *= scale;
    ball.angularVelocity = next / ball.radius;
  }
  // Side and follow/draw spin decay independently of translational motion.
  const decay = Math.exp(-1.1 * dt);
  ball.spin.x *= decay;
  ball.spin.y *= decay;
  return landing;
}
