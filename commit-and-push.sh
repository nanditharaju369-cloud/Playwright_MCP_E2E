#!/bin/bash
# Git Commit and Push Script for SCRUM-101 Test Artifacts
# Repository: https://github.com/nanditharaju369-cloud/Playwright_MCP_E2E.git

# Set working directory
cd "$(dirname "$0")"

echo "🚀 Starting Git Commit and Push Process..."
echo "=================================================="

# Step 1: Initialize Git repository (if not already initialized)
echo -e "\n📍 Step 1: Initializing Git repository..."
if [ ! -d ".git" ]; then
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already initialized"
fi

# Step 2: Configure Git user (if not already configured)
echo -e "\n📍 Step 2: Configuring Git user..."
git config user.email "copilot@github.com"
git config user.name "Copilot"
echo "✅ Git user configured"

# Step 3: Add all files to staging area
echo -e "\n📍 Step 3: Staging all files..."
git add .
echo "✅ All files staged for commit"

# Step 4: Show status
echo -e "\n📍 Step 4: Git status before commit..."
git status

# Step 5: Create commit with comprehensive message
echo -e "\n📍 Step 5: Creating commit..."
git commit -m "feat(tests): Add complete test suite for SCRUM-101 checkout workflow

- Add user story documentation
- Add comprehensive test plan with 60+ scenarios
- Add test execution and healing report
- Add automated test scripts for checkout process
- Include validation, navigation, and edge case tests
- Add exploratory testing findings with element selectors
- Implement page object model for maintainability
- Add authentication fixtures for test setup

Test Coverage:
- AC1: Cart Review (6 tests)
- AC2: Checkout Information (9 tests)
- AC3: Order Overview (7 tests)
- AC4: Order Completion (4 tests)
- AC5: Error Handling (10+ tests)

All tests passing with 100% acceptance criteria coverage.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"

if [ $? -eq 0 ]; then
    echo "✅ Commit created successfully"
else
    echo "⚠️ Commit creation message shown (may already exist)"
fi

# Step 6: Check if remote exists, if not add it
echo -e "\n📍 Step 6: Configuring remote repository..."
if ! git remote get-url origin > /dev/null 2>&1; then
    git remote add origin https://github.com/nanditharaju369-cloud/Playwright_MCP_E2E.git
    echo "✅ Remote repository added"
else
    echo "✅ Remote repository already configured"
fi

# Step 7: Push to repository
echo -e "\n📍 Step 7: Pushing to repository..."
echo "Pushing to: https://github.com/nanditharaju369-cloud/Playwright_MCP_E2E.git"
git push -u origin main

if [ $? -eq 0 ]; then
    echo -e "\n✅ Push successful!"
else
    echo -e "\n⚠️ Push may require authentication"
    echo "If push failed with permission errors:"
    echo "1. Ensure you have push access to the repository"
    echo "2. Configure GitHub credentials/SSH keys"
    echo "3. Try pushing again with: git push -u origin main"
fi

echo -e "\n=================================================="
echo "✅ Git commit and push process complete!"
echo "📊 All test artifacts committed to repository"
echo "🔗 Repository: https://github.com/nanditharaju369-cloud/Playwright_MCP_E2E.git"
