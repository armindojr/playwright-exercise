const { test, expect } = require('@playwright/test');

test.describe('Busca de informações', () => {
    test('Realizar uma busca e verificar se a pagina carregou', async ({ page }) => {
        await page.goto('https://duckduckgo.com/');
        await page.fill('input#search_form_input_homepage', 'playwright');
        await page.click('input#search_button_homepage');
        await page.locator('a.result__a').first().click();
        await page.waitForLoadState('networkidle');
        expect(await page.title()).toContain('Playwright');
    })
})