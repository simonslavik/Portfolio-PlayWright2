import {test, expect} from '@playwright/test';
import 'dotenv/config';


// Helper to fill form fields safely with delays
/**
 * @param {import('@playwright/test').Page} page
 * @param {string} label
 * @param {string} value
 */


// Test credentials
const VALID_EMAIL = process.env.EXISTING_EMAIL || 'simonslavik001@gmail.com';
const VALID_PASSWORD = process.env.VALID_PASSWORD || 'TestPassword123!';
const VALID_USERNAME = process.env.VALID_USERNAME || 'simonslavik001';
let newTootId = 0;

  /**
 * @param {import('@playwright/test').Page} page
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
  // Close any open autocomplete/suggestion popups by pressing Escape
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  
  const submitButton = page.getByRole('button', { name: 'Post' }).first();
  await submitButton.waitFor({ state: 'visible', timeout: 3000 });
  
  // Click with force to bypass any overlay issues
  await submitButton.click({ force: true });
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
}


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


async function createToot(page, content) {
  // Fill in the toot content
  await fillComposeText(page, content);
  // Submit the toot
  await submitCompose(page);
};

 /**
 * @param {import('@playwright/test').Page} page
 */

 /**
 * @param {import('@playwright/test').Page} page
 * @param {string} text
 */


test.describe('Like/Unlike Toot Tests', () => {
  // Login once before all tests in this suite
  test.beforeAll(async ({ browser }) => {
    test.setTimeout(60000); // Increase timeout for login
    
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await login(page);
    
    // Save auth state
    await context.storageState({ path: 'auth.json' });
    await createToot(page, 'This is a test toot for like/unlike functionality. #testing');
    
    // Wait for the toot to appear and capture its ID
    const newToot = page.locator('article').first();
    await newToot.waitFor({ state: 'visible', timeout: 5000 });
    newTootId = await newToot.getAttribute('data-id');
    console.log('Created toot with ID:', newTootId);
    
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
  });

  test('3.1.1: Favorite and Unfavorite Toot', async ({ page }) => {
    // Locate the first toot's favorite button
    const firstToot = page.locator('article').first();
    const favoriteButton = firstToot.getByRole('button', { name: 'Favorite' });
    
    // Click to favorite
    await favoriteButton.click();
    await page.waitForTimeout(1000);
    
    // Verify favorite state (icon change)
    await expect(favoriteButton).toHaveAttribute('title', 'Remove from favorites');
    await page.waitForTimeout(200);
    await firstToot.getByRole('button', { name: 'Remove from favorites' }).click();
    await page.waitForTimeout(200);
    await expect(favoriteButton).toHaveAttribute('title', 'Favorite');
  });


  test('3.1.3: View Toot Favorites', async ({ page }) => {
    await page.pause();
    // Navigate to Favorites page
    await page.getByRole('link', { name: 'Favorites' }).click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Verify we are on the favorites page
    await expect(page).toHaveURL('https://mastodon.social/favourites');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Wait for the first article to be visible
    const firstArticle = page.locator('article').first();
    await firstArticle.waitFor({ state: 'visible', timeout: 5000 });
    
    
  });

});



