import { test, expect } from "@playwright/test";

test("Search Product", async ({ page }) => {
  // 1–2. Launch browser & navigate
  await page.goto("https://automationexercise.com");

  // 3. Verify home page is visible
  await expect(page.locator("#slider")).toBeVisible();

  // 4. Click on 'Products' button
  await page.getByRole("link", { name: "Products" }).click();

  // 5. Verify ALL PRODUCTS page is opened
  await expect(page).toHaveURL(/\/products/);
  await expect(
    page.getByRole("heading", { name: "All Products" })
  ).toBeVisible();

  // 6. Enter product name and click search
  const searchText = "Dress";
  await page.fill("#search_product", searchText);
  await page.click("#submit_search");

  // 7. Verify 'SEARCHED PRODUCTS' is visible
  await expect(
    page.getByRole("heading", { name: "Searched Products" })
  ).toBeVisible();

  // 8. Verify all searched products are visible
  const searchedProducts = page.locator(".features_items .product-image-wrapper");
  await expect(searchedProducts.first()).toBeVisible();

  // (додатково) перевіряємо, що знайдено хоча б один продукт
  const count = await searchedProducts.count();
  expect(count).toBeGreaterThan(0);
});
