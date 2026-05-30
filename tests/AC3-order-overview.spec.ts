import { test, expect } from '@playwright/test';
import { LoginPage } from '../LoginPage';
import { InventoryPage } from '../InventoryPage';
import { CartPage } from '../CartPage';
import { CheckoutPage } from '../CheckoutPage';
import { OverviewPage } from '../OverviewPage';

test.describe('AC3 - Order Overview Display Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;
  let overviewPage: OverviewPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    overviewPage = new OverviewPage(page);

    // Complete flow to overview page
    await loginPage.navigateTo();
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Add items to cart
    await inventoryPage.addItemToCart('add-to-cart-sauce-labs-backpack');
    await inventoryPage.addItemToCart('add-to-cart-sauce-labs-bike-light');
    await inventoryPage.addItemToCart('add-to-cart-sauce-labs-bolt-t-shirt');
    
    // Proceed through checkout
    await inventoryPage.navigateToCart();
    await cartPage.clickCheckout();
    await checkoutPage.fillCheckoutForm('John', 'Doe', '12345');
    await checkoutPage.clickContinue();
    await overviewPage.verifyOverviewPageDisplayed();
  });

  test('AC3-001: Verify overview page displays', async ({ page }) => {
    // Verify page is displayed correctly
    await overviewPage.verifyOverviewPageDisplayed();
    
    // Verify key sections are visible
    await expect(page.locator('text="Payment Information:"')).toBeVisible();
    await expect(page.locator('text="Shipping Information:"')).toBeVisible();
  });

  test('AC3-002: Verify items display in overview', async ({ page }) => {
    // Verify all items are displayed
    await overviewPage.verifyItemInOverview('Sauce Labs Backpack');
    await overviewPage.verifyItemInOverview('Sauce Labs Bike Light');
    await overviewPage.verifyItemInOverview('Sauce Labs Bolt T-Shirt');

    // Verify quantities are displayed
    const quantities = page.locator('.cart_quantity');
    expect(await quantities.count()).toBeGreaterThan(0);
  });

  test('AC3-003: Verify price calculation in overview', async ({ page }) => {
    // Verify price elements are visible
    const subtotal = await overviewPage.getSubtotal();
    expect(subtotal).toBeTruthy();

    const tax = await overviewPage.getTax();
    expect(tax).toBeTruthy();

    const total = await overviewPage.getTotal();
    expect(total).toBeTruthy();

    // Verify calculations are reasonable (total should be > subtotal)
    const subtotalNum = parseFloat(subtotal);
    const totalNum = parseFloat(total);
    expect(totalNum).toBeGreaterThan(subtotalNum);
  });

  test('AC3-004: Verify payment info display', async ({ page }) => {
    // Verify payment information section
    await overviewPage.verifyPaymentInformation();
  });

  test('AC3-005: Verify shipping info display', async ({ page }) => {
    // Verify shipping information section
    await overviewPage.verifyShippingInformation();
  });

  test('AC3-006: Verify QTY and Description headers', async ({ page }) => {
    // Verify column headers
    await overviewPage.verifyQtyHeader();
    await overviewPage.verifyDescriptionHeader();
  });

  test('AC3-007: Test finish button functionality', async ({ page }) => {
    // Verify finish button is visible
    await expect(page.locator('#finish')).toBeVisible();

    // Click finish
    await overviewPage.clickFinish();

    // Verify navigation to completion page
    expect(page.url()).toContain('checkout-complete');
    await expect(page.locator('text="Checkout: Complete!"')).toBeVisible();
  });

  test('AC3-008: Test cancel button on overview', async ({ page }) => {
    // Verify cancel button is visible
    await expect(page.locator('#cancel')).toBeVisible();

    // Click cancel
    await overviewPage.clickCancel();

    // Verify returned to inventory
    expect(page.url()).toContain('inventory.html');
    await inventoryPage.verifyInventoryPageDisplayed();

    // Verify items still in cart
    const cartBadge = page.locator('.shopping_cart_badge');
    const count = await cartBadge.textContent();
    expect(parseInt(count || '0', 10)).toBe(3);
  });

  test('AC3-009: Verify tax calculation accuracy', async ({ page }) => {
    const subtotal = await overviewPage.getSubtotal();
    const tax = await overviewPage.getTax();
    const total = await overviewPage.getTotal();

    const subtotalNum = parseFloat(subtotal);
    const taxNum = parseFloat(tax);
    const totalNum = parseFloat(total);

    // Tax should be approximately 8% of subtotal (0.08 * subtotal)
    const expectedTax = subtotalNum * 0.08;
    
    // Allow small rounding differences
    expect(Math.abs(taxNum - expectedTax)).toBeLessThan(0.01);
    
    // Total should equal subtotal + tax
    const expectedTotal = subtotalNum + taxNum;
    expect(Math.abs(totalNum - expectedTotal)).toBeLessThan(0.01);
  });

  test('AC3-010: Verify price display consistency', async ({ page }) => {
    // Get prices from overview
    const backpackPrice = page.locator('//text="Sauce Labs Backpack"/../../..//div[@class="inventory_item_price"]');
    const backpackPriceText = await backpackPrice.textContent();
    
    // Prices should contain $ symbol
    expect(backpackPriceText).toMatch(/\$\d+\.\d+/);

    // All item prices should be formatted consistently
    const allPrices = page.locator('.inventory_item_price');
    const priceCount = await allPrices.count();
    expect(priceCount).toBeGreaterThan(0);
  });
});
