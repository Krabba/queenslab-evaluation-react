/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@queenslab": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    dir: "./tests/unit",
  },
  plugins: [react()],
});
