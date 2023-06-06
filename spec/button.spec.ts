import { test, expect } from '@playwright/test';

test.describe('Interacting with buttons', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/buttons');
    });

    test('Clicking on a button', async ({ page }) => {
        await page.locator('button#home').click();
        await expect(page).toHaveURL('https://letcode.in/');
    });

    test('Getting button position on screen', async ({ page }) => {
        const result = await page.locator('button#position').boundingBox();

        if (result !== null) {
            expect(result.x).toEqual(312);
            expect(result.y).toEqual(338);
        } else {
            throw new Error("Button isn't present on screen!");
        }
    });

    test('Getting button color from css', async ({ page }) => {
        const navBar = page.locator('button#color');
        const color = await navBar.evaluate((element) =>
          window.getComputedStyle(element).getPropertyValue('background-color'),
        );
        expect(color).toEqual('rgb(138, 77, 118)');
    });

    test('Getting button height and width', async ({ page }) => {
        const result = await page.locator('button#property').boundingBox();

        if (result !== null) {
            expect(result.height).toEqual(40);
            expect(result.width).toBeGreaterThan(176);
            expect(result.width).toBeLessThan(177);
        } else {
            throw new Error("Button isn't present on screen!");
        }
    });

    test('Checking if button is disabled', async ({ page }) => {
        let status = await page.locator('button#isDisabled').first().isDisabled();
        expect(status).toEqual(true);
    });

    test('Check text after long press button', async ({ page }) => {
        let buttonList = await page.locator('button#isDisabled').all();
        await buttonList[1].click({ delay: 5000 });
        let text = await buttonList[1].textContent();
        expect(text).toEqual('Button has been long pressed');
    });
});