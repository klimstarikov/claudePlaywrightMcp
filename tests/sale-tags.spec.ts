import { test, expect } from '../src/fixtures/page-fixtures';

test.describe('Sales tag for products on sale', () => {
  test('Non-logged-in user sees Sale tag on product with strikethrough price on Home page', async ({ homePage }) => {
    let productName: string;

    await test.step('Given a non-logged-in user is on the Home page', async () => {
      await homePage.open();
    });

    await test.step('When the user scrolls down the Home page', async () => {
      await homePage.scrollToFeaturedSection();
    });

    await test.step('And a product with a strikethrough original price is visible in the featured products section', async () => {
      productName = await homePage.getFirstFeaturedProductNameWithStrikethroughPrice();
    });

    await test.step('Then that product displays a "Sale" tag', async () => {
      expect(await homePage.featuredProductHasSaleTag(productName!)).toBe(true);
    });
  });
});
