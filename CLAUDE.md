# claudePlaywrightMcp

Playwright + TypeScript E2E test automation suite for [automationteststore.com](https://automationteststore.com/) — a public demo e-commerce store used as the application under test (AUT).

## Stack

- **Language/Runtime:** TypeScript 5.x / Node.js 20
- **Framework:** Playwright 1.58.2
- **Browser:** Chromium (headless)
- **Pattern:** Page Object Model (POM) + BDD-style specs with `test.step()` mapping Gherkin steps

## Essential Commands

```bash
# Install
npm install
npx playwright install chromium

# Run all tests
npx playwright test

# Run a single spec
npx playwright test tests/sale-tags.spec.ts

# Run by scenario name
npx playwright test --grep "Sale tag"

# Debug
npx playwright test --debug

# View HTML report
npx playwright show-report
```

## Critical Conventions

- **Never import from `@playwright/test` in spec files** — always import from `../src/fixtures/page-fixtures`
- **No locators or `page.*` calls in spec files** — POM methods and helpers only
- **No `page.waitForTimeout()`** — use `waitForPageLoad()` or Playwright's built-in auto-waiting
- **New page objects** must be registered in `src/fixtures/page-fixtures.ts` (type + `test.extend()`)
- Commit style: Conventional Commits — `feat(pages): add X`, `test(tests): add Y`, `fix(helpers): correct Z`
- Feature files in `features/` are living docs only — not executed by Cucumber

## Key Paths

- Page objects: `src/pages/` — all extend `BasePage` (`src/pages/base.page.ts`)
- Fixtures (DI): `src/fixtures/page-fixtures.ts` — single source of truth
- Helpers: `src/helpers/` — pure functions, accept page objects not raw `Page`
- Specs: `tests/` — one spec per feature file in `features/`
- Playwright config: `playwright.config.ts` — baseURL, timeout, reporter settings
- CI: `.github/workflows/playwright.yml` — runs on push/PR to `main`

## Full Reference

See `AGENTS.md` for complete stack details, conventions, CI/CD, and architecture.
