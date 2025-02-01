import { APIResponse } from '@playwright/test';
import { expect } from '@playwright/test';
import { ajvCheck } from '../../utils';

export default class Base {
  async validateStatus(res: APIResponse, code: number) {
    expect(res.status()).toEqual(code);
  }

  async validateContract(res: APIResponse, schema: any) {
    const contractStatus = ajvCheck(schema, await res.json());

    expect(contractStatus).toEqual(true);
  }
}
