import { test, expect } from '@playwright/test';

test.describe('Interacting with alerts', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/alert');
    });

    test('Handling accept alert', async ({ page }) => {
        page.on('dialog', async dialog => {
            expect(dialog.type()).toContain('alert');
            expect(dialog.message()).toContain('Hey! Welcome to LetCode');
            await dialog.accept();
        });

        await page.locator('button#accept').click();
    });

    test('Handling confirm alert', async ({ page }) => {
        page.on('dialog', async dialog => {
            expect(dialog.type()).toContain('confirm');
            expect(dialog.message()).toContain('Are you happy with LetCode?');
            await dialog.accept();
        });

        await page.locator('button#confirm').click();
    });

    test('Handling prompt alert', async ({ page }) => {
        page.on('dialog', async dialog => {
            expect(dialog.type()).toContain('prompt');
            expect(dialog.message()).toContain('Enter your name');
            await dialog.accept('Armindo Junior');
        });

        await page.locator('button#prompt').click();
        let text = await page.locator('p#myName').textContent();
        expect(text).toContain('Armindo Junior');
    });

    test('Handling sweet alert', async ({ page }) => {
        await page.locator('button#modern').click();
        let text = page.locator('div.modal');
        expect(text).toHaveClass(/active/);
    });
});