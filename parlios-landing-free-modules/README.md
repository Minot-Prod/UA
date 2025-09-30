# Parlios — Landing avec 3 modules gratuits

**Prêt pour Netlify/Next.js.** Sans backend (front-only), donc super rapide.

## Démarrage local
```bash
npm i
npm run dev
```
→ http://localhost:3000

## Déploiement Netlify
- Ajoute ce dossier dans ton repo GitHub (racine).
- Sur Netlify, connecte le repo → Build command: `npm run build` · Publish directory: `.next` (détecté automatiquement).

## Ce que contient la page
- Hero (logo + pitch) · CTA "Essayer gratuitement".
- 3 modules:
  1) Évaluateur titre & accroche (score, tips, variantes, Copier).
  2) Persona Express (secteur, audience, offre → persona rapide).
  3) Détecteur de risques de clause (3 risques + reformulation + disclaimer).

## Branding
- Couleurs Parlios intégrées (orange #FF6A00, etc.).
- Logo dans `/public/brand/logo-parlios.svg`.

## Notes
- Tout est front-only → latence quasi nulle.
- Si tu veux la version Pro (export PDF, sauvegarde…), on pourra brancher des Netlify Functions plus tard.
