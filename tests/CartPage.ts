import { Page, expect } from '@playwright/test';

export class CartPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/cart.html');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyCartPageDisplayed(): Promise<void> {
    const pageTitle = await this.page.title();
    expect(pageTitle).toBe('Swag Labs');
    await expect(this.page.locator('text="Your Cart"')).toBeVisible();
  }

  async getCartItemCount(): Promise<number> {
    const items = this.page.locator('[class="cart_item"]');
    return await items.count();
  }

  async verifyItemInCart(itemName: string): Promise<void> {
    await expect(this.page.locator(`text="${itemName}"`)).toBeVisible();
  }

  async getItemPrice(itemName: string): Promise<string> {
    const priceElement = this.page.locator(`//div[contains(text(), '${itemName}')]/..//div[@class='inventory_item_price']`);
    const price = await priceElement.textContent();
    return price || '';
  }

  async removeItemFromCart(itemName: string): Promise<void> {
    const removeButton = this.page.locator(`//div[contains(text(), '${itemName}')]/..//button[contains(@id, 'remove')]`);
    await removeButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickCheckout(): Promise<void> {
    await this.page.click('#checkout');
    await this.page.waitForURL('**/checkout-step-one.html');
    await this.page.waitForLoadState('networkidle');
  }

  async clickContinueShopping(): Promise<void> {
    await this.page.click('text=Continue Shopping');
    await this.page.waitForURL('**/inventory.html');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyEmptyCart(): Promise<void> {
    const cartItems = this.page.locator('[class="cart_item"]');
    expect(await cartItems.count()).toBe(0);
  }
}
