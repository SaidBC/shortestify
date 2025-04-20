import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: ".env.test" });

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup",
    mockReset: true,
  },
  resolve: {
    alias: {
      "next-auth/providers/credentials": path.resolve(
        __dirname,
        "./__mocks__/next-auth/providers/credentials.js"
      ),
      "next-auth": path.resolve(__dirname, "./__mocks__/next-auth.js"),
    },
  },
});
