import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      url: false, // 👈 disables usage of Node's 'url' in client
    },
  },
  server: {
    host: "0.0.0.0", // 👈 allows access from mobile or LAN devices
  },
})
