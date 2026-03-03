import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Page object for the shopping cart / checkout page.
 */
export class CheckoutPage extends BasePage {
  /** The main cart items table/container. */
  private readonly cartTable: Locator;
  /** Individual rows representing cart items. */
  private readonly cartItemRows: Locator;
  /** Message displayed when the cart has no items. */
  private readonly emptyCartMessage: Locator;

  constructor(page: Page) {
    super(page);
    // The cart table lives inside `.cart-info.product-list` on the checkout/cart page
    this.cartTable = page.locator('.cart-info.product-list table');
    // Product rows have `td` elements; the header row uses only `th` elements so it is excluded
    this.cartItemRows = page.locator('.cart-info.product-list table tbody tr:has(td)');
    this.emptyCartMessage = page.getByText('Your shopping cart is empty!');
  }

  /**
   * Returns an array of product name strings currently present in the cart.
   * Names are taken from the product link in the "Name" column (`td.align_left a[href*="product"]`).
   */
  async getCartItemNames(): Promise<string[]> {
    await this.cartTable.waitFor({ state: 'visible' });
    // Each product row has a name link in td.align_left that points to the product page
    const nameLocators = this.page.locator('.cart-info.product-list table td.align_left a[href*="product"]');
    const count = await nameLocators.count();
    const names: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await nameLocators.nth(i).innerText();
      names.push(text.trim());
    }
    return names;
  }

  /**
   * Returns true if a product with the given name is present in the cart.
   * Comparison is case-insensitive and trims surrounding whitespace.
   */
  async isProductInCart(productName: string): Promise<boolean> {
    const names = await this.getCartItemNames();
    const normalised = productName.trim().toLowerCase();
    return names.some((n) => n.toLowerCase() === normalised);
  }

  /**
   * Returns the number of distinct product line items in the cart.
   * Returns 0 when the cart is empty (table is absent).
   */
  async getCartItemCount(): Promise<number> {
    return this.cartItemRows.count();
  }

  /**
   * Clicks the remove link on the first cart item row and waits for the page to reload.
   */
  async removeFirstItem(): Promise<void> {
    const removeLink = this.cartItemRows.first().locator('a[href*="remove"]');
    await removeLink.click();
    await this.waitForPageLoad();
  }

  /**
   * Returns the empty-cart message text.
   * Waits for the message to become visible first.
   */
  async getEmptyCartMessage(): Promise<string> {
    await this.emptyCartMessage.waitFor({ state: 'visible' });
    return this.emptyCartMessage.innerText();
  }
}
