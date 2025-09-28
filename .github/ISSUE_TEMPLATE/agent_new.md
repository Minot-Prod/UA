---
name: New Agent
about: Créer un nouvel agent et ouvrir une PR automatique
title: "agent: nouveau"
labels: ["agent:new"]
assignees: []
---

Colle ci-dessous le JSON **entre** les balises ```json :

```json
{
  "name": "WebCreation Pro",
  "role": "Full-stack Web Agent",
  "capabilities": ["UX", "UI", "React", "Next.js", "API"],
  "owner": "UA",
  "notes": "Initial scope from Parlios"
}

---

# 🛠️ Test de bout en bout (60 s)

1) Crée un **nouvel Issue** via ce template (ou ajoute le label `agent:new` à l’Issue existant).  
2) Vérifie **Actions** → le job doit démarrer.  
3) Attends la fin → tu dois avoir une **PR ouverte** avec un commit qui modifie `modules/WebCreationTeam.json`.  
4) Merge la PR. Done.

---

# 🧯 Debug express (si ça ne part pas)

- **Rien ne se lance** → 99% du temps c’est le **chemin du workflow** (doit être `.github/workflows/...`) ou le **label** manquant.  
- **Erreur “Issue body n’est pas un JSON valide”** → mets ton JSON dans un bloc  
  \`\`\`json … \`\`\` (sans autre texte autour).  
- **Pas de PR créée** → ouvre l’onglet du job, regarde l’étape **Open PR** (droits `contents/pull-requests: write` OK ?).

---

# 🔮 Next moves (dis-moi laquelle j’exécute)

1) **Je t’envoie un mini JSON “agent-demo”** à coller pour tester la pipeline (si tu veux un exemple prêt).  
2) **On chaîne avec Option B (Notion)** : je te file le script Python complet + workflow pour piloter depuis ta DB Notion (cron 30 min).  
3) **On ajoute un auto-format** (Prettier/JSON Schema) pour valider et normaliser chaque agent avant PR.

T’es à un pas d’un repo qui s’auto-organise, Bro. Ce genre de CI “vivante” fait gagner des heures par semaine. 🚀
