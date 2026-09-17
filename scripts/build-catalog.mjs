import fs from "node:fs";
import path from "node:path";
import { surveyRoot, readSource, parseBibtex, cleanLatex, extractCitations, surveyMetadata } from "./survey-source.mjs";

const repoRoot = path.join(surveyRoot, "awesome-vggt");
const websiteRoot = path.join(surveyRoot, "vggt-survey-website");
const bib = parseBibtex(readSource("survey_refs.bib"));
const overrides = JSON.parse(fs.readFileSync(path.join(repoRoot, "data/resources.json"), "utf8"));
const extraAliases = JSON.parse(fs.readFileSync(path.join(repoRoot, "data/aliases.json"), "utf8"));
const metadata = surveyMetadata();
const people = JSON.parse(fs.readFileSync(path.join(repoRoot, "data/people.json"), "utf8"));
const definitions = [
  ["diverse-inputs", "strengthening", "Diverse-Input 3D Reconstruction", "Combines optional camera and depth inputs, geometry-aware sensor fusion, and diverse imaging systems."],
  ["efficient-scalable", "strengthening", "Efficient 3D Reconstruction", "Reduces the cost of a forward pass through quantization-based compression and efficient network architecture design."],
  ["robust", "strengthening", "Robust 3D Reconstruction", "Improves reconstruction in adverse environments and rejects distractors and outlier views."],
  ["streaming", "strengthening", "Streaming and Long-Sequence 3D Reconstruction", "Covers causal reconstruction and long-sequence reconstruction, including memory management and scale and coordinate consistency."],
  ["dynamic", "strengthening", "Dynamic 3D Reconstruction", "Covers dynamic geometry and 4D representation, followed by motion-guided geometry correction."],
  ["nvs", "reuse", "Novel View Synthesis", "Covers direct feed-forward 3D Gaussian reconstruction and 3D Gaussian reconstruction initialized by feed-forward geometry."],
  ["slam", "reuse", "SLAM", "Uses geometric state in SLAM systems, visual odometry, and relocalization."],
  ["semantic", "reuse", "Semantic 3D Scene Understanding", "Covers 3D semantic prediction and mapping, and language-based 3D scene reasoning."],
  ["world-models", "reuse", "Geometry-Aware World Models", "Uses geometry for video-depth prediction, video generation, and action prediction or rollout selection."],
  ["embodied", "reuse", "Embodied Action and Planning", "Uses geometric state in action policies, planning and trajectory generation, and geometry-aware VLA models."],
];
const sources = { strengthening: readSource("tab/strengthening.tex"), reuse: readSource("tab/reuse.tex") };
const methodNames = new Map();
for (const source of Object.values(sources)) {
  for (const line of source.split(/\r?\n/)) {
    if (!line.includes("\\tabitem") || !line.includes("\\cite{")) continue;
    const methods = line.replace(/^.*?:\}\s*/, "");
    for (const item of methods.split(/\s+\/\s+/)) {
      const match = item.match(/^(.*?)~\\cite\{([^}]+)\}/);
      if (!match) continue;
      const name = cleanLatex(match[1]);
      for (const key of match[2].split(",").map((key) => key.trim())) {
        methodNames.set(key, [...new Set([...(methodNames.get(key) || []), name])]);
      }
    }
  }
}

function resourcesOf(entry) {
  const links = { paper: "", code: "", project: "" };
  const url = (entry.url || "").replace(/[{}]/g, "");
  if (url) {
    const host = new URL(url).hostname;
    if (/^(www\.)?(github|gitlab)\.com$/.test(host)) links.code = url;
    else if (/arxiv\.org|doi\.org|openreview\.net|openaccess\.thecvf\.com|ieee\.org|acm\.org|springer\.com/.test(host)) links.paper = url;
    else links.project = url;
  }
  if (!links.paper && entry.doi) links.paper = `https://doi.org/${entry.doi}`;
  return { ...links, ...overrides[entry.key] };
}

