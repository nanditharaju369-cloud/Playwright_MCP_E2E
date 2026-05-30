# SCRUM-101 E-commerce Checkout Process Test Plan

## Application Overview

The SauceDemo application is an e-commerce platform that allows users to browse products, add items to their shopping cart, and complete a checkout process. This test plan covers comprehensive testing of the complete checkout workflow including cart review, information entry, order overview, and order completion. The application requires authentication and includes form validation, pricing calculations, and order confirmation functionality.

## Test Scenarios

### 1. AC1 - Cart Review Tests

**Seed:** `tests/seed.spec.ts`

#### 1.1. AC1-001: Verify Cart Page Displays Added Items

**File:** `tests/AC1/cart-display.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com
    - expect: Login page should be displayed
  2. Log in with credentials: standard_user / secret_sauce
    - expect: User should be logged in and redirected to inventory page
    - expect: Products should be displayed
  3. Add multiple items to cart (e.g., Sauce Labs Backpack for $29.99 and Sauce Labs Bike Light for $9.99)
    - expect: Cart icon should display the number of items added
    - expect: Button text should change from 'Add to cart' to 'Remove'
  4. Click on the shopping cart icon
    - expect: User should be navigated to the cart page
    - expect: Page title should show 'Your Cart'
    - expect: All added items should be displayed with their details
    - expect: Item names, prices, and quantities should be visible

#### 1.2. AC1-002: Verify Item Details and Pricing in Cart

**File:** `tests/AC1/item-details.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and log in with standard_user / secret_sauce
    - expect: User should be on inventory page
  2. Add 'Sauce Labs Bolt T-Shirt' ($15.99) to the cart
    - expect: Item should be added to cart
  3. Navigate to the cart page
    - expect: Cart page should be displayed
  4. Verify the item information displayed in the cart
    - expect: Item name 'Sauce Labs Bolt T-Shirt' should be visible
    - expect: Item price '$15.99' should be displayed
    - expect: Item quantity should show '1'
    - expect: Item description should be present (if configured)
    - expect: QTY column header should be visible
    - expect: Description column header should be visible

#### 1.3. AC1-003: Verify Total Calculation in Cart

**File:** `tests/AC1/total-calculation.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and log in
    - expect: User should be on inventory page
  2. Add Sauce Labs Backpack ($29.99) and Sauce Labs Onesie ($7.99) to cart
    - expect: Both items should be added
  3. Navigate to cart page
    - expect: Cart page should be displayed
  4. Verify cart displays both items with correct prices
    - expect: First item should show $29.99
    - expect: Second item should show $7.99
    - expect: Item quantities should be correct
  5. Note: Verify that subtotal is visible (if checkout step shows it)
    - expect: Total pricing information should be visible before checkout

#### 1.4. AC1-004: Verify Remove Item Functionality from Cart

**File:** `tests/AC1/remove-item.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and log in with standard_user / secret_sauce
    - expect: User should be on inventory page
  2. Add three items to cart: Backpack ($29.99), Bike Light ($9.99), and T-Shirt ($15.99)
    - expect: Cart icon should show 3 items
  3. Navigate to cart page
    - expect: All three items should be displayed
  4. Click the Remove button next to 'Sauce Labs Bike Light'
    - expect: The Bike Light item should be removed from cart
    - expect: Cart should now display only 2 items
    - expect: The Remove button should be visible for remaining items
  5. Verify the cart count is updated
    - expect: Cart icon should now show 2 items

#### 1.5. AC1-005: Verify Continue Shopping Navigation

**File:** `tests/AC1/continue-shopping.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and log in
    - expect: User should be on inventory page
  2. Add an item to cart
    - expect: Item should be added
  3. Navigate to cart page
    - expect: Cart page should be displayed
  4. Click 'Continue Shopping' button
    - expect: User should be returned to inventory page
    - expect: Previously added items should remain in cart (cart count should persist)

#### 1.6. AC1-006: Verify Empty Cart Display

**File:** `tests/AC1/empty-cart.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and log in
    - expect: User should be on inventory page
  2. Without adding any items, navigate to cart page by clicking cart icon
    - expect: Cart page should be displayed
    - expect: Page should indicate cart is empty or show no items
    - expect: Checkout button should be available

### 2. AC2 - Checkout Information Entry Tests

**Seed:** `tests/seed.spec.ts`

#### 2.1. AC2-001: Verify Checkout Form Fields Display

