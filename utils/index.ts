import { Locator } from '@playwright/test';

export async function getElementCoordinates(el: Locator) {
    await el.waitFor({ state: 'visible' });
    let result = await el.boundingBox();

    if (result) {
        return result;
    } else {
        throw new Error('Element doesn\'t have boundary or is inaccessible!');
    }
}