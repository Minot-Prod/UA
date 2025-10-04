# 📘 Parlios — Carte des Rôles et Interventions  
**Version :** 2025-10-04  
**But :** Identifier les étapes où l’intervention humaine (toi, Chef) est nécessaire, et celles entièrement gérables par les agents IA (UA/MAP/QA).

---

## 🧩 Vue d’ensemble

Cette carte complète la **Méthode Optimisée Finale Parlios (UA/Base44/Yomi)**.  
Elle sépare clairement :
- **Les moments où ton jugement ou ta vision sont indispensables**  
- **Les étapes que le système peut exécuter de manière autonome**  

Tu peux l’utiliser avant chaque projet pour décider si tu t’impliques ou laisses l’IA tourner seule.

---

## 🗺️ Tableau des Interventions

| Étape | Description | Responsable principal | Intervention humaine requise ? | Détail |
|:------|:-------------|:----------------------|:-------------------------------|:--------|
| **R1 — Cadrage minimal** | Définir le problème, la valeur, la cible | 🧠 **Toi (Chef)** | ✅ **Oui (essentiel)** | C’est ta vision stratégique. Personne d’autre ne peut définir la direction. |
| **R2 — Maquette conceptuelle** | Prototype ou wireframe rapide | 🤖 UA | ⚙️ Optionnelle | Tu peux valider visuellement, mais UA peut générer seul une version test. |
| **R3 — Validation rapide (3 questions)** | Vérification qualité & cohérence | 🤖 UA | ⚙️ Optionnelle | UA valide via checklists, tu peux lire le résumé Go/Ajustements. |
| **C1 — Définition complète** | Spécifications fonctionnelles & techniques | 🤖 MAP | ❌ Non | Étape purement technique, automatisée selon la méthode. |
| **C2 — Production (code)** | Génération du code complet + README | 🤖 MAP | ❌ Non | Pas de plus-value humaine ici. |
| **C3 — Qualité (Perf/A11Y/Sécu/UX)** | Tests Lighthouse, axe-core, Semgrep | 🤖 QA Guardian | ⚙️ Optionnelle | Tu peux consulter un rapport vulgarisé si tu veux suivre la qualité. |
| **C4 — Handoff CI/CD** | Préparation CI/CD + release drafter | 🤖 Ops Agent | ❌ Non | Automatisable à 100 %. |
| **C5 — UAS JSON & Décision finale** | Rapport de synthèse + verdict | 🧠 **Toi (Chef)** | ✅ **Oui (final)** | C’est ton arbitrage : Go / Ajustements / No-Go. |

---

## 🧭 Schéma simplifié

```mermaid
flowchart LR
  subgraph Humain (Chef)
    A1[Définir la Vision (R1)]
    A2[Valider la Direction (R2-R3)]
    A3[Décider du Go final (C5)]
  end
  subgraph Agents IA (UA / MAP / QA / Ops)
    B1[Définition complète (C1)]
    B2[Production (C2)]
    B3[Qualité & CI/CD (C3-C4)]
  end
  A1 --> B1
  B1 --> B2 --> B3
  B3 --> A2
  A2 --> A3
```

🔗 [Ouvrir dans Mermaid Live Editor](https://mermaid.live/edit#pako:eNp1kM1qwzAMhl_F8k7AlyDF3mBFVbbiwKraJxF2UVqWqHMGg0nYz8YpKlE9uN3EnHuQfy7HxPjoXKHj6yyXoAms2q8vIfYoAqgB44Y3akgDCKqgBuWnH06i-LKjyIE7-LBMiPvJ8EoyxPZ6zGDNJHsbjMIadIGiN_L6IARtVk4bn3nmgC8FgQMb00wr8ThZqvblxEoUSaFPuyA59KjT3SDCGXcBYL7eAYiE9Z0H6pVrRjOcUdZ7eMbbzAKhCktbLk4rmuDjXrwzm-PmlxxRCuMqa04qEm3x7gAAOZ7ZCO7tw8uv_p4ydQw)

---

## 🎯 Interprétation rapide

- **🧠 Toi (Chef)** : tu interviens au *début* et à la *fin* — les deux moments où la direction et la validation demandent du jugement humain.  
- **🤖 Les agents IA (UA / MAP / QA / Ops)** : assurent 100 % de la conception, de la production et du contrôle technique.  
- **⚙️ Optionnel** : tu peux consulter les synthèses mais sans nécessité d’action.

---

## 💰 Impact sur ton temps et ton ROI

| Domaine | Intervention humaine | Délégation IA | Gain estimé |
|:---------|:----------------------|:--------------|:-------------|
| Stratégie & Vision | 30 % | 70 % | 💡 Tu concentres ton énergie sur la direction et la valeur. |
| Production technique | 0 % | 100 % | 🚀 Aucun temps perdu sur le code ou la CI. |
| Contrôle qualité | 15 % | 85 % | 📊 Tu n’interviens que pour arbitrer des rapports simplifiés. |
| Publication & déploiement | 0 % | 100 % | ⚙️ Entièrement automatisé. |
| Décision finale | 100 % | 0 % | 🧠 C’est ton leadership qui conclut le cycle. |

---

## 🧩 En résumé
Ta plus-value réside dans :
1. **La Vision** — donner du sens et une direction.
2. **L’Arbitrage** — décider rapidement Go/No-Go.
3. **L’Inspiration** — influencer la forme finale par ton intuition.

Tout le reste — code, QA, pipeline, standards — tourne **seul**, sous supervision d’UA.  
