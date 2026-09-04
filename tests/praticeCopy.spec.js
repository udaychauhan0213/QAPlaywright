const { test, expect } = require("@playwright/test");

test("Login Practice 2", async ({ browser, page }) => {
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client");
  await page.getByPlaceholder("email@example.com").fill("udaychauhan0213@gmail.com");
  await page.getByPlaceholder("enter your passsword").fill("Scanning2000");
  await page.getByRole("button",{name: 'Login'}).click();
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body h5").first().waitFor();
  await products.filter({hasText:'ZARA COAT 3'}).getByRole("button",{name:'Add To Cart'}).click();
  await page.getByRole("listitem").getByRole("button",{name:'Cart'}).click();

  await page.locator("div li").first().waitFor();
  await expect(page.getByText("ZARA COAT 3")).toBeVisible();
  await page.getByRole("button",{name:'Checkout'}).click();
  await expect(page.getByText("udaychauhan0213@gmail.com")).toBeVisible();
  await page.getByPlaceholder("Select Country").pressSequentially("ind", { delay: 100 });
  await page.getByRole("button",{name:"India"}).nth(1).click();
  await page.locator("[name = 'coupon']").fill("rahulshettyacademy");
  await page.getByRole("button",{name:'Apply Coupon'}).click();
  await page.getByText("PLACE ORDER").click();

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
