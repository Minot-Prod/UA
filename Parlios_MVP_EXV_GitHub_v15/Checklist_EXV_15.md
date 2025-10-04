# ✅ QA Checklist — EXV #15 · Observabilité (v15)

- [x] Aucun envoi si consentement `analytics` non actif.
- [x] Buffer côté client (max 20 / 3s) + flush manuel.
- [x] Collecte: pageviews, clicks, errors, Web Vitals (LCP/FID/CLS).
- [x] API `/api/telemetry` stocke en mémoire (démo), masque IP, coupe query params.
- [x] Export NDJSON dispo: `/api/telemetry/export`.
- [x] Zero dépendance externe; Next 14 compatible; headers sécurité présents.
