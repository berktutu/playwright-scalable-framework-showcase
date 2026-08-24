import { test as base, Page } from "@playwright/test";
import { AuthenticationAPI } from "../api/AuthenticationApi";

type AuthFixtures = {
  authenticatedPage: Page;
};

export { expect } from "@playwright/test";

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ browser, request }, use) => {
    const email = process.env.USER_EMAIL;
    const password = process.env.USER_PASSWORD;

    if (!email || !password) {
      throw new Error("USER_EMAIL or USER_PASSWORD is missing");
    }

    const authenticationAPI = new AuthenticationAPI(request);
    const response = await authenticationAPI.login(email, password);

    const responseBody = await response.json();
    const token = responseBody.access_token;

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.addInitScript((token) => {
      localStorage.setItem("auth-token", token);
    }, token);

    await use(page);

    await context.close();
  },
});
