import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalogPath = path.join(root, "data", "papers.json");
if (!fs.existsSync(catalogPath)) throw new Error("Run npm run build before checking the catalog.");

const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
const errors = [];
const categoryIds = new Set(catalog.categories.map((category) => category.id));

for (const paper of catalog.papers) {
  if (!paper.title || !paper.key) errors.push(`Missing title/key: ${JSON.stringify(paper)}`);
  if (!categoryIds.has(paper.category)) errors.push(`Unknown category for ${paper.key}`);
  for (const resource of ["paper", "code", "project"]) {
    const url = paper[resource];
    if (url && !/^https?:\/\//.test(url)) errors.push(`Invalid ${resource} URL for ${paper.key}: ${url}`);
  }
  if (!paper.paper) errors.push(`Missing paper URL for ${paper.key}`);
  if (paper.code && !/^https?:\/\/(www\.)?(github\.com|gitlab\.com)\//.test(paper.code)) {
    errors.push(`Code URL is not a GitHub/GitLab repository for ${paper.key}: ${paper.code}`);
  }
  if (paper.project && /arxiv\.org|doi\.org|openreview\.net|openaccess\.thecvf\.com/.test(paper.project)) {
    errors.push(`Publication URL assigned as project page for ${paper.key}: ${paper.project}`);
  }
  const assigned = [paper.paper, paper.code, paper.project].filter(Boolean);
  if (new Set(assigned).size !== assigned.length) errors.push(`Duplicate resource URL for ${paper.key}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

const counts = Object.fromEntries(
  ["paper", "code", "project"].map((resource) => [
    resource,
    catalog.papers.filter((paper) => paper[resource]).length,
  ]),
);
console.log(
  `Catalog check passed: ${catalog.categories.length} categories, ${catalog.papers.length} records; ` +
    `${counts.paper} paper, ${counts.code} code, ${counts.project} project-page links.`,
);
