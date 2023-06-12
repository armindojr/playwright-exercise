import { test, expect } from '@playwright/test';
import { auth } from '../../../utils';

test.describe('Retrieving booking information', () => {
    let token: String;
    
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
});