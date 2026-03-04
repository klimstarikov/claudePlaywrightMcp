Feature: Hair Care category navigation

  Scenario: Unregistered user navigates to Hair Care section and sees subcategories
    Given an unregistered user is on the home page
    When user opens 'Hair Care' menu section from Home page
    Then user appears on the Hair Care page
    And 'Conditioner' category is shown
    And 'Shampoo' category is shown
