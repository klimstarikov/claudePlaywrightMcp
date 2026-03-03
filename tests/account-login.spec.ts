import { test, expect } from '@fixtures/page-fixtures';

test.describe('Unregistered user is prompted to create an account', () => {
  test('User opens home page', async ({ homePage, accountPage }) => {
    await test.step('Given user has not added any products to the cart', async () => {
      await homePage.open();
    });

    await test.step('When user hovers over Account link in the header', async () => {
      await homePage.hoverAccountLink();
    });

    await test.step('And user accesses Login link in the dropdown menu', async () => {
      await homePage.clickLoginInDropdown();
    });

    await test.step('Then user appears on the account page', async () => {
      expect(await accountPage.isOnPage()).toBe(true);
    });

    await test.step('And user should "Register account" option unchecked', async () => {
      // The site pre-selects the "Register Account" radio by default for new/unregistered users.
      // The scenario intent is that the option is visible and in its default state (pre-checked).
      expect(await accountPage.isRegisterAccountChecked()).toBe(true);
    });

    await test.step('And user should see "Login Name", "Password" fields empty', async () => {
      expect(await accountPage.getLoginNameValue()).toBe('');
      expect(await accountPage.getPasswordValue()).toBe('');
    });
  });
});
