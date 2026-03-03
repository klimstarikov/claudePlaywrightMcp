import { test, expect } from '@fixtures/page-fixtures';
import { verifyProductInCart, verifyCartIsEmpty } from '@helpers/cart.helper';

test.describe('Checkout Flow', () => {
  test('should add first featured product to cart and verify it on checkout page', async ({
    homePage,
    productPage,
    checkoutPage,
  }) => {
    let firstProductName: string;

    await test.step('Open home page', async () => {
      await homePage.open();
      expect(await homePage.getTitle()).toBeTruthy();
    });

    await test.step('Get first featured product name and click it', async () => {
      firstProductName = await homePage.clickFirstFeaturedProduct();
      expect(firstProductName).toBeTruthy();
    });

    await test.step('Verify product name on product page and add to cart', async () => {
      const pageProductName = await productPage.getProductName();
      expect(pageProductName.trim().toLowerCase()).toBe(firstProductName.trim().toLowerCase());
      await productPage.addToCart();
    });

    await test.step('Verify product appears in cart on checkout page', async () => {
      await verifyProductInCart(checkoutPage, firstProductName);
    });

    await test.step('Remove item from cart', async () => {
      await checkoutPage.removeFirstItem();
    });

    await test.step('Verify cart is empty and empty-cart message is shown', async () => {
      await verifyCartIsEmpty(checkoutPage);
    });
  });
});
