import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Page object for the Account Login page (`index.php?rt=account/login`).
 * Covers both the "new customer" register section and the "returning customer" login section.
 */
export class AccountPage extends BasePage {
  /** Main heading of the account login page. */
  private readonly pageHeading: Locator;
  /** "Register Account" radio button in the new-customer section (pre-checked by default). */
  private readonly registerAccountRadio: Locator;
  /** Login Name text input in the returning-customer section. */
  private readonly loginNameInput: Locator;
  /** Password input in the returning-customer section. */
  private readonly passwordInput: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.locator('h1.heading1');
    this.registerAccountRadio = page.locator('#accountFrm_accountregister');
    this.loginNameInput = page.locator('#loginFrm_loginname');
    this.passwordInput = page.locator('#loginFrm_password');
  }

  /**
   * Returns true when the "Account Login" page heading is visible,
   * confirming the user has landed on the correct page.
   */
  async isOnPage(): Promise<boolean> {
    return this.isElementVisible(this.pageHeading);
  }

  /**
   * Returns true if the "Register Account" radio button is currently checked.
   */
  async isRegisterAccountChecked(): Promise<boolean> {
    return this.registerAccountRadio.isChecked();
  }

  /**
   * Returns the current value of the Login Name input field.
   * An empty string means the field is blank.
   */
  async getLoginNameValue(): Promise<string> {
    return this.loginNameInput.inputValue();
  }

  /**
   * Returns the current value of the Password input field.
   * An empty string means the field is blank.
   */
  async getPasswordValue(): Promise<string> {
    return this.passwordInput.inputValue();
  }

  /**
   * Fills in the login form with the provided credentials and submits it,
   * then waits for the page to load (redirects to My Account on success).
   */
  async login(username: string, password: string): Promise<void> {
    await this.loginNameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.page.locator('button[title="Login"]').click();
    await this.waitForPageLoad();
  }
}
