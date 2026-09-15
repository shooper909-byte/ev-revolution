import { mkdir, writeFile } from "node:fs/promises";
const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE || "playwright-core"
);
const browser = await chromium.launch({
  executablePath:
    process.env.BROWSER_PATH ||
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  headless: true,
});
const page = await browser.newPage();
page.setDefaultTimeout(60000);
const result = { layouts: [], links: [], errors: [] };
page.on("pageerror", (e) => result.errors.push(e.message));
page.on("console", (m) => {
  if (m.type() === "error") result.errors.push(m.text());
});
const base = "http://127.0.0.1:9402";
await mkdir("qa/screenshots", { recursive: true });
try {
  for (const width of [1440, 1280, 1024, 768, 430, 390, 375]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(base + "/about", { waitUntil: "networkidle" });
    for (const photo of await page.locator("main img").all())
      await photo.scrollIntoViewIfNeeded();
    await page.waitForFunction(() =>
      [...document.querySelectorAll("main img")].every(
        (i) => i.complete && i.naturalWidth,
      ),
    );
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    const state = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth,
      h1: document.querySelectorAll("h1").length,
      title: document.title,
      images: [...document.querySelectorAll("main img")].map((i) => ({
        alt: i.alt,
        loaded: i.complete && i.naturalWidth > 0,
      })),
      activeAbout: !!document.querySelector(
        'header a[href="/about"][aria-current="page"]',
      ),
    }));
    await page.screenshot({
      path: `qa/screenshots/about-${width}.png`,
      fullPage: true,
    });
    if (width < 768) {
      await page.getByRole("button", { name: "Open menu" }).focus();
      await page.keyboard.press("Enter");
      state.menu = await page.locator("#mobile-nav").isVisible();
      await page.screenshot({ path: `qa/screenshots/menu-${width}.png` });
      await page.keyboard.press("Escape");
      state.closed = !(await page.locator("#mobile-nav").isVisible());
    } else {
      await page.locator("summary").focus();
      await page.keyboard.press("Enter");
      state.care =
        (await page.locator("details").getAttribute("open")) !== null;
      await page.keyboard.press("Enter");
    }
    result.layouts.push({ width, ...state });
    console.log("Width", width, JSON.stringify(state));
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base + "/about", { waitUntil: "networkidle" });
  const links = await page
    .locator("main a,header a")
    .evaluateAll((es) => [...new Set(es.map((e) => e.getAttribute("href")))]);
  for (const href of links) {
    const response = await page.request.get(base + href);
    result.links.push({ href, status: response.status() });
  }
  await page.goto(base, { waitUntil: "networkidle" });
  await page.screenshot({
    path: "qa/screenshots/home-regression.png",
    fullPage: true,
  });
  result.home = {
    title: await page.title(),
    h1: await page.locator("h1").count(),
  };
  await writeFile("qa/results.json", JSON.stringify(result, null, 2));
  if (
    result.errors.length ||
    result.layouts.some(
      (r) =>
        r.overflow ||
        r.h1 !== 1 ||
        !r.activeAbout ||
        r.menu === false ||
        r.closed === false ||
        r.care === false,
    ) ||
    result.links.some((r) => r.status !== 200)
  )
    process.exitCode = 1;
  console.log(
    JSON.stringify({
      links: result.links,
      errors: result.errors,
      home: result.home,
    }),
  );
} finally {
  await browser.close();
}
