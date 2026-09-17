import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { chromium } from "playwright";
import { surveyRoot } from "./survey-source.mjs";

const site = path.join(surveyRoot, "vggt-survey-website");
const screenshots = path.join(site, ".screenshots");
fs.mkdirSync(screenshots, { recursive: true });
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".pdf": "application/pdf" };
const server = http.createServer((req, res) => {
  let file = path.resolve(surveyRoot, "." + decodeURIComponent(new URL(req.url, "http://localhost").pathname));
  if (!file.startsWith(surveyRoot + path.sep)) { res.writeHead(403).end(); return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
  if (!fs.existsSync(file)) { res.writeHead(404).end(); return; }
  res.setHeader("Content-Type", (types[path.extname(file)] || "text/plain") + (/[.](html|js|css)$/.test(file) ? "; charset=utf-8" : ""));
  fs.createReadStream(file).pipe(res);
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const address = `http://127.0.0.1:${server.address().port}/vggt-survey-website/`;
let browser;
try {
  browser = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  await page.goto(address, { waitUntil: "networkidle" });
  assert.equal(await page.locator("#survey-authors a").count(), 8);
  assert.equal(await page.locator(".paper-item").count(), 30);
  assert.equal(await page.locator("#dataset-table-body tr").count(), 71);
  assert.equal(await page.locator(".coverage-table tbody tr").count(), 3);
  assert.ok(await page.locator("img").evaluateAll((images) => images.every((image) => image.complete && image.naturalWidth > 0)));
  await page.screenshot({ path: path.join(screenshots, "desktop-top.png") });
  for (const [query, expectedTitle] of [
    ["StreamVGGT", "Streaming 4D Visual Geometry Transformer"],
    ["DA-VGGT", "Diversity-Aware View Partitioning for Scalable VGGT"],
    ["da vggt", "Diversity-Aware View Partitioning for Scalable VGGT"],
    ["evggt", "Improving Robotic Manipulation with Efficient Geometry-Aware Vision Encoder"],
    ["OF3GS", "OF³GS: On-the-Fly Feed-Forward 3D Gaussian Splatting from Unposed Images"],
    ["VGG-T3", "VGG-T³: Offline Feed-Forward 3D Reconstruction at Scale"],
  ]) {
    await page.locator("#paper-search").fill(query);
    assert.ok((await page.locator(".paper-title").allTextContents()).includes(expectedTitle), `Missing method for ${query}`);
  }
  await page.locator("#paper-search").fill("");
  await page.locator("#load-more").click();
  assert.equal(await page.locator(".paper-item").count(), 60);
  await page.locator("#paper-search").fill("GEM-4D");
  assert.equal(await page.locator(".paper-item").count(), 1);
  assert.ok((await page.locator(".paper-meta").innerText()).includes("arXiv"));
  await page.locator("#paper-search").fill("no-such-paper-xyz");
  assert.ok(await page.locator("#empty-state").isVisible());
  await page.locator('[data-category-link="semantic"]').click();
  assert.equal(await page.locator("#paper-search").inputValue(), "");
  assert.equal(await page.locator("#category-filter").inputValue(), "semantic");
  assert.ok(await page.locator(".paper-item").count() > 0);
  await page.locator('[data-branch="strengthening"]').click();
  assert.ok((await page.locator("#paper-count").innerText()).includes("63 records"));
  await page.locator('[data-role="nvs"]').click();
  assert.equal(await page.locator("#dataset-table-body tr").count(), 10);
  await page.locator('[data-role="all"]').click();
  await page.locator("#dataset-search").fill("OmniWorld");
  await page.locator("#dataset-task-filter").selectOption("embodied-ai");
  assert.equal(await page.locator("#dataset-table-body tr").count(), 0);
  await page.locator("#dataset-task-filter").selectOption("world-models");
  assert.equal(await page.locator("#dataset-table-body tr").count(), 1);
  await page.locator("#dataset-search").fill("");
  await page.locator("#dataset-task-filter").selectOption("all");
  for (const summary of await page.locator("#evaluation-tables summary").all()) await summary.click();
  assert.equal(await page.locator(".evaluation-group").count(), 10);
  await page.locator("#copy-citation").click();
  await page.waitForFunction(() => /Copied|Selected/.test(document.querySelector("#copy-citation").textContent));
  assert.match(await page.locator("#copy-citation").innerText(), /Copied|Selected/);
  for (const width of [1440, 768, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `Page overflow at width ${width}`);
    const clipped = await page.locator(".benchmark-copy, .coverage-figure, .evaluation-panels details, .filters, .dataset-filters, .citation-band pre").evaluateAll((elements) => elements.filter((element) => element.getBoundingClientRect().right > innerWidth + 1).map((element) => element.className || element.tagName));
    assert.deepEqual(clipped, [], `Clipped content at width ${width}`);
    for (const [name, selector] of [["taxonomy", "#taxonomy"], ["coverage", "#benchmarks"], ["evaluation", "#evaluation-tables"]]) {
      await page.locator(selector).evaluate((element) => element.scrollIntoView({ block: "start", behavior: "instant" }));
      await page.screenshot({ path: path.join(screenshots, `${width}-${name}.png`) });
    }
  }
  assert.deepEqual(errors, []);
  console.log("Browser checks passed: desktop/tablet/mobile, figures, search, filters, pagination, dataset task order, evaluation panels, and citation copy; no page errors or horizontal page overflow.");
} finally {
  await browser?.close();
  server.closeAllConnections();
  await new Promise((resolve) => server.close(resolve));
}
