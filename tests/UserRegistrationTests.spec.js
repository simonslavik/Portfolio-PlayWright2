// @ts-check
import { test, expect } from '@playwright/test';
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

// Helper to fill form fields safely with delays
/**
 * @param {import('@playwright/test').Page} page
 * @param {string} label
 * @param {string} value
 */

async function fillFormField(page, label, value) {
  const input = page.getByRole('textbox', { name: label });
  await input.waitFor({ state: 'visible', timeout: 10000 });
  await input.click();
  await page.waitForTimeout(200); // Brief delay for focus
  await input.fill(value);
  await page.waitForTimeout(100); // Brief delay after filling
}

test.describe('User Registration Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://mastodon.social/auth/sign_up');
    await page.waitForLoadState('networkidle');
  });

  test('Successful User Registration - Form Submission', async ({ page }) => {
    const testUser = generateTestUser();
    console.log(`\n🚀 Test Email: ${testUser.newEmail}`);
    console.log(`🚀 Test Username: ${testUser.username}\n`);

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
    console.log('✅ Form filled, submitting...');
    await page.getByRole('button', { name: 'Sign up' }).click();
    
    // Wait for confirmation page
    await page.waitForTimeout(3000);
    console.log(`\n📧 Registration submitted`);
    console.log(`📧 Confirmation email sent to: ${testUser.newEmail}\n`);
    
    // Verify that the confirmation message is displayed
    await expect(page.getByText('Check your inbox')).toBeVisible();
    console.log('✅ Registration successful! Awaiting email verification.\n');
  });


  test('Email Already Exists - Error Message', async ({ page }) => {
    const testUser = generateTestUser();
    console.log(`\n🚀 Test Email: ${testUser.existingEmail}`);
    console.log(`🚀 Test Username: ${testUser.username}\n`);

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
    console.log('✅ Error message verified: Email already exists\n');
  });

  test('Invalid Email Format - Error Message', async ({ page }) => {
    const testUser = generateTestUser();
    console.log(`\n🚀 Test Email: invalid-email-format`);
    console.log(`🚀 Test Username: ${testUser.username}\n`);

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
    console.log(`\n🚀 Test: Weak Password`);
    console.log(`🚀 Test Username: ${testUser.username}\n`);

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
    console.log(`\n🚀 Test: Invalid Username Length`);
    console.log(`🚀 Username length: ${longUsername.length} (max 30)\n`);

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
    console.log(`\n🚀 Test: Missing Terms Agreement`);
    console.log(`🚀 Test Username: ${testUser.username}\n`);

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