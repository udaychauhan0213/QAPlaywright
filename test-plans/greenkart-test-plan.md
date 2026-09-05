# GreenKart Grocery Application Test Plan

## Application Overview

GreenKart is a grocery shopping single-page application at https://rahulshettyacademy.com/seleniumPractise/#/. The primary workflow is browse or search products, adjust quantity, add items to the cart, review totals, apply a promo code, select a delivery country, accept terms, and place an order. The application also provides a Top Deals route with searchable, sortable, paginated deal data and delivery-date controls. Each scenario below assumes a fresh browser context and starts from the stated URL so scenarios remain independent.

## Test Scenarios

### 1. GreenKart Catalog And Purchase

**Seed:** `tests/seed.spec.ts`

#### 1.1. Search for a product and add the matching item to the cart

**File:** `tests/greenkart/search-and-add-product.spec.ts`

**Steps:**
  1. Start with a fresh browser context and navigate to https://rahulshettyacademy.com/seleniumPractise/#/.
    - expect: The GreenKart catalog loads successfully.
    - expect: The page title is "GreenKart - veg and fruits kart".
  2. Fill the "Search for Vegetables and Fruits" field with "Apple".
    - expect: Only the Apple product card remains visible.
    - expect: The visible product is named "Apple - 1 Kg" and shows price ₹ 72.
  3. Click the "ADD TO CART" button for "Apple - 1 Kg".
    - expect: The product is added to the cart.
    - expect: The cart indicator reflects one item.
  4. Open the Cart control in the header.
    - expect: The cart preview opens and contains Apple - 1 Kg.
    - expect: The preview offers a "PROCEED TO CHECKOUT" action.

#### 1.2. Adjust product quantity and verify cart calculations

**File:** `tests/greenkart/quantity-and-cart-total.spec.ts`

**Steps:**
  1. Start with a fresh browser context and navigate to the GreenKart catalog URL.
    - expect: The product catalog is visible.
  2. Locate the "Apple - 1 Kg" product and use its plus quantity control twice.
    - expect: The quantity changes from 1 to 3.
    - expect: The quantity control remains associated with the Apple product.
  3. Click the Apple product's "ADD TO CART" button, open the header cart, and proceed to checkout.
    - expect: The cart page opens at the cart route.
    - expect: The Apple row shows quantity 3.
    - expect: The line total equals the unit price multiplied by 3.
  4. Compare the displayed item count and total amount with the cart row values.
    - expect: The item count equals 3.
    - expect: The total amount is mathematically consistent with the displayed quantity and unit price.

#### 1.3. Apply valid and invalid promo codes

**File:** `tests/greenkart/promo-code-validation.spec.ts`

**Steps:**
  1. Start with a fresh browser context, add one Apple - 1 Kg item, open the cart preview, and proceed to the cart page.
    - expect: The cart page contains one Apple item and the initial discount is 0%.
  2. Enter "INVALID" in "Enter promo code" and click "Apply".
    - expect: The message "Invalid code ..!" is displayed.
    - expect: The discount remains 0%.
    - expect: The total after discount is unchanged.
  3. Replace the promo code with "rahulshettyacademy" and click "Apply".
    - expect: The message "Code applied ..!" is displayed.
    - expect: The discount changes to 10%.
    - expect: For a ₹72 item, the total after discount is displayed as ₹64.8.

#### 1.4. Place an order with country and terms validation

**File:** `tests/greenkart/place-order.spec.ts`

**Steps:**
  1. Start with a fresh browser context, add Apple - 1 Kg to the cart, and navigate to the cart page.
    - expect: The cart contains the selected item.
    - expect: The "Place Order" button is available.
  2. Click "Place Order" without selecting a country.
    - expect: The country step opens.
    - expect: A country dropdown is displayed with "Select" as the disabled initial option.
    - expect: An agreement checkbox and "Proceed" button are displayed.
  3. Select "India" from the country dropdown and click "Proceed" without checking the agreement checkbox.
    - expect: The order is not submitted.
    - expect: The country step remains visible or a required-agreement validation is shown.
  4. Check the agreement checkbox and click "Proceed".
    - expect: The order submission completes.
    - expect: The application returns to the GreenKart catalog route.
    - expect: The cart/order flow does not report a validation error.

#### 1.5. Search edge cases do not show unrelated products

**File:** `tests/greenkart/catalog-search-edge-cases.spec.ts`

**Steps:**
  1. Start with a fresh browser context and navigate to the GreenKart catalog URL.
    - expect: The full product catalog is initially available.
  2. Enter a string that does not match any product, such as "NotARealVegetable".
    - expect: No product card is visible.
    - expect: The page remains usable and does not navigate away or show an uncaught user-facing error.
  3. Clear the search field.
    - expect: The product catalog is restored.
  4. Enter a case variation such as "apple".
    - expect: Search behavior is consistent with the application contract: either Apple - 1 Kg is shown for case-insensitive search, or no result is shown consistently for case-sensitive search.
    - expect: No unrelated product is displayed as a match.

#### 1.6. Prevent accidental duplicate cart entries

**File:** `tests/greenkart/duplicate-add-to-cart.spec.ts`

**Steps:**
  1. Start with a fresh browser context and navigate to the GreenKart catalog URL.
    - expect: The catalog loads with an empty cart state.
  2. Click "ADD TO CART" for Apple - 1 Kg twice without changing the product quantity.
    - expect: The application follows one defined behavior consistently: either the cart quantity becomes 2 for one Apple row, or two Apple rows are shown.
    - expect: The cart count and cart totals match that behavior.
    - expect: No unrelated products are added.
  3. Open the cart page and inspect the Apple rows.
    - expect: The displayed quantity, row count, and total are internally consistent.

#### 1.7. Explore Top Deals search, pagination, sorting, and date controls

**File:** `tests/greenkart/top-deals.spec.ts`

**Steps:**
  1. Start with a fresh browser context and navigate to https://rahulshettyacademy.com/seleniumPractise/#/offers.
    - expect: The Top Deals page loads.
    - expect: A deals table, page-size selector, search field, pagination controls, sortable columns, and delivery-date controls are visible.
  2. Search for "Tomato" in the Top Deals search field.
    - expect: The table is filtered to matching deal data.
    - expect: The Tomato row shows price 37 and discount price 26.
  3. Clear the search and click the next pagination page.
    - expect: The table changes to the next page of results.
    - expect: The Previous control becomes enabled after leaving the first page.
  4. Click the "Veg/fruit name" column header to change its sort order.
    - expect: The table rows reorder according to the selected sort direction.
    - expect: The sorted-state announcement or visual state reflects the new ordering.
  5. Change the page size to another available value.
    - expect: The number of visible deal rows changes to match the selected page size, subject to the remaining record count.
  6. Use the delivery-date controls to enter a valid date.
    - expect: The date fields accept the valid date without corrupting the month, day, or year values.
