import {expect, test} from '@playwright/test';
import {customTest} from '../utilsTs/testDataFixture';
import {POManager} from '../POMTypeScript/POManager';

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
