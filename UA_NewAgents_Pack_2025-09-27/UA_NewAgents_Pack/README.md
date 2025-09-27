# UA New Agents Pack — Autodiscovery Ready (2025-09-27)

This pack contains 20 agent manifests, a consolidated `routes/registry.json`, and instructions to integrate with your GitHub **Autodiscovery** workflow.

## Folder structure
- `agents/<slug>/AGENT_<slug>.manifest.json` — one manifest per agent
- `routes/registry.json` — consolidated routing registry (can be merged into your central routing)

## How to integrate (recommended)
1. **Create a PR or commit** adding `agents/*` and `routes/registry.json` to your repo (e.g. `/agents` and `/routes` at repo root).
2. Ensure your **Autodiscovery workflow** watches `agents/**.manifest.json` and `routes/registry.json`.
3. On push, the workflow should:
   - Validate JSON schema (name, slug, version, tests).
   - Register routes from `routes/registry.json` (or merge into existing registry).
   - Run **handshake** and **routing** tests for each agent (IDs: `<slug>-handshake` and `<slug>-routing`).
4. Review the **Artifacts/Logs** and confirm all agents are discovered and registered.

## Test scenarios (efficacy)
- **Integration handshake**: each agent answers with purpose & required inputs.
- **UA→Agent routing**: dispatch a dummy payload; expect `report` and optional `artifacts` returned.
- **Interoperability**:
  - MySafeCup Bot ↔ Invoice Automator ↔ CRM Sync
  - Tazlow ContentHub ↔ Media Balance ↔ Scheduler XL
  - Sound Analyzer ↔ Clip Booster ↔ Pack Builder

> Base44 is disabled for this exceptional run as requested. You can re-enable per-agent later by setting `"policies.base44": true`.

## OWNER token
Manifests are **depersonalized**. Replace `{OWNER}` at registration time if your system populates ownership.

— UA Auto-Pack Generator
