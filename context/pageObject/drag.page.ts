import { Locator, Page, expect } from '@playwright/test';
import Base from './base.page';

export default class DragPage extends Base {
  readonly page: Page;
  private divSampleBox: Locator;
  private dragBox: Locator;
  private destBox: Locator;
  private todoList: Locator;
  private doneList: Locator;
  private itemList: Locator;
  private firstList: Locator;
  private lastList: Locator;
  private selectedItems: Locator;
  private slider: Locator;
  private getCountries: Locator;
  private countriesList: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.divSampleBox = this.page.locator('#sample-box');
    this.dragBox = this.page.locator('#draggable');
    this.destBox = this.page.locator('#droppable');
    this.todoList = this.page.locator('#cdk-drop-list-0');
    this.doneList = this.page.locator('#cdk-drop-list-1');
    this.itemList = this.todoList.getByText('Go home');
    this.firstList = this.page.getByText('Postman');
    this.lastList = this.page.getByText('Webdriver.io');
    this.selectedItems = this.page.locator('.ui-selected');
    this.slider = this.page.locator('#generate');
    this.getCountries = this.page.locator('button.is-primary');
    this.countriesList = this.page.locator('p.has-text-primary-light');
  }

  /**
   * Navigates to the draggable page.
   */
  async gotoDrag() {
    await super.goto('/draggable');
  }

  /**
   * Navigates to the droppable page.
   */
  async gotoDrop() {
    await super.goto('/dropable');
  }

  /**
   * Navigates to the sortable page.
   */
  async gotoSort() {
    await super.goto('/sortable');
  }

  /**
   * Navigates to the selectable page.
   */
  async gotoSelect() {
    await super.goto('/selectable');
  }

  /**
   * Navigates to the slider page.
   */
  async gotoSlider() {
    await super.goto('/slider');
  }

  /**
   * Returns the coordinates of the sample box.
   * @returns The coordinates of the sample box.
   */
  async getCoordinates() {
    return await super.getElementBox(this.divSampleBox);
  }

  /**
   * Moves the mouse inside the sample box and performs a drag-and-drop operation.
   * @param x - The initial X coordinate.
   * @param y - The initial Y coordinate.
   */
  async moveInsideBox(x: number, y: number) {
    await this.page.mouse.move(x, y, { steps: 10 });
    await this.divSampleBox.hover();
    await this.page.mouse.down();
    await this.page.mouse.move(x + 200, y + 200, { steps: 10 });
    await this.page.mouse.up();
  }

  /**
   * Performs drag-and-drop of the draggable element to the destination box.
   */
  async dragElementToBox() {
    await this.dragBox.dragTo(this.destBox);
  }

  /**
   * Drags an item from the To Do list to the Done list.
   */
  async dragElementToList() {
    const start = await super.getElementBox(this.itemList);
    const finish = await super.getElementBox(this.doneList);

    await this.page.mouse.move(start.x, start.y, { steps: 10 });
    await this.itemList.hover();
    await this.page.mouse.down();
    await this.page.mouse.move(finish.x + 200, finish.y, { steps: 10 });
    await this.page.mouse.up();
  }

  /**
   * Drags an item from the first to the last position in a list.
   */
  async dragToSelectList() {
    const first = await super.getElementBox(this.firstList);
    const last = await super.getElementBox(this.lastList);

    await this.page.mouse.move(first.x, first.y, { steps: 10 });
    await this.page.mouse.down();
    await this.page.mouse.move(last.x, last.y, { steps: 10 });
    await this.page.mouse.up();
  }

  /**
   * Drags the slider to select a specific number of countries.
   * @param count - The number of countries to be selected.
   */
  async dragSliderCountries(count: number) {
    const value = count * 14.4;
    await this.slider.dragTo(this.slider, {
      sourcePosition: { x: 0, y: 0 },
      targetPosition: { x: value, y: 0 }
    });
  }

  /**
   * Clicks the button to view the list of countries.
   */
  async viewCountries() {
    await this.getCountries.click();
  }

  /**
   * Checks if the initial and final coordinates are within expected ranges.
   * @param startX - The initial X coordinate.
   * @param finishX - The final X coordinate.
   * @param startY - The initial Y coordinate.
   * @param finishY - The final Y coordinate.
   */
  async checkCoord(startX: number, finishX: number, startY: number, finishY: number) {
    expect(startX).toBeLessThan(finishX);
    expect(startY).toBeLessThan(finishY);
  }

  /**
   * Checks if the element was dropped correctly.
   */
  async checkElementDropped() {
    expect(this.destBox.locator('p')).toHaveText('Dropped!');
  }

  /**
   * Checks if an item was added to the Done list.
   */
  async checkListAdded() {
    await expect(this.doneList.locator('#sample-box1')).toHaveCount(6);
  }

  /**
   * Checks if three items were selected.
   */
  async checkListSelected() {
    await expect(this.selectedItems).toHaveCount(3);
  }

  /**
   * Checks the number of countries in the list.
   * @param count - The expected number of countries.
   */
  async checkCountries(count: number) {
    const separator = ' - ';
    const items = await this.countriesList.textContent();

    if (items !== null) {
      expect(items.split(separator).length).toEqual(count);
    } else {
      throw new Error('Countries list not found!');
    }
  }
}
