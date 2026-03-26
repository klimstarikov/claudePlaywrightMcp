// @skill: add-page-object
import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class PasswordResetPage extends BasePage {
  private readonly heading: Locator;
  private readonly emailInput: Locator;
  private readonly submitButton: Locator;
  private readonly confirmationMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = this.page.getByRole('heading', { name: 'Forgot Your Password?' });
    this.emailInput = this.page.getByLabel('E-Mail Address');
    this.submitButton = this.page.getByRole('button', { name: 'Submit' });
    this.confirmationMessage = this.page.locator('.alert-success');
  }

  /** Returns true when the Password Reset page heading is visible. */
  async isOnPage(): Promise<boolean> {
    return this.isElementVisible(this.heading);
  }

  /** Fills in the email address field with the given value. */
  async enterEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  /** Clicks the Submit button and waits for navigation. */
  async submitResetRequest(): Promise<void> {
    await this.submitButton.click();
    await this.waitForPageLoad();
  }

  /** Returns the text content of the confirmation/success message. */
  async getConfirmationMessage(): Promise<string> {
    return (await this.confirmationMessage.innerText()).trim();
  }

  /** Returns true when the confirmation/success message is visible. */
  async hasConfirmationMessage(): Promise<boolean> {
    return this.isElementVisible(this.confirmationMessage);
  }
}
