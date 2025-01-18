// import pw with fixtures
import { test, expect } from '../../fixtures/fixtures';

test.describe('Interacting with multiple elements', () => {
  test.beforeEach(async ({ elementsPage }) => {
    await elementsPage.goto();
  });

  test('Searching for git user', async ({ elementsPage }) => {
    await elementsPage.inputUsername.fill('armindojr');
    await elementsPage.btnSearch.click();
    await elementsPage.imgUser.waitFor({ state: 'visible' });
    const repos = await elementsPage.listRepo.all();

    expect(await elementsPage.textTitle.textContent()).toEqual('Armindo Junior');
    expect(await elementsPage.textSubtitle.textContent()).toContain('Brazil');
    expect(repos.length + 1).toBeGreaterThan(0);
    expect(repos.length + 1).toBeLessThanOrEqual(10);
  });
});
