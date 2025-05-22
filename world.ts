import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from 'playwright';

export interface CustomWorld {
  page?: Page; // Add the page property
}

export class CustomWorld extends World {
  baseUrl: string = 'https://automation.loop.org.uk'; // Replace with your actual base URL
  browser!: Browser;
  context!: BrowserContext;
  page?: Page;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async init() {
    this.browser = await chromium.launch({ headless: true });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  async close() {
    await this.browser?.close();
  }
}

setWorldConstructor(CustomWorld);
