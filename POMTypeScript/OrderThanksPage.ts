import {expect, Locator, Page} from '@playwright/test';

export class OrderThanksPage {
  id: Locator;
  historyPage: Locator;
  tableBody: Locator;
  table: Locator
  orderIdDetails: Locator;
  constructor(page: Page) {
    this.id = page.locator("table label").nth(1);
    this.historyPage = page.locator("text = Orders History Page");
    this.tableBody = page.locator("tbody");
    this.table = page.locator("tbody tr");
    this.orderIdDetails = page.locator(".col-text");
  }

  async idExtractAndHistoryClick() {
    await expect(this.id).toBeVisible();
    const orderId: any = await this.id.textContent();
    const realOrderId = orderId.trim().split(" ")[1];
    console.log(realOrderId);
    await this.historyPage.click();
    return realOrderId;
  }
  async orderLastPage() {
    const realOrderId = await this.idExtractAndHistoryClick();
    await expect(this.tableBody).toBeVisible();
    const tableCount = await this.table.count();
    for (let i = 0; i < tableCount; i++) {
      const rowOrder = await this.table.nth(i).locator("th").textContent();
      if (realOrderId.includes(rowOrder)) {
        await this.table.nth(i).locator("button.btn.btn-primary").click();
        break;
      }
    }
    const oD = await this.orderIdDetails.textContent();
    expect(realOrderId.includes(oD)).toBeTruthy();
  }
}
module.exports = { OrderThanksPage };
