import { Before, After } from '@cucumber/cucumber';
import { CustomWorld } from './world';
import { setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from 'playwright';

setDefaultTimeout(30 * 1000); // sets timeout to 30 seconds


Before(async function (this: CustomWorld) {
  await this.init(); // Initialize the browser, context, and page
});

After(async function (this: CustomWorld) {
  await this.close();
});

