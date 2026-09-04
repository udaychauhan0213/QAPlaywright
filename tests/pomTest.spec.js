const { test } = require("@playwright/test");
const { customTest } = require("./utils/testDataFixture");
const { POManager } = require("../POM/POManager");

const dataset = JSON.parse(JSON.stringify(require("./utils/placeorderTestData.json"))); //converting into string and then to object

for(const data of dataset){
test(`Login Practice POM for: ${data.productName}`, async ({ page }) => {

    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage(data.productName);
    await cartPage.cartVisibilityTexts();
    await cartPage.cartCheckOut();

    const orderCardPage = poManager.getOrderCardPage(data.username);
    await orderCardPage.placeholderVisible();
    await orderCardPage.countrySelectionAndOrder();

    const orderThanksPage = poManager.getOrderThanksPage();
    await orderThanksPage.orderLastPage();
})};
//just testing

customTest.only(`Login Practice POM`, async ({ page,testDataForOrder }) => {

    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(testDataForOrder.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage(testDataForOrder.productName);
    await cartPage.cartVisibilityTexts();
    await cartPage.cartCheckOut();
});