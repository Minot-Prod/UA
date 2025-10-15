# UAS v2 Pack — Switchboard + RAP Central + Tests

> Langage commun pour tous nos agents + 2 agents utilitaires + tests CI prêts à copier-coller.

---

## 1) `UAS_v2.md` — Contrat universel

### 1.1. Objectif
Standardiser les **entrées** et **sorties** de tous les agents (MA, MAP, UA, etc.) afin d’assurer l’interopérabilité, le routage fiable, l’arbitrage et la consolidation.

### 1.2. Entrée — *Blueprint minimal*
```json
{
  "goal": "string (objectif explicite)",
  "context": "ideation | production | analysis | qa",
  "sources": ["MA", "MAP", "External?"],
  "decision_criteria": ["string"],
  "acceptance": ["string"],
  "edge_cases": ["string"],
  "tests": ["string"]
}
```

### 1.3. Sortie — *UAS Block*
```json
{
  "status": "OK | WARN | FAIL",
  "summary": ["string"],
  "decisions": ["string"],
  "justification": ["string"],
  "risks": ["string"],
  "next_actions": [{"owner":"string","action":"string","deadline":"YYYY-MM-DD"}],
  "confidence": 0,
  "sources": ["string"],
  "flags": ["string"],
  "notes": ["string"]
}
```

### 1.4. JSON Schemas
**`schemas/uas_v2_input.schema.json`**
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "uas_v2_input.schema.json",
  "type": "object",
  "required": ["goal", "context"],
  "properties": {
    "goal": { "type": "string", "minLength": 3 },
    "context": { "type": "string", "enum": ["ideation", "production", "analysis", "qa"] },
    "sources": { "type": "array", "items": { "type": "string" } },
    "decision_criteria": { "type": "array", "items": { "type": "string" } },
    "acceptance": { "type": "array", "items": { "type": "string" } },
    "edge_cases": { "type": "array", "items": { "type": "string" } },
    "tests": { "type": "array", "items": { "type": "string" } }
  },
  "additionalProperties": true
}
```

**`schemas/uas_v2_output.schema.json`**
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "uas_v2_output.schema.json",
  "type": "object",
  "required": ["status", "summary", "next_actions", "confidence"],
  "properties": {
    "status": { "type": "string", "enum": ["OK", "WARN", "FAIL"] },
    "summary": { "type": "array", "items": { "type": "string" } },
    "decisions": { "type": "array", "items": { "type": "string" } },
    "justification": { "type": "array", "items": { "type": "string" } },
    "risks": { "type": "array", "items": { "type": "string" } },
    "next_actions": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["owner", "action"],
        "properties": {
          "owner": { "type": "string", "minLength": 1 },
          "action": { "type": "string", "minLength": 3 },
          "deadline": { "type": "string", "pattern": "^\\d{4}-\\d{2}-\\d{2}$" }
        },
        "additionalProperties": false
      }
    },
    "confidence": { "type": "number", "minimum": 0, "maximum": 100 },
    "sources": { "type": "array", "items": { "type": "string" } },
    "flags": { "type": "array", "items": { "type": "string" } },
    "notes": { "type": "array", "items": { "type": "string" } }
  },
  "additionalProperties": true
}
```

### 1.5. Exemples minimalistes
**Input**
```json
{ "goal": "Résumer 3 rapports et proposer 3 actions", "context": "analysis" }
```
**Output**
```json
{ "status":"OK", "summary":["3 rapports lus"], "next_actions":[{"owner":"UA","action":"Publier le résumé"}], "confidence":82 }
```

---

## 2) Agent — **Switchboard (Normaliseur)**

### 2.1. Prompt (mode agent)
```
/run-mode-agent
Name: Switchboard_Normalizer
Assume_Yes: true
Goal: Recevoir n’importe quel output agent et le convertir en UAS v2 (uas_v2_output.schema.json). Rejeter si non conforme.
Scope:
  - Accepter: JSON, YAML, Markdown avec blocs de code.
  - Détecter: champs usuels (result, outcome, plan, risks, todos...).
  - Mapper: vers status/summary/decisions/justification/risks/next_actions/confidence/sources/flags/notes.
  - Valider: JSON Schema (uas_v2_output.schema.json).
  - Émettre: UAS v2 propre + rapport de normalisation.
Acceptance:
  - 100% des champs UAS v2 correctement typés.
  - En cas d’ambiguïté, WARN + mapping documenté dans notes.
  - Si impossible: FAIL + raisons.
I/O Contract:
  - Input: { "raw_payload": string|object }
  - Output: { "uas": UASv2, "report": {"warnings":[], "mapping":{}} }
Steps:
  1) Extraire payload (auto-détection JSON/YAML/MD code fence).
  2) Heuristiques de champs (ex: "result" -> summary, "todo" -> next_actions, etc.).
  3) Compléter défauts (status=OK si pas d’erreurs détectées; confidence=70 par défaut).
  4) Valider contre schema; si erreurs -> status=WARN/FAIL + report.
  5) Retourner objet final + report succinct.
```

### 2.2. Table de mapping (extraits)
```
result|results|summary|synopsis        -> summary[]
conclusion|decision|choice            -> decisions[]
why|rationale|justification|evidence -> justification[]
risk|risks|issues                      -> risks[]
next|todo|task|actions                 -> next_actions[{owner?,action,deadline?}]
confidence|certainty|score            -> confidence (0-100)
src|sources|refs                      -> sources[]
flags|warnings                        -> flags[]
notes|comments                        -> notes[]
```

