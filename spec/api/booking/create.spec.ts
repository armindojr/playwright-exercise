// import pw with fixtures
import { test } from '../../../fixtures';

test.describe('Create booking', () => {
  test('Create basic booking information', async ({ bookingRoute }) => {
    const res = await bookingRoute.createBooking();
    await bookingRoute.validateStatus(res, 200);
    await bookingRoute.validateCreation(res, 'Jim');
  });

  test('Create booking with invalid information', async ({ bookingRoute }) => {
    const res = await bookingRoute.createBooking({ firstname: 'Jim' });
    await bookingRoute.validateStatus(res, 500);
  });
});
