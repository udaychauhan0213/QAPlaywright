const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("./utils/apiUtils");
const loginPayload = {userEmail: "udaychauhan0213@gmail.com", userPassword: "Scanning2000",};
const orderPayload = {orders: [{ country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" }],};
let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayload);
  
});

test("Place The Order", async ({ browser, page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client");
  await page.getByRole("button", { name: "ORDERS" }).click();
  await page.locator("tbody").waitFor();

  const table = page.locator("tbody tr");
  const tableCount = await table.count();
  for (let i = 0; i < tableCount; i++) {
    const rowOrder = await table.nth(i).locator("th").textContent();
    if (response.orderId.includes(rowOrder)) {
      await table.nth(i).locator("button.btn.btn-primary").click();
      break;
    }
  }

  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
  await page.pause();
});
