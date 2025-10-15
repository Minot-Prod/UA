# Agents — Rôles & Handoff

| Agent | Rôle | Entrées | Sorties | Handoff |
|------|------|---------|---------|---------|
| Orchestrateur GitHub‑First | Code, PR, workflows | Brief JSON | PR + artifacts | → QA Guardian |
| Base44‑Scout | Design, doc, ton | Brand & objectifs | Assets/Docs | → Orchestrateur |
| QA Guardian | QA blocante | Build URL | Scores + rapports | → Netlify‑Deployer |
| Netlify‑Deployer | Previews & prod | Build validé | URL déployée | → MAP |
| MAP | Monitoring | Rapports CI/Netlify | STATUS.md + REPORT.md | → Pilote |

**Règle** : chaque agent **lit** le repo avant d'écrire.
