import { TABLE, POCKETS } from "../core/Constants.js";

export function findPocket(ball) {
  for (let i = 0; i < POCKETS.length; i++) {
    const p = POCKETS[i];
    if (Math.hypot(ball.x - p.x, ball.z - p.z) < TABLE.pocketRadius) return i;
  }
  return -1;
}
