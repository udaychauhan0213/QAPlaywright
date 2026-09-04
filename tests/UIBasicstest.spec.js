const { test, expect } = require("@playwright/test"); //browsers running

test(`@Web First Playwright Test`, async ({ browser, page }) => {
  // 1test and test name and every code of playwright will run in function

  //chrome
  //    const context = await browser.newContext();
  //    const page = await context.newPage(); playwright will do these two steps by itself thinking he is not injecting anything inside

  const userName = page.locator("#username");
  const password = page.locator("[type='password']");
  const cardTitles = page.locator(".card-body a");
  page.route('**/*.css', (route)=> route.abort());
  await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/");
  //title of the page
  console.log(await page.title());
  //css, xpath
  await userName.fill("UdayChauhan");
  await password.fill("Uday");
  await page.locator("#signInBtn").click();
  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText("Incorrect");

  await userName.fill("");
  await password.fill("");
  await userName.fill("rahulshettyacademy");
  await password.fill("Learning@830$3mK2");
  const radio = page.locator(".radiotextsty");
  await radio.last().click();
  await page.locator("#okayBtn").click();
  await expect(radio.last()).toBeChecked();
  const dropdown = page.locator("select.form-control");
  await dropdown.selectOption("Consultant");
  const documentLink = page.locator("[href*='documents-request']");
  await expect(documentLink).toHaveAttribute("class", "blinkingText");
  await page.locator("#signInBtn").click();
  console.log(await cardTitles.first().textContent());
  console.log(await cardTitles.nth(0).textContent());
  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles);
});

test("Child Window", async ({ browser}) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator("#username");
  await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/");
  const documentLink = page.locator("[href*='documents-request']");
  const [newPage] = await Promise.all([
    context.waitForEvent("page"), //listen for any new page
    documentLink.click(), //new page opens
  ]);

  const text = await newPage.locator(".red").textContent();
  const arrayText = text.split("@");
  const email = arrayText[1].split(" ")[0];
  console.log(text);
  await userName.fill(email);
});
