// const { LoginPage } = require("./LoginPage");
// const { DashboardPage } = require("./DashboardPage");
// const { CartPage } = require("./CartPage");
// const { OrderCardPage } = require("./OrderCardPage");
// const { OrderThanksPage } = require("./OrderThanksPage");
import {LoginPage} from './LoginPage';
import {DashboardPage} from './DashboardPage';
import {CartPage} from './CartPage';
import {OrderCardPage} from './OrderCardPage';
import {OrderThanksPage} from './OrderThanksPage';
import { Page } from 'playwright';

export class POManager {

    page: Page;
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    orderThanksPage: OrderThanksPage;
    
    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.orderThanksPage = new OrderThanksPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getCartPage(productName: string) {
        return new CartPage(this.page, productName);
    }

    getOrderCardPage(username: string) {
        return new OrderCardPage(this.page, username);
    }

    getOrderThanksPage() {
        return this.orderThanksPage;
    }
}

module.exports = { POManager };