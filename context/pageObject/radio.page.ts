import { Locator, Page, expect } from '@playwright/test';
import Base from './base.page';

export default class RadioPage extends Base {
  readonly page: Page;
  readonly radioYes: Locator;
  readonly radioNo: Locator;
  readonly radioBug: Locator;
  readonly radioNoBug: Locator;
  readonly checked: Locator;
  readonly radioChecked: Locator;
  readonly radioDisabled: Locator;
  readonly checkboxRemember: Locator;
  readonly checkboxAccept: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.radioYes = this.page.locator('#one');
    this.radioNo = this.page.locator('#two');
    this.radioBug = this.page.locator('#bug');
    this.radioNoBug = this.page.locator('#nobug');
    this.checked = this.page.locator('input:checked');
    this.radioChecked = this.page.locator('.radio', { has: this.checked });
    this.radioDisabled = this.page.locator('#maybe');
    this.checkboxRemember = this.page.getByText('Remember me');
    this.checkboxAccept = this.page.getByText('I agree to the');
  }

  /**
   * Navigates to the radio page.
   */
  async goto() {
    await super.goto('/radio');
  }

  /**
   * Marks both 'Yes' and 'No' radio buttons by checking them one after another.
   */
  async markOne() {
    await this.radioYes.check();
    await this.radioNo.check();
  }

  /**
   * Selects the bug-related radio options.
   */
  async markBug() {
    await this.radioBug.check();
    await this.radioNoBug.check();
  }

  /**
   * Verifies that the 'Yes' radio button is unchecked and the 'No' radio button is checked.
   */
  async checkRadio() {
    expect(await this.radioYes.isChecked()).toBeFalsy();
    expect(await this.radioNo.isChecked()).toBeTruthy();
  }

  /**
   * Checks if the bug-related option is selected.
   */
  async checkBug() {
    expect(!(await this.radioBug.isChecked())).toBeFalsy();
  }

  /**
   * Verifies that the disabled radio button is not enabled.
   */
  async checkEnabled() {
    expect(await this.radioDisabled.isEnabled()).toBeFalsy();
  }

  /**
   * Checks if the "Remember me" checkbox is marked (checked).
   */
  async checkMarked() {
    expect(await this.checkboxRemember.isChecked()).toBeTruthy();
  }

  /**
   * This method accepts the agreement by checking the checkbox.
   */
  async acceptAgreement() {
    await this.checkboxAccept.check();
  }

  /**
   * Verifies that the agreement checkbox is checked.
   */
  async checkTerm() {
    expect(await this.checkboxAccept.isChecked()).toBeTruthy();
  }

  /**
   * Verifies that the specified radio button with the given text is checked.
   */
  async findRadioChecked(text: string) {
    super.checkText(this.radioChecked, text);
  }
}
