import { expect, test } from "@playwright/test";

test("send message flow", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("composer-input").fill("hello e2e");
  await page.getByTestId("composer-send").click();
  await expect(page.getByTestId("message-item").filter({ hasText: "hello e2e" })).toBeVisible();
});

test("enter key sends a message", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("composer-input").fill("sent with enter");
  await page.getByTestId("composer-input").press("Enter");
  await expect(page.getByTestId("message-item").filter({ hasText: "sent with enter" })).toBeVisible();
});
