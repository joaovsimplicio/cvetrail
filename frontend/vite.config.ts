import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    // In development, forward /api to the FastAPI server so the browser sees a single origin.
    proxy: {
      "/api": "http://localhost:8000",
    },
  },
});
