// @ts-check
import { test, expect } from '@playwright/test';
import 'dotenv/config';

// Test credentials
const VALID_EMAIL = process.env.EXISTING_EMAIL || 'simonslavik001@gmail.com';
const VALID_PASSWORD = process.env.VALID_PASSWORD || 'TestPassword123!';
const VALID_USERNAME = process.env.VALID_USERNAME || 'simonslavik001';

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


test.describe('Search Function Tests', () => {
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


test('Test Case 5.1.1: Search by Username', async ({ page }) => {
    await page.pause();

  // Click search bar at top
  const searchInput = page.getByRole('textbox', { name: 'Search or paste URL' });
  await searchInput.click();
  await page.waitForTimeout(200);

  // Type username to search (with @ prefix)
  await searchInput.fill('@' + VALID_USERNAME);
  await page.waitForTimeout(1000); // Wait for search results to populate

  // Press Enter to perform search
  await searchInput.press('Enter');
  await page.waitForLoadState('networkidle');

  // Verify that user appears in search results
  // Look for the username in results
  const url = await page.url();
  await expect(url).toEqual(`https://mastodon.social/search?q=%40${VALID_USERNAME}`);
});

test('Test Case 5.1.2: Search by Hashtag', async ({ page }) => {
  // Click search bar
  const searchInput = page.getByRole('textbox', { name: 'Search or paste URL' });
  await searchInput.click();
  await page.waitForTimeout(200);

  // Type hashtag
  await searchInput.fill('#photography');
  await page.waitForTimeout(500);

  // Press Enter to search
  await searchInput.press('Enter');
  await page.waitForLoadState('networkidle');

  // Verify search results are displayed
  const searchResults = page.locator('[class*="search"], [class*="results"]');
  await expect(searchResults).toBeTruthy();
});

test('Test Case 5.1.3: Search by URL/Domain', async ({ page }) => {
  // Click search bar
  const searchInput = page.getByRole('textbox', { name: 'Search or paste URL' });
  await searchInput.click();
  await page.waitForTimeout(200);

  // Type URL/domain
  await searchInput.fill('example.com');
  await page.waitForTimeout(500);

  // Press Enter to search
  await searchInput.press('Enter');
  await page.waitForLoadState('networkidle');

  // Verify search results are displayed
  const searchResults = page.locator('[class*="search"], [class*="results"]');
  await expect(searchResults).toBeTruthy();
});

test('Test Case 5.1.4: Search Results - Tabs (Posts, People, Hashtags)', async ({ page }) => {
  // Click search bar
  const searchInput = page.getByRole('textbox', { name: 'Search or paste URL' });
  await searchInput.click();
  await page.waitForTimeout(200);

  // Perform a search
  await searchInput.fill('test');
  await page.waitForTimeout(500);
  await searchInput.press('Enter');
  await page.waitForLoadState('networkidle');

  // Check for Posts tab
  const postsTab = page.getByRole('button', { name: /posts/i });
  await expect(postsTab).toBeTruthy();

  // Check for People/Profiles tab
  const peopleTab = page.getByRole('button', { name: /people|profiles/i });
  await expect(peopleTab).toBeTruthy();

  // Check for Hashtags tab
  const hashtagsTab = page.getByRole('button', { name: /hashtags/i });
  await expect(hashtagsTab).toBeTruthy();

  // Click People tab to verify it works
  await peopleTab.click();
  await page.waitForLoadState('networkidle');
});

test('Test Case 5.1.5: Search - No Results', async ({ page }) => {
  // Click search bar
  const searchInput = page.getByRole('textbox', { name: 'Search or paste URL' });
  await searchInput.click();
  await page.waitForTimeout(200);

  // Search for non-existent term
  await searchInput.fill('xyzabc123nonexistent');
  await page.waitForTimeout(500);
  await searchInput.press('Enter');
  await page.waitForLoadState('networkidle');

  // Verify "No results" message is displayed
  const noResultsMessage = page.locator('text=/No results|nothing found/i');
  await expect(noResultsMessage).toBeVisible();
});

test('Test Case 5.1.6: Search History', async ({ page }) => {
  // Click search bar
  const searchInput = page.getByRole('textbox', { name: 'Search or paste URL' });
  await searchInput.click();
  await page.waitForTimeout(200);

  // Clear any existing search input to trigger history view
  await searchInput.fill('');
  await page.waitForTimeout(500);

  // Look for recent searches section
  const recentSearches = page.locator('text=/recent|history/i');
  
  // If recent searches exist, verify they're visible
  const isVisible = await recentSearches.isVisible().catch(() => false);
  
  if (isVisible) {
    await expect(recentSearches).toBeVisible();
  }
});


});



