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
  await page.locator("#reposition-cue").click();
  expect(await page.evaluate(() => window.__game.state)).toBe("BALL_IN_HAND");
  const p2 = await page.evaluate(() => {
    const g = window.__game,
      v = g.scene.camera.position
        .clone()
        .set(-1.8, 0, 0.5)
        .project(g.scene.camera),
      r = g.scene.canvas.getBoundingClientRect();
    return {
      x: r.left + ((v.x + 1) * r.width) / 2,
      y: r.top + ((1 - v.y) * r.height) / 2,
    };
  });
  await page.mouse.click(p2.x, p2.y);
  expect(await page.evaluate(() => window.__game.cue.x)).toBeCloseTo(-1.8, 4);
  expect(await page.evaluate(() => window.__game.canReposition)).toBe(true);
  await page.locator("#shoot").click();
  expect(await page.evaluate(() => window.__game.placementAllowed)).toBe(false);
  expect(await page.evaluate(() => window.__game.repositionCue())).toBe(false);
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
    ]);
    g.notify();
  });
  await expect(page.locator("#call-panel")).toBeVisible();
  await page.locator("#cue-angle-range").fill("270");
  await page.locator("#power").fill("38");
  await page.locator("#shoot").click();
  await expect(page.locator("#shot-call-dialog")).toBeVisible();
  await expect(page.locator("#shot-call-confirm")).toBeDisabled();
  expect(await page.evaluate(() => window.__game.shots)).toBe(0);
  await page.locator("#shot-call-cancel").click();
  expect(await page.evaluate(() => window.__game.calledPocket)).toBeNull();
  await page.locator("#shoot").click();
  await page.locator('[data-shot-pocket="1"]').click();
  await page.locator("#shot-call-confirm").click();
  expect(await page.evaluate(() => window.__game.state)).toBe(
    "SHOT_IN_PROGRESS",
  );
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
  await expect(page.locator("#series-values")).toHaveText("1 — 0");
  await expect(page.locator(".result-series")).toContainText("1 — 0");
  await page.locator("#result-replay").click();
  await expect(page.locator("#series-values")).toHaveText("1 — 0");
  await page.reload();
  await page.locator("#play-local").click();
  await expect(page.locator("#series-values")).toHaveText("1 — 0");
});

