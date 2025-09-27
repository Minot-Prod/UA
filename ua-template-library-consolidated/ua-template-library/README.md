# UA Template Library — Consolidated (v0.4 ENRICHED + v0.5 EXT)

Ce paquet **unique** regroupe :
- **v0.4 (75)** enrichi avec colonnes de **métriques** (à compléter).
- **v0.5 (extension business)** prêt à recevoir des **pépites** (avec métriques, preuves d'usage et tags).

## Structure
```
ua-template-library/
  v0.4/
    README.md
    templates/{base44,n8n,zapier}/
    meta/SOURCES_v0.4_75_enriched.csv
  v0.5/
    README.md
    templates/{base44,n8n,zapier}/
    meta/SOURCES_v0.5.csv
  meta/SOURCES_all.csv
```

## Bonnes pratiques
- Compléter les métriques après validation (nombre de clones/downloads, date de vérification, preuve d'usage).
- Utiliser les **templates n8n** inclus comme base de tests.
- Pour Base44, partir de `blueprint.md` et de `acceptance_checklist.md` pour standardiser vos PR/issues.