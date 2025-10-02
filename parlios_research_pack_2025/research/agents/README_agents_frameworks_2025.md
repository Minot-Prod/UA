# Agents Frameworks 2025 — LangGraph, MetaGPT, comparatifs

## 1. LangGraph
- **Type** : librairie “state machine” pour LLM agents (Python).
- **Forces** : contrôle fin, reprise sur erreur, persistance, memory stores.
- **Installation** :
```bash
pip install langgraph
```
- **Exemple minimal** :
```python
from langgraph.graph import StateGraph
graph = StateGraph()
graph.add_node("start", lambda _: {"message": "Hello"})
graph.run()
```
- **Use cases** : orchestration d’équipes UA (MA/MAP/QA/Ops).
- **Source** : LangChain blog 2025.

## 2. MetaGPT
- **Type** : framework multi-agents SOP (décompose un projet en rôles PM, Architecte, Dev).
- **Installation** :
```bash
pip install metagpt
```
- **Exemple minimal** :
```python
from metagpt.software_company import SoftwareCompany
company = SoftwareCompany()
company.run("Créer une app TODO simple")
```
- **Sources** : ICLR paper + repo.

## 3. Comparatif 2025 (LangGraph, CrewAI, Agno, DSPy…)
- **Points clés** :
  - LangGraph → robustesse.
  - CrewAI → collab légère.
  - DSPy → prompting optimal.
  - MetaGPT → structure hiérarchique.
