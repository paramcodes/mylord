import { expect, test } from "@playwright/test";

test("channel navigation", async ({ page }) => {
  await page.goto("/");
  await page.waitForSelector('[data-testid="channel-item"]');
  const items = page.getByTestId("channel-item");
  await expect(items).toHaveCount(4);
  await expect(page.getByTestId("channel-header")).toContainText("general");
  await items.nth(1).click();
  await expect(items.nth(1)).toHaveClass(/font-semibold/);
  await expect(page.getByTestId("channel-header")).toContainText("random");
});

test("server list renders the seeded servers", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("server-item")).toHaveCount(2);
});

test("member list renders the seeded members", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("member-item")).toHaveCount(5);
  await expect(page.getByTestId("member-item").filter({ hasText: "Jonas Weber" })).toHaveAttribute(
    "data-status",
    "idle",
  );
});

test("typing indicator shows another member typing", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("typing-indicator")).toContainText("Priya Raman");
});
