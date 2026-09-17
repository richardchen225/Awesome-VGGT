import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalog = JSON.parse(fs.readFileSync(path.join(root, "data", "papers.json"), "utf8"));
const resourcesPath = path.join(root, "data", "resources.json");
const resources = fs.existsSync(resourcesPath)
  ? JSON.parse(fs.readFileSync(resourcesPath, "utf8"))
  : {};

function arxivId(url = "") {
  return url.match(/arxiv\.org\/(?:abs|pdf)\/([0-9]{4}\.[0-9]{4,5})/i)?.[1] || "";
}

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"');
}

function linksFrom(html) {
  return [...html.matchAll(/href=["'](https?:\/\/[^"']+)["']/gi)].map((match) => decodeHtml(match[1]));
}

function classifyAuthorLink(url) {
  try {
    const hostname = new URL(url).hostname.toLowerCase().replace(/^www\./, "");
    if (hostname === "github.com" || hostname === "gitlab.com") return "code";
    if (hostname.endsWith(".github.io") || hostname.endsWith(".gitlab.io")) return "project";
  } catch {
    return "";
  }
  return "";
}

function isTemplateRepository(url) {
  return /github\.com\/(?:nerfies\/nerfies\.github\.io)(?:\/|$)/i.test(url);
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: { "User-Agent": "awesome-vggt-resource-audit/0.1 (academic catalog)" },
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return response.text();
}

async function isReachable(url) {
  try {
    const response = await fetch(url, {
      redirect: "follow",
      headers: { "User-Agent": "awesome-vggt-resource-audit/0.1 (academic catalog)" },
    });
    return response.ok;
  } catch {
    return false;
  }
}

async function inspectPaper(paper) {
  const id = arxivId(paper.paper);
  if (!id) return [];
  const html = await fetchText(`https://arxiv.org/abs/${id}`);
  const abstract = html.match(/<blockquote[^>]*class=["'][^"']*abstract[^"']*["'][^>]*>([\s\S]*?)<\/blockquote>/i)?.[1] || "";
  const candidates = linksFrom(abstract)
    .map((url) => ({ type: classifyAuthorLink(url), url: url.replace(/[.,;]+$/, "") }))
    .filter((item) => item.type);
  const reachable = await Promise.all(candidates.map((item) => isReachable(item.url)));
  return candidates.filter((_, index) => reachable[index]);
}

async function codeFromProject(projectUrl) {
  const html = await fetchText(projectUrl);
  const anchors = [...html.matchAll(/<a\b[^>]*href=["'](https?:\/\/(?:www\.)?(?:github\.com|gitlab\.com)\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)];
  const candidates = anchors
    .map((match) => ({
      url: decodeHtml(match[1]).replace(/[?#].*$/, "").replace(/\/$/, ""),
      label: match[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
    }))
    .filter((item) => /code|github|source|repository/i.test(item.label))
    .filter((item) => !isTemplateRepository(item.url));
  return candidates[0]?.url || "";
}

const papers = [...new Map(catalog.papers.map((paper) => [paper.key, paper])).values()];
let cursor = 0;
let discovered = 0;
const failures = [];

async function worker() {
  while (cursor < papers.length) {
    const paper = papers[cursor++];
    try {
      const links = await inspectPaper(paper);
      const entry = { ...(resources[paper.key] || {}) };
      for (const { type, url } of links) {
        if (!entry[type]) entry[type] = url;
      }
      if (entry.project && !entry.code) {
        entry.code = await codeFromProject(entry.project);
        if (!entry.code) delete entry.code;
      }
      if (Object.keys(entry).length && JSON.stringify(entry) !== JSON.stringify(resources[paper.key] || {})) {
        resources[paper.key] = entry;
        discovered += 1;
      }
    } catch (error) {
      failures.push(`${paper.key}: ${error.message}`);
    }
  }
}

await Promise.all(Array.from({ length: 6 }, () => worker()));
const ordered = Object.fromEntries(Object.entries(resources).sort(([left], [right]) => left.localeCompare(right)));
fs.writeFileSync(resourcesPath, `${JSON.stringify(ordered, null, 2)}\n`);

console.log(`Resource audit complete: ${discovered} records updated, ${failures.length} requests failed.`);
if (failures.length) console.log(failures.join("\n"));
