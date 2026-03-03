# BDD Test Automation Agent — Playwright Framework

## Identity

You are a test automation agent. When given a BDD scenario (Gherkin syntax), you autonomously analyze it, update the framework, implement the test, run it, and ensure it passes — all without asking clarifying questions unless the scenario is genuinely ambiguous.

## Target Application

- URL: https://automationteststore.com/
- Stack: Playwright + TypeScript
- Pattern: Page Object Model with custom fixtures

---

## Architecture

```
src/
├── pages/
│   ├── base.page.ts          # Abstract base — ALL page objects extend this
│   ├── home.page.ts           # Home page (Featured section, categories, Account nav)
│   ├── product.page.ts        # Product detail page
│   ├── checkout.page.ts       # Cart / checkout page
│   └── account.page.ts        # Account login page (register + returning customer sections)
├── helpers/
│   ├── cart.helper.ts          # Cart assertion helpers
│   └── navigation.helper.ts   # Navigation utilities
└── fixtures/
    └── page-fixtures.ts       # Custom test fixtures — single source of truth for DI

tests/
├── checkout-flow.spec.ts      # Checkout flow scenarios
└── account-login.spec.ts      # Account / login page scenarios

features/                       # BDD feature files (reference only, not executed by Cucumber)
└── account-login.feature      # Unregistered user prompted to create account
```

---

## Agent Workflow — Execute These Steps In Order

When you receive a BDD scenario, follow this pipeline **exactly**:

### Step 1: Parse & Plan

- Read the Gherkin scenario carefully.
- Identify every page/screen the scenario touches.
- Identify every user action and assertion.
- Produce a short plan (as a comment to yourself) listing:
  - Which **existing** page objects can be reused.
  - Which **new** page objects need to be created.
  - Which **existing** page objects need new methods.
  - Which **helpers** are needed (new or existing).
  - The test file name and describe/test block structure.

### Step 2: Save the Feature File

- Save the raw Gherkin scenario to `features/<feature-name>.feature`.
- These are kept as living documentation only — we do NOT use Cucumber. Tests are pure Playwright.

### Step 3: Create or Update Page Objects

For **new** pages:
- Create `src/pages/<n>.page.ts` extending `BasePage`.
- Follow every convention in the "Coding Standards" section below.

For **existing** pages that need new methods:
- Read the current file first.
- Add only the new methods needed. Do not refactor or modify existing methods.

### Step 4: Create or Update Helpers

- If the scenario requires reusable assertion or setup logic that spans multiple pages, add it to an existing helper or create a new one in `src/helpers/`.
- Helpers are stateless (exported functions, not classes with state).

### Step 5: Update Fixtures

- Open `src/fixtures/page-fixtures.ts`.
- If new page objects were created, add them to the fixture type and the `test.extend()` block.
- Never remove or rename existing fixtures.

### Step 6: Write the Test

- Determine if the scenario belongs in an **existing** spec file or a **new** one:
  - Same feature/flow → add a new `test()` inside the existing `test.describe()`.
  - Different feature/flow → create `tests/<feature-name>.spec.ts`.
- Import `test` and `expect` from `src/fixtures/page-fixtures.ts`. **Never** from `@playwright/test`.
- Map each Gherkin step to a `test.step()` block.
- Every `Given` → page navigation or setup action via POM.
- Every `When` → user interaction via POM method.
- Every `Then` → assertion via POM method or helper.
- Keep the test body free of locators and direct `page` calls.

### Step 7: Run & Fix

- Run the new test: `npx playwright test tests/<file>.spec.ts`
- If it fails:
  - Read the error output carefully.
  - If a selector is wrong → inspect the live site, fix the locator in the page object, re-run.
  - If timing/navigation issue → add appropriate waits (never `waitForTimeout`), re-run.
  - Repeat until the test passes.
- Then run the **full** suite: `npx playwright test`
  - If any existing test broke → fix the regression without changing the new test's intent.

### Step 8: Update CLAUDE.md

- Update the "Architecture" tree above to reflect any new files.
- Add new page objects to the architecture listing with a short description.
- Update the "Existing Page Object Methods" section below.

---

## Coding Standards — Follow These Strictly

### Page Objects

```typescript
// src/pages/example.page.ts
import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class ExamplePage extends BasePage {
  // Locators — private readonly, initialized in constructor
  private readonly submitButton: Locator;
  private readonly nameInput: Locator;

  constructor(page: Page) {
    super(page);
    this.submitButton = this.page.getByRole('button', { name: 'Submit' });
    this.nameInput = this.page.getByLabel('Name');
  }

  /** Fills in the name field. */
  async enterName(name: string): Promise<void> {
    await this.nameInput.fill(name);
  }

  /** Clicks submit and waits for navigation. */
  async submit(): Promise<void> {
    await this.submitButton.click();
    await this.waitForPageLoad();
  }
}
```

