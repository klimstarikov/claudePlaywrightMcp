---
name: debug-failing-test
description: Systematic checklist for diagnosing and fixing failing or flaky Playwright tests in this framework. Use this when a test is timing out, a selector isn't found, or a test was passing before and now fails.
---

# Skill: Debug a Failing Playwright Test

## Step 0 — Add attribution comment

When editing any file as part of this debugging session, ensure the very first line contains a skill attribution comment if one is not already present:
- TypeScript files: `// @skill: debug-failing-test`
- This makes it explicit that the file was touched during a debug session guided by this skill.

---

## Step 1 — Run in headed/debug mode to see what's happening

```bash
# Headed mode — watch the browser
npx playwright test tests/<file>.spec.ts --headed

# Debug mode — step through with Playwright Inspector
npx playwright test tests/<file>.spec.ts --debug

# Isolate a single scenario by name
npx playwright test --grep "scenario name" --headed
```

---

## Step 2 — Work through the diagnosis checklist

### Locator failure (`TimeoutError` or "strict mode violation")

**Symptoms:** `Locator.click: Timeout`, `Error: strict mode violation`, element not found

**Checks:**
1. Is `getByRole` used with the correct ARIA role and `name`?
2. Does the element actually exist in the DOM at the time of the call?
3. Is the selector too broad (matches multiple elements)?

**Fix:** Inspect the live site at https://automationteststore.com — open DevTools, find the element, confirm the correct role/text/label. **Never guess a selector.**

---

### Timing failure (element exists but isn't ready)

**Symptoms:** Action fires before navigation completes, element visible but stale

**Checks:**
1. Is `await this.waitForPageLoad()` missing after a navigation action in the page object?
2. Is a click triggering a route change that the next step doesn't wait for?

**Fix:** Add `await this.waitForPageLoad()` at the end of the relevant page object method. Never add `waitForTimeout()` — it is banned.

---

### Wrong import in spec file

**Symptoms:** `TypeError`, fixture not found, `expect` behaving unexpectedly

**Check:** Does the spec file import from `@playwright/test` instead of `../src/fixtures/page-fixtures`?

**Fix:**
```typescript
// ❌ Wrong
import { test, expect } from '@playwright/test';

// ✅ Correct
import { test, expect } from '../src/fixtures/page-fixtures';
```

---

### Fixture not registered

**Symptoms:** `Error: unknown fixture 'myPage'`

**Check:** Is the new page object added to both the `PageFixtures` type AND the `base.extend()` block in `src/fixtures/page-fixtures.ts`?

**Fix:** Follow the `add-page-object` skill — both entries are required.

---

### Regression from unrelated change

**Symptoms:** Test that previously passed now fails after editing another file

**Checks:**
1. Was a page object method signature changed or renamed?
2. Was a fixture renamed in `page-fixtures.ts`?
3. Was a locator changed that multiple methods depend on?

**Fix:** Never rename existing fixtures. Roll back the signature change and add a new method instead.

---

## Step 3 — After fixing, verify no regressions

Always run the full suite after a fix:
```bash
npx playwright test
```

If any previously passing test breaks, fix it without altering the new test's intent.

---

## Quick reference: what is banned

| Banned | Reason | Alternative |
|--------|--------|-------------|
| `page.waitForTimeout()` | Flaky, masks real issues | `waitForPageLoad()` or Playwright auto-wait |
| Import from `@playwright/test` in spec files | Bypasses fixtures | Import from `../src/fixtures/page-fixtures` |
| Locators in spec files | Breaks POM separation | Wrap in page object method |
| `--no-verify` on commits | Bypasses checks | Fix the underlying issue |
