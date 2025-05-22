import { Page, expect } from '@playwright/test';


export class dashboardPage {
  constructor(private page: Page, private baseUrl: string) {}

  // Locators
  private acceptCokkiesButton = () => this.page.locator("button:has-text('Agree')");
  private rejectCookiesButton = () => this.page.locator("button:has-text('Disagree')");
  private viewCokkiesButton = () => this.page.locator("button:has-text('View policy')");
  

// Actions)
async cookies(): Promise<void> {
    await this.acceptCokkiesButton().click();
    await this.rejectCookiesButton().click();
    await this.viewCokkiesButton().click();
}

 async privacyPolicyIsVisible() {
    await this.page.waitForSelector('text=Privacy Policy', { state: 'visible' });
  }
}