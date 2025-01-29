// import pw with fixtures
import { test } from '../../../fixtures';

test.describe('Read booking', () => {
  test('Get all booking ids', async ({ bookingRoute }) => {
    const res = await bookingRoute.returnBookings();
    await bookingRoute.validateStatus(res, 200);
  });

  test('Get all booking ids by firstname and lastname', async ({ bookingRoute }) => {
    const params = '?firstname=sally&lastname=brown';
    const res = await bookingRoute.returnBookings(params);
    await bookingRoute.validateStatus(res, 200);
  });

  test('Get all booking ids by checkin and checkout', async ({ bookingRoute }) => {
    const params = '?checkin=2014-03-13&checkout=2014-05-21';
    const res = await bookingRoute.returnBookings(params);
    await bookingRoute.validateStatus(res, 200);
  });

  test('Get booking information by id', async ({ bookingRoute }) => {
    const id = '2';
    const res = await bookingRoute.bookingById(id);
    await bookingRoute.validateStatus(res, 200);
  });

  test('Get booking information with missing id', async ({ bookingRoute }) => {
    const id = '22222222222222222';
    const res = await bookingRoute.bookingById(id);
    await bookingRoute.validateStatus(res, 404);
  });

  test('Get booking information with invalid id', async ({ bookingRoute }) => {
    const id = 'aaaaa';
    const res = await bookingRoute.bookingById(id);
    await bookingRoute.validateStatus(res, 404);
  });
});
