// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",
  // testMatch:"practice.spec.js",
  timeout: 30000,
  expect: {
    timeout: 50000,
  },
  reporter: 'html',
  use: {
    browserName: "chromium",
    headless: false,
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,
    screenshot:'on',
    trace: 'on' //what happened in each step
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    // trace: 'on-first-retry',
  },
});
