import { type Page } from '@playwright/test';

/**
 * Stateless navigation utilities used across the test framework.
 * Add new helpers here as the suite grows — no need to modify any page objects.
 */
export class NavigationHelper {
  /**
   * Waits for the page to reach a fully loaded state.
   * Wraps `page.waitForLoadState` so tests never call Playwright internals directly.
   */
  static async waitForNavigation(page: Page): Promise<void> {
    await page.waitForLoadState('load');
  }
}
