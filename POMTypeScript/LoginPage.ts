import {Locator, Page} from '@playwright/test';

export class LoginPage {
  page:Page;
  userName: Locator;
  password: Locator;
  signInButton: Locator;

  constructor(page: Page) {
    this.page = page; //since it's scope is local to this const inorder to use it outside of this constructor we do it this.page(same as all variable in here we created are class variable it will also work as them)
    this.userName = page.locator("#userEmail");
    this.password = page.locator("[type='password']");
    this.signInButton = page.locator("#login"); //hence it is a class variable(signInButton)
  }

  async goTo(){
    await this.page.goto("https://rahulshettyacademy.com/client");
  }

  async validLogin(username: string, password: string) {
    //when we call this method from our test file it will send these params
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.signInButton.click();
    await this.page.waitForLoadState("networkidle");
  }
}

module.exports = { LoginPage }; //exporting login page to test file
