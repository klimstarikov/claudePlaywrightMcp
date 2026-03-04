import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Page object for the Fragrance category page on automationteststore.com.
 * Covers the category listing with Men / Women sub-category links.
 */
export class FragrancePage extends BasePage {
  /** Heading that identifies the Fragrance category page. */
  private readonly pageHeading: Locator;
  /** Sub-category links rendered in the left-hand category sidebar. */
  private readonly categoryLinks: Locator;

  constructor(page: Page) {
    super(page);
    // The category page uses a generic heading; scoped to the content area.
    this.pageHeading = page.locator('.heading1 span.maintext');
    // Sub-category tiles shown in the main content area (category thumbnails).
    this.categoryLinks = page.locator('.subcategories').getByRole('link');
  }

  /**
   * Returns true when the Fragrance page heading is visible.
   */
  async isOnPage(): Promise<boolean> {
    return this.isElementVisible(this.pageHeading);
  }

  /**
   * Returns true if a sub-category link with the given name is visible on the page.
   * Comparison is case-insensitive and trims surrounding whitespace.
   */
  async hasCategoryVisible(name: string): Promise<boolean> {
    const normalised = name.trim().toLowerCase();
    const links = await this.categoryLinks.all();
    for (const link of links) {
      const text = (await link.innerText()).trim().toLowerCase();
      if (text === normalised) return true;
    }
    return false;
  }
}
