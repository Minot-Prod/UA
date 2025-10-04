# Parlios — EXV Étape 10 · Sécurité & Consentements (v11)

Cette version ajoute un système **RGPD‑light**: bannière de consentement, modal de confidentialité, gestion des **scopes** (`analytics`, `ai`, `session`, `security`) et stockage du consentement (90 j).

## 👉 Démo en 2 min (Netlify Drop)
Utilise le dossier **/demo-static/** (HTML pur + Tailwind CDN). Dépose le contenu tel quel dans Netlify Drop pour un rendu immédiat.

## Pistes d’implémentation (Next.js)
Le dossier **/demo-next/** contient une base Next.js (sans dépendances externes) avec:
- `components/ConsentBanner.tsx`
- `components/PrivacyModal.tsx`
- `hooks/useConsent.ts`
- `lib/consent.ts` (helpers)
- Page d’exemple + liens vers /privacy et /legal

> Notes sécurité
- **Tokens d’auth**: préférer **cookies sécurisés** (HttpOnly + Secure + SameSite=Lax) côté serveur.  
- **CSRF**: ajouter jeton anti‑CSRF (`double submit` ou token synchronizer) si tu as des POST authentifiés.  
- **LocalStorage**: utilisé uniquement pour l’état de consentement (non sensible).

## Fichiers clés
- `MVP_Parlios_Assembleur.json` (+ schema) → bloc `security_consent`
- `Checklist_EXV.md` → QA rapide
- `demo-static/` → drop immédiat
- `demo-next/` → base Next.js

