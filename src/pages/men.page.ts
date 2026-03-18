import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Page object for the Men category page.
 * Provides access to Men sub-category menu sections.
 */
export class MenPage extends BasePage {
  /** "Skincare" link in the Men sub-category menu. */
  private readonly skincareMenuLink: Locator;

  constructor(page: Page) {
    super(page);
    // Scoped to #categorymenu and use .first() to target the Men's Skincare link
    // (Women's Skincare would be the .nth(1))
    this.skincareMenuLink = page.locator('#categorymenu').getByRole('link', { name: 'Skincare' }).first();
  }

  /**
   * Verifies the user is on the Men page by checking for the Men heading.
   */
  async isOnPage(): Promise<boolean> {
    const menHeading = this.page.locator('h1').filter({ hasText: 'Men' });
    return this.isElementVisible(menHeading);
  }

  /**
   * Checks if a sub-category link is visible by name (case-insensitive).
   */
  async hasSubcategoryVisible(name: string): Promise<boolean> {
    const subcategoryLink = this.page
      .locator('#categorymenu')
      .getByRole('link', { name: new RegExp(name, 'i') });
    return this.isElementVisible(subcategoryLink);
  }

  /**
   * Clicks the "Skincare" link in the Men sub-category menu and waits for navigation.
   */
  async clickSkincareMenu(): Promise<void> {
    await this.skincareMenuLink.click();
    await this.waitForPageLoad();
  }
}
