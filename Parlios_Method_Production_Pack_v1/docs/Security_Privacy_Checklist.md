# Sécurité & Confidentialité — Checklist

## Principes
- Minimisation des données
- Consentement explicite (opt-in tracking)
- Transparence (Privacy page)
- Sécurité par défaut

## Contrôles
- En-têtes: CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy
- Cookies: Secure, SameSite, durée de vie maîtrisée
- Auth: sessions sécurisées, CSRF, bruteforce rate-limit
- Input: validation, escaping, ban patterns
- Logs: pas de secrets, masquage IP si requis
- Données: rétention, export/suppression sur demande
- Tiers: inventaire des sous-traitants, clés envoyées par variables d’environnement
