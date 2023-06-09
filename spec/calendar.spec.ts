import { test, expect } from '@playwright/test';

test.describe('Interacting with calendar', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/calendar');
    });

    test('Selecting today from static calendar', async ({ page }) => {
        let today = new Date().toLocaleString('en-US', { 
            month: 'numeric',
            day: 'numeric',
            year: '2-digit',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
        let datePicker = page.locator('nwb-date-picker');
        await datePicker.getByRole('button', { name: 'Today' }).click();
        
        let text = page.getByText('You have selected');
        expect(await text.textContent()).toContain(`${today}`);
    });

    test('Selecting today from static calendar and clear input', async ({ page }) => {
        let datePicker = page.locator('nwb-date-picker');
        await datePicker.getByRole('button', { name: 'Today' }).click();
        await datePicker.getByRole('button', { name: 'Clear' }).click();
        
        await expect(page.getByText('You have selected')).toBeHidden();
    });

    test('Selecting today from static calendar and add 10 minutes', async ({ page }) => {
        let clickCount = 10;
        let today = new Date();
        today.setMinutes(today.getMinutes() + clickCount);
        let added = today.toLocaleString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: '2-digit',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
        let datePicker = page.locator('nwb-date-picker');
        await datePicker.getByRole('button', { name: 'Today' }).click();
        await datePicker.locator('.timepicker-minutes > span.timepicker-next').click({ clickCount });
        
        let text = page.getByText('You have selected');
        expect(await text.textContent()).toContain(`${added}`);
    });

    test('Selecting range date', async ({ page }) => {
        let datePicker = page.locator('nwb-date-picker').nth(1);
        await datePicker.click();
        let datePickerModal = page.locator('div.datepicker.is-active');
        await datePickerModal.locator('div.datepicker-nav > div > div.datepicker-nav-year').click();
        await datePickerModal.locator('div[data-year="2023"]').click();
        await datePickerModal.locator('div.datepicker-nav > div > div.datepicker-nav-month').click();
        await datePickerModal.locator('div[data-month="01"]').click();
        let onlySelectedMonth = datePicker.locator('div.is-current-month');
        await onlySelectedMonth.getByRole('button', { name: '1', exact: true }).click();
        await onlySelectedMonth.getByRole('button', { name: '12', exact: true }).click();
        
        let text = page.getByText('You have selected');
        expect(await text.textContent()).toContain('01-Jan-2023 to 12-Jan-2023');
    });
});