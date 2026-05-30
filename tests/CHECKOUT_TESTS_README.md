# SauceDemo Checkout Test Automation Suite

Comprehensive Playwright JavaScript automation scripts for testing the complete checkout workflow on https://www.saucedemo.com

## Test Coverage

This test automation suite covers all critical acceptance criteria (AC1-AC5) for the e-commerce checkout process:

### AC1 - Cart Review Functionality (`AC1-cart-review.spec.ts`)
- ✅ AC1-001: Verify cart displays added items
- ✅ AC1-002: Verify item details and pricing
- ✅ AC1-003: Verify total calculation
- ✅ AC1-004: Verify remove item functionality
- ✅ AC1-005: Verify continue shopping navigation
- ✅ AC1-006: Verify empty cart scenario

### AC2 - Checkout Information Entry (`AC2-checkout-info.spec.ts`)
- ✅ AC2-001: Verify checkout form fields visible
- ✅ AC2-002: Test missing first name validation
- ✅ AC2-003: Test missing last name validation
- ✅ AC2-004: Test missing postal code validation
- ✅ AC2-005: Test valid data submission
- ✅ AC2-006: Test special characters handling
- ✅ AC2-007: Test cancel button functionality
- ✅ AC2-008: Test all fields required validation
- ✅ AC2-009: Test form persistence after error

### AC3 - Order Overview Display (`AC3-order-overview.spec.ts`)
- ✅ AC3-001: Verify overview page displays
- ✅ AC3-002: Verify items display in overview
- ✅ AC3-003: Verify price calculation in overview
- ✅ AC3-004: Verify payment info display
- ✅ AC3-005: Verify shipping info display
- ✅ AC3-006: Verify QTY and Description headers
- ✅ AC3-007: Test finish button functionality
- ✅ AC3-008: Test cancel button on overview
- ✅ AC3-009: Verify tax calculation accuracy
- ✅ AC3-010: Verify price display consistency

### AC4 - Order Completion (`AC4-order-completion.spec.ts`)
- ✅ AC4-001: Verify completion page displays success message
- ✅ AC4-002: Verify order confirmation details visible
- ✅ AC4-003: Test back home button functionality
- ✅ AC4-004: Test multiple items order completion
- ✅ AC4-005: Verify order completion page header
- ✅ AC4-006: Verify thank you message content
- ✅ AC4-007: Verify single item order completion
- ✅ AC4-008: Verify cart is empty after completion

### AC5 - Error Handling and Validation (`AC5-error-handling.spec.ts`)
- ✅ AC5-001: Test special character input validation
- ✅ AC5-002: Test whitespace-only input rejection
- ✅ AC5-003: Test field-level error messages
- ✅ AC5-004: Test error recovery (correct after error)
- ✅ AC5-005: Test invalid postal code format handling
- ✅ AC5-006: Test multiple field error handling
- ✅ AC5-007: Test form persistence after error
- ✅ AC5-008: Test form submission with very long input
- ✅ AC5-009: Test XSS prevention - script tags in input
- ✅ AC5-010: Test SQL injection attempt handling
- ✅ AC5-011: Test numeric-only names
- ✅ AC5-012: Test error message close/dismiss

## Project Structure

```
tests/
├── AC1-cart-review.spec.ts          # Cart review tests
├── AC2-checkout-info.spec.ts        # Checkout form validation tests
├── AC3-order-overview.spec.ts       # Order overview tests
├── AC4-order-completion.spec.ts     # Order completion tests
├── AC5-error-handling.spec.ts       # Error handling and edge case tests
├── LoginPage.ts                      # Page object for login
├── InventoryPage.ts                 # Page object for product inventory
├── CartPage.ts                       # Page object for shopping cart
├── CheckoutPage.ts                  # Page object for checkout form
├── OverviewPage.ts                  # Page object for order overview
├── ConfirmationPage.ts              # Page object for order confirmation
└── auth.fixture.ts                  # Authentication fixture
```

## Key Features

### Page Object Model Pattern
- Maintainable and reusable page objects for each page in the checkout flow
- Encapsulates element selectors and interactions
- Easy to update selectors in one place

### Comprehensive Assertions
- Each test includes clear, descriptive assertions
- Verifies both positive and negative scenarios
- Tests data persistence, validation, and error handling

### Test Credentials
- Username: `standard_user`
- Password: `secret_sauce`
- Pre-configured in login flow

### Element Selectors
All selectors based on exploratory testing findings with reliable ID-based locators:
- Login: `#user-name`, `#password`, `#login-button`
- Checkout: `#first-name`, `#last-name`, `#postal-code`, `#continue`, `#cancel`
- Overview: `#finish`, `#cancel`
- Cart: `#checkout`

## Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Install Playwright Browsers**
   ```bash
   npx playwright install
   ```

## Running Tests

### Run All Tests
```bash
npx playwright test
```

