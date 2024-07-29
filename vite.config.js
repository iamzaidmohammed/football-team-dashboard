import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["react-icons"],
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:80/african-vibes-ecommnerce-backend",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
