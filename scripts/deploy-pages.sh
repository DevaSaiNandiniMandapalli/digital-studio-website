#!/usr/bin/env bash
# Build with the GitHub Pages base path and publish dist/ to the gh-pages branch.
set -euo pipefail

REPO_SLUG="${REPO_SLUG:-DevaSaiNandiniMandapalli/digital-studio-website}"
BASE="${BASE_PATH:-/digital-studio-website/}"
BRANCH="${BRANCH:-gh-pages}"

cd "$(dirname "$0")/.."
echo "Building with BASE_PATH=$BASE"
BASE_PATH="$BASE" npm run build

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
cp -r dist/. "$tmp/"
touch "$tmp/.nojekyll"

cd "$tmp"
git init -q
git add -A
git -c user.name="github-actions" -c user.email="actions@github.com" \
  commit -q -m "Deploy $(date -u +%Y-%m-%dT%H:%M:%SZ)"
git push -f "https://github.com/${REPO_SLUG}.git" "HEAD:${BRANCH}"
echo "Published to ${BRANCH}."
