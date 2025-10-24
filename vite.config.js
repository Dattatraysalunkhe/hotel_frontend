import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
  plugins: [react()],

   // 👇 Build setup for deployment on Render
  build: {
    outDir: 'dist', // make sure Render's publish directory = "dist"
  },

  // 👇 Ensure public files (like _redirects) are copied to the dist folder
  publicDir: 'public',
  
})
