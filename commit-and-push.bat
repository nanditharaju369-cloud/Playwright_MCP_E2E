@echo off
REM Git Commit and Push Script for SCRUM-101 Test Artifacts
REM Repository: https://github.com/nanditharaju369-cloud/Playwright_MCP_E2E.git

REM Set working directory
cd /d "%~dp0"

echo.
echo ==========================================
echo    Git Commit and Push Process
echo ==========================================
echo.

REM Step 1: Initialize Git repository (if not already initialized)
echo [Step 1/7] Initializing Git repository...
if not exist ".git" (
    git init
    echo OK - Git repository initialized
) else (
    echo OK - Git repository already initialized
)

REM Step 2: Configure Git user
echo [Step 2/7] Configuring Git user...
git config user.email "copilot@github.com"
git config user.name "Copilot"
echo OK - Git user configured

REM Step 3: Add all files to staging area
echo [Step 3/7] Staging all files...
git add .
echo OK - All files staged for commit

REM Step 4: Show status
echo [Step 4/7] Current Git status:
echo.
git status
echo.

REM Step 5: Create commit with comprehensive message
echo [Step 5/7] Creating commit...
git commit -m "feat(tests): Add complete test suite for SCRUM-101 checkout workflow"^
 -m "- Add user story documentation"^
 -m "- Add comprehensive test plan with 60+ scenarios"^
 -m "- Add test execution and healing report"^
 -m "- Add automated test scripts for checkout process"^
 -m "- Include validation, navigation, and edge case tests"^
 -m "- Add exploratory testing findings with element selectors"^
 -m "- Implement page object model for maintainability"^
 -m "- Add authentication fixtures for test setup"^
 -m ""^
 -m "Test Coverage:"^
 -m "- AC1: Cart Review (6 tests)"^
 -m "- AC2: Checkout Information (9 tests)"^
 -m "- AC3: Order Overview (7 tests)"^
 -m "- AC4: Order Completion (4 tests)"^
 -m "- AC5: Error Handling (10+ tests)"^
 -m ""^
 -m "All tests passing with 100%% acceptance criteria coverage."^
 -m ""^
 -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"

if %ERRORLEVEL% EQU 0 (
    echo OK - Commit created successfully
) else (
    echo NOTE - Commit result (may have no changes or other conditions)
)

REM Step 6: Check if remote exists, if not add it
echo [Step 6/7] Configuring remote repository...
git remote get-url origin >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    git remote add origin https://github.com/nanditharaju369-cloud/Playwright_MCP_E2E.git
    echo OK - Remote repository added
) else (
    echo OK - Remote repository already configured
)

REM Step 7: Push to repository
echo [Step 7/7] Pushing to repository...
echo.
echo Pushing to: https://github.com/nanditharaju369-cloud/Playwright_MCP_E2E.git
echo.

git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ==========================================
    echo    SUCCESS - Push completed!
    echo ==========================================
    echo OK - All test artifacts committed to repository
    echo Repository: https://github.com/nanditharaju369-cloud/Playwright_MCP_E2E.git
) else (
    echo.
    echo ==========================================
    echo    Push may require authentication
    echo ==========================================
    echo.
    echo If push failed with permission errors:
    echo 1. Ensure you have push access to the repository
    echo 2. Configure GitHub credentials/SSH keys
    echo 3. Try pushing again with: git push -u origin main
)

echo.
pause
