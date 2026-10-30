import test from "node:test";
import assert from "node:assert/strict";
import { PhysicsEngine } from "../src/physics/PhysicsEngine.js";
import { TABLE } from "../src/core/Constants.js";

const ball = (id, x, z, vx = 0, vz = 0, extra = {}) => ({
  id,
  x,
  z,
  vx,
  vz,
  ...extra,
});
const pure = (options = {}) =>
  new PhysicsEngine({
    pockets: false,
    rollingResistance: 0,
    linearDamping: 0,
    ballRestitution: 1,
    ...options,
  });
const advance = (engine, seconds) => {
  for (let t = 0; t < seconds - 1e-8; t += 1 / 240) engine.step(1 / 240);
};
const near = (a, b, epsilon = 1e-6) =>
  assert.ok(Math.abs(a - b) < epsilon, `${a} should be near ${b}`);

test("head-on equal-mass collision transfers momentum without energy gain", () => {
  const engine = pure();
  engine.setBalls([ball(0, -0.5, 0, 3), ball(1, 0, 0)]);
  advance(engine, 0.2);
  near(engine.balls[0].vx, 0);
  near(engine.balls[1].vx, 3);
  near(
    engine.balls.reduce((sum, b) => sum + b.vx, 0),
    3,
  );
});

test("mass-aware impulse conserves linear momentum", () => {
  const engine = pure();
  engine.setBalls([ball(0, -0.3, 0, 3, 0, { mass: 2 }), ball(1, 0, 0)]);
  advance(engine, 0.1);
  near(engine.balls[0].vx, 1);
  near(engine.balls[1].vx, 4);
});

test("oblique impact preserves tangential velocity and deflects both balls", () => {
  const engine = pure();
  engine.setBalls([ball(0, -0.4, 0.07, 3), ball(1, 0, 0)]);
  advance(engine, 0.18);
  assert.ok(engine.balls[0].vz > 0);
  assert.ok(engine.balls[1].vz < 0);
  near(engine.balls[0].vx + engine.balls[1].vx, 3);
  near(engine.balls[0].vz + engine.balls[1].vz, 0);
  near(
    engine.balls.reduce((sum, b) => sum + b.vx ** 2 + b.vz ** 2, 0),
    9,
  );
});

test("cushion reflects normal velocity with controlled restitution", () => {
  const events = [];
  const engine = pure({ onEvent: (event) => events.push(event) });
  engine.setBalls([ball(0, 2.7, 0, 2, 1)]);
  advance(engine, 0.05);
  near(engine.balls[0].vx, -1.6);
  near(engine.balls[0].vz, 1);
  assert.equal(events.filter((event) => event.type === "cushion").length, 1);
});

test("simultaneous collisions remain finite and separate the rack", () => {
  const engine = pure();
  engine.setBalls([
    ball(0, -0.4, 0, 5),
    ball(1, 0, 0),
    ball(2, 0.13, 0),
    ball(3, 0.065, 0.1126),
  ]);
  advance(engine, 1);
  for (let i = 0; i < engine.balls.length; i++) {
    const a = engine.balls[i];
    assert.ok(Number.isFinite(a.x + a.z + a.vx + a.vz));
    for (let j = i + 1; j < engine.balls.length; j++) {
      const b = engine.balls[j];
      assert.ok(
        Math.hypot(a.x - b.x, a.z - b.z) >= a.radius + b.radius - 0.0001,
      );
    }
  }
});

test("middle pocket captures cue ball and emits a scratch event once", () => {
  const events = [];
  const engine = new PhysicsEngine({ onEvent: (event) => events.push(event) });
  engine.setBalls([ball(0, 0, 0, 0, -4)]);
  advance(engine, 1);
  assert.equal(engine.balls[0].active, false);
  assert.equal(engine.balls[0].vx + engine.balls[0].vz, 0);
  assert.deepEqual(
    events.filter((e) => e.type === "pocket").map((e) => [e.ball, e.pocket]),
    [[0, 1]],
  );
});

test("corner pocket captures a diagonal entry", () => {
  const engine = new PhysicsEngine();
  engine.setBalls([ball(1, 2, 0.6, 3, 3)]);
  advance(engine, 0.5);
  assert.equal(engine.balls[0].active, false);
  assert.equal(engine.balls[0].pocket, 5);
});

