---
project: claudePlaywrightMcp
team: test-automation
default-branch: main
languages: [typescript]
---

# claudePlaywrightMcp

Playwright + TypeScript E2E test automation suite targeting [automationteststore.com](https://automationteststore.com/) — a public demo e-commerce store. The suite is BDD-style: Gherkin feature files serve as living documentation, Playwright specs map each scenario to `test.step()` blocks.

## Tech Stack

- Playwright 1.58.2 + TypeScript 5.x / Node.js 20
- Chromium (headless, 1280x720)
- Page Object Model (POM) + custom fixtures via `test.extend()`
- GitHub Actions CI

## Build & Test

- Install: `npm install && npx playwright install chromium`
- Test (local): `npx playwright test`
- Test (single): `npx playwright test tests/<name>.spec.ts`
- Report: `npx playwright show-report`

## Conventions

- Import `test` / `expect` from `src/fixtures/page-fixtures` — never from `@playwright/test`
- No locators or `page.*` calls in spec files — POM + helpers only
- No `page.waitForTimeout()` (one exception: `hoverMenMenu()` in `home.page.ts`)
- Conventional Commits — no JIRA keys in commit messages

## Project systems

_Captured during seeding-a-project on 2026-06-17._

### Bug filing (when QA discovers a defect during test-case-analysis)

- **Style**: github-issue
- **Target project/board**: klimstarikov/claudePlaywrightMcp (GitHub Issues)
- **Bundling policy**: strict-per-bug
- **Link originating case**: yes

### Test case storage
- **Source of truth**: `features/` (Gherkin `.feature` files — living documentation)
- **Generated documents**: `test-cases-output/` (markdown, for reference only)

### Automation PR policy

- **Base branch for automation PRs**: main
- **Merge policy**: human-approved
- **Squash / rebase / merge commit**: squash
