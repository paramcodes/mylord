import { expect, test } from "@playwright/test";

test("send message flow", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("composer-input").fill("hello e2e");
  await page.getByTestId("composer-send").click();
  await expect(page.getByText("hello e2e")).toBeVisible();
  await page.screenshot({ path: "e2e/send.png" });
});
