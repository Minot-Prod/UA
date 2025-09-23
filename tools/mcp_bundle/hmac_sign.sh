#!/usr/bin/env bash
set -euo pipefail
if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <secret> <body-json>" >&2
  exit 1
fi
secret="$1"
body="$2"
printf "%s" "$body" | openssl dgst -sha256 -hmac "$secret" -binary | xxd -p -c 256
