// import pw with fixtures
import { test, expect } from '../../fixtures';

test.describe('Interacting with iframes', () => {
  test.beforeEach(async ({ iframePage }) => {
    await iframePage.goto();
  });

  test('Filling inputs inside iframe', async ({ iframePage }) => {
    await iframePage.inputName.fill('Armindo');
    await iframePage.inputLname.fill('Junior');

    expect(await iframePage.inputName.inputValue()).toEqual('Armindo');
    expect(await iframePage.inputLname.inputValue()).toEqual('Junior');
  });

  test('Filling an input inside nested iframe', async ({ iframePage }) => {
    await iframePage.inputEmail.fill('test@mailinator.com');

    expect(await iframePage.inputEmail.inputValue()).toEqual('test@mailinator.com');
  });
});
