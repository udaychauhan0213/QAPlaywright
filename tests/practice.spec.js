const { test, expect } = require("@playwright/test");

test("Login Practice", async ({ browser, page }) => {
  const productName = "ADIDAS ORIGINAL";
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("udaychauhan0213@gmail.com");
  await page.locator("[type='password']").fill("Scanning2000");
  await page.locator("#login").click();
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body h5").first().waitFor();
  const allTitle = await page.locator(".card-body b").allTextContents();
  console.log(allTitle);
  const count = await products.count();
  for (let i = 0; i < count; ++i) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      await products.nth(i).locator("text = Add To Cart").click();
      break;
    }
  }
  await page.locator(".btn.btn-custom").nth(2).click();
  await page.locator("div li").first().waitFor();
  const bool = await page
    .locator("h3:has-text('ADDIDAS ORIGINAL')")
    .isVisible();
  expect(bool).toBeFalsy();
  await page.locator(".btn.btn.btn-primary").nth(2).click();
  const bool2 = await page
    .locator("text = udaychauhan0213@gmail.com")
    .isVisible();
  expect(bool2).toBeTruthy();
  await page
    .locator("[placeholder = 'Select Country']")
    .pressSequentially("ind", { delay: 100 });
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const optionCount = await dropdown.locator("button").count();
  for (let i = 0; i < optionCount; i++) {
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text === " India") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }
  await page.locator("[name = 'coupon']").fill("rahulshettyacademy");
  await page.locator(".btn.btn-primary.mt-1").click();

  await page.locator(".btnn.action__submit.ng-star-inserted").click();
  const id = page.locator("table label").nth(1);
  await id.waitFor();
  const orderId = await page.locator("table label").nth(1).textContent();
  const realOrderId = orderId.trim().split(" ")[1];
  console.log(realOrderId);
  await page.locator("text = Orders History Page").click();
  await page.locator("tbody").waitFor();

  const table = page.locator("tbody tr");
  const tableCount = await table.count();
  for (let i = 0; i < tableCount; i++) {
    const rowOrder = await table.nth(i).locator("th").textContent();
    if (realOrderId.includes(rowOrder)) {
      await table.nth(i).locator("button.btn.btn-primary").click();
      break;
    }
  }

  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
  await page.pause();
});
