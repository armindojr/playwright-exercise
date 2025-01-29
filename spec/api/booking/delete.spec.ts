// import pw with fixtures
import { test } from '../../../fixtures';

test.describe('Delete booking', () => {
  let bookingid: string;

  test.beforeEach(async ({ bookingRoute }) => {
    // Create booking to be deleted
    const res = await bookingRoute.createBooking();
    const resJson = await res.json();
    bookingid = resJson.bookingid;
  });

  test('Delete existing booking', async ({ bookingRoute }) => {
    const res = await bookingRoute.deleteById(bookingid);
    await bookingRoute.validateStatus(res, 201);
  });

  test('Delete booking with missing id', async ({ bookingRoute }) => {
    const id = '22222222222222222';
    const res = await bookingRoute.deleteById(id);
    await bookingRoute.validateStatus(res, 405);
  });

  test('Delete booking with invalid id', async ({ bookingRoute }) => {
    const id = 'aaaaa';
    const res = await bookingRoute.deleteById(id);
    await bookingRoute.validateStatus(res, 405);
  });
});
