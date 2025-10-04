# MERGE_GUIDE_v11 — Intégration rapide dans ton repo Next.js

## 1) Fichiers à copier
- `components/ConsentBanner.tsx`
- `components/PrivacyModal.tsx`
- `hooks/useConsent.ts`
- `lib/consent.ts`
- `pages/privacy.tsx`
- `pages/legal.tsx`

## 2) Utilisation
Ajoute `<ConsentBanner />` en bas de ta page `pages/index.tsx` (ou dans ton layout).  
Expose un lien “Confidentialité” qui ouvre `PrivacyModal`.

## 3) Sécurité cookies (quand auth activée)
- Stocke les **tokens d’auth** en **cookies HttpOnly + Secure + SameSite=Lax** côté serveur.
- Ajoute **anti-CSRF** (token synchronizer / double-submit) sur les POST authentifiés.

### Exemple (endpoint Next.js)
`/pages/api/auth/mock.ts` — simule un cookie de session sécurisé.

## 4) Netlify
Le fichier `_headers` fourni ajoute des en-têtes de sécurité. Laisse-le à la racine du build exporté (`out/`).

## 5) Tests EXV
- Opt-in explicite avant analytics/IA.
- Refus en 1 clic.
- Persistance 90 jours (`localStorage`, clé `parlios.consent.v1`).
