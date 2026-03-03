import { type Locator, type Page } from '@playwright/test';

/**
 * Abstract base page that all page objects extend.
 * Provides shared utility methods used across the framework.
 */
export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates to the given path relative to the configured baseURL.
   */
  async navigateTo(path: string): Promise<void> {
    await this.page.goto(path);
  }

  /**
   * Waits for the page DOM content to be fully loaded.
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Returns the current page title.
   */
  async getTitle(): Promise<string> {
    return this.page.title();
  }

  /**
   * Returns true if the given locator is visible on the page.
   */
  async isElementVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }
}
