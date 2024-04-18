import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@emoji-datasource-facebook": path.resolve(__dirname, "node_modules/emoji-datasource-facebook/img/facebook/64/"),
    },
  },
})
