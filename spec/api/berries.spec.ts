import { test, expect } from '@playwright/test';

test.describe('Retrieving berries information', () => {
    test('Getting berry information by ID', async ({ request }) => {
        const req = await request.get('/api/v2/berry/1');
        const parsed = await req.json();

        expect(req.status()).toEqual(200);
        expect(parsed).toHaveProperty('name');
    });

    test('Getting berry information by Name', async ({ request }) => {
        const req = await request.get('/api/v2/berry/colbur');
        const parsed = await req.json();

        expect(req.status()).toEqual(200);
        expect(parsed).toHaveProperty('name');
    });
});