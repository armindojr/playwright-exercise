import { test, expect } from '@playwright/test';

test.describe('Interacting with window and tabs', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/windows');
    });

    test('Handling new tab', async ({ page, context }) => {
        const [newtab] = await Promise.all([
            context.waitForEvent('page'),
            page.locator('button#home').click()
        ]);

        // Below commented code provides an example of another way to handle new tab
        // const popupPromise = page.waitForEvent('popup');
        // page.locator('button#home').click();
        // const newtab = await popupPromise;

        expect(await newtab.title()).toEqual('LetCode with Koushik');
        expect(await page.title()).toEqual('Window handling - LetCode');
    });
});