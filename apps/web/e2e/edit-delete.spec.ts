import { expect, test } from "@playwright/test";

const OWN_MESSAGE = "Morning! Demo mode is live, no Clerk or Convex keys needed.";

test("edit an own message marks it as edited", async ({ page }) => {
  await page.goto("/");
  const message = page.locator('[data-testid="message-item"][data-message-id="m-1"]');
  await expect(message).toContainText(OWN_MESSAGE);
  await message.getByTestId("message-edit").click();
  await message.getByTestId("message-edit-input").fill("Edited from the e2e suite");
  await message.getByTestId("message-edit-save").click();

  const edited = page.getByTestId("message-item").filter({ hasText: "Edited from the e2e suite" });
  await expect(edited).toBeVisible();
  await expect(edited).toContainText("(edited)");
});

test("delete an own message removes it", async ({ page }) => {
  await page.goto("/");
  const message = page.locator('[data-testid="message-item"][data-message-id="m-1"]');
  await expect(message).toContainText(OWN_MESSAGE);
  await message.getByTestId("message-delete").click();
  await expect(page.getByTestId("message-item").filter({ hasText: OWN_MESSAGE })).toHaveCount(0);
});
