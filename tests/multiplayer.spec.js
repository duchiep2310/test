import { test, expect } from "@playwright/test";

async function browserSeat(browser, name, path = "/") {
  const context = await browser.newContext({
      viewport: { width: 1100, height: 900 },
    }),
    page = await context.newPage();
  await page.addInitScript(() =>
    localStorage.setItem("velvet-settings", JSON.stringify({ quality: "low" })),
  );
  await page.goto(path);
  await page.locator("#room-name").fill(name);
  return { context, page };
}

test("lobby offers room creation, ID entry, spectators and offline AI on desktop and mobile", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Hẹn nhau ở bàn bi." }),
  ).toBeVisible();
  await expect(page.locator("#create-room")).toBeVisible();
  await expect(page.locator("#room-code")).toBeVisible();
  await expect(page.locator("#play-ai")).toBeVisible();
  await page.screenshot({
    path: "test-results/lobby-desktop.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: "test-results/lobby-mobile.png",
    fullPage: true,
  });
  await page.locator("#ai-mode").selectOption("three");
  await page.locator("#lobby-difficulty").selectOption("hard");
  await page.locator("#play-ai").click();
  await expect(page.locator("#room-lobby")).toBeHidden();
  expect(await page.evaluate(() => window.__game.settings.opponent)).toBe("ai");
  expect(await page.evaluate(() => window.__game.mode.id)).toBe("three");
  await expect(page.locator("#shoot")).toBeEnabled();
  await page.locator("#nav-play").click();
  await expect(page.locator("#room-lobby")).toBeVisible();
  await page.evaluate(() => document.activeElement.blur());
  const before = await page.evaluate(() => ({
    state: window.__game.state,
    shots: window.__game.shots,
  }));
  await page.keyboard.press("Space");
  await page.keyboard.press("Escape");
  expect(
    await page.evaluate(() => ({
      state: window.__game.state,
      shots: window.__game.shots,
    })),
  ).toEqual(before);
  expect(errors).toEqual([]);
});

test("two browsers play the same match, several spectators watch, reconnect and seat promotion work", async ({
  browser,
}) => {
  test.setTimeout(90000);
  const clients = [];
  const errors = [];
  try {
    const host = await browserSeat(browser, "Hiệp");
    clients.push(host);
    host.page.on("pageerror", (e) => errors.push(e.message));
    await host.page.locator("#create-room").click();
    await expect(host.page.locator("#online-room")).toBeVisible({
      timeout: 15000,
    });
    const id = await host.page.locator("#current-room-code").textContent();
    expect(id).toMatch(/^[A-HJ-NP-Z2-9]{6}$/);
    await expect(host.page.locator("#shoot")).toBeDisabled();
    const guest = await browserSeat(browser, "Linh");
    clients.push(guest);
    guest.page.on("pageerror", (e) => errors.push(e.message));
    await guest.page.locator("#room-code").fill(id);
    await guest.page.locator("[data-role=player]").click();
    await host.page.waitForFunction(() => window.__game.online?.info?.ready);
    await expect(host.page.locator("#shoot")).toBeEnabled();
    await expect(guest.page.locator("#shoot")).toBeDisabled();
    const watcher = await browserSeat(
      browser,
      "Khán giả 1",
      "/?room=" + id + "&watch=1",
    );
    clients.push(watcher);
    watcher.page.on("pageerror", (e) => errors.push(e.message));
    await watcher.page.locator("[data-role=spectator]").click();
    const watcher2 = await browserSeat(browser, "Khán giả 2");
    clients.push(watcher2);
    watcher2.page.on("pageerror", (e) => errors.push(e.message));
    await watcher2.page.locator("#room-code").fill(id);
    await watcher2.page.locator("[data-role=player]").click();
    await expect(watcher2.page.locator("#room-role")).toHaveText(
      "Bạn đang xem trận đấu",
    );
    await expect(watcher.page.locator("#spectator-count")).toHaveText("2");
    expect(
      await watcher.page.evaluate(() => window.__game.online.seat),
    ).toBeNull();
    await expect(watcher.page.locator("#pause")).toBeDisabled();
    await host.page.locator("#rename-in-room").click();
    await host.page.locator("#name-first").fill("Hiệp Nguyễn");
    await host.page.locator("#names-form button[type=submit]").click();
    await expect(guest.page.locator("#player-cards")).toContainText(
      "Hiệp Nguyễn",
    );
    await expect(watcher.page.locator("#player-cards")).toContainText(
      "Hiệp Nguyễn",
    );
    await host.page.locator("#shoot").click();
    for (const client of [guest, watcher, watcher2])
      await client.page.waitForFunction(
        () => window.__game.online?.info?.shots === 1,
      );
    await watcher.page.waitForFunction(
      () => window.__game.online?.info?.state === "SHOT_IN_PROGRESS",
    );
    await host.page.waitForFunction(
      () =>
        window.__game.online?.info?.shots === 1 &&
        !["SHOT_IN_PROGRESS", "BALLS_SETTLING"].includes(window.__game.state),
    );
    await guest.page.waitForFunction(
      () => window.__game.state === "PLAYER_TURN",
    );
    await watcher.page.waitForFunction(
      () => window.__game.state === "PLAYER_TURN",
    );
    const a = await host.page.evaluate(() =>
      window.__game.physics.balls.map((b) => [b.id, b.x, b.z, b.active]),
    );
    for (const client of [guest, watcher, watcher2])
      expect(
        await client.page.evaluate(() =>
          window.__game.physics.balls.map((b) => [b.id, b.x, b.z, b.active]),
        ),
      ).toEqual(a);
    await expect(guest.page.locator("#shoot")).toBeEnabled();
    const matchId = await host.page.evaluate(
      () => window.__game.online.info.matchId,
    );
    await watcher.page.screenshot({
      path: "test-results/online-spectator.png",
      fullPage: true,
    });
    await host.page.reload();
    await expect(host.page.locator("#online-room")).toBeVisible({
      timeout: 15000,
    });
    await host.page.waitForFunction(
      () =>
        window.__game.online?.connected && window.__game.online?.info?.ready,
    );
    expect(await host.page.evaluate(() => window.__game.online.seat)).toBe(0);
    expect(
      await host.page.evaluate(() => window.__game.online.info.matchId),
    ).toBe(matchId);
    expect(await host.page.evaluate(() => window.__game.shots)).toBe(1);
    expect(await host.page.evaluate(() => window.__game.online.name)).toBe(
      "Hiệp Nguyễn",
    );
    host.page.once("dialog", (d) => d.accept());
    await host.page.locator("#leave-room").click();
    await expect(host.page.locator("#room-lobby")).toBeVisible();
    await expect(watcher.page.locator("#claim-seat")).toBeVisible();
    await watcher.page.locator("#claim-seat").click();
    await watcher.page.waitForFunction(
      () => window.__game.online.seat === 0 && window.__game.online.info.ready,
    );
    expect(await watcher.page.evaluate(() => window.__game.shots)).toBe(0);
    await expect(watcher.page.locator("#shoot")).toBeVisible();
    expect(
      await watcher2.page.evaluate(() => window.__game.online.seat),
    ).toBeNull();
    expect(errors).toEqual([]);
  } finally {
    for (const client of clients) await client.context.close();
  }
});

