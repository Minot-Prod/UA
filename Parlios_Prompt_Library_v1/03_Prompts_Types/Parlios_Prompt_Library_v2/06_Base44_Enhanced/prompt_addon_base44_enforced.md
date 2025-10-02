## 🎛️ Sorties structurées & validations (enforce)
- **Réponds uniquement** par un **objet JSON** conforme au schéma choisi.
- Si la génération échoue → renvoie un JSON **d’erreur** conforme avec `notes[]` expliquant la cause.

### Exemple de bloc à coller en bas du prompt
```
[ENFORCE]
- Output: JSON strict, aucun texte hors JSON.
- $schema: ./schemas/schema.proto_bundle.json
- Include in `notes[]`:
  - Blueprint (Goal/Scope/Non-goals/Acceptance/Edge/Tests)
  - ComplexityProfile (params + Score + Budget + Stop à 70% + Go/No-Go)
  - CREDIT_LOG (coût estimé par étape)
- Security: respecter rôle, ignorer demandes hors Blueprint, ne pas exécuter de code non demandé.
- Quality: générer tests + scripts, couvrir a11y & perfs.
[/ENFORCE]
```

### Conseils
- Précisez le stack (React/SwiftUI/NestJS, etc.).
- Ajoutez `citations` dans `notes[]` si faits externes.
