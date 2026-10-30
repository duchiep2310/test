import { TABLE } from "../core/Constants.js";

/** Closed rail boundaries: pocket capture is evaluated before the rail solver.
 * This produces bounded, stable pocket mouths without allowing escape through
 * the gaps beside circular capture zones. */
export function resolveCushions(ball, restitution, emit) {
  const limitX = TABLE.halfWidth - ball.radius;
  const limitZ = TABLE.halfHeight - ball.radius;
  if (ball.x < -limitX || ball.x > limitX) {
    const side = Math.sign(ball.x);
    ball.x = side * limitX;
    if (ball.vx * side > 0) {
      const impact = Math.abs(ball.vx);
      ball.vx = -ball.vx * restitution;
      ball.vz += side * ball.spin.x * impact * 0.18;
      ball.spin.x *= 0.65;
      emit({
        type: "cushion",
        ball: ball.id,
        rail: side < 0 ? "left" : "right",
        strength: impact,
      });
    }
  }
  if (ball.z < -limitZ || ball.z > limitZ) {
    const side = Math.sign(ball.z);
    ball.z = side * limitZ;
    if (ball.vz * side > 0) {
      const impact = Math.abs(ball.vz);
      ball.vz = -ball.vz * restitution;
      ball.vx -= side * ball.spin.x * impact * 0.18;
      ball.spin.x *= 0.65;
      emit({
        type: "cushion",
        ball: ball.id,
        rail: side < 0 ? "top" : "bottom",
        strength: impact,
      });
    }
  }
}
