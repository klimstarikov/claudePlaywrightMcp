import { test, expect } from '../src/fixtures/page-fixtures';

test.describe('Books category navigation', () => {
  test('Unregistered user navigates to Books section and sees subcategories', async ({
    homePage,
    booksPage,
  }) => {
    await test.step('Given an unregistered user is on the home page', async () => {
      await homePage.open();
    });

    await test.step("When user opens 'Books' menu section from Home page", async () => {
      await homePage.clickBooksMenu();
    });

    await test.step('Then user appears on the Books page', async () => {
      expect(await booksPage.isOnPage()).toBe(true);
    });

    await test.step("And 'Audio CD' category is shown", async () => {
      expect(await booksPage.hasCategoryVisible('Audio CD')).toBe(true);
    });

    await test.step("And 'Paperback' category is shown", async () => {
      expect(await booksPage.hasCategoryVisible('Paperback')).toBe(true);
    });
  });
});
