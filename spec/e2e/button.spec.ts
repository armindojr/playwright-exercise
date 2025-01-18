// import pw with fixtures
import { test, expect } from '../../fixtures/fixtures';

test.describe('Interacting with buttons', () => {
  test.beforeEach(async ({ buttonPage }) => {
    await buttonPage.goto();
  });

  // TODO: fix
  test('Clicking on a button', async ({ buttonPage, page }) => {
    await buttonPage.btnHome.click();

    expect(page.url()).toEqual('https://letcode.in/');
  });

  test('Getting button position on screen', async ({ buttonPage }) => {
    const result = await buttonPage.getElementCoordinates(buttonPage.btnPosition);

    expect(result.x).toBeGreaterThanOrEqual(304);
    expect(result.y).toEqual(338);
  });

  test('Getting button color from css', async ({ buttonPage }) => {
    const color = await buttonPage.btnColor.evaluate(element =>
      window.getComputedStyle(element).getPropertyValue('background-color')
    );

    expect(color).toEqual('rgb(138, 77, 118)');
  });

  test('Getting button height and width', async ({ buttonPage }) => {
    const result = await buttonPage.getElementCoordinates(buttonPage.btnProperty);

    expect(result.height).toEqual(40);
    expect(result.width).toBeGreaterThanOrEqual(175);
    expect(result.width).toBeLessThanOrEqual(177);
  });

  test('Checking if button is disabled', async ({ buttonPage }) => {
    const status = await buttonPage.btnDisabled.first().isDisabled();

    expect(status).toEqual(true);
  });

  test('Check text after long press button', async ({ buttonPage }) => {
    const buttonList = await buttonPage.btnDisabled.all();
    await buttonList[1].click({ delay: 5000 });
    const text = await buttonList[1].textContent();

    expect(text).toEqual('Button has been long pressed');
  });
});
