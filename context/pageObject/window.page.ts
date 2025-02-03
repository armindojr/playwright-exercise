import { BrowserContext, Locator, Page } from '@playwright/test';
import Base from './base.page';

export default class WindowPage extends Base {
  readonly page: Page;
  readonly context: BrowserContext | undefined;
  readonly btnHome: Locator;

  constructor(page: Page, context?: BrowserContext) {
    super(page);
    this.page = page;
    this.context = context;
    this.btnHome = this.page.locator('#home');
  }

  async goto() {
    await super.goto('/windows');
  }

  pagePromise() {
    if (this.context) {
      return this.context.waitForEvent('page');
    }
  }

  popupPromise() {
    return this.page.waitForEvent('popup');
  }
}
