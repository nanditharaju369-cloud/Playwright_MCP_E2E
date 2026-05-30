import { Page, expect } from '@playwright/test';

export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com');
    await this.page.waitForLoadState('networkidle');
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.fill('#user-name', username);
    await this.page.fill('#password', password);
    await this.page.click('#login-button');
    await this.page.waitForURL('**/inventory.html');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyLoginPageDisplayed(): Promise<void> {
    const pageTitle = await this.page.title();
    expect(pageTitle).toBe('Swag Labs');
    const loginButton = this.page.locator('#login-button');
    await expect(loginButton).toBeVisible();
  }
}
