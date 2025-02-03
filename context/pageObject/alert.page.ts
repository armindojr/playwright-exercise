import { Locator, Page, expect } from '@playwright/test';
import Base from './base.page';

const dialogType = {
  alert: {
    text: 'Hey! Welcome to LetCode'
  },
  confirm: {
    text: 'Are you happy with LetCode?'
  },
  prompt: {
    text: 'Enter your name'
  }
};

export default class AlertPage extends Base {
  readonly page: Page;
  readonly btnAccept: Locator;
  readonly btnConfirm: Locator;
  readonly btnPrompt: Locator;
  readonly btnSweetAlert: Locator;
  readonly textMyName: Locator;
  readonly textSweetAlert: Locator;
  readonly modal: Locator;
  readonly modalContent: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.btnAccept = this.page.locator('#accept');
    this.btnConfirm = this.page.locator('#confirm');
    this.btnPrompt = this.page.locator('#prompt');
    this.btnSweetAlert = this.page.locator('#modern');
    this.textMyName = this.page.locator('#myName');
    this.textSweetAlert = this.page.locator('.card-content > .title');
    this.modal = this.page.locator('div.modal.is-active');
    this.modalContent = this.page.locator('div.modal-content');
  }

  /**
   * Navigates to the alert page at '/alert' URL.
   */
  async goto() {
    await super.goto('/alert');
  }

  /**
   * Clicks the "Accept" button to trigger an alert dialog.
   */
  async startAccept() {
    await this.btnAccept.click();
  }

  /**
   * Clicks the "Confirm" button to trigger a confirm dialog.
   */
  async startConfirm() {
    await this.btnConfirm.click();
  }

  /**
   * Clicks the "Prompt" button to trigger a prompt dialog.
   */
  async startPrompt() {
    await this.btnPrompt.click();
  }

  /**
   * Clicks the "Sweet Alert" button to trigger a SweetAlert-style dialog.
   */
  async startSweetAlert() {
    await this.btnSweetAlert.click();
  }

  /**
   * Verifies that the prompt text displays correctly in the user name field.
   * @param text - The expected text to check.
   */
  async checkPrompt(text: string) {
    await super.checkText(this.textMyName, text);
  }

  /**
   * Verifies the content of a SweetAlert dialog.
   * @param text - The expected text to look for in the dialog.
   */
  async checkSweetAlert(text: string) {
    await this.modal.waitFor({ state: 'visible' });
    await expect(this.textSweetAlert).toContainText(text);
  }

  /**
   * Handles different types of dialog events (alert, confirm, prompt).
   * @param type - The type of dialog to handle ('alert', 'confirm', or 'prompt').
   * @param msg - Optional message to send when handling the dialog.
   */
  async handleDialog(type: string, msg?: string) {
    this.page.on('dialog', async dialog => {
      expect(dialog.type()).toContain(type);
      expect(dialog.message()).toContain(dialogType[type].text);
      await dialog.accept(msg);
    });
  }
}
