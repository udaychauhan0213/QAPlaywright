import { expect, Locator, Page } from '@playwright/test';

export class OrderCardPage {
  private readonly userName: Locator;
  private readonly countryInput: Locator;
  private readonly countryOptions: Locator;
  private readonly coupon: Locator;
  private readonly placeOrderButton: Locator;

  constructor(private readonly page: Page, username: string) {
    this.userName = page.getByText(username, { exact: true });
    this.countryInput = page.locator('[placeholder="Select Country"]');
    this.countryOptions = page.locator('.ta-results button');
    this.coupon = page.locator('[name="coupon"]');
    this.placeOrderButton = page.getByRole('button', { name: /place order/i });
  }

  async placeholderVisible(): Promise<void> {
    await expect(this.userName).toBeVisible();
  }

  async countrySelectionAndOrder(country = 'India'): Promise<void> {
    await this.countryInput.fill(country.slice(0, 3));

    const option = this.countryOptions.filter({ hasText: new RegExp(`^\\s*${country}\\s*$`) });
    await expect(option).toHaveCount(1);
    await option.click();

    await this.coupon.fill('rahulshettyacademy');
    await this.placeOrderButton.click();

    await expect(this.page.getByText(/thankyou|order/i).first()).toBeVisible();
  }
}