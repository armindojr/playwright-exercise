import { test } from '@playwright/test';
import { FormsPage } from '../pageObject/forms.page';

test.describe('Interacting with form', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/forms');
    });
    
    test('Filling form with random data', async ({ page }) => {
        const form = new FormsPage(page);

        await form.fillForm();
    });
});