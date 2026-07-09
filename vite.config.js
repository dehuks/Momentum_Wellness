import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { imagetools } from 'vite-imagetools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), imagetools()],
  server: {
    proxy: {
      // Local PHP dev server for the blog API: `php -S localhost:8080 -t public`
      // Proxying keeps requests same-origin so the session cookie works in dev,
      // matching how it behaves in production (same domain as the built app).
      '/api': 'http://localhost:8080',
      '/uploads': 'http://localhost:8080',
    },
  },
})
