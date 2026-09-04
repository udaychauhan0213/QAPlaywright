Feature: Ecommerce Validation
 
  Scenario: Placing The Order
    Given A login to Ecommerce application with "udaychauhan0213@gmail.com" and "Scanning2000" 
    When Add "Zara Coat 3" to Cart
    Then Verify "Zara Coat 3" is displayed in the Cart
    When Enter valid details and Place the Order
    Then Verify order in present in the orderHistory

    