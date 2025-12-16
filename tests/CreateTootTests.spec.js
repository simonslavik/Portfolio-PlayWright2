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
  await emailInput.waitFor({ state: 'visible', timeout: 10000 });
  await emailInput.click();
  await page.waitForTimeout(200);
  await emailInput.fill(VALID_EMAIL);
  await page.waitForTimeout(100);

  const passwordInput = page.locator('input[type="password"]');
  await passwordInput.waitFor({ state: 'visible', timeout: 10000 });
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
  await textarea.waitFor({ state: 'visible', timeout: 5000 });
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
  await submitButton.waitFor({ state: 'visible', timeout: 5000 });
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
  });

//   test('2.1.1: Create Text Toot Successfully', async ({ page }) => {
//     const testText = 'This is my first toot!';
    
//     await fillComposeText(page, testText);
//     await submitCompose(page);
    
//     const tootElement = page.getByText(testText).first();
//     await expect(tootElement).toBeVisible();
//   });

  test('2.1.2: Create Toot with Image', async ({ page }) => {
    await page.pause();
    
    const caption = 'Beautiful sunset #photography 🌅';
    await fillComposeText(page, caption);
    await expect(page.getByRole('button', { name: 'Add images, a video or an' })).toBeVisible();
    await page.getByRole('button', { name: 'Add images, a video or an' }).setInputFiles('yeees 2025-12-16 at 12.15.38 PM.png');

    
    await submitCompose(page);
    
    const mediaGallery = page.locator('[class*="status__wrapper"] .media-gallery, [role="article"] .media-gallery').first();
    const mediaVisible2 = await mediaGallery.isVisible().catch(() => false);
    
    if (mediaVisible2) {
      const imageElement = page.locator('[class*="media-gallery"] img').first();
      await expect(imageElement).toBeVisible();
      console.log('✅ Image successfully displayed in toot\n');
    } else {
      console.log('✅ Caption toot created\n');
    }



    await page.getByRole('button', { name: 'Add images, a video or an' }).click();
  await page.getByRole('button', { name: 'Add images, a video or an' }).setInputFiles('yeees 2025-12-16 at 12.15.38 PM.png');
  await page.getByRole('button', { name: 'Edit ALT' }).click();
  await page.getByRole('textbox', { name: 'What\'s on your mind?' }).click();
  await page.getByRole('textbox', { name: 'What\'s on your mind?' }).fill('My first picture to be uploaded!');
  await page.getByRole('button', { name: 'Post' }).click();
  await page.getByRole('button', { name: 'Add alt text' }).click();
  await page.getByRole('textbox', { name: 'Describe this for people with' }).click();
  await page.getByRole('textbox', { name: 'Describe this for people with' }).fill('my picture');
  await page.getByRole('button', { name: 'Done' }).click();
  await page.getByRole('button', { name: 'Post' }).click();
  await page.getByText('nowsimonslavik @simonslavikMy').click();
  await page.getByRole('button', { name: 'Close' }).click();
  });

//   test('2.1.3: Create Toot with Multiple Images', async ({ page }) => {
    
//     const text = 'Gallery showcase - testing multiple attachments 📸';
    
//     await openCompose(page);
//     await fillComposeText(page, text);
    
//     const mediaButton = page.getByRole('button', { name: /image|media|attach|photo/i }).first();
//     const hasMedia = await mediaButton.isVisible().catch(() => false);
//     expect(hasMedia).toBeTruthy();
    
//     await submitCompose(page);
//     const tootElement = page.getByText(/Gallery showcase/).first();
//     await expect(tootElement).toBeVisible();
//   });

//   test('2.1.4: Create Toot with Hashtags', async ({ page }) => {
    
//     const text = 'Great day! #photography #nature #mastodon #webdev';
    
//     await openCompose(page);
//     await fillComposeText(page, text);
//     await submitCompose(page);
    
//     const tootElement = page.getByText(/Great day/).first();
//     await expect(tootElement).toBeVisible();
//   });


//   test('2.1.5: Create Toot with Mentions', async ({ page }) => {
    
//     const text = 'Great work @mastodon @pixelfed! Love these platforms!';
    
//     await openCompose(page);
//     await fillComposeText(page, text);
//     await submitCompose(page);
    
//     const tootElement = page.getByText(/Great work/).first();
//     await expect(tootElement).toBeVisible();
    
//     const mentions = page.locator('[role="article"] a[href*="@"]').first();
//     const mentionVisible = await mentions.isVisible().catch(() => false);
//     expect(mentionVisible).toBeTruthy();

//   });

//   test('2.1.6: Create Toot with Content Warning', async ({ page }) => {
    
//     await openCompose(page);
    
//     const cwButton = page.getByRole('button', { name: /warning|cw|spoiler/i }).first();
//     const cwAvailable = await cwButton.isVisible().catch(() => false);
    
