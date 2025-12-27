/**
 * Page Object Model for Mastodon Search Page
 * Encapsulates selectors and interactions for search functionality
 */

export class SearchPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    
    // Selectors
    this.searchInput = page.getByRole('textbox', { name: 'Search or paste URL' });
    this.postsTab = page.getByRole('button', { name: /posts/i });
    this.peopleTab = page.getByRole('button', { name: /people|profiles/i });
    this.hashtagsTab = page.getByRole('button', { name: /hashtags/i });
    this.noResultsMessage = page.locator('text=/No results|nothing found/i');
    this.clearButton = page.getByRole('button', { name: 'Clear search' });
  }

  /**
   * Click search input
   */
  async clickSearch() {
    await this.searchInput.click();
    await this.page.waitForTimeout(200);
  }

  /**
   * Fill search input
   * @param {string} query
   */
  async fillSearch(query) {
    await this.clickSearch();
    await this.searchInput.fill(query);
    await this.page.waitForTimeout(500);
  }

  /**
   * Submit search
   */
  async submitSearch() {
    await this.searchInput.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Perform complete search
   * @param {string} query
   */
  async search(query) {
    await this.fillSearch(query);
    await this.submitSearch();
  }

  /**
   * Search by username
   * @param {string} username
   */
  async searchUsername(username) {
    await this.search('@' + username);
  }

  /**
   * Search by hashtag
   * @param {string} hashtag
   */
  async searchHashtag(hashtag) {
    await this.search('#' + hashtag);
  }

  /**
   * Search by domain/URL
   * @param {string} domain
   */
  async searchDomain(domain) {
    await this.search(domain);
  }

  /**
   * Click Posts tab
   */
  async clickPostsTab() {
    await this.postsTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click People tab
   */
  async clickPeopleTab() {
    await this.peopleTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click Hashtags tab
   */
  async clickHashtagsTab() {
    await this.hashtagsTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Clear search
   */
  async clearSearch() {
    await this.clearButton.click();
    await this.page.waitForTimeout(300);
  }

  /**
   * Check if "No results" message is visible
   * @returns {Promise<boolean>}
   */
  async isNoResultsVisible() {
    try {
      await this.noResultsMessage.waitFor({ state: 'visible', timeout: 2000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Find result by text content
   * @param {string} text
   * @returns {import('@playwright/test').Locator}
   */
  findResult(text) {
    return this.page.locator(`text=${text}`).first();
  }
}
