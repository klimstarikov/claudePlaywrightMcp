Feature: Home page sections visibility

  Scenario: Not logged in user sees all main sections on the home page
    Given not logged in user navigates to the home page
    When user observes the home page
    Then user sees 'Featured', 'Latest Products', 'Bestsellers', 'Specials', 'Brands Scrolling List' sections
