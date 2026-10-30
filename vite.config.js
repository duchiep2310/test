import { defineConfig } from "vite";

// Relative asset paths work at both a domain root and GitHub Pages /test/.
export default defineConfig({
  base: "./",
  server: { proxy: { "/ws": { target: "ws://127.0.0.1:3001", ws: true } } },
});
