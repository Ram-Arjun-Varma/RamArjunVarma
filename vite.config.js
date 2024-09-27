// vite.config.js
import { defineConfig } from "vite"
import { resolve } from 'node:path'

export default defineConfig({
  base: "",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        projects: resolve(__dirname, 'projects.html')
      },
    },
  },
})