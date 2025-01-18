// import pw with fixtures
import { test, expect } from '../../fixtures/fixtures';

test.describe('Interacting with inputs', () => {
  test.beforeEach(async ({ inputPage }) => {
    await inputPage.goto();
  });

  test('Filling an input', async ({ inputPage }) => {
    const name = 'Armindo Junior';
    await inputPage.inputFullName.fill(name);

    expect(await inputPage.inputFullName.inputValue()).toEqual(name);
  });

  test('Pressing key', async ({ inputPage, page }) => {
    await inputPage.inputJoin.fill('Foo Bar');
    await page.keyboard.press('Tab');
  });

  test('Checking text', async ({ inputPage }) => {
    expect(await inputPage.inputGetMe.inputValue()).toEqual('ortonikc');
  });

  test('Clearing input', async ({ inputPage }) => {
    await inputPage.inputClearMe.clear();

    expect(await inputPage.inputClearMe.inputValue()).toEqual('');
  });

  test('Checking if input is disabled', async ({ inputPage }) => {
    expect(await inputPage.inputDisabled.isDisabled()).toBeTruthy();
  });

  test('Checking if input is read only', async ({ inputPage }) => {
    expect(await inputPage.inputReadOnly.isEditable()).toBeFalsy();
  });
});
