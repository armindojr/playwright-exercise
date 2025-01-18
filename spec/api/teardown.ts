import { test as teardown } from '@playwright/test';
import { writeFile } from 'fs/promises';

teardown('clear saved token', async () => {
  const defaultStorage = {
    token: ''
  };

  await writeFile('./auth/api.json', JSON.stringify(defaultStorage, undefined, 4));
});
