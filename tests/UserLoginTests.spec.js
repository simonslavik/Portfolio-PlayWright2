// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { fillFormField } from '../utils/testHelpers.js';
import 'dotenv/config';

// Test credentials
const VALID_EMAIL = process.env.EXISTING_EMAIL || ""
const VALID_PASSWORD = process.env.VALID_PASSWORD || ""
const VALID_USERNAME = process.env.VALID_USERNAME || ""

test.describe('User Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Successful Login - with Email', async ({ page }) => {
    const loginPage = new LoginPage(page);
      
    // Fill credentials
    await loginPage.fillEmail(VALID_EMAIL);
    await loginPage.fillPassword(VALID_PASSWORD);

    // Submit form
    await loginPage.clickLogin();
    // Wait for navigation
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('load');
    await page.waitForTimeout(2000);

    // Verify successful login - check for home timeline
    await expect(page).toHaveURL('https://mastodon.social/home', { timeout: 15000 });
  });

  test('Login - Invalid Email', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Fill with non-existent email
    await loginPage.fillEmail('nonexistent@test.com');
    await loginPage.fillPassword('AnyPassword123');
    // Submit form
    await loginPage.clickLogin();
    await page.waitForTimeout(2000);

    // Verify error message
    await expect(loginPage.errorMessage).toBeVisible({ timeout: 10000 });
  });

  test('Login - Incorrect Password', async ({ page }) => {
    const loginPage = new LoginPage(page);
      
    // Fill with correct email but wrong password
    await loginPage.fillEmail(VALID_EMAIL);
    await loginPage.fillPassword('WrongPassword123');
    // Submit form
    await loginPage.clickLogin();
    await page.waitForTimeout(2000);

    // Verify error message
    await expect(loginPage.errorMessage).toBeVisible({ timeout: 10000 });
  });

  test('Login - Empty Credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Submit form
    await loginPage.clickLogin();
    // Verify error message
    await expect(page.getByText('Invalid E-mail address or')).toBeVisible();
  });

  

  test('Logout Functionality', async ({ page }) => {
    const loginPage = new LoginPage(page);
    // Fill credentials
    await loginPage.fillEmail(VALID_EMAIL);
    await loginPage.fillPassword(VALID_PASSWORD);
    // Submit form
    await loginPage.clickLogin();

    // Wait for navigation
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Verify successful login - check for home timeline
    const currentUrl = page.url();
    await expect(page).toHaveURL('https://mastodon.social/home', { timeout: 15000 });

    await page.locator('button').filter({ hasText: /^More$/ }).click();
    await page.getByRole('button', { name: 'Logout' }).click();
    await page.getByRole('button', { name: 'Log out' }).click();

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Verify redirected to login page
    await expect(page).toHaveURL('https://mastodon.social/auth/sign_in') 
  });

});
