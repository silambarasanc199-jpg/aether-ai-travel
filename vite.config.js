import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration for the AETHER React app
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  }
})
