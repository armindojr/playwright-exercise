import { test, expect } from '@playwright/test';
import { auth } from '../../../utils';

test.describe('Read booking', () => {
    let token: string;
    
    test.beforeAll(async () => {
        token = await auth();
    });

    test('Get all booking ids', async ({ request }) => {
        let res = await request.get('/booking');

        expect(res.status()).toEqual(200);
    });

    test('Get all booking ids by firstname and lastname', async ({ request }) => {
        let res = await request.get('/booking?firstname=sally&lastname=brown');

        expect(res.status()).toEqual(200);
    });

    test('Get all booking ids by checkin and checkout', async ({ request }) => {
        let res = await request.get('/booking?checkin=2014-03-13&checkout=2014-05-21');

        expect(res.status()).toEqual(200);
    });

    test('Get booking information by id', async ({ request }) => {
        let res = await request.get('/booking/2');

        expect(res.status()).toEqual(200);
    });

    test('Get booking information with missing id', async ({ request }) => {
        let res = await request.get('/booking/22222222222222222');

        expect(res.status()).toEqual(404);
    });

    test('Get booking information with invalid id', async ({ request }) => {
        let res = await request.get('/booking/aaaaa');

        expect(res.status()).toEqual(404);
    });
});