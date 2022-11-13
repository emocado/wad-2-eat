import { fileURLToPath, URL } from 'node:url'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      "/v3": {
        target: "https://api.yelp.com",
        changeOrigin: true,
        secure: false,
      },
      "/decision": {
        target: "https://yapaloysius.pythonanywhere.com",
        changeOrigin: true,
        secure: false,
      }
    },
  },
})
