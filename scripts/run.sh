#!/usr/bin/env bash
set -euo pipefail

CURRENT_BRANCH="$(git branch --show-current)"

if [[ $# -gt 0 && "$1" != -* ]]; then
  BRANCH="$1"
  shift
else
  BRANCH="${BRANCH:-$CURRENT_BRANCH}"
fi

if [[ -z "$BRANCH" ]]; then
  echo "Error: The current status is 'detached HEAD'. Specify a branch manually."
  exit 1
fi

echo "Running project in branch '$BRANCH'."

if [[ "$BRANCH" != "$CURRENT_BRANCH" ]]; then
  git fetch origin "$BRANCH"
  git checkout "$BRANCH"
fi

if git ls-remote --exit-code --heads origin "$BRANCH" >/dev/null 2>&1; then
  git pull --ff-only origin "$BRANCH"
else
  echo "Local branch '$BRANCH' not found on origin yet; skipping pull."
fi

pnpm install --prefer-offline
pnpm dev "$@"
