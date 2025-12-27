/**
 * Page Object Model for Mastodon Login Page
 * Encapsulates selectors and interactions for the login flow
 */

export class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    
    // Selectors
    this.emailInput = page.locator('input[type="email"], input[name*="email"]').first();
    this.passwordInput = page.locator('input[type="password"]').first();
    this.loginButton = page.getByRole('button', { name: "Log in" });
    this.errorMessage = page.getByText('Invalid E-mail address or password.');
  }

  /**
   * Navigate to login page
   */
  async goto() {
    await this.page.goto('https://mastodon.social/auth/sign_in');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Fill email field
   * @param {string} email
   */
  async fillEmail(email) {
    await this.emailInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.emailInput.click();
    await this.page.waitForTimeout(200);
    await this.emailInput.fill(email);
    await this.page.waitForTimeout(100);
  }

  /**
   * Fill password field
   * @param {string} password
   */
  async fillPassword(password) {
    await this.passwordInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.passwordInput.click();
    await this.page.waitForTimeout(200);
    await this.passwordInput.fill(password);
    await this.page.waitForTimeout(100);
  }

  /**
   * Click login button
   */
  async clickLogin() {
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
  }

  /**
   * Perform full login
   * @param {string} email
   * @param {string} password
   */
  async login(email, password) {
    await this.goto();
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  /**
   * Check if error message is visible
   * @returns {Promise<boolean>}
   */
  async isErrorVisible() {
    try {
      await this.errorMessage.waitFor({ state: 'visible', timeout: 2000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get current URL
   * @returns {string}
   */
  getCurrentUrl() {
    return this.page.url();
  }
}
