import { test, expect } from "@playwright/test";

/**
 * E2E Tests: Authentication Flow
 * Critical user journey: Sign up and log in
 */

test.describe("Authentication", () => {
  test("user can sign up with email", async ({ page }) => {
    await page.goto("/signup");

    // Fill signup form
    await page.fill('[data-testid="email-input"]', "test@example.com");
    await page.fill('[data-testid="password-input"]', "SecurePass123!");
    await page.fill('[data-testid="confirm-password-input"]', "SecurePass123!");

    // Submit form
    await page.click('[data-testid="signup-button"]');

    // Verify redirect to dashboard or confirmation
    await expect(page).toHaveURL(/\/(dashboard|confirm)/);
  });

  test("user can log in with valid credentials", async ({ page }) => {
    await page.goto("/login");

    // Fill login form
    await page.fill('[data-testid="email-input"]', "existing@example.com");
    await page.fill('[data-testid="password-input"]', "ExistingPass123!");

    // Submit form
    await page.click('[data-testid="login-button"]');

    // Verify redirect to dashboard
    await expect(page).toHaveURL(/\/dashboard/);

    // Verify user is logged in
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
  });

  test("user sees error for invalid credentials", async ({ page }) => {
    await page.goto("/login");

    // Fill with invalid credentials
    await page.fill('[data-testid="email-input"]', "wrong@example.com");
    await page.fill('[data-testid="password-input"]', "WrongPassword!");

    // Submit form
    await page.click('[data-testid="login-button"]');

    // Verify error message
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="error-message"]')).toContainText(
      /invalid|incorrect/i,
    );
  });

  test("user can log out", async ({ page }) => {
    // Assume user is logged in (would use auth fixture in real test)
    await page.goto("/dashboard");

    // Click user menu
    await page.click('[data-testid="user-menu"]');

    // Click logout
    await page.click('[data-testid="logout-button"]');

    // Verify redirect to login
    await expect(page).toHaveURL(/\/login/);
  });
});
