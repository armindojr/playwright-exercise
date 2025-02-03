import { FrameLocator, Locator, Page } from '@playwright/test';
import Base from './base.page';

export default class IframePage extends Base {
  readonly page: Page;
  readonly frame: FrameLocator;
  readonly innerFrame: FrameLocator;
  readonly inputName: Locator;
  readonly inputLname: Locator;
  readonly inputEmail: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.frame = this.page.frameLocator('iframe#firstFr');
    this.innerFrame = this.frame.frameLocator('iframe[src="innerFrame"]');
    this.inputName = this.frame.locator('input[name="fname"]');
    this.inputLname = this.frame.locator('input[name="lname"]');
    this.inputEmail = this.innerFrame.locator('input[name="email"]');
  }

  /**
   * Navigates to the iframe page at '/frame'.
   */
  async goto() {
    await super.goto('/frame');
  }

  /**
   * Fills in the first name and last name fields within the outer iframe.
   * @param firstName - The first name to be entered into the input field.
   * @param lastName - The last name to be entered into the input field.
   */
  async fillName(firstName: string, lastName: string) {
    await this.inputName.fill(firstName);
    await this.inputLname.fill(lastName);
  }

  /**
   * Fills in the email address field within the inner iframe.
   * @param email - The email address to be entered into the input field.
   */
  async fillEmail(email: string) {
    await this.inputEmail.fill(email);
  }

  /**
   * Verifies that the first name and last name fields contain the expected values.
   * @param firstName - The expected first name value.
   * @param lastName - The expected last name value.
   */
  async checkName(firstName: string, lastName: string) {
    await super.checkInputValue(this.inputName, firstName);
    await super.checkInputValue(this.inputLname, lastName);
  }

  /**
   * Verifies that the email address field contains the expected value.
   * @param email - The expected email address value.
   */
  async checkEmail(email: string) {
    await super.checkInputValue(this.inputEmail, email);
  }
}
