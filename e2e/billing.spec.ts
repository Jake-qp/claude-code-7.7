import { test, expect } from "@playwright/test";

/**
 * E2E Tests: Billing Dashboard
 * Critical user journeys: View plan, access Stripe portal
 */

test.describe("Billing Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to billing dashboard (assumes authenticated)
    await page.goto("/dashboard/billing");
  });

  test("user can view their current plan", async ({ page }) => {
    // Verify plan card is visible
    await expect(page.locator(".billing-overview")).toBeVisible();

    // Verify plan name is displayed (not "undefined")
    const planName = page.locator(".plan-name");
    await expect(planName).toBeVisible();
    await expect(planName).not.toHaveText("undefined");
    await expect(planName).toHaveText(/Free|Pro|Enterprise/);

    // Verify plan features are listed
    await expect(page.locator(".plan-features li")).toHaveCount({ min: 1 });
  });

  test("user can see usage metrics", async ({ page }) => {
    // Verify usage metrics card is visible
    await expect(page.locator(".usage-metrics")).toBeVisible();

    // Verify metrics are displayed (not loading forever)
    await expect(page.locator(".metric-card")).toHaveCount(3, {
      timeout: 5000,
    });

    // Verify API calls metric
    await expect(page.locator('[data-metric="api-calls"]')).toBeVisible();

    // Verify storage metric
    await expect(page.locator('[data-metric="storage"]')).toBeVisible();

    // Verify team members metric
    await expect(page.locator('[data-metric="team-members"]')).toBeVisible();
  });

  test("user can navigate to upgrade page", async ({ page }) => {
    // Click upgrade button
    await page.click(".upgrade-button");

    // Verify navigation to upgrade page
    await expect(page).toHaveURL(/\/upgrade/);

    // Verify current plan is highlighted
    await expect(page.locator(".plan-option.current")).toBeVisible();

    // Verify all plan options are displayed
    await expect(page.locator(".plan-option")).toHaveCount(3);
  });

  test("user can access Stripe Customer Portal", async ({ page }) => {
    // Click manage subscription button
    const portalButton = page.locator('[data-testid="manage-subscription"]');
    await expect(portalButton).toBeVisible();

    // Note: We can't fully test Stripe redirect in E2E
    // Just verify the button exists and is clickable
    await expect(portalButton).toBeEnabled();
  });

  test("upgrade page shows current plan correctly", async ({ page }) => {
    await page.goto("/upgrade");

    // Verify current plan info is shown
    const currentPlanInfo = page.locator(".current-plan-info");
    await expect(currentPlanInfo).toBeVisible();

    // Verify plan name is not "undefined"
    const currentPlanName = page.locator(".current-plan-name");
    await expect(currentPlanName).not.toHaveText("undefined");
    await expect(currentPlanName).toHaveText(/Free|Pro|Enterprise/);
  });
});

test.describe("Billing Error States", () => {
  test("shows error state when metrics fail to load", async ({ page }) => {
    // Mock API failure
    await page.route("**/api/usage-metrics", (route) =>
      route.fulfill({ status: 500, body: "Server Error" }),
    );

    await page.goto("/dashboard/billing");

    // Verify error state is shown
    await expect(page.locator(".usage-metrics--error")).toBeVisible();

    // Verify retry button is present
    await expect(page.locator(".error-state__retry")).toBeVisible();
  });

  test("shows empty state for new users", async ({ page }) => {
    // Mock empty metrics response
    await page.route("**/api/usage-metrics", (route) =>
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          apiCalls: 0,
          storageUsed: 0,
          teamMembers: 0,
        }),
      }),
    );

    await page.goto("/dashboard/billing");

    // Verify empty state is shown
    await expect(page.locator(".usage-metrics--empty")).toBeVisible();
    await expect(page.locator(".empty-state__message")).toContainText(
      /no usage data/i,
    );
  });
});
