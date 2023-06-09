import { test, expect } from '@playwright/test';

test.describe('Interacting with inputs', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/edit');
    });

    test('Filling an input', async ({ page }) => {
        await page.fill('input#fullName', 'Armindo Junior');
        let text = await page.locator('input#fullName').inputValue();
        expect(text).toEqual('Armindo Junior');
    });

    test('Pressing key', async ({ page }) => {
        await page.fill('input#join', 'Foo Bar');
        await page.keyboard.press('Tab');
    });

    test('Checking text', async ({ page }) => {
        let text = await page.locator('input#getMe').inputValue();
        expect(text).toEqual('ortonikc');
    });

    test('Clearing input', async ({ page }) => {
        await page.locator('input#clearMe').clear();
        let text = await page.locator('input#clearMe').inputValue();
        expect(text).toEqual('');
    });

    test('Checking if input is disabled', async ({ page }) => {
        let status = await page.locator('input#noEdit').isDisabled();
        expect(status).toBeTruthy();
    });

    test('Checking if input is read only', async ({ page }) => {
        let status = await page.locator('input#dontwrite').isEditable();
        expect(status).toBeFalsy();
    });
});