#!/usr/bin/env python3
import argparse, json, os, sys, glob

REQUIRED_FILES = ["README.md", "workflow.mmd", "zapier.json", "n8n.json", "prompts.md", "checklist.md", ".env.example"]

def validate_dir(path: str) -> int:
    missing = [f for f in REQUIRED_FILES if not os.path.isfile(os.path.join(path, f))]
    if missing:
        print(f"[FAIL] {path} — fichiers manquants: {', '.join(missing)}")
        return 1

    # Validate JSON files syntactically
    for jf in ["zapier.json", "n8n.json"]:
        fp = os.path.join(path, jf)
        try:
            with open(fp, "r", encoding="utf-8") as f:
                json.load(f)
        except Exception as e:
            print(f"[FAIL] {path}/{jf} — JSON invalide: {e}")
            return 1

    # Basic check: Mermaid file non-vide
    mmd = os.path.join(path, "workflow.mmd")
    try:
        content = open(mmd, "r", encoding="utf-8").read().strip()
        if not content or "flowchart" not in content:
            print(f"[FAIL] {path}/workflow.mmd — contenu manquant ou invalide")
            return 1
    except Exception as e:
        print(f"[FAIL] {path}/workflow.mmd — erreur: {e}")
        return 1

    print(f"[OK] {path}")
    return 0

def main():
    parser = argparse.ArgumentParser(description="Validation des templates Parlios Workflows")
    parser.add_argument("--only", nargs="*", help="Limiter à certains dossiers (ex: 01_programmatic_seo)")
    args = parser.parse_args()

    base = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    # Trouver les dossiers NN_* à la racine
    candidates = sorted([p for p in os.listdir(base) if os.path.isdir(os.path.join(base, p)) and p[:2].isdigit()])
    if args.only:
        candidates = [c for c in candidates if c in args.only]

    code = 0
    for d in candidates:
        rc = validate_dir(os.path.join(base, d))
        if rc != 0:
            code = rc
    sys.exit(code)

if __name__ == "__main__":
    main()
