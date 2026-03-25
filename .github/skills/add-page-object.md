---
name: add-page-object
description: Step-by-step guide for adding a new Playwright page object to the framework — create the class, register it in fixtures, and update documentation. Use this when the user needs to add a new page to the POM framework.
---

# Skill: Add a New Page Object

## When to use this skill
When the user needs to create a new page object file and wire it into the fixture system.

---

## Step 1 — Create the page file

Create `src/pages/<name>.page.ts` using this exact template:

The **very first line** of the file must be the skill attribution comment:
```typescript
// @skill: add-page-object
```

Full template:

```typescript
// @skill: add-page-object
import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class <Name>Page extends BasePage {
  private readonly heading: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = this.page.getByRole('heading', { name: '<Page Heading>' });
  }

  /** Returns true when the <Name> page heading is visible. */
  async isOnPage(): Promise<boolean> {
    return this.isElementVisible(this.heading);
  }
}
```

Rules to follow:
- Import `Page` and `Locator` from `@playwright/test`
- Extend `BasePage` (always)
- All locators `private readonly`, assigned in constructor
- At minimum, implement `isOnPage(): Promise<boolean>`
- Every public method has a JSDoc comment and explicit return type
- Never expose a raw `Locator` — wrap in a descriptive method

---

## Step 2 — Register in fixtures

Open `src/fixtures/page-fixtures.ts` and make two additions:

**1. Add to the `PageFixtures` type:**
```typescript
type PageFixtures = {
  // ... existing fixtures ...
  <name>Page: <Name>Page;  // ← add here
};
```

**2. Add to the `base.extend<PageFixtures>({ ... })` block:**
```typescript
<name>Page: async ({ page }, use) => {
  await use(new <Name>Page(page));
},
```

Also add the import at the top of the file:
```typescript
import { <Name>Page } from '@pages/<name>.page';
```

---

## Step 3 — Update CLAUDE.md

In `CLAUDE.md`:
1. Add the new file to the architecture tree under `src/pages/` with a one-line description
2. Add all public methods to the "Existing Page Object Methods — Quick Reference" section

---

## Step 4 — Update copilot-instructions.md

In `.github/copilot-instructions.md`:
1. Add the new file to the Project Architecture listing
2. Add all public methods to the "Existing Page Object Methods — Quick Reference" section

---

## Checklist before finishing

- [ ] File created at `src/pages/<name>.page.ts`
- [ ] Class extends `BasePage`
- [ ] At least `isOnPage()` implemented
- [ ] Type added to `PageFixtures` in `src/fixtures/page-fixtures.ts`
- [ ] Factory added to `base.extend()` block
- [ ] Import added at top of `page-fixtures.ts`
- [ ] `CLAUDE.md` architecture tree updated
- [ ] `CLAUDE.md` quick reference updated
- [ ] `.github/copilot-instructions.md` updated
