# SECURITY — Parlios

## Invariants
- Secrets uniquement dans GitHub Actions (env chiffré).
- JWT/RLS obligatoires côté données (Supabase/Edge).
- Interdiction d'`unsafe-inline` en prod.

## Headers (Netlify)
- HSTS (max‑age ≥ 15552000; includeSubDomains; preload)
- CSP stricte : default-src 'self'; frame-ancestors 'none'; connect-src 'self' https://*.supabase.co; img-src 'self' data: blob:; style-src 'self' 'nonce-<nonce>'; script-src 'self' 'nonce-<nonce>'

## Process
- Ajout/rotation des secrets → PR de config + log dans REPORT.md
- Audit hebdo (workflow `security-weekly.yml`)