test("invalid room shows useful error and AI remains playable without joining", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator("#room-code").fill("ZZZZZZ");
  await page.locator("[data-role=player]").click();
  await expect(page.locator("#lobby-feedback")).toContainText(
    "Không tìm thấy phòng",
  );
  await expect(page.locator("#create-room")).toBeEnabled();
  await page.locator("#play-ai").click();
  await expect(page.locator("#room-lobby")).toBeHidden();
  expect(await page.evaluate(() => window.__game.online)).toBeUndefined();
  await expect(page.locator("#shoot")).toBeEnabled();
});

test("player names work offline, persist and support both local seats", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator("#edit-player-names").click();
  await page.locator("#name-first").fill("Nguyễn An");
  await page.locator("#names-form button[type=submit]").click();
  await page.locator("#play-local").click();
  await expect(page.locator("#player-cards")).toContainText("Nguyễn An");
  await page.locator("#edit-names-at-table").click();
  await page.locator("#name-second").fill("Trần Bình");
  await page.locator("#names-form button[type=submit]").click();
  await expect(page.locator("#player-cards")).toContainText("Trần Bình");
  await page.reload();
  await expect(page.locator("#room-name")).toHaveValue("Nguyễn An");
  await page.locator("#play-local").click();
  await expect(page.locator("#player-cards")).toContainText("Trần Bình");
});

