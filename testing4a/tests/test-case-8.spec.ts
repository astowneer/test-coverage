import { test, expect } from "@playwright/test";

test("Verify All Products and product detail page", async ({ page }) => {
  // 1–2. Launch browser & navigate
  await page.goto("https://automationexercise.com");

  // 3. Verify home page is visible
  await expect(page.locator("#slider")).toBeVisible();

  // 4. Click on 'Products' button
  await page.getByRole("link", { name: "Products" }).click();

  // 5. Verify user is navigated to ALL PRODUCTS page
  await expect(page).toHaveURL(/\/products/);
  await expect(
    page.getByRole("heading", { name: "All Products" })
  ).toBeVisible();

  // 6. Verify products list is visible
  const productsList = page.locator(".features_items");
  await expect(productsList).toBeVisible();

  // 7. Click on 'View Product' of first product
  await page.locator(".choose a").first().click();

  // 8. Verify user is landed to product detail page
  await expect(page).toHaveURL(/\/product_details/);

  // 9. Verify product details are visible
  await expect(page.locator(".product-information h2")).toBeVisible(); // product name
  await expect(page.locator(".product-information p").filter({ hasText: "Category" })).toBeVisible();
  await expect(page.locator(".product-information span span")).toBeVisible(); // price
  await expect(page.locator(".product-information p").filter({ hasText: "Availability" })).toBeVisible();
  await expect(page.locator(".product-information p").filter({ hasText: "Condition" })).toBeVisible();
  await expect(page.locator(".product-information p").filter({ hasText: "Brand" })).toBeVisible();
});
