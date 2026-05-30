import { Page, expect } from '@playwright/test';

export class OverviewPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/checkout-step-two.html');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyOverviewPageDisplayed(): Promise<void> {
    const pageTitle = await this.page.title();
    expect(pageTitle).toBe('Swag Labs');
    await expect(this.page.locator('text="Checkout: Overview"')).toBeVisible();
  }

  async verifyItemInOverview(itemName: string): Promise<void> {
    await expect(this.page.locator(`text="${itemName}"`)).toBeVisible();
  }

  async verifyPaymentInformation(): Promise<void> {
    await expect(this.page.locator('text="Payment Information:"')).toBeVisible();
    await expect(this.page.locator('text="SauceCard #31337"')).toBeVisible();
  }

  async verifyShippingInformation(): Promise<void> {
    await expect(this.page.locator('text="Shipping Information:"')).toBeVisible();
    await expect(this.page.locator('text="Free Pony Express Delivery!"')).toBeVisible();
  }

  async verifyQtyHeader(): Promise<void> {
    await expect(this.page.locator('text="QTY"')).toBeVisible();
  }

  async verifyDescriptionHeader(): Promise<void> {
    await expect(this.page.locator('text="Description"')).toBeVisible();
  }

  async getSubtotal(): Promise<string> {
    const subtotalElement = this.page.locator('text=/Item total:.*\\$\\d+\\.\\d+/');
    const text = await subtotalElement.textContent();
    // Extract price from "Item total: $XX.XX"
    const match = text?.match(/\$(\d+\.\d+)/);
    return match ? match[1] : '';
  }

  async getTax(): Promise<string> {
    const taxElement = this.page.locator('text=/Tax:.*\\$\\d+\\.\\d+/');
    const text = await taxElement.textContent();
    // Extract price from "Tax: $X.XX"
    const match = text?.match(/\$(\d+\.\d+)/);
    return match ? match[1] : '';
  }

  async getTotal(): Promise<string> {
    const totalElement = this.page.locator('text=/Total:.*\\$\\d+\\.\\d+/');
    const text = await totalElement.textContent();
    // Extract price from "Total: $XX.XX"
    const match = text?.match(/\$(\d+\.\d+)/);
    return match ? match[1] : '';
  }

  async clickFinish(): Promise<void> {
    await this.page.click('#finish');
    await this.page.waitForURL('**/checkout-complete.html');
    await this.page.waitForLoadState('networkidle');
  }

  async clickCancel(): Promise<void> {
    await this.page.click('#cancel');
    await this.page.waitForURL('**/inventory.html');
    await this.page.waitForLoadState('networkidle');
  }
}
