#!/usr/bin/env bash
set -euo pipefail

BUILD_DIR="site"
BRANDING_DIR="vendor/branding"
SEO_DIR="vendor/seo"
DEVOPS_DIR="vendor/devops-netlify"
ANALYTICS_DIR="vendor/analytics"

mkdir -p "$BUILD_DIR/assets/brand" "$BUILD_DIR/assets/js"

# Branding
cp -f "$BRANDING_DIR"/favicon*.png "$BUILD_DIR/assets/brand/" 2>/dev/null || true
cp -f "$BRANDING_DIR"/favicon.ico "$BUILD_DIR/assets/brand/" 2>/dev/null || true
cp -f "$BRANDING_DIR"/opengraph.png "$BUILD_DIR/assets/brand/" 2>/dev/null || true
cp -f "$BRANDING_DIR"/manifest.webmanifest "$BUILD_DIR/manifest.webmanifest" 2>/dev/null || true

# SEO
cp -f "$SEO_DIR"/sitemap.xml "$BUILD_DIR/sitemap.xml" 2>/dev/null || true
cp -f "$SEO_DIR"/robots.txt "$BUILD_DIR/robots.txt" 2>/dev/null || true

# Netlify headers/redirects
mkdir -p "$BUILD_DIR/netlify"
cp -f "vendor/devops-netlify/_headers" "$BUILD_DIR/netlify/_headers" 2>/dev/null || true
cp -f "vendor/devops-netlify/_redirects" "$BUILD_DIR/netlify/_redirects" 2>/dev/null || true
cp -f "vendor/devops-netlify/_headers" "$BUILD_DIR/_headers" 2>/dev/null || true
cp -f "vendor/devops-netlify/_redirects" "$BUILD_DIR/_redirects" 2>/dev/null || true

# Analytics
cp -f "$ANALYTICS_DIR/assets/js/analytics.js" "$BUILD_DIR/assets/js/analytics.js" 2>/dev/null || true

echo "Assemble done."
