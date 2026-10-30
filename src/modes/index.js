import EightBallMode from "./EightBallMode.js";
import NineBallMode from "./NineBallMode.js";
import TenBallMode from "./TenBallMode.js";
import CaromMode from "./CaromMode.js";
import ThreeCushionMode from "./ThreeCushionMode.js";
export function createMode(id, options = {}) {
  const modes = {
    eight: EightBallMode,
    nine: NineBallMode,
    ten: TenBallMode,
    carom: CaromMode,
    three: ThreeCushionMode,
  };
  if (!modes[id]) throw new Error(`Unknown game mode: ${id}`);
  return new modes[id](options);
}
