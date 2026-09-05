import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;
  private readonly userName: Locator;
  private readonly password: Locator;
  private readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userName = page.locator('#userEmail');
    this.password = page.locator('[type="password"]');
    this.signInButton = page.locator('#login');
  }

  async goTo(): Promise<void> {
    await this.page.goto('https://rahulshettyacademy.com/client');
    await expect(this.userName).toBeVisible();
  }

  async validLogin(username: string, password: string): Promise<void> {
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.signInButton.click();

    await expect(this.page.locator('.card-body').first()).toBeVisible();
  }
}