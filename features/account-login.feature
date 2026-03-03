Feature: Unregistered user is prompted to create an account

  Scenario: User opens home page
    Given user has not added any products to the cart
    When user hovers over Account link in the header
    And user accesses Login link in the dropdown menu
    Then user appears on the account page
    And user should "Register account" option unchecked
    And user should see "Login Name", "Password" fields empty
