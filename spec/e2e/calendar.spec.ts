// import pw with fixtures
import { test } from '../../fixtures';

test.describe('Interacting with calendar', () => {
  test.beforeEach(async ({ calendarPage }) => {
    await calendarPage.goto();
  });

  test('Selecting today from static calendar', async ({ calendarPage }) => {
    const today = calendarPage.formatDate(new Date());
    await calendarPage.selectToday();
    await calendarPage.checkDateSelected(`${today}`);
  });

  test('Selecting today from static calendar and clear input', async ({ calendarPage }) => {
    await calendarPage.selectAndClear();
    await calendarPage.checkDateHidden();
  });

  test('Selecting today from static calendar and add 10 minutes', async ({ calendarPage }) => {
    const date = await calendarPage.addMinutes(10);
    await calendarPage.checkDateSelected(`${date}`);
  });

  test('Selecting range date', async ({ calendarPage }) => {
    const from = { day: '1', month: '01', year: '2023' };
    const to = { day: '12', month: '02', year: '2024' };
    await calendarPage.selectRange({ from, to });
    await calendarPage.checkDateSelected('01-Jan-2023 to 12-Feb-2024');
  });
});
