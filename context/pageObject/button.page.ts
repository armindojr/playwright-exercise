import { Locator, Page, expect } from '@playwright/test';
import Base from './base.page';

export default class ButtonPage extends Base {
  readonly page: Page;
  readonly btnHome: Locator;
  readonly btnPosition: Locator;
  readonly btnColor: Locator;
  readonly btnProperty: Locator;
  readonly btnDisabled: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.btnHome = this.page.locator('button#home');
    this.btnPosition = this.page.locator('button#position');
    this.btnColor = this.page.locator('button#color');
    this.btnProperty = this.page.locator('button#property');
    this.btnDisabled = this.page.locator('button#isDisabled');
  }

  async goto() {
    await super.goto('/buttons');
  }

  async clickHome() {
    await this.btnHome.click();
  }

  async buttonColor() {
    return this.btnColor.evaluate(element =>
      window.getComputedStyle(element).getPropertyValue('background-color')
    );
  }

  async buttonPosition() {
    return await super.getElementBox(this.btnPosition);
  }

  async buttonDimension() {
    return await super.getElementBox(this.btnProperty);
  }

  async buttonDisabled() {
    return await this.btnDisabled.first().isDisabled();
  }

  async longPressButton() {
    const buttonList = await this.btnDisabled.all();
    await buttonList[1].click({ delay: 5000 });
    return await buttonList[1].textContent();
  }

  async checkColor(color: string, code: string) {
    expect(color).toEqual(code);
  }

  async checkDisabled(status: boolean) {
    expect(status).toEqual(true);
  }

  async checkPressed(text: string) {
    expect(text).toEqual('Button has been long pressed');
  }

  async checkDimensions(
    button: {
      x: number;
      y: number;
      width: number;
      height: number;
    },
    width: number,
    height: number
  ) {
    expect(button.height).toEqual(height);
    expect(button.width).toBeGreaterThanOrEqual(width);
    expect(button.width).toBeLessThanOrEqual(width + 2);
  }

  async checkPosition(
    button: {
      x: number;
      y: number;
      width: number;
      height: number;
    },
    x: number,
    y: number
  ) {
    expect(button.x).toBeGreaterThanOrEqual(x);
    expect(button.y).toEqual(y);
  }
}
