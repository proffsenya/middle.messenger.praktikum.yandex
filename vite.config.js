import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'
import path from 'path'

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: path.resolve(__dirname, 'src/templates')
    }),
  ],
  css: {
    postcss: './postcss.config.js'
  },
  build: {
    rollupOptions: {
      input: './index.html'
    }
  },
  server: {
    port: 3000
  }
})
