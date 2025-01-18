// import pw with fixtures
import { test, expect } from '../../fixtures/fixtures';

test.describe('Interacting with shadow DOM', () => {
  test.beforeEach(async ({ shadowPage }) => {
    await shadowPage.goto();
  });

  test('Filling inputs inside shadow DOM', async ({ shadowPage }) => {
    await shadowPage.inputFirstName.fill('Armindo');

    expect(await shadowPage.inputFirstName.inputValue()).toEqual('Armindo');

    // Playwright doesn't works with closed shadow dom
    // await shadowPage.inputLastName.fill('Junior');
    // await shadowPage.inputEmail.fill('test@mailinator.com');
  });
});
