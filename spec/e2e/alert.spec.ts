// import pw with fixtures
import { test, expect } from '../../fixtures/fixtures';

test.describe('Interacting with alerts', () => {
  test.beforeEach(async ({ alertPage }) => {
    await alertPage.goto();
  });

  test('Handling accept alert', async ({ alertPage }) => {
    alertPage.handleDialog({ type: 'alert', text: 'Hey! Welcome to LetCode' });
    await alertPage.btnAccept.click();
  });

  test('Handling confirm alert', async ({ alertPage }) => {
    alertPage.handleDialog({ type: 'confirm', text: 'Are you happy with LetCode?' });
    await alertPage.btnConfirm.click();
  });

  test('Handling prompt alert', async ({ alertPage }) => {
    const msg = 'Armindo Junior';
    alertPage.handleDialog({ type: 'prompt', text: 'Enter your name', msg });
    await alertPage.btnPrompt.click();

    expect(await alertPage.textMyName.textContent()).toContain(msg);
  });

  test('Handling sweet alert', async ({ alertPage }) => {
    await alertPage.btnSweetAlert.click();
    await alertPage.modal.waitFor({ state: 'visible' });

    expect(await alertPage.textSweetAlert.textContent()).toContain('Modern Alert');
  });
});
