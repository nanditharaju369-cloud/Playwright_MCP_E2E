import { Page, expect } from '@playwright/test';

export class InventoryPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyInventoryPageDisplayed(): Promise<void> {
    const pageTitle = await this.page.title();
    expect(pageTitle).toBe('Swag Labs');
    const productsHeader = this.page.locator('text="Products"');
    await expect(productsHeader).toBeVisible();
  }

  async addItemToCart(itemId: string): Promise<void> {
    const addButton = this.page.locator(`#${itemId}`);
    await addButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getCartCount(): Promise<number> {
    const cartBadge = this.page.locator('.shopping_cart_badge');
    const count = await cartBadge.textContent();
    return parseInt(count || '0', 10);
  }

  async navigateToCart(): Promise<void> {
    await this.page.click('.shopping_cart_link');
    await this.page.waitForURL('**/cart.html');
    await this.page.waitForLoadState('networkidle');
  }
}
