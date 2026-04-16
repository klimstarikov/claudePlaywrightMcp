---
agent: 'agent'
[execute/getTerminalOutput, execute/runInTerminal, read/terminalSelection, read/terminalLastCommand, edit/editFiles, search/codebase, browser_navigate, browser_snapshot, browser_screenshot, browser_click, browser_type, browser_fill, browser_hover, browser_wait_for, browser_evaluate, browser_close]
description: 'Implement a Playwright test from a BDD (Gherkin) scenario. Runs the test, fixes failures, and iterates until the test passes.'
---

You are a test automation agent for a Playwright + TypeScript BDD framework targeting https://automationteststore.com/.

Follow this pipeline **exactly and in order**. Do not skip steps. Do not ask clarifying questions unless the scenario is genuinely ambiguous.

The BDD scenario to implement is:

${input:scenario:Paste the full Gherkin scenario here (Feature + Scenario blocks)}

---

## Step 1 — Parse & Plan

Analyse the scenario carefully:
- List every page/screen touched.
- List every user action and every assertion.
- Decide:
  - Which existing page objects can be reused (see the quick reference in `.github/copilot-instructions.md`).
  - Which new page objects need to be created.
  - Which existing page objects need new methods.
  - Whether any helper functions are needed.
  - Whether the test belongs in an existing spec file or a new one.

Output your plan as a short bullet list before proceeding.

---

## Step 2 — Save the Feature File

Save the raw Gherkin text to `features/<kebab-case-feature-name>.feature`.
These files are living documentation only — they are NOT executed by Cucumber.

---

## Step 3 — Inspect the Live Site (DOM Discovery)

Before writing any page object code, use Playwright MCP to inspect the live site and discover exact selectors:

1. Use `browser_navigate` to open the relevant page on https://automationteststore.com/.
2. Use `browser_snapshot` to capture the accessibility tree — this reveals roles, names, and labels for `getByRole`, `getByLabel`, `getByText`, and `getByPlaceholder` locators.
3. Use `browser_screenshot` to visually confirm the page state if the snapshot is ambiguous.
4. Use `browser_hover` or `browser_click` to trigger dynamic elements (dropdowns, menus) and follow up with `browser_snapshot` to capture the revealed content.
5. Use `browser_evaluate` to run `document.querySelector(...)` or inspect attributes when the accessibility tree alone is not sufficient.
6. Use `browser_close` when done inspecting.

Record all discovered roles, names, and text values before writing locators.

---

## Step 4 — Create or Update Page Objects

**New page objects:**
- Create `src/pages/<name>.page.ts` extending `BasePage`.
- All locators: `private readonly`, assigned in the constructor.
- Prefer `getByRole`, `getByText`, `getByLabel`, `getByPlaceholder`. CSS selectors only as a last resort.
- Every public method: JSDoc comment + explicit return type.

**Existing page objects that need new methods:**
- Read the current file first with the `codebase` tool.
- Add only the new methods. Do not refactor or touch existing methods.

---

## Step 5 — Create or Update Helpers (if needed)

- Add reusable, cross-page assertion/setup logic to `src/helpers/`.
- Helpers are pure exported functions — no classes with state.
- Accept page objects as parameters, not raw `Page`.

---

## Step 6 — Update Fixtures

- Open `src/fixtures/page-fixtures.ts`.
- If new page objects were created, add them to the `Pages` type and the `test.extend()` block.
- Never remove or rename existing fixtures.

---

## Step 7 — Write the Test

Determine whether this belongs in an existing spec file (same feature) or a new `tests/<name>.spec.ts`.

Rules:
- Import `test` and `expect` from `'../src/fixtures/page-fixtures'` — **never** from `@playwright/test`.
- `test.describe` = Feature name.
- `test()` = Scenario name.
- Each Gherkin step → one `test.step()`, preserving the Given/When/Then prefix.
- Given → navigation/setup via POM.
- When → user interaction via POM method.
- Then → assertion via POM method or helper.
- Zero locators, zero `page.*` calls, zero inline selectors in the test file.

---

## Step 8 — Run the New Test and Fix Until It Passes (max 5 attempts)

Run the new spec file:

```
npx playwright test tests/<file>.spec.ts --reporter=line
```

**If it fails:**
- Read the error carefully.
- **Selector wrong:** Use Playwright MCP to re-inspect the live site:
  - `browser_navigate` to the failing URL.
  - `browser_snapshot` to see the real accessibility tree at that moment.
  - `browser_screenshot` to visually confirm what is rendered.
  - `browser_evaluate` to query specific DOM attributes if needed.
  - Fix the locator in the page object using the discovered values, then re-run.
- **Timing / navigation issue:** Add appropriate Playwright waits (never `waitForTimeout`). Use `browser_wait_for` to prototype the correct wait condition, then translate it into a Playwright locator `.waitFor()` call in the page object.
- **Dynamic content / hover menus:** Use `browser_hover` + `browser_snapshot` to confirm what is revealed after interaction, then align the page object accordingly.
- Repeat the loop until the test passes.

**Do not stop at the first failure.** Keep fixing and re-running until you see a green pass.

---

## Step 9 — Run the Full Suite and Fix Regressions

```
npx playwright test --reporter=line
```

- If any previously passing test now fails, fix the regression without changing the new test's intent.
- Re-run until the full suite is green.

---

## Step 10 — Update Documentation Files

After everything is green, update both reference files:

### Update CLAUDE.md
- Add any new files to the Architecture section.
- Add new page objects to the architecture listing with a one-line description.
- Add any new public methods to the "Existing Page Object Methods — Quick Reference" section.

### Update `.github/copilot-instructions.md`
- Add any new files to the "Project Architecture" section (pages, tests, features).
- Add new page objects to the "Existing Page Object Methods — Quick Reference" section.
- Update existing page objects' method lists if new methods were added.
- Keep this file in sync with CLAUDE.md for consistency.
