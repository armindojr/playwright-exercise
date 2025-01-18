import { Locator, Page } from '@playwright/test';

export default class Base {
  readonly page: Page;
  readonly btnWorkspaces: Locator;

  constructor(page: Page) {
    this.page = page;

    // Navbar locators
    this.btnWorkspaces = this.page.locator('a#testing');
  }

  async goto(path: string) {
    await this.page.goto(path);
  }

  async getElementCoordinates(el: Locator) {
    await el.waitFor({ state: 'visible' });
    const result = await el.boundingBox();

    if (result) {
      return result;
    } else {
      throw new Error("Element doesn't have boundary or is inaccessible!");
    }
  }
}
