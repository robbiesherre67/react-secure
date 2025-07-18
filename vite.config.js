import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

// Boilerplate to get __dirname in ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      // whenever Vite does `import('parse5')`, use our shim instead:
      'parse5': path.resolve(__dirname, 'vite-parse5-shim.js')
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/backend': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: p => p.replace(/^\/backend/, '')
      }
    }
  }
})
