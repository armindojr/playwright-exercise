import { test, expect } from '@playwright/test';

test.describe('Interacting with multiple elements', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/elements');
    });

    test('Searching for git user', async ({ page }) => {
        await page.locator('input[name="username"]').fill('armindojr');
        await page.locator('button#search').click();
        const image = page.locator('img[src*="avatar"]');
        await image.waitFor({ state: 'visible' });
        const title = page.locator('p.title');
        const subtitle = page.locator('p.subtitle');
        const repos = await page.locator('app-gitrepos > div > div > ol > li').all();

        expect(await title.textContent()).toEqual('Armindo Junior');
        expect(await subtitle.textContent()).toContain('Brazil');
        expect(repos.length+1).toBeGreaterThan(0);
        expect(repos.length+1).toBeLessThanOrEqual(10);
    });
});