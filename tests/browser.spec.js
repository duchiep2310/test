import { test, expect } from "@playwright/test";

test("all five modes render, shoot through physics and reach the next playable turn", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const badResponses = [];
  page.on("response", (r) => {
    if (r.status() >= 400) badResponses.push(r.url());
  });
  await page.goto("/");
  await expect(page.locator("#scene canvas")).toBeVisible();
  for (const [mode, count, pockets] of [
    ["eight", 16, true],
    ["nine", 10, true],
    ["ten", 11, true],
    ["carom", 3, false],
    ["three", 3, false],
  ]) {
    await page.evaluate((id) => {
      window.__game.loop.stop();
      window.__game.start(id);
    }, mode);
    const before = await page.evaluate(() => {
      let g = window.__game;
      return {
        count: g.physics.balls.length,
        pockets: g.mode.pockets,
        state: g.state,
      };
    });
    expect(before).toEqual({
      count,
      pockets,
      state: pockets ? "BREAK_SHOT" : "PLAYER_TURN",
    });
    await page.locator("#shoot").click();
    expect(await page.evaluate(() => window.__game.state)).toBe(
      "SHOT_IN_PROGRESS",
    );
    const result = await page.evaluate(() => {
      const g = window.__game;
      for (let i = 0; i < 7200; i++) g.fixedUpdate(1 / 240);
      g.render(0);
      return {
        state: g.state,
        shots: g.shots,
        events: g.shotEvents.length,
        finite: g.physics.balls.every((b) =>
          Number.isFinite(b.x + b.z + b.vx + b.vz),
        ),
        moving: g.physics.isMoving(),
      };
    });
    expect(result.shots).toBe(1);
    expect(result.events).toBeGreaterThan(0);
    expect(result.finite).toBe(true);
    expect(result.moving).toBe(false);
    expect(["PLAYER_TURN", "BALL_IN_HAND"]).toContain(result.state);
  }
  expect(errors).toEqual([]);
  expect(badResponses).toEqual([]);
});

test("settings, spin, power, cameras, pause and mobile layout work", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await page.locator("#power").fill("73");
  expect(await page.evaluate(() => window.__game.power)).toBe(0.73);
  await page.locator("#spin-pad").click({ position: { x: 40, y: 15 } });
  expect(await page.evaluate(() => window.__game.spin.y)).toBeGreaterThan(0.1);
  await page.locator("#reset-spin").click();
  expect(await page.evaluate(() => window.__game.spin)).toEqual({ x: 0, y: 0 });
  await page.locator("#camera").click();
  await expect(page.locator("#camera")).toHaveAttribute(
    "aria-label",
    "Switch to angled view",
  );
  await page.locator("#pause").click();
  expect(await page.evaluate(() => window.__game.state)).toBe("PAUSED");
  await page.keyboard.press("Escape");
  expect(await page.evaluate(() => window.__game.state)).toBe("BREAK_SHOT");
  await page.locator("#settings").click();
  await page.locator("[name=opponent]").selectOption("ai");
  await page.locator("[name=difficulty]").selectOption("hard");
  await page.locator("[name=tableColor]").selectOption("#245b89");
  await page.locator("[name=language]").selectOption("vi");
  await page.getByRole("button", { name: "Save preferences" }).click();
  await expect(page.locator("#nav-play")).toHaveText("Chơi");
  expect(await page.evaluate(() => window.__game.settings.difficulty)).toBe(
    "hard",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(300);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await expect(page.locator("#shoot")).toBeVisible();
  await page.screenshot({ path: "test-results/mobile.png", fullPage: true });
  expect(errors).toEqual([]);
});

test("scratch triggers ball-in-hand, placement rejects overlap and accepts table click", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(() => {
    const g = window.__game;
    g.loop.stop();
    g.start("nine");
    g.mode.isBreak = false;
    g.physics.setBalls([
      { id: 0, x: 0, z: 0 },
      { id: 1, x: 1, z: 0 },
      { id: 9, x: 1.5, z: 0 },
    ]);
    g.angle = -Math.PI / 2;
    g.power = 0.5;
    g.notify();
  });
  await page.locator("#shoot").click();
  await page.evaluate(() => {
    const g = window.__game;
    for (let i = 0; i < 6000; i++) g.fixedUpdate(1 / 240);
    g.render(0);
  });
  expect(await page.evaluate(() => window.__game.state)).toBe("BALL_IN_HAND");
  expect(await page.evaluate(() => window.__game.place(1, 0))).toBe(false);
  const p = await page.evaluate(() => {
    const g = window.__game;
    const v = g.scene.camera.position.clone();
    v.set(-1, 0.065, 0).project(g.scene.camera);
    const r = g.scene.canvas.getBoundingClientRect();
    return {
      x: r.left + ((v.x + 1) * r.width) / 2,
      y: r.top + ((-v.y + 1) * r.height) / 2,
    };
  });
  await page.mouse.click(p.x, p.y);
  expect(await page.evaluate(() => window.__game.state)).toBe("PLAYER_TURN");
  expect(await page.evaluate(() => window.__game.cue.active)).toBe(true);
});

test("called final eight is resolved from physical pocket events and saved to history", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(() => {
    const g = window.__game;
    g.loop.stop();
    g.start("eight");
    g.mode.isBreak = false;
    g.mode.groups = ["solids", "stripes"];
    g.physics.setBalls([
      { id: 0, x: 0, z: 0 },
      { id: 8, x: 0, z: -0.7 },
      { id: 9, x: 2, z: 0 },
    ]);
    g.angle = -Math.PI / 2;
    g.power = 0.38;
    g.notify();
  });
  await expect(page.locator("#call-panel")).toBeVisible();
  await page.locator('[data-pocket="1"]').click();
  await page.locator("#shoot").click();
  await page.evaluate(() => {
    const g = window.__game;
    for (let i = 0; i < 6000; i++) g.fixedUpdate(1 / 240);
    g.render(0);
  });
  expect(await page.evaluate(() => window.__game.mode.winner)).toBe(0);
  await expect(page.locator("#modal-title")).toHaveText("A game well played.");
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem("velvet-history")).length,
    ),
  ).toBe(1);
});

test("AI takes the next turn using the same engine", async ({ page }) => {
  await page.goto("/");
  const outcome = await page.evaluate(() => {
    const g = window.__game;
    g.loop.stop();
    g.start("nine");
    g.settings.opponent = "ai";
    g.mode.currentPlayer = 1;
    g.aiDelay = 0;
    g.fixedUpdate(1 / 240);
    return {
      state: g.state,
      shots: g.shots,
      moving: g.physics.isMoving(),
      speed: Math.hypot(g.cue.vx, g.cue.vz),
    };
  });
  expect(outcome.state).toBe("SHOT_IN_PROGRESS");
  expect(outcome.shots).toBe(1);
  expect(outcome.moving).toBe(true);
  expect(outcome.speed).toBeGreaterThan(0);
});
