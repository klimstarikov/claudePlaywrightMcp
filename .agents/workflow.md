# How This Team Works

_Derived from PR sampling on 2026-06-17. 5 merged PRs reviewed (#1, #2, #3, #4, and recent direct commits). Refresh when the team's patterns shift._

## Git host

- **Host**: GitHub
- **Remote URL**: `https://github.com/klimstarikov/claudePlaywrightMcp`
- **CLI of choice**: `gh` (GitHub CLI) or GitHub MCP server (the `git-pr.agent.md` agent uses GitHub MCP instead of `gh`)
- **Unit of change**: Pull Request
- **Host-specific conventions**: squash merge; no required reviewer count confirmed; PRs merge to `main`

## PRs sampled

- Feature + tests: #1 (demo-scenario1 merge), #2 (merge), #3 (sale tags + docs), #4 (remove outdated docs)
- Framework / infrastructure: recent direct commits (`.gitignore`, BDD structure updates)
- Total merged PRs scanned: ~5 (small repo, active early development)

## Team & roles

- **Who authors tests**: single contributor (Klim Starykau) — Axel (test-automation-engineer) as implementer when running the pipeline
- **Who authors framework/infra changes**: same contributor, occasionally via direct commits to `leap_agent` branch
- **Review / approval gates**: human-approved; PRs require a merge by the author (no mandatory external reviewers confirmed from history)

## Review gates

- Typical reviewer count: 1 (self-review pattern observed)
- Consistently-flagged conventions (from `.github/instructions/`):
  - No locators or `page.*` calls in spec files
  - Import `test`/`expect` from fixtures, not `@playwright/test`
  - Every POM method has JSDoc + explicit return type
  - No `waitForTimeout` (one documented exception in `hoverMenMenu`)
- Code-owner files: none detected (`CODEOWNERS` absent)

## Branching & commits

- Branch naming: descriptive slugs — `demo-scenario1`, `leap_agent`; no strict ticket-prefixed convention observed
- Commit message style: Conventional Commits (`feat(scope): description`, `test(scope): description`, `chore(scope): description`, `fix(scope): description`)
  - Example: `feat: add sale tags test, password reset page, and docs updates (#3)`
  - No JIRA ticket keys in commit messages or PR titles (enforced in `.github/instructions/conventional-commits.instructions.md`)
- Ticket linking: not observed in PR descriptions

## Test delivery pattern

- Tests ship **with** the feature in the same PR — no separate test PRs observed
- Feature files (Gherkin) added alongside new specs in the same commit
- Page objects, fixtures registration, and specs added together

## CI gates

- Required checks: `Playwright Tests` (GitHub Actions job) — runs `npx playwright test`
- No auto-merge configured
- No required labels to merge observed

## Patterns observed in practice

- New page objects: create `src/pages/<name>.page.ts` → register in `page-fixtures.ts` → write spec in `tests/` → add Gherkin in `features/` (PR #3 pattern)
- New helpers: added to `src/helpers/<topic>.helper.ts`, imported in spec files
- BDD living docs: `.feature` files are added as documentation alongside specs but never wired to a Cucumber runner

## Evolution signals

- Infra PRs per month: ~1–2 (small active repo, early stage)
- Typical author of infra changes: Klim Starykau
- Last major framework change: BDD structure update + page object instruction files (recent commits on `leap_agent`)

## Unconfirmed

- No `CODEOWNERS` file — code ownership is informal
- Merge strategy: squash assumed from GitHub defaults; not explicitly configured in repo settings
- No branch protection rules confirmed (no `.github/branch-protection.json` or equivalent observed)
