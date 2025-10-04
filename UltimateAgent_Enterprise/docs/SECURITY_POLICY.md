# SECURITY_POLICY.md

## Objectif
Protéger les actifs, données et services liés à Ultimate Agent.

## Portée
Toute l’infrastructure UA (GitHub, n8n, artefacts, secrets, rapports).

## Exigences minimales
- HTTPS obligatoire (certificats valides, renouvellement auto).
- Secrets via GitHub Actions Secrets (jamais en clair).
- Least privilege : accès minimal par rôle.
- Journalisation : runs CI, décisions UA, erreurs critiques.
- Revue de sécurité hebdomadaire (workflow `ua-security-weekly.yml`).

## Procédures
- **Gestion des secrets**: rotation trimestrielle, audit des accès, scope par workflow.
- **Incidents**: ouverture d’issue “SEC-INCIDENT” + post-mortem 72h.
- **Sauvegardes**: archives artefacts critiques, conservation 30 jours.

## Conformité
- Conformité interne DocOps + checklist Security Weekly.
- Respect des lois applicables (données, logs).

## Mise à jour
Revue trimestrielle par UA/Ops. Versionné dans `docs/`.