test("a near miss of pocket jaws remains bounded instead of escaping the table", () => {
  const engine = new PhysicsEngine();
  engine.setBalls([ball(1, 0.19, 1.1, 0, 7)]);
  advance(engine, 0.5);
  assert.ok(engine.balls[0].active);
  assert.ok(engine.balls[0].z <= TABLE.halfHeight - TABLE.radius);
  assert.ok(engine.balls[0].vz < 0);
});

test("high speed substeps prevent tunneling through balls and cushions", () => {
  const events = [];
  const engine = pure({ onEvent: (event) => events.push(event) });
  engine.setBalls([ball(0, -1, 0, 80), ball(1, 0, 0)]);
  engine.step(0.1);
  assert.ok(events.some((event) => event.type === "collision"));
  assert.ok(events.some((event) => event.type === "cushion"));
  for (const b of engine.balls)
    assert.ok(Math.abs(b.x) <= TABLE.halfWidth - b.radius + 1e-8);
});

test("rolling resistance brings all balls to exact rest", () => {
  const engine = new PhysicsEngine({ pockets: false });
  engine.setBalls([ball(0, 0, 0)]);
  assert.equal(engine.shoot(0, 0.32, 1), true);
  advance(engine, 20);
  assert.equal(engine.isMoving(), false);
  near(engine.balls[0].vx, 0);
  near(engine.balls[0].vz, 0);
});

test("follow and draw produce distinct post-collision cue behavior", () => {
  const shot = (spin) => {
    const engine = pure();
    engine.setBalls([ball(0, -0.4, 0), ball(1, 0, 0)]);
    engine.shoot(0, 0, 0.4, { x: 0, y: spin });
    advance(engine, 0.13);
    return engine.balls[0].vx;
  };
  assert.ok(shot(1) > 0.5);
  assert.ok(shot(-1) < -0.5);
});

test("side spin changes cushion tangential response", () => {
  const engine = pure();
  engine.setBalls([ball(0, 2.5, 0)]);
  engine.shoot(0, 0, 0.4, { x: 1, y: 0 });
  advance(engine, 0.1);
  assert.ok(engine.balls[0].vz > 0.1);
});

test("ball-in-hand rejects overlap, pockets and out-of-bounds positions", () => {
  const engine = new PhysicsEngine();
  engine.setBalls([ball(0, 0, 0, 0, 0, { active: false }), ball(1, 1, 0)]);
  assert.equal(engine.placeBall(0, 1.05, 0), false);
  assert.equal(engine.placeBall(0, 0, 1.33), false);
  assert.equal(engine.placeBall(0, 3, 0), false);
  assert.equal(engine.placeBall(0, NaN, 0), false);
  assert.equal(engine.placeBall(0, -1, 0), true);
  assert.equal(engine.balls[0].active, true);
});

test("shooting is refused while balls move and carom has no pockets", () => {
  const engine = new PhysicsEngine({ pockets: false });
  engine.setBalls([ball(0, 0, -1.2, 0, -3)]);
  assert.equal(engine.shoot(0, 0, 0.5), false);
  advance(engine, 0.2);
  assert.equal(engine.balls[0].active, true);
  assert.ok(engine.balls[0].vz > 0);
});

test("a full-power 16-ball break settles without overlap, escape, or invalid positions", () => {
  const engine = new PhysicsEngine();
  const balls = [ball(0, -1.5, 0)];
  let id = 1;
  for (let row = 0; row < 5; row++) {
    for (let column = 0; column <= row; column++) {
      balls.push(ball(id++, 0.9 + row * 0.1145, (column - row / 2) * 0.132));
    }
  }
  engine.setBalls(balls);
  engine.shoot(0, 0, 1);
  advance(engine, 20);
  assert.equal(engine.isMoving(), false);
  for (let i = 0; i < balls.length; i++) {
    const a = balls[i];
    assert.ok(Number.isFinite(a.x + a.z + a.vx + a.vz));
    if (!a.active) continue;
    assert.ok(Math.abs(a.x) <= TABLE.halfWidth - a.radius + 1e-7);
    assert.ok(Math.abs(a.z) <= TABLE.halfHeight - a.radius + 1e-7);
    for (let j = i + 1; j < balls.length; j++) {
      const b = balls[j];
      if (b.active)
        assert.ok(
          Math.hypot(a.x - b.x, a.z - b.z) >= a.radius + b.radius - 0.001,
        );
    }
  }
});
