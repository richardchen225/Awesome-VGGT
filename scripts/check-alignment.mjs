import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createHash } from "node:crypto";
import { surveyRoot, readSource, parseBibtex, extractCitations, cleanLatex, surveyMetadata } from "./survey-source.mjs";

const site = path.join(surveyRoot, "vggt-survey-website");
const repo = path.join(surveyRoot, "awesome-vggt");
const context = { window: {} };
for (const name of ["survey", "catalog", "datasets", "evaluation"]) {
  vm.runInNewContext(fs.readFileSync(path.join(site, `data/${name}.js`), "utf8"), context);
}
const data = JSON.parse(JSON.stringify(context.window));
const catalog = JSON.parse(fs.readFileSync(path.join(repo, "data/papers.json"), "utf8"));
assert.deepEqual(data.VGGT_CATALOG, catalog, "Website and repository catalogs differ");
assert.deepEqual(data.VGGT_SURVEY, surveyMetadata(), "Manuscript metadata is stale");
const bib = parseBibtex(readSource("survey_refs.bib"));
const exported = parseBibtex(fs.readFileSync(path.join(repo, "data/papers.bib"), "utf8"));
for (const [branch, filename] of [["strengthening", "strengthening"], ["reuse", "reuse"]]) {
  const source = readSource(`tab/${filename}.tex`);
  const categories = catalog.categories.filter((c) => c.branch === branch);
  assert.deepEqual(categories.flatMap((c) => c.papers.map((p) => p.key)), extractCitations(source));
  const headings = [...source.matchAll(/\\tabitem\s*(?:\\textbf\{\([ivx]+\)\}\s*)?\\textbf\{([^}]+):\}/g)].map((m) => cleanLatex(m[1]));
  assert.deepEqual(categories.flatMap((c) => c.subgroups.map((s) => s.title)), headings);
}
for (const paper of catalog.papers) {
  assert.equal(exported.get(paper.key)?.raw, bib.get(paper.key)?.raw, `Stale BibTeX: ${paper.key}`);
  assert.equal(paper.title, cleanLatex(bib.get(paper.key).title));
}

const rows = readSource("tab/benchmark_coverage.tex").split(/\r?\n/).filter((s) => s.includes("\\cite{") && s.includes(" & "));
assert.equal(rows.length, data.VGGT_DATASETS.length);
rows.forEach((row, index) => {
  const cells = row.replace(/\\\\\s*$/, "").split(/(?<!\\)&/).map((s) => s.trim());
  const dataset = data.VGGT_DATASETS[index];
  assert.equal(dataset.citation, extractCitations(cells[0])[0]);
  assert.equal(dataset.name, cleanLatex(cells[0].replace(/\\rowcolor\{[^}]*\}\s*/g, "")));
  assert.equal(dataset.scale, cleanLatex(cells[1]).replace(/^[–—]/, "-"));
  assert.deepEqual(dataset.tasks, data.VGGT_COVERAGE.tasks.filter((_, i) => cells[i + 4] === "\\cmark").map((t) => t.id));
});
for (const group of data.VGGT_COVERAGE.groups) {
  const collection = data.VGGT_DATASETS.filter((d) => d.role === group.id);
  assert.equal(collection.length, group.count);
  for (const cell of group.cells) {
    assert.equal(cell.count, collection.filter((d) => d.tasks.includes(cell.task)).length);
    assert.equal(cell.percentage, Math.round(cell.count / group.count * 100));
  }
}
for (const [index, filename] of ["strengthening_eval", "reuse_eval"].entries()) {
  const table = data.VGGT_EVALUATION[index];
  const source = readSource(`tab/${filename}.tex`);
  const expected = [...source.matchAll(/\\multicolumn\{4\}\{l\}.*\\textbf\{([^}]+)\}/g)].map((m) => cleanLatex(m[1]));
  assert.deepEqual(table.sections.map((s) => s.title), expected);
  assert.deepEqual([...new Set(table.sections.flatMap((s) => s.rows.flatMap((r) => r.citations)))], extractCitations(source));
  assert.ok(table.sections.every((s) => s.rows.length > 0));
}

const hashes = JSON.parse(fs.readFileSync(path.join(site, "assets/sources.json"), "utf8"));
const hash = (file) => createHash("sha256").update(fs.readFileSync(file)).digest("hex");
for (const [name, record] of Object.entries(hashes)) {
  assert.equal(hash(path.join(surveyRoot, record.source)), record.sha256, `Stale source: ${name}`);
  assert.equal(hash(path.join(site, "assets", name === "paper" ? "survey_acmcsur.pdf" : `${name}.pdf`)), record.sha256, `Stale PDF: ${name}`);
}
const html = fs.readFileSync(path.join(site, "index.html"), "utf8");
const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
for (const [, url] of html.matchAll(/\b(?:src|href)="([^"]+)"/g)) {
  if (url.startsWith("#")) assert.ok(ids.has(url.slice(1)), `Missing anchor ${url}`);
  else if (!/^(https?:|mailto:)/.test(url)) assert.ok(fs.existsSync(path.resolve(site, url)), `Missing local resource ${url}`);
}
assert.ok(!/survey_tpami|geometry-grounded latent|structured geometric readouts|established protocols|explicit–latent–hybrid/i.test(html));
console.log(`Alignment check passed: ${catalog.papers.length} methods, ${data.VGGT_DATASETS.length} datasets, Tables 1–6, authors, abstract, local links, and current PDF/figure hashes.`);
