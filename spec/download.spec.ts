import { test, expect } from '@playwright/test';

test.describe('Interacting with downloadable content', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/file');
    });

    test('Handling new downloads', async ({ page }) => {
        await page.locator('a#xls').click();
        const download = await page.waitForEvent('download');
        expect(download.suggestedFilename()).toContain('sample');
        await download.delete();
    });
});