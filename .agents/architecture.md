# Architecture

## System Overview

This repository is a Playwright + TypeScript E2E test automation framework, not an application server. The "system" is the test harness itself: page objects wrap the AUT (automationteststore.com), custom fixtures inject them into specs via Playwright's `test.extend()`, and BDD-style specs map Gherkin scenarios to `test.step()` blocks. There is no backend, database, or deployment — CI runs the suite against the live public AUT.

## Components

| Component | Purpose | Tech | Path |
|---|---|---|---|
| Page Objects | Encapsulate AUT selectors and interactions | TypeScript classes | `src/pages/` |
| BasePage | Shared navigation, wait, and visibility utilities | Abstract class | `src/pages/base.page.ts` |
| Fixtures | Dependency injection — instantiate + inject page objects | `test.extend()` | `src/fixtures/page-fixtures.ts` |
| Helpers | Pure assertion/navigation utilities | Exported functions | `src/helpers/` |
| Specs | Test cases — BDD Gherkin steps mapped to POM calls | `test()` / `test.step()` | `tests/` |
| Feature Files | Living Gherkin documentation | `.feature` (Gherkin) | `features/` |
| Playwright Config | Browser, timeout, reporter, baseURL settings | `defineConfig()` | `playwright.config.ts` |
| CI Pipeline | Run suite on push/PR to main | GitHub Actions | `.github/workflows/playwright.yml` |

## Data Flow

```
Playwright test runner
  → page-fixtures.ts (test.extend)
      → instantiates page objects (HomePage, ProductPage, …)
  → spec file (test.describe / test / test.step)
      → calls POM methods → Playwright browser API → AUT (automationteststore.com)
      → calls helpers → POM methods → assertions
  → reporters: HTML (playwright-report/) + list (console)
  → on failure: screenshot + trace saved to test-results/
```

## Page Object Hierarchy

```
BasePage (abstract)
├── HomePage           — home page; featured products, account nav, category menu
├── ProductPage        — product detail; name, add-to-cart
├── CheckoutPage       — cart / checkout; item names, counts, removal
├── AccountPage        — login + register; form fields, radio state
├── FragrancePage      — Fragrance category; heading, subcategory links
├── HairCarePage       — Hair Care category; heading, subcategory links
├── BooksPage          — Books category; heading, subcategory links
├── MenPage            — Men category; heading, Skincare subcategory
├── SkincarePage       — Skincare category; heading, item count
└── PasswordResetPage  — Password reset page (page object exists; spec not yet written)
```

## External Dependencies

| Dependency | Role | Config |
|---|---|---|
| automationteststore.com | AUT (application under test) — public demo e-commerce site | `baseURL` in `playwright.config.ts` |

## Test Invocation Path

```
npm test
  → npx playwright test
      → reads playwright.config.ts
      → discovers tests/ **/*.spec.ts
      → for each test: creates browser context → imports page-fixtures → runs test
      → on CI: retries once on failure, uploads HTML report artifact
```

## Gaps / Tech Debt

- `password-reset.spec.ts` missing — page object and feature file exist but no spec implemented
- No `.env.example` — env var names not documented in a template file
- `waitForTimeout(500)` in `hoverMenMenu()` — timing workaround for AUT's submenu animation; consider replacing with `locator.waitFor({ state: 'visible' })` when a stable submenu selector is confirmed
