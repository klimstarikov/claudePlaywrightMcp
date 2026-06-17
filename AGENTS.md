# AGENTS

<!-- BUNDLE:test-automation START -->
# Test Automation Team — shared conventions

This is an **automation-focused team**: it turns test scenarios into merged,
honest automated tests. These are team-wide defaults — scout refines them per
project in `AGENTS.md`, which always wins over this file.

## Team shape

- **`test-automation-lead` (Tal)** is the orchestrator. On this team he collapses
  the PM and tech-lead roles: he routes the pipeline, owns test-framework
  architecture decisions, and owns the automation merge gate. **The user launches
  Tal directly** for automation work — there is no PM above him. He is a top-level
  orchestrator, not a subagent.
- **`scout`** seeds the project first: framework, base branch, merge policy,
  credential matrix. If the project isn't seeded, Tal pauses and asks for a
  scout run.
- **`qa-engineer` (Sage)** fills two slots — **analyst** (writes the AFS) and
  **reviewer** (adversarial test-honesty review, fresh session).
- **`test-automation-engineer` (Axel)** fills the **implementer** slot — writes
  the page objects, fixtures, and specs; returns a Run Report.

## The pipeline

```
User describes a scenario → launches Tal directly
  Tal → Analyst (qa-engineer + test-case-analysis) → AFS + status
      → gate: only `ready-for-automation` advances
      → Implementer (test-automation-engineer + test-automation-workflow) → PR + Run Report
      → Reviewer (qa-engineer FRESH session + code-review) → APPROVED | CHANGES_REQUESTED
      → Tal merges, files follow-ups, reports to the user
```

## Working agreements (team-wide)

- **AFS status is contract law.** Only `ready-for-automation` advances to the
  implementer. `blocked` / `defect-found` / `un-automatable` get handled, never
  forwarded.
- **No defect masking.** `test.fail()`, `xit()`, `@Ignore`, `pytest.skip()`, and
  weakened assertions for product defects are forbidden. A product bug means file
  a ticket and either `expect.soft()` (isolated, ticketed) or a natural fail
  (`blocked`) — never a hidden green.
- **Dispatch is the work.** A routing turn without an actual subagent dispatch in
  the same reply did nothing.
- **Done means green AND tracked.** A `completed` case is clean-green in CI, or
  red-for-a-real-product-bug with a filed, linked ticket. A `test.fail()`-masked
  green is `blocked`.

<!-- BUNDLE:test-automation END -->

---

## Project: claudePlaywrightMcp

