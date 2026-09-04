const { Given, When, Then } = require("@cucumber/cucumber");
const { POManager } = require("../../POManager");
const { test, expect, playwright } = require("@playwright/test");
Given("A login to Ecommerce application with {username} and {password}",async (username, password) => {

  
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password);
  },
);
