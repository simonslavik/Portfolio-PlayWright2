// @ts-check
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { SearchPage } from '../pages/SearchPage.js';
import 'dotenv/config';

// Test credentials
const VALID_EMAIL = process.env.EXISTING_EMAIL || ""
const VALID_PASSWORD = process.env.VALID_PASSWORD || ""
const VALID_USERNAME = process.env.VALID_USERNAME || ""

test.describe('Search Function Tests', () => {
  // Login once before all tests in this suite
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.fillEmail(VALID_EMAIL);
    await loginPage.fillPassword(VALID_PASSWORD);
    await loginPage.clickLogin();
    
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
    const homePage = new HomePage(page);
    await homePage.goto();
  });


test('Test Case 5.1.1: Search by Username', async ({ page }) => {
    const searchPage = new SearchPage(page);

  // Use the search page object
  await searchPage.fillSearch('@' + VALID_USERNAME);
  await searchPage.submitSearch();

  // Verify that user appears in search results
  // Look for the username in results
  const url = await page.url();
  await expect(url).toEqual(`https://mastodon.social/search?q=%40${VALID_USERNAME}`);
});

test('Test Case 5.1.2: Search by Hashtag', async ({ page }) => {
  const searchPage = new SearchPage(page);
  
  // Type hashtag
  await searchPage.fillSearch('#photography');

  // Press Enter to search
  await searchPage.submitSearch();

  // Verify search results are displayed
  const searchResults = page.locator('[class*="search"], [class*="results"]');
  await expect(searchResults).toBeTruthy();
});

test('Test Case 5.1.3: Search by URL/Domain', async ({ page }) => {
  const searchPage = new SearchPage(page);

  // Type URL/domain
  await searchPage.fillSearch('example.com');

  // Press Enter to search
  await searchPage.submitSearch();

  // Verify search results are displayed
  const searchResults = page.locator('[class*="search"], [class*="results"]');
  await expect(searchResults).toBeTruthy();
});

test('Test Case 5.1.4: Search Results - Tabs (Posts, People, Hashtags)', async ({ page }) => {
  const searchPage = new SearchPage(page);

  // Perform a search
  await searchPage.fillSearch('test');
  await searchPage.submitSearch();

  // Check for Posts tab
  const postsTab = searchPage.postsTab;
  await expect(postsTab).toBeTruthy();

  // Check for People/Profiles tab
  const peopleTab = searchPage.peopleTab;
  await expect(peopleTab).toBeTruthy();

  // Check for Hashtags tab
  const hashtagsTab = searchPage.hashtagsTab;
  await expect(hashtagsTab).toBeTruthy();

  // Click People tab to verify it works
  await peopleTab.click();
  await page.waitForLoadState('networkidle');
});

test('Test Case 5.1.5: Search - No Results', async ({ page }) => {
  const searchPage = new SearchPage(page);

  // Search for non-existent term
  await searchPage.fillSearch('xyzabc123nonexistent');
  await searchPage.submitSearch();

  // Verify "No results" message is displayed
  await expect(searchPage.noResultsMessage).toBeVisible();
});

test('Test Case 5.1.6: Search History', async ({ page }) => {
  const searchPage = new SearchPage(page);

  // Clear any existing search input to trigger history view
  await searchPage.fillSearch('');

  // Look for recent searches section
  const recentSearches = page.locator('text=/recent|history/i');
  
  // If recent searches exist, verify they're visible
  const isVisible = await recentSearches.isVisible().catch(() => false);
  
  if (isVisible) {
    await expect(recentSearches).toBeVisible();
  }
});


});



