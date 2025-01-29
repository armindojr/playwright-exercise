// import pw with fixtures
import { test, expect } from '../../fixtures';

test.describe('Creating explicit wait during test', () => {
  test('Wait for button to be visible', async ({ buttonPage, page }) => {
    await buttonPage.goto();
    await buttonPage.btnHome.waitFor({ state: 'visible' });

    expect(await page.title()).toEqual('Interact with Button fields');
  });

  test('Wait for button to be invisible', async ({ buttonPage, dropdownPage, page }) => {
    await dropdownPage.goto();
    await buttonPage.btnHome.waitFor({ state: 'detached' });

    expect(await page.title()).toEqual('LetCode with Koushik');
  });

  test('Wait for text to be visible', async ({ homePage, page }) => {
    await homePage.goto();
    await homePage.btnWorkspaces.click();
    await homePage.textWorkspaces.waitFor({ state: 'visible' });

    expect(await page.title()).toEqual('LetCode - Testing Hub');
  });

  test('Wait for alert to be hidden and present in DOM', async ({ alertPage, page }) => {
    await alertPage.goto();
    await alertPage.modalContent.waitFor({ state: 'attached' });
    await alertPage.modalContent.waitFor({ state: 'hidden' });

    expect(await page.title()).toEqual('LetCode with Koushik');
  });
});
