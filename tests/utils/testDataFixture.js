// const { base } = require("@playwright/test");
const { test } = require("@playwright/test");

exports.customTest = test.extend({
  testDataForOrder: {
    username: "udaychauhan0213@gmail.com",
    password: "Scanning2000",
    productName: "ADIDAS ORIGINAL",
  },
});
