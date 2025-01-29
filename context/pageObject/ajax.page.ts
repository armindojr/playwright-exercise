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
    this.btnTrigger = this.page.locator('button#ajaxButton');
    this.successMessage = this.page.locator('p.bg-success');
    this.route = 'http://www.uitestingplayground.com/ajaxdata';
  }

  async goto() {
    await super.goto('http://www.uitestingplayground.com/ajax');
  }

  async triggerAjax() {
    await this.btnTrigger.click();
  }

  async mockData(text: string) {
    this.page.route(this.route, async route => {
      await route.fulfill({
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8'
        },
        body: text
      });
    });
  }

  async validateMsg(text: string) {
    await this.successMessage.waitFor({ state: 'visible', timeout: 18000 });
    expect(await this.successMessage.textContent()).toContain(text);
  }
}
