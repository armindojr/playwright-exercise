import { test, expect } from '@playwright/test';

test.describe('Interacting with iframes', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/frame');
    });

    test('Filling inputs inside iframe', async ({ page }) => {
        let frame = page.frameLocator('iframe#firstFr');

        let inputName = frame.locator('input[name="fname"]');
        await inputName.fill('Armindo');
        expect(await inputName.inputValue()).toEqual('Armindo');

        let inputLname = frame.locator('input[name="lname"]');
        await inputLname.fill('Junior');
        expect(await inputLname.inputValue()).toEqual('Junior');
    });

    test('Filling an input inside nested iframe', async ({ page }) => {
        let frame = page.frameLocator('iframe#firstFr');
        let secFrame = frame.frameLocator('iframe[src="innerFrame"]');
    
        let inputEmail = secFrame.locator('input[name="email"]')
        await inputEmail.fill('test@mailinator.com');
        expect(await inputEmail.inputValue()).toEqual('test@mailinator.com');
    });
});