# Playwright BDD Test Automation Framework

End-to-end test automation suite for [automationteststore.com](https://automationteststore.com/) — a demo e-commerce store used as the application under test.

## Application Under Test

**URL:** https://automationteststore.com/

An open demo online store that simulates a real e-commerce experience. It includes:

- A **home page** with featured products and category navigation
- **Product detail pages** with add-to-cart functionality
- A **shopping cart / checkout page** for reviewing and managing cart contents
- An **account section** with login and registration flows

## Tech Stack

| Tool | Version |
|------|---------|
| Playwright | 1.58.2 |
| TypeScript | 5.x |
| Node.js | 18+ |
| Browser | Chromium (headless) |

## Architecture

```
src/
├── pages/
│   ├── base.page.ts          # Abstract base — all page objects extend this
│   ├── home.page.ts          # Home page (featured products, account nav)
│   ├── product.page.ts       # Product detail page
│   ├── checkout.page.ts      # Cart / checkout page
│   └── account.page.ts       # Account login & registration page
├── helpers/
│   ├── cart.helper.ts        # Cart assertion helpers
│   └── navigation.helper.ts  # Navigation utilities
└── fixtures/
    └── page-fixtures.ts      # Custom test fixtures (dependency injection)

tests/
├── checkout-flow.spec.ts     # Add to cart and verify checkout
└── account-login.spec.ts     # Account login page scenarios

features/
└── account-login.feature     # BDD Gherkin scenarios (living documentation)
```

### Design Patterns

- **Page Object Model (POM)** — all selectors and interactions encapsulated in page classes
- **Custom Fixtures** — page objects injected into tests via `test.extend()`, no manual instantiation
- **BDD-style tests** — each test maps Gherkin steps to `test.step()` blocks

## Getting Started

### Install dependencies

```bash
npm install
npx playwright install chromium
```

### Run all tests

```bash
npx playwright test
```

### Run a specific file

```bash
npx playwright test tests/checkout-flow.spec.ts
npx playwright test tests/account-login.spec.ts
```

### Run by scenario name

```bash
npx playwright test --grep "scenario name"
```

### Debug mode

```bash
npx playwright test --debug
```

### View HTML report

```bash
npx playwright show-report
```

## Test Coverage

| Scenario | File |
|----------|------|
| Add featured product to cart and verify on checkout page | `checkout-flow.spec.ts` |
| Unregistered user navigating to login is prompted to create an account | `account-login.spec.ts` |
