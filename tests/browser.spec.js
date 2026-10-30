import { test, expect } from "@playwright/test";
async function offline(page) {
  await page.goto("/");
  await page.locator("#play-local").click();
}

test("all five modes render, shoot through physics and reach the next playable turn", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const badResponses = [];
  page.on("response", (r) => {
    if (r.status() >= 400) badResponses.push(r.url());
  });
  await offline(page);
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
  await offline(page);
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
  await offline(page);
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
  await offline(page);
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
  await offline(page);
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

test("larger table, WASD camera movement, deep zoom and reset work without moving balls", async ({
  page,
}) => {
  test.setTimeout(60000);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await offline(page);
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const balls = await page.evaluate(() =>
    window.__game.physics.balls.map((b) => [b.id, b.x, b.z, b.vx, b.vz]),
  );
  for (const [key, axis, sign] of [
    ["w", "z", -1],
    ["s", "z", 1],
    ["a", "x", -1],
    ["d", "x", 1],
  ]) {
    await page.keyboard.press("r");
    await page.keyboard.down(key);
    await page.waitForFunction(
      ({ axis, sign }) => window.__game.scene.target[axis] * sign > 0.04,
      { axis, sign },
    );
    await page.keyboard.up(key);
    const stopped = await page.evaluate(() =>
      window.__game.scene.target.toArray(),
    );
    await page.waitForTimeout(100);
    expect(
      await page.evaluate(() => window.__game.scene.target.toArray()),
    ).toEqual(stopped);
  }
  expect(
    await page.evaluate(() =>
      window.__game.physics.balls.map((b) => [b.id, b.x, b.z, b.vx, b.vz]),
    ),
  ).toEqual(balls);
  expect(await page.evaluate(() => window.__game.shots)).toBe(0);
  await page.locator("#zoom-in").click();
  const z = await page.evaluate(() => window.__game.scene.zoomLevel);
  await page.locator("#zoom-out").click();
  expect(
    await page.evaluate(() => window.__game.scene.zoomLevel),
  ).toBeGreaterThan(z);
  await page.keyboard.down("Equal");
  await page.waitForFunction(() => window.__game.scene.zoomLevel < 0.6);
  await page.keyboard.up("Equal");
  await page.keyboard.press("r");
  expect(await page.evaluate(() => window.__game.scene.zoomLevel)).toBe(1);
  expect(
    await page.evaluate(
      () => window.__game.scene.target.x + window.__game.scene.target.z,
    ),
  ).toBe(0);
  const before = await page.locator("#scene").boundingBox();
  await page.locator("#expand-table").click();
  await expect(page.locator("#expand-table")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.waitForFunction(
    (w) => document.querySelector("#scene").clientWidth > w + 100,
    before.width,
  );
  await expect(page.locator("#player-cards")).toBeVisible();
  await expect(page.locator("#shoot")).toBeEnabled();
  await page.screenshot({
    path: "test-results/expanded-table.png",
    fullPage: true,
  });
  await page.locator("#edit-names-at-table").click();
  await page.locator("#name-first").fill("");
  await page.locator("#name-first").pressSequentially("wasd");
  expect(
    await page.evaluate(
      () => window.__game.scene.target.x + window.__game.scene.target.z,
    ),
  ).toBe(0);
  await page.locator("#close-names").click();
  await page.keyboard.down("w");
  await page.waitForFunction(() => window.__game.scene.target.z < -0.04);
  await page.evaluate(() => window.dispatchEvent(new Event("blur")));
  await page.keyboard.up("w");
  const afterBlur = await page.evaluate(() =>
    window.__game.scene.target.toArray(),
  );
  await page.waitForTimeout(100);
  expect(
    await page.evaluate(() => window.__game.scene.target.toArray()),
  ).toEqual(afterBlur);
  await page.locator("#reset-camera").click();
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
});

test("disabled aim guide shows only the cue-tip to cue-ball segment and remembers the setting", async ({
  page,
}) => {
  await offline(page);
  await page.locator("#guide-toggle").click();
  await expect(page.locator("#guide-toggle")).toHaveAttribute(
    "aria-pressed",
    "false",
  );
  await page.waitForFunction(
    () =>
      window.__game.scene.cueGapLine.visible &&
      !window.__game.scene.guideGroup.visible,
  );
  const checks = await page.evaluate(() => {
    const g = window.__game,
      scene = g.scene;
    return [0, Math.PI / 2, -Math.PI / 3].flatMap((angle) =>
      [0.15, 0.85].map((power) => {
        g.angle = angle;
        g.power = power;
        g.render(0.016);
        const p = scene.cueGapPositions,
          cue = g.cue,
          r = cue.radius,
          tip = scene.cueTip.localToWorld(
            scene.cueGapStart
              .clone()
              .set(0, -scene.cueTip.geometry.parameters.height / 2, 0),
          );
        return {
          visible: scene.cueGapLine.visible,
          predictions: scene.guideGroup.visible,
          startError: Math.hypot(p[0] - tip.x, p[1] - tip.y, p[2] - tip.z),
          endError: Math.abs(Math.hypot(p[3] - cue.x, p[5] - cue.z) - r),
          behind:
            (p[3] - cue.x) * Math.cos(angle) + (p[5] - cue.z) * Math.sin(angle),
          length: Math.hypot(p[3] - p[0], p[5] - p[2]),
        };
      }),
    );
  });
  for (const c of checks) {
    expect(c.visible).toBe(true);
    expect(c.predictions).toBe(false);
    expect(c.startError).toBeLessThan(1e-6);
    expect(c.endError).toBeLessThan(1e-6);
    expect(c.behind).toBeLessThan(0);
    expect(c.length).toBeGreaterThan(0);
    expect(c.length).toBeLessThan(0.6);
  }
  await page.locator("#guide-toggle").click();
  await page.waitForFunction(
    () =>
      window.__game.scene.guideGroup.visible &&
      !window.__game.scene.cueGapLine.visible,
  );
  await page.locator("#guide-toggle").click();
  await page.locator("#pause").click();
  await page.waitForFunction(() => !window.__game.scene.cueGapLine.visible);
  await page.locator("#pause").click();
  await page.waitForFunction(() => window.__game.scene.cueGapLine.visible);
  await page.reload();
  await page.locator("#play-local").click();
  await expect(page.locator("#guide-toggle")).toHaveAttribute(
    "aria-pressed",
    "false",
  );
  await page.waitForFunction(() => window.__game.scene.cueGapLine.visible);
  await page.locator("#shoot").click();
  await page.waitForFunction(
    () =>
      !window.__game.scene.cueGapLine.visible &&
      !window.__game.scene.guideGroup.visible,
  );
});
