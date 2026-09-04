const { test, expect, playwright } = require("@playwright/test");
const { POManager } = require("../../POManager");
const { Before, After} = require("@cucumber/cucumber");

Before(async ()=>{
    const browser = await playwright.chromium.launch({headless: false});
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
});

After(async ()=>{
    // return this.driver.quit();
    console.log("Im last to executed");
})