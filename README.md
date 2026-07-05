# Playwright MCP E2E

End-to-end test automation suite for the [SauceDemo](https://www.saucedemo.com) e-commerce application, covering the full checkout workflow (SCRUM-101). Built with Playwright and TypeScript, with AI agent integration for test planning, generation, and healing.

## Stack

- **Framework**: [Playwright](https://playwright.dev) v1.60 + TypeScript
- **Browsers**: Chromium, Firefox, WebKit (Safari)
- **Pattern**: Page Object Model (POM)
- **CI/CD**: GitHub Actions

## Getting Started

```bash
npm install
npx playwright install        # download browser binaries
npx playwright test           # run the full suite
```

## Running Tests

```bash
# All tests, all browsers
npx playwright test

# Single spec file
npx playwright test tests/AC1-cart-review.spec.ts

# Single test by name
npx playwright test --grep "AC1-001"

# Headed (watch the browser)
npx playwright test --headed

# Interactive UI runner
npx playwright test --ui

# One browser only
npx playwright test --project=chromium

# Debug mode
npx playwright test tests/AC2-checkout-info.spec.ts --debug

# View HTML report
npx playwright show-report
```

## Test Coverage

Tests are organized by Acceptance Criteria across 5 spec files:

| Spec | What it covers |
|---|---|
| `AC1-cart-review.spec.ts` | Cart display, item details, pricing, remove items, empty cart |
| `AC2-checkout-info.spec.ts` | Form field validation, error messages, cancel flow |
| `AC3-order-overview.spec.ts` | Subtotal/tax/total calculations, payment & shipping info |
| `AC4-order-completion.spec.ts` | Confirmation page, success messaging, back-home navigation |
| `AC5-error-handling.spec.ts` | Edge cases: XSS, SQL injection, whitespace-only, special characters |

**40+ automated test cases · 100% AC coverage · Cross-browser**

## Architecture

```
tests/
├── AC1-cart-review.spec.ts
├── AC2-checkout-info.spec.ts
├── AC3-order-overview.spec.ts
├── AC4-order-completion.spec.ts
├── AC5-error-handling.spec.ts
├── auth.fixture.ts          # shared login fixture
├── LoginPage.ts
├── InventoryPage.ts
├── CartPage.ts
├── CheckoutPage.ts
├── OverviewPage.ts
└── ConfirmationPage.ts
specs/
└── saucedemo-checkout-test-plan.md   # 60+ documented scenarios
.github/
├── agents/                           # Claude AI agent definitions
└── workflows/playwright.yml          # CI pipeline
```

All test logic goes through page objects — tests never call raw Playwright APIs directly. The `auth.fixture.ts` provides a pre-authenticated page so individual tests don't repeat login steps.

## CI/CD

GitHub Actions runs the full suite on every push and pull request to `main`/`master`. The HTML report is uploaded as an artifact with 30-day retention.

## AI Agents

Three Claude-powered agents (`.github/agents/`) assist the QA workflow:

- **playwright-test-planner** — generates test plans from user stories
- **playwright-test-generator** — generates spec files from test plans  
- **playwright-test-healer** — diagnoses and fixes failing tests

## Test Credentials

| Field | Value |
|---|---|
| URL | https://www.saucedemo.com |
| Username | `standard_user` |
| Password | `secret_sauce` |
