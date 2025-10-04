# Production Readiness Checklist (générique)

## Gouvernance & Spéc
- [ ] Blueprint validé (Goal/Scope/Non-Goals)
- [ ] Synthèse experte signée (UX/Tech/IA/Sec/Business)
- [ ] RACI défini + owner identifié
- [ ] Budget/planification réaliste

## Sécurité & RGPD
- [ ] Cookies: `HttpOnly` si sensible, `SameSite=Lax`, `Secure` en prod
- [ ] CSP/HSTS/XFO/Referrer-Policy/Permissions-Policy définis
- [ ] CORS strict (origins connues)
- [ ] Données perso minimisées, consentement explicite, rétention définie
- [ ] Journalisation des accès/erreurs, masquage IP (si requis)
- [ ] Menaces principales cartographiées (XSS/CSRF/Injection/IDOR)

## Accessibilité & i18n
- [ ] WCAG 2.2 AA (landmarks, contrastes, focus-visible, ARIA)
- [ ] FR/EN (ou langues ciblées), formats date/nombre, RTL si besoin

## Performance & Observabilité
- [ ] Budgets: TTFB ≤ 800ms, LCP ≤ 2.5s, CLS ≤ 0.10, JS ≤ 300KB
- [ ] Télémétrie: pageviews, erreurs, Web Vitals, export NDJSON
- [ ] Alertes basiques (erreurs 5xx, latence anormale)

## IA / Génération (si applicable)
- [ ] Timeouts/retries/idempotency
- [ ] Validation inputs, ban patterns, rate-limit
- [ ] Sortie **structurée** (JSON/Markdown)
- [ ] Tests goldens (stabilité)

## Monétisation & Plans (si applicable)
- [ ] Plans Free/Pro/Pro+ visibles, CTA cohérents
- [ ] Stripe (test/live), webhook testé
- [ ] Gating & metering fonctionnels

## QA & Release
- [ ] /qa & runner Node OK (A11Y/Perf/Headers)
- [ ] QA report ✅
- [ ] CHANGELOG + tags Git (RC/GA)
- [ ] Rollback plan & notes d’exploitation
