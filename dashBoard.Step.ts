import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { LoginPage } from '../pageObjects/loginPage';
import { Page, expect } from '@playwright/test';
import * as users from '../testData/users.json';
import { dashboardPage } from '../pageObjects/dashBoard';
import { ac } from '@faker-js/faker/dist/airline-BUL6NtOJ';

Given('I am on the dashboard page', async function (this: CustomWorld) {
  const page = this.page!;
  const baseUrl = process.env.BASE_URL || 'https://automation.loop.org.uk/login';
  const loginPage = new LoginPage(page, baseUrl);
  await loginPage.navigate();
  await loginPage.login(users.validUser.username, users.validUser.password);
  await loginPage.dashboardIsVisible();
});

When('I click on the accept cookies button',async function (this: CustomWorld) {
  const page = this.page!;
  await page.getByRole('button', { name: 'Agree', exact: true }).click();
    await page.waitForTimeout(10000);
 });

 When('I click on the reject cookies button',async function (this: CustomWorld) {
  const page = this.page!;
    await page.getByRole('button', { name: 'Disagree', exact: true }).click();
    await page.waitForTimeout(10000);
 });

When('I click on the View Policy link', async function (this: CustomWorld) {
    const page = this.page!;
    await page.getByRole('link', { name: 'View Policy', exact: true }).click();
    await page.waitForTimeout(10000);
});

Then('I should be redirected to the privacy policy page', async function (this: CustomWorld) {
  const page = this.page!;
  const expectedUrl = 'https://automation.loop.org.uk/cookie-policy';
  const currentUrl = page.url();
  expect(currentUrl).toContain(expectedUrl);
  await page.waitForTimeout(10000);
  const baseUrl = process.env.BASE_URL || 'https://automation.loop.org.uk/login';
  const privacyPolicyPage = new dashboardPage(page, baseUrl);
  await privacyPolicyPage.privacyPolicyIsVisible();
});

Then('I should stay Dashboard page', async function (this: CustomWorld) {
  const page = this.page!;
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});

Then('I should stay on the login page', async function (this: CustomWorld) {
  const page = this.page!;
  const expectedUrl = process.env.BASE_URL || 'https://automation.loop.org.uk/login';
  expect(page.url()).toBe(expectedUrl);
});

Then('I should see the privacy policy content', async function (this: CustomWorld) {
  const page = this.page!;
  await expect(page.locator('text=Privacy Policy')).toBeVisible();
});