test("cue angle slider, fine buttons and arrow keys aim without moving the camera or balls", async ({
  page,
}) => {
  await offline(page);
  const before = await page.evaluate(() => ({
    camera: window.__game.scene.target.toArray(),
    balls: window.__game.physics.balls.map((b) => [b.id, b.x, b.z]),
  }));
  await page.locator("#cue-angle-range").fill("359.9");
  await page.locator("#cue-angle-right").click();
  await expect(page.locator("#cue-angle-value")).toHaveText("0.0°");
  await page.locator("#cue-angle-left").click();
  await expect(page.locator("#cue-angle-value")).toHaveText("359.9°");
  await page.locator("#cue-angle-range").fill("90");
  await page.locator("#cue-angle-range").press("ArrowLeft");
  await expect(page.locator("#cue-angle-value")).toHaveText("89.9°");
  await page.evaluate(() => document.activeElement.blur());
  await page.keyboard.press("ArrowRight");
  expect(await page.evaluate(() => window.__game.angle)).toBeCloseTo(
    Math.PI / 2,
    6,
  );
  await page.locator("#spin-pad").focus();
  await page.keyboard.press("ArrowRight");
  expect(await page.evaluate(() => window.__game.angle)).toBeCloseTo(
    Math.PI / 2,
    6,
  );
  expect(await page.evaluate(() => window.__game.spin.x)).toBeCloseTo(0.1, 6);
  await page.locator("#cue-angle-right").scrollIntoViewIfNeeded();
  const r = await page.locator("#cue-angle-right").boundingBox();
  await page.mouse.move(r.x + r.width / 2, r.y + r.height / 2);
  await page.mouse.down();
  await page.waitForFunction(() => window.__game.angle > Math.PI / 2 + 0.01);
  await page.mouse.up();
  const stopped = await page.evaluate(() => window.__game.angle);
  await page.waitForTimeout(100);
  expect(await page.evaluate(() => window.__game.angle)).toBe(stopped);
  expect(
    await page.evaluate(() => ({
      camera: window.__game.scene.target.toArray(),
      balls: window.__game.physics.balls.map((b) => [b.id, b.x, b.z]),
    })),
  ).toEqual(before);
  await page.locator("#pause").click();
  await expect(page.locator("#cue-angle-range")).toBeDisabled();
  await page.locator("#pause").click();
  await expect(page.locator("#cue-angle-range")).toBeEnabled();
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page
    .locator("#cue-angle-control")
    .screenshot({ path: "test-results/cue-angle-mobile.png" });
  await page.evaluate(() => window.__game.loop.stop());
  await page.locator("#shoot").click();
  await expect(page.locator("#cue-angle-range")).toBeDisabled();
  await expect(page.locator("#cue-angle-left")).toBeDisabled();
  await expect(page.locator("#cue-angle-right")).toBeDisabled();
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

test("navigation bar opens screens, pans camera by holding arrows and fits mobile", async ({
  page,
}) => {
  await offline(page);
  await expect(page.locator("#match-tools")).toBeVisible();
  const rect = await page.locator("[data-camera=KeyD]").boundingBox();
  await page.mouse.move(rect.x + rect.width / 2, rect.y + rect.height / 2);
  await page.mouse.down();
  await page.waitForFunction(() => window.__game.scene.target.x > 0.03);
  await page.mouse.up();
  const x = await page.evaluate(() => window.__game.scene.target.x);
  await page.waitForTimeout(100);
  expect(await page.evaluate(() => window.__game.scene.target.x)).toBe(x);
  await page.locator("#tools-rules").click();
  await expect(page.locator("#modal")).toBeVisible();
  await page.locator("#close-modal").click();
  await page.locator("#tools-names").click();
  await expect(page.locator("#names-dialog")).toBeVisible();
  await page.locator("#close-names").click();
  await page.locator("#tools-settings").click();
  await expect(page.locator("#settings-form")).toBeVisible();
  await page.locator("#close-modal").click();
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: "test-results/navigation-scores.png",
    fullPage: true,
  });
  await page.locator("#tools-lobby").click();
  await expect(page.locator("#room-lobby")).toBeVisible();
});

