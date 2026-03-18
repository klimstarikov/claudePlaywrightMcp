Feature: Books category navigation
  Scenario: Unregistered user navigates to Books section and sees subcategories
    Given an unregistered user is on the home page
    When user opens 'Books' menu section from Home page
    Then user appears on the Books page
    And 'Audio CD' and 'Paperback' categories are shown
