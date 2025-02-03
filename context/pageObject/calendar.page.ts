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
    this.btnNext = this.datepicker.locator('.timepicker-minutes > .timepicker-next');
    this.btnClear = this.datepicker.getByRole('button', { name: 'Clear' });
    this.modalRange = this.page.locator('.datepicker.is-active');
    this.btnYearRange = this.modalRange.locator('.datepicker-nav-year');
    this.btnMonthRange = this.modalRange.locator('.datepicker-nav-month');
    this.btnDayRange = this.modalRange.locator('.is-current-month');
    this.textSelected = this.page.getByText('You have selected');
  }

  /**
   * Navigates to the calendar page.
   */
  async goto() {
    await super.goto('/calendar');
  }

  /**
   * Formats a given date into a string using the specified format options.
   * @param date - The Date object to be formatted.
   * @returns A string representing the formatted date.
   */
  formatDate(date: Date) {
    return date.toLocaleString('en-US', format);
  }

  /**
   * Selects today's date from the calendar.
   */
  async selectToday() {
    await this.btnToday.click();
  }

  /**
   * Selects today's date and then clears any selected dates.
   */
  async selectAndClear() {
    await this.selectToday();
    await this.btnClear.click();
  }

  /**
   * Adds a specified number of minutes to the current time and selects the new time from the calendar.
   * @param clickCount - The number of times to click the next minute button.
   * @returns A string representing the formatted date after adding minutes.
   */
  async addMinutes(clickCount: number) {
    await this.selectToday();
    const actualDate = await this.textSelected.textContent();
    const today = new Date(actualDate ? actualDate : '');
    today.setMinutes(today.getMinutes() + clickCount);
    await this.btnNext.click({ clickCount });

    return this.formatDate(today);
  }

  /**
   * Selects a range of dates from the calendar using provided day, month, and year for both start and end of the range.
   * @param options - An object containing details about the date range to be selected:
   *                {
   *                  from: { day: string; month: string; year: string },
   *                  to: { day: string; month: string; year: string }
   *                }
   */
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

  /**
   * Checks if the text of the selected date contains a specific string.
   * @param text - The string to check against the text of the selected date.
   */
  async checkDateSelected(text: string) {
    await expect(this.textSelected).toContainText(text);
  }

  /**
   * Asserts that the text element showing the selected date is hidden.
   */
  async checkDateHidden() {
    await expect(this.textSelected).toBeHidden();
  }
}
