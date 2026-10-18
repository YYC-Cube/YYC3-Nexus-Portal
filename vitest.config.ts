import { defineConfig } from "vitest/config"
import path from "path"

export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["__tests__/**/*.test.{ts,tsx}"],
    setupFiles: ["./__tests__/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["lib/**/*.ts", "components/**/*.{ts,tsx}", "app/**/*.{ts,tsx}"],
      exclude: ["components/ui/**/*.tsx", "styles/**", "docs/**"],
      thresholds: {
        statements: 30,
        branches: 30,
        functions: 22,
        lines: 36,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
})
