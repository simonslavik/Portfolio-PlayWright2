/**
 * Centralized test helper utilities
 * Contains reusable functions for all test suites
 */

/**
 * Fills a form field with proper wait and delay handling
 * @param {import('@playwright/test').Page} page
 * @param {string} fieldType - 'email', 'password', 'textbox', or custom label
 * @param {string} value - Value to fill
 */
export async function fillFormField(page, fieldType, value) {
  let input;
  
  switch (fieldType.toLowerCase()) {
    case 'email':
      input = page.locator('input[type="email"], input[name*="email"], input[name*="user"]').first();
      break;
    case 'password':
      input = page.locator('input[type="password"]').first();
      break;
    case 'username':
      input = page.locator('input[type="text"], input[placeholder*="Username"]').first();
      break;
    default:
      input = page.getByRole('textbox', { name: fieldType }).first();
  }
  
  await input.waitFor({ state: 'visible', timeout: 10000 });
  await input.click();
  await page.waitForTimeout(200);
  await input.fill(value);
  await page.waitForTimeout(100);
}

/**
 * Fills the compose/toot text area
 * @param {import('@playwright/test').Page} page
 * @param {string} text - Text to compose
 */
export async function fillComposeText(page, text) {
  const textarea = page.getByRole('textbox', { name: 'What\'s on your mind?' }).first();
  await textarea.waitFor({ state: 'visible', timeout: 10000 });
  await textarea.click();
  await page.waitForTimeout(300);
  await textarea.fill(text);
  await page.waitForTimeout(300);
}

/**
 * Submits a compose/toot with error handling
 * @param {import('@playwright/test').Page} page
 */
export async function submitCompose(page) {
  // Close any open autocomplete/suggestion popups
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  
  const submitButton = page.getByRole('button', { name: 'Post' }).first();
  await submitButton.waitFor({ state: 'visible', timeout: 5000 });
  
  // Use force to bypass any overlay issues
  await submitButton.click({ force: true });
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
}

/**
 * Performs login with email and password
 * @param {import('@playwright/test').Page} page
 * @param {string} email - Login email
 * @param {string} password - Login password
 */
export async function login(page, email, password) {
  await page.goto('https://mastodon.social/auth/sign_in');
  await page.waitForLoadState('networkidle');
  
  const emailInput = page.locator('input[type="email"], input[name*="email"]').first();
  await emailInput.waitFor({ state: 'visible', timeout: 2000 });
  await emailInput.click();
  await page.waitForTimeout(200);
  await emailInput.fill(email);
  await page.waitForTimeout(100);

  const passwordInput = page.locator('input[type="password"]').first();
  await passwordInput.waitFor({ state: 'visible', timeout: 2000 });
  await passwordInput.click();
  await page.waitForTimeout(200);
  await passwordInput.fill(password);
  await page.waitForTimeout(100);

  await page.getByRole('button', { name: "Log in" }).click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
}

/**
 * Safely waits for element without throwing error
 * @param {import('@playwright/test').Page} page
 * @param {import('@playwright/test').Locator} locator
 * @param {number} timeout - Timeout in milliseconds
 * @returns {Promise<boolean>} - True if visible, false otherwise
 */
export async function isElementVisible(locator, timeout = 2000) {
  try {
    await locator.waitFor({ state: 'visible', timeout });
    return true;
  } catch {
    return false;
  }
}

/**
 * Wait for network to stabilize
 * @param {import('@playwright/test').Page} page
 */
export async function waitForNetworkStable(page) {
  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(1000);
}

/**
 * Generates a unique test email
 * @param {string} baseEmail - Base email to modify
 * @returns {string} - Unique email with timestamp
 */
export function generateUniqueEmail(baseEmail) {
  const timestamp = Date.now();
  const [localPart, domain] = baseEmail.split('@');
  return `${localPart}+${timestamp}@${domain}`;
}

/**
 * Generates a unique username
 * @returns {string} - Unique username with timestamp
 */
export function generateUniqueUsername() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `testuser_${timestamp}_${random}`.slice(0, 30);
}
