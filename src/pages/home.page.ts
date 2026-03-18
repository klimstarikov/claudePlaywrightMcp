import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Page object for the automationteststore.com home page.
 * Provides access to the featured products section.
 */
export class HomePage extends BasePage {
  /**
   * Container wrapping all featured product column tiles.
   * The section is `section#featured` → `.thumbnails.list-inline` → `div.col-md-3` per product.
   */
  private readonly featuredSection: Locator;
  /** Each individual featured product column (contains name link + thumbnail). */
  private readonly featuredItems: Locator;
  /** Account link in the top navigation bar (hover to reveal dropdown). */
  private readonly accountMenuLink: Locator;
  /** Login link inside the Account dropdown (scoped to top nav to avoid duplicates). */
  private readonly loginDropdownLink: Locator;
  /** "Fragrance" link in the category navigation menu. */
  private readonly fragranceMenuLink: Locator;
  /** "Hair Care" link in the category navigation menu. */
  private readonly hairCareMenuLink: Locator;
  /** "Books" link in the category navigation menu. */
  private readonly booksMenuLink: Locator;
  /** "Men" link in the category navigation menu. */
  private readonly menMenuLink: Locator;

  constructor(page: Page) {
    super(page);
    this.featuredSection = page.locator('#featured .thumbnails');
    // Each product is wrapped in a responsive column inside the thumbnails list
    this.featuredItems = page.locator('#featured .thumbnails .col-md-3');
    // Scoped to #main_menu_top because the same links appear twice in the DOM
    this.accountMenuLink = page.locator('#main_menu_top a.menu_account');
    this.loginDropdownLink = page.locator('#main_menu_top a.menu_login');
    // Category nav — scoped to #categorymenu to avoid any footer duplicates
    this.fragranceMenuLink = page.locator('#categorymenu').getByRole('link', { name: 'Fragrance' });
    this.hairCareMenuLink = page.locator('#categorymenu').getByRole('link', { name: 'Hair Care' });
    this.booksMenuLink = page.locator('#categorymenu').getByRole('link', { name: 'Books' });
    this.menMenuLink = page.locator('#categorymenu').getByRole('link', { name: 'Men' });
  }

  /**
   * Navigates to the site home page.
   */
  async open(): Promise<void> {
    await this.navigateTo('/');
    await this.waitForPageLoad();
  }

  /**
   * Returns the locator for all featured product column items on the home page.
   */
  getFeaturedProducts(): Locator {
    return this.featuredItems;
  }

  /**
   * Hovers over the Account link in the top navigation to reveal its dropdown menu.
   */
  async hoverAccountLink(): Promise<void> {
    await this.accountMenuLink.hover();
  }

  /**
   * Clicks the Login link in the Account dropdown menu and waits for navigation.
   * Call {@link hoverAccountLink} first to ensure the dropdown is visible.
   */
  async clickLoginInDropdown(): Promise<void> {
    await this.loginDropdownLink.click();
    await this.waitForPageLoad();
  }

  /**
   * Clicks the "Hair Care" link in the category navigation menu and waits for navigation.
   */
  async clickHairCareMenu(): Promise<void> {
    await this.hairCareMenuLink.click();
    await this.waitForPageLoad();
  }

  /**
   * Clicks the "Fragrance" link in the category navigation menu and waits for navigation.
   */
  async clickFragranceMenu(): Promise<void> {
    await this.fragranceMenuLink.click();
    await this.waitForPageLoad();
  }

  /**
   * Clicks the "Books" link in the category navigation menu and waits for navigation.
   */
  async clickBooksMenu(): Promise<void> {
    await this.booksMenuLink.click();
    await this.waitForPageLoad();
  }

  /**
   * Clicks the "Men" link in the category navigation menu and waits for navigation.
   */
  async clickMenMenu(): Promise<void> {
    await this.menMenuLink.click();
    await this.waitForPageLoad();
  }

  /**
   * Hovers over the "Men" menu link to reveal subcategory options.
   */
  async hoverMenMenu(): Promise<void> {
    await this.menMenuLink.hover();
    // Give the submenu time to appear
    await this.page.waitForTimeout(500);
  }

  /**
   * Clicks the "Skincare" link from the expanded Men menu dropdown and waits for navigation.
   * Call {@link hoverMenMenu} first to ensure the dropdown is visible.
   * There are two Skincare links: Women's (first) and Men's (second), so we target the second.
   */
  async clickSkincareFromMenMenu(): Promise<void> {
    // The Men menu has two Skincare sub-links: Women's Skincare (first) and Men's Skincare (second)
    const skincareLink = this.page.locator('#categorymenu').getByRole('link', { name: 'Skincare' }).nth(1);
    await skincareLink.click();
    await this.waitForPageLoad();
  }

  /**
   * Clicks the first featured product's name link. Captures and returns the
   * product name text before clicking so it can be asserted downstream.
   * NOTE: The site has a typo in the CSS class — `prdocutname` is intentional.
   */
  async clickFirstFeaturedProduct(): Promise<string> {
    const firstItem = this.featuredItems.first();
    // `a.prdocutname` is the product name link (the class name contains a typo on the live site)
    const nameLink = firstItem.locator('a.prdocutname');
    const productName = await nameLink.innerText();
    await nameLink.click();
    return productName.trim();
  }
}
