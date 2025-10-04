# Étape 9 — A11Y & i18n : Checklist EXV

## Accessibilité (WCAG 2.2 AA + AAA low-effort)
- [ ] Anneau de focus **visible**, épaisseur ≥ 2px, contraste ≥ 3:1, jamais masqué.
- [ ] **Skip-link** vers `<main>` visible au focus, fonctionne.
- [ ] **Navigation clavier** complète, ordre logique, aucun piège.
- [ ] Cibles tactiles/cliables **≥24×24px** ou espacement équivalent.
- [ ] **Live regions**: `polite` pour statuts, `assertive` pour erreurs.
- [ ] Respect de `prefers-reduced-motion` (animations réduites).
- [ ] Dialog/Modal, Tabs, Menu, Combobox suivent les patterns ARIA APG.

## i18n (FR/EN)
- [ ] `next.config.js` : `i18n.locales=["fr","en"]`, `defaultLocale="fr"`.
- [ ] Fichiers de traductions présents : `i18n/fr/common.json`, `i18n/en/common.json`.
- [ ] Hook `useT` opérationnel, fallback propre.
- [ ] Attribut `lang` html mis à jour selon la locale active.
- [ ] Formats (date/monnaie/nombre) via `Intl.*`.

## Démo
- [ ] Basculer FR↔EN met à jour les libellés (Home/Modules/CTA).
- [ ] Erreur de formulaire annoncée via `aria-live="assertive"`.
- [ ] Le skip-link fonctionne et le focus n’est jamais caché.
