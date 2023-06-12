import { test as setup } from '@playwright/test';
import { writeFile } from 'fs/promises';

setup('login', async ({ request }) => {
    let res = await request.post('https://restful-booker.herokuapp.com/auth', {
        data: {
            username: process.env.API_USER,
            password: process.env.API_PASS
        }
    });

    let resJson = await res.json();

    const defaultStorage = {
        token: resJson.token,
    };

    await writeFile('./auth/api.json', JSON.stringify(defaultStorage, undefined, 4));
});