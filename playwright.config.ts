import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    fullyParallel: true,

    forbidOnly: true,

    retries: 0,

    workers: 2,

    reporter: [['html', { open: 'never' }]],

    use: {
        trace: 'retain-on-failure',
    },

    projects: [
        {
            name: 'E2E',
            testDir: './spec/e2e',
            use: { 
                ...devices['Desktop Chrome'],
                baseURL: 'https://letcode.in',
                viewport: {
                    width: 1920,
                    height: 1080
                }
            },
        },

        {
            name: 'API',
            testDir: './spec/api',
            use: { 
                baseURL: 'https://pokeapi.co',
            }
        }
    ],

    testMatch: /.spec.ts/
});
