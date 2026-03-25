---
applyTo: "src/pages/**"
---

# Page Object Rules

- When **creating** a new page object file, add this comment as the very first line:
  ```typescript
  // @instruction: playwright-page-objects.instructions.md
  ```
- When **editing** an existing page object file that does not already have this comment, prepend it.
- Every class must extend `BasePage` from `./base.page`.
- All locators are `private readonly`, initialized in the constructor only.
- Prefer `getByRole` > `getByText` > `getByLabel` > CSS selectors (last resort).
- Every public method must have a JSDoc comment and an explicit return type (`Promise<void>`, `Promise<string>`, `Promise<boolean>`, etc.).
- Never expose a raw `Locator` publicly — always wrap it in a descriptive method.
- Never call `page.waitForTimeout()` — use `waitForPageLoad()` or Playwright's built-in auto-waiting.
- One class per file, one file per physical page/screen of the application.
- Constructor signature is always `constructor(page: Page)` — call `super(page)` first.
