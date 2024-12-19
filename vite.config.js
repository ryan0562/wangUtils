import { defineConfig } from 'vite'
import packageJson from './package.json'

export default defineConfig({
  build: {
    lib: {
      entry: './lib/index.js',
      fileName: (format, entryName) => `${packageJson.name}.${format}.js`,
      name: packageJson.name,
    },
  },
})
