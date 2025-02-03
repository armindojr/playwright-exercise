// import pw with fixtures
import { test } from '../../fixtures';

test.describe('Interacting with shadow DOM', () => {
  test.beforeEach(async ({ shadowPage }) => {
    await shadowPage.goto();
  });

  test('Filling inputs inside open shadow DOM', async ({ shadowPage }) => {
    const name = 'Armindo';
    await shadowPage.fillFirstName(name);
    await shadowPage.checkFirstName(name);
  });

  /**
   * Playwright doesn't support closed shadow dom
   * Reference: https://playwright.dev/docs/locators#locate-in-shadow-dom
   */
  test.skip('Filling inputs inside closed shadow DOM', async ({ shadowPage }) => {
    const lastName = 'Junior';
    const email = 'test@mailinator.com';
    await shadowPage.fillClosedShadow(lastName, email);
    await shadowPage.checkClosed(lastName, email);
  });
});
