import { test as base, expect, type Page } from '@playwright/test';
import * as path from 'path';
import { HomePage } from '@pages/home.page';
import { ProductPage } from '@pages/product.page';
import { CheckoutPage } from '@pages/checkout.page';
import { AccountPage } from '@pages/account.page';
import { FragrancePage } from '@pages/fragrance.page';
import { HairCarePage } from '@pages/haircare.page';
import { BooksPage } from '@pages/books.page';
import { MenPage } from '@pages/men.page';
import { SkincarePage } from '@pages/skincare.page';
import { MyAccountPage } from '@pages/my-account.page';
import { AddressBookPage } from '@pages/address-book.page';

/** Path to the saved storage state produced by global setup. */
const KARL_DAVIES_AUTH = path.resolve('.auth', 'karl-davies.json');

/** Shape of the custom fixture object injected into every test. */
type PageFixtures = {
  homePage: HomePage;
  productPage: ProductPage;
  checkoutPage: CheckoutPage;
  accountPage: AccountPage;
  fragrancePage: FragrancePage;
  hairCarePage: HairCarePage;
  booksPage: BooksPage;
  menPage: MenPage;
  skincarePage: SkincarePage;
  myAccountPage: MyAccountPage;
  addressBookPage: AddressBookPage;
  /**
   * A `Page` that starts with the KARL_DAVIES storage state already applied,
   * so the test runs as an authenticated user without going through the login UI.
   * Use this fixture in tests that require a logged-in session but are NOT
   * testing login / logout behaviour themselves.
   */
  loggedInPage: Page;
  /**
   * Page objects instantiated against the authenticated `loggedInPage`.
   * Use these alongside `loggedInPage` in tests that need auth.
   */
  loggedInMyAccountPage: MyAccountPage;
  loggedInAddressBookPage: AddressBookPage;
};

/**
 * Extended `test` that auto-instantiates all page objects and injects them
 * into every spec. Add a new page object here and it is available everywhere.
 */
export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },
  fragrancePage: async ({ page }, use) => {
    await use(new FragrancePage(page));
  },
  hairCarePage: async ({ page }, use) => {
    await use(new HairCarePage(page));
  },
  booksPage: async ({ page }, use) => {
    await use(new BooksPage(page));
  },
  menPage: async ({ page }, use) => {
    await use(new MenPage(page));
  },
  skincarePage: async ({ page }, use) => {
    await use(new SkincarePage(page));
  },
  myAccountPage: async ({ page }, use) => {
    await use(new MyAccountPage(page));
  },
  addressBookPage: async ({ page }, use) => {
    await use(new AddressBookPage(page));
  },

  // ---------------------------------------------------------------------------
  // Authenticated fixtures — use the saved storage state from global setup
  // ---------------------------------------------------------------------------

  loggedInPage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: KARL_DAVIES_AUTH,
    });
    const authPage = await context.newPage();
    await use(authPage);
    await context.close();
  },

  loggedInMyAccountPage: async ({ loggedInPage }, use) => {
    await use(new MyAccountPage(loggedInPage));
  },

  loggedInAddressBookPage: async ({ loggedInPage }, use) => {
    await use(new AddressBookPage(loggedInPage));
  },
});

export { expect };