### Run Specific Test Suite
```bash
# Cart Review Tests
npx playwright test AC1-cart-review.spec.ts

# Checkout Info Tests
npx playwright test AC2-checkout-info.spec.ts

# Order Overview Tests
npx playwright test AC3-order-overview.spec.ts

# Order Completion Tests
npx playwright test AC4-order-completion.spec.ts

# Error Handling Tests
npx playwright test AC5-error-handling.spec.ts
```

### Run with Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run Tests in Debug Mode
```bash
npx playwright test --debug
```

### Run Tests in Headed Mode (see browser)
```bash
npx playwright test --headed
```

### Generate HTML Report
```bash
npx playwright test
npx playwright show-report
```

## Test Configuration

The tests use the Playwright configuration from `playwright.config.js`:
- Framework: Playwright Test
- Browsers: Chromium, Firefox, WebKit
- Reporter: HTML report
- Retries: 2 on CI, 0 locally
- Parallel Execution: Fully parallel by default

## Best Practices Implemented

1. **Page Object Model** - All page interactions abstracted into reusable objects
2. **Explicit Waits** - Network and load state waits for reliability
3. **Descriptive Test Names** - Clear test naming following acceptance criteria
4. **Independent Tests** - Each test can run standalone without dependencies
5. **Error Handling** - Graceful handling of edge cases and validation errors
6. **Assertions** - Clear, specific assertions for each test scenario
7. **BeforeEach Setup** - Common setup logic in beforeEach hooks
8. **Comments** - Complex steps have explanatory comments
9. **No Test Order Dependencies** - Tests don't rely on execution order
10. **Real-World Data** - Tests use realistic product names and prices

## Test Data

### Products Used
- Sauce Labs Backpack ($29.99)
- Sauce Labs Bike Light ($9.99)
- Sauce Labs Bolt T-Shirt ($15.99)
- Sauce Labs Fleece Jacket ($49.99)
- Sauce Labs Onesie ($7.99)

### Checkout Form Test Data
- First Name: John
- Last Name: Doe
- Postal Code: 12345

### Error Handling Test Scenarios
- Empty fields validation
- Special character validation
- Whitespace-only input
- Very long input (100+ characters)
- XSS payload attempts
- SQL injection attempts
- Numeric names
- Mixed content

## Element Selectors Reference

### All Selectors Used in Tests
```javascript
// Login Page
#user-name              // Username input
#password               // Password input
#login-button           // Login button

// Inventory Page
#add-to-cart-{product-id}   // Add to cart buttons
.shopping_cart_link         // Shopping cart link
.shopping_cart_badge        // Cart item count badge

// Cart Page
#checkout                   // Checkout button
text=Continue Shopping       // Continue shopping button
[data-test*="remove"]       // Remove item buttons
.cart_item                  // Cart item containers

// Checkout Form (Step 1)
#first-name            // First name input
#last-name             // Last name input
#postal-code           // Postal code input
#continue              // Continue button
#cancel                // Cancel button

// Order Overview (Step 2)
#finish                // Finish button
#cancel                // Cancel button
.shopping_cart_badge   // Cart badge

// Confirmation Page
button:has-text("Back Home")    // Back home button
h2                              // Thank you heading
img[alt="Pony Express"]         // Confirmation image
```

## Troubleshooting

### Tests Failing to Login
- Verify internet connection to https://www.saucedemo.com
- Check if SauceDemo server is up and running
- Credentials are hardcoded in tests (standard_user / secret_sauce)

### Selector Not Found Errors
- SauceDemo HTML structure may have changed
- Update selectors in page object files accordingly
- Use Playwright Inspector to find updated selectors: `npx playwright test --debug`

### Network Timeouts
- Increase wait times in PlaywrightConfig
- Check internet connection stability
- Reduce parallel test workers

### Element Not Visible Errors
- Ensure full page load with `waitForLoadState('networkidle')`
- Scroll to element if hidden: `await element.scrollIntoViewIfNeeded()`
- Verify element exists before interaction

## Continuous Integration

These tests are ready for CI/CD pipeline integration:

```yaml
# Example GitHub Actions workflow
- name: Install Playwright
  run: npx playwright install --with-deps

- name: Run tests
  run: npx playwright test

- name: Upload report
  if: always()
  uses: actions/upload-artifact@v2
  with:
    name: playwright-report
    path: playwright-report/
```

## Contributing

When adding new tests:
1. Follow the Page Object Model pattern
2. Use descriptive test names matching acceptance criteria
3. Add comments for complex steps
4. Include both positive and negative scenarios
5. Ensure tests are independent and can run in any order
6. Update selectors in page objects, not in test files

## License

These tests are part of the SauceDemo Checkout Test Plan automation suite.

## Support

For issues or questions:
1. Check the Playwright documentation: https://playwright.dev
2. Review element selectors in exploratory-testing-findings.md
3. Use `--debug` mode to inspect test execution
4. Check playwright-report/ for detailed failure information

---

**Last Updated:** 2026-05-24
**Test Framework Version:** Playwright ^1.60.0
**Node.js Version:** 14+
**Supported Platforms:** Windows, macOS, Linux
