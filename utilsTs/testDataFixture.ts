// const { base } = require("@playwright/test");
// const { test } = require("@playwright/test");
import {test as baseTest} from '@playwright/test';

interface TestDataForOrder{
  username: string,
  password: string,
  productName: string
}

export const customTest = baseTest.extend<{testDataForOrder: TestDataForOrder}>({
  testDataForOrder: {
    username: "udaychauhan0213@gmail.com",
    password: "Scanning2000",
    productName: "ADIDAS ORIGINAL",
  },
});
