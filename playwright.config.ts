import { defineConfig, devices } from "@playwright/test";

// version 2.0
let environments = ["staging", "qa", "template", "automation"];
let environment = environments[3];
let TESTOMATIO = "tstmt_R1POvAk5jyJSg7BBvvDPgRbz78yGW0QFDA1714036683";

export default defineConfig({
  use: {
    baseURL: `https://automation.loop.org.uk`,
    locale: "en-GB",
    testIdAttribute: "data-testid",
    ignoreHTTPSErrors: true,
    acceptDownloads: true,
    video: "retain-on-failure",
  },

  fullyParallel: true,
  workers: 4,
  maxFailures: 100,

  reporter: [
    ["./reporter.ts"],
    ["dot"],
    [
      "html",
      {
        outputFolder: "reports/",
        open: "never",
      },
    ],
    [
      "./node_modules/@testomatio/reporter/lib/adapter/playwright.js",
      {
        apiKey: process.env.TESTOMATIO,
      },
    ],
  ],

  testDir: "./tests/tests_playwright",

  /* Configure projects for major browsers */
  projects: [
    { name: "setup", testMatch: /.*\.setup\.ts/ },
    {
      name: "chrome",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chrome",
      },
      fullyParallel: true,
      dependencies: ["setup"],
    },

    {
      name: "novaSetup",
      testMatch: /.*\.novaSetup\.ts/,
      use: {
        baseURL: `https://${environment}-nova-cm.sypro.co.uk/cm-support-nova/`,
      },
    },
    {
      name: "nova",
      testMatch: /.*\.nova\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        channel: "chrome",
        baseURL: `https://${environment}-nova-cm.sypro.co.uk/cm-support-nova/`,
      },
      fullyParallel: true,
      dependencies: ["novaSetup"],
    },
  ],
});
