import { test, expect } from '@playwright/test';

test.describe('Creating explicit wait during test', () => {
    test('Wait for button to be visible', async ({ page }) => {
        await page.goto('/buttons');
        await page.locator('button#home').waitFor({ state: 'visible' });
        expect(await page.title()).toEqual('Interact with Button fields');
    });
    
    test('Wait for button to be invisible', async ({ page }) => {
        await page.goto('/dropdowns');
        await page.locator('button#home').waitFor({ state: 'detached' });
        expect(await page.title()).toEqual('LetCode with Koushik');
    });

    test('Wait for text to be visible', async ({ page }) => {
        await page.goto('/');
        await page.locator('a#testing').click();
        await page.getByText('test automation').waitFor({ state: 'visible' });
        expect(await page.title()).toEqual('LetCode - Testing Hub');
    });

    test('Wait for alert to be hidden and present in DOM', async ({ page }) => {
        await page.goto('/alert');
        await page.locator('div.modal-content').waitFor({ state: 'attached' });
        await page.locator('div.modal-content').waitFor({ state: 'hidden' });
        expect(await page.title()).toEqual('LetCode with Koushik');
    });
});