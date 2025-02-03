// import pw with fixtures
import { test } from '../../fixtures';

test.describe('Interacting with Radio buttons and checkboxes', () => {
  test.beforeEach(async ({ radioPage }) => {
    await radioPage.goto();
  });

  test('Selecting an option on radio button', async ({ radioPage }) => {
    await radioPage.markOne();
    await radioPage.checkRadio();
  });

  test("Selecting radio button don't uncheck another", async ({ radioPage }) => {
    await radioPage.markBug();
    await radioPage.checkBug();
  });

  test('Finding wich radio button is checked', async ({ radioPage }) => {
    await radioPage.findRadioChecked('Bar');
  });

  test('Checking if radio button is enabled', async ({ radioPage }) => {
    await radioPage.checkEnabled();
  });

  test('Confirming if checkbox is checked', async ({ radioPage }) => {
    await radioPage.checkMarked();
  });

  test('Checking checkbox of terms agreement', async ({ radioPage }) => {
    await radioPage.acceptAgreement();
    await radioPage.checkTerm();
  });
});
