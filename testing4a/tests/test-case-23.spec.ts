import { test, expect } from "@playwright/test";

test("Verify address details in checkout page", async ({ page }) => {
  // Test data
  const user = {
    name: "John",
    email: `john_${Date.now()}@example.com`,
    password: "Test12345",
    firstName: "John",
    lastName: "Doe",
    address: "123 Test Street",
    country: "United States",
    state: "California",
    city: "Los Angeles",
    zipcode: "90001",
    mobile: "1234567890",
  };

  // 1–2. Launch browser & navigate
  await page.goto("https://automationexercise.com");

  // 3. Verify home page
  await expect(page.locator("#slider")).toBeVisible();

  // 4. Click Signup / Login
  await page.getByRole("link", { name: "Signup / Login" }).click();

  // 5. Fill Signup form
  await page.fill('[data-qa="signup-name"]', user.name);
  await page.fill('[data-qa="signup-email"]', user.email);
  await page.click('[data-qa="signup-button"]');

  // Fill account information
  await page.check("#id_gender1");
  await page.fill("#password", user.password);
  await page.selectOption("#days", "1");
  await page.selectOption("#months", "1");
  await page.selectOption("#years", "2000");

  await page.fill("#first_name", user.firstName);
  await page.fill("#last_name", user.lastName);
  await page.fill("#address1", user.address);
  await page.selectOption("#country", user.country);
  await page.fill("#state", user.state);
  await page.fill("#city", user.city);
  await page.fill("#zipcode", user.zipcode);
  await page.fill("#mobile_number", user.mobile);

  await page.click('[data-qa="create-account"]');

  // 6. Verify ACCOUNT CREATED
  await expect(
    page.getByRole("heading", { name: "Account Created!" })
  ).toBeVisible();
  await page.click('[data-qa="continue-button"]');

  // 7. Verify Logged in as username
  await expect(
    page.getByText(`Logged in as ${user.name}`)
  ).toBeVisible();

  // 8. Add product to cart
  await page.getByRole("link", { name: "Products" }).click();
  await page.locator(".add-to-cart").first().click();
  await page.getByRole("button", { name: "Continue Shopping" }).click();

  // 9. Click Cart
  await page.getByRole("link", { name: "Cart" }).click();

  // 10. Verify cart page
  await expect(page).toHaveURL(/\/view_cart/);
  await expect(page.getByText("Shopping Cart")).toBeVisible();

  // 11. Proceed to Checkout
  await page.getByText("Proceed To Checkout").click();

  // 12. Verify delivery address
  const deliveryAddress = page.locator("#address_delivery");
  await expect(deliveryAddress).toContainText(user.firstName);
  await expect(deliveryAddress).toContainText(user.lastName);
  await expect(deliveryAddress).toContainText(user.address);
  await expect(deliveryAddress).toContainText(user.city);
  await expect(deliveryAddress).toContainText(user.state);
  await expect(deliveryAddress).toContainText(user.zipcode);
  await expect(deliveryAddress).toContainText(user.country);
  await expect(deliveryAddress).toContainText(user.mobile);

  // 13. Verify billing address
  const billingAddress = page.locator("#address_invoice");
  await expect(billingAddress).toContainText(user.firstName);
  await expect(billingAddress).toContainText(user.lastName);
  await expect(billingAddress).toContainText(user.address);
  await expect(billingAddress).toContainText(user.city);
  await expect(billingAddress).toContainText(user.state);
  await expect(billingAddress).toContainText(user.zipcode);
  await expect(billingAddress).toContainText(user.country);
  await expect(billingAddress).toContainText(user.mobile);

  // 14. Delete Account
  await page.getByRole("link", { name: "Delete Account" }).click();

  // 15. Verify ACCOUNT DELETED
  await expect(
    page.getByRole("heading", { name: "Account Deleted!" })
  ).toBeVisible();
  await page.click('[data-qa="continue-button"]');
});
