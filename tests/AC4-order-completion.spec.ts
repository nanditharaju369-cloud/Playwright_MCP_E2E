import { test, expect } from '@playwright/test';
import { LoginPage } from '../LoginPage';
import { InventoryPage } from '../InventoryPage';
import { CartPage } from '../CartPage';
import { CheckoutPage } from '../CheckoutPage';
import { OverviewPage } from '../OverviewPage';
import { ConfirmationPage } from '../ConfirmationPage';

test.describe('AC4 - Order Completion Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;
  let overviewPage: OverviewPage;
  let confirmationPage: ConfirmationPage;

  // Helper function to complete checkout flow
  async function completeCheckout(page: any, itemIds: string[] = ['add-to-cart-sauce-labs-backpack']) {
    await loginPage.navigateTo();
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Add items
    for (const itemId of itemIds) {
      await inventoryPage.addItemToCart(itemId);
    }
    
    // Proceed through checkout
    await inventoryPage.navigateToCart();
    await cartPage.clickCheckout();
    await checkoutPage.fillCheckoutForm('John', 'Doe', '12345');
    await checkoutPage.clickContinue();
    await overviewPage.clickFinish();
  }

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    overviewPage = new OverviewPage(page);
    confirmationPage = new ConfirmationPage(page);
  });

  test('AC4-001: Verify completion page displays success message', async ({ page }) => {
    await completeCheckout(page, ['add-to-cart-sauce-labs-backpack']);

    // Verify completion page
    await confirmationPage.verifyCompletionPageDisplayed();
    await confirmationPage.verifyURL();
  });

  test('AC4-002: Verify order confirmation details visible', async ({ page }) => {
    await completeCheckout(page, ['add-to-cart-sauce-labs-backpack']);

    // Verify success message
    await confirmationPage.verifySuccessMessage();
    
    // Verify pony image
    await confirmationPage.verifyPonyImage();
  });

  test('AC4-003: Test back home button functionality', async ({ page }) => {
    await completeCheckout(page, ['add-to-cart-sauce-labs-backpack']);

    // Verify back home button is visible
    await expect(page.locator('button:has-text("Back Home")')).toBeVisible();

    // Click back home
    await confirmationPage.clickBackHome();

    // Verify returned to inventory
    expect(page.url()).toContain('inventory.html');
    await inventoryPage.verifyInventoryPageDisplayed();

    // Verify cart is reset
    const cartBadge = page.locator('.shopping_cart_badge');
    const badgeExists = await cartBadge.isVisible().catch(() => false);
    expect(badgeExists).toBeFalsy();
  });

  test('AC4-004: Test multiple items order completion', async ({ page }) => {
    await completeCheckout(page, [
      'add-to-cart-sauce-labs-backpack',
      'add-to-cart-sauce-labs-bike-light',
      'add-to-cart-sauce-labs-bolt-t-shirt',
      'add-to-cart-sauce-labs-fleece-jacket',
    ]);

    // Verify completion page displays regardless of item count
    await confirmationPage.verifyCompletionPageDisplayed();
    await confirmationPage.verifySuccessMessage();

    // Verify URL
    expect(page.url()).toContain('checkout-complete');
  });

  test('AC4-005: Verify order completion page header', async ({ page }) => {
    await completeCheckout(page, ['add-to-cart-sauce-labs-backpack']);

    // Verify page header elements
    await expect(page.locator('text="Checkout: Complete!"')).toBeVisible();
    
    // Verify Swag Labs logo/branding
    const logo = page.locator('.app_logo');
    await expect(logo).toBeVisible();
  });

  test('AC4-006: Verify thank you message content', async ({ page }) => {
    await completeCheckout(page, ['add-to-cart-sauce-labs-backpack']);

    // Verify exact messages
    const thankYouHeading = page.locator('h2:has-text("Thank you for your order!")');
    await expect(thankYouHeading).toBeVisible();

    const dispatchMessage = page.locator('text="Your order has been dispatched, and will arrive just as fast as the pony can get there!"');
    await expect(dispatchMessage).toBeVisible();
  });

  test('AC4-007: Verify single item order completion', async ({ page }) => {
    await completeCheckout(page, ['add-to-cart-sauce-labs-backpack']);

    // Verify completion page for single item
    await expect(page.locator('text="Thank you for your order!"')).toBeVisible();
    expect(page.url()).toContain('checkout-complete');
  });

  test('AC4-008: Verify cart is empty after completion', async ({ page }) => {
    await completeCheckout(page, ['add-to-cart-sauce-labs-backpack']);

    // Click back home
    await confirmationPage.clickBackHome();

    // Verify we're on inventory
    expect(page.url()).toContain('inventory.html');

    // Verify cart badge is gone (cart empty)
    const cartBadge = page.locator('.shopping_cart_badge');
    const exists = await cartBadge.isVisible().catch(() => false);
    expect(exists).toBeFalsy();
  });
});
