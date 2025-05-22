import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { LoginPage } from '../pageObjects/loginPage';
import { Page, expect } from '@playwright/test';
import * as users from '../testData/users.json';

let loginPage: LoginPage;
let page: Page; // Declare the page variable

Given('I am on the login page', async function (this: CustomWorld) {
  const page = this.page!;
  const baseUrl = process.env.BASE_URL || 'https://automation.loop.org.uk/login';
  const loginPage = new LoginPage(page, baseUrl);

  await loginPage.navigate();

});

When('I login with username {string} and password {string}', async function (this: CustomWorld, username: string, password: string) {
  const page = this.page!;
  const baseUrl = process.env.BASE_URL || 'https://automation.loop.org.uk/login';
  loginPage = new LoginPage(page, baseUrl);

  await loginPage.login(users.validUser.username, users.validUser.password);
  await this.page!.waitForTimeout(10000);
});


When('I login with invalid username {string} and password {string}', async function (this: CustomWorld, username: string, password: string) {
  const page = this.page!;
  const baseUrl = process.env.BASE_URL || 'https://automation.loop.org.uk/login';
  loginPage = new LoginPage(page, baseUrl);
  await loginPage.login(users.invalidUser.username, users.invalidUser.password);
  await this.page!.waitForTimeout(10000);
});

Then('I should see Dashboard page', async function () {
  await loginPage.dashboardIsVisible();
});

// This step is for the error message

Then('I should see an error message {string}', async function (expectedErrorMessage: string) {
  // Wait for the error message element to be visible
  await loginPage.errorMessage().waitFor({ state: 'visible', timeout: 1000 });

  // Retrieve the actual error message text
  const actualErrorMessage = await loginPage.errorMessage().innerText();

  // Assert the error message
  expect(actualErrorMessage).toBe(expectedErrorMessage);
});

// Example of initializing the page object (this depends on your test setup)
When('I initialize the page object', async function () {
  page = this.page; // Assuming `this.page` is set up in your test context
});

// Step definitions

When('I click on the logout button', async function (this: CustomWorld) {
  const page = this.page; // Retrieve the page object from the test context
  if (!page) {
    throw new Error('Page object is undefined. Ensure it is initialized in the test context.');
  }
  await page.locator('button:has(img[alt="Test Admin User"])').click();
  await page.getByRole('button', { name: 'Log Out' }).click();
});

Then('I should see the login page', async function (this: CustomWorld) {
  const page = this.page;
  if (!page) throw new Error('Page object is undefined.');
  await this.page!.waitForTimeout(10000);
  await expect(page).toHaveURL(/\/login/);
});
