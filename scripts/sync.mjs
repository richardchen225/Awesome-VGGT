import { execFileSync } from "node:child_process";
import path from "node:path";
import { surveyRoot } from "./survey-source.mjs";

for (const script of ["awesome-vggt/scripts/build-catalog.mjs", "vggt-survey-website/scripts/build-datasets.mjs"]) {
  execFileSync(process.execPath, [path.join(surveyRoot, script)], { stdio: "inherit" });
}
execFileSync("python", [path.join(surveyRoot, "vggt-survey-website/scripts/export-assets.py")], { stdio: "inherit" });
