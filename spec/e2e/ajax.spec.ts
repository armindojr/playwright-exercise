// import pw with fixtures
import { test, expect } from '../../fixtures/fixtures';

test.describe('Interacting with AJAX requests', () => {
  test.beforeEach(async ({ ajaxPage }) => {
    await ajaxPage.goto();
  });

  test('Handling AJAX requests', async ({ ajaxPage }) => {
    await ajaxPage.btn.click();
    await ajaxPage.successMessage.waitFor({ state: 'visible', timeout: 18000 });

    expect(await ajaxPage.successMessage.textContent()).toContain('AJAX');
  });

  test('Handling AJAX requests with mocked response', async ({ ajaxPage }) => {
    const text = 'Mocked Response';
    await ajaxPage.mockData(text);
    await ajaxPage.btn.click();
    await ajaxPage.successMessage.waitFor({ state: 'visible', timeout: 16000 });

    expect(await ajaxPage.successMessage.textContent()).toEqual(text);
  });
});
