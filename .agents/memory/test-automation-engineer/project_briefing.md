---
name: Project briefing
description: Scout-seeded project overview — implementer context for Axel on claudePlaywrightMcp
type: project
---

## Project Knowledge

- **Project:** claudePlaywrightMcp — Playwright + TypeScript E2E suite for automationteststore.com
- **Stack:** Playwright 1.58.2 / TypeScript 5.x / Node.js 20 / Chromium headless
- **Stage:** Active development — 9 specs, 10 page objects, 2 helpers
- **Key paths:**
  - Page objects: `src/pages/<name>.page.ts` — all extend `BasePage` (`src/pages/base.page.ts`)
  - Fixtures (DI): `src/fixtures/page-fixtures.ts` — single source of truth; must register all new page objects here
  - Helpers: `src/helpers/<topic>.helper.ts` — pure functions, accept page objects not raw `Page`
  - Specs: `tests/<feature-name>.spec.ts` — one per Gherkin feature
  - AFS input: `test-specs/<feature>/l<pri>_<slug>.md`
- **Base URL:** https://automationteststore.com/
- **Run command (local):** `npx playwright test`
- **Run command (CI):** `npx playwright test` (retries: 1 in CI)
- **Bug tracker:** GitHub Issues for defect filing

## My Role Focus

Implement the AFS handed by Tal. Framework is Playwright + TypeScript POM. Every new spec:
1. Imports `test` and `expect` from `../src/fixtures/page-fixtures` — never from `@playwright/test`
2. Uses `test.describe` (= Feature name) / `test()` (= Scenario name, exact match) / `test.step()` (= Gherkin step, preserve Given/When/Then prefix)
3. No locators or `page.*` calls in spec files — POM methods and helpers only
4. When adding a new page object: create `src/pages/<name>.page.ts` (extend BasePage, private readonly locators, JSDoc + explicit return types), register in `src/fixtures/page-fixtures.ts` (type + test.extend()), then write the spec
5. Branch name: Tal provides — stay on it; don't rebase or switch
6. Return a Run Report after execution

## Known gotchas

- **Never use `page.waitForTimeout()`** — exception: `hoverMenMenu()` already has it; don't add more
- **Import path:** use `@fixtures/page-fixtures` (alias) or `../src/fixtures/page-fixtures` (relative) — both work; check existing specs in `tests/` for the local convention
- AUT CSS typo: `a.prdocutname` (intentional) — correct in existing page objects; follow that pattern
- Men's Skincare: two `Skincare` links in category nav — use `.nth(1)` for Men's; see `home.page.ts` `clickSkincareFromMenMenu()`
- Sale tag: `span.sale` on discounted cards; `.priceold` for strikethrough price
- `features/` files are documentation only — extract step details from the AFS, not from `.feature` files directly
- `test-cases-output/` is not a test directory — it holds generated test case docs for reference
- Soft retry budget: ≤ 3 reruns against the same root cause, then report `needs-escalation`
- `password-reset.spec.ts` is the one known missing spec — if the AFS targets it, `password-reset.page.ts` already exists in `src/pages/`
