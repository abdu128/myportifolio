import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimize build performance
    target: 'esnext',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          framer: ['framer-motion'],
          lucide: ['lucide-react']
        }
      }
    },
    // Reduce bundle size
    chunkSizeWarningLimit: 1000,
    // Optimize CSS
    cssCodeSplit: true,
    // Source maps for development only
    sourcemap: false
  },
  // Optimize development server
  server: {
    port: 5173,
    host: true,
    // Enable HMR optimization
    hmr: {
      overlay: false
    }
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react']
  },
  // CSS optimization
  css: {
    devSourcemap: false
  }
})