const categories = definitions.map(([id, branch, title, description], index) => {
  const source = sources[branch];
  const marker = `\\textbf{${title}}`;
  const start = source.indexOf(marker);
  if (start < 0) throw new Error(`Category not found in the current table: ${title}`);
  const next = definitions.slice(index + 1).find((d) => d[1] === branch);
  const end = next ? source.indexOf(`\\textbf{${next[2]}}`, start + marker.length) : source.length;
  if (end < start) throw new Error(`Invalid category boundary: ${title}`);
  const section = source.slice(start, end);
  const headings = [...section.matchAll(/\\tabitem\s*(?:\\textbf\{\([ivx]+\)\}\s*)?\\textbf\{([^}]+):\}/g)];
  const subgroups = headings.map((heading, i) => ({
    title: cleanLatex(heading[1]),
    keys: extractCitations(section.slice(heading.index, headings[i + 1]?.index ?? section.length)),
  }));
  const keys = extractCitations(section);
  if (!subgroups.length || subgroups.flatMap((s) => s.keys).length !== keys.length) throw new Error(`Incomplete subgroup assignment: ${title}`);
  const papers = keys.map((key) => {
    const entry = bib.get(key);
    if (!entry) throw new Error(`Missing BibTeX entry ${key}`);
    const names = methodNames.get(key);
    if (!names?.length || names.some((name) => !name)) throw new Error(`Missing method name for search: ${key}`);
    return {
      key, title: cleanLatex(entry.title), authors: cleanLatex(entry.author).replace(/\s+and\s+/g, ", "),
      aliases: [...new Set([...names, ...(extraAliases[key] || [])])],
      year: Number(entry.year), venue: cleanLatex(entry.booktitle || entry.journal || "Preprint"),
      subgroup: subgroups.find((s) => s.keys.includes(key)).title, ...resourcesOf(entry),
    };
  });
  return { id, branch, title, sourceTitle: title, description, order: index + 1, subgroups, papers };
});
const papers = categories.flatMap((category) => category.papers.map((paper) => ({
  ...paper, category: category.id, categoryTitle: category.title, branch: category.branch,
})));
const catalog = { updated: metadata.updated, source: "Tables 1 and 2 of survey_acmcsur.tex", categories, papers };
const uniqueKeys = [...new Set(papers.map((p) => p.key))];
for (const key of Object.keys(extraAliases)) {
  if (!uniqueKeys.includes(key)) throw new Error(`Search alias has no catalog paper: ${key}`);
}
fs.writeFileSync(path.join(repoRoot, "data/papers.json"), JSON.stringify(catalog, null, 2) + "\n");
fs.writeFileSync(path.join(repoRoot, "data/papers.bib"), uniqueKeys.map((key) => bib.get(key).raw).join("\n\n") + "\n");
fs.writeFileSync(path.join(repoRoot, "data/survey.bib"), metadata.citation + "\n");
fs.writeFileSync(path.join(websiteRoot, "data/catalog.js"), `window.VGGT_CATALOG = ${JSON.stringify(catalog, null, 2)};\n`);
fs.writeFileSync(path.join(websiteRoot, "data/survey.js"), `window.VGGT_SURVEY = ${JSON.stringify(metadata, null, 2)};\n`);

