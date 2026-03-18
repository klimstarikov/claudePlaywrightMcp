import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Page object for the Skincare section/category page.
 * Provides methods to verify page content and item counts.
 */
export class SkincarePage extends BasePage {
  /** Heading text to verify we're on the Skincare page. */
  private readonly skincareHeading: Locator;
  /** Container for product items. */
  private readonly productItems: Locator;

  constructor(page: Page) {
    super(page);
    this.skincareHeading = page.locator('h1').filter({ hasText: 'Skincare' });
    // Target only product columns that contain actual product name links
    this.productItems = page.locator('.thumbnails .col-md-3').filter({ has: page.locator('a.prdocutname') });
  }

  /**
   * Verifies the user is on the Skincare page by checking for the Skincare heading.
   */
  async isOnPage(): Promise<boolean> {
    return this.isElementVisible(this.skincareHeading);
  }

  /**
   * Gets the count of items available in the Skincare section.
   */
  async getItemCount(): Promise<number> {
    const items = await this.productItems.all();
    let visibleCount = 0;
    
    for (const item of items) {
      if (await item.isVisible()) {
        visibleCount++;
      }
    }
    
    return visibleCount;
  }

  /**
   * Verifies that exactly 4 items are available in the section.
   */
  async hasExactlyFourItems(): Promise<boolean> {
    const count = await this.getItemCount();
    return count === 4;
  }
}
