const {test, expect} = require('@playwright/test');

test('playwright special locators', async({browser, page})=>{

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc@1234");
    await page.getByRole("button", {name: 'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible(); //it will not fail it just returns boolean value

    //so to go beyond 5 second wrap the timout in visible step level
    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout: 10000}); //waits for 5 sec assertion
    await page.getByRole("link",{name:'Shop'}).click();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button",{name: 'Add'}).click();
});


test('playwright test level time out', async({browser, page})=>{

    test.setTimeout(60000);
    const slowExpect = expect.configure({timeout: 9000});
    page.setDefaultTimeout(9000); //action timout in test level
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc@1234");
    await page.getByRole("button", {name: 'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible(); 
    await slowExpect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();
    await page.getByRole("link",{name:'Shop'}).click();
    await expect(page.locator(".my-4").first()).toHaveText("Shop");
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button",{name: 'Add'}).click();
});