
#!/usr/bin/env bash
set -euo pipefail
TS=$(date +%Y%m%d)
mkdir -p deliverables/ua
cat > deliverables/ua/UA_Report_${TS}.md <<'MD'
# UA Report — $(date +%Y-%m-%d)

## Summary
- E2E executed.

## Decisions
- Keep Base44 constraints (checkpoint 70%)

## Risks
- Secrets invalid / TLS / CORS

## Next actions
- Enable Notion/Sheets mirror (optional)
MD
echo "Report created at deliverables/ua/UA_Report_${TS}.md"
