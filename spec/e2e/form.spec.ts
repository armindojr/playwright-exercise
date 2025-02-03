// import pw with fixtures
import { test } from '../../fixtures';

test.describe('Interacting with form', () => {
  test.beforeEach(async ({ formsPage }) => {
    await formsPage.goto();
  });

  test('Filling form with random data', async ({ formsPage }) => {
    const msg = 'The account has been successfully created!';
    await formsPage.fillForm();
    await formsPage.checkSubmition(msg);
  });
});
