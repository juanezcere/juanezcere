#!/usr/bin/env bash
set -euo pipefail

SOURCE_BRANCH="${1:-${BRANCH:-}}"
TARGET_BRANCH="${2:-${TARGET_BRANCH:-main}}"

if [[ -z "$SOURCE_BRANCH" ]]; then
  echo "Error: The source branch is mandatory."
  echo "Usage: $0 <source_branch> [target_branch: dev|qa|main]"
  echo "   or: BRANCH=<source_branch> TARGET_BRANCH=<target_branch> $0"
  exit 1
fi

if [[ ! "$TARGET_BRANCH" =~ ^(dev|qa|main)$ ]]; then
  echo "Error: Invalid target branch '$TARGET_BRANCH'. Allowed values: dev, qa, main."
  exit 1
fi

if [[ "$SOURCE_BRANCH" == "$TARGET_BRANCH" ]]; then
  echo "Error: Source and target branch cannot be the same ('$SOURCE_BRANCH')."
  exit 1
fi

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Warning: You have uncommitted or untracked changes:"
  git status --short
  echo ""
  read -r -p "Do you want to continue anyway? [y/N]: " confirm
  if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
    echo "Deployment aborted by user."
    exit 1
  fi
fi

echo "Syncing and checking out '$SOURCE_BRANCH'..."
git fetch origin
git checkout "$SOURCE_BRANCH"
if git ls-remote --exit-code --heads origin "$SOURCE_BRANCH" >/dev/null 2>&1; then
  git pull --ff-only origin "$SOURCE_BRANCH"
fi

echo "Running validations on '$SOURCE_BRANCH'..."
pnpm install --frozen-lockfile
pnpm type-check
pnpm lint
pnpm build

promote_branch() {
  local from_branch="$1"
  local to_branch="$2"

  echo "Promoting '$from_branch' -> '$to_branch'..."
  git checkout "$to_branch"
  git pull --ff-only origin "$to_branch"
  git merge --no-edit "$from_branch"
  git push origin "$to_branch"
}

PIPELINE=("dev" "qa" "main")
CURRENT_FROM="$SOURCE_BRANCH"
PROMOTED=false

for stage in "${PIPELINE[@]}"; do
  if [[ "$SOURCE_BRANCH" == "dev" && "$stage" == "dev" ]]; then
    continue
  fi
  if [[ "$SOURCE_BRANCH" == "qa" && ( "$stage" == "dev" || "$stage" == "qa" ) ]]; then
    continue
  fi

  promote_branch "$CURRENT_FROM" "$stage"
  CURRENT_FROM="$stage"
  PROMOTED=true

  if [[ "$stage" == "$TARGET_BRANCH" ]]; then
    break
  fi
done

if [[ "$PROMOTED" == false ]]; then
  echo "Error: Cannot promote '$SOURCE_BRANCH' backwards to '$TARGET_BRANCH'."
  git checkout "$SOURCE_BRANCH"
  exit 1
fi

git checkout "$SOURCE_BRANCH"
echo "Deployment pipeline up to '$TARGET_BRANCH' completed successfully!"
