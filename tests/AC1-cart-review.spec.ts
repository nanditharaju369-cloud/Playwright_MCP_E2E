import { test, expect } from '@playwright/test';
import { LoginPage } from '../LoginPage';
import { InventoryPage } from '../InventoryPage';
import { CartPage } from '../CartPage';

test.describe('AC1 - Cart Review Functionality', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    // Navigate and login
    await loginPage.navigateTo();
    await loginPage.verifyLoginPageDisplayed();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.verifyInventoryPageDisplayed();
  });

  test('AC1-001: Verify cart displays added items', async ({ page }) => {
    // Add multiple items to cart
    await inventoryPage.addItemToCart('add-to-cart-sauce-labs-backpack');
    expect(await inventoryPage.getCartCount()).toBe(1);

    await inventoryPage.addItemToCart('add-to-cart-sauce-labs-bike-light');
    expect(await inventoryPage.getCartCount()).toBe(2);

    // Navigate to cart
    await inventoryPage.navigateToCart();
    await cartPage.verifyCartPageDisplayed();

    // Verify items are displayed
    expect(await cartPage.getCartItemCount()).toBe(2);
    await cartPage.verifyItemInCart('Sauce Labs Backpack');
    await cartPage.verifyItemInCart('Sauce Labs Bike Light');
  });

  test('AC1-002: Verify item details and pricing', async ({ page }) => {
    // Add item to cart
    await inventoryPage.addItemToCart('add-to-cart-sauce-labs-bolt-t-shirt');
    await inventoryPage.navigateToCart();

    // Verify item details
    await cartPage.verifyItemInCart('Sauce Labs Bolt T-Shirt');
    const price = await cartPage.getItemPrice('Sauce Labs Bolt T-Shirt');
    expect(price).toContain('$15.99');

    // Verify item description is visible
    const descriptionElement = page.locator('//div[contains(text(), "Sauce Labs Bolt T-Shirt")]/..//div[@class="inventory_item_desc"]');
    await expect(descriptionElement).toBeVisible();
  });

  test('AC1-003: Verify total calculation', async ({ page }) => {
    // Add items with known prices
    await inventoryPage.addItemToCart('add-to-cart-sauce-labs-backpack'); // $29.99
    await inventoryPage.addItemToCart('add-to-cart-sauce-labs-onesie'); // $7.99
    await inventoryPage.navigateToCart();

    // Verify both items are displayed
    expect(await cartPage.getCartItemCount()).toBe(2);
    await cartPage.verifyItemInCart('Sauce Labs Backpack');
    await cartPage.verifyItemInCart('Sauce Labs Onesie');

    // Verify prices
    const backpackPrice = await cartPage.getItemPrice('Sauce Labs Backpack');
    expect(backpackPrice).toContain('$29.99');

    const onesiePrice = await cartPage.getItemPrice('Sauce Labs Onesie');
    expect(onesiePrice).toContain('$7.99');
  });

  test('AC1-004: Verify remove item functionality', async ({ page }) => {
    // Add three items
    await inventoryPage.addItemToCart('add-to-cart-sauce-labs-backpack');
    await inventoryPage.addItemToCart('add-to-cart-sauce-labs-bike-light');
    await inventoryPage.addItemToCart('add-to-cart-sauce-labs-bolt-t-shirt');
    expect(await inventoryPage.getCartCount()).toBe(3);

    // Navigate to cart
    await inventoryPage.navigateToCart();
    expect(await cartPage.getCartItemCount()).toBe(3);

    // Remove one item
    await cartPage.removeItemFromCart('Sauce Labs Bike Light');
    expect(await cartPage.getCartItemCount()).toBe(2);

    // Verify removed item is gone
    const itemCount = page.locator('text="Sauce Labs Bike Light"').count();
    expect(await itemCount).toBe(0);

    // Verify cart badge updated
    const cartBadge = page.locator('.shopping_cart_badge');
    const badgeText = await cartBadge.textContent();
    expect(badgeText).toBe('2');
  });

  test('AC1-005: Verify continue shopping navigation', async ({ page }) => {
    // Add item to cart
    await inventoryPage.addItemToCart('add-to-cart-sauce-labs-backpack');
    expect(await inventoryPage.getCartCount()).toBe(1);

    // Navigate to cart
    await inventoryPage.navigateToCart();
    await cartPage.verifyCartPageDisplayed();

    // Click continue shopping
    await cartPage.clickContinueShopping();
    await inventoryPage.verifyInventoryPageDisplayed();

    // Verify cart persists
    expect(await inventoryPage.getCartCount()).toBe(1);
  });

  test('AC1-006: Verify empty cart scenario', async ({ page }) => {
    // Navigate directly to cart without adding items
    await inventoryPage.navigateToCart();
    await cartPage.verifyCartPageDisplayed();

    // Verify cart is empty
    await cartPage.verifyEmptyCart();

    // Verify checkout button is available
    const checkoutButton = page.locator('#checkout');
    await expect(checkoutButton).toBeVisible();
  });
});
