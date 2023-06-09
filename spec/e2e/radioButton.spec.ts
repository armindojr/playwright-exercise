import { test, expect } from '@playwright/test';

test.describe('Interacting with Radio buttons and checkboxes', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/radio');
    });

    test('Selecting an option on radio button', async ({ page }) => {
        let checkbox = page.locator('input#yes');
        await checkbox.check();
        expect(await checkbox.isChecked()).toBeTruthy();
    });

    test('Selecting only one option on radio button', async ({ page }) => {
        let checkboxYes = page.locator('input#one');
        let checkboxNo = page.locator('input#two');
        // Below commented code provides an example on bug when selecting radio buttons
        // let checkboxYes = page.locator('input#nobug');
        // let checkboxNo = page.locator('input#bug');
        await checkboxYes.check();
        await checkboxNo.check();
        expect(await checkboxYes.isChecked()).toBeFalsy();
    });

    test('Finding wich radio button is checked', async ({ page }) => {
        let checked = page.locator('div:nth-child(4) > div > label', { has: page.locator('input:checked') });
        expect(await checked.textContent()).toContain('Bar');
    });

    test('Checking if radio button is enabled', async ({ page }) => {
        let radio = page.locator('input#maybe');
        expect(await radio.isEnabled()).toBeFalsy();
    });

    test('Confirming if checkbox is checked', async ({ page }) => {
        let checked = page.getByText(' Remember me');
        expect(await checked.isChecked()).toBeTruthy();
    });

    test('Checking checkbox of terms agreement', async ({ page }) => {
        let checked = page.getByText('I agree to the');
        await checked.check();
        expect(await checked.isChecked()).toBeTruthy();
    });
});