import test from "node:test";
import assert from "node:assert/strict";
import { AIController } from "../src/ai/AIController.js";
import { AudioManager } from "../src/audio/AudioManager.js";

const ball = (id, x, z) => ({ id, x, z, active: true, radius: 0.065 });
const poolMode = {
  id: "nine",
  pockets: true,
  isBreak: false,
  cueId: () => 0,
  legalTargets: () => [1],
};
const ai = new AIController();

test("AI picks a finite impulse and calls a legal direct pot without mutating balls", () => {
  const balls = [ball(0, -1, 0), ball(1, 0, 0.7), ball(9, 1.4, 0)];
  const before = JSON.stringify(balls);
  for (const difficulty of ["easy", "medium", "hard"]) {
    const shot = ai.chooseShot({ mode: poolMode, balls, difficulty });
    assert.ok(Number.isFinite(shot.angle));
    assert.ok(shot.power > 0 && shot.power <= 1);
    assert.ok(shot.calledPocket >= 0 && shot.calledPocket < 6);
    assert.ok([1, 9].includes(shot.calledBall));
  }
  assert.equal(JSON.stringify(balls), before);
});

test("obstruction detection distinguishes blocked and clear paths", () => {
  const balls = [ball(0, -1, 0), ball(1, 1, 0), ball(2, 0, 0)];
  assert.equal(ai.pathClear(balls[0], balls[1], balls, [0, 1]), false);
  balls[2].z = 0.5;
  assert.equal(ai.pathClear(balls[0], balls[1], balls, [0, 1]), true);
});

test("carom and three-cushion choose finite estimated shots", () => {
  const balls = [ball(0, -1, -0.3), ball(1, 1, 0.2), ball(2, 0, -0.4)];
  for (const id of ["carom", "three"]) {
    const mode = {
      id,
      pockets: false,
      cueId: () => 0,
      legalTargets: () => [1, 2],
    };
    const shot = ai.chooseShot({ mode, balls, difficulty: "hard" });
    assert.ok(Number.isFinite(shot.angle));
    assert.ok(shot.power >= 0.4 && shot.power <= 1);
    assert.equal(shot.calledPocket, null);
  }
});

test("AI ball-in-hand checks legality through physics placement contract", () => {
  let calls = 0;
  const physics = {
    balls: [ball(1, 0.7, 0)],
    canPlace: (x, z, id) => {
      calls++;
      return id === 0 && x > 0.8 && Math.abs(z) < 1;
    },
  };
  const placement = ai.choosePlacement({ mode: poolMode, physics });
  assert.ok(calls > 0);
  assert.ok(placement.x > 0.8 && Math.abs(placement.z) < 1);
});

test("audio is optional and settings remain safe outside a browser", () => {
  const audio = new AudioManager();
  audio.setVolume(5);
  audio.setMusicVolume(-2);
  audio.setMuted(true);
  assert.equal(audio.volume, 1);
  assert.equal(audio.musicVolume, 0);
  audio.play("collision");
  audio.resume();
  audio.dispose();
});

test("hard carom shortlist uses the physical solver without mutating match state", async () => {
  const { createMode } = await import("../src/modes/index.js");
  for (const id of ["carom", "three"]) {
    const mode = createMode(id);
    const balls = mode.setup();
    const before = JSON.stringify(balls);
    const random = Math.random;
    let shot;
    try {
      Math.random = () => 0.5;
      shot = ai.chooseShot({ mode, balls, difficulty: "hard" });
    } finally {
      Math.random = random;
    }
    const actual = ai.simulateCarom(
      balls,
      mode.cueId(),
      shot,
      id === "three" ? 3 : 0,
    );
    assert.equal(
      actual.scored,
      true,
      `${id} starting-layout shot should score in the physical solver`,
    );
    assert.equal(JSON.stringify(balls), before);
    assert.deepEqual(mode.scores, [0, 0]);
  }
});

test("AI break aims at the legal head ball with full rack-breaking power", () => {
  const shot = ai.chooseShot({
    mode: { ...poolMode, isBreak: true },
    balls: [ball(0, -1.4, 0), ball(1, 1, 0), ball(9, 1.3, 0)],
    difficulty: "hard",
  });
  assert.equal(shot.angle, 0);
  assert.ok(shot.power >= 0.9);
  assert.equal(shot.calledBall, 1);
});
