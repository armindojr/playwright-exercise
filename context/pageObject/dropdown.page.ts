import { Locator, Page, expect } from '@playwright/test';
import Base from './base.page';

export default class DropdownPage extends Base {
  readonly page: Page;
  readonly selectCountry: Locator;
  readonly selectFruits: Locator;
  readonly selectLang: Locator;
  readonly selectSuperheroes: Locator;
  readonly optionsLang: Locator;
  readonly textSuccess: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.selectCountry = this.page.locator('#country');
    this.selectFruits = this.page.locator('#fruits');
    this.selectLang = this.page.locator('#lang');
    this.selectSuperheroes = this.page.locator('#superheros');
    this.optionsLang = this.selectLang.locator('option');
    this.textSuccess = this.page.locator('.is-success > .subtitle');
  }

  /**
   * Navigates to the dropdowns page.
   */
  async goto() {
    await super.goto('/dropdowns');
  }

  /**
   * Selects a fruit option from the fruits dropdown by label.
   * @param item - The label of the fruit to select.
   */
  async selectFruit(item: string) {
    await this.selectFruits.selectOption({ label: item });
  }

  /**
   * Handles multiple selections in the superheroes dropdown.
   * @param items - Array of strings representing the superhero options to select.
   */
  async multiSelect(items: Array<string>) {
    const selection: Array<{ label: string }> = [];
    items.forEach(item => {
      selection.push({ label: item });
    });
    await this.selectSuperheroes.selectOption(selection);
  }

  /**
   * Selects the last available option in the language dropdown.
   */
  async selectLast() {
    const opts = await this.optionsLang.count();
    await this.selectLang.selectOption({ index: opts - 1 });
  }

  /**
   * Selects an option from the country dropdown by its value attribute.
   * @param value - The value of the country option to select.
   */
  async selectValue(value: string) {
    await this.selectCountry.selectOption({ value });
  }

  /**
   * Verifies if a specific item appears in the success message.
   * @param item - The item to check for in the success message.
   */
  async checkSelected(item: string) {
    await expect(this.textSuccess).toContainText(item);
  }

  /**
   * Verifies that the selected country matches the provided name.
   * @param name - The expected country name.
   */
  async checkCountry(name: string) {
    await super.checkInputValue(this.selectCountry, name);
  }
}