**File:** `tests/AC2/form-fields-display.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and log in with standard_user / secret_sauce
    - expect: User should be on inventory page
  2. Add an item to cart
    - expect: Item should be added to cart
  3. Navigate to cart page and click Checkout button
    - expect: User should be navigated to checkout information page
    - expect: Page title should show 'Checkout: Your Information'
  4. Verify all required form fields are visible
    - expect: First Name input field should be visible and empty
    - expect: Last Name input field should be visible and empty
    - expect: Zip/Postal Code input field should be visible and empty
    - expect: Continue button should be visible
    - expect: Cancel button should be visible

#### 2.2. AC2-002: Verify Mandatory Field Validation - Missing First Name

**File:** `tests/AC2/validation-first-name.spec.ts`

**Steps:**
  1. Navigate to checkout form (after adding item to cart and clicking Checkout)
    - expect: Checkout form should be displayed
  2. Leave First Name field empty, enter 'Doe' in Last Name, and '12345' in Zip/Postal Code
    - expect: Fields should contain the entered values
  3. Click the Continue button
    - expect: Form should not submit
    - expect: Error message 'Error: First Name is required' should be displayed
    - expect: Error icon/indicator should appear next to First Name field

#### 2.3. AC2-003: Verify Mandatory Field Validation - Missing Last Name

**File:** `tests/AC2/validation-last-name.spec.ts`

**Steps:**
  1. Navigate to checkout form
    - expect: Checkout form should be displayed
  2. Enter 'John' in First Name field, leave Last Name empty, and enter '12345' in Zip/Postal Code
    - expect: Fields should contain the entered values
  3. Click the Continue button
    - expect: Form should not submit
    - expect: Error message 'Error: Last Name is required' should be displayed
    - expect: Error icon/indicator should appear next to Last Name field

#### 2.4. AC2-004: Verify Mandatory Field Validation - Missing Postal Code

**File:** `tests/AC2/validation-postal-code.spec.ts`

**Steps:**
  1. Navigate to checkout form
    - expect: Checkout form should be displayed
  2. Enter 'John' in First Name, 'Doe' in Last Name, and leave Zip/Postal Code empty
    - expect: Fields should contain the entered values
  3. Click the Continue button
    - expect: Form should not submit
    - expect: Error message 'Error: Postal Code is required' should be displayed
    - expect: Error icon/indicator should appear next to Zip/Postal Code field

#### 2.5. AC2-005: Verify All Mandatory Fields Validation

**File:** `tests/AC2/validation-all-fields.spec.ts`

**Steps:**
  1. Navigate to checkout form
    - expect: Checkout form should be displayed
  2. Leave all fields empty (First Name, Last Name, Zip/Postal Code)
    - expect: All fields should be empty
  3. Click the Continue button
    - expect: Form should not submit
    - expect: Error message for the first required field should be displayed (e.g., 'Error: First Name is required')

#### 2.6. AC2-006: Verify Form Submission with Valid Data

**File:** `tests/AC2/valid-submission.spec.ts`

**Steps:**
  1. Navigate to checkout form
    - expect: Checkout form should be displayed
  2. Enter valid data: First Name: 'John', Last Name: 'Doe', Zip/Postal Code: '12345'
    - expect: All fields should contain the entered values
    - expect: No error messages should be displayed
  3. Click the Continue button
    - expect: Form should submit successfully
    - expect: User should be navigated to checkout overview page
    - expect: Page title should show 'Checkout: Overview'

#### 2.7. AC2-007: Verify Form Submission with Special Characters in Name

**File:** `tests/AC2/special-chars-name.spec.ts`

**Steps:**
  1. Navigate to checkout form
    - expect: Checkout form should be displayed
  2. Enter First Name: 'John@#$', Last Name: 'Doe%^&', Zip/Postal Code: '12345'
    - expect: Fields should accept and display special characters
  3. Click the Continue button
    - expect: Form should either submit successfully or display validation error for invalid characters
    - expect: If accepted, user should proceed to overview page
    - expect: If rejected, appropriate error message should be displayed

#### 2.8. AC2-008: Verify Form Submission with Numeric First Name

**File:** `tests/AC2/numeric-name.spec.ts`

**Steps:**
  1. Navigate to checkout form
    - expect: Checkout form should be displayed
  2. Enter First Name: '12345', Last Name: '67890', Zip/Postal Code: 'ABCDE'
    - expect: Fields should accept and display the entered values
  3. Click the Continue button
    - expect: Form should either accept the numeric names or display a validation error

#### 2.9. AC2-009: Verify Cancel Button Functionality

**File:** `tests/AC2/cancel-button.spec.ts`

**Steps:**
  1. Navigate to checkout form after adding items
    - expect: Checkout form should be displayed
  2. Enter some data in the form fields
    - expect: Fields should contain the entered data
  3. Click the Cancel button
    - expect: User should be returned to the cart page
    - expect: Cart should still contain the items
    - expect: Entered form data should not be saved

#### 2.10. AC2-010: Verify Very Long Input Handling

**File:** `tests/AC2/long-input.spec.ts`

**Steps:**
  1. Navigate to checkout form
    - expect: Checkout form should be displayed
  2. Enter First Name: 'VeryLongFirstNameWithManyCharactersToTestInputHandling', Last Name: 'VeryLongLastNameToTestTheInputFieldBehavior', Zip/Postal Code: '12345'
    - expect: Fields should handle long input gracefully
    - expect: Text should either be truncated or wrapped appropriately
  3. Click Continue
    - expect: Form should handle the submission or display an appropriate error

### 3. AC3 - Order Overview Tests

**Seed:** `tests/seed.spec.ts`

#### 3.1. AC3-001: Verify Order Overview Page Display

**File:** `tests/AC3/overview-page-display.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and complete checkout through information entry with valid data (First: John, Last: Doe, Zip: 12345)
    - expect: User should be navigated to overview page
    - expect: Page title should show 'Checkout: Overview'
  2. Verify page layout and elements
    - expect: Page should display order summary
    - expect: Item details section should be visible
    - expect: Payment information section should be visible
    - expect: Shipping information section should be visible
    - expect: Price summary section should be visible

