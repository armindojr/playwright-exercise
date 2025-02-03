import { Locator, Page } from '@playwright/test';
import Base from './base.page';

export default class ShadowPage extends Base {
  readonly page: Page;
  readonly inputFirstName: Locator;
  readonly inputLastName: Locator;
  readonly inputEmail: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.inputFirstName = this.page.locator('#fname');
    this.inputLastName = this.page.locator('#lname');
    this.inputEmail = this.page.locator('#email');
  }

  /**
   * Navigates to the shadow DOM page.
   */
  async goto() {
    await super.goto('/shadow');
  }

  /**
   * Fills in the first name input field with the provided name.
   * @param {string} name - The first name to be filled into the input field.
   */
  async fillFirstName(name: string) {
    await this.inputFirstName.fill(name);
  }

  /**
   * Fills in the last name and email input fields with the provided information.
   * @param {string} last - The last name to be filled into the input field.
   * @param {string} email - The email address to be filled into the input field.
   */
  async fillClosedShadow(last: string, email: string) {
    await this.inputLastName.fill(last);
    await this.inputEmail.fill(email);
  }

  /**
   * Checks if the first name input field contains the specified value.
   * @param {string} name - The expected value to check in the first name field.
   */
  async checkFirstName(name: string) {
    super.checkInputValue(this.inputFirstName, name);
  }

  /**
   * Checks if the last name and email input fields contain the specified values.
   * @param {string} last - The expected value to check in the last name field.
   * @param {string} email - The expected value to check in the email field.
   */
  async checkClosed(last: string, email: string) {
    super.checkInputValue(this.inputLastName, last);
    super.checkInputValue(this.inputEmail, email);
  }
}
