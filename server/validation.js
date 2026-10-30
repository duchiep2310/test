import { cleanName } from "../src/utils/PlayerNames.js";
export const ROOM_PATTERN = /^[A-HJ-NP-Z2-9]{6}$/;
export const MODES = new Set(["eight", "nine", "ten", "carom", "three"]);
export function nameOf(value) {
  return cleanName(value, "Khách");
}
export function shotOf(data) {
  const range = (v, min, max) =>
    typeof v === "number" && Number.isFinite(v) && v >= min && v <= max;
  if (
    !range(data.angle, -Math.PI * 4, Math.PI * 4) ||
    !range(data.power, 0.04, 1) ||
    !range(data.spin?.x, -1, 1) ||
    !range(data.spin?.y, -1, 1)
  )
    throw new Error("Lực đánh hoặc hướng ngắm không hợp lệ.");
  if (
    data.calledPocket != null &&
    (!Number.isInteger(data.calledPocket) ||
      data.calledPocket < 0 ||
      data.calledPocket > 5)
  )
    throw new Error("Lỗ được gọi không hợp lệ.");
  if (
    data.calledBall != null &&
    (!Number.isInteger(data.calledBall) ||
      data.calledBall < 1 ||
      data.calledBall > 15)
  )
    throw new Error("Bi được gọi không hợp lệ.");
  return {
    angle: data.angle,
    power: data.power,
    spin: { x: data.spin.x, y: data.spin.y },
    calledPocket: data.calledPocket ?? null,
    calledBall: data.calledBall ?? null,
  };
}