test("jump controls launch the cue over a blocker, render its real height and land before the next turn", async ({
  page,
}) => {
  test.setTimeout(60000);
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await offline(page);
  await page.evaluate(() => {
    const g = window.__game;
    g.loop.stop();
    g.start("nine");
    g.mode.isBreak = false;
    g.state = "PLAYER_TURN";
    g.physics.setBalls([
      { id: 0, x: 0, z: 0 },
      { id: 2, x: 0.6, z: 0 },
      { id: 1, x: 1.55, z: 0 },
      { id: 9, x: -1, z: 0.7 },
    ]);
    g.notify();
    g.render(0.016);
  });
  await expect(page.locator("#jump-toggle")).toHaveAttribute(
    "aria-pressed",
    "false",
  );
  await expect(page.locator("#jump-level")).toBeDisabled();
  await page.locator("#jump-toggle").click();
  await page.locator("#jump-level").fill("100");
  await page.locator("#power").fill("50");
  const jumpAim = await page.evaluate(() => {
    const g = window.__game;
    g.render(0.016);
    return {
      jump: g.jump,
      predictions: g.scene.guideGroup.visible,
      gap: g.scene.cueGapLine.visible,
    };
  });
  expect(jumpAim).toEqual({ jump: 1, predictions: false, gap: true });
  await page.locator("#jump-toggle").click();
  expect(
    await page.evaluate(() => {
      const g = window.__game;
      g.render(0.016);
      return g.jump === 0 && g.scene.guideGroup.visible;
    }),
  ).toBe(true);
  await page.locator("#jump-toggle").click();
  await page.locator("#shoot").click();
  await expect(page.locator("#jump-toggle")).toBeDisabled();
  await expect(page.locator("#jump-level")).toBeDisabled();
  expect(await page.evaluate(() => window.__game.setJump(0))).toBe(false);

  const airborne = await page.evaluate(() => {
    const g = window.__game;
    for (let i = 0; i < 45; i++) g.fixedUpdate(1 / 240);
    g.render(0.016);
    const cue = g.cue,
      blocker = g.physics.balls.find((ball) => ball.id === 2);
    const rendered = g.scene.ballRenderer.meshes.get(cue.id);
    return {
      height: cue.height,
      x: cue.x,
      meshHeight: rendered.mesh.position.y - cue.radius - 0.008,
      shadowY: rendered.shadow.position.y,
      shadowX: rendered.shadow.position.x,
      shadowVisible: rendered.shadow.visible,
      blocker: { x: blocker.x, vx: blocker.vx, height: blocker.height },
      contacts: g.shotEvents.filter(
        (event) =>
          event.type === "collision" && (event.a === 0 || event.b === 0),
      ),
    };
  });
  expect(airborne.height).toBeGreaterThan(0.13);
  expect(airborne.x).toBeGreaterThan(0.5);
  expect(airborne.meshHeight).toBeCloseTo(airborne.height, 6);
  expect(airborne.shadowY).toBeLessThan(0.02);
  expect(airborne.shadowX).toBeCloseTo(airborne.x, 6);
  expect(airborne.shadowVisible).toBe(true);
  expect(airborne.blocker).toEqual({ x: 0.6, vx: 0, height: 0 });
  expect(airborne.contacts).toEqual([]);
  await page
    .locator("#scene")
    .screenshot({ path: "test-results/jump-airborne.png" });

  const settled = await page.evaluate(() => {
    const g = window.__game;
    for (let i = 0; i < 7200; i++) g.fixedUpdate(1 / 240);
    g.render(0.016);
    const firstContact = g.shotEvents.find(
      (event) => event.type === "collision" && (event.a === 0 || event.b === 0),
    );
    return {
      state: g.state,
      moving: g.physics.isMoving(),
      jump: g.jump,
      height: g.cue.height,
      vy: g.cue.vy,
      firstPair: firstContact ? [firstContact.a, firstContact.b].sort() : null,
      landed: g.shotEvents.some(
        (event) => event.type === "landing" && event.ball === 0,
      ),
    };
  });
  expect(settled.moving).toBe(false);
  expect(["PLAYER_TURN", "BALL_IN_HAND"]).toContain(settled.state);
  expect(settled.firstPair).toEqual([0, 1]);
  expect(settled.landed).toBe(true);
  expect(settled.height).toBe(0);
  expect(settled.vy).toBe(0);
  expect(settled.jump).toBe(0);
  await expect(page.locator("#jump-toggle")).toHaveAttribute(
    "aria-pressed",
    "false",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page
    .locator("#jump-control")
    .screenshot({ path: "test-results/jump-mobile.png" });
  expect(errors).toEqual([]);
});

test("player cameras follow the correct character, allow aiming and keep actual pocket openings", async ({
  page,
}) => {
  test.setTimeout(60000);
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await offline(page);
  await page.evaluate(() => {
    window.__game.loop.stop();
    window.__game.render(0.016);
  });
  expect(
    await page.evaluate(() => window.__game.scene.playerRenderer.people.length),
  ).toBe(2);
  await page.locator("#player-view").selectOption("first");
  let view = await page.evaluate(() => {
    const s = window.__game.scene;
    s.playerRenderer.people[0].eye.getWorldPosition(s.playerLook);
    return {
      mode: s.view,
      seat: s.followSeat,
      visible: s.playerRenderer.people.map((p) => p.root.visible),
      error: s.camera.position.distanceTo(s.playerLook),
    };
  });
  expect(view).toMatchObject({
    mode: "first",
    seat: 0,
    visible: [false, true],
  });
  expect(view.error).toBeLessThan(1e-6);
  await page.locator("#player-view").selectOption("third");
  expect(
    await page.evaluate(() =>
      window.__game.scene.playerRenderer.people.every((p) => p.root.visible),
    ),
  ).toBe(true);
  expect(
    await page.evaluate(
      () => window.__game.scene.playerRenderer.people[0].label.visible,
    ),
  ).toBe(false);
  await page
    .locator("#scene")
    .screenshot({ path: "test-results/player-third.png" });
  await page.locator("#player-follow").selectOption("opponent");
  expect(await page.evaluate(() => window.__game.scene.followSeat)).toBe(1);
  await page.locator("#player-follow").selectOption("self");
  await page.locator("#player-view").selectOption("first");
  await page.locator("#cue-angle-range").fill("90");
  await page.evaluate(() => window.__game.render(0.016));
  const pose = await page.evaluate(() =>
    window.__game.scene.playerRenderer.states[0].position.toArray(),
  );
  expect(pose[0]).toBeCloseTo(-1.4, 6);
  expect(pose[2]).toBeCloseTo(-2.2, 6);
  await page.locator("#scene").scrollIntoViewIfNeeded();
  const r = await page.locator("#scene").boundingBox();
  const before = await page.evaluate(() => window.__game.angle);
  await page.mouse.move(r.x + r.width * 0.45, r.y + r.height * 0.6);
  await page.mouse.down();
  await page.mouse.move(r.x + r.width * 0.45 + 40, r.y + r.height * 0.6);
  await page.mouse.up();
  expect(await page.evaluate(() => window.__game.angle)).toBeGreaterThan(
    before,
  );
  await page.evaluate(() => window.__game.render(0.016));
  const angle = await page.evaluate(() => window.__game.angle);
  await page.evaluate(() => window.__game.scene.orbit(40, 10));
  expect(await page.evaluate(() => window.__game.scene.view)).toBe("first");
  expect(await page.evaluate(() => window.__game.angle)).toBe(angle);
  await page.locator("#center-player-view").click();
  expect(await page.evaluate(() => window.__game.scene.playerYaw)).toBe(0);
  await page
    .locator("#scene")
    .screenshot({ path: "test-results/player-first.png" });
  const eye = await page.evaluate(() =>
    window.__game.scene.camera.position.toArray(),
  );
  await page.locator("#shoot").click();
  expect(await page.evaluate(() => window.__game.state)).toBe(
    "SHOT_IN_PROGRESS",
  );
  await page.evaluate(() => {
    const g = window.__game;
    for (let i = 0; i < 15; i++) g.fixedUpdate(1 / 240);
    g.render(0.016);
  });
  expect(
    await page.evaluate(() => window.__game.scene.camera.position.toArray()),
  ).toEqual(eye);
  await page.locator("#player-view").selectOption("top");
  const pockets = await page.evaluate(() => {
    const s = window.__game.scene,
      ray = s.raycaster;
    const base = s.table.poolBed.children[0],
      cloth = s.table.poolBed.children[1];
    s.table.group.updateWorldMatrix(true, true);
    const points = [
      [-2.8, -1.4],
      [0, -1.4],
      [2.8, -1.4],
      [-2.8, 1.4],
      [0, 1.4],
      [2.8, 1.4],
    ];
    return points.map(([x, z]) => {
      ray.set(
        s.camera.position.clone().set(x, 1, z),
        s.camera.position.clone().set(0, -1, 0),
      );
      return [
        ray.intersectObject(base).length,
        ray.intersectObject(cloth).length,
      ];
    });
  });
  expect(pockets).toEqual(Array.from({ length: 6 }, () => [0, 0]));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator("#player-view").selectOption("third");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.locator("#player-follow").selectOption("opponent");
  expect(await page.evaluate(() => window.__game.scene.followSeat)).toBe(1);
  expect(errors).toEqual([]);
});
