# Parlios UA Patch — Apps + lib

Ce bundle ajoute un **socle commun** à toutes les mini‑apps Parlios :
- Blueprint Base44 (Goal/Scope/Acceptance/Complexity) + bouton **Valider (70%)**
- CREDIT_LOG **visible** (traçabilité des actions)
- Exports **MD / PDF / PNG (OG)** unifiés
- Carte OG (1200×630) avec watermark “Créé avec Parlios™”

## Fichiers
- `lib/ua.js` — hooks et composants partagés (useCreditLog, clipboard, downloadBlob, printAsPDF, useOgCard, BlueprintPanel, CreditLog)
- 7 fichiers `*.jsx` mis à niveau (voir en racine)

## Intégration
1. Copier le dossier dans votre projet (ou remplacer les fichiers homonymes).
2. Importer les composants/helps depuis `./lib/ua.js` dans vos pages ou composants.
3. Tester : Générer → Export .md → Export .pdf → Export .png → Partager. Vérifier que **CREDIT_LOG** liste bien chaque action.

_Build‑agnostic :_ les helpers n’utilisent pas de dépendances externes. Pour Next.js/CRA/Vite, gardez l’emplacement relatif des imports.