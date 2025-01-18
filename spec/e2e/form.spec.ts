// import pw with fixtures
import { test } from '../../fixtures/fixtures';

test.describe('Interacting with form', () => {
  test.beforeEach(async ({ formsPage }) => {
    await formsPage.goto();
  });

  test('Filling form with random data', async ({ formsPage, page }) => {
    await formsPage.fillForm();
    await formsPage.submit.click();
    await page.waitForTimeout(2000);
  });
});
