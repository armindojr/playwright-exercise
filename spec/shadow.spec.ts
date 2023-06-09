import { test, expect } from '@playwright/test';

test.describe('Interacting with shadow DOM', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/shadow');
    });

    test('Filling inputs inside shadow DOM', async ({ page }) => {
        await page.locator('input#fname').fill('Armindo');
        // Playwright doesn't works with closed shadow dom
        // await page.locator('input#lname').fill('Junior');
        // await page.locator('input#email').fill('test@mailinator.com');
    });
});