import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/careers": {
        target: "http://dev.codeleap.co.uk",
        changeOrigin: true,
      },
    },
  },
})