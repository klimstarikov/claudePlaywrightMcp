import { test, expect } from '../src/fixtures/page-fixtures';

test.describe('Fragrance category navigation', () => {
  test('Unregistered user navigates to Fragrance section and sees subcategories', async ({
    homePage,
    fragrancePage,
  }) => {
    await test.step('Given an unregistered user is on the home page', async () => {
      await homePage.open();
    });

    await test.step("When user opens 'Fragrance' menu section", async () => {
      await homePage.clickFragranceMenu();
    });

    await test.step('Then user appears on the Fragrance page', async () => {
      expect(await fragrancePage.isOnPage()).toBe(true);
    });

    await test.step("And 'Men' category is shown", async () => {
      expect(await fragrancePage.hasCategoryVisible('Men')).toBe(true);
    });

    await test.step("And 'Women' category is shown", async () => {
      expect(await fragrancePage.hasCategoryVisible('Women')).toBe(true);
    });
  });
});
