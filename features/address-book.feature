Feature: Address Book verification

  Background:
    Given user Karl Davies is logged in with username "karldavies" and password "password1"

  Scenario: User verifies address book entry on My Account and Address Book pages
    When user navigates to the Account page
    Then user sees "Manage address book" section with a counter showing '1'

    When user clicks "Manage address book" button
    Then user lands on the Address Book page
    And the address entry is visible and matches:
      | Field          | Value           |
      | Name           | Karl Davies     |
      | Street         | Lepsa 45        |
      | City/Postcode  | Warszawa 02-758 |
      | Region         | Mazowieckie     |
      | Country        | Poland          |
