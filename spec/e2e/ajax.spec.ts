// import pw with fixtures
import { test } from '../../fixtures';

test.describe('Interacting with AJAX requests', () => {
  test.beforeEach(async ({ ajaxPage }) => {
    await ajaxPage.goto();
  });

  test('Handling AJAX requests', async ({ ajaxPage }) => {
    await ajaxPage.triggerAjax();
    await ajaxPage.validateMsg('AJAX');
  });

  test('Handling AJAX requests with mocked response', async ({ ajaxPage }) => {
    const text = 'Mocked Response';
    await ajaxPage.mockData(text);
    await ajaxPage.triggerAjax();
    await ajaxPage.validateMsg(text);
  });
});
