import { Page, Locator } from "@playwright/test";

export class MyAccountPage {
  readonly page: Page;
  readonly profileButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profileButton = page.getByRole("button", { name: "Profile" });
  }

  async navigateToAccountPage() {
    await this.page.goto("/account");
  }

  async goToProfile() {
    await this.profileButton.click();
  }
}
