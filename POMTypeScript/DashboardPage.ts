import { expect, Locator, Page } from '@playwright/test';

export class DashboardPage {
  private readonly products: Locator;
  private readonly cart: Locator;

  constructor(private readonly page: Page) {
    this.products = page.locator('.card-body');
    this.cart = page.locator('[routerlink*="cart"]');
  }

  async searchProductAddCart(productName: string): Promise<void> {
    const product = this.products.filter({
      has: pageLocatorByText(this.page, 'b', productName),
    });

    await expect(product, `Product "${productName}" was not found`).toHaveCount(1);
    await product.getByRole('button', { name: /add to cart/i }).click();
  }

  async navigateToCart(): Promise<void> {
    await this.cart.click();
    await expect(this.page).toHaveURL(/cart/);
  }
}

function pageLocatorByText(page: Page, selector: string, text: string): Locator {
  return page.locator(selector).filter({ hasText: new RegExp(`^${escapeRegExp(text)}$`) });
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}