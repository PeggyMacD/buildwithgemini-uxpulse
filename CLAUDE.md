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

## Deploying

Automatic. Merging to `main` runs `.github/workflows/deploy.yml`, which builds and
publishes to GitHub Pages. Do not deploy by hand.

Live at https://peggymacd.github.io/buildwithgemini-uxpulse/

Two things to know if a deploy ever looks wrong:

- **The site is served from a subpath**, so the build passes
  `--base=/buildwithgemini-uxpulse/`. Without it every asset 404s and you get a blank
  white page that still returns HTTP 200. When verifying a deploy, check that a JS asset
  loads, not just the page.
- Pages is in **workflow mode** (built by Actions). There is no `gh-pages` branch; it was
  deleted. Don't recreate one.

Surge, the host the course exercise uses, is blocked on this network — that's why this is
GitHub Pages.

To redeploy without a code change: Actions tab → "Deploy to GitHub Pages" → Run workflow.

## Branch protection

`main` is protected by the "Protect Main" ruleset. You **cannot** push to `main` — every
change needs a branch and a pull request, and the `check` status check must be green
before it will merge. Force pushes and deletion are blocked.

Only the `check` job (from `ci.yml`) is a required check. `build` and `deploy` come from
`deploy.yml`, which runs only on `main`, so requiring them would deadlock every PR.

## Conventions

- Tests live next to the code they test (`*.test.jsx`).
- Test what a person would actually do with the thing, not what color it is.
- Keep a pull request to one concern.
- Stage files by name. `git commit -a` sweeps in unrelated modified files from other
  folders in this repo — it has already caused one accidental commit of `test-agent/`.
