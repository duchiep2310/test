/** Impulse response for circles; separation is mass weighted. */
export function resolveBalls(a, b, restitution) {
  const dx = b.x - a.x;
  const dz = b.z - a.z;
  const radius = a.radius + b.radius;
  const squared = dx * dx + dz * dz;
  if (squared > radius * radius) return null;
  const distance = Math.sqrt(squared);
  const nx = distance > 1e-9 ? dx / distance : 1;
  const nz = distance > 1e-9 ? dz / distance : 0;
  const inverseA = 1 / a.mass;
  const inverseB = 1 / b.mass;
  const inverseSum = inverseA + inverseB;
  const penetration = radius - distance;
  if (penetration > 0) {
    const correction = (penetration + 1e-8) / inverseSum;
    a.x -= nx * correction * inverseA;
    a.z -= nz * correction * inverseA;
    b.x += nx * correction * inverseB;
    b.z += nz * correction * inverseB;
  }
  const closing = (b.vx - a.vx) * nx + (b.vz - a.vz) * nz;
  if (closing >= -1e-7) return null;
  const impulse = (-(1 + restitution) * closing) / inverseSum;
  a.vx -= impulse * nx * inverseA;
  a.vz -= impulse * nz * inverseA;
  b.vx += impulse * nx * inverseB;
  b.vz += impulse * nz * inverseB;

  // Residual longitudinal cue rotation grips the cloth after impact. This is
  // intentionally a bounded follow/draw approximation rather than rigid-body 3D.
  for (const ball of [a, b]) {
    if (ball._followPending && ball._shotDirection) {
      const follow = ball.spin.y * Math.min(-closing, ball._shotSpeed) * 0.32;
      ball.vx += ball._shotDirection.x * follow;
      ball.vz += ball._shotDirection.z * follow;
      ball._followPending = false;
      ball.spin.y *= 0.35;
    }
  }
  return -closing;
}
