// import pw with fixtures
import { test } from '../../fixtures';

test.describe('Interacting with iframes', () => {
  test.beforeEach(async ({ iframePage }) => {
    await iframePage.goto();
  });

  test('Filling inputs inside iframe', async ({ iframePage }) => {
    const firstName = 'Armindo';
    const lastName = 'Junior';
    await iframePage.fillName(firstName, lastName);
    await iframePage.checkName(firstName, lastName);
  });

  test('Filling an input inside nested iframe', async ({ iframePage }) => {
    const email = 'test@mailinator.com';
    await iframePage.fillEmail(email);
    await iframePage.checkEmail(email);
  });
});
