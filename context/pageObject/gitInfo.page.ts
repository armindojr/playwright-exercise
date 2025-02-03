import { Locator, Page, expect } from '@playwright/test';
import Base from './base.page';

export default class GitInfoPage extends Base {
  readonly page: Page;
  readonly inputUsername: Locator;
  readonly btnSearch: Locator;
  readonly imgUser: Locator;
  readonly textTitle: Locator;
  readonly textSubtitle: Locator;
  readonly listRepo: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.inputUsername = this.page.locator('input[name="username"]');
    this.btnSearch = this.page.locator('#search');
    this.imgUser = this.page.locator('img[src*="avatar"]');
    this.textTitle = this.page.locator('p.title');
    this.textSubtitle = this.page.locator('p.subtitle');
    this.listRepo = this.page.locator('app-gitrepos');
  }

  /**
   * Navigates to the Git information page.
   */
  async goto() {
    await super.goto('/elements');
  }

  /**
   * Performs a search for a user by their username.
   * @param {string} user - The username to search for.
   * @returns {Promise<void>} A promise that resolves when the search operation is complete and the user's avatar is visible.
   */
  async searchUser(user: string) {
    await this.inputUsername.fill(user);
    await this.btnSearch.click();
    await this.imgUser.waitFor({ state: 'visible' });
  }

  /**
   * Verifies that the displayed user information matches the expected details.
   * @param {string} fullName - The expected full name of the user to check against the title element.
   * @param {string} country - The expected country of the user to check in the subtitle text.
   * @param {string} repo - The expected repository name to verify in the repositories list.
   */
  async checkUser(fullName: string, country: string, repo: string) {
    await expect(this.textTitle).toContainText(fullName);
    await expect(this.textSubtitle).toContainText(country);
    await expect(this.listRepo).toContainText(repo);
  }
}
