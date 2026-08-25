#!/usr/bin/env bash
# Generate an AI review of the current branch against main.
# Writes review.md (gitignored). Does not post anything -- see `make review-post`.
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" = "main" ]; then
  echo "You're on main -- there's nothing to review. Make a branch first." >&2
  exit 1
fi

git fetch -q origin main

# A huge diff makes for a vague review and a slow one. Send the shape of the
# change plus a capped slice of the detail.
STAT=$(git diff --stat origin/main...HEAD)
DIFF=$(git diff origin/main...HEAD | head -600)

if [ -z "$STAT" ]; then
  echo "No changes against origin/main yet." >&2
  exit 1
fi

echo "Reviewing $BRANCH against origin/main..." >&2

claude -p "You are reviewing a pull request on UXPulse, a React + Vite UX research
app. Read CLAUDE.md for context if you need it.

Write a short markdown review, under 25 lines total:
1. Real bugs or risks in this diff. Be specific about what breaks and when. If
   there are none, say so plainly instead of inventing something.
2. A small ASCII diagram of how the changed files fit into the project.

Skip praise, skip summarising the diff back to me.

Files changed:
$STAT

Diff (may be truncated):
$DIFF
" > review.md

echo "" >&2
echo "Wrote review.md. Read it, then run 'make review-post' to put it on the PR." >&2
