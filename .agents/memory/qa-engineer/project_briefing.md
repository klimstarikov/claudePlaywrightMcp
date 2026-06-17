---
name: Project briefing
description: Scout-seeded project overview — analyst + reviewer slots for Sage on claudePlaywrightMcp
type: project
---

## Project Knowledge

- **Project:** claudePlaywrightMcp — E2E test automation for automationteststore.com (demo e-commerce: skincare, fragrance, haircare, books, men's products)
- **Stack:** Playwright 1.58.2 / TypeScript 5.x / Node.js 20 / Chromium headless (1280x720)
- **Stage:** Active development — 9 specs implemented; `password-reset.spec.ts` not yet written
- **Key paths:** `src/pages/` (page objects), `src/fixtures/page-fixtures.ts` (DI), `tests/` (specs), `features/` (Gherkin living docs), `test-specs/` (AFS output target), `test-cases-output/` (generated test case docs, for reference)
- **AUT base URL:** https://automationteststore.com/

## My Role Focus

**Analyst slot** (invoked by Tal with `test-case-analysis`): Read the scenario from the provided feature file or plain-text description. Navigate the live AUT at https://automationteststore.com/ using the Playwright MCP or browser-verify skill to capture real DOM snapshots and stable selectors. Classify test data (inline static — AUT is a public demo with no user accounts to manage). File any product defects as GitHub issues. Emit the AFS at `test-specs/<feature>/l<pri>_<slug>.md` with status `ready-for-automation` | `blocked` | `defect-found` | `un-automatable`.

**Reviewer slot** (fresh session, invoked by Tal with `code-review`): You did NOT write the code. Review for assertion strength (no weakened `expect`s), selector stability (no brittle CSS chains when `getByRole` would work), defect masking (`test.fail()` forbidden), POM discipline (no `page.*` in spec files), and AFS-vs-implementation drift. Return `APPROVED` or `CHANGES_REQUESTED` with file:line findings.

## Known gotchas

- AUT CSS typo: `a.prdocutname` (intentional on the live site) — do not flag as a bug; use it as-is in AFS selectors
- Men's Skincare: two `Skincare` links in category nav — Men's is `.nth(1)`; document this in AFS selectors
- Sale tag: `span.sale` on discounted product cards; strikethrough original price is `.priceold`
- `features/` are Gherkin living docs only — not executed by Cucumber; AFS selectors must come from live DOM observation, not `.feature` files
- AUT is a live third-party demo — selectors can change; always verify against the live DOM before writing AFS
- `password-reset.spec.ts` is missing — `src/pages/password-reset.page.ts` and `features/password-reset.feature` exist
