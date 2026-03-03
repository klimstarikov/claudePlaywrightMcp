import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Page object for an individual product detail page.
 */
export class ProductPage extends BasePage {
  /** The product name/title `<h1>` heading on the product detail page. */
  private readonly productNameHeading: Locator;
  /**
   * The "Add to Cart" link inside `.productpagecart`.
   * Clicking it submits the underlying form and navigates to the cart.
   */
  private readonly addToCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.productNameHeading = page.locator('h1.productname');
    this.addToCartButton = page.locator('.productpagecart a.cart');
  }

  /**
   * Returns the visible product name text from the product detail page heading.
   */
  async getProductName(): Promise<string> {
    await this.productNameHeading.waitFor({ state: 'visible' });
    return (await this.productNameHeading.innerText()).trim();
  }

  /**
   * Clicks the "Add to Cart" button, which submits the cart form and
   * navigates the browser to the shopping cart page.
   */
  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
    await this.waitForPageLoad();
  }
}
