import { Locator, Page, expect } from '@playwright/test';
import Base from './base.page';

export default class DownloadPage extends Base {
  readonly page: Page;
  readonly xlsFile: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.xlsFile = this.page.locator('#xls');
  }

  /**
   * Navigates to the files page in the application.
   */
  async goto() {
    await super.goto('/file');
  }

  /**
   * Waits for the download event to be triggered and returns the event object.
   * @returns A Promise that resolves with the download event.
   */
  downloadPromise() {
    return this.page.waitForEvent('download');
  }

  /**
   * Triggers the download of the XLS file by clicking on the corresponding link.
   */
  async triggerDownload() {
    await this.xlsFile.click();
  }

  /**
   * Checks if the filename contains the expected text.
   * @param file - The full path or name of the downloaded file.
   * @param name - The text that should be present in the filename.
   */
  checkFilename(file: string, name: string) {
    expect(file).toContain(name);
  }
}
