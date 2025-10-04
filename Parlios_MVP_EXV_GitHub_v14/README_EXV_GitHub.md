# Parlios — EXV Étape 14 · Plans & Freemium gating (v14)

Objectif : ajouter **Free / Pro / Pro+**, flags de fonctionnalités, paywall léger, et **metering** côté front (MVP).  
- **Plan courant** via cookie `parlios.plan` (`free` par défaut).  
- **FeatureGate** côté front vérifie les flags → affiche contenu ou **Paywall**.  
- **Metering** simple (localStorage) : compte livrables/jour & tokens IA/jour.  
- **Upgrade** : page `/upgrade` avec call-to-action (URL facturation configurable).

> En prod : répliquer l’enforcement côté backend (entête `X-Parlios-Plan` + vérif serveur) et brancher un vrai billing.