#### 3.2. AC3-002: Verify Items in Order Overview

**File:** `tests/AC3/overview-items.spec.ts`

**Steps:**
  1. Add multiple items to cart (Backpack $29.99, Bike Light $9.99, T-Shirt $15.99) and proceed to checkout overview
    - expect: Overview page should be displayed
  2. Verify items section displays all added items
    - expect: All three items should be listed
    - expect: Each item should show quantity (1 for each)
    - expect: Each item should show name
    - expect: Each item should show description
    - expect: Each item should show individual price ($29.99, $9.99, $15.99)

#### 3.3. AC3-003: Verify Price Calculation in Overview

**File:** `tests/AC3/price-calculation.spec.ts`

**Steps:**
  1. Add Backpack ($29.99) and Bike Light ($9.99) to cart and proceed to overview
    - expect: Overview page should be displayed
  2. Verify price summary section
    - expect: Item total should show $39.98 (29.99 + 9.99)
    - expect: Tax calculation should be visible
    - expect: Total amount should be calculated correctly (Item total + Tax)
    - expect: Currency symbol ($) should be present

#### 3.4. AC3-004: Verify Payment Information Display

**File:** `tests/AC3/payment-info.spec.ts`

**Steps:**
  1. Navigate to checkout overview page
    - expect: Overview page should be displayed
  2. Verify Payment Information section
    - expect: Section header 'Payment Information:' should be visible
    - expect: Payment method should be displayed (e.g., 'SauceCard #31337')
    - expect: Payment details should be clearly visible

#### 3.5. AC3-005: Verify Shipping Information Display

**File:** `tests/AC3/shipping-info.spec.ts`

**Steps:**
  1. Navigate to checkout overview page
    - expect: Overview page should be displayed
  2. Verify Shipping Information section
    - expect: Section header 'Shipping Information:' should be visible
    - expect: Shipping method should be displayed (e.g., 'Free Pony Express Delivery!')
    - expect: Shipping details should be clearly visible

#### 3.6. AC3-006: Verify Finish Button Functionality

**File:** `tests/AC3/finish-button.spec.ts`

**Steps:**
  1. Navigate to checkout overview page
    - expect: Overview page should be displayed
    - expect: Finish button should be visible
  2. Click the Finish button
    - expect: User should be navigated to order completion page
    - expect: Page URL should show 'checkout-complete'

#### 3.7. AC3-007: Verify Cancel Button Functionality

**File:** `tests/AC3/cancel-button.spec.ts`

**Steps:**
  1. Navigate to checkout overview page
    - expect: Overview page should be displayed
    - expect: Cancel button should be visible
  2. Click the Cancel button
    - expect: User should be returned to the inventory page
    - expect: Cart items should be preserved

#### 3.8. AC3-008: Verify QTY and Description Headers

**File:** `tests/AC3/overview-headers.spec.ts`

**Steps:**
  1. Navigate to checkout overview page with items in cart
    - expect: Overview page should be displayed
  2. Verify column headers are present
    - expect: 'QTY' column header should be visible
    - expect: 'Description' column header should be visible

#### 3.9. AC3-009: Verify Tax Calculation Accuracy

**File:** `tests/AC3/tax-calculation.spec.ts`

