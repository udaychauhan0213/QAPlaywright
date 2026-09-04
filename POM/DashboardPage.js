class DashboardPage {
  constructor(page) {
    this.page = page;
    this.products = page.locator(".card-body");
    this.productsText = page.locator(".card-body b");
    this.cart = page.locator("[routerlink*='cart']");
  }

  async searchProductAddCart(productName) {
    const allTitle = await this.productsText.allTextContents();
    console.log(allTitle);
    const count = await this.products.count();
    for (let i = 0; i < count; ++i) {
      if (
        (await this.products.nth(i).locator("b").textContent()) === productName) {
        await this.products
          .nth(i)
          .getByRole("button", { name: "Add To Cart" })
          .click();
        break;
      }
    }
  }
  async navigateToCart() {
    await this.cart.click();
  }
}
module.exports = { DashboardPage };
