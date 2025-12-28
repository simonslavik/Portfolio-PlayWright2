// @ts-check
import { test, expect } from '@playwright/test';
import { fillFormField } from '../utils/testHelpers.js';
import 'dotenv/config';


// Helper function to generate unique test data
function generateTestUser() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  
  return {
    username: `testuser_${timestamp}_${random}`.slice(0, 30),
    newEmail: `simonslavik009+${timestamp}_${random}@gmail.com`,
    existingEmail: process.env.EXISTING_EMAIL || 'simonslavik002@gmail.com',
    password: 'SecurePass!234',
    dob: { day: '01', month: '01', year: '2000' }
  };
}

test.describe('User Registration Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://mastodon.social/auth/sign_up');
    await page.waitForLoadState('networkidle');
  });

  test('Successful User Registration - Form Submission', async ({ page }) => {
    const testUser = generateTestUser();

    // Accept terms
    await page.getByRole('link', { name: 'Accept' }).click();
    await page.waitForTimeout(500);

    // Fill form fields with safe delays
    await fillFormField(page, 'Username *', testUser.username);
    await fillFormField(page, 'E-mail address *', testUser.newEmail);
    await fillFormField(page, 'Password *', testUser.password);
    await fillFormField(page, 'Confirm password', testUser.password);
    await fillFormField(page, 'Year', '2000');
    await fillFormField(page, 'Month', '11');
    await fillFormField(page, 'Day', '06');
    
    // Check agreement
    await page.getByRole('checkbox', { name: 'I have read and agree to the' }).check();
    await page.waitForTimeout(200);
    
    // Submit form
    await page.getByRole('button', { name: 'Sign up' }).click();
    
    // Wait for confirmation page
    await page.waitForTimeout(3000);
  });


  test('Email Already Exists - Error Message', async ({ page }) => {
    const testUser = generateTestUser();

    // Accept terms
    await page.getByRole('link', { name: 'Accept' }).click();
    await page.waitForTimeout(500);

    // Fill form fields with safe delays
    await fillFormField(page, 'Username *', testUser.username);
    await fillFormField(page, 'E-mail address *', testUser.existingEmail);
    await fillFormField(page, 'Password *', testUser.password);
    await fillFormField(page, 'Confirm password', testUser.password);
    await fillFormField(page, 'Year', testUser.dob.year);
    await fillFormField(page, 'Month', testUser.dob.month);
    await fillFormField(page, 'Day', testUser.dob.day);
    
    // Check agreement
    await page.getByRole('checkbox', { name: 'I have read and agree to the' }).check();
    await page.waitForTimeout(200);
    
    // Submit form
    console.log('✅ Form filled, submitting...');
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.waitForTimeout(2000);

    // Verify error message
    await expect(page.getByText('has already been taken')).toBeVisible();
  });

  test('Invalid Email Format - Error Message', async ({ page }) => {
    const testUser = generateTestUser();

    // Accept terms
    await page.getByRole('link', { name: 'Accept' }).click();
    await page.waitForTimeout(500);
    // Fill form fields with safe delays
    await fillFormField(page, 'Username *', testUser.username);
    await fillFormField(page, 'E-mail address *', 'invalid-email-format');
    await fillFormField(page, 'Password *', testUser.password);
    await fillFormField(page, 'Confirm password', testUser.password);
    await fillFormField(page, 'Year', testUser.dob.year);
    await fillFormField(page, 'Month', testUser.dob.month);
    await fillFormField(page, 'Day', testUser.dob.day);
    
    // Check agreement
    await page.getByRole('checkbox', { name: 'I have read and agree to the' }).check();
    await page.getByRole('button', { name: 'Sign up' }).click();

    // Verify error message

    
  });

  test('Weak Password - Error Message', async ({ page }) => {
    const testUser = generateTestUser();

    // Accept terms
    await page.getByRole('link', { name: 'Accept' }).click();
    await page.waitForTimeout(500);
    // Fill form fields with safe delays
    await fillFormField(page, 'Username *', testUser.username);
    await fillFormField(page, 'E-mail address *', testUser.newEmail);
    await fillFormField(page, 'Password *', 'pass'); // Weak password
    await fillFormField(page, 'Confirm password', 'pass');
    await fillFormField(page, 'Year', testUser.dob.year);
    await fillFormField(page, 'Month', testUser.dob.month);
    await fillFormField(page, 'Day', testUser.dob.day);
    
    // Check agreement
    await page.getByRole('checkbox', { name: 'I have read and agree to the' }).check();
    await page.waitForTimeout(200);
    
    // Verify sign up button is disabled or error appears
    const signUpButton = page.getByRole('button', { name: 'Sign up' });
    const isDisabled = await signUpButton.isDisabled();
    await page.pause();
    

    await signUpButton.click();
    await expect(page.getByRole('textbox', { name: 'Password *' })).toHaveCSS(
      'border-color',
              'rgb(236, 0, 63)'// example resolved color
);  
    
      
  
  });

  test('Invalid Username Length - Error Message', async ({ page }) => {
    const testUser = generateTestUser();
    const longUsername = 'a'.repeat(31); // 31 characters (exceeds 30 limit)

    // Accept terms
    await page.getByRole('link', { name: 'Accept' }).click();
    await page.waitForTimeout(500);
    
    // Fill form fields with safe delays
    await fillFormField(page, 'Username *', longUsername);
    await fillFormField(page, 'E-mail address *', testUser.newEmail);
    await fillFormField(page, 'Password *', testUser.password);
    await fillFormField(page, 'Confirm password', testUser.password);
    await fillFormField(page, 'Year', testUser.dob.year);
    await fillFormField(page, 'Month', testUser.dob.month);
    await fillFormField(page, 'Day', testUser.dob.day);
    
    // Check agreement
    await page.getByRole('checkbox', { name: 'I have read and agree to the' }).check();
    await page.waitForTimeout(200);
    await page.getByRole('button', { name: 'Sign up' }).click();
    
    await page.pause();
    const usernameInput = page.getByRole('textbox', { name: 'Username *' });

    await expect(usernameInput).toHaveCSS(
      'border-color','rgb(236, 0, 63)'
      // example resolved color
);
    
  });

  test('Missing Terms Agreement - Button Disabled', async ({ page }) => {
    const testUser = generateTestUser();

    // Accept terms
    await page.getByRole('link', { name: 'Accept' }).click();
    await page.waitForTimeout(500);
    
    // Fill form fields with safe delays
    await fillFormField(page, 'Username *', testUser.username);
    await fillFormField(page, 'E-mail address *', testUser.newEmail);
    await fillFormField(page, 'Password *', testUser.password);
    await fillFormField(page, 'Confirm password', testUser.password);
    await fillFormField(page, 'Year', testUser.dob.year);
    await fillFormField(page, 'Month', testUser.dob.month);
    await fillFormField(page, 'Day', testUser.dob.day);
    
    // DO NOT check agreement checkbox
    await page.waitForTimeout(200);
    await page.getByRole('button', { name: 'Sign up' }).click();

    await expect(page.locator('#new_user div').filter({ hasText: 'Something isn\'t quite right' })).toBeVisible();
    await expect(page.getByText('must be accepted')).toBeVisible();
  });
  
});