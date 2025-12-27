/**
 * Page Object Model for Mastodon Home Page
 * Encapsulates selectors and interactions for the home timeline
 */

export class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    
    // Selectors
    this.composeTextarea = page.getByRole('textbox', { name: 'What\'s on your mind?' });
    this.postButton = page.getByRole('button', { name: 'Post' });
    this.searchBar = page.getByRole('textbox', { name: 'Search or paste URL' });
    this.tootArticles = page.locator('article');
  }

  /**
   * Navigate to home page with auth state
   */
  async goto() {
    await this.page.goto('https://mastodon.social/home');
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(1000);
  }

  /**
   * Get compose text input field
   * @returns {import('@playwright/test').Locator}
   */
  getComposeInput() {
    return this.composeTextarea.first();
  }

  /**
   * Click compose text area
   */
  async clickCompose() {
    const input = this.getComposeInput();
    await input.waitFor({ state: 'visible', timeout: 2000 });
    await input.click();
    await this.page.waitForTimeout(200);
  }

  /**
   * Fill compose text
   * @param {string} text
   */
  async fillCompose(text) {
    const input = this.getComposeInput();
    await input.fill(text);
    await this.page.waitForTimeout(300);
  }

  /**
   * Submit/Post the composed toot
   */
  async submitPost() {
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(300);
    
    const button = this.postButton.first();
    await button.waitFor({ state: 'visible', timeout: 3000 });
    await button.click({ force: true });
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
  }

  /**
   * Create a complete toot
   * @param {string} text
   */
  async createToot(text) {
    await this.clickCompose();
    await this.fillCompose(text);
    await this.submitPost();
  }

  /**
   * Search for content
   * @param {string} query
   */
  async search(query) {
    await this.searchBar.click();
    await this.page.waitForTimeout(200);
    await this.searchBar.fill(query);
    await this.page.waitForTimeout(500);
    await this.searchBar.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Find a toot by text content
   * @param {string} textContent
   * @returns {import('@playwright/test').Locator}
   */
  findTootByText(textContent) {
    return this.tootArticles.filter({ 
      has: this.page.getByText(new RegExp(textContent))
    }).first();
  }

  /**
   * Get the "More" menu button for a toot
   * @param {import('@playwright/test').Locator} toot
   * @returns {import('@playwright/test').Locator}
   */
  getMoreMenuButton(toot) {
    return toot.getByRole('button', { name: 'More' }).first();
  }

  /**
   * Click more menu for a toot
   * @param {import('@playwright/test').Locator} toot
   */
  async openMoreMenu(toot) {
    const button = this.getMoreMenuButton(toot);
    await button.click();
    await this.page.waitForTimeout(300);
  }

  /**
   * Find an action button in the context menu
   * @param {string} actionName - e.g., 'Edit', 'Delete', 'Pin'
   * @returns {import('@playwright/test').Locator}
   */
  getActionButton(actionName) {
    return this.page.getByRole('button', { name: actionName }).first();
  }
}
