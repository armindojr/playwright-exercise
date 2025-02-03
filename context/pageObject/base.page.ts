import { Locator, Page, expect } from '@playwright/test';

export default class Base {
  readonly page: Page;
  readonly btnWorkspaces: Locator;

  constructor(page: Page) {
    this.page = page;
    this.btnWorkspaces = this.page.locator('#testing');
  }

  /**
   * Navigates to a specified URL path using the Playwright Page.goto() method.
   *
   * @param {string} path - The path to navigate to.
   */
  async goto(path: string) {
    await this.page.goto(path);
  }

  /**
   * Checks if a specified text exists within the content of an element.
   *
   * @param {Locator} el - The locator identifying the element to check.
   * @param {string} text - The text to search for within the element's content.
   */
  async checkText(el: Locator, text: string) {
    await expect(el).toContainText(text);
  }

  /**
   * Verifies that an input element has a specified value.
   *
   * @param {Locator} el - The locator identifying the input element to check.
   * @param {string} text - The expected value of the input.
   */
  async checkInputValue(el: Locator, text: string) {
    await expect(el).toHaveValue(text);
  }

  /**
   * Verifies that the current page URL matches the specified URL.
   *
   * @param {string} url - The expected URL to compare against.
   */
  async checkUrl(url: string) {
    expect(this.page.url()).toEqual(url);
  }

  /**
   * Retrieves and returns the bounding box of an element, ensuring it is visible before attempting to get its dimensions.
   *
   * @param {Locator} el - The locator identifying the element to get the bounding box for.
   */
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
