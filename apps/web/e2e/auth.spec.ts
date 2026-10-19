import { expect, test } from "@playwright/test";

test("sign-in page renders", async ({ page }) => {
  await page.goto("/sign-in");
  await expect(page).toHaveURL(/sign-in/);
  await expect(page.getByTestId("demo-auth-card")).toBeVisible();
  await expect(page.getByRole("link", { name: "Open the app" })).toBeVisible();
});

test("sign-up page renders", async ({ page }) => {
  await page.goto("/sign-up");
  await expect(page).toHaveURL(/sign-up/);
  await expect(page.getByTestId("demo-auth-card")).toBeVisible();
});
