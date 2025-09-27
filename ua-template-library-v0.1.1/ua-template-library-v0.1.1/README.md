# UA Template Library v0.1.1 — n8n & Base44

Structure prête à déposer dans GitHub. Chaque template est minimal, documenté, et normalisé.
- `templates/n8n`: Workflows n8n (JSON) prêts à importer.
- `templates/base44`: Blueprints & checklists Base44 (Markdown) + métadonnées.

## Utilisation rapide
1) Importer les JSON n8n via **Import from file**.
2) Lire le `README` de chaque template pour variables d'env et étapes.
3) Copier-coller les blueprints Base44 dans issues/PRs.

## Variables d'environnement attendues (exemples)
- `NOTION_DB_CONTENT`, `NOTION_DB_TASKS`, `NOTION_DB_FILES`
- `GOOGLE_DRIVE_FOLDER_ID` (optionnel)
- `OPENAI_API_KEY` (via credentials n8n, jamais en clair)

## Licence
MIT pour les fichiers fournis ici. Vérifier les licences des sources liées avant réutilisation.
