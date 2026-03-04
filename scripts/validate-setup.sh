#!/usr/bin/env bash
set -euo pipefail

echo "[1/3] Building app..."
npm run build >/dev/null

echo "[2/3] Checking required project files..."
test -f src/config.ts
test -f src/utils/tracking.ts
test -f GOOGLE-SCRIPTS-DRIVE-SETUP.md
test -f scripts/google-apps-script/automation.gs

echo "[3/3] Checking route references..."
rg -n "['\"]/((sales|quiz|checkout|thank-you|dashboard|print-version|bonus-materials))['\"]" src/main.tsx >/dev/null

echo "Setup validation passed ✅"
