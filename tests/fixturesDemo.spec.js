const { test, expect, request } = require("@playwright/test");
const { customTest } = require("./utils/fixtures");

customTest("Fixtures Demo", async ({ authenticatedPage, createOrder, testDataForOrder }) => {
  await authenticatedPage.goto("https://rahulshettyacademy.com/client");//this will bypass the login as in fixture we already did that
  await authenticatedPage.locator("button[routerlink*='myorders']").click();
  await authenticatedPage.locator("tbody").waitFor();
  await expect(authenticatedPage.getByText(createOrder.orderId)).toBeVisible(); //createOrder = response
  console.log(testDataForOrder.productName);

});
