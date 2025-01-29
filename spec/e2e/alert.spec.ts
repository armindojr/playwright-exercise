// import pw with fixtures
import { test } from '../../fixtures';

test.describe('Interacting with alerts', () => {
  test.beforeEach(async ({ alertPage }) => {
    await alertPage.goto();
  });

  test('Handling accept alert', async ({ alertPage }) => {
    alertPage.handleDialog('alert');
    await alertPage.startAccept();
  });

  test('Handling confirm alert', async ({ alertPage }) => {
    alertPage.handleDialog('confirm');
    await alertPage.startConfirm();
  });

  test('Handling prompt alert', async ({ alertPage }) => {
    const name = 'Armindo Junior';
    alertPage.handleDialog('prompt', name);
    await alertPage.startPrompt();
    await alertPage.checkPrompt(name);
  });

  test('Handling sweet alert', async ({ alertPage }) => {
    await alertPage.startSweetAlert();
    await alertPage.checkSweetAlert('Modern Alert');
  });
});
