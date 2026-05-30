import { test, expect } from '@playwright/test';
import { LoginPage } from '../LoginPage';
import { InventoryPage } from '../InventoryPage';
import { CartPage } from '../CartPage';
import { CheckoutPage } from '../CheckoutPage';

test.describe('AC2 - Checkout Information Entry Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    // Navigate, login, add item, and go to checkout
    await loginPage.navigateTo();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addItemToCart('add-to-cart-sauce-labs-backpack');
    await inventoryPage.navigateToCart();
    await cartPage.clickCheckout();
    await checkoutPage.verifyCheckoutFormDisplayed();
  });

  test('AC2-001: Verify checkout form fields visible', async ({ page }) => {
    // Verify all form fields are visible and empty
    await expect(page.locator('#first-name')).toBeVisible();
    await expect(page.locator('#last-name')).toBeVisible();
    await expect(page.locator('#postal-code')).toBeVisible();

    // Verify placeholders
    const firstNameInput = page.locator('#first-name');
    const placeholder = await firstNameInput.getAttribute('placeholder');
    expect(placeholder).toBe('First Name');

    // Verify buttons
    await expect(page.locator('#continue')).toBeVisible();
    await expect(page.locator('#cancel')).toBeVisible();
  });

  test('AC2-002: Test missing first name validation', async ({ page }) => {
    // Fill form without first name
    await checkoutPage.clearFirstName();
    await checkoutPage.fillLastName('Doe');
    await checkoutPage.fillPostalCode('12345');

    // Attempt to submit
    await checkoutPage.clickContinue();

    // Verify error message
    await checkoutPage.verifyErrorMessage('Error: First Name is required');
    
    // Verify we stayed on checkout page
    expect(page.url()).toContain('checkout-step-one');
  });

  test('AC2-003: Test missing last name validation', async ({ page }) => {
    // Fill form without last name
    await checkoutPage.fillFirstName('John');
    await checkoutPage.clearLastName();
    await checkoutPage.fillPostalCode('12345');

    // Attempt to submit
    await checkoutPage.clickContinue();

    // Verify error message
    await checkoutPage.verifyErrorMessage('Error: Last Name is required');
    
    // Verify we stayed on checkout page
    expect(page.url()).toContain('checkout-step-one');
  });

  test('AC2-004: Test missing postal code validation', async ({ page }) => {
    // Fill form without postal code
    await checkoutPage.fillFirstName('John');
    await checkoutPage.fillLastName('Doe');
    await checkoutPage.clearPostalCode();

    // Attempt to submit
    await checkoutPage.clickContinue();

    // Verify error message
    await checkoutPage.verifyErrorMessage('Error: Postal Code is required');
    
    // Verify we stayed on checkout page
    expect(page.url()).toContain('checkout-step-one');
  });

  test('AC2-005: Test valid data submission', async ({ page }) => {
    // Fill form with valid data
    await checkoutPage.fillCheckoutForm('John', 'Doe', '12345');

    // Submit form
    await checkoutPage.clickContinue();

    // Verify navigation to overview page
    await expect(page.locator('text="Checkout: Overview"')).toBeVisible();
    expect(page.url()).toContain('checkout-step-two');
  });

  test('AC2-006: Test special characters handling', async ({ page }) => {
    // Fill form with special characters
    await checkoutPage.fillCheckoutForm('John@#$', 'Doe%^&', '12345');

    // Submit form
    await checkoutPage.clickContinue();

    // Application should either accept or reject with validation error
    // If successful, should navigate to overview
    const url = page.url();
    const errorMessage = page.locator('text=/Error:/');
    
    // Either we proceed to overview or get an error
    const proceedToOverview = url.includes('checkout-step-two');
    const showsError = await errorMessage.isVisible().catch(() => false);
    
    expect(proceedToOverview || showsError).toBeTruthy();
  });

  test('AC2-007: Test cancel button functionality', async ({ page }) => {
    // Fill some data
    await checkoutPage.fillCheckoutForm('John', 'Doe', '12345');

    // Click cancel
    await checkoutPage.clickCancel();

    // Verify returned to cart page
    await cartPage.verifyCartPageDisplayed();
    expect(page.url()).toContain('cart.html');

    // Verify data was not saved
    await inventoryPage.navigateToCart();
    await cartPage.clickCheckout();
    const firstNameValue = await checkoutPage.getFirstNameValue();
    expect(firstNameValue).toBe('');
  });

  test('AC2-008: Test all fields required validation', async ({ page }) => {
    // Leave all fields empty
    await checkoutPage.clearFirstName();
    await checkoutPage.clearLastName();
    await checkoutPage.clearPostalCode();

    // Attempt to submit
    await checkoutPage.clickContinue();

    // Verify error message for first required field
    await checkoutPage.verifyErrorMessage('Error: First Name is required');
    expect(page.url()).toContain('checkout-step-one');
  });

  test('AC2-009: Test form persistence after error', async ({ page }) => {
    // Fill with missing last name
    await checkoutPage.fillFirstName('John');
    await checkoutPage.fillPostalCode('12345');
    // Don't fill last name

    // Attempt to submit
    await checkoutPage.clickContinue();

    // Verify error
    await checkoutPage.verifyErrorMessage('Error: Last Name is required');

    // Verify form retained data
    expect(await checkoutPage.getFirstNameValue()).toBe('John');
    expect(await checkoutPage.getPostalCodeValue()).toBe('12345');
    expect(await checkoutPage.getLastNameValue()).toBe('');

    // Fill last name and proceed
    await checkoutPage.fillLastName('Doe');
    await checkoutPage.clickContinue();

    // Should proceed to overview
    await expect(page.locator('text="Checkout: Overview"')).toBeVisible();
  });
});
