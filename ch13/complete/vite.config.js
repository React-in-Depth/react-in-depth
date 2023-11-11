import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    setupFilesAfterEnv: ["./vitest.setup.js"],
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: "istanbul",
      exclude: ["**/*.test.js", "**/*.stories.jsx"],
    },
  },
});
