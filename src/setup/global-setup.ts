import { chromium, type FullConfig } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';
import { KARL_DAVIES } from '../test-data/users';

/**
 * Playwright global setup: logs in as KARL_DAVIES via the UI and saves
 * the browser storage state (cookies + localStorage) to .auth/karl-davies.json.
 * Authenticated tests load this file via the `loggedInPage` fixture so they
 * skip the login UI step entirely.
 */
async function globalSetup(config: FullConfig): Promise<void> {
  const { baseURL } = config.projects[0].use;

  // Ensure the .auth directory exists
  const authDir = path.resolve('.auth');
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  const browser = await chromium.launch();
  const context = await browser.newContext({ baseURL });
  const page = await context.newPage();

  // Navigate to the login page and authenticate
  await page.goto('index.php?rt=account/login');
  await page.locator('#loginFrm_loginname').fill(KARL_DAVIES.credentials.username);
  await page.locator('#loginFrm_password').fill(KARL_DAVIES.credentials.password);
  await page.locator('button[title="Login"]').click();
  await page.waitForLoadState('domcontentloaded');

  // Persist storage state for reuse across authenticated tests
  await context.storageState({ path: path.join(authDir, 'karl-davies.json') });

  await browser.close();
}

export default globalSetup;
