// @ts-check
import { test, expect } from '@playwright/test';
import 'dotenv/config';

// Test credentials
const VALID_EMAIL = process.env.EXISTING_EMAIL || 'simonslavik001@gmail.com';
const VALID_PASSWORD = process.env.VALID_PASSWORD || 'TestPassword123!';

  /**
 * @param {import('@playwright/test').Page} page
 */
// Helper to login
async function login(page) {
  await page.goto('https://mastodon.social/auth/sign_in');
  await page.waitForLoadState('networkidle');
  
  const emailInput = page.locator('input[type="email"], input[name*="email"]').first();
  await emailInput.waitFor({ state: 'visible', timeout: 2000 });
  await emailInput.click();
  await page.waitForTimeout(200);
  await emailInput.fill(VALID_EMAIL);
  await page.waitForTimeout(100);

  const passwordInput = page.locator('input[type="password"]');
  await passwordInput.waitFor({ state: 'visible', timeout: 2000 });
  await passwordInput.click();
  await page.waitForTimeout(200);
  await passwordInput.fill(VALID_PASSWORD);
  await page.waitForTimeout(100);

  await page.getByRole('button', { name: "Log in" }).click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
}
 /**
 * @param {import('@playwright/test').Page} page
 */

 /**
 * @param {import('@playwright/test').Page} page
 * @param {string} text
 */
// Helper to fill compose text
async function fillComposeText(page, text) {
  const textarea = page.getByRole('textbox', { name: 'What\'s on your mind?' }).first();
  await textarea.waitFor({ state: 'visible', timeout: 2000 });
  await textarea.click();
  await page.waitForTimeout(200);
  await textarea.fill(text);
  await page.waitForTimeout(300);
}
 /**
 * @param {import('@playwright/test').Page} page
 */
// Helper to submit compose
async function submitCompose(page) {
  const submitButton = page.getByRole('button', { name: 'Post' }).first();
  await submitButton.waitFor({ state: 'visible', timeout: 2000 });
  await submitButton.click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
}

test.describe('Create Toot Tests', () => {
  // Login once before all tests in this suite
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await login(page);
    
    // Save auth state
    await context.storageState({ path: 'auth.json' });
    await context.close();
  });

  // Before each test, navigate to home with logged-in state
  test.beforeEach(async ({ page }) => {
    // Use saved auth state
    const context = page.context();
    const state = require('fs').readFileSync('auth.json', 'utf-8');
    const storageState = JSON.parse(state);
    
    // Apply cookies and storage
    if (storageState.cookies) {
      await context.addCookies(storageState.cookies);
    }
    
    // Navigate to home timeline
    await page.goto('https://mastodon.social/home');
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000); // Extra wait to ensure compose box is rendered
  });

  test('2.1.1: Create Text Toot Successfully', async ({ page }) => {
    const testText = 'This is my first toot! 🎉';
    
    await fillComposeText(page, testText);
    await submitCompose(page);
    
    const newArticle = page.locator('article').filter({ 
      has: page.getByText(/This is my first toot/)
    }).first();
    
    await expect(newArticle).toBeVisible();
  });


  
  test('2.1.5: Create Toot with Mentions', async ({ page }) => {
    const text = 'Great work @mastodon @pixelfed! Love these platforms!';
    
    await fillComposeText(page, text);
    await submitCompose(page);
    
    // Wait for the new article with the mention toot to appear
    const tootArticle = page.locator('article').filter({ 
      has: page.getByText(/Great work/)
    }).first();
    
    await expect(tootArticle).toBeVisible();
    
    // Look for mention links within this specific toot (mentions typically start with /@)
    const mentionLink = tootArticle.locator('a[href*="/@"]').first();
    await expect(mentionLink).toBeVisible();
  });

  test('2.1.6: Create Toot with Content Warning', async ({ page }) => {
    // Try to find and use content warning button
    
    const cwButton = page.getByRole('button', { name: /warning|cw|spoiler/i }).first();
    const cwAvailable = await cwButton.isVisible().catch(() => false);
    
    if (cwAvailable) {
      await cwButton.click();
      await page.waitForTimeout(300);
      
      const warningInput = page.locator('input[placeholder*="warning" i]').first();
      if (await warningInput.isVisible().catch(() => false)) {
        await warningInput.fill('Spoilers for movie X');
      }
    }
    
    await fillComposeText(page, 'This movie has an amazing twist ending!');
    await submitCompose(page);
    
    // Verify the toot appears in the feed
    const tootArticle = page.locator('article').filter({ 
      has: page.getByText(/Spoilers for movie X/)
    }).first();
    
    await expect(tootArticle).toBeVisible();
  });

  

  test('2.1.9: Create Empty Toot - Error Handling', async ({ page }) => {

    await page.pause();
    
    await submitCompose(page);
    
    await expect(page.locator('div').filter({ hasText: 'Post can\'t be blank.' }).nth(4)).toBeVisible();
  });

  test('2.1.10: Toot Character Limit - 500 Characters', async ({ page }) => {
    const longText = 'Lorem ipsum dolor sit amet. '.repeat(30);
    await fillComposeText(page, longText);
    
    // Check that submit button is disabled when text exceeds 500 chars
    const submitButton = page.getByRole('button', { name: 'Post' }).first();
    await expect(submitButton).toBeDisabled();
  });



});



