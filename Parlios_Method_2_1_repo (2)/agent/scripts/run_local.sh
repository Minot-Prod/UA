#!/usr/bin/env bash
set -e
mkdir -p dist
# Génération simulée
echo '<!doctype html><title>Parlios</title>' > dist/index.html
echo '{"ok":true}' > qa_report.json
