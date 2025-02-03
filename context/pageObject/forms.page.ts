import { Locator, Page, expect } from '@playwright/test';
import { fakerPT_BR as faker } from '@faker-js/faker';
import Base from './base.page';

export default class FormsPage extends Base {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly phoneNumber: Locator;
  readonly country: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly termsAgreement: Locator;
  readonly btnSubmit: Locator;
  readonly msgSuccess: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.firstName = this.page.locator('#firstName');
    this.lastName = this.page.locator('#lastName');
    this.phoneNumber = this.page.locator('#phone');
    this.email = this.page.locator('#emailAddress');
    this.country = this.page.locator('#countries_dropdown_menu');
    this.password = this.page.locator('#password');
    this.termsAgreement = this.page.locator('#exampleCheck1');
    this.btnSubmit = this.page.locator('[type="submit"]');
    this.msgSuccess = this.page.locator('#message');
  }

  /**
   * Navigates to the registration page.
   */
  async goto() {
    await super.goto('https://qa-practice.netlify.app/register');
  }

  /**
   * Fills out and submits the form with random test data using faker.js.
   */
  async fillForm() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName });
    const phone = `9${faker.string.numeric({ length: 9 })}`;

    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.phoneNumber.fill(phone);
    await this.country.selectOption('Brazil');
    await this.email.fill(email);
    await this.password.fill('test');
    await this.termsAgreement.check();
    await this.btnSubmit.click();
  }

  /**
   * Verifies that the success message contains the specified text.
   * @param text The expected text in the success message.
   */
  async checkSubmition(text: string) {
    await expect(this.msgSuccess).toContainText(text);
  }
}
