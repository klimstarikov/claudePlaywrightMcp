import { test, expect } from '../src/fixtures/page-fixtures';

test.describe('Hair Care category navigation', () => {
  test('Unregistered user navigates to Hair Care section and sees subcategories', async ({
    homePage,
    hairCarePage,
  }) => {
    await test.step('Given an unregistered user is on the home page', async () => {
      await homePage.open();
    });

    await test.step("When user opens 'Hair Care' menu section from Home page", async () => {
      await homePage.clickHairCareMenu();
    });

    await test.step('Then user appears on the Hair Care page', async () => {
      expect(await hairCarePage.isOnPage()).toBe(true);
    });

    await test.step("And 'Conditioner' category is shown", async () => {
      expect(await hairCarePage.hasCategoryVisible('Conditioner')).toBe(true);
    });

    await test.step("And 'Shampoo' category is shown", async () => {
      expect(await hairCarePage.hasCategoryVisible('Shampoo')).toBe(true);
    });
  });
});
