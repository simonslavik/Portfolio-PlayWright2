// @ts-check
import { test, expect } from '@playwright/test';
import 'dotenv/config';

// Test credentials
const VALID_EMAIL = process.env.EXISTING_EMAIL || 'simonslavik009@gmail.com';
const VALID_PASSWORD = process.env.VALID_PASSWORD || 'TestPassword123!';
const VALID_USERNAME = process.env.VALID_USERNAME || 'simonslavik002';
// Helper to fill form fields safely with delays
/**
 * @param {import('@playwright/test').Page} page
 * @param {string} fieldType - 'email' or 'password'
 * @param {string} value
 */
async function fillFormField(page, fieldType, value) {
  let input;
  if (fieldType === 'email') {
    input = page.locator('input[type="email"], input[name*="email"], input[name*="user"]').first();
  } else if (fieldType === 'password') {
    input = page.locator('input[type="password"]');
  }
  await input?.waitFor({ state: 'visible', timeout: 10000 });
  await input?.click();
  await page.waitForTimeout(200);
  await input?.fill(value);
  await page.waitForTimeout(100);
}

test.describe('User Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://mastodon.social/auth/sign_in');
  });

  test('Successful Login - with Email', async ({ page }) => {
      
    // Fill credentials
    await fillFormField(page, 'email', VALID_EMAIL);
    await fillFormField(page, 'password', VALID_PASSWORD);

    // Submit form
    await page.getByRole('button', { name: "Log in" }).click();
    // Wait for navigation
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Verify successful login - check for home timeline
    const currentUrl = page.url();

    await expect(page).toHaveURL('https://mastodon.social/home');
  });

  test('Login - Invalid Email', async ({ page }) => {

    // Fill with non-existent email
    await fillFormField(page, 'email', 'nonexistent@test.com');
    await fillFormField(page, 'password', 'AnyPassword123');
    // Submit form
    await page.getByRole('button', { name: "Log in" }).click();
    await page.waitForTimeout(2000);

    // Verify error message
    await expect(page.getByText('Invalid E-mail address or password.')).toBeVisible();
  });

  test('Login - Incorrect Password', async ({ page }) => {
      
    // Fill with correct email but wrong password
    await fillFormField(page, 'email', VALID_EMAIL);
    await fillFormField(page, 'password', 'WrongPassword123');
    // Submit form
    await page.getByRole('button', { name: "Log in" }).click();
    await page.waitForTimeout(2000);

    // Verify error message
    await expect(page.getByText('Invalid E-mail address or password.')).toBeVisible();
  });

  test('Login - Empty Credentials', async ({ page }) => {

    // Submit form
    await page.getByRole('button', { name: "Log in" }).click();
    // Verify error message
    await expect(page.getByText('Invalid E-mail address or')).toBeVisible();
  });

  

  test('Logout Functionality', async ({ page }) => {
    // Fill credentials
    await fillFormField(page, 'email', VALID_EMAIL);
    await fillFormField(page, 'password', VALID_PASSWORD);
    // Submit form
    await page.getByRole('button', { name: "Log in" }).click();

    // Wait for navigation
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Verify successful login - check for home timeline
    const currentUrl = page.url();
    await expect(page).toHaveURL('https://mastodon.social/home');

    await page.locator('button').filter({ hasText: /^More$/ }).click();
    await page.getByRole('button', { name: 'Logout' }).click();
    await page.getByRole('button', { name: 'Log out' }).click();

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Verify redirected to login page
    await expect(page).toHaveURL('https://mastodon.social/auth/sign_in') 
  });

});
