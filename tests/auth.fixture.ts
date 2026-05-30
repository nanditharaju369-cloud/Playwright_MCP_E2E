import { test as base, expect } from '@playwright/test';

export const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    // Navigate to login page
    await page.goto('https://www.saucedemo.com');
    
    // Login with standard credentials
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    
    // Wait for inventory page to load
    await page.waitForURL('**/inventory.html');
    await page.waitForLoadState('networkidle');
    
    // Use the authenticated page
    await use(page);
    
    // No cleanup needed for logout in this demo app
  },
});

export { expect };
