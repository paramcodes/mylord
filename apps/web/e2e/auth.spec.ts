import { test, expect } from "@playwright/test";

test("sign-in page renders", async ({ page }) => {
  await page.goto("/sign-in");
  await expect(page).toHaveURL(/sign-in/);
  await page.screenshot({ path: "e2e/screenshots/sign-in.png", fullPage: true });
});

test("sign-up page renders", async ({ page }) => {
  await page.goto("/sign-up");
  await expect(page).toHaveURL(/sign-up/);
  await page.screenshot({ path: "e2e/screenshots/sign-up.png", fullPage: true });
});
