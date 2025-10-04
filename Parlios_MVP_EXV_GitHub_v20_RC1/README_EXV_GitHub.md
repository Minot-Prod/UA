# Parlios — EXV Étape 20 · Release Candidate (v20_RC1)

**Objectif** : figer un **RC** prêt à être déployé (Netlify/Vercel), avec **smoke tests** et **budgets** vérifiés.
- Tag: `v20_RC1`
- Composants gelés: Consent v11 → QA v19
- Déploiement: Netlify (export) / Vercel (standalone)
- Artifacts: pack zip, CHANGELOG, QA report

## Démarrage express
```bash
cd demo-next
npm i
npm run build   # export -> out/
# (Option) QA E2E léger (si tools/qa_runner.js présent)
QA_ORIGIN="http://localhost:3000" npm run qa || true
```

## Politique RC
- Pas de nouvelles features. **Fixes critiques seulement.**
- Si un fix modifie le périmètre, on re-calcule un RC (`v20_RC2`).

## Livrables inclus
- Assembleur + schema (release_candidate)
- CHANGELOG.md
- QA_Report_RC1.md
- Demo Next.js RC minimal
