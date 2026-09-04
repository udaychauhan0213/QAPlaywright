const {test,expect} = require("@playwright/test");

test('More Validation', async({browser, page})=>{

   await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
//    await page.goto("https://www.google.com");
//    await page.goBack(); //rahulshetty
//    await page.goForward(); //google
await expect(page.locator("#displayed-text")).toBeVisible();
await page.locator("#hide-textbox").click();
await expect(page.locator("#displayed-text")).toBeHidden();
page.on('dialog', (dialog) => dialog.accept);
await page.locator("#confirmbtn").click();
await page.locator("#mousehover").hover();
const framesPage = page.frameLocator("#courses-iframe");
await framesPage.locator("li a[href*= 'lifetime-access']:visible").click(); //the locator is invisible so only select visble one
const text = await framesPage.locator(".text h2").textContent();
console.log(text.split(" ")[1]);

});

test('Screenshot Stuff', async({page})=>{

   
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
await expect(page.locator("#displayed-text")).toBeVisible();
await page.locator("#displayed-text").screenshot({path:'partialscreenshot.png'});
await page.locator("#hide-textbox").click();
await page.screenshot({path:'screenshot.png'}); 
await expect(page.locator("#displayed-text")).toBeHidden();

});

test.only('visual testing', async({page})=>{

   await page.goto("https://www.google.com");
   expect(await page.screenshot()).toMatchSnapshot('landing.png');
});