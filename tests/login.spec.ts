import { test, expect } from "../fixtures/fixtures";
import { MyAccountPage } from "../pages/MyAccount";
import { generateRandomOrderID } from "../utils/utils";

// UI level initial login test from the user's perspective.
test("User can login with valid credentials", async ({ page }) => {
  const email = process.env.USER_EMAIL!;
  const password = process.env.USER_PASSWORD!;

  page.goto("/auth/login");

  await page.getByLabel("Email address *").fill(email);
  await page.getByLabel("Password *").fill(password);

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByRole("heading", { name: "My account" })).toBeVisible();
});

// As the login test was already done by user perspective, here the authentication is handled through the API and a custom fixture so the test can focus directly navigating to the user profile.
test("User can navigate to profile page", async ({ authenticatedPage }) => {
  const myAccountPage = new MyAccountPage(authenticatedPage);

  await myAccountPage.navigateToAccountPage();
  await myAccountPage.goToProfile();

  await expect(
    authenticatedPage.getByRole("heading", { name: "Profile" }),
  ).toBeVisible();
});

// Demonstration of utility usage by generating a random order ID.
test("User can send message", async ({ authenticatedPage }) => {
  const myAccountPage = new MyAccountPage(authenticatedPage);
  await myAccountPage.navigateToAccountPage();

  await authenticatedPage.getByRole("button", { name: "Messages" }).click();
  await authenticatedPage.getByText("contact form", { exact: true }).click();

  await authenticatedPage.getByLabel("Subject").selectOption("Return");
  await authenticatedPage
    .getByLabel("Message *")
    .fill(
      `I want to return my previously purchased product. I recieved the item broken. Here is my order ID: ${generateRandomOrderID()}`,
    );
  await authenticatedPage.getByRole("button", { name: "Send" }).click();

  await expect(authenticatedPage.getByRole("alert")).toBeVisible();
  await expect(authenticatedPage.getByRole("alert")).toHaveText(
    "Thanks for your message! We will contact you shortly.",
  );
});
