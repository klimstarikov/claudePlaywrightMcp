Feature: Password Reset Feature

  As a registered user
  I want to reset my password
  So that I can regain access to my account if I forget it

  # ============================================================================
  # P1 CRITICAL — Happy path scenarios and core validation
  # ============================================================================

  @priority-p1 @happy-path
  Scenario: Successful password reset with valid registered email
    Given a registered user with email "john.doe@example.com" and password "OldPassword123"
    When the user navigates to the password reset page
    And the user enters the registered email "john.doe@example.com"
    And the user clicks the "Send Reset Link" button
    Then the system sends a password reset link to "john.doe@example.com"
    And the user receives a confirmation message "Check your email for reset instructions"

  @priority-p1 @happy-path
  Scenario: User successfully sets a new password via reset link
    Given a registered user with email "jane.smith@example.com" has requested a password reset
    And the user has a valid password reset link
    When the user clicks the reset link in the email
    Then the user is directed to the password change page
    And the user can enter a new password

  @priority-p1 @happy-path
  Scenario: User successfully logs in with new password after reset
    Given a registered user with email "jane.smith@example.com" has reset their password to "NewPassword456"
    When the user navigates to the login page
    And the user enters email "jane.smith@example.com" and password "NewPassword456"
    And the user clicks the "Login" button
    Then the user is logged in successfully
    And the user is redirected to the account dashboard

  @priority-p1 @validation
  Scenario: Password must be at least 8 characters long
    Given a registered user with a valid password reset link
    When the user enters a new password "Short1" (7 characters)
    And the user clicks the "Change Password" button
    Then the system displays an error message "Password must be at least 8 characters long"
    And the password is not changed

  @priority-p1 @validation
  Scenario Outline: Password validation with various lengths
    Given a registered user with a valid password reset link
    When the user enters a new password "<password>" (with <length> characters)
    And the user clicks the "Change Password" button
    Then the system <result>

    Examples:
      | password          | length | result                                                      |
      | Pass1             | 7      | displays error "Password must be at least 8 characters long" |
      | Pass1234          | 8      | accepts the password and shows success                       |
      | Pass123456789     | 12     | accepts the password and shows success                       |

  # ============================================================================
  # P2 HIGH — Core error scenarios and security rules
  # ============================================================================

  @priority-p2 @negative @validation
  Scenario: Invalid email format is rejected
    Given a user is on the password reset page
    When the user enters an invalid email format "notanemail"
    And the user clicks the "Send Reset Link" button
    Then the system displays an error message "Please enter a valid email address"
    And no reset link is sent

  @priority-p2 @negative @validation
  Scenario Outline: Email validation with various formats
    Given a user is on the password reset page
    When the user enters the email "<email>"
    And the user clicks the "Send Reset Link" button
    Then the system <result>

    Examples:
      | email                | result                                                  |
      | user@domain         | displays error "Please enter a valid email address"     |
      | invalid.email       | displays error "Please enter a valid email address"     |
      | @example.com        | displays error "Please enter a valid email address"     |
      | user@example.com    | accepts the email for valid registered users            |
      | user+tag@example.co.uk | accepts the email for valid registered users            |

  @priority-p2 @negative @unregistered-user
  Scenario: Unregistered email does not receive reset link
    Given a user is on the password reset page
    When the user enters an unregistered email "no-such-user@example.com"
    And the user clicks the "Send Reset Link" button
    Then the system displays a message "If an account with this email exists, you will receive a reset link"
    And no password reset link is sent to "no-such-user@example.com"

  @priority-p2 @security @link-expiration
  Scenario: Reset link can be used only once
    Given a registered user has received a password reset link
    When the user clicks the reset link for the first time
    And the user enters a new password "NewPassword123"
    And the user clicks the "Change Password" button
    Then the password is changed successfully
    When the user tries to use the same reset link again
    Then the system displays an error message "Reset link has already been used"
    And the user is not allowed to change the password again

  @priority-p2 @security @link-expiration
  Scenario: Expired reset link cannot be used
    Given a registered user has received a password reset link that expired 25 hours ago
    When the user clicks the expired reset link
    Then the system displays an error message "This reset link has expired. Please request a new one."
    And the user is redirected to the password reset request page

  @priority-p2 @security @tampered-link
  Scenario: Tampered or invalid reset link is rejected
    Given a registered user has received a password reset link
    When the user attempts to use a tampered reset link with modified token
    Then the system displays an error message "Invalid or corrupted reset link"
    And the user is not allowed to change the password

  @priority-p2 @negative @weak-password
  Scenario: Password with only alphanumeric characters is valid
    Given a registered user with a valid password reset link
    When the user enters a new password "ValidPass123"
    And the user clicks the "Change Password" button
    Then the system accepts the password
    And the password is changed successfully

  # ============================================================================
  # P3 MEDIUM — Edge cases and unusual scenarios
  # ============================================================================

  @priority-p3 @edge @case-insensitivity
  Scenario: Email address is case-insensitive for reset request
    Given a registered user with email "John.Doe@Example.com"
    When the user navigates to the password reset page
    And the user enters the email "john.doe@example.com" (lowercase)
    And the user clicks the "Send Reset Link" button
    Then the system recognizes the user and sends a reset link
    And the email is sent to the registered address "John.Doe@Example.com"

  @priority-p3 @edge @special-characters
  Scenario: New password can contain special characters
    Given a registered user with a valid password reset link
    When the user enters a new password "Pass@123!word"
    And the user clicks the "Change Password" button
    Then the system accepts the password
    And the password is changed successfully with special characters preserved

  @priority-p3 @edge @long-password
  Scenario: Very long password is accepted
    Given a registered user with a valid password reset link
    When the user enters a new password that is 128 characters long
    And the user clicks the "Change Password" button
    Then the system accepts the password
    And the password is changed successfully

  @priority-p3 @edge @spaces
  Scenario: Password with whitespace is handled correctly
    Given a registered user with a valid password reset link
    When the user enters a new password "Pass word123"
    And the user clicks the "Change Password" button
    Then the system accepts the password with whitespace
    And the password is changed successfully

  @priority-p3 @edge @multiple-requests
  Scenario: Multiple password reset requests invalidate previous links
    Given a registered user with email "user@example.com"
    When the user requests the first password reset link
    And the system sends reset link #1
    When the user requests a second password reset link
    And the system sends reset link #2
    Then reset link #1 becomes invalid
    And only reset link #2 can be used for password change

  @priority-p3 @edge @unicode
  Scenario: Password with unicode characters is accepted
    Given a registered user with a valid password reset link
    When the user enters a new password "Pässwörd123"
    And the user clicks the "Change Password" button
    Then the system accepts the password with unicode characters
    And the password is changed successfully

  @priority-p3 @edge @sql-injection
  Scenario: Password containing SQL-like characters is safely handled
    Given a registered user with a valid password reset link
    When the user enters a new password "Pass';DROP--123"
    And the user clicks the "Change Password" button
    Then the system accepts the password safely without SQL injection risks
    And the password is changed successfully

  @priority-p3 @edge @rate-limiting
  Scenario: Excessive password reset requests are rate-limited
    Given a registered user with email "user@example.com"
    When the user requests password reset links 6 times within 1 minute
    Then the system allows the first 5 requests
    And the 6th request is rejected with message "Too many reset requests. Please try again later."

  # ============================================================================
  # P4 LOW — Additional validation and cosmetic scenarios
  # ============================================================================

  @priority-p4 @cosmetic @ui
  Scenario: Reset page displays helpful instructions
    Given a user navigates to the password reset page
    Then the user sees clear instructions "Enter your registered email address"
    And the user sees a helpful note "You will receive an email with a link to reset your password"

  @priority-p4 @validation @email-normalization
    Scenario: Email with leading/trailing whitespace is trimmed
    Given a user is on the password reset page
    When the user enters the email " john.doe@example.com " (with spaces)
    And the user clicks the "Send Reset Link" button
    Then the system trims the whitespace and recognizes the user
    And a reset link is sent to "john.doe@example.com"

  @priority-p4 @edge @confirmation-message
  Scenario: User receives confirmation after reset message
    Given a registered user has successfully reset their password
    When the user completes the password reset
    Then the system displays confirmation "Your password has been changed successfully"
    And the user is redirected to the login page

  @priority-p4 @security @session-termination
  Scenario: Old sessions are terminated after password reset
    Given a registered user is logged in with browser session #1
    And the user logs in again with browser session #2
    When the user initiates a password reset from a new browser session #3
    And completes the password reset
    Then sessions #1 and #2 are terminated
    And the user must log in again with the new password
