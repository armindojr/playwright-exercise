// import pw with fixtures
import { test, expect } from '../../fixtures';

test.describe('Interacting with downloadable content', () => {
  test.beforeEach(async ({ downloadPage }) => {
    await downloadPage.goto();
  });

  test('Handling new downloads', async ({ downloadPage }) => {
    const downloadPromise = downloadPage.downloadPromise();
    await downloadPage.xlsFile.click();
    const downloadResolve = await downloadPromise;

    expect(downloadResolve.suggestedFilename()).toContain('sample');
    await downloadResolve.delete();
  });
});
