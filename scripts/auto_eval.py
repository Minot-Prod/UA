import json, sys, pathlib

ROOT = pathlib.Path(__file__).parent.parent
LOGS = ROOT / "logs" / "shadow"
POLICY = ROOT / "docs" / "KnowledgePolicy.md"

def validate_policy_compliance():
    issues = []
    for log in LOGS.glob("*.json"):
        with open(log) as f:
            data = json.load(f)
        if "source" not in data or not data["source"].startswith("repo:"):
            issues.append(f"{log.name} missing repository citation.")
    if issues:
        print("❌ Policy violations detected:")
        for issue in issues:
            print(" -", issue)
        sys.exit(1)
    print("✅ All logs compliant with Knowledge Policy.")

if __name__ == "__main__":
    validate_policy_compliance()
