// Import Playwright fixtures and expectations
import { test } from '../../fixtures';

test.describe('Interacting with downloadable content', () => {
  test.beforeEach(async ({ downloadPage }) => {
    await downloadPage.goto();
  });

  test('Handling new downloads', async ({ downloadPage }) => {
    const downloadPromise = downloadPage.downloadPromise();
    await downloadPage.triggerDownload();
    const downloadResolve = await downloadPromise;
    downloadPage.checkFilename(downloadResolve.suggestedFilename(), 'sample');
    await downloadResolve.delete();
  });
});
