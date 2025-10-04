#!/usr/bin/env bash
set -euo pipefail
echo "== RC Check =="
pushd demo-next >/dev/null
  npm i
  npm run build
popd >/dev/null
echo "OK: build export"
