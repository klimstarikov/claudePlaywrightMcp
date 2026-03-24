# BDD Test Automation — Playwright Framework Instructions

## Target Application

- URL: https://automationteststore.com/
- Stack: Playwright + TypeScript
- Pattern: Page Object Model (POM) with custom fixtures

---

## Project Architecture

```
src/
├── pages/
│   ├── base.page.ts          # Abstract base — ALL page objects extend this
│   ├── home.page.ts          # Home page (Featured section, categories, Account nav)
│   ├── product.page.ts       # Product detail page
│   ├── checkout.page.ts      # Cart / checkout page
│   ├── account.page.ts       # Account login page (register + returning customer sections)
│   ├── fragrance.page.ts     # Fragrance category page (heading + Men/Women subcategory links)
│   ├── haircare.page.ts      # Hair Care category page (heading + Conditioner/Shampoo subcategory links)
│   ├── books.page.ts         # Books category page (heading + Audio CD/Paperback subcategory links)
│   ├── men.page.ts           # Men category page (heading + subcategory links like Skincare)
│   └── skincare.page.ts      # Skincare category page (heading + product items)
├── helpers/
│   ├── cart.helper.ts        # Cart assertion helpers
│   └── navigation.helper.ts  # Navigation utilities
└── fixtures/
    └── page-fixtures.ts      # Custom test fixtures — single source of truth for DI

tests/
├── checkout-flow.spec.ts          # Checkout flow scenarios
├── account-login.spec.ts          # Account / login page scenarios
├── fragrance-navigation.spec.ts   # Fragrance category navigation scenarios
├── haircare-navigation.spec.ts    # Hair Care category navigation scenarios
├── books-navigation.spec.ts       # Books category navigation scenarios
├── men-skincare-navigation.spec.ts # Men category Skincare navigation scenarios
└── home-page-sections.spec.ts     # Home page sections visibility scenarios

features/                              # BDD feature files (living docs only, not executed by Cucumber)
├── account-login.feature
├── fragrance-navigation.feature
├── haircare-navigation.feature
├── books-navigation.feature
├── men-skincare-navigation.feature
└── home-page-sections.feature
```

---

## Coding Standards

### Page Objects

- Always extend `BasePage` (from `src/pages/base.page.ts`).
- Locators are `private readonly`, assigned in the constructor.
- Prefer `getByRole`, `getByText`, `getByLabel`, `getByPlaceholder`. Use CSS selectors only as a last resort.
- Every public method has a JSDoc comment and explicit `Promise<void>` or typed return.
- Never expose raw locators publicly — wrap in descriptive methods.
- One page object per physical page/screen.

```typescript
// src/pages/example.page.ts
import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class ExamplePage extends BasePage {
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

### Tests

- Import `test` and `expect` **only** from `../src/fixtures/page-fixtures` — never from `@playwright/test`.
- `test.describe` = Feature name.
- `test()` = Scenario name (match Gherkin scenario title).
- `test.step()` = Each Gherkin step, preserving the Given/When/Then prefix.
- No locators, no `page.*` calls, no inline selectors in test files.
- Use POM methods and helpers exclusively.

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
      expect(await examplePage.isOnPage()).toBe(true);
    });
  });
});
```

### Helpers

- Pure exported functions — no classes with state.
- Accept page objects as parameters, not raw `Page`.
- Normalise strings (trim, lowercase) for robust assertions.

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

### Fixtures

When a new page object is created, register it in `src/fixtures/page-fixtures.ts`:

```typescript
// Add to the Pages type
type Pages = {
  homePage: HomePage;
  newPage: NewPage; // ← add here
};

// Add to test.extend()
newPage: async ({ page }, use) => {
  await use(new NewPage(page));
},
```

Never remove or rename existing fixtures.

---

## Existing Page Object Methods — Quick Reference

### BasePage (`base.page.ts`)
- `navigateTo(path: string): Promise<void>` — goes to baseURL + path
- `waitForPageLoad(): Promise<void>` — waits for domcontentloaded
- `getTitle(): Promise<string>` — returns page title
- `isElementVisible(locator: Locator): Promise<boolean>`

### HomePage (`home.page.ts`)
- `open(): Promise<void>` — navigates to `/`
- `getFeaturedProducts(): Locator`
- `clickFirstFeaturedProduct(): Promise<string>` — clicks first item, returns its name
- `hoverAccountLink(): Promise<void>` — reveals Account dropdown
- `clickLoginInDropdown(): Promise<void>` — clicks Login, waits for navigation
- `clickFragranceMenu(): Promise<void>` — clicks Fragrance in category nav
- `clickHairCareMenu(): Promise<void>` — clicks Hair Care in category nav
- `clickBooksMenu(): Promise<void>` — clicks Books in category nav
- `clickMenMenu(): Promise<void>` — clicks Men in category nav
- `hoverMenMenu(): Promise<void>` — hovers over Men menu to reveal subcategories
- `clickSkincareFromMenMenu(): Promise<void>` — clicks Men's Skincare from expanded Men menu (second Skincare link)
- `hasSectionVisible(name: string): Promise<boolean>` — returns true if a section heading with that name is visible on the home page

### ProductPage (`product.page.ts`)
- `getProductName(): Promise<string>`
- `addToCart(): Promise<void>`

### CheckoutPage (`checkout.page.ts`)
- `getCartItemNames(): Promise<string[]>`
- `isProductInCart(productName: string): Promise<boolean>`
- `getCartItemCount(): Promise<number>`

### AccountPage (`account.page.ts`)
- `isOnPage(): Promise<boolean>`
- `isRegisterAccountChecked(): Promise<boolean>`
- `getLoginNameValue(): Promise<string>`
- `getPasswordValue(): Promise<string>`

### FragrancePage (`fragrance.page.ts`)
- `isOnPage(): Promise<boolean>`
- `hasCategoryVisible(name: string): Promise<boolean>`

### HairCarePage (`haircare.page.ts`)
- `isOnPage(): Promise<boolean>`
- `hasCategoryVisible(name: string): Promise<boolean>`

### BooksPage (`books.page.ts`)
- `isOnPage(): Promise<boolean>` — returns true when the Books page heading is visible
- `hasCategoryVisible(name: string): Promise<boolean>` — true if a sub-category link with that name is visible (case-insensitive)

### MenPage (`men.page.ts`)
- `isOnPage(): Promise<boolean>` — returns true when the Men page heading is visible
- `hasSubcategoryVisible(name: string): Promise<boolean>` — true if a sub-category link with that name is visible (case-insensitive)
- `clickSkincareMenu(): Promise<void>` — clicks Skincare link in Men sub-category menu, waits for navigation

### SkincarePage (`skincare.page.ts`)
- `isOnPage(): Promise<boolean>` — returns true when the Skincare page heading is visible
- `getItemCount(): Promise<number>` — returns the count of visible skincare items in the section

### Helpers
- `cart.helper.ts` → `verifyProductInCart(checkoutPage, expectedName)`
- `navigation.helper.ts` → `waitForNavigation(page)`

---

## Hard Rules

- **Never** use `page.waitForTimeout()`.
- **Never** import from `@playwright/test` in spec files.
- **Never** modify existing test intent when fixing regressions.
- **Always** run the full suite after changes to catch regressions.
- When a selector might be wrong, check the live site DOM before guessing.
- Features files in `features/` are living documentation only — not executed.
