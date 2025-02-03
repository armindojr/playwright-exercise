import { Locator, Page, expect } from '@playwright/test';
import Base from './base.page';

export default class AjaxPage extends Base {
  readonly page: Page;
  readonly btnTrigger: Locator;
  readonly successMessage: Locator;
  readonly route: string;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.btnTrigger = this.page.locator('#ajaxButton');
    this.successMessage = this.page.locator('.bg-success');
    this.route = 'http://www.uitestingplayground.com/ajaxdata';
  }

  /**
   * Navigates to the AJAX demonstration page.
   */
  async goto() {
    await super.goto('http://www.uitestingplayground.com/ajax');
  }

  /**
   * Triggers an AJAX request by clicking the 'AJAX Button'.
   */
  async triggerAjax() {
    await this.btnTrigger.click();
  }

  /**
   * Mocks a response for the specified route using Playwright's route interception.
   * @param text The mock response body to return.
   * @param headers Optional headers for the response. Defaults to 'Content-Type': 'text/html; charset=utf-8'.
   */
  async mockData(text: string) {
    this.page.route(this.route, async route => {
      await route.fulfill({
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
        body: text
      });
    });
  }

  /**
   * Validates that the success message is displayed and contains the expected text.
   * @param text The expected text to check within the success message.
   */
  async validateMsg(text: string) {
    await this.successMessage.waitFor({ state: 'visible', timeout: 18000 });
    await expect(this.successMessage).toContainText(text);
  }
}
