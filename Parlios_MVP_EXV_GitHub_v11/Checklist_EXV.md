# ✅ QA Checklist — EXV #10 · Sécurité & Consentements (v11)

- [x] Opt‑in explicite avant tout tracking non essentiel (Analytics, IA).
- [x] Boutons **Accepter tout / Refuser tout / Personnaliser** disponibles dès l’ouverture.
- [x] Cookies essentiels → `SameSite=Lax`, `Secure`, session éventuellement `HttpOnly` (backend).
- [x] Persistance consentement → `localStorage` clé `parlios.consent.v1`, expiration 90 jours (auto‑purge).
- [x] Scopes gérés: `analytics`, `ai`, `session`, `security`.
- [x] Bannière claire (ton humain) + **PrivacyModal** avec liens *Politique* et *Mentions légales*.
- [x] Retrait/modif consentement possible à tout moment via lien **Confidentialité** (footer).
- [x] Code sans dépendances externes, Tailwind via CDN côté démo statique uniquement.
- [x] Démo Netlify Drop **/demo-static** opérationnelle (< 2 min).

## Tests rapides
1. Ouvre la démo → la bannière s’affiche.  
2. Clique **Refuser tout** → `analytics=off`, `ai=off`.  
3. Clique **Personnaliser** → active uniquement **Analytics** → sauvegarde.  
4. Recharge la page → les choix sont persistés (90 j).  
5. Ouvre **Confidentialité** (footer) → reconfigurer → OK.

