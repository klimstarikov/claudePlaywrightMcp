# Test Specs — Rules

- Import `test` and `expect` from `../src/fixtures/page-fixtures`, never from `@playwright/test`.
- `test.describe` = Feature name. `test` = Scenario name. `test.step` = each Gherkin step.
- Preserve the `Given / When / Then` prefix in every `test.step()` string.
- No locators, no `page.*` calls, no inline selectors in spec files.
- Use POM methods and helpers exclusively.
- File name pattern: `<feature-name>.spec.ts`.
