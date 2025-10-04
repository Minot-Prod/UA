# OWASP Top 10 — 2025 (synthèse pratico‑pratique)
Lien : https://owasp.org/Top10/

Focus Parlios (web/app) :
- A01: Broken Access Control → routes & API protégées, tests.
- A02: Cryptographic Failures → secrets uniquement en env, TLS, no hard‑code.
- A03: Injection → paramétrer/échapper, ORMs sûrs, requêtes préparées.
- A04: Insecure Design → validations métier, states explicites, menaces anticipées.
- A05: Security Misconfiguration → headers, CORS, durcissement, versions.
- A06: Vulnerable & Outdated Components → dépendances à jour, scans.
- A07: Auth Failures → gestion sessions, MFA si besoin.
- A08: Software/Data Integrity → CI signer/valider, provenance packages.
- A09: Logging & Monitoring → logs utiles, pas de secrets, alertes.
- A10: SSRF/XXE & co. → limiter accès réseau, whitelists, timeouts.

À livrer : rapport semgrep/bandit + liste des actions de durcissement.
