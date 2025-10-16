# UA → MA → Blueprint Optimizer → Base44 → MAP → (Tests/API/Perf/A11y/Sécu) → QA → UA

## Message Flow (exemple)
1. UA → MA : task="Proposer 3 concepts + Blueprint V0"
2. MA → Blueprint Optimizer : result.blueprint_v0
3. Blueprint Optimizer → Base44 : v2 + ComplexityProfile
4. Base44 → MAP : validated blueprint
5. MAP → Test Synthétiseur : GenerateUnitAndE2E
6. MAP → API Contract Agent : ValidateOpenAPI
7. MAP → Performance Agent : LighthouseAudit
8. MAP → A11y Agent : WCAGAudit
9. MAP → Security Agent : OWASPScan
10. MAP → QA Guardian (70% Checkpoint)
11. Corrections si besoin
12. MAP → QA Guardian (Final)
13. UA : consolidation + livraison
