# CONTRIBUTION_GUIDE.md

## Pré-requis
- Git, GitHub Actions, n8n, Markdown.
- Secrets configurés (`UA_N8N_BASE_URL`, webhooks).

## Branching
- `main` protégée • PR + CI verts obligatoires
- branches `feat/*`, `fix/*`, `docs/*`

## Commits
- Conventionés (ex: `feat(ci): add docops badge`)
- Une PR = une intention, description claire

## Tests
- Lancer `tools/replay.sh` localement si modifs CI/UA
- CI doit générer artefacts lisibles

## Docs
- Mettre à jour `docs/` et liens inter-docs
- Respecter DocOps (lint OK)

## Review
- 1 reviewer min • pas de merge si CI rouge