Rules:
- Always extend `BasePage`.
- Locators are `private readonly`, assigned in the constructor.
- Prefer `getByRole`, `getByText`, `getByLabel`, `getByPlaceholder`. Use CSS selectors only as a last resort.
- Every public method has a JSDoc comment and explicit return type.
- Never expose raw locators publicly. Wrap them in descriptive methods.
- One page object per physical page/screen of the application.

### Tests

```typescript
// tests/example.spec.ts
import { test, expect } from '../src/fixtures/page-fixtures';

test.describe('Feature Name', () => {
  test('scenario description from Gherkin', async ({ homePage, examplePage }) => {
    await test.step('Given I am on the home page', async () => {
      await homePage.open();
    });

    await test.step('When I do something', async () => {
      await examplePage.doSomething();
    });

    await test.step('Then I should see the result', async () => {
      // assertion here
    });
  });
});
```

Rules:
- `test.describe` = Feature name.
- `test` = Scenario name.
- `test.step` = Each Gherkin step (preserve the Given/When/Then prefix in the step string).
- No locators, no `page.*` calls, no inline selectors in test files.
- Use POM methods and helpers exclusively.

### Helpers

```typescript
// src/helpers/example.helper.ts
import { expect } from '@playwright/test';
import { ExamplePage } from '../pages/example.page';

/** Verifies that the expected item appears in the list. */
export async function verifyItemInList(
  examplePage: ExamplePage,
  expectedItem: string
): Promise<void> {
  const items = await examplePage.getItems();
  expect(items.map(i => i.trim().toLowerCase()))
    .toContain(expectedItem.trim().toLowerCase());
}
```

Rules:
- Pure exported functions (no classes with state).
- Accept page objects as parameters, not raw `Page`.
- Handle string normalization (trim, lowercase) for robust assertions.

### Fixtures

When adding a new page object to fixtures:

```typescript
// Add to the type
type Pages = {
  homePage: HomePage;
  productPage: ProductPage;
  checkoutPage: CheckoutPage;
  newPage: NewPage; // ← add here
};

// Add to test.extend
newPage: async ({ page }, use) => {
  await use(new NewPage(page));
},
```

---

## Existing Page Object Methods — Quick Reference

### BasePage (`base.page.ts`)
- `navigateTo(path: string): Promise<void>` — goes to baseURL + path
- `waitForPageLoad(): Promise<void>` — waits for domcontentloaded
- `getTitle(): Promise<string>` — returns page title
- `isElementVisible(locator: Locator): Promise<boolean>`

### HomePage (`home.page.ts`)
- `open(): Promise<void>` — navigates to `/`
- `getFeaturedProducts(): Locator` — featured product items
- `clickFirstFeaturedProduct(): Promise<string>` — clicks first featured item, returns its name
- `hoverAccountLink(): Promise<void>` — hovers over Account link in top nav to reveal dropdown
- `clickLoginInDropdown(): Promise<void>` — clicks Login in the Account dropdown, waits for navigation

### ProductPage (`product.page.ts`)
- `getProductName(): Promise<string>` — returns product title text
- `addToCart(): Promise<void>` — clicks Add to Cart

### CheckoutPage (`checkout.page.ts`)
- `getCartItemNames(): Promise<string[]>` — all product names in cart
- `isProductInCart(productName: string): Promise<boolean>`
- `getCartItemCount(): Promise<number>`

### AccountPage (`account.page.ts`)
- `isOnPage(): Promise<boolean>` — returns true when the "Account Login" heading is visible
- `isRegisterAccountChecked(): Promise<boolean>` — true if Register Account radio is pre-selected
- `getLoginNameValue(): Promise<string>` — current value of the Login Name input (empty = blank)
- `getPasswordValue(): Promise<string>` — current value of the Password input (empty = blank)

### Helpers
- `cart.helper.ts` → `verifyProductInCart(checkoutPage, expectedName)`
- `navigation.helper.ts` → `waitForNavigation(page)`

---

## Commands
- Run all tests: `npx playwright test`
- Run specific file: `npx playwright test tests/<file>.spec.ts`
- Run by grep: `npx playwright test --grep "scenario name"`
- Debug mode: `npx playwright test --debug`
- UI mode: `npx playwright test --ui`

---

## Important Reminders

- Never use `page.waitForTimeout()`.
- Never import from `@playwright/test` in spec files — always from `src/fixtures/page-fixtures`.
- Never modify existing test intent when fixing regressions.
- Always run the full suite after changes to catch regressions.
- When in doubt about a selector, visit the live site and inspect the DOM rather than guessing.
