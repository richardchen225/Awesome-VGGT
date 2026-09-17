import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const surveyRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
export const readSource = (name) => fs.readFileSync(path.join(surveyRoot, name), "utf8");

export function braced(text, start) {
  if (text[start] !== "{") throw new Error(`Expected opening brace at ${start}`);
  let depth = 1;
  let end = start + 1;
  for (; end < text.length && depth; end++) {
    if (text[end - 1] === "\\") continue;
    if (text[end] === "{") depth++;
    if (text[end] === "}") depth--;
  }
  if (depth) throw new Error("Unclosed LaTeX/BibTeX brace");
  return { value: text.slice(start + 1, end - 1), end };
}

export function commandValue(text, command) {
  const match = new RegExp(`\\\\${command}(?:\\[[^\\]]*\\])?\\s*\\{`).exec(text);
  return match ? braced(text, match.index + match[0].length - 1).value : "";
}

export function cleanLatex(value = "") {
  const accents = { '"': "\u0308", "'": "\u0301", "`": "\u0300", "^": "\u0302", "~": "\u0303" };
  return value
    .replace(/\\cite\{[^}]*\}/g, "")
    .replace(/\\textsuperscript\{\\textit\{a\}\}/g, "")
    .replace(/\\ref\{tab:strengthening_eval\}/g, "5")
    .replace(/\\ref\{tab:reuse_eval\}/g, "6")
    .replace(/\\ref\{tab:benchmark_coverage\}/g, "4")
    .replace(/\\mathcal\{([ZR])\}_\{\\mathrm\{geo\}\}/g, "$1geo")
    .replace(/\\vggt(?:plain)?(?:\[([^\]]*)\])?/g, (_, suffix) => `VGGT${suffix || ""}`)
    .replace(/\\+["'`^~]\s*\{?([a-zA-Z])\}?/g, (match, letter) => {
      const accent = match.match(/["'`^~]/)[0];
      return (letter + accents[accent]).normalize("NFC");
    })
    .replace(/\\c\s*\{([a-zA-Z])\}/g, (_, letter) => (letter + "\u0327").normalize("NFC"))
    .replace(/\\(?:o|O)\b/g, (s) => s === "\\o" ? "ø" : "Ø")
    .replace(/\\Omega\b/g, "Ω")
    .replace(/\^\{?([0-9]+)\}?/g, (_, digits) => [...digits].map((digit) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[Number(digit)]).join(""))
    .replace(/_\{\\log\}/g, "(log)")
    .replace(/\\delta_?\{?1\}?/g, "δ₁")
    .replace(/\\log\b/g, "log")
    .replace(/~(?![a-zA-Z])/g, " ")
    .replace(/\\sim\b/g, "~")
    .replace(/\\(?:par|newline)\b|\\\\/g, " ")
    .replace(/\\&/g, "&")
    .replace(/\\%/g, "%")
    .replace(/\\_/g, "_")
    .replace(/---/g, "—")
    .replace(/--/g, "–")
    .replace(/\\[a-zA-Z]+(?:\[[^\]]*\])?/g, "")
    .replace(/[{}$]/g, "")
    .replace(/\s+/g, " ")
    .replace(/\s+;/g, ";")
    .trim();
}

export function parseBibtex(text) {
  const entries = new Map();
  const pattern = /@(\w+)\s*\{\s*([^,\s]+)\s*,/g;
  let match;
  while ((match = pattern.exec(text))) {
    const record = braced(text, text.indexOf("{", match.index));
    const body = text.slice(pattern.lastIndex, record.end - 1);
    const fields = {};
    const fieldPattern = /(\w+)\s*=\s*\{/g;
    let field;
    while ((field = fieldPattern.exec(body))) {
      const parsed = braced(body, fieldPattern.lastIndex - 1);
      fields[field[1].toLowerCase()] = parsed.value.trim();
      fieldPattern.lastIndex = parsed.end;
    }
    entries.set(match[2], { key: match[2], type: match[1].toLowerCase(), raw: text.slice(match.index, record.end).trim(), ...fields });
    pattern.lastIndex = record.end;
  }
  return entries;
}

export function extractCitations(text) {
  return [...new Set([...text.matchAll(/\\cite\{([^}]+)\}/g)].flatMap((m) => m[1].split(",").map((key) => key.trim())))];
}

export function surveyMetadata() {
  const source = readSource("survey_acmcsur.tex");
  const people = JSON.parse(readSource("awesome-vggt/data/people.json"));
  const authorMatches = [...source.matchAll(/\\author\{([^}]+)\}/g)];
  const authors = authorMatches.map((match, index) => {
    const block = source.slice(match.index, authorMatches[index + 1]?.index ?? source.indexOf("\\renewcommand{\\shortauthors}"));
    return {
      name: match[1], institution: cleanLatex(commandValue(block, "institution")),
      city: cleanLatex(commandValue(block, "city")), country: cleanLatex(commandValue(block, "country")),
      department: cleanLatex(commandValue(block, "department")), email: commandValue(block, "email"),
      corresponding: /corresponding author/i.test(commandValue(block, "authornote")),
      homepage: people[match[1]]?.url || "",
    };
  });
  const title = commandValue(source, "title");
  const abstract = cleanLatex(source.match(/\\begin\{abstract\}([\s\S]*?)\\end\{abstract\}/)?.[1]);
  if (!title || !abstract || authors.length !== 8) throw new Error("Incomplete manuscript metadata");
  const authorBib = authors.map(({ name }) => {
    const parts = name.split(" ");
    return `${parts.pop()}, ${parts.join(" ")}`;
  }).join(" and ");
  const year = new Date().getFullYear();
  const citation = `@misc{chen${year}vggtsurvey,\n  title = {${title}},\n  author = {${authorBib}},\n  year = {${year}},\n  note = {Survey manuscript}\n}`;
  return { title, abstract, authors, year, citation, updated: new Date().toISOString().slice(0, 10), source: "survey_acmcsur.tex" };
}
