import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Static SPA — builds to dist/ for S3 + CloudFront hosting.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
