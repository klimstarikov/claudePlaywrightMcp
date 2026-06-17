import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Page object for the My Account dashboard (`index.php?rt=account/account`).
 * Covers the dashboard tiles section shown after a successful login.
 */
export class MyAccountPage extends BasePage {
  /** The "Manage Address Book" dashboard tile — the first tile in .dash-tiles. */
  private readonly addressBookTile: Locator;
  /** Counter text inside the "Manage Address Book" tile (.dash-tile-text). */
  private readonly addressBookCounter: Locator;
  /** The settings/link button inside the "Manage Address Book" tile that navigates to the address list. */
  private readonly addressBookLink: Locator;

  constructor(page: Page) {
    super(page);
    // Scope all selectors to the first dash tile whose header contains "Manage Address Book"
    this.addressBookTile = page.locator('.dash-tiles .dash-tile').filter({ hasText: 'Manage Address Book' });
    this.addressBookCounter = this.addressBookTile.locator('.dash-tile-text');
    this.addressBookLink = this.addressBookTile.locator('a.btn');
  }

  /**
   * Navigates directly to the My Account dashboard page.
   */
  async navigateTo(): Promise<void> {
    await this.page.goto('index.php?rt=account/account');
    await this.waitForPageLoad();
  }

  /**
   * Returns the text of the counter shown on the "Manage Address Book" tile.
   * Typically '1' when one address is saved.
   */
  async getManageAddressBookCount(): Promise<string> {
    return (await this.addressBookCounter.innerText()).trim();
  }

  /**
   * Clicks the settings link inside the "Manage Address Book" tile,
   * navigating to the Address Book page.
   */
  async clickManageAddressBook(): Promise<void> {
    await this.addressBookLink.click();
    await this.waitForPageLoad();
  }
}