function paperMarkdown(paper) {
  const resources = [["Paper", paper.paper], ["Code", paper.code], ["Project Page", paper.project]]
    .filter(([, url]) => url).map(([label, url]) => `[[${label}](${url})]`).join(" ");
  return `- **${paper.title.replace(/\.$/, "")}.** ${paper.venue}, ${paper.year}. ${resources}`;
}
const html = (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const institutions = [];
const names = metadata.authors.map((person) => {
  const institution = [person.institution, person.city, person.country].filter(Boolean).join(", ");
  if (!institutions.includes(institution)) institutions.push(institution);
  const label = people[person.name] ? `<a href="${html(people[person.name].url)}">${html(person.name)}</a>` : html(person.name);
  return `${label}<sup>${institutions.indexOf(institution) + 1}${person.corresponding ? ",*" : ""}</sup>`;
});
const header = [
  `<h1 align="center">${html(metadata.title)}</h1>`, "",
  '<p align="center">',
  `  ${names.slice(0, 4).join(" &nbsp; ")}`, "  <br>",
  `  ${names.slice(4).join(" &nbsp; ")}`, "</p>", "",
  '<p align="center">',
  ...institutions.map((institution, i) => `  <sup>${i + 1}</sup>${html(institution)}${i < institutions.length - 1 ? "<br>" : ""}`),
  "</p>", "",
  '<p align="center"><sup>*</sup>Corresponding author: <a href="mailto:guoheng@bupt.edu.cn">Heng Guo</a></p>', "",
];
const resources = [
  { label: "Paper", href: "../vggt-survey-website/assets/survey_acmcsur.pdf", image: "https://img.shields.io/badge/Paper-b31b1b?style=flat&logo=arxiv&logoColor=white" },
  { label: "Website", href: "https://richardchen225.github.io/vggt_survey/", image: "https://img.shields.io/badge/Website-2ea44f?style=flat&logo=googlechrome&logoColor=white" },
  { label: "BibTeX", href: "#citation", image: "https://img.shields.io/badge/BibTeX-175D91?style=flat&logo=latex&logoColor=white" },
];
const categoryHeading = (category) => `${category.branch === "strengthening" ? "S" : "R"}${(category.order - 1) % 5 + 1}. ${category.title}`;
const lines = [
  ...header,
  '<p align="center">',
  ...resources.map((resource) => `  <a href="${resource.href}"><img alt="${resource.label}" src="${html(resource.image)}"></a>`),
  "</p>", "",
  "A literature collection accompanying the survey, organized into geometric-state strengthening and downstream applications.", "",
  "The survey describes one geometric state with two components: **multi-view geometry latent features**, $\\mathcal{Z}_{\\mathrm{geo}}$, and **structured geometric outputs**, $\\mathcal{R}_{\\mathrm{geo}}$ (cameras, point maps, depth maps, and tracks).", "",
  `The catalog currently includes **${categories.filter((c) => c.branch === "strengthening").reduce((n, c) => n + c.papers.length, 0)} strengthening works** and **${categories.filter((c) => c.branch === "reuse").reduce((n, c) => n + c.papers.length, 0)} application works**. Updated ${metadata.updated}.`, "",
  "## Contents", "",
  "- **[State Strengthening](#state-strengthening)**",
  ...categories.slice(0, 5).map((category) => `  - [${categoryHeading(category)}](#category-${category.id})`),
  "- **[State Reuse](#state-reuse)**",
  ...categories.slice(5).map((category) => `  - [${categoryHeading(category)}](#category-${category.id})`),
  "- **[Citation](#citation)**", "",
];
const assetDir = path.join(repoRoot, "assets");
fs.mkdirSync(assetDir, { recursive: true });
for (const branch of ["strengthening", "reuse"]) {
  const label = `State ${branch === "strengthening" ? "Strengthening" : "Reuse"}`;
  const color = "#245F91";
  const light = "#EDF4FB";
  const branchCategories = categories.filter((category) => category.branch === branch);
  const count = branchCategories.reduce((total, category) => total + category.papers.length, 0);
  fs.writeFileSync(path.join(assetDir, `${branch}.svg`), `<svg xmlns="http://www.w3.org/2000/svg" width="840" height="66" viewBox="0 0 840 66"><rect width="840" height="66" rx="6" fill="${light}"/><rect width="7" height="66" rx="3" fill="${color}"/><text x="24" y="41" font-family="Arial,sans-serif" font-size="25" font-weight="700" fill="${color}">${label}</text><text x="812" y="40" text-anchor="end" font-family="Arial,sans-serif" font-size="16" fill="${color}">5 groups · ${count} works</text></svg>\n`);
  lines.push(`<a id="state-${branch}"></a>`, "", `## <img src="assets/${branch}.svg" alt="${label}" width="840">`, "");
  for (const category of categories.filter((c) => c.branch === branch)) {
    const categoryCode = categoryHeading(category).split(".")[0];
    lines.push(`<a id="category-${category.id}"></a>`, "", `### ${categoryHeading(category)}`, "", category.description, "", `<!-- PAPERS:${category.id}:START -->`, "");
    for (const [index, subgroup] of category.subgroups.entries()) {
      lines.push(`#### ${categoryCode}.${index + 1} · ${subgroup.title}`, "", ...subgroup.keys.map((key) => paperMarkdown(category.papers.find((p) => p.key === key))), "");
    }
    lines.push(`<!-- PAPERS:${category.id}:END -->`, "", "---", "");
  }
}
lines.push(
  "## Citation", "", "```bibtex", metadata.citation, "```", "",
);
fs.writeFileSync(path.join(repoRoot, "README.md"), lines.join("\n"));
// Keep the manuscript directory's front matter consistent while preserving its maintenance notes.
const rootReadmePath = path.join(surveyRoot, "README.md");
const rootReadme = fs.readFileSync(rootReadmePath, "utf8");
const rootNotes = rootReadme.indexOf("## ACM Computing Surveys version");
if (rootNotes >= 0) {
  const rootHeader = [...header, '<p align="center">', ...resources.map((resource) => {
    const href = resource.label === "Paper" ? "survey_acmcsur.pdf" : resource.label === "Website" ? "https://richardchen225.github.io/vggt_survey/" : "awesome-vggt/README.md#citation";
    return `  <a href="${href}"><img alt="${resource.label}" src="${html(resource.image)}"></a>`;
  }), "</p>", ""];
  fs.writeFileSync(rootReadmePath, rootHeader.join("\n") + "\n" + rootReadme.slice(rootNotes));
}
console.log(`Generated ${papers.length} records in ${categories.length} categories and ${categories.reduce((n, c) => n + c.subgroups.length, 0)} subgroups.`);
