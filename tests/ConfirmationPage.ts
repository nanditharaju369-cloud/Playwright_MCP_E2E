import { Page, expect } from '@playwright/test';

export class ConfirmationPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/checkout-complete.html');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyCompletionPageDisplayed(): Promise<void> {
    const pageTitle = await this.page.title();
    expect(pageTitle).toBe('Swag Labs');
    await expect(this.page.locator('text="Checkout: Complete!"')).toBeVisible();
  }

  async verifySuccessMessage(): Promise<void> {
    await expect(this.page.locator('text="Thank you for your order!"')).toBeVisible();
    await expect(this.page.locator('text="Your order has been dispatched, and will arrive just as fast as the pony can get there!"')).toBeVisible();
  }

  async verifyPonyImage(): Promise<void> {
    const ponyImage = this.page.locator('img[alt="Pony Express"]');
    await expect(ponyImage).toBeVisible();
  }

  async clickBackHome(): Promise<void> {
    await this.page.click('button:has-text("Back Home")');
    await this.page.waitForURL('**/inventory.html');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyURL(): Promise<void> {
    const url = this.page.url();
    expect(url).toContain('checkout-complete');
  }
}
