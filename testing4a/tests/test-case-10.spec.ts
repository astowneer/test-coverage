import { test, expect } from "@playwright/test";

test("Verify Subscription in home page", async ({ page }) => {
  // 1–2. Launch browser & navigate
  await page.goto("https://automationexercise.com");

  // 3. Verify home page is visible
  await expect(page.locator("#slider")).toBeVisible();

  // 4. Scroll down to footer
  await page.locator("footer").scrollIntoViewIfNeeded();

  // 5. Verify text 'SUBSCRIPTION'
  await expect(
    page.getByRole("heading", { name: "Subscription" })
  ).toBeVisible();

  // 6. Enter email address and click arrow button
  await page.fill("#susbscribe_email", "test_subscription@example.com");
  await page.click("#subscribe");

  // 7. Verify success message
  await expect(
    page.locator("#success-subscribe")
  ).toHaveText("You have been successfully subscribed!");
});
