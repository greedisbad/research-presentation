import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  define: { __SINGLE__: 'false' },
  build: { outDir: 'dist/full', emptyOutDir: true },
})
