import {expect, Locator, Page} from '@playwright/test';

export class OrderCardPage {
  placeholder: Locator;
  countryName: Locator;
  dropdown: Locator;
  coupon: Locator;
  placeOrderButton: Locator;
  submit: Locator;
  constructor(page: Page, username: string) {
    this.placeholder = page.getByText(username);
    this.countryName = page.locator("[placeholder = 'Select Country']");
    this.dropdown = page.locator(".ta-results");
    this.coupon = page.locator("[name = 'coupon']");
    this.placeOrderButton = page.locator(".btn.btn-primary.mt-1");
    this.submit = page.locator(".btnn.action__submit.ng-star-inserted");
  }

  async placeholderVisible() {
    await expect(this.placeholder).toBeVisible();
  }

  async countrySelectionAndOrder() {
    await this.countryName.pressSequentially("ind", { delay: 100 });
    await expect(this.dropdown).toBeVisible();
    const optionCount = await this.dropdown.locator("button").count();

    for (let i = 0; i < optionCount; i++) {
      const text = await this.dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
        await this.dropdown.locator("button").nth(i).click();
        break;
      }
    }
    await this.coupon.fill("rahulshettyacademy");
    await this.placeOrderButton.click();
    await this.submit.click();
  }
}
module.exports = { OrderCardPage };
