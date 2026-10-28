// Renders commercial.html frame by frame and encodes it with ffmpeg.
//   node render.cjs                 -> out/mrs-collection-commercial.mp4
//   node render.cjs --stills 2,6,10 -> out/still-<t>.png only
const { chromium } = require("playwright");
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const FPS = 30;
const dir = __dirname;
const outDir = path.join(dir, "out");
fs.mkdirSync(outDir, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  await page.goto("file://" + path.join(dir, "commercial.html") + "?render", { waitUntil: "networkidle" });
  await page.evaluate(() => window.ready);
  const duration = await page.evaluate(() => window.DURATION);

  const stillsArg = process.argv.indexOf("--stills");
  if (stillsArg > -1) {
    for (const t of process.argv[stillsArg + 1].split(",").map(Number)) {
      await page.evaluate((t) => window.render(t), t);
      await page.screenshot({ path: path.join(outDir, `still-${t}.png`) });
    }
    await browser.close();
    return;
  }

  const silent = path.join(outDir, "video-silent.mp4");
  const ff = spawn("ffmpeg", [
    "-loglevel", "error", "-y", "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "mjpeg", "-i", "-",
    "-c:v", "libx264", "-preset", "slow", "-crf", "18", "-pix_fmt", "yuv420p", "-movflags", "+faststart", silent,
  ], { stdio: ["pipe", "inherit", "inherit"] });

  const frames = Math.round(duration * FPS);
  for (let f = 0; f < frames; f++) {
    await page.evaluate((t) => window.render(t), f / FPS);
    const buf = await page.screenshot({ type: "jpeg", quality: 95 });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r));
    if (f % 90 === 0) process.stdout.write(`frame ${f}/${frames}\n`);
  }
  ff.stdin.end();
  await new Promise((r) => ff.on("close", r));
  await browser.close();
  console.log("wrote", silent);
})();