---

## 3) Agent — **RAP Central (Collecteur/Condenseur)**

### 3.1. Prompt (mode agent)
```
/run-mode-agent
Name: RAP_Central_Condenser
Assume_Yes: true
Goal: Agréger plusieurs sorties UAS v2 et produire un rapport consolidé (résumé, décisions arbitrées, KPIs, next moves).
Scope:
  - Ingestion: liste d’objets UAS v2.
  - Détection des conflits (décisions divergentes).
  - Arbitrage simple: règle UA > MAP > MA (ou pondération par confidence).
  - KPIs: nombre d’items OK/WARN/FAIL, moyenne confidence, % actions assignées.
  - Sortie: UAS v2 (consolidé) + Annexes (tableaux conflits, scoreboard).
Acceptance:
  - Rapport lisible en < 30 lignes.
  - Next actions triées par urgence (deadline) puis impact (heuristique).
I/O Contract:
  - Input: { "uas_list": UASv2[] }
  - Output: { "uas": UASv2, "annexes": {"kpis":{}, "conflicts":[], "scoreboard":[]} }
Steps:
  1) Valider chaque UAS contre le schema.
  2) Fusionner summary/decisions/risks/notes (déduplication).
  3) Arbitrer les décisions contradictoires (règle/pondération).
  4) Générer KPIs + tri des next_actions.
  5) Émettre le rapport consolidé (UAS v2) + annexes.
```

---

## 4) Tests & CI — *Handshake / Routing / Arbitration / Reporting*

### 4.1. Dossiers
```
schemas/
  ├─ uas_v2_input.schema.json
  └─ uas_v2_output.schema.json
.tests/
  ├─ samples/
  │   ├─ sample_input_min.json
  │   ├─ sample_output_min.json
  │   └─ sample_output_conflict.json
  └─ ajv.config.json
```

**`.tests/samples/sample_input_min.json`**
```json
{ "goal": "Synthétiser 3 notes en 5 puces", "context": "analysis" }
```

**`.tests/samples/sample_output_min.json`**
```json
{
  "status": "OK",
  "summary": ["3 notes analysées"],
  "decisions": ["Publier le résumé"],
  "next_actions": [{"owner":"UA","action":"Publier"}],
  "confidence": 75
}
```

**`.tests/samples/sample_output_conflict.json`**
```json
[
  { "status":"OK", "summary":["A"], "decisions":["Go"], "next_actions":[{"owner":"MAP","action":"Ship"}], "confidence": 60 },
  { "status":"OK", "summary":["B"], "decisions":["No-Go"], "next_actions":[{"owner":"MA","action":"Refactor"}], "confidence": 55 }
]
```

**`.tests/ajv.config.json`**
```json
{ "strict": false }
```

### 4.2. GitHub Actions — Validation contrat
**`.github/workflows/uas_contract_check.yml`**
```yaml
name: UAS Contract Check
on:
  pull_request:
  push:
    branches: [ main ]
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Install validator
        run: |
          npm --version
          npm i -g ajv-cli@5 yamljs
      - name: Validate input schema (sample)
        run: |
          ajv validate -s schemas/uas_v2_input.schema.json -d .tests/samples/sample_input_min.json --config .tests/ajv.config.json
      - name: Validate output schema (sample)
        run: |
          ajv validate -s schemas/uas_v2_output.schema.json -d .tests/samples/sample_output_min.json --config .tests/ajv.config.json
```

### 4.3. Tests fonctionnels (agents)
**`scripts/test_switchboard.mjs`** (pseudo)
```js
import fs from 'node:fs'
import { normalizeToUAS } from './switchboard_core.mjs'
const raw = fs.readFileSync('.tests/samples/sample_output_min.json','utf8')
const uas = await normalizeToUAS(JSON.parse(raw))
console.log(JSON.stringify(uas,null,2))
```

**`scripts/test_rap_central.mjs`** (pseudo)
```js
import fs from 'node:fs'
import { consolidateUAS } from './rap_central_core.mjs'
const raw = fs.readFileSync('.tests/samples/sample_output_conflict.json','utf8')
const list = JSON.parse(raw)
const out = await consolidateUAS(list)
console.log(JSON.stringify(out,null,2))
```

> Remarque: les `*_core.mjs` peuvent d’abord être des wrappers qui appellent nos prompts “mode agent”, ou devenir du code pur si on bascule certaines règles côté Node.

---

## 5) How-To (intégration rapide)
1. Créer les dossiers `schemas/`, `.tests/`, `scripts/` dans ton repo.
2. Coller les fichiers ci-dessus.
3. Ajouter le workflow `uas_contract_check.yml`.
4. Créer deux nouveaux GPT/agents:
   - **Switchboard_Normalizer** (prompt §2.1)
   - **RAP_Central_Condenser** (prompt §3.1)
5. Optionnel: brancher les adapteurs sur 3–5 agents existants et lancer un PR pour voir le check passer en vert.

---

## 6) Roadmap courte
- J+0: Standard figé + CI qui valide.
- J+1: Switchboard en front de tous les agents existants.
- J+2: RAP Central qui publie un **rapport consolidé quotidien** (UAS v2) + envoi Notion/Discord.
- J+3: KPIs & dashboards (confidence moyen, % WARN/FAIL, taux d’actions clôturées).

> Résultat: on parle **un seul langage**. Les agents deviennent **plug-and-play**. Les rapports sont **propres, comparables, et actionnables**.

