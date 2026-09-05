import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
  private readonly product: Locator;
  private readonly checkoutButton: Locator;

  constructor(private readonly page: Page, productName: string) {
    this.product = page.locator('h3').filter({ hasText: productName });
    this.checkoutButton = page.getByRole('button', { name: /checkout/i });
  }

  async cartVisibilityTexts(): Promise<void> {
    await expect(this.product).toBeVisible();
  }

  async cartCheckOut(): Promise<void> {
    await this.checkoutButton.click();
    await expect(this.page.locator('[placeholder="Select Country"]')).toBeVisible();
  }
}