// import pw with fixtures
import { test } from '../../fixtures';

test.describe('Interacting with inputs', () => {
  test.beforeEach(async ({ inputPage }) => {
    await inputPage.goto();
  });

  test('Filling an input', async ({ inputPage }) => {
    const name = 'Armindo Junior';
    await inputPage.fillName(name);
    await inputPage.checkName(name);
  });

  test('Pressing key', async ({ inputPage }) => {
    await inputPage.fillAndFocus('Foo Bar');
    await inputPage.checkFocus();
  });

  test('Checking text', async ({ inputPage }) => {
    await inputPage.checkTextInside('ortonikc');
  });

  test('Clearing input', async ({ inputPage }) => {
    await inputPage.clearInput();
    await inputPage.checkClearedInput();
  });

  test('Checking if input is disabled', async ({ inputPage }) => {
    await inputPage.checkDisabled();
  });

  test('Checking if input is read only', async ({ inputPage }) => {
    await inputPage.checkEditable();
  });
});
