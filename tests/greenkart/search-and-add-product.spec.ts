import { test, expect } from '@playwright/test';

test.describe('GreenKart Catalog And Purchase', () => {
  test('Search for a product and add the matching item to the cart', async ({ page }) => {
    // 1. Start with a fresh browser context and navigate to https://rahulshettyacademy.com/seleniumPractise/#/.
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
    await expect(page).toHaveTitle('GreenKart - veg and fruits kart');
    await expect(page.getByRole('heading', { name: 'Brocolli - 1 Kg' })).toBeVisible();

    // 2. Fill the "Search for Vegetables and Fruits" field with "Apple".
    await page.locator('input.search-keyword').fill('Apple');
    const appleProduct = page.locator('.product').filter({ hasText: 'Apple - 1 Kg' });
    await expect(appleProduct).toHaveCount(1);
    await expect(appleProduct).toContainText('Apple - 1 Kg');
    await expect(appleProduct).toContainText('₹ 72');

    // 3. Click the "ADD TO CART" button for "Apple - 1 Kg".
    await appleProduct.getByRole('button', { name: 'ADD TO CART' }).click();
    await expect(page.getByRole('link', { name: 'Cart' })).toContainText('1');

    // 4. Open the Cart control in the header.
    await page.getByRole('link', { name: 'Cart' }).click();
    const cartPreview = page.locator('.cart-preview');
    await expect(cartPreview).toBeVisible();
    await expect(cartPreview).toContainText('Apple - 1 Kg');
    await expect(page.getByRole('button', { name: 'PROCEED TO CHECKOUT' })).toBeVisible();
  });
});
