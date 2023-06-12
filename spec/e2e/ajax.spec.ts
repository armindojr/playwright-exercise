import { test, expect } from '@playwright/test';

test.describe('Interacting with AJAX requests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://www.uitestingplayground.com/ajax');
    });

    test('Handling AJAX requests', async ({ page }) => {
        await page.locator('button#ajaxButton').click();
        await page.locator('p.bg-success').waitFor({ state: 'visible', timeout: 16000 });

        expect(await page.locator('p.bg-success').textContent()).toContain('AJAX');
    });

    test('Handling AJAX requests with mocked response', async ({ page }) => {
        const text = 'Mocked Response'

        await page.route('http://www.uitestingplayground.com/ajaxdata', async route => {
            await route.fulfill({
                status: 200,
                headers: {
                    'Content-Type': 'text/html; charset=utf-8'
                },
                body: text
            });
        });
        await page.locator('button#ajaxButton').click();
        await page.locator('p.bg-success').waitFor({ state: 'visible', timeout: 16000 });

        expect(await page.locator('p.bg-success').textContent()).toEqual(text);
    });
});