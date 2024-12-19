import { defineConfig } from 'vite'
import packageJson from './package.json'
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@lib': path.resolve(__dirname, 'lib'),
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
