// import pw with fixtures
import { test, expect } from '../../fixtures';

test.describe('Interacting with dropdowns', () => {
  test.beforeEach(async ({ dropdownPage }) => {
    await dropdownPage.goto();
  });

  test('Selecting a item from dropdown', async ({ dropdownPage }) => {
    await dropdownPage.selectFruits.selectOption({ label: 'Apple' });

    expect(await dropdownPage.textSuccess.textContent()).toContain('Apple');
  });

  test('Selecting a item from multi-selector', async ({ dropdownPage }) => {
    await dropdownPage.selectSuperheroes.selectOption({ label: 'Batman' });

    expect(await dropdownPage.textSuccess.textContent()).toContain('Batman');
  });

  test('Selecting two items from multi-selector', async ({ dropdownPage }) => {
    await dropdownPage.selectSuperheroes.selectOption([{ label: 'Batman' }, { label: 'Batwoman' }]);

    expect(await dropdownPage.textSuccess.textContent()).toContain('Batman');
  });

  test('Selecting last item from dropdown', async ({ dropdownPage }) => {
    const opts = await dropdownPage.optionsLang.all();
    await dropdownPage.selectLang.selectOption({ index: opts.length - 1 });

    expect(await dropdownPage.textSuccess.textContent()).toContain('C#');
  });

  test('Selecting specific item from dropdown and verify value', async ({ dropdownPage }) => {
    await dropdownPage.selectCountry.selectOption({ value: 'India' });

    expect(await dropdownPage.selectCountry.inputValue()).toEqual('India');
  });
});
