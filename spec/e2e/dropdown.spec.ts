// import pw with fixtures
import { test } from '../../fixtures';

test.describe('Interacting with dropdowns', () => {
  test.beforeEach(async ({ dropdownPage }) => {
    await dropdownPage.goto();
  });

  test('Selecting a item from dropdown', async ({ dropdownPage }) => {
    const fruit = 'Apple';
    await dropdownPage.selectFruit(fruit);
    await dropdownPage.checkSelected(fruit);
  });

  test('Selecting a item from multi-selector', async ({ dropdownPage }) => {
    const one = 'Batman';
    await dropdownPage.multiSelect([one]);
    await dropdownPage.checkSelected(one);
  });

  test('Selecting last item from dropdown', async ({ dropdownPage }) => {
    await dropdownPage.selectLast();
    await dropdownPage.checkSelected('C#');
  });

  test('Selecting item by value and verify', async ({ dropdownPage }) => {
    const country = 'India';
    await dropdownPage.selectValue(country);
    await dropdownPage.checkCountry(country);
  });
});
