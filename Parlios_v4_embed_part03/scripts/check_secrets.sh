
#!/usr/bin/env bash
set -euo pipefail
missing=0
for v in UA_N8N_BASE_URL; do
  if [ -z "${!v:-}" ]; then
    echo "Missing env: $v"
    missing=1
  else
    echo "OK: $v is set"
  fi
done
exit $missing
