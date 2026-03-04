import { test as base, expect } from '@playwright/test';
import { HomePage } from '@pages/home.page';
import { ProductPage } from '@pages/product.page';
import { CheckoutPage } from '@pages/checkout.page';
import { AccountPage } from '@pages/account.page';
import { FragrancePage } from '@pages/fragrance.page';
import { HairCarePage } from '@pages/haircare.page';

/** Shape of the custom fixture object injected into every test. */
type PageFixtures = {
  homePage: HomePage;
  productPage: ProductPage;
  checkoutPage: CheckoutPage;
  accountPage: AccountPage;
  fragrancePage: FragrancePage;
  hairCarePage: HairCarePage;
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
});

export { expect };
