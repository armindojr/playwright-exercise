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
    this.btnAccept = this.page.locator('button#accept');
    this.btnConfirm = this.page.locator('button#confirm');
    this.btnPrompt = this.page.locator('button#prompt');
    this.btnSweetAlert = this.page.locator('button#modern');
    this.textMyName = this.page.locator('p#myName');
    this.textSweetAlert = this.page.locator('p.title');
    this.modal = this.page.locator('div.modal.is-active');
    this.modalContent = this.page.locator('div.modal-content');
  }

  async goto() {
    await super.goto('/alert');
  }

  async startAccept() {
    await this.btnAccept.click();
  }

  async startConfirm() {
    await this.btnConfirm.click();
  }

  async startPrompt() {
    await this.btnPrompt.click();
  }

  async startSweetAlert() {
    await this.btnSweetAlert.click();
  }

  async checkPrompt(text: string) {
    await super.checkText(this.textMyName, text);
  }

  async checkSweetAlert(text: string) {
    await this.modal.waitFor({ state: 'visible' });
    expect(await this.textSweetAlert.textContent()).toContain(text);
  }

  async handleDialog(type: string, msg?: string) {
    this.page.on('dialog', async dialog => {
      expect(dialog.type()).toContain(type);
      expect(dialog.message()).toContain(dialogType[type].text);
      await dialog.accept(msg);
    });
  }
}
