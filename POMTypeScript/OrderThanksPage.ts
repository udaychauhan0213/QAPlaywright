import { expect, Locator, Page } from '@playwright/test';

export class OrderThanksPage {
  private readonly orderIdLabel: Locator;
  private readonly historyLink: Locator;
  private readonly orderRows: Locator;
  private readonly orderIdDetails: Locator;

  constructor(private readonly page: Page) {
    this.orderIdLabel = page.locator('table label').nth(1);
    this.historyLink = page.getByText('Orders History Page', { exact: true });
    this.orderRows = page.locator('tbody tr');
    this.orderIdDetails = page.locator('.col-text');
  }

  async orderLastPage(): Promise<void> {
    const orderId = await this.extractOrderId();

    await this.historyLink.click();
    await expect(this.orderRows.first()).toBeVisible();

    const matchingRow = this.orderRows.filter({ hasText: orderId });
    await expect(matchingRow, `Order "${orderId}" was not found`).toHaveCount(1);

    await matchingRow.getByRole('button', { name: /view|details/i }).click();

    await expect(this.orderIdDetails).toContainText(orderId);
  }

  private async extractOrderId(): Promise<string> {
    await expect(this.orderIdLabel).toBeVisible();

    const text = (await this.orderIdLabel.textContent())?.trim() ?? '';
    const orderId = text.match(/[A-Z0-9]{6,}/i)?.[0];

    expect(orderId, `Could not extract order ID from "${text}"`).toBeTruthy();
    return orderId!;
  }
}