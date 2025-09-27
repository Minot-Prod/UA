# UA 65 Agents Pack — Core 45 + Specialized 20 — 2025-09-27

This pack includes 65 agent manifests and a consolidated `routes/registry.json`, ready for GitHub Autodiscovery.

## Install
1. Place `agents/` and `routes/` at repo root.
2. Push to a feature branch and open a PR.
3. Autodiscovery should print **"Discovered 65 agents"** and run per-agent tests.

## Duplicate safety
`/scripts/check_duplicates.py` included. It fails CI if two manifests share the same `slug`.

## Re-enable Base44 per agent
Set `"policies.base44": true` where desired (e.g. Base44 Pro is already true).

— UA Auto-Pack Generator