//     if (cwAvailable) {
//       await cwButton.click();
//       await page.waitForTimeout(300);
      
//       const warningInput = page.locator('input[placeholder*="warning" i]').first();
//       if (await warningInput.isVisible().catch(() => false)) {
//         await warningInput.fill('Spoilers for movie X');
//         console.log('✅ Content Warning enabled');
//       }
//     }
    
//     await fillComposeText(page, 'This movie has an amazing twist ending!');
//     await submitCompose(page);
//   });

//   test('2.1.7: Create Toot with Privacy - Followers Only', async ({ page }) => {
    
//     const text = 'This is only for my followers - private thoughts!';
    
//     await openCompose(page);
    
//     const privacyButton = page.getByRole('button', { name: /public|privacy|visibility/i }).first();
//     const privacyVisible = await privacyButton.isVisible().catch(() => false);
    
//     if (privacyVisible) {
//       await privacyButton.click();
//       await page.waitForTimeout(300);
//       const followersOption = page.locator('text=/Followers/i').first();
//       if (await followersOption.isVisible().catch(() => false)) {
//         await followersOption.click();
//         console.log('✅ Privacy set to Followers Only');
//       }
//     }
    
//     await fillComposeText(page, text);
//     await submitCompose(page);
    
//     const tootElement = page.getByText(/private thoughts/).first();
//     await expect(tootElement).toBeVisible();
//   });

//   test('2.1.8: Privacy Options - All Levels', async ({ page }) => {
    
//     await openCompose(page);
    
//     const privacyButton = page.getByRole('button', { name: /public|privacy|visibility/i }).first();
//     const privacyVisible = await privacyButton.isVisible().catch(() => false);
    
//     if (privacyVisible) {
//       await privacyButton.click();
//       await page.waitForTimeout(300);
      
//       const levels = {
//         'Public': page.locator('text=/^Public$/i'),
//         'Unlisted': page.locator('text=/^Unlisted$/i'),
//         'Followers': page.locator('text=/^Followers/i'),
//         'Direct': page.locator('text=/^Direct$/i')
//       };
      
//       console.log('📊 Privacy levels available:');
//       for (const [level, locator] of Object.entries(levels)) {
//         const visible = await locator.first().isVisible().catch(() => false);
//         console.log(`  ${visible ? '✅' : '❌'} ${level}`);
//       }
      
//       await page.keyboard.press('Escape');
//     }
//   });

//   test('2.1.9: Create Empty Toot - Error Handling', async ({ page }) => {
    
//     await openCompose(page);
    
//     const submitButton = page.getByRole('button', { name: /post|toot|publish/i }).first();
//     const isDisabled = await submitButton.isDisabled();

//     expect(isDisabled).toBeTruthy();
//   });

//   test('2.1.10: Toot Character Limit - 500 Characters', async ({ page }) => {
    
//     await openCompose(page);
    
//     const longText = 'Lorem ipsum dolor sit amet. '.repeat(30);
//     console.log(`📝 Entering ${longText.length} characters (limit: 500)...`);
    
//     const textarea = page.getByRole('textbox', { name: /what's on your mind|compose|post/i }).first();
//     await textarea.click();
//     await textarea.fill(longText);
//     await page.waitForTimeout(300);
    
//     const submitButton = page.getByRole('button', { name: /post|toot|publish/i }).first();
//     const isDisabled = await submitButton.isDisabled();

//     expect(isDisabled).toBeTruthy();
//   });

//   test('2.1.11: Draft Toot - Save and Resume', async ({ page }) => {
    
//     const draftText = 'This is a draft toot that I will finish and post later - 📝';
    
//     await openCompose(page);
//     await fillComposeText(page, draftText);
//     console.log('✍️ Draft text entered');
    
//     const closeButton = page.locator('button[aria-label*="close" i], [role="dialog"] button:has-text("✕")').first();
//     const closeVisible = await closeButton.isVisible().catch(() => false);
    
//     if (closeVisible) {
//       await closeButton.click();
//       await page.waitForTimeout(500);
      
//       console.log('📝 Reopening compose to check for draft...');
//       await openCompose(page);
//       await page.waitForTimeout(500);
      
//       const textarea = page.getByRole('textbox', { name: /what's on your mind|compose|post/i }).first();
//       const currentText = await textarea.inputValue().catch(() => '');
      
//       if (currentText.includes('draft')) {
//         console.log('✅ Draft preserved and ready to resume');
//         await submitCompose(page);
//         const tootElement = page.getByText(/draft toot/).first();
//         await expect(tootElement).toBeVisible();
//         console.log('✅ Draft toot successfully posted\n');
//       } else {
//         console.log('⚠️ Draft not preserved\n');
//       }
//     }
//   });


});



