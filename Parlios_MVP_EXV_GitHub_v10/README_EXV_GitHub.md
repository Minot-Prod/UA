# Parlios_MVP_EXV — v10 (Étape 9 — A11Y & i18n)

Ce pack **v10** ajoute l'étape **9 — Accessibilité & Internationalisation** :
- Cible **WCAG 2.2 AA** + quelques AAA “low-effort” (Focus Appearance / Contrast Enhanced).
- i18n **FR/EN** sans dépendance externe (Next.js/React/Tailwind only).
- Démo Next.js mise à jour : `SkipLink`, `LiveRegion`, commutateur de langue, prise en charge `prefers-reduced-motion`.

## Contenu
- `MVP_Parlios_Assembleur.json` : source de vérité (inclut `accessibilite_i18n`).
- `MVP_Parlios_Assembleur.schema.json` : schéma JSON mis à jour.
- `Checklist_EXV.md` : checklist de validation Étape 9.
- `demo_nextjs/` : mini-app Next.js conforme A11Y & i18n.

## Lancer la démo (optionnel)
```bash
cd demo_nextjs
npm i
npm run dev
# Ouvrir http://localhost:3000
```
> Dépendances : `next`, `react`, `react-dom`, `tailwindcss`, `postcss`, `autoprefixer`.
