
#!/usr/bin/env node
/**
 * Simple collector: globs JSON files of UAS v2 outputs and concatenates them into a single array.
 * Usage: node scripts/rap_collect.mjs --in "reports/uas/**/*.json" --out "reports/uas_merged.json"
 */
import { glob } from "node:glob";
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const get = (flag, def=null) => {
  const i = args.indexOf(flag);
  return i>=0 ? args[i+1] : def;
};
const inGlob = get("--in");
const outFile = get("--out", "reports/uas_merged.json");
if (!inGlob) {
  console.error("Missing --in <glob>");
  process.exit(1);
}

const files = await glob(inGlob, { nodir: true });
const list = [];
for (const f of files) {
  try {
    const raw = fs.readFileSync(f, "utf8");
    const data = JSON.parse(raw);
    if (Array.isArray(data)) {
      // if a file already contains an array of UAS, concat
      for (const x of data) list.push(x);
    } else {
      list.push(data);
    }
  } catch (e) {
    console.warn("Skip invalid JSON:", f, e.message);
  }
}
fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(list, null, 2), "utf8");
console.log(`Collected ${list.length} UAS entries → ${outFile}`);
