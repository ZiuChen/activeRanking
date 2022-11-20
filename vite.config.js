import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
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
