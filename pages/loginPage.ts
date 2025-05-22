import { Page, expect } from '@playwright/test';


export class LoginPage {
  constructor(private page: Page, private baseUrl: string) { }

  // Locators
  private emailTextbox = () => this.page.locator("#email");
  private passwordTextbox = () => this.page.locator("#password");
  private loginButton = () => this.page.getByText("Login", { exact: true });
  private DashboardHeading = () => this.page.getByRole('heading', { name: 'Dashboard' });
  public errorMessage = () => this.page.locator('[data-test="text-error-message"] p');

  // Navigation
  async navigate() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  // Actions
  async login(email: string, password: string): Promise<void> {
    await this.emailTextbox().fill(email);
    await this.passwordTextbox().fill(password);
    await this.loginButton().click();
  }

  // validations
  async dashboardIsVisible(): Promise<void> {
    return await expect(this.DashboardHeading()).toBeVisible();
  }

  async verifyErrorMessage(): Promise<void> {
    return await expect(this.errorMessage()).toBeVisible();
  }
}
