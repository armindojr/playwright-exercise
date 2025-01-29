// import pw with fixtures
import { test } from '../../fixtures';

test.describe('Interacting with buttons', () => {
  test.beforeEach(async ({ buttonPage }) => {
    await buttonPage.goto();
  });

  test('Clicking on a button', async ({ buttonPage }) => {
    await buttonPage.clickHome();
    await buttonPage.checkUrl('https://letcode.in/');
  });

  test('Getting button position on screen', async ({ buttonPage }) => {
    const position = await buttonPage.buttonPosition();
    await buttonPage.checkPosition(position, 304, 338);
  });

  test('Getting button color from css', async ({ buttonPage }) => {
    const color = await buttonPage.buttonColor();
    await buttonPage.checkColor(color, 'rgb(138, 77, 118)');
  });

  test('Getting button height and width', async ({ buttonPage }) => {
    const dimension = await buttonPage.buttonDimension();
    await buttonPage.checkDimensions(dimension, 175, 40);
  });

  test('Checking if button is disabled', async ({ buttonPage }) => {
    const status = await buttonPage.buttonDisabled();
    await buttonPage.checkDisabled(status);
  });

  test('Check text after long press button', async ({ buttonPage }) => {
    const longpress = await buttonPage.longPressButton();
    await buttonPage.checkPressed(longpress);
  });
});
