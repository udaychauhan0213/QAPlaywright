const { test, expect, request } = require("@playwright/test");

test("Request Security Test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("udaychauhan0213@gmail.com");
  await page.locator("[type='password']").fill("Scanning2000");
  await page.locator("#login").click();
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body h5").first().waitFor();
  await page.locator("button[routerlink*='myorders']").click();

  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    (route) =>
      route.continue({url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=1223948233312",
      }),
  );
  await page.getByRole("button",{name:'View'}).first().click();
});
