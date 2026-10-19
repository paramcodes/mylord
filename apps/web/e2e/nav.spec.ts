import { expect, test } from "@playwright/test";

test("channel navigation", async ({ page }) => {
  await page.goto("/");
  await page.waitForSelector('[data-testid="channel-item"]');
  const items = page.getByTestId("channel-item");
  await expect(items).toHaveCount(2);
  await items.nth(1).click();
  await expect(items.nth(1)).toHaveClass(/font-semibold/);
  await page.screenshot({ path: "e2e/screenshots/channel-nav.png", fullPage: true });
});
