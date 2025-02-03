// import pw instance
import { test as base } from '@playwright/test';

// import API Objects
import BookingRoute from '../context/apiObject/booking.route';

// import Page Objects
import AjaxPage from '../context/pageObject/ajax.page';
import AlertPage from '../context/pageObject/alert.page';
import ButtonPage from '../context/pageObject/button.page';
import CalendarPage from '../context/pageObject/calendar.page';
import DragPage from '../context/pageObject/drag.page';
import DownloadPage from '../context/pageObject/download.page';
import DropdownPage from '../context/pageObject/dropdown.page';
import FormsPage from '../context/pageObject/forms.page';
import GitInfoPage from '../context/pageObject/gitInfo.page';
import HomePage from '../context/pageObject/home.page';
import IframePage from '../context/pageObject/iframe.page';
import InputPage from '../context/pageObject/input.page';
import RadioPage from '../context/pageObject/radio.page';
import ShadowPage from '../context/pageObject/shadow.page';
import WindowPage from '../context/pageObject/window.page';

type Fixtures = {
  bookingRoute: BookingRoute;
  ajaxPage: AjaxPage;
  alertPage: AlertPage;
  buttonPage: ButtonPage;
  calendarPage: CalendarPage;
  dragPage: DragPage;
  downloadPage: DownloadPage;
  dropdownPage: DropdownPage;
  formsPage: FormsPage;
  gitInfoPage: GitInfoPage;
  homePage: HomePage;
  iframePage: IframePage;
  inputPage: InputPage;
  radioPage: RadioPage;
  shadowPage: ShadowPage;
  windowPage: WindowPage;
};

export const test = base.extend<Fixtures>({
  // Routes
  bookingRoute: async ({ request }, use) => {
    await use(new BookingRoute(request));
  },

  // Pages
  ajaxPage: async ({ page }, use) => {
    await use(new AjaxPage(page));
  },

  alertPage: async ({ page }, use) => {
    await use(new AlertPage(page));
  },

  buttonPage: async ({ page }, use) => {
    await use(new ButtonPage(page));
  },

  calendarPage: async ({ page }, use) => {
    await use(new CalendarPage(page));
  },

  dragPage: async ({ page }, use) => {
    await use(new DragPage(page));
  },

  downloadPage: async ({ page }, use) => {
    await use(new DownloadPage(page));
  },

  dropdownPage: async ({ page }, use) => {
    await use(new DropdownPage(page));
  },

  formsPage: async ({ page }, use) => {
    await use(new FormsPage(page));
  },

  gitInfoPage: async ({ page }, use) => {
    await use(new GitInfoPage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  iframePage: async ({ page }, use) => {
    await use(new IframePage(page));
  },

  inputPage: async ({ page }, use) => {
    await use(new InputPage(page));
  },

  radioPage: async ({ page }, use) => {
    await use(new RadioPage(page));
  },

  shadowPage: async ({ page }, use) => {
    await use(new ShadowPage(page));
  },

  windowPage: async ({ page, context }, use) => {
    await use(new WindowPage(page, context));
  }
});

export { expect } from '@playwright/test';
