import { test, expect } from '@playwright/test';

test.describe('Integrated Login & Contact Page', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // Page Load Tests
  test.describe('Page Load', () => {
    test('should load the page successfully', async ({ page }) => {
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveTitle(/Login & Contact/);
    });

    test('should have no console errors', async ({ page }) => {
      const errors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      await page.waitForLoadState('networkidle');
      expect(errors).toHaveLength(0);
    });

    test('should load all resources successfully', async ({ page }) => {
      const failedRequests = [];
      page.on('requestfailed', request => {
        failedRequests.push(request.url());
      });
      await page.waitForLoadState('networkidle');
      expect(failedRequests).toHaveLength(0);
    });
  });

  // SSO Login Section Tests
  test.describe('SSO Login Section', () => {
    test('should display SSO login button', async ({ page }) => {
      const ssoBtn = page.locator('#ssoLoginBtn');
      await expect(ssoBtn).toBeVisible();
      await expect(ssoBtn).toHaveText(/Login with SSO/);
    });

    test('should have SSO button enabled', async ({ page }) => {
      const ssoBtn = page.locator('#ssoLoginBtn');
      await expect(ssoBtn).toBeEnabled();
    });

    test('should trigger SSO login on button click', async ({ page }) => {
      const ssoBtn = page.locator('#ssoLoginBtn');
      await ssoBtn.click();
      
      // Wait for success message to have the 'show' class (which makes it visible)
      // SSO login has a 500ms delay before showing the message
      const successMsg = page.locator('#ssoSuccessMessage.show');
      await expect(successMsg).toBeVisible({ timeout: 3000 });
      await expect(successMsg).toHaveText(/Successfully logged in via SSO/);
    });

    test('should initialize SSO module', async ({ page }) => {
      const ssoAvailable = await page.evaluate(() => {
        return typeof window.SSO !== 'undefined';
      });
      expect(ssoAvailable).toBe(true);
    });

    test('should have SSO.init method', async ({ page }) => {
      const hasInit = await page.evaluate(() => {
        return typeof window.SSO.init === 'function';
      });
      expect(hasInit).toBe(true);
    });

    test('should have SSO.login method', async ({ page }) => {
      const hasLogin = await page.evaluate(() => {
        return typeof window.SSO.login === 'function';
      });
      expect(hasLogin).toBe(true);
    });

    test('should log SSO initialization', async ({ page, context }) => {
      const logs = [];
      // Create a new page to capture logs from the start
      const newPage = await context.newPage();
      newPage.on('console', msg => {
        if (msg.type() === 'log') {
          logs.push(msg.text());
        }
      });
      await newPage.goto('/', { waitUntil: 'domcontentloaded' });
      await newPage.waitForLoadState('networkidle');
      // Give a small buffer for all console logs to be captured
      await newPage.waitForTimeout(100);
      expect(logs.some(log => log.includes('SSO module initialized'))).toBe(true);
      await newPage.close();
    });

    test('should hide SSO success message after timeout', async ({ page }) => {
      const ssoBtn = page.locator('#ssoLoginBtn');
      await ssoBtn.click();
      
      // First verify the message appears with .show class
      // SSO login has a 500ms delay before showing the message
      const successMsgShow = page.locator('#ssoSuccessMessage.show');
      await expect(successMsgShow).toBeVisible({ timeout: 3000 });
      
      // Wait for message to disappear (5 seconds + buffer)
      await page.waitForTimeout(5500);
      
      // Check that the .show class is removed (element no longer has .show)
      const successMsg = page.locator('#ssoSuccessMessage');
      await expect(successMsg).not.toHaveClass(/show/);
    });
  });

  // Traditional Login Form Tests
  test.describe('Traditional Login Form', () => {
    test('should display email input field', async ({ page }) => {
      const emailInput = page.locator('#email');
      await expect(emailInput).toBeVisible();
    });

    test('should display password input field', async ({ page }) => {
      const passwordInput = page.locator('#password');
      await expect(passwordInput).toBeVisible();
    });

    test('should display login submit button', async ({ page }) => {
      const submitBtn = page.locator('#loginForm button[type="submit"]');
      await expect(submitBtn).toBeVisible();
      await expect(submitBtn).toHaveText(/Login/);
    });

    test('should have email field with correct type', async ({ page }) => {
      const emailInput = page.locator('#email');
      await expect(emailInput).toHaveAttribute('type', 'email');
    });

    test('should have password field with correct type', async ({ page }) => {
      const passwordInput = page.locator('#password');
      await expect(passwordInput).toHaveAttribute('type', 'password');
    });

    test('should have email field marked as required', async ({ page }) => {
      const emailInput = page.locator('#email');
      await expect(emailInput).toHaveAttribute('required');
    });

    test('should have password field marked as required', async ({ page }) => {
      const passwordInput = page.locator('#password');
      await expect(passwordInput).toHaveAttribute('required');
    });

    test('should display "or" divider between SSO and form', async ({ page }) => {
      const divider = page.locator('.divider');
      await expect(divider).toBeVisible();
      await expect(divider).toContainText('or');
    });

    test('should accept input in email field', async ({ page }) => {
      const emailInput = page.locator('#email');
      await emailInput.fill('test@example.com');
      await expect(emailInput).toHaveValue('test@example.com');
    });

    test('should accept input in password field', async ({ page }) => {
      const passwordInput = page.locator('#password');
      await passwordInput.fill('password123');
      await expect(passwordInput).toHaveValue('password123');
    });

    test('should submit login form with valid data', async ({ page }) => {
      page.on('dialog', dialog => dialog.accept());
      
      await page.locator('#email').fill('test@example.com');
      await page.locator('#password').fill('password123');
      await page.locator('#loginForm button[type="submit"]').click();
      
      // Form should be reset after submission
      await expect(page.locator('#email')).toHaveValue('');
      await expect(page.locator('#password')).toHaveValue('');
    });

    test('should prevent submission with empty fields', async ({ page }) => {
      const submitBtn = page.locator('#loginForm button[type="submit"]');
      await submitBtn.click();
      
      // HTML5 validation should prevent submission
      const emailInput = page.locator('#email');
      const isInvalid = await emailInput.evaluate(el => !el.validity.valid);
      expect(isInvalid).toBe(true);
    });
  });

  // Contact Form Section Tests
  test.describe('Contact Form Section', () => {
    test('should display contact form heading', async ({ page }) => {
      const heading = page.locator('.form-card.section:nth-child(2) h1');
      await expect(heading).toBeVisible();
      await expect(heading).toHaveText('Contact Us');
    });

    test('should display name input field', async ({ page }) => {
      const nameInput = page.locator('#contactName');
      await expect(nameInput).toBeVisible();
    });

    test('should display email input field', async ({ page }) => {
      const emailInput = page.locator('#contactEmail');
      await expect(emailInput).toBeVisible();
    });

    test('should display subject input field', async ({ page }) => {
      const subjectInput = page.locator('#subject');
      await expect(subjectInput).toBeVisible();
    });

    test('should display message textarea', async ({ page }) => {
      const messageInput = page.locator('#message');
      await expect(messageInput).toBeVisible();
    });

    test('should display contact submit button', async ({ page }) => {
      const submitBtn = page.locator('#contactForm button[type="submit"]');
      await expect(submitBtn).toBeVisible();
      await expect(submitBtn).toHaveText(/Submit/);
    });

    test('should have all contact fields marked as required', async ({ page }) => {
      await expect(page.locator('#contactName')).toHaveAttribute('required');
      await expect(page.locator('#contactEmail')).toHaveAttribute('required');
      await expect(page.locator('#subject')).toHaveAttribute('required');
      await expect(page.locator('#message')).toHaveAttribute('required');
    });

    test('should accept input in name field', async ({ page }) => {
      const nameInput = page.locator('#contactName');
      await nameInput.fill('John Doe');
      await expect(nameInput).toHaveValue('John Doe');
    });

    test('should accept input in contact email field', async ({ page }) => {
      const emailInput = page.locator('#contactEmail');
      await emailInput.fill('john@example.com');
      await expect(emailInput).toHaveValue('john@example.com');
    });

    test('should accept input in subject field', async ({ page }) => {
      const subjectInput = page.locator('#subject');
      await subjectInput.fill('Test Subject');
      await expect(subjectInput).toHaveValue('Test Subject');
    });

    test('should accept input in message field', async ({ page }) => {
      const messageInput = page.locator('#message');
      await messageInput.fill('This is a test message');
      await expect(messageInput).toHaveValue('This is a test message');
    });

    test('should submit contact form with valid data', async ({ page }) => {
      await page.locator('#contactName').fill('John Doe');
      await page.locator('#contactEmail').fill('john@example.com');
      await page.locator('#subject').fill('Test Subject');
      await page.locator('#message').fill('This is a test message');
      
      await page.locator('#contactForm button[type="submit"]').click();
      
      // Success message should appear with 'show' class
      const successMsg = page.locator('#contactSuccessMessage.show');
      await expect(successMsg).toBeVisible({ timeout: 3000 });
      await expect(successMsg).toContainText(/Thank you for your message/);
    });

    test('should reset contact form after submission', async ({ page }) => {
      await page.locator('#contactName').fill('John Doe');
      await page.locator('#contactEmail').fill('john@example.com');
      await page.locator('#subject').fill('Test Subject');
      await page.locator('#message').fill('This is a test message');
      
      await page.locator('#contactForm button[type="submit"]').click();
      
      // Wait for success message with 'show' class
      await expect(page.locator('#contactSuccessMessage.show')).toBeVisible({ timeout: 3000 });
      
      // Form should be reset
      await expect(page.locator('#contactName')).toHaveValue('');
      await expect(page.locator('#contactEmail')).toHaveValue('');
      await expect(page.locator('#subject')).toHaveValue('');
      await expect(page.locator('#message')).toHaveValue('');
    });

    test('should prevent contact form submission with empty fields', async ({ page }) => {
      const submitBtn = page.locator('#contactForm button[type="submit"]');
      await submitBtn.click();
      
      // HTML5 validation should prevent submission
      const nameInput = page.locator('#contactName');
      const isInvalid = await nameInput.evaluate(el => !el.validity.valid);
      expect(isInvalid).toBe(true);
    });

    test('should hide contact success message after timeout', async ({ page }) => {
      await page.locator('#contactName').fill('John Doe');
      await page.locator('#contactEmail').fill('john@example.com');
      await page.locator('#subject').fill('Test Subject');
      await page.locator('#message').fill('This is a test message');
      
      await page.locator('#contactForm button[type="submit"]').click();
      
      // First verify the message appears with .show class
      const successMsgShow = page.locator('#contactSuccessMessage.show');
      await expect(successMsgShow).toBeVisible({ timeout: 3000 });
      
      // Wait for message to disappear (5 seconds + buffer)
      await page.waitForTimeout(5500);
      
      // Check that the .show class is removed (element no longer has .show)
      const successMsg = page.locator('#contactSuccessMessage');
      await expect(successMsg).not.toHaveClass(/show/);
    });
  });

  // Layout and Styling Tests
  test.describe('Layout and Styling', () => {
    test('should have two separate sections', async ({ page }) => {
      const sections = page.locator('.form-card.section');
      await expect(sections).toHaveCount(2);
    });

    test('should have visual separation between sections', async ({ page }) => {
      const firstSection = page.locator('.form-card.section').first();
      const borderTop = await firstSection.evaluate(el => 
        window.getComputedStyle(el).borderTopWidth
      );
      expect(borderTop).not.toBe('0px');
    });

    test('should load styles.css', async ({ page }) => {
      const styleSheets = await page.evaluate(() => {
        return Array.from(document.styleSheets).map(sheet => sheet.href);
      });
      expect(styleSheets.some(href => href && href.includes('styles.css'))).toBe(true);
    });

    test('should have proper container max-width', async ({ page }) => {
      const container = page.locator('.container');
      const maxWidth = await container.evaluate(el => 
        window.getComputedStyle(el).maxWidth
      );
      expect(maxWidth).toBeTruthy();
    });
  });

  // Accessibility Tests
  test.describe('Accessibility', () => {
    test('should have labels for all login form inputs', async ({ page }) => {
      const emailLabel = page.locator('label[for="email"]');
      const passwordLabel = page.locator('label[for="password"]');
      
      await expect(emailLabel).toBeVisible();
      await expect(passwordLabel).toBeVisible();
    });

    test('should have labels for all contact form inputs', async ({ page }) => {
      const nameLabel = page.locator('label[for="contactName"]');
      const emailLabel = page.locator('label[for="contactEmail"]');
      const subjectLabel = page.locator('label[for="subject"]');
      const messageLabel = page.locator('label[for="message"]');
      
      await expect(nameLabel).toBeVisible();
      await expect(emailLabel).toBeVisible();
      await expect(subjectLabel).toBeVisible();
      await expect(messageLabel).toBeVisible();
    });

    test('should support keyboard navigation', async ({ page }) => {
      await page.keyboard.press('Tab');
      
      // SSO button should be focused
      const ssoBtn = page.locator('#ssoLoginBtn');
      await expect(ssoBtn).toBeFocused();
    });

    test('should have proper heading hierarchy', async ({ page }) => {
      const headings = page.locator('h1');
      await expect(headings).toHaveCount(2);
    });
  });

  // Responsive Design Tests
  test.describe('Responsive Design', () => {
    test('should be responsive on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      const container = page.locator('.container');
      await expect(container).toBeVisible();
      
      const ssoBtn = page.locator('#ssoLoginBtn');
      await expect(ssoBtn).toBeVisible();
    });

    test('should be responsive on tablet', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      
      const container = page.locator('.container');
      await expect(container).toBeVisible();
    });

    test('should be responsive on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      
      const container = page.locator('.container');
      await expect(container).toBeVisible();
    });
  });

  // Integration Tests
  test.describe('Integration', () => {
    test('should load both auth/sso.js and js/app.js', async ({ page }) => {
      const scripts = await page.evaluate(() => {
        return Array.from(document.scripts).map(script => script.src);
      });
      
      expect(scripts.some(src => src.includes('auth/sso.js'))).toBe(true);
      expect(scripts.some(src => src.includes('js/app.js'))).toBe(true);
    });

    test('should initialize app on DOMContentLoaded', async ({ page, context }) => {
      const logs = [];
      // Create a new page to capture logs from the start
      const newPage = await context.newPage();
      newPage.on('console', msg => {
        if (msg.type() === 'log') {
          logs.push(msg.text());
        }
      });
      
      await newPage.goto('/', { waitUntil: 'domcontentloaded' });
      await newPage.waitForLoadState('networkidle');
      // Give a small buffer for all console logs to be captured
      await newPage.waitForTimeout(100);
      
      expect(logs.some(log => log.includes('App initialized'))).toBe(true);
      await newPage.close();
    });

    test('should not interfere between login and contact forms', async ({ page }) => {
      // Fill login form
      await page.locator('#email').fill('login@example.com');
      await page.locator('#password').fill('password123');
      
      // Fill contact form
      await page.locator('#contactName').fill('Contact User');
      await page.locator('#contactEmail').fill('contact@example.com');
      
      // Both should retain their values
      await expect(page.locator('#email')).toHaveValue('login@example.com');
      await expect(page.locator('#contactEmail')).toHaveValue('contact@example.com');
    });
  });
});
