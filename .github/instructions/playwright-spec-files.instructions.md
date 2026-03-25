---
applyTo: "tests/**"
---

# Test File Rules

- When **creating** a new spec file, add this comment as the very first line:
  ```typescript
  // @instruction: playwright-spec-files.instructions.md
  ```
- When **editing** an existing spec file that does not already have this comment, prepend it.
- Always import `test` and `expect` from `../src/fixtures/page-fixtures` — **never** from `@playwright/test`.
- Never use locators, `page.*` calls, or inline CSS selectors inside spec files.
- Structure: `test.describe` = Feature name, `test()` = Scenario name, `test.step()` = each Gherkin step.
- Preserve the `Given` / `When` / `Then` / `And` prefix inside every `test.step()` string.
- No `page.waitForTimeout()`.
- Every interaction and assertion must go through a POM method or helper — never inline.
- `test.describe` block name must match the Feature name from the Gherkin feature file.
- `test()` name must match the Scenario title from the Gherkin feature file exactly.
