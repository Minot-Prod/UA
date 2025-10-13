# Parlios Build Prompts Pack — v1.0

This pack contains **38 production-ready build prompts** to generate Netlify drop-ready previews for all Parlios apps.

## How to Use
1. Ensure you have **/research/** reports available (global + per-app if any).
2. Pick a prompt from `/prompts/` and paste it into your external agent (ChatGPT, Claude, Gemini).
3. The agent must:
   - render a **code preview** in-chat,
   - deliver a **ZIP Netlify-ready** (index.html + assets + README + manifest),
   - include a brief **QA report** (A11y/Perf/i18n).
4. Deploy via **Netlify Drop** and start user testing.

## Shared Assets
See `/attachments/`:
- `brand_tokens.json`
- `logo_parlios.svg`
- `manifest.webmanifest`
- `netlify_readme_template.md`
- `qa_checklist_template.md`

## Brand DNA (must-keep)
Dark minimalist design, premium feel, accent `#9EE37D`, secondary `#7FD4FF`, soft radius, subtle motion, accessible components.

© 2025 Parlios / Base44 Initiative