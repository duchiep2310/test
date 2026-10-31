import { TABLE, POCKETS } from "../core/Constants.js";

export function findPocket(ball) {
  // A high ball can pass over the mouth. Capture begins only near the cloth,
  // while level or descending; a rising jump must not be swallowed at takeoff.
  if ((ball.height || 0) > ball.radius * 0.3 || (ball.vy || 0) > 0.15)
    return -1;
  for (let i = 0; i < POCKETS.length; i++) {
    const p = POCKETS[i];
    if (Math.hypot(ball.x - p.x, ball.z - p.z) < TABLE.pocketRadius) return i;
  }
  return -1;
}
