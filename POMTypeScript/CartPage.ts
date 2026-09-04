import {expect, Locator} from '@playwright/test';
import { Page } from 'playwright';

export class CartPage {

  page: Page
  cartPageWait: Locator;
  productTextVisible: Locator;
  checkOutButton: Locator;

  constructor(page: Page, productName: string) {
    this.page = page;
    this.cartPageWait = page.locator("div li").first();
    this.productTextVisible = page.locator("h3:has-text('" + productName + "')");
    this.checkOutButton = page.locator(".btn.btn.btn-primary").nth(2);
  }
  async cartVisibilityTexts() {
    await this.cartPageWait.waitFor();
    await expect(this.productTextVisible).toBeVisible();
  }
  async cartCheckOut() {
    await this.checkOutButton.click();
  }
}
module.exports = { CartPage };
