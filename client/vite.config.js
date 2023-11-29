import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import istanbul from "vite-plugin-istanbul";

// https://vitejs.dev/config/
export default defineConfig({
  // build: {
  //   sourcemap: true,
  // },
  plugins: [
    react(),
    istanbul({
      include: "src/*",
      extension: [".js", ".jsx", ".ts", ".tsx"],
      cypress: true,
      requireEnv: false,
      forceBuildInstrument: true,
    }),
  ],
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 5173,
  },
});
