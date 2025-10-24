import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

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
  plugins: [
    react(),
    // 👇 Ensure _redirects is copied to dist root
    viteStaticCopy({
      targets: [
        { src: 'public/_redirects', dest: '' } // copies to dist/
      ]
    })
  ],
  build: {
    outDir: 'dist', // Render publish directory
  },
  publicDir: 'public',

})
