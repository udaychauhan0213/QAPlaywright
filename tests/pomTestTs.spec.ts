import { test } from '@playwright/test';
import { customTest } from '../utilsTs/testDataFixture';
import { POManager } from '../POMTypeScript/POManager';
import testData from './utils/placeorderTestData.json';

for (const data of testData) {
  test(`Login Practice POM for: ${data.productName}`, async ({ page }) => {
    const poManager = new POManager(page);

    await poManager.loginPage.goTo();
    await poManager.loginPage.validLogin(data.username, data.password);

    await poManager.dashboardPage.searchProductAddCart(data.productName);
    await poManager.dashboardPage.navigateToCart();

    await poManager.getCartPage(data.productName).cartVisibilityTexts();
    await poManager.getCartPage(data.productName).cartCheckOut();

    const orderPage = poManager.getOrderCardPage(data.username);
    await orderPage.placeholderVisible();
    await orderPage.countrySelectionAndOrder();

    await poManager.orderThanksPage.orderLastPage();
  });
}

customTest('Login Practice POM with fixture data', async ({
  page,
  testDataForOrder,
}) => {
  const poManager = new POManager(page);

  await poManager.loginPage.goTo();
  await poManager.loginPage.validLogin(
    testDataForOrder.username,
    testDataForOrder.password,
  );

  await poManager.dashboardPage.searchProductAddCart(
    testDataForOrder.productName,
  );
  await poManager.dashboardPage.navigateToCart();

  const cartPage = poManager.getCartPage(testDataForOrder.productName);
  await cartPage.cartVisibilityTexts();
  await cartPage.cartCheckOut();
});