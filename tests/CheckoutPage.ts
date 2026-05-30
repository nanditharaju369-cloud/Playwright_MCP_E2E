import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/checkout-step-one.html');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyCheckoutFormDisplayed(): Promise<void> {
    const pageTitle = await this.page.title();
    expect(pageTitle).toBe('Swag Labs');
    await expect(this.page.locator('text="Checkout: Your Information"')).toBeVisible();
    await expect(this.page.locator('#first-name')).toBeVisible();
    await expect(this.page.locator('#last-name')).toBeVisible();
    await expect(this.page.locator('#postal-code')).toBeVisible();
  }

  async fillCheckoutForm(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.page.fill('#first-name', firstName);
    await this.page.fill('#last-name', lastName);
    await this.page.fill('#postal-code', postalCode);
  }

  async fillFirstName(firstName: string): Promise<void> {
    await this.page.fill('#first-name', firstName);
  }

  async fillLastName(lastName: string): Promise<void> {
    await this.page.fill('#last-name', lastName);
  }

  async fillPostalCode(postalCode: string): Promise<void> {
    await this.page.fill('#postal-code', postalCode);
  }

  async clearFirstName(): Promise<void> {
    await this.page.fill('#first-name', '');
  }

  async clearLastName(): Promise<void> {
    await this.page.fill('#last-name', '');
  }

  async clearPostalCode(): Promise<void> {
    await this.page.fill('#postal-code', '');
  }

  async clickContinue(): Promise<void> {
    await this.page.click('#continue');
    await this.page.waitForLoadState('networkidle');
  }

  async clickCancel(): Promise<void> {
    await this.page.click('#cancel');
    await this.page.waitForURL('**/cart.html');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyErrorMessage(errorText: string): Promise<void> {
    const errorElement = this.page.locator(`text="${errorText}"`);
    await expect(errorElement).toBeVisible();
  }

  async getFirstNameValue(): Promise<string> {
    return await this.page.inputValue('#first-name');
  }

  async getLastNameValue(): Promise<string> {
    return await this.page.inputValue('#last-name');
  }

  async getPostalCodeValue(): Promise<string> {
    return await this.page.inputValue('#postal-code');
  }

  async verifyErrorInField(fieldId: string): Promise<void> {
    const field = this.page.locator(`#${fieldId}`);
    const classes = await field.getAttribute('class');
    expect(classes).toContain('error');
  }

  async waitForOverviewPage(): Promise<void> {
    await this.page.waitForURL('**/checkout-step-two.html');
    await this.page.waitForLoadState('networkidle');
  }
}
