// import types
import { APIResponse } from '@playwright/test';

// import pw instance
import { expect } from '@playwright/test';

// import utils
import { ajvCheck } from '../../utils';

export default class Base {
  constructor() {}

  async validateStatus(res: APIResponse, code: Number) {
    expect(res.status()).toEqual(code);
  }

  async validateContract(res: APIResponse, schema: any) {
    const contractStatus = ajvCheck(schema, await res.json());

    expect(contractStatus).toEqual(true);
  }
}
