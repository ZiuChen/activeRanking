import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  // css
  css: {
    preprocessorOptions: {
      less: {}
    }
  },
  // proxy
  server: {
    proxy: {
      '/api': {
        target: 'https://vup.loveava.top/',
        changeOrigin: true
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
