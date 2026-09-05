import { Page } from '@playwright/test';
import { CartPage } from './CartPage';
import { DashboardPage } from './DashboardPage';
import { LoginPage } from './LoginPage';
import { OrderCardPage } from './OrderCardPage';
import { OrderThanksPage } from './OrderThanksPage';

export class POManager {
  readonly loginPage: LoginPage;
  readonly dashboardPage: DashboardPage;
  readonly orderThanksPage: OrderThanksPage;

  constructor(private readonly page: Page) {
    this.loginPage = new LoginPage(page);
    this.dashboardPage = new DashboardPage(page);
    this.orderThanksPage = new OrderThanksPage(page);
  }

  getCartPage(productName: string): CartPage {
    return new CartPage(this.page, productName);
  }

  getOrderCardPage(username: string): OrderCardPage {
    return new OrderCardPage(this.page, username);
  }
}