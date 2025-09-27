#!/usr/bin/env python3
import os, json, sys
seen = {}
dup = []
for root, _, files in os.walk("agents"):
    for fn in files:
        if not fn.endswith(".manifest.json"): continue
        p = os.path.join(root, fn)
        try:
            with open(p, "r", encoding="utf-8") as f:
                data = json.load(f)
        except Exception as e:
            print(f"[ERROR] Cannot read {p}: {e}")
            sys.exit(1)
        slug = data.get("slug")
        if not slug:
            print(f"[ERROR] Missing slug in {p}")
            sys.exit(1)
        if slug in seen:
            dup.append((slug, seen[slug], p))
        else:
            seen[slug] = p
if dup:
    print("Duplicate slugs detected:")
    for s, a, b in dup:
        print(f" - {s}\n   A: {a}\n   B: {b}")
    sys.exit(2)
print("No duplicate slugs. OK.")