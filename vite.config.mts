import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    environment: "jsdom",
    restoreMocks: true,
    unstubEnvs: true,
    setupFiles: ["./src/setup-tests.ts"],
    include: ["./src/**/*.spec.{ts,tsx}"],
    exclude: ["./src/e2e/tests/*.spec.ts"],
  },
});
