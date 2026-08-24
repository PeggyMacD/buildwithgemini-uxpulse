# buildwithgemini-uxpulse

UXPulse — a UX research tool with two sides in one shell: an **admin** side that builds
and analyzes test campaigns, and a **tester** side that runs them. React + Vite, all state
in one context (`uxpulse/src/context/CampaignContext.jsx`), data mocked in
`uxpulse/src/data/mockData.js`, persisted to `localStorage`. There is no backend.

The app lives in the `uxpulse/` subdirectory, not the repo root.

## Before opening any PR

Run both and get them green:

```bash
make lint
make test
```

Do not open a pull request with a red check. If a test fails, fix the code or fix the
test — do not delete the test to make the run pass.

## Commands

| Command      | What it does                        |
|--------------|-------------------------------------|
| `make lint`  | oxlint over the app                 |
| `make test`  | vitest, single run                  |
| `make check` | lint + test                         |
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
