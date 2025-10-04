import argparse, os, json, hashlib, glob

REQUIRED_DOCS = [
  'docs/SECURITY_POLICY.md',
  'docs/QA_POLICY.md',
  'docs/CODE_OF_CONDUCT.md',
  'docs/CONTRIBUTION_GUIDE.md',
  'docs/AGENTS_HANDBOOK.md',
  'docs/BUSINESS_CONTINUITY_PLAN.md',
  'docs/STYLE_GUIDE.md',
  'docs/UA_Yomi_Charter.md',
  'docs/diagrams/agents_hierarchy.mmd'
]
REQUIRED_WORKFLOWS = [
  '.github/workflows/ua-e2e.yml',
  '.github/workflows/docops.yml',
  '.github/workflows/ua-security-weekly.yml'
]
REQUIRED_TOOLS = [
  'tools/replay.sh',
  'tools/replay.ps1'
]

def exists(p): 
  return os.path.exists(p)

def score():
  s_docs = sum(exists(p) for p in REQUIRED_DOCS) / len(REQUIRED_DOCS) if REQUIRED_DOCS else 1
  s_wf = sum(exists(p) for p in REQUIRED_WORKFLOWS) / len(REQUIRED_WORKFLOWS)
  s_tools = sum(exists(p) for p in REQUIRED_TOOLS) / len(REQUIRED_TOOLS)
  # simple proxy weights
  total = s_docs*0.30 + s_wf*0.20 + s_tools*0.10
  # placeholders for CI green & security & yomi presence (simulated)
  if exists('docs/UA_Yomi_Charter.md'):
    total += 0.05
  # DocOps badge simulation: presence of docops.yml
  if exists('.github/workflows/docops.yml'):
    total += 0.20
  # Security weekly presence
  if exists('.github/workflows/ua-security-weekly.yml'):
    total += 0.15
  return min(total, 1.0)

if __name__ == "__main__":
  ap = argparse.ArgumentParser()
  ap.add_argument("--print", action="store_true", help="Print score")
  args = ap.parse_args()
  sc = score()
  label = "Startup" if sc < 0.25 else ("Pro" if sc < 0.75 else "Enterprise")
  if args.print:
    print(f"Maturity Index: {sc*100:.1f}% — {label}")
  else:
    print(sc)
