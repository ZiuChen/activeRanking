import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver()]
    }),
    AutoImport({
      imports: ['vue', 'vue-router']
    }),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: '虚拟区10分钟互动人数排行'
        },
        tags: [
          {
            injectTo: 'head',
            tag: 'meta',
            attrs: {
              name: 'referrer',
              content: 'no-referrer'
            }
          },
          {
            injectTo: 'head',
            tag: 'meta',
            attrs: {
              name: 'description',
              content:
                '虚拟区10分钟互动人数排行前百,ASOUL相关视频在线观看人数前百,互动包括：弹幕、SC、礼物、舰长'
            }
          },
          {
            injectTo: 'head',
            tag: 'meta',
            attrs: {
              name: 'keywords',
              content:
                '虚拟区,虚拟区排行,虚拟区互动排行,虚拟区互动人数排行,虚拟区弹幕排行,虚拟区SC排行,虚拟区礼物排行,虚拟区舰长排行,虚拟区ASOUL视频在线观看人数排行'
            }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  server: {
    port: 3030,
    proxy: {
      '/api': {
        target: 'https://vup.loveava.top/',
        // target: 'http://127.0.0.1:655/',
        changeOrigin: true
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
