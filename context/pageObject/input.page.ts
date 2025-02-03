import { Locator, Page, expect } from '@playwright/test';
import Base from './base.page';

export default class InputPage extends Base {
  readonly page: Page;
  readonly inputFullName: Locator;
  readonly inputJoin: Locator;
  readonly inputGetMe: Locator;
  readonly inputClearMe: Locator;
  readonly inputDisabled: Locator;
  readonly inputReadOnly: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.inputFullName = this.page.locator('#fullName');
    this.inputJoin = this.page.locator('#join');
    this.inputGetMe = this.page.locator('#getMe');
    this.inputClearMe = this.page.locator('#clearMe');
    this.inputDisabled = this.page.locator('#noEdit');
    this.inputReadOnly = this.page.locator('#dontwrite');
  }

  /**
   * Navigates to the edit page.
   */
  async goto() {
    await super.goto('/edit');
  }

  /**
   * Fills in the full name input field with the given name.
   * @param {string} name - The name to be entered into the full name field
   */
  async fillName(name: string) {
    await this.inputFullName.fill(name);
  }

  /**
   * Fills the join input field with the provided text and moves focus to the next element.
   * @param {string} text - The text to be entered into the join field
   */
  async fillAndFocus(text: string) {
    await this.inputJoin.fill(text);
    await this.page.keyboard.press('Tab');
  }

  /**
   * Clears the input field.
   */
  async clearInput() {
    await this.inputClearMe.clear();
  }

  /**
   * Verifies that the full name input field contains the specified value.
   * @param {string} name - The expected name in the full name field
   */
  async checkName(name: string) {
    await super.checkInputValue(this.inputFullName, name);
  }

  /**
   * Verifies that the get me input field is focused.
   */
  async checkFocus() {
    await expect(this.inputGetMe).toBeFocused();
  }

  /**
   * Checks if the specified text is present inside the get me input field.
   * @param {string} text - The text to verify inside the get me field
   */
  async checkTextInside(text: string) {
    await super.checkInputValue(this.inputGetMe, text);
  }

  /**
   * Verifies that the cleared input field is empty.
   */
  async checkClearedInput() {
    await super.checkInputValue(this.inputClearMe, '');
  }

  /**
   * Verifies that the disabled input field is actually disabled.
   */
  async checkDisabled() {
    expect(await this.inputDisabled.isDisabled()).toBeTruthy();
  }

  /**
   * Verifies whether the specified text field is editable or not.
   */
  async checkEditable() {
    expect(await this.inputReadOnly.isEditable()).toBeFalsy();
  }
}