**Steps:**
  1. Add item with $10.00 price to cart and proceed to overview
    - expect: Overview page should be displayed
  2. Verify tax is calculated correctly
    - expect: Item total should show $10.00
    - expect: Tax should be approximately $0.80 (8% of $10.00)
    - expect: Total should be approximately $10.80

#### 3.10. AC3-010: Verify Price Display Consistency

**File:** `tests/AC3/price-consistency.spec.ts`

**Steps:**
  1. Compare prices from inventory page to overview page
    - expect: Prices displayed in overview should match prices from inventory page
    - expect: No price discrepancies should exist

### 4. AC4 - Order Completion Tests

**Seed:** `tests/seed.spec.ts`

#### 4.1. AC4-001: Verify Order Completion Page Display

**File:** `tests/AC4/completion-page-display.spec.ts`

**Steps:**
  1. Complete the full checkout process: Add items to cart, proceed through information entry with valid data, review order overview, and click Finish
    - expect: User should be navigated to completion page
    - expect: Page URL should show 'checkout-complete'
    - expect: Page title should show 'Swag Labs'
  2. Verify page layout and main elements
    - expect: Completion page should be displayed with success indicators
    - expect: Thank you message should be prominently displayed

#### 4.2. AC4-002: Verify Success Message Display

**File:** `tests/AC4/success-message.spec.ts`

**Steps:**
  1. Complete full checkout process and reach completion page
    - expect: Completion page should be displayed
  2. Verify success message content
    - expect: Heading 'Thank you for your order!' should be displayed
    - expect: Message text 'Your order has been dispatched, and will arrive just as fast as the pony can get there!' should be visible
    - expect: Success icon/image (Pony Express) should be displayed

#### 4.3. AC4-003: Verify Back Home Button Functionality

**File:** `tests/AC4/back-home-button.spec.ts`

**Steps:**
  1. Complete full checkout process and reach completion page
    - expect: Completion page should be displayed
  2. Verify Back Home button is present
    - expect: 'Back Home' button should be visible on the page
  3. Click the Back Home button
    - expect: User should be returned to inventory page
    - expect: Page should show all available products
    - expect: Shopping cart should be reset or cleared

#### 4.4. AC4-004: Verify Order Confirmation Details

**File:** `tests/AC4/confirmation-details.spec.ts`

**Steps:**
  1. Complete checkout process
    - expect: Completion page should be displayed
  2. Verify confirmation details are present
    - expect: Page should contain confirmation message
    - expect: Visual confirmation elements should be present (e.g., checkmark, pony image)
    - expect: Order completion page URL should be correctly set

#### 4.5. AC4-005: Verify No Back Button Navigation (Prevention)

**File:** `tests/AC4/back-button-prevention.spec.ts`

**Steps:**
  1. Complete checkout and reach completion page
    - expect: Completion page should be displayed
  2. Attempt to use browser back button or navigate back
    - expect: Browser back navigation may take user to overview page
    - expect: Back Home button should be the recommended way to proceed

#### 4.6. AC4-006: Verify Order Completion Page Header

**File:** `tests/AC4/page-header.spec.ts`

**Steps:**
  1. Complete checkout and reach completion page
    - expect: Completion page should be displayed
  2. Verify page header section
    - expect: 'Checkout: Complete!' heading should be visible
    - expect: Swag Labs logo should be present
    - expect: Navigation menu button should be available

#### 4.7. AC4-007: Verify Order Completion for Multiple Items

**File:** `tests/AC4/multiple-items.spec.ts`

**Steps:**
  1. Add multiple different items to cart (at least 3 items)
    - expect: Items should be added to cart
  2. Complete checkout process
    - expect: Completion page should be displayed with same success message
  3. Verify order was successfully completed regardless of item count
    - expect: 'Thank you for your order!' message should be displayed
    - expect: Completion page should render correctly

### 5. AC5 - Error Handling and Validation Tests

**Seed:** `tests/seed.spec.ts`

#### 5.1. AC5-001: Verify Special Character Input Validation

**File:** `tests/AC5/special-chars.spec.ts`

**Steps:**
  1. Navigate to checkout form
    - expect: Checkout form should be displayed
  2. Enter special characters in First Name: '!@#$%', in Last Name: '^&*()', in Zip: '12!@3'
    - expect: Form should accept or reject special characters based on validation rules
  3. Click Continue button
    - expect: Form should either proceed or display validation error message
    - expect: If validation error, specific field should be highlighted

#### 5.2. AC5-002: Verify Whitespace-Only Input Rejection

**File:** `tests/AC5/whitespace-only.spec.ts`

