import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vueDevTools from 'vite-plugin-vue-devtools'

import packageJson from './package.json'

export default defineConfig({
  server:{
    proxy:{
      '^/mti-': {
        target: 'http://10.168.4.205/',
        changeOrigin: true
      },
    }
  },
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@lib': fileURLToPath(new URL('./lib', import.meta.url)),
    }
  },
  build: {
    lib: {
      entry: './lib/index.js',
      fileName: (format, entryName) => `${packageJson.name}.${format}.js`,
      name: packageJson.name,
    },
  },
})
