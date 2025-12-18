import {test, expect} from '@playwright/test';
import { create } from 'domain';
import 'dotenv/config';


// Helper to fill form fields safely with delays
/**
 * @param {import('@playwright/test').Page} page
 * @param {string} label
 * @param {string} value
 */

// ## 3. FAVORITES & BOOST FUNCTIONALITY

// ### 3.1 Favorite (Like) Tests

// #### Test Case 3.1.1: Favorite a Toot

// - **Description:** User can favorite a toot (Mastodon's version of liking)
// - **Steps:**
//   1. View a toot
//   2. Click star icon
// - **Expected Result:**
//   - Star icon filled/highlighted (yellow)
//   - Favorite count incremented by 1
//   - Toot author receives notification

// #### Test Case 3.1.2: Unfavorite a Toot

// - **Description:** User can remove their favorite
// - **Steps:**
//   1. Click star icon on favorited toot
//   2. Click star icon again to unfavorite
// - **Expected Result:**
//   - Star icon returns to unfilled state
//   - Favorite count decremented by 1
//   - Notification sent to author

// #### Test Case 3.1.3: View Toot Favorites

// - **Description:** User can see who favorited a toot
// - **Steps:**
//   1. Click on favorite count on toot
//   2. List opens showing users who favorited
// - **Expected Result:**
//   - List of accounts that favorited
//   - Profile pictures and usernames shown
//   - Can click to visit profiles

// #### Test Case 3.1.4: Favorite Notification

// - **Description:** Toot author receives favorite notification
// - **Steps:**
//   1. User A favorites User B's toot
//   2. Check User B's notifications
// - **Expected Result:** Notification: "User A favorited your toot"

// #### Test Case 3.1.5: Cannot Favorite Own Toot

// - **Description:** User cannot favorite their own toot (validation)
// - **Steps:**
//   1. View own toot
//   2. Look at favorite button
// - **Expected Result:** Star button may be disabled or shows "Can't favorite own toot"





// Test credentials
const VALID_EMAIL = process.env.EXISTING_EMAIL || 'simonslavik001@gmail.com';
const VALID_PASSWORD = process.env.VALID_PASSWORD || 'TestPassword123!';
const VALID_USERNAME = process.env.VALID_USERNAME || 'simonslavik001';

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
  const submitButton = page.getByRole('button', { name: 'Post' }).first();
  await submitButton.waitFor({ state: 'visible', timeout: 2000 });
  await submitButton.click();
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
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await login(page);
    
    // Save auth state
    await context.storageState({ path: 'auth.json' });
    await context.close();

    await createToot(page, 'This is a test toot for like/unlike functionality. #testing');
    await page.close();
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

  test('3.1.1: Favorite a Toot', async ({ page }) => {
    // Locate the first toot's favorite button
    const firstToot = page.locator('article').first();
    const favoriteButton = firstToot.getByRole('button', { name: 'Favorite' });
    
    // Click to favorite
    await favoriteButton.click();
    await page.waitForTimeout(1000);
    
    // Verify favorite state (icon change)
    await expect(favoriteButton).toHaveAttribute('aria-pressed', 'true');
  });

  test('3.1.2: Unfavorite a Toot', async ({ page }) => {
    const firstToot = page.locator('article').first();
    const favoriteButton = firstToot.getByRole('button', { name: 'Favorite' });
    
    // Click to unfavorite
    await favoriteButton.click();
    await page.waitForTimeout(1000);
    
    // Verify unfavorite state (icon change)
    await expect(favoriteButton).toHaveAttribute('aria-pressed', 'false');
  });

  test('3.1.3: View Toot Favorites', async ({ page }) => {
    const firstToot = page.locator('article').first();
    const favoriteCountButton = firstToot.getByRole('button', { name: /favorites?/i }).first();
    
    // Click to view favorites
    await favoriteCountButton.click();
    await page.waitForTimeout(1000);
    
    // Verify the favorites list is visible
    const favoritesList = page.locator('div[role="dialog"]');
    await expect(favoritesList).toBeVisible();
    
    // Close the dialog
    const closeButton = favoritesList.getByRole('button', { name: 'Close' });
    await closeButton.click();
    await page.waitForTimeout(500);
  });

  test('3.1.4: Favorite Notification', async ({ page }) => {
    // This test would ideally require two accounts to fully verify notifications.
    // Here we will just check that the notification area can be accessed.
    
    const notificationsButton = page.getByRole('button', { name: 'Notifications' });
    await notificationsButton.click();
    await page.waitForTimeout(1000);
    
    // Verify notifications panel is visible
    const notificationsPanel = page.locator('div[role="region"][aria-label="Notifications"]');
    await expect(notificationsPanel).toBeVisible();
    
    // Note: Full verification of favorite notification would require a second user context.
  });

  test('3.1.5: Cannot Favorite Own Toot', async ({ page }) => {
    const firstToot = page.locator('article').first();
    const favoriteButton = firstToot.getByRole('button', { name: 'Favorite' });
    // Try to favorite own toot
    await favoriteButton.click();
    await page.waitForTimeout(1000);
    
    // Verify favorite state (should not change)
    await expect(favoriteButton).toHaveAttribute('aria-pressed', 'false');
  });




  

});



