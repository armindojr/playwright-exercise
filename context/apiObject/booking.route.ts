import { APIRequestContext, APIResponse } from '@playwright/test';
import { expect } from '@playwright/test';
import * as auth from '../../auth/api.json';
import Base from './base.route';

export default class BookingRoute extends Base {
  readonly req: APIRequestContext;
  readonly token: string;

  constructor(request: APIRequestContext) {
    super();
    this.req = request;
    this.token = `token=${auth.token}`;
  }

  // CRUD
  async createBooking(body: any) {
    let data = {
      firstname: 'Jim',
      lastname: 'Brown',
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: '2018-01-01',
        checkout: '2019-01-01'
      },
      additionalneeds: 'Breakfast'
    };

    if (body) {
      data = body;
    }

    return await this.req.post('/booking', { data });
  }

  async returnBookings(params: string = '') {
    return await this.req.get(`/booking${params}`);
  }

  async bookingById(id: string) {
    return await this.req.get(`/booking/${id}`);
  }

  async completeUpdate(id: string, body: any) {
    let data = {
      firstname: 'James',
      lastname: 'Brown',
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: '2018-01-01',
        checkout: '2019-01-01'
      },
      additionalneeds: 'Breakfast'
    };

    if (body) {
      data = body;
    }

    return await this.req.put(`/booking/${id}`, {
      headers: {
        Cookie: this.token
      },
      data
    });
  }

  async partialUpdate(id: string) {
    return await this.req.patch(`/booking/${id}`, {
      headers: {
        Cookie: this.token
      },
      data: {
        firstname: 'James'
      }
    });
  }

  async deleteById(id: string) {
    return await this.req.delete(`/booking/${id}`, {
      headers: {
        Cookie: this.token
      }
    });
  }

  // Validation
  async validateCreation(res: APIResponse, name: string) {
    const resJson = await res.json();
    expect(resJson.booking.firstname).toEqual(name);
  }

  async validateUpdate(res: APIResponse, name: string) {
    const resJson = await res.json();
    expect(resJson.firstname).toEqual(name);
  }
}
