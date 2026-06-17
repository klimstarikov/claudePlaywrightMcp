import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Structured representation of a single address entry in the Address Book.
 */
export interface AddressEntry {
  name: string;
  street: string;
  cityPostcode: string;
  region: string;
  country: string;
}

/**
 * Page object for the Address Book page (`index.php?rt=account/address`).
 * Exposes the first address entry displayed in the address table.
 */
export class AddressBookPage extends BasePage {
  /** The page heading confirming the user is on the Address Book page. */
  private readonly pageHeading: Locator;
  /**
   * The `<address>` element inside the first table row.
   * The site renders address lines as text nodes separated by `<br>` tags.
   */
  private readonly firstAddressCell: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.locator('h1.heading1').filter({ hasText: 'Address Book' });
    this.firstAddressCell = page.locator('table tbody tr:first-child td:first-child address');
  }

  /**
   * Returns true when the "Address Book" page heading is visible,
   * confirming the user has landed on the correct page.
   */
  async isOnPage(): Promise<boolean> {
    return this.isElementVisible(this.pageHeading);
  }

  /**
   * Returns the first address entry from the address table.
   * Lines are extracted from the `<address>` element in order:
   * name, street, city/postcode, region, country.
   */
  async getFirstAddressEntry(): Promise<AddressEntry> {
    // innerText splits on <br> as newlines; we trim each line and drop empties.
    const rawText = await this.firstAddressCell.innerText();
    const lines = rawText.split('\n').map((l) => l.trim()).filter(Boolean);

    return {
      name: lines[0] ?? '',
      street: lines[1] ?? '',
      cityPostcode: lines[2] ?? '',
      region: lines[3] ?? '',
      country: lines[4] ?? '',
    };
  }
}
