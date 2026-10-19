import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { chromium } from "@playwright/test";

const PKG_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BASE = process.env.CAPTURE_BASE_URL ?? "http://localhost:3000";
const OUT = path.resolve(PKG_ROOT, process.env.CAPTURE_OUT ?? "../../docs/media");
const RAW = fs.mkdtempSync(path.join(os.tmpdir(), "mylord-capture-"));

const shots = [];
const step = (name) => {
  shots.push(name);
  console.log(`step ${shots.length}: ${name}`);
};

fs.mkdirSync(OUT, { recursive: true });

const probe = await fetch(BASE, { redirect: "follow" });
if (!probe.ok) {
  throw new Error(`${BASE} responded ${probe.status}; start the demo-mode server first`);
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
  recordVideo: { dir: RAW, size: { width: 1440, height: 900 } },
});
const page = await context.newPage();
page.setDefaultTimeout(20000);

const shot = async (name) => {
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(OUT, `${name}.png`) });
  step(name);
};

const settled = async () => {
  await page.waitForSelector('[data-testid="message-item"]', { state: "visible" });
  await page.waitForTimeout(400);
};

const park = async () => {
  await page.mouse.move(4, 4);
  await page.waitForTimeout(200);
};

try {
  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  await page.waitForSelector('[data-testid="channel-item"]');
  await settled();
  await shot("01-chat");

  const composer = page.getByTestId("composer-input");
  await composer.fill("Shipping the new composer today");
  await page.waitForTimeout(300);
  await shot("02-typing");
  await page.getByTestId("composer-send").click();
  await page.getByText("Shipping the new composer today").first().waitFor({ state: "visible" });
  await shot("03-message-sent");

  const own = page.getByTestId("message-item").last();
  await own.hover();
  const ownEdit = own.getByTestId("message-edit");
  await ownEdit.waitFor({ state: "visible" });
  await shot("04-hover-actions");
  await ownEdit.click();
  await own.getByTestId("message-edit-input").waitFor({ state: "visible" });
  await shot("05-editing");
  await own.getByTestId("message-edit-save").click();
  await page.getByText("(edited)").first().waitFor({ state: "visible" });
  await park();
  await shot("06-edited");

  await page.getByRole("button", { name: "Create server" }).click();
  await page.waitForSelector("text=Create Server");
  await shot("07-create-server");
  await page.getByPlaceholder("Server name").fill("Design Guild");
  await page.getByRole("button", { name: "Create", exact: true }).click();
  await page.waitForSelector('[data-testid="server-item"][data-server="Design Guild"]');
  await park();
  await shot("08-server-created");

  await page.getByRole("button", { name: "+" }).first().click();
  await page.waitForSelector("text=Create channel");
  await shot("09-create-channel");
  await page.getByPlaceholder("channel name").fill("release-notes");
  await page.getByRole("button", { name: "Create", exact: true }).click();
  await page.waitForSelector('[data-testid="channel-item"][data-channel="release-notes"]');
  await park();
  await shot("10-channel-created");

  const channels = page.getByTestId("channel-item");
  await channels.nth(1).click();
  await page.waitForSelector('[data-testid="channel-header"][data-channel="random"]');
  await settled();
  await park();
  await shot("11-channel-switched");

  await page.getByTestId("channel-item").first().click();
  await page.waitForSelector('[data-testid="channel-header"][data-channel="general"]');
  await settled();
  await page.emulateMedia({ colorScheme: "dark" });
  await page.waitForTimeout(600);
  await park();
  await shot("12-dark-mode");
  await page.emulateMedia({ colorScheme: "light" });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(700);
  await shot("13-mobile");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.waitForTimeout(600);
  await shot("14-mobile-drawer");
  await page.getByRole("button", { name: "Close navigation" }).click();

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(500);
} finally {
  await page.close();
  await context.close();
  await browser.close();
}

try {
  const webm = fs
    .readdirSync(RAW)
    .map((f) => path.join(RAW, f))
    .find((f) => f.endsWith(".webm"));
  if (!webm) throw new Error("no video recorded");

  const mp4 = path.join(OUT, "walkthrough.mp4");
  execFileSync("ffmpeg", [
    "-hide_banner",
    "-loglevel",
    "error",
    "-y",
    "-i",
    webm,
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    "-crf",
    "26",
    "-movflags",
    "+faststart",
    mp4,
  ]);

  const gif = path.join(OUT, "walkthrough.gif");
  execFileSync("ffmpeg", [
    "-hide_banner",
    "-loglevel",
    "error",
    "-y",
    "-i",
    mp4,
    "-vf",
    "fps=15,scale=900:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=192[p];[b][p]paletteuse=dither=bayer:bayer_scale=4",
    gif,
  ]);

  console.log(`captured ${shots.length} stills, walkthrough.mp4, walkthrough.gif`);
} finally {
  fs.rmSync(RAW, { recursive: true, force: true });
}
