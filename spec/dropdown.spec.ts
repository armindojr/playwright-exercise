import { test, expect } from '@playwright/test';

test.describe('Interacting with dropdowns', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/dropdowns');
    });

    test('Selecting a item from dropdown', async ({ page }) => {
        await page.locator('select#fruits').selectOption({ label: 'Apple' });
        let text = await page.locator('div.content > div.is-success > p.subtitle').textContent();
        expect(text).toContain('Apple');
    });

    test('Selecting a item from multi-selector', async ({ page }) => {
        await page.locator('select#superheros').selectOption({ label: 'Batman' });
        let text = await page.locator('div.content > div.is-success > p.subtitle').textContent();
        expect(text).toContain('Batman');
    });

    test('Selecting two items from multi-selector', async ({ page }) => {
        await page.locator('select#superheros').selectOption([{ label: 'Batman' }, { label: 'Batwoman' }]);
        let text = await page.locator('div.content > div.is-success > p.subtitle').textContent();
        expect(text).toContain('Batman');
    });

    test('Selecting last item from dropdown', async ({ page }) => {
        const selector = await page.locator('select#lang > option').all();
        await page.locator('select#lang').selectOption({ index: (selector.length - 1) });
        let text = await page.locator('div.content > div.is-success > p.subtitle').textContent();
        expect(text).toContain('C#');
    });

    test('Selecting specific item from dropdown and verify value', async ({ page }) => {
        let selector = page.locator('select#country');
        await selector.selectOption({ value: 'India' });
        expect(await selector.inputValue()).toEqual('India');
    });
});