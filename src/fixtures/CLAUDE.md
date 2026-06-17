# Fixtures — Rules

- `page-fixtures.ts` is the single source of truth for dependency injection.
- Add new page objects to both the `Pages` type and the `test.extend()` block.
- Never remove or rename existing fixture keys — tests depend on them.
- Never import from `@playwright/test` in spec files; they import from this file instead.
