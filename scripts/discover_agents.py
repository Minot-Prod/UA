#!/usr/bin/env python3
import json, glob, hashlib, pathlib, sys
root = pathlib.Path(__file__).resolve().parents[1]
cfg = json.load(open(root / "manifests" / "UA_registry.json", "r", encoding="utf-8"))
out = {"agents": []}
for path in glob.glob(str(root / cfg["agents_dir"] / cfg["pattern"])):
    with open(path, "r", encoding="utf-8") as fh:
        data = json.load(fh)
    if not data.get("enabled", True):
        continue
    h = hashlib.sha256(open(path,"rb").read()).hexdigest()[:12]
    slug = data["slug"]
    tests = data.get("tests", {})
    payloads = tests.get("payloads", {})
    out["agents"].append({
        "name": data["name"],
        "slug": slug,
        "manifest": str(pathlib.Path(path).as_posix()),
        "hash": h,
        "payloads": {
            "ping": payloads.get("ping"),
            "demo": payloads.get("demo")
        }
    })
json.dump(out, open(root / "manifests" / "UA_registry_cache.json","w",encoding="utf-8"), indent=2)
print(json.dumps({"count": len(out["agents"]), "slugs": [a["slug"] for a in out["agents"]]}))
