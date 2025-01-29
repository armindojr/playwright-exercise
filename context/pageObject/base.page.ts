import { Locator, Page, expect } from '@playwright/test';

export default class Base {
  readonly page: Page;
  readonly btnWorkspaces: Locator;

  constructor(page: Page) {
    this.page = page;
    this.btnWorkspaces = this.page.locator('a#testing');
  }

  async goto(path: string) {
    await this.page.goto(path);
  }

  async checkText(el: Locator, text: string) {
    expect(await el.textContent()).toContain(text);
  }

  async checkUrl(url: string) {
    expect(this.page.url()).toEqual(url);
  }

  async getElementBox(el: Locator) {
    await el.waitFor({ state: 'visible' });
    const result = await el.boundingBox();

    if (result) {
      return result;
    } else {
      throw new Error("Element doesn't have boundary or is inaccessible!");
    }
  }
}
