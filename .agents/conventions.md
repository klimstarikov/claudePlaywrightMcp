# Coding Conventions

Detected from codebase analysis on 2026-06-17. These are descriptive (what IS), not prescriptive.

## File Naming

- Page objects: `<name>.page.ts` (`home.page.ts`, `account.page.ts`)
- Spec files: `<feature-name>.spec.ts` (`sale-tags.spec.ts`, `account-login.spec.ts`)
- Helpers: `<name>.helper.ts` (`cart.helper.ts`, `navigation.helper.ts`)
- Feature files: `<feature-name>.feature`
- Fixture file: singular — `page-fixtures.ts`

## Code Organization

- `src/pages/` — Page Object classes; all extend `BasePage`
- `src/fixtures/page-fixtures.ts` — single source of truth for DI (dependency injection)
- `src/helpers/` — pure functions grouped by topic; no classes with state
- `tests/` — spec files; one per Gherkin feature file
- `features/` — Gherkin living documentation only

## Page Object Pattern

```typescript
// Every page object follows this exact structure
export class ExamplePage extends BasePage {
  private readonly someLocator: Locator;  // private readonly, constructor-assigned

  constructor(page: Page) {
    super(page);  // always first
    this.someLocator = page.getByRole('button', { name: 'Submit' });
  }

  /** JSDoc one-liner — every public method has one. */
  async doSomething(): Promise<void> {  // explicit return type, always
    await this.someLocator.click();
    await this.waitForPageLoad();
  }
}
```

## Import Style

- Spec files import from path alias: `import { test, expect } from '@fixtures/page-fixtures'` or relative `'../src/fixtures/page-fixtures'`
- Page objects use relative imports: `import { BasePage } from './base.page'`
- Path aliases defined in `tsconfig.json`: `@pages/*`, `@helpers/*`, `@fixtures/*`, `@tests/*`
- Never import `test` or `expect` from `@playwright/test` in spec files

## Locator Preference (enforced in page objects)

1. `getByRole` with accessible name — first choice
2. `getByLabel` / `getByPlaceholder`
3. `getByText`
4. CSS selector — last resort; always add a comment explaining why

## Error Handling / Failure Strategy

- No try/catch in page objects or specs — let Playwright surface natural failures
- When a product defect causes a test to fail: file a ticket, use `expect.soft()` with `// Known defect: <TICKET>`, or report `blocked`
- Never use `test.fail()`, `xit()`, or weakened assertions to hide a product defect

## TypeScript

- `strict: true` — all public methods have explicit `Promise<T>` return types
- Target: ES2022, module: commonjs
- `skipLibCheck: true`

## Git & Commits

- Conventional Commits: `<type>(<scope>): <subject>` — imperative mood, ≤72 chars
- Types in use: `feat`, `fix`, `test`, `chore`, `docs`, `refactor`, `ci`
- Scopes: `pages`, `fixtures`, `tests`, `helpers`, `features`, `config`, `ci`
- No JIRA ticket keys in commit messages or PR titles
- Branch naming: descriptive feature branches (e.g. `demo-scenario1`, `leap_agent`)

## BDD Mapping

- `test.describe` name = Gherkin Feature title (exact match)
- `test()` name = Gherkin Scenario title (exact match)
- `test.step()` strings preserve `Given` / `When` / `Then` / `And` prefixes exactly

## Known Quirks

- AUT has intentional CSS typo: `a.prdocutname` (not `productname`) — do not fix
- Men's Skincare link is `.nth(1)` — two `Skincare` links appear in the category nav
- `hoverMenMenu()` in `home.page.ts` uses `waitForTimeout(500)` — the one documented exception to the no-waitForTimeout rule (submenu animation timing on the AUT)
