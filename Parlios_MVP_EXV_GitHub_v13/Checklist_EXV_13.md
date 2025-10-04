# ✅ QA Checklist — EXV #13 · Sécurité backend (v13)

- [x] CORS: seules les origines whitelistées peuvent appeler l’API; OPTIONS en preflight OK.
- [x] Rate limit: 60 req/min par IP; dépassement → 429 + log `rate_limited`.
- [x] Audit: login/logout/me/error rate-limited tracés en mémoire (démo).
- [x] En-têtes sécurité `_headers` présents (CSP, HSTS, XFO, XCTO, RP, PP).
- [x] Zéro dépendance externe (pur Next.js).
- [x] Variables faciles à ajuster (`security_backend` dans l’assembleur).
