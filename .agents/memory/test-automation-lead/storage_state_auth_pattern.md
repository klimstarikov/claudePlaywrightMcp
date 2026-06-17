---
name: Storage state auth pattern
description: How authenticated tests work in this project — saved session via global setup, loggedInPage fixture
type: project
---

## Pattern

- `src/setup/global-setup.ts` — Playwright global setup; logs in as KARL_DAVIES via UI once, saves cookies+localStorage to `.auth/karl-davies.json`.
- `playwright.config.ts` has `globalSetup: './src/setup/global-setup.ts'`.
- `src/fixtures/page-fixtures.ts` exposes three auth fixtures:
  - `loggedInPage` — a `Page` backed by a new browser context with `storageState: .auth/karl-davies.json`
  - `loggedInMyAccountPage` — `MyAccountPage` on top of `loggedInPage`
  - `loggedInAddressBookPage` — `AddressBookPage` on top of `loggedInPage`
- `.auth/` is gitignored.

## Rule

- Tests NOT about login/logout → use `loggedInPage` / `loggedInMyAccountPage` / `loggedInAddressBookPage`.
- Tests explicitly testing login or logout → keep UI login steps (use `accountPage`, unauthenticated `page`, etc.).
- `account-login.spec.ts` is the login-behaviour test — leave its UI steps untouched.
- `address-book.spec.ts` uses storage state (already converted as of 2026-06-17).

## If global setup fails

The saved auth file `.auth/karl-davies.json` is recreated on every `npx playwright test` run via global setup. If the AUT changes its login form selectors, update `src/setup/global-setup.ts`.
