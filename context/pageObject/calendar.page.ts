import { Locator, Page, expect } from '@playwright/test';
import Base from './base.page';

const format: Intl.DateTimeFormatOptions = {
  month: 'numeric',
  day: 'numeric',
  year: '2-digit',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true
};

export default class CalendarPage extends Base {
  readonly page: Page;
  readonly datepicker: Locator;
  readonly datepickerRange: Locator;
  readonly btnToday: Locator;
  readonly btnNext: Locator;
  readonly btnClear: Locator;
  readonly btnYearRange: Locator;
  readonly btnConfirmYear: Locator;
  readonly btnMonthRange: Locator;
  readonly btnConfirmMonth: Locator;
  readonly btnDayRange: Locator;
  readonly btnDayFrom: Locator;
  readonly btnDayTo: Locator;
  readonly modalRange: Locator;
  readonly textSelected: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.datepicker = this.page.locator('nwb-date-picker');
    this.btnToday = this.datepicker.getByRole('button', { name: 'Today' });
    this.btnNext = this.datepicker.locator('.timepicker-minutes > span.timepicker-next');
    this.btnClear = this.datepicker.getByRole('button', { name: 'Clear' });
    this.modalRange = this.page.locator('div.datepicker.is-active');
    this.btnYearRange = this.modalRange.locator(
      'div.datepicker-nav > div > div.datepicker-nav-year'
    );
    this.btnMonthRange = this.modalRange.locator(
      'div.datepicker-nav > div > div.datepicker-nav-month'
    );
    this.btnDayRange = this.modalRange.locator('div.is-current-month');
    this.textSelected = this.page.getByText('You have selected');
  }

  async goto() {
    await super.goto('/calendar');
  }

  formatDate(date: Date) {
    return date.toLocaleString('en-US', format);
  }

  async selectToday() {
    await this.btnToday.click();
  }

  async selectAndClear() {
    await this.selectToday();
    await this.btnClear.click();
  }

  async addMinutes(clickCount: number) {
    await this.selectToday();
    const actualDate = await this.textSelected.textContent();
    const today = new Date(actualDate ? actualDate : '');
    today.setMinutes(today.getMinutes() + clickCount);
    await this.btnNext.click({ clickCount });

    return this.formatDate(today);
  }

  async selectRange(options: {
    from: { day: string; month: string; year: string };
    to: { day: string; month: string; year: string };
  }) {
    // open range
    await this.datepicker.nth(1).click();

    // from
    await this.btnYearRange.click();
    await this.modalRange.locator(`div[data-year="${options.from.year}"]`).click();
    await this.btnMonthRange.click();
    await this.modalRange.locator(`div[data-month="${options.from.month}"]`).click();
    await this.btnDayRange.getByRole('button', { name: options.from.day, exact: true }).click();

    // to
    await this.btnYearRange.click();
    await this.modalRange.locator(`div[data-year="${options.to.year}"]`).click();
    await this.btnMonthRange.click();
    await this.modalRange.locator(`div[data-month="${options.to.month}"]`).click();
    await this.btnDayRange.getByRole('button', { name: options.to.day, exact: true }).click();
  }

  async checkDateSelected(text: string) {
    expect(await this.textSelected.textContent()).toContain(text);
  }

  async checkDateHidden() {
    await expect(this.textSelected).toBeHidden();
  }
}