Playwright + TypeScript E2E test automation suite for [automationteststore.com](https://automationteststore.com/) — a public demo e-commerce store (skincare, fragrance, haircare, books, men's products). The suite follows a BDD-style Page Object Model: feature files (`.feature`) serve as living documentation, and each scenario maps to a Playwright spec with `test.step()` blocks preserving Given/When/Then prefixes.

## Tech Stack

- **Language:** TypeScript 5.x (strict mode, ES2022 target)
- **Framework:** Playwright 1.58.2
- **Runtime:** Node.js 20
- **Browser:** Chromium (headless, 1280x720)
- **CI:** GitHub Actions (`.github/workflows/playwright.yml`)


## Repository Structure

```
src/
├── pages/
│   ├── base.page.ts          ← Abstract base — all page objects extend this
│   ├── home.page.ts          ← Home page (featured products, account nav, category menu)
│   ├── product.page.ts       ← Product detail page
│   ├── checkout.page.ts      ← Cart / checkout page
│   ├── account.page.ts       ← Account login & registration page
│   ├── fragrance.page.ts     ← Fragrance category page
│   ├── haircare.page.ts      ← Hair Care category page
│   ├── books.page.ts         ← Books category page
│   ├── men.page.ts           ← Men category page
│   ├── skincare.page.ts      ← Skincare category page
│   └── password-reset.page.ts← Password reset page
├── fixtures/
│   └── page-fixtures.ts      ← Custom test fixtures (DI via test.extend())
└── helpers/
    ├── cart.helper.ts        ← Cart assertion utilities
    └── navigation.helper.ts  ← Navigation utilities

tests/                        ← Playwright spec files (one per feature)
features/                     ← Gherkin files (living docs only, not executed)
test-cases-output/            ← Generated test case documents (markdown, for reference)
input-images/                 ← Screenshots used for test-case generation
playwright.config.ts          ← Playwright config (baseURL, timeouts, reporter)
tsconfig.json                 ← TypeScript config with path aliases
```

## Build & Run

```bash
# Install dependencies
npm install
npx playwright install chromium

# Run all tests
npx playwright test

# Run a specific spec
npx playwright test tests/sale-tags.spec.ts

# Run by scenario name (grep)
npx playwright test --grep "Sale tag"

# Debug mode (headed, paused)
npx playwright test --debug

# View HTML report
npx playwright show-report
```

CI uses `npx playwright test` with `retries: 1` on failures.

## Environment Setup

Secrets live in `.env` (gitignored). Required env vars:

| Variable | Purpose |
|---|---|
| `PLAYWRIGHT_MCP_HEADLESS` | Set to `true` for headless MCP-driven runs |

Never commit the `.env` file — it is gitignored.

## Path Aliases (tsconfig)

| Alias | Resolves to |
|---|---|
| `@pages/*` | `src/pages/*` |
| `@helpers/*` | `src/helpers/*` |
| `@fixtures/*` | `src/fixtures/*` |
| `@tests/*` | `tests/*` |

## Coding Conventions

### Page Objects (`src/pages/`)
- All classes extend `BasePage` from `src/pages/base.page.ts`
- Locators are `private readonly`, assigned in the constructor only
- Locator preference ladder: `getByRole` > `getByText` > `getByLabel` > `getByPlaceholder` > CSS (last resort, add comment)
- Every public method has a JSDoc one-liner and explicit `Promise<T>` return type
- Never expose raw `Locator` publicly — wrap in a descriptive method
- Never call `page.waitForTimeout()` — use `waitForPageLoad()` or Playwright auto-waiting
- One class per file; file pattern: `<name>.page.ts`
- Note: AUT has a known CSS typo — `prdocutname` (not `productname`) — this is correct

### Spec Files (`tests/`)
- Always import `test` and `expect` from `../src/fixtures/page-fixtures` — never from `@playwright/test`
- `test.describe` = Feature name (must match Gherkin Feature heading)
- `test()` = Scenario name (must match Gherkin Scenario title exactly)
- `test.step()` = Each Gherkin step, preserving Given/When/Then/And prefix
- No locators, no `page.*` calls, no inline CSS selectors in spec files
- File pattern: `<feature-name>.spec.ts`

### Helpers (`src/helpers/`)
- Pure exported functions, no classes with state
- Accept page object instances as parameters, never a raw `Page`
- Normalize strings before comparison: `.trim().toLowerCase()`
- File pattern: `<name>.helper.ts`

### Fixtures (`src/fixtures/page-fixtures.ts`)
- Single source of truth for dependency injection
- When adding a new page object: add to `PageFixtures` type AND `test.extend()` block
- Never remove or rename existing fixture keys — specs depend on them

### Feature Files (`features/`)
- Pure Gherkin documentation only — not executed by Cucumber
- Each `.feature` file must have a corresponding spec in `tests/`
- File pattern: `<feature-name>.feature`

## Commit Style

Conventional Commits format:
- `feat(scope): description` — new capability
- `test(scope): description` — new/updated tests
- `fix(scope): description` — bug fix
- `chore(scope): description` — maintenance
- Scopes: `pages`, `fixtures`, `tests`, `helpers`, `features`, `config`, `ci`
- No JIRA ticket keys in commit messages or PR titles

## Testing

- **Framework:** Playwright 1.58.2 with `@playwright/test`
- **Run command (local):** `npx playwright test`
- **Run command (CI):** `npx playwright test` (same; retries enabled in CI via `PLAYWRIGHT_CI=1`)
- **Config:** `playwright.config.ts`
- **Base URL:** `https://automationteststore.com/`
- **Timeout:** 30s per test, 10s per assertion, 10s per action
- **Reporters:** HTML (`playwright-report/`) + list (console)
- **On failure:** screenshot + trace retained in `test-results/`
- **Retries:** 0 locally, 1 in CI

See `.agents/testing.md` for full test infrastructure details.

## CI/CD

- **Trigger:** push to `main`, PRs targeting `main`
- **Config:** `.github/workflows/playwright.yml`
- **Pipeline:** checkout → setup Node 20 → `npm ci` → install Chromium → `npx playwright test`
- **Artifacts:** HTML report uploaded on failure
- **Merge policy:** human-approved (PR review required before merge)

## Notes

- The AUT (`automationteststore.com`) is a public demo — selectors may change without notice; verify against live DOM if tests fail unexpectedly
- `password-reset.page.ts` exists but has no corresponding spec yet — needs a `tests/password-reset.spec.ts`
- `features/password-reset.feature` exists without a spec — same gap

- `input-images/` holds screenshots fed to test-case generation workflows
- `home.page.ts` contains `waitForTimeout(500)` in `hoverMenMenu()` — the one documented exception (submenu timing); all other `waitForTimeout` uses are forbidden
