// node render.cjs -> eves-sisters-early-access-feed.png (1080x1350) and -story.png (1080x1920)
const { chromium } = require("playwright");
const path = require("path");
(async () => {
  const browser = await chromium.launch();
  for (const [id, height] of [["feed", 1350], ["story", 1920]]) {
    const page = await browser.newPage({ viewport: { width: 1080, height } });
    await page.goto("file://" + path.join(__dirname, "post.html") + "?only=" + id, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.locator("#" + id).screenshot({ path: path.join(__dirname, `eves-sisters-early-access-${id}.png`) });
  }
  await browser.close();
})();
