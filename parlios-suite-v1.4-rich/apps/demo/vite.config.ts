
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, '../../packages/components'),
      '@hooks': path.resolve(__dirname, '../../packages/hooks'),
      '@base44-utils': path.resolve(__dirname, '../../packages/base44-utils'),
      '@ia': path.resolve(__dirname, '../../packages/ia'),
    }
  }
})
