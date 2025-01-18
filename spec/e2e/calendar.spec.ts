// import pw with fixtures
import { test, expect } from '../../fixtures/fixtures';

test.describe('Interacting with calendar', () => {
  test.beforeEach(async ({ calendarPage }) => {
    await calendarPage.goto();
  });

  test('Selecting today from static calendar', async ({ calendarPage }) => {
    const today = new Date().toLocaleString('en-US', calendarPage.formatDate);
    await calendarPage.btnToday.click();

    expect(await calendarPage.textSelected.textContent()).toContain(`${today}`);
  });

  test('Selecting today from static calendar and clear input', async ({ calendarPage }) => {
    await calendarPage.btnToday.click();
    await calendarPage.btnClear.click();

    await expect(calendarPage.textSelected).toBeHidden();
  });

  test('Selecting today from static calendar and add 10 minutes', async ({ calendarPage }) => {
    const clickCount = 10;
    await calendarPage.btnToday.click();
    const actual = await calendarPage.textSelected.textContent();
    const today = new Date(actual ? actual : '');
    today.setMinutes(today.getMinutes() + clickCount);
    const added = today.toLocaleString('en-US', calendarPage.formatDate);
    await calendarPage.btnNext.click({ clickCount });

    expect(await calendarPage.textSelected.textContent()).toContain(`${added}`);
  });

  test('Selecting range date', async ({ calendarPage }) => {
    await calendarPage.datepickerRange.click();
    await calendarPage.btnYearRange.click();
    await calendarPage.btnConfirmYear.click();
    await calendarPage.btnMonthRange.click();
    await calendarPage.btnConfirmMonth.click();
    await calendarPage.btnDayFrom.click();
    await calendarPage.btnDayTo.click();

    expect(await calendarPage.textSelected.textContent()).toContain('01-Jan-2023 to 12-Jan-2023');
  });
});
