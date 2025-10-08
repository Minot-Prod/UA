# UA Memory Log — 2025-10-08

## Décision stratégique (Yomi)
On sort du “l’IA te répond” pour entrer dans “l’IA **agit** dans ton flux de travail”. Pour UA/Parlios :
- **Apps SDK** (ChatGPT) : mini‑app Parlios **dans** la conversation → friction 0 pour piloter/hard‑demo.
- **Agents d’exécution** (AgentKit/n8n) : passer du plan à l’action (brouillons, classements, calendriers, mails).
- **Claude Computer Use (sandbox)** : joker pour tâches sans API (cliquer, remplir, déposer, capturer) en environnement isolé.
- **Vidéo IA intégrée** (Vibes/Sora‑like) : maillon “hooks validés → short brandé” pour augmenter la portée.

## Ce qui n’est pas prioritaire
- **ChatGPT Tasks** (prompts planifiés) : utile mais doublon avec nos automations (n8n/Actions).

## Impacts
- **UX** : piloter Parlios sans quitter le chat (démos/adhésion plus rapides).
- **Vélocité** : cycles idée→brouillon→planif plus courts.
- **Couverture** : les trous d’intégration sont comblés par le “computer use” (prototype rapide).
- **Portée contenu** : vidéos courtes régulières → plus d’audience.

## Garde‑fous
- Respect Base44 (Blueprint + CREDIT_LOG + checkpoint 70%). 
- Journaliser toute exécution agent (logs + traces QA).
- Sandbox stricte pour toute action “ordinateur”.
