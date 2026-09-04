const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("./utils/apiUtils");
const loginPayload = {userEmail: "udaychauhan0213@gmail.com", userPassword: "Scanning2000",};
const orderPayload = {orders: [{ country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" }],};
const fakePayLoadOrders = { data: [], message: "No Orders" };
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
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", //* accept anything
    async (route) => {
      //itercepting the response
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePayLoadOrders); //converting JS object to JSON object because browser accept only that
      route.fulfill(
        {
        response,
        body,
      }
    );
    },
  );
  await page.getByRole("button", { name: "ORDERS" }).click();
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
  console.log(await page.locator(".mt-4").textContent());
});
