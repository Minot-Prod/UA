# QA Report — RC: v20_RC1

Date: 2025-10-04T05:29:16

## Smoke tests (résumé)
- Home reachable: ✅
- Consent banner / accept all: ✅ (localStorage écrit, expir. 90j)
- Upgrade mock flow: ✅ (/billing → /success → cookie plan=pro)
- AI mock generation: ✅ (business_plan / finance_brief)
- Telemetry health: ✅ (/api/telemetry/health → 200)
- Security headers: ✅ (via /api/qa/headers)

## Concessions connues
- Webhook Stripe en mode test (journalisation simple).
- Stores in-memory (audit/telemetry/rate-limit) — OK pour MVP.
