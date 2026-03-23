import { test, expect } from '../src/fixtures/page-fixtures';

test.describe('Home page sections visibility', () => {
  test('Not logged in user sees all main sections on the home page', async ({ homePage }) => {
    await test.step('Given not logged in user navigates to the home page', async () => {
      await homePage.open();
    });

    await test.step('When user observes the home page', async () => {
      // Observation only — no action required
    });

    await test.step("Then user sees 'Featured', 'Latest Products', 'Bestsellers', 'Specials', 'Brands Scrolling List' sections", async () => {
      expect(await homePage.hasSectionVisible('Featured')).toBe(true);
      expect(await homePage.hasSectionVisible('Latest Products')).toBe(true);
      expect(await homePage.hasSectionVisible('Bestsellers')).toBe(true);
      expect(await homePage.hasSectionVisible('Specials')).toBe(true);
      expect(await homePage.hasSectionVisible('Brands Scrolling List')).toBe(true);
    });
  });
});
