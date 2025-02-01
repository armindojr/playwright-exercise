// import pw with fixtures
import { test } from '../../fixtures';

test.describe('Interacting with drag and drop element', () => {
  test('Drag element within box', async ({ dragPage }) => {
    await dragPage.gotoDrag();
    const start = await dragPage.getCoordinates();
    await dragPage.moveInsideBox(start.x, start.y);
    const finish = await dragPage.getCoordinates();
    await dragPage.checkCoord(start.x, finish.x, start.y, finish.y);
  });

  test('Drag and drop element to destination box', async ({ dragPage }) => {
    await dragPage.gotoDrop();
    await dragPage.dragElementToBox();
    await dragPage.checkElementDropped();
  });

  test('Drag and drop element to destination list', async ({ dragPage }) => {
    await dragPage.gotoSort();
    await dragPage.dragElementToList();
    await dragPage.checkListAdded();
  });

  test('Drag and drop to select items from list', async ({ dragPage }) => {
    await dragPage.gotoSelect();
    await dragPage.dragToSelectList();
    await dragPage.checkListSelected();
  });

  test('Drag and drop slider to view countries', async ({ dragPage }) => {
    await dragPage.gotoSlider();
    await dragPage.dragSliderCountries(10);
    await dragPage.viewCountries();
    await dragPage.checkCountries(10);
  });
});
