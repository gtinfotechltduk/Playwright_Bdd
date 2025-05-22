  
  @cookies 
  #afterLogin
  Feature: cookies 
  Scenario: Accept all cookies
    Given I am on the dashboard page
    When I click on the accept cookies button
    Then I should stay Dashboard page

  Scenario: Reject all cookies
    Given I am on the dashboard page
    When I click on the reject cookies button
    Then I should stay Dashboard page

  Scenario: View privacy policy
    Given I am on the dashboard page
    When I click on the View Policy link
    Then I should be redirected to the privacy policy page
    Then I should see the privacy policy content

#beforeLogin
 Scenario: Accept all cookies
    Given I am on the login page
    When I click on the accept cookies button
    Then I should stay on the login page

  Scenario: Reject all cookies
    Given I am on the login page
    When I click on the reject cookies button
    Then I should stay on the login page

  Scenario: View privacy policy
    Given I am on the login page
    When I click on the View Policy link
    Then I should be redirected to the privacy policy page
    Then I should see the privacy policy content