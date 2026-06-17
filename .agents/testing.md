# Testing

> Scout-generated on 2026-06-17. Update when the framework, run commands, or
> conventions change. Agents read this before adding tests.

## Framework

- **Name + version:** Playwright 1.58.2 (`@playwright/test`)
- **Language:** TypeScript 5.x (strict, ES2022)
- **Why this stack:** Project was built for Playwright from the start — no migration history.

## Run commands

- **Single test, local:** `npx playwright test tests/<name>.spec.ts --grep "scenario name" --reporter=list`
- **Whole suite, local:** `npx playwright test`
- **CI variant:** `npx playwright test` (same command; `retries: 1` activates via `process.env.CI`)
- **Differences to flag:**
  - Local: `retries: 0`, HTML + list reporters
  - CI: `retries: 1`, HTML report uploaded as artifact on failure
  - Both: headless Chromium, 1280x720, baseURL `https://automationteststore.com/`

## Structure

- **Tests live in:** `tests/` (spec files) and `features/` (Gherkin docs — not executed)
- **Folder roles:**
  - `tests/` — spec files; one per feature, named `<feature-name>.spec.ts`
  - `src/pages/` — Page Object classes, one per physical page/screen
  - `src/fixtures/` — `page-fixtures.ts` is the single source of truth for dependency injection (DI)
  - `src/helpers/` — utility functions grouped by topic (`cart.helper.ts`, `navigation.helper.ts`)
  - `features/` — Gherkin `.feature` files; living documentation only, never executed by Cucumber
  - `test-cases-output/` — generated test case markdown documents (for reference)
  - `playwright-report/` — HTML report output (gitignored)
  - `test-results/` — screenshots and traces on failure (gitignored)

## Test data strategy

- **Where data lives:** inline in spec files (product names, expected text, URL paths)
- **Generation pattern:** generate-per-test — no shared fixtures that need cleanup; each test opens a fresh browser context
- **Cleanup ownership:** none needed — AUT is a stateless public demo site; no accounts are created or modified
- **Anything project-specific:** tests rely on the live site's current product catalog; if the AUT changes its product data, tests for specific product names may need updating

## Hooks, fixtures, and run-mode policy

- **Auto-applied hooks:** `page-fixtures.ts` auto-instantiates all page objects via `test.extend()` — every spec gets `homePage`, `productPage`, `checkoutPage`, `accountPage`, etc. injected; no manual `new` calls needed
- **Project-wide teardown:** none — browser context is isolated per test automatically
- **Serial vs parallel rule:** no serial mode configured; tests are independent and run in parallel by default. If a future test has shared state (e.g. cart contents persisting), apply `test.describe.configure({ mode: 'serial' })` to that describe block and document the reason

## Locator strategy

- **Ladder (preferred order):**
  1. `getByRole` with accessible name
  2. `getByLabel` / `getByPlaceholder`
  3. `getByText`
  4. CSS selector (last resort — add a comment explaining why)
- **Stop+flag rule:** if a target element has no accessible role/label and CSS would be brittle, pause and surface the gap to Tal rather than guessing
- **Existing testid convention:** AUT does not use `data-testid` attributes — rely on semantic locators and stable CSS class patterns
- **Known AUT quirks:**
  - Product name link class is `a.prdocutname` (intentional typo on the live site — do not "fix" it)
  - Men's Skincare: there are TWO `Skincare` links in the category nav; target `.nth(1)` for Men's Skincare
  - Sale tag: `span.sale` — verified present on discounted product cards
  - Strikethrough original price: `.priceold`

## Reporters & evidence

- **Local artifacts:** `playwright-report/` (HTML), `test-results/` (screenshots + traces on failure)
- **CI artifacts:** HTML report uploaded as `playwright-report` artifact on job failure
- **Step logger:** `test.step()` — every Gherkin step is wrapped; no Allure integration

## CI integration

- **Workflow file:** `.github/workflows/playwright.yml`
- **Trigger:** push to `main`, PRs targeting `main`
- **Timeout & retry policy:** 30s per test; 1 retry in CI (`process.env.CI`)
- **Coverage threshold:** N/A — E2E only, no coverage tooling configured

## Conventions to follow when adding tests

- Import `test` and `expect` from `../src/fixtures/page-fixtures` (not `@playwright/test`)
- One `describe` per feature, named to match the Gherkin Feature heading exactly
- Test title must match Gherkin Scenario title exactly
- Steps use `Given` / `When` / `Then` / `And` prefixes inside `test.step()` strings
- All interactions and assertions through POM methods or helpers — no inline `page.*` calls or selectors in specs
- When adding a new page object: create `src/pages/<name>.page.ts`, register in `src/fixtures/page-fixtures.ts` (type + `test.extend()` block), and add methods with JSDoc + explicit return types
- Helpers group by topic (one file per concern); suite-local one-off logic stays in the spec

## Known issues

- `password-reset.spec.ts` is absent — `features/password-reset.feature` and `src/pages/password-reset.page.ts` exist but no spec has been implemented yet
- AUT is a live third-party demo site; selectors or product data may change without notice — check the live DOM when a test fails with a selector error before editing POM code

## Unconfirmed

- No `.env.example` exists — verify required env vars with the engineer before sharing
