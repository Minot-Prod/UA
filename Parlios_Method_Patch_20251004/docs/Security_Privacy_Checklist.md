# Sécurité & Privacy — Checklist consolidée (v2025-10-04)

## 1) OWASP ASVS 4.0.3 — Matrix (extraits)
- **V1 Architecture, design & threat modeling** — STRIDE / misuse cases documentés.
- **V2 AuthN** — MFA optionnel, anti‑brute force, sessions courtes, secure cookies.
- **V3 AuthZ** — contrôle par ressource, séparation rôle/droit, tests d'escalade.
- **V4 Input Validation** — allowlist, encodage contextuel, SSRF/SQLi/XSS mitigés.
- **V5 Cryptography** — TLS 1.2+, PFS, stockage haché (Argon2/bcrypt).
- **V6 Stored Data** — chiffrement au repos (si PII), gestion clés.
- **V7 Error Handling** — pas d’info sensibles dans logs.
- **V8 Data Protection** — PII minimisée, consentements, droits utilisateurs.
- **V9 Comms** — HSTS + SRI + CSP nonces.
- **V10 Malicious code** — SCA + pin des versions.
- **V11 Business Logic** — protection abus (rate limit, idempotence).
- **V12 Files/Resources** — validation MIME/extension, antivirus si upload.
- **V13 API** — contrôle fin des objets; pagination/scope; schema validation.
- **V14 Config** — secrets hors code, rotations.

**Preuve**: lier chaque exigence à un test CI (SAST/DAST/SCA) ou manuel signé QA.

## 2) OWASP API Security Top 10 (2023) — Exigences
- **API1:2023** Broken Object Level Authorization (BOLA) — vérifier ownerId sur chaque ressource.
- **API2:2023** Broken Auth — tokens expirables, refresh flow sûr.
- **API3:2023** Broken Object Property Level Auth (BOPLA) — filtrer champs.
- **API4:2023** Unrestricted Resource Consumption — quotas / rate‑limit / timeouts.
- **API5:2023** Broken Function Level Authorization — RBAC/ABAC sur endpoints.
- **API6:2023** Unrestricted Access to Sensitive Business Flows — captchas/étapes.
- **API7:2023** Server Side Request Forgery — allowlist sortante.
- **API8:2023** Security Misconfiguration — headers, CORS strict, versions.
- **API9:2023** Improper Inventory Management — spec OpenAPI à jour, versions.
- **API10:2023** Unsafe Consumption of APIs — valider schémas/fournisseurs.

## 3) HTTP Security Headers (prod)
- **Content-Security-Policy**: `default-src 'self'; script-src 'self' 'nonce-...'; object-src 'none'; frame-ancestors 'none'`
- **Strict-Transport-Security**: `max-age=63072000; includeSubDomains; preload`
- **X-Content-Type-Options**: `nosniff`
- **Referrer-Policy**: `strict-origin-when-cross-origin`
- **Permissions-Policy**: limiter capteurs (camera, geolocation, etc.).
- **Cross-Origin-Opener-Policy / Cross-Origin-Embedder-Policy / CORP**: si besoin (SAB/WebGL).

## 4) CI/CD Sécurité
- **SCA** (Dependabot/OWASP Dependency Check)
- **SAST** (CodeQL)
- **DAST** (OWASP ZAP @ staging)
- **Secret scanning** (GitHub Advanced Security)
- **MDN Observatory** via script CLI

## 5) Privacy & Paiements
- **GDPR**: registre traitements, base légale, droits (accès, portabilité, effacement), DPA vendors.
- **CCPA/CPRA** (si US): mécanisme d’opt‑out, “Do Not Sell/Share”.
- **Cookies**: bannière si tracking/marketing; politique claire.
- **Stripe Checkout / Elements** → **PCI SAQ A** (ou A‑EP selon intégration).

## 6) Journalisation & réponse à incident
- Traces (OpenTelemetry), logs structurés (PII minimisée), rétention & alerte.
- Runbooks d’incident, RTO/RPO, exercices semestriels.
