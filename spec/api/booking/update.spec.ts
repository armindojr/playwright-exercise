// import pw with fixtures
import { test } from '../../../fixtures';

test.describe('Update booking', () => {
  // Complete update with PUT method
  test('Complete update existing booking information', async ({ bookingRoute }) => {
    const id = '1';
    const res = await bookingRoute.completeUpdate(id);
    await bookingRoute.validateStatus(res, 200);
    await bookingRoute.validateUpdate(res, 'James');
  });

  test('Complete update existing booking with invalid information', async ({ bookingRoute }) => {
    const id = '1';
    const res = await bookingRoute.completeUpdate(id, { firstname: 'Jim' });
    await bookingRoute.validateStatus(res, 400);
  });

  test('Complete update booking information with missing id', async ({ bookingRoute }) => {
    const id = '22222222222222222';
    const res = await bookingRoute.completeUpdate(id);
    await bookingRoute.validateStatus(res, 405);
  });

  test('Complete update booking information with invalid id', async ({ bookingRoute }) => {
    const id = 'aaaaa';
    const res = await bookingRoute.completeUpdate(id);
    await bookingRoute.validateStatus(res, 405);
  });

  // Partial update with PATCH method
  test('Partial update existing booking information', async ({ bookingRoute }) => {
    const id = '1';
    const res = await bookingRoute.partialUpdate(id);
    await bookingRoute.validateStatus(res, 200);
  });

  test('Partial update booking information with missing id', async ({ bookingRoute }) => {
    const id = '22222222222222222';
    const res = await bookingRoute.partialUpdate(id);
    await bookingRoute.validateStatus(res, 405);
  });

  test('Partial update booking information with invalid id', async ({ bookingRoute }) => {
    const id = 'aaaaa';
    const res = await bookingRoute.partialUpdate(id);
    await bookingRoute.validateStatus(res, 405);
  });
});
