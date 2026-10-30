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
  test.setTimeout(60000);
  const clients = [];
  const errors = [];
  try {
    const host = await browserSeat(browser, "Hiệp");
    clients.push(host);
    host.page.on("pageerror", (e) => errors.push(e.message));
    await host.page.locator("#create-room").click();
    await expect(host.page.locator("#online-room")).toBeVisible();
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
    await expect(host.page.locator("#online-room")).toBeVisible();
    await host.page.waitForFunction(
      () =>
        window.__game.online?.connected && window.__game.online?.info?.ready,
    );
    expect(await host.page.evaluate(() => window.__game.online.seat)).toBe(0);
    expect(
      await host.page.evaluate(() => window.__game.online.info.matchId),
    ).toBe(matchId);
    expect(await host.page.evaluate(() => window.__game.shots)).toBe(1);
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
