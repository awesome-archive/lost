import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { polyfillNode } from "esbuild-plugin-polyfill-node";
import commonjs from "vite-plugin-commonjs";
export default defineConfig({
  plugins: [react(), polyfillNode({ polyfills: { buffer: true } }), commonjs()],
  optimizeDeps: {
    include: ["react-draggable"],
  },
});
