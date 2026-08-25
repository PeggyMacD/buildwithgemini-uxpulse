# buildwithgemini-uxpulse

UXPulse — a UX research tool with two sides in one shell: an **admin** side that builds
and analyzes test campaigns, and a **tester** side that runs them. React + Vite, all state
in one context (`uxpulse/src/context/CampaignContext.jsx`), data mocked in
`uxpulse/src/data/mockData.js`, persisted to `localStorage`. There is no backend.

The app lives in the `uxpulse/` subdirectory, not the repo root.

## Before opening any PR

Run this and get it green:

```bash
make pr        # lint + test + generate review.md
```

Then read `review.md`, act on anything real in it, and post it with `make review-post`
once the PR exists.

Do not open a pull request with a red check. If a test fails, fix the code or fix the
test — do not delete the test to make the run pass.

The Claude GitHub App is not available here: this account is org-managed and cannot
provision an Anthropic API key, so automatic per-PR review is off. `make review` is the
substitute — it uses the local `claude -p` login. If an API key ever gets approved, run
`/install-github-app` and this becomes automatic.

## Commands

| Command      | What it does                        |
|--------------|-------------------------------------|
| `make lint`  | oxlint over the app                 |
| `make test`  | vitest, single run                  |
| `make check` | lint + test                         |
| `make review`| AI review of this branch → review.md|
| `make review-post` | post review.md on the PR      |
| `make pr`    | check + review, before opening a PR  |
| `make build` | production build into `uxpulse/dist`|
| `make dev`   | local dev server                    |

## Deploying a preview

Surge is blocked on this network. Previews go to GitHub Pages instead. The site is served
from a subpath, so the base path must be passed at build time or assets 404:

```bash
cd uxpulse && npx vite build --base=/buildwithgemini-uxpulse/
```

Then publish `uxpulse/dist/` to the `gh-pages` branch. Live at
https://peggymacd.github.io/buildwithgemini-uxpulse/

## Conventions

- Tests live next to the code they test (`*.test.jsx`).
- Test what a person would actually do with the thing, not what color it is.
- Keep a pull request to one concern.
