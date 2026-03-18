import { test, expect } from '../src/fixtures/page-fixtures';

test.describe('Men Skincare Navigation', () => {
  test('unregistered user navigates to men skincare section', async ({ homePage, skincarePage }) => {
    await test.step('Given an unregistered user logs in', async () => {
      // Navigation to home page to begin
      await homePage.open();
    });

    await test.step('When user hovers over Men menu section from Home page', async () => {
      await homePage.hoverMenMenu();
    });

    await test.step('And user clicks on Skincare button from the expanded list', async () => {
      await homePage.clickSkincareFromMenMenu();
    });

    await test.step('Then user appears on the MEN -> Skincare page', async () => {
      const isOnSkincarePage = await skincarePage.isOnPage();
      expect(isOnSkincarePage).toBe(true);
    });

    await test.step('And user sees 4 items available in the section', async () => {
      const itemCount = await skincarePage.getItemCount();
      expect(itemCount).toBe(4);
    });
  });
});
