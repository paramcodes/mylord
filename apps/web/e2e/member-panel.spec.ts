import { expect, test } from "@playwright/test";

test("member panel fills the full height of the column", async ({ page }) => {
  await page.goto("/");
  const panel = page.getByTestId("member-panel");
  await expect(panel.getByTestId("member-item").first()).toBeVisible();

  const viewport = page.viewportSize();
  expect(viewport).not.toBeNull();

  await expect
    .poll(async () => {
      const box = await panel.boundingBox();
      return box ? Math.round(box.height) : 0;
    })
    .toBe(viewport!.height);

  const box = await panel.boundingBox();
  expect(box!.y).toBeCloseTo(0, 0);
});
