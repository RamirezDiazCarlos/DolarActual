import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: '/DolarActual/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'charts-apex': ['apexcharts', 'react-apexcharts'],
        }
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.js'
  }
})
