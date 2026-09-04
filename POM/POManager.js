const { LoginPage } = require("./LoginPage");
const { DashboardPage } = require("./DashboardPage");
const { CartPage } = require("./CartPage");
const { OrderCardPage } = require("./OrderCardPage");
const { OrderThanksPage } = require("./OrderThanksPage");

class POManager {

    constructor(page) {
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

    getCartPage(productName) {
        return new CartPage(this.page, productName);
    }

    getOrderCardPage(username) {
        return new OrderCardPage(this.page, username);
    }

    getOrderThanksPage() {
        return this.orderThanksPage;
    }
}

module.exports = { POManager };