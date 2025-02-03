// import pw with fixtures
import { test } from '../../fixtures';

test.describe('Interacting with multiple elements', () => {
  test.beforeEach(async ({ gitInfoPage }) => {
    await gitInfoPage.goto();
  });

  test('Searching for git user', async ({ gitInfoPage }) => {
    const userName = 'armindojr';
    const fullName = 'Armindo Junior';
    const country = 'Brazil';
    const repo = 'playwright-exercise';
    await gitInfoPage.searchUser(userName);
    await gitInfoPage.checkUser(fullName, country, repo);
  });
});
