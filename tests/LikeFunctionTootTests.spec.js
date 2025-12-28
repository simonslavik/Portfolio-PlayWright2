import {test, expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { fillComposeText, submitCompose } from '../utils/testHelpers.js';
import 'dotenv/config';


// Test credentials
const VALID_EMAIL = process.env.EXISTING_EMAIL || ""
const VALID_PASSWORD = process.env.VALID_PASSWORD || ""
const VALID_USERNAME = process.env.VALID_USERNAME || ""
let newTootId = 0;


test.describe('Like/Unlike Toot Tests', () => {
  // Login once before all tests in this suite
  test.beforeAll(async ({ browser }) => {
    test.setTimeout(60000); // Increase timeout for login
    
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.fillEmail(VALID_EMAIL);
    await loginPage.fillPassword(VALID_PASSWORD);
    await loginPage.clickLogin();
    
    // Save auth state
    await context.storageState({ path: 'auth.json' });
    
    // Create a toot for testing
    const homePage = new HomePage(page);
    await homePage.goto();
    await fillComposeText(page, 'This is a test toot for like/unlike functionality. #testing');
    await submitCompose(page);
    
    // Wait for the toot to appear and capture its ID
    const newToot = page.locator('article').first();
    await newToot.waitFor({ state: 'visible', timeout: 5000 });
    newTootId = await newToot.getAttribute('data-id');
    
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
    
    // Wait for compose box to be ready - with retry logic
    let composeBoxReady = false;
    for (let i = 0; i < 3; i++) {
      try {
        const composeBox = homePage.getComposeInput();
        await composeBox.waitFor({ state: 'visible', timeout: 8000 });
        composeBoxReady = true;
        break;
      } catch {
        if (i < 2) {
          await page.waitForTimeout(1000);
          await page.reload({ waitUntil: 'networkidle' });
        }
      }
    }
    
    await page.waitForTimeout(2000); // Extra wait to ensure compose box is fully rendered
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