// A private test fixture changes the server's starting balls. No debug endpoint is exposed.
test("shared aim, aggregate scores, rematch and repeat cue placement sync across players and viewers", async ({
  browser,
}) => {
  test.setTimeout(120000);
  const { createRoomServer } = await import("../server/index.js");
  const app = createRoomServer();
  await new Promise((resolve) => app.server.listen(0, "127.0.0.1", resolve));
  const url = "http://127.0.0.1:" + app.server.address().port,
    clients = [],
    errors = [];
  async function join(name) {
    const context = await browser.newContext({
      viewport: { width: 900, height: 750 },
    });
    clients.push(context);
    const page = await context.newPage();
    page.setDefaultTimeout(15000);
    page.on("pageerror", (e) => errors.push(e.message));
    await page.addInitScript(() =>
      localStorage.setItem(
        "velvet-settings",
        JSON.stringify({ quality: "low" }),
      ),
    );
    await page.goto(url);
    await page.locator("#room-name").fill(name);
    return page;
  }
  async function place(page, x, z) {
    await page.locator("canvas").scrollIntoViewIfNeeded();
    const p = await page.evaluate(
      ({ x, z }) => {
        const s = window.__game.scene,
          v = s.camera.position.clone().set(x, 0, z).project(s.camera),
          r = s.canvas.getBoundingClientRect();
        return {
          x: r.left + ((v.x + 1) * r.width) / 2,
          y: r.top + ((1 - v.y) * r.height) / 2,
        };
      },
      { x, z },
    );
    await page.mouse.click(p.x, p.y);
    await page.waitForFunction(
      ({ x, z }) =>
        Math.abs(window.__game.cue.x - x) < 0.001 &&
        Math.abs(window.__game.cue.z - z) < 0.001 &&
        window.__game.state === "PLAYER_TURN",
      { x, z },
    );
  }
  try {
    const a = await join("An");
    await a.locator("#room-mode").selectOption("nine");
    await a.locator("#create-room").click();
    await expect(a.locator("#online-room")).toBeVisible();
    const id = await a.locator("#current-room-code").textContent(),
      room = app.hub.rooms.get(id);
    const b = await join("Bình");
    await b.locator("#room-code").fill(id);
    await b.locator("[data-role=player]").click();
    await a.waitForFunction(() => window.__game.online?.info?.ready);
    const viewer = await join("Khán giả");
    await viewer.locator("#room-code").fill(id);
    await viewer.locator("[data-role=spectator]").click();
    await expect(viewer.locator("#online-room")).toBeVisible();
    await b.locator("#guide-toggle").click();
    for (const p of [a, b, viewer])
      await p.waitForFunction(() => window.__game.settings.aimGuide === false);
    await expect(viewer.locator("#guide-toggle")).toBeDisabled();
    await a.locator("#guide-toggle").click();
    await b.waitForFunction(() => window.__game.settings.aimGuide === true);
    await b.locator("#guide-toggle").click();
    await a.waitForFunction(() => window.__game.settings.aimGuide === false);
    room.match.mode.isBreak = false;
    room.match.physics.setBalls([
      { id: 0, x: 0, z: 0 },
      { id: 9, x: 0, z: -0.7 },
    ]);
    room.match.state = "PLAYER_TURN";
    room.match.revision++;
    room.broadcast();
    await a.waitForFunction(
      () =>
        window.__game.physics.balls.length === 2 && !window.__game.mode.isBreak,
    );
    await a.evaluate(() => {
      const g = window.__game;
      g.angle = -Math.PI / 2;
      g.power = 0.38;
      g.notify();
    });
    await a.locator("#shoot").click();
    await a.waitForFunction(() => window.__game.state === "GAME_OVER");
    for (const p of [a, b, viewer]) {
      await expect(p.locator("#series-values")).toHaveText("1 — 0");
      await expect(p.locator(".result-series")).toContainText("1 — 0");
    }
    await a.locator("#result-replay").click();
    await b.locator("#result-replay").click();
    await a.waitForFunction(() => window.__game.state === "BREAK_SHOT");
    await expect(viewer.locator("#modal")).not.toBeVisible();
    for (const p of [a, b, viewer]) {
      await expect(p.locator("#series-values")).toHaveText("1 — 0");
      expect(await p.evaluate(() => window.__game.settings.aimGuide)).toBe(
        false,
      );
    }
    room.match.mode.isBreak = false;
    room.match.physics.setBalls([
      { id: 0, x: 0, z: 0 },
      { id: 1, x: 1, z: 0 },
      { id: 9, x: 1.6, z: 0 },
    ]);
    room.match.state = "PLAYER_TURN";
    room.match.revision++;
    room.broadcast();
    await a.waitForFunction(
      () =>
        window.__game.physics.balls.length === 3 && !window.__game.mode.isBreak,
    );
    await a.evaluate(() => {
      const g = window.__game;
      g.angle = -Math.PI / 2;
      g.power = 0.5;
      g.notify();
    });
    await a.locator("#shoot").click();
    await b.waitForFunction(() => window.__game.state === "BALL_IN_HAND");
    await place(b, -1, 0.4);
    await expect(b.locator("#reposition-cue")).toBeVisible();
    await expect(a.locator("#reposition-cue")).not.toBeVisible();
    await b.locator("#reposition-cue").click();
    await b.waitForFunction(() => window.__game.state === "BALL_IN_HAND");
    await place(b, -1.8, -0.5);
    for (const p of [a, viewer])
      await p.waitForFunction(
        () =>
          Math.abs(window.__game.cue.x + 1.8) < 0.001 &&
          Math.abs(window.__game.cue.z + 0.5) < 0.001,
      );
    await b.evaluate(() => {
      const g = window.__game;
      g.angle = Math.atan2(0.5, 2.8);
      g.power = 0.5;
      g.notify();
    });
    await b.locator("#shoot").click();
    await b.waitForFunction(() => window.__game.state === "SHOT_IN_PROGRESS");
    expect(room.match.placementAllowed).toBe(false);
    await expect(b.locator("#reposition-cue")).not.toBeVisible();
    expect(errors).toEqual([]);
  } finally {
    for (const c of clients) await c.close();
    await app.close();
  }
});
