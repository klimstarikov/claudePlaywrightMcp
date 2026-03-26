Feature: Sales tag for products on sale

  Scenario: Non-logged-in user sees 'Sale' tag on product with strikethrough price on Home page
    Given a non-logged-in user is on the Home page at "https://automationteststore.com/"
    When the user scrolls down the Home page
    And a product with a strikethrough original price is visible in the featured products section
    Then that product displays a "Sale" tag
