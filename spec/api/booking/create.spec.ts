import { test, expect } from '@playwright/test';
import { auth } from '../../../utils';

test.describe('Create booking', () => {
    let token: string;
    
    test.beforeAll(async () => {
        token = await auth();
    });

    test('Create basic booking information', async ({ request }) => {
        let res = await request.post('/booking', {
            data: {
                firstname: 'Jim',
                lastname: 'Brown',
                totalprice: 111,
                depositpaid: true,
                bookingdates: {
                    checkin: '2018-01-01',
                    checkout: '2019-01-01'
                },
                additionalneeds: 'Breakfast'
            }
        });

        let resJson = await res.json();

        expect(res.status()).toEqual(200);
        expect(resJson.booking.firstname).toEqual('Jim');
    });

    test('Create booking with invalid information', async ({ request }) => {
        let res = await request.post('/booking', {
            data: {
                firstname: 'Jim',
            }
        });

        expect(res.status()).toEqual(500);
    });
});