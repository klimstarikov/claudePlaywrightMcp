Feature: Fragrance category navigation from Home page

  Scenario: Unregistered user navigates to Fragrance section
    Given an unregistered user is on the home page
    When user opens 'Fragrance' menu section
    Then user appears on the Fragrance page
    And 'Men' category is shown
    And 'Women' category is shown
