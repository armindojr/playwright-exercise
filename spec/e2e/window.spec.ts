// import pw with fixtures
import { test, expect } from '../../fixtures';

test.describe('Interacting with window and tabs', () => {
  test.beforeEach(async ({ windowPage }) => {
    await windowPage.goto();
  });

  test('Handling new tab', async ({ windowPage, page }) => {
    const newPagePromise = windowPage.pagePromise();
    await windowPage.btnHome.click();
    const newPage = await newPagePromise;

    expect(await newPage?.title()).toEqual('LetCode with Koushik');
    expect(await page.title()).toEqual('Window handling - LetCode');
  });

  test('Handling new tab - another method', async ({ windowPage, page }) => {
    const popupPromise = windowPage.popupPromise();
    await windowPage.btnHome.click();
    const newPage = await popupPromise;

    expect(await newPage?.title()).toEqual('LetCode with Koushik');
    expect(await page.title()).toEqual('Window handling - LetCode');
  });
});
