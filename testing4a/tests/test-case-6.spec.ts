import { test, expect } from "@playwright/test";

test("Contact Us Form", async ({ page }) => {
  // 1-2. Navigate to site
  await page.goto("https://automationexercise.com");

  // 3. Verify home page
  await expect(page.locator("#slider")).toBeVisible();

  // 4. Click Contact Us
  await page.getByRole("link", { name: "Contact us" }).click();

  // 5. Verify "GET IN TOUCH"
  await expect(
    page.getByRole("heading", { name: "Get In Touch" })
  ).toBeVisible();

  // 6. Fill fields
  await page.fill('[data-qa="name"]', "John Test");
  await page.fill('[data-qa="email"]', "john@example.com");
  await page.fill('[data-qa="subject"]', "Test Subject");
  await page.fill('[data-qa="message"]', "Hello, this is test message");

  // 7. Upload file
  await page.setInputFiles('input[name="upload_file"]', "tests/files/logs.txt");

  // 8–9. Handle alert & Submit
  page.once("dialog", (dialog) => dialog.accept());
  await page.click('[data-qa="submit-button"]');

  // 10. Back to home
  await page.getByRole("link", { name: "Home" }).click();
  await expect(page.locator("#slider")).toBeVisible();
});
