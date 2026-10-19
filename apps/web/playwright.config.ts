import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  use: { baseURL: "http://localhost:3000", screenshot: "only-on-failure" },
  webServer: { command: "bun run dev", url: "http://localhost:3000", reuseExistingServer: true },
});
