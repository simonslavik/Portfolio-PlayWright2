// @ts-check
import { test, expect } from '@playwright/test';
import 'dotenv/config';
import { getConfirmationLink } from './utils/gmail-helper.js';

// Helper function to generate unique test data
function generateTestUser() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  
  return {
    username: `testuser_${timestamp}_${random}`.slice(0, 30),
    email: process.env.TEST_EMAIL || 'simonslavik007@gmail.com',
    password: 'SecurePass!234',
    dob: { day: '01', month: '01', year: '2000' }
  };
}

test.describe('User Registration Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://mastodon.social/auth/sign_up');
  });

  test('Successful User Registration - Form Submission', async ({ page }) => {
    const testUser = generateTestUser();
    console.log(`\n🚀 Test Email: ${testUser.email}`);
    console.log(`🚀 Test Username: ${testUser.username}\n`);

    await page.goto('https://mastodon.social/auth/sign_up');
    await page.getByRole('link', { name: 'Accept' }).click();
    await page.getByRole('textbox', { name: 'Username *' }).click();
    await page.getByRole('textbox', { name: 'Username *' }).fill(testUser.username);
    await page.getByRole('textbox', { name: 'E-mail address *' }).click();
    await page.getByRole('textbox', { name: 'E-mail address *' }).fill(testUser.email);
    await page.getByRole('textbox', { name: 'Password *' }).click();
    await page.getByRole('textbox', { name: 'Password *' }).fill(testUser.password);
    await page.getByRole('textbox', { name: 'Confirm password' }).click();
    await page.getByRole('textbox', { name: 'Confirm password' }).fill(testUser.password);
    await page.getByRole('textbox', { name: 'Year' }).click();
    await page.getByRole('textbox', { name: 'Year' }).fill('2000');
    await page.getByRole('textbox', { name: 'Month' }).click();
    await page.getByRole('textbox', { name: 'Month' }).fill('11');
    await page.getByRole('textbox', { name: 'Day' }).click();
    await page.getByRole('textbox', { name: 'Day' }).fill('06');
    await page.getByRole('checkbox', { name: 'I have read and agree to the' }).check();
    
    console.log('✅ Form filled, submitting...');
    await page.getByRole('button', { name: 'Sign up' }).click();
    
    // Wait for confirmation page
    await page.waitForTimeout(3000);
    console.log(`\n📧 Registration submitted`);
    console.log(`📧 Fetching confirmation email from Gmail...`);
    
    try {
      const confirmationLink = await getConfirmationLink(testUser.email, 45000);
      console.log(`✅ Got confirmation link\n`);

      // Navigate to confirmation link to verify email
      await page.goto(confirmationLink, { waitUntil: 'networkidle' });
      
      // Verify registration is complete
      const url = page.url();
      expect(url).not.toContain('confirm_email');
      console.log('✅ Email verified and registration complete!\n');
    } catch (error) {
      console.error('\n❌ Error fetching confirmation link:', error.message);
      console.log('ℹ️ Make sure you completed Gmail setup: node tests/utils/setup-gmail.js\n');
      throw error;
    }
  });
});
  