**Steps:**
  1. Navigate to checkout form
    - expect: Checkout form should be displayed
  2. Enter only spaces in First Name: '     ', Last Name: '     ', Zip: '     '
    - expect: Form fields should contain whitespace
  3. Click Continue button
    - expect: Form should not submit
    - expect: Error message should be displayed (whitespace-only should be treated as empty)
    - expect: Form should indicate at least one field is required

#### 5.3. AC5-003: Verify Field-Level Error Messages

**File:** `tests/AC5/field-level-errors.spec.ts`

**Steps:**
  1. Navigate to checkout form
    - expect: Checkout form should be displayed
  2. Enter data: First Name: 'John', Last Name: empty, Zip: '12345'
    - expect: Fields should contain the entered data
  3. Click Continue button
    - expect: Error message should appear specifically for Last Name field
    - expect: Error message should state 'Error: Last Name is required'
    - expect: Visual indicator (icon) should appear next to Last Name field

#### 5.4. AC5-004: Verify Error Message Close Button

**File:** `tests/AC5/error-close-button.spec.ts`

**Steps:**
  1. Navigate to checkout form
    - expect: Checkout form should be displayed
  2. Leave all fields empty and click Continue
    - expect: Error message should be displayed
  3. Click the close button (X) on the error message
    - expect: Error message should be dismissed/hidden
    - expect: Form should remain on the same page

#### 5.5. AC5-005: Verify Invalid Postal Code Format Handling

**File:** `tests/AC5/postal-code-format.spec.ts`

**Steps:**
  1. Navigate to checkout form
    - expect: Checkout form should be displayed
  2. Enter First Name: 'John', Last Name: 'Doe', Zip: 'ABCDE' (non-numeric)
    - expect: Form fields should accept any input
  3. Click Continue button
    - expect: Form should either accept the input or display validation error
    - expect: If validation occurs, error should indicate invalid postal code format

#### 5.6. AC5-006: Verify Multiple Field Error Handling

**File:** `tests/AC5/multiple-field-errors.spec.ts`

**Steps:**
  1. Navigate to checkout form
    - expect: Checkout form should be displayed
  2. Leave First Name empty, Last Name empty, and enter valid Zip '12345'
    - expect: Fields should reflect the input
  3. Click Continue button
    - expect: Error should be displayed for first required field
    - expect: Application should indicate which field has the error

#### 5.7. AC5-007: Verify Error Recovery Process

**File:** `tests/AC5/error-recovery.spec.ts`

**Steps:**
  1. Navigate to checkout form
    - expect: Checkout form should be displayed
  2. Leave First Name empty, enter Last Name: 'Doe', Zip: '12345' and click Continue
    - expect: Error message should be displayed for First Name
  3. Enter 'John' in First Name field
    - expect: First Name should contain 'John'
  4. Click Continue button again
    - expect: Form should submit successfully this time
    - expect: User should proceed to overview page
    - expect: Error message should be cleared

#### 5.8. AC5-008: Verify SQL Injection Attempt Handling

**File:** `tests/AC5/sql-injection.spec.ts`

**Steps:**
  1. Navigate to checkout form
    - expect: Checkout form should be displayed
  2. Enter potentially malicious input in First Name: '; DROP TABLE users;--'
    - expect: Form should accept the input as plain text
  3. Click Continue button
    - expect: Application should handle the input safely
    - expect: No database errors should occur
    - expect: Input should be treated as literal string
    - expect: Form should either proceed or reject based on validation rules, not security issues

#### 5.9. AC5-009: Verify XSS Attack Attempt Prevention

**File:** `tests/AC5/xss-prevention.spec.ts`

**Steps:**
  1. Navigate to checkout form
    - expect: Checkout form should be displayed
  2. Enter XSS payload in First Name: '<script>alert("XSS")</script>', Last Name: 'Doe', Zip: '12345'
    - expect: Form should accept the input
  3. Click Continue button and proceed to overview
    - expect: Script should not execute
    - expect: Input should be displayed as plain text
    - expect: No alert or popup should appear
    - expect: Page should render normally

#### 5.10. AC5-010: Verify Form Persistence After Error

**File:** `tests/AC5/form-persistence.spec.ts`

**Steps:**
  1. Navigate to checkout form
    - expect: Checkout form should be displayed
  2. Enter First Name: 'John', Last Name: empty, Zip: '12345'
    - expect: Fields should contain entered data
  3. Click Continue button (expecting error for missing Last Name)
    - expect: Error should be displayed
  4. Verify form retains entered data
    - expect: First Name should still show 'John'
    - expect: Last Name should still be empty
    - expect: Zip should still show '12345'
    - expect: User should be able to correct just the Last Name field and continue
