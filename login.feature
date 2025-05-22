Feature: Login functionality

  Scenario: Successful login
    Given I am on the login page
    When I login with username "" and password ""
    Then I should see Dashboard page

  Scenario: Unsuccessful login
    Given I am on the login page
    When I login with invalid username "" and password ""
    Then I should see an error message "Something went wrong, please try again later."

  Scenario:  Logout successfully
    Given I am on the login page
    When I login with username "" and password ""
    Then I should see Dashboard page
    When I click on the logout button
    Then I should see the login page