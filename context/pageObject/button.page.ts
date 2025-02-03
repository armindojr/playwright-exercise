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
    this.btnHome = this.page.locator('#home');
    this.btnPosition = this.page.locator('#position');
    this.btnColor = this.page.locator('#color');
    this.btnProperty = this.page.locator('#property');
    this.btnDisabled = this.page.locator('#isDisabled');
  }

  /**
   * Navigates to the buttons page.
   */
  async goto() {
    await super.goto('/buttons');
  }

  /**
   * Clicks the "Home" button.
   */
  async clickHome() {
    await this.btnHome.click();
  }

  /**
   * Gets the background color of the "Color" button.
   * @returns A promise that resolves to the CSS background-color property value of the button.
   */
  async buttonColor() {
    return this.btnColor.evaluate(element =>
      window.getComputedStyle(element).getPropertyValue('background-color')
    );
  }

  /**
   * Gets the bounding box position of the "Position" button.
   * @returns A promise that resolves to the position and dimensions of the button as an object with x, y, width, and height properties.
   */
  async buttonPosition() {
    return await super.getElementBox(this.btnPosition);
  }

  /**
   * Gets the bounding box dimensions of the "Property" button.
   * @returns A promise that resolves to the dimensions of the button as an object with width and height properties.
   */
  async buttonDimension() {
    return await super.getElementBox(this.btnProperty);
  }

  /**
   * Checks if the "Disabled" button is disabled.
   * @returns A promise that resolves to true if the button is disabled, false otherwise.
   */
  async buttonDisabled() {
    return await this.btnDisabled.first().isDisabled();
  }

  /**
   * Simulates a long press on one of the disabled buttons and returns the text content after the action.
   * @returns A promise that resolves to the text content of the button after the long press operation.
   */
  async longPressButton() {
    const buttonList = await this.btnDisabled.all();
    await buttonList[1].click({ delay: 5000 });
    const text = await buttonList[1].textContent();
    if (text === null) {
      return '';
    } else {
      return text;
    }
  }

  /**
   * Asserts that two color values are equal.
   * @param color The actual color value to check.
   * @param code The expected color code.
   */
  async checkColor(color: string, code: string) {
    expect(color).toEqual(code);
  }

  /**
   * Asserts that a button is disabled.
   * @param status The boolean indicating whether the button should be disabled.
   */
  async checkDisabled(status: boolean) {
    expect(status).toEqual(true);
  }

  /**
   * Asserts that the long-pressed button displays the expected text.
   * @param text The actual text displayed after the long press operation.
   */
  async checkPressed(text: string) {
    expect(text).toEqual('Button has been long pressed');
  }

  /**
   * Asserts the dimensions of a button against expected width and height values.
   * @param button An object containing x, y, width, and height properties of the button.
   * @param width The expected minimum width of the button.
   * @param height The expected height of the button.
   */
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

  /**
   * Asserts the position of a button against expected x and y values.
   * @param button An object containing x, y, width, and height properties of the button.
   * @param x The expected minimum x value of the button.
   * @param y The expected y value of the button.
   */
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
