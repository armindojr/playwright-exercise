// import pw with fixtures
import { test, expect } from '../../fixtures';

test.describe('Interacting with Radio buttons and checkboxes', () => {
  test.beforeEach(async ({ radioPage }) => {
    await radioPage.goto();
  });

  test('Selecting an option on radio button', async ({ radioPage }) => {
    await radioPage.radioYes.check();
    await radioPage.radioNo.check();

    expect(await radioPage.radioYes.isChecked()).toBeFalsy();
    expect(await radioPage.radioNo.isChecked()).toBeTruthy();
  });

  test("Selecting radio button don't uncheck another", async ({ radioPage }) => {
    await radioPage.radioBug.check();
    await radioPage.radioNoBug.check();

    expect(!(await radioPage.radioBug.isChecked())).toBeFalsy();
  });

  test('Finding wich radio button is checked', async ({ radioPage }) => {
    expect(await radioPage.radioChecked.textContent()).toContain('Bar');
  });

  test('Checking if radio button is enabled', async ({ radioPage }) => {
    expect(await radioPage.radioDisabled.isEnabled()).toBeFalsy();
  });

  test('Confirming if checkbox is checked', async ({ radioPage }) => {
    expect(await radioPage.checkboxRemember.isChecked()).toBeTruthy();
  });

  test('Checking checkbox of terms agreement', async ({ radioPage }) => {
    await radioPage.checkboxAccept.check();

    expect(await radioPage.checkboxAccept.isChecked()).toBeTruthy();
  });
});
