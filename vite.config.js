import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      // '/api'へのリクエストを 'http://localhost:8081'に転送
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true, // 仮想ホストサイトのオリジンを変更
        rewrite: (path) => path.replace(/^\/api/, '') // '/api'を削除して転送
      }
    }
  }
})
