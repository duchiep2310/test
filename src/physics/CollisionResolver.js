/** Impulse response for circles; separation is mass weighted. */
export function resolveBalls(a, b, restitution) {
  if ((a.height || 0) > 0 || (b.height || 0) > 0 || a.vy || b.vy)
    return resolveAirborneBalls(a, b, restitution);
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

/** Sphere contact in x/height/z; the cloth supplies a one-sided floor constraint. */
function resolveAirborneBalls(a, b, restitution) {
  let dx = b.x - a.x,
    dz = b.z - a.z;
  const dy = b.radius + b.height - a.radius - a.height;
  const radius = a.radius + b.radius;
  const squared = dx * dx + dy * dy + dz * dz;
  if (squared > radius * radius) return null;
  // Break the exact top-of-sphere equilibrium by a tiny deterministic offset.
  // Otherwise a perfectly centred vertical drop can balance forever in a game.
  if (dx * dx + dz * dz < 1e-10 && Math.abs(dy) > 1e-6) dx = 0.0001;
  const distance = Math.hypot(dx, dy, dz);
  const nx = distance > 1e-9 ? dx / distance : 1;
  const ny = distance > 1e-9 ? dy / distance : 0;
  const nz = distance > 1e-9 ? dz / distance : 0;
  const inverseA = 1 / a.mass,
    inverseB = 1 / b.mass;
  const lockA = a.height <= 1e-8 && a.vy <= 0 && ny > 0;
  const lockB = b.height <= 1e-8 && b.vy <= 0 && ny < 0;
  const horizontal = nx * nx + nz * nz;
  const denominator =
    inverseA * (horizontal + (lockA ? 0 : ny * ny)) +
    inverseB * (horizontal + (lockB ? 0 : ny * ny));
  if (denominator < 1e-12) return null;
  const penetration = radius - distance;
  if (penetration > 0) {
    const correction = (penetration + 1e-8) / denominator;
    a.x -= nx * correction * inverseA;
    a.z -= nz * correction * inverseA;
    b.x += nx * correction * inverseB;
    b.z += nz * correction * inverseB;
    if (!lockA) a.height = Math.max(0, a.height - ny * correction * inverseA);
    if (!lockB) b.height = Math.max(0, b.height + ny * correction * inverseB);
  }
  const closing = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny + (b.vz - a.vz) * nz;
  if (closing >= -1e-7) return null;
  const impulse = (-(1 + restitution) * closing) / denominator;
  a.vx -= impulse * nx * inverseA;
  a.vz -= impulse * nz * inverseA;
  b.vx += impulse * nx * inverseB;
  b.vz += impulse * nz * inverseB;
  if (!lockA) a.vy -= impulse * ny * inverseA;
  if (!lockB) b.vy += impulse * ny * inverseB;
  if (a.height === 0 && a.vy < 0) a.vy = 0;
  if (b.height === 0 && b.vy < 0) b.vy = 0;
  return -closing;
}
