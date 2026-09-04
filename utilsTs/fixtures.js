const {request} = require("@playwright/test");
const base = require("@playwright/test");
const {APIUtils} = require('./apiUtils');
const loginPayload = {userEmail: "udaychauhan0213@gmail.com", userPassword: "Scanning2000",};
const orderPayload = {orders: [{ country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" }],};

exports.customTest = base.test.extend({
  authenticatedPage: async ({browser}, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("udaychauhan0213@gmail.com");
    await page.locator("[type='password']").fill("Scanning2000");
    await page.locator("#login").click();
    await page.waitForLoadState("networkidle");
    await use(page); //now this page is carried to that authenticatedPage fixture
    await context.close();
  },
  createOrder : async({},use) =>{
      const apiContext = await request.newContext();
      const apiUtils = new APIUtils(apiContext, loginPayload);
      const response = await apiUtils.createOrder(orderPayload);
      await use(response);
      await apiContext.dispose();
  },
  testDataForOrder : {
    productName: 'ADIDAS ORIGINAL'
  }
});
