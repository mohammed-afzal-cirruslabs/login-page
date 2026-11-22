// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://127.0.0.1:8080',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    command: 'cd /workspaces/6ab2527861adff59c296dfb5_cohort_6b02088034cbe07656269307/login-page && python3 -m http.server 8080',
    url: 'http://127.0.0.1:8080',
    cwd: '/workspaces/6ab2527861adff59c296dfb5_cohort_6b02088034cbe07656269307/login-page',
    reuseExistingServer: true,
  },
});
