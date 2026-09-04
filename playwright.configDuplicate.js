// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",
  retries: 1,
  workers: 1,
  // testMatch:"practice.spec.js",
  timeout: 30000,
  expect: {
    timeout: 50000,
  },
  reporter: "html",
  projects: [
    {
      name: "Firefox Execution",
      use: {
        browserName: "firefox",
        headless: true,
        actionTimeout: 10 * 1000,
        navigationTimeout: 30 * 1000,
        screenshot: "on",
        trace: "on",
        ignoreHTTPSErrors:true,
        video:'on-first-retry'
      },
    },
    {
      name: "Chromium Execution",
      use: {
        browserName: "chromium",
        headless: false,
        actionTimeout: 10 * 1000,
        navigationTimeout: 30 * 1000,
        screenshot: "on",
        trace: "on",
        // viewport: {width:720, height:720},
        ...devices['iPad (gen 11)'],

      },
    },
  ],
});
