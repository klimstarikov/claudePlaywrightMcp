import { expect } from '@playwright/test';
import { type CheckoutPage } from '@pages/checkout.page';

/**
 * Assertion helpers for the shopping cart / checkout page.
 */

/**
 * Asserts that the given product name is present in the cart.
 * Comparison normalises both strings with `.trim().toLowerCase()` to
 * handle minor whitespace or casing discrepancies from the live site.
 */
export async function verifyProductInCart(
  checkoutPage: CheckoutPage,
  expectedProductName: string,
): Promise<void> {
  const cartItemNames = await checkoutPage.getCartItemNames();
  const normalisedExpected = expectedProductName.trim().toLowerCase();
  const normalisedActual = cartItemNames.map((n) => n.trim().toLowerCase());

  expect(
    normalisedActual,
    `Expected cart to contain "${expectedProductName}" but found: ${cartItemNames.join(', ')}`,
  ).toContain(normalisedExpected);
}

/**
 * Asserts that the cart has no items and that the empty-cart message is shown.
 */
export async function verifyCartIsEmpty(checkoutPage: CheckoutPage): Promise<void> {
  const itemCount = await checkoutPage.getCartItemCount();
  expect(itemCount, 'Expected cart to have 0 items').toBe(0);

  const message = await checkoutPage.getEmptyCartMessage();
  expect(message.trim(), 'Expected empty-cart message to be shown').toContain(
    'Your shopping cart is empty!',
  );
}
