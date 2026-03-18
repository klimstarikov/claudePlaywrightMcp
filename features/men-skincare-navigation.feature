Feature: Men Skincare Navigation

  Scenario: Unregistered user navigates to Men Skincare section
    Given an unregistered user logs in
    When user hovers over 'Men' menu section from Home page
    And user clicks on 'Skincare' button from the expanded list
    Then user appears on the 'MEN' -> 'Skincare' page
    And user sees 4 items available in the section
