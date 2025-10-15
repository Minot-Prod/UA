
#!/usr/bin/env node
import fs from "node:fs";
import { glob } from "node:glob";

const pattern = process.argv[2] || "reports/uas/**/*.json";
const files = await glob(pattern, { nodir: true });
let total = 0, warn = 0, fail = 0, conf = [], actions = 0, owners = 0, deadlines = 0;

for (const f of files) {
  try {
    const data = JSON.parse(fs.readFileSync(f, "utf8"));
    const arr = Array.isArray(data) ? data : [data];
    for (const u of arr) {
      if (!u.status && u.uas) { // support wrapper {uas: {...}}
        u = u.uas;
      }
      total += 1;
      if (u.status === "WARN") warn += 1;
      if (u.status === "FAIL") fail += 1;
      if (typeof u.confidence === "number") conf.push(u.confidence);
      if (Array.isArray(u.next_actions)) {
        actions += u.next_actions.length;
        owners += u.next_actions.filter(a => a.owner).length;
        deadlines += u.next_actions.filter(a => a.deadline).length;
      }
    }
  } catch (e) {}
}

const avg = conf.length ? conf.reduce((a,b)=>a+b,0)/conf.length : 0;
const out = {
  totals: { total, warn, fail },
  confidence_avg: Math.round(avg*10)/10,
  pct_actions_with_owner: total ? Math.round((owners/Math.max(actions,1))*100) : 0,
  pct_actions_with_deadline: total ? Math.round((deadlines/Math.max(actions,1))*100) : 0
};
console.log(JSON.stringify(out, null, 2));
