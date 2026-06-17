import { test, expect } from '../src/fixtures/page-fixtures';
import { KARL_DAVIES } from '../src/test-data/users';

test.describe('Address Book verification', () => {
  test('Karl Davies sees correct address in the Address Book', async ({
    loggedInMyAccountPage,
    loggedInAddressBookPage,
  }) => {
    await test.step('Given user Karl Davies is logged in', async () => {
      // Authentication is provided via saved storage state (global setup).
      // No UI login steps needed — the browser context already carries
      // KARL_DAVIES session cookies.
    });

    await test.step('When user navigates to the Account page', async () => {
      await loggedInMyAccountPage.navigateTo();
    });

    await test.step('Then user sees "Manage address book" section with a counter showing \'1\'', async () => {
      expect(await loggedInMyAccountPage.getManageAddressBookCount()).toBe('1');
    });

    await test.step('When user clicks "Manage address book" button', async () => {
      await loggedInMyAccountPage.clickManageAddressBook();
    });

    await test.step('Then user lands on the Address Book page', async () => {
      expect(await loggedInAddressBookPage.isOnPage()).toBe(true);
    });

    await test.step('And the address entry matches Karl Davies\'s expected details', async () => {
      const entry = await loggedInAddressBookPage.getFirstAddressEntry();
      const expected = KARL_DAVIES.address;

      expect(entry.name.toLowerCase()).toBe(expected.name.toLowerCase());
      expect(entry.street).toBe(expected.street);
      expect(entry.cityPostcode).toBe(expected.cityPostcode);
      expect(entry.region).toBe(expected.region);
      expect(entry.country).toBe(expected.country);
    });
  });
});
