import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  base: './',
  publicDir: false,
  define: { __SINGLE__: 'true' },
  plugins: [viteSingleFile()],
  build: {
    outDir: 'dist/single',
    emptyOutDir: true,
    assetsInlineLimit: 100_000_000,
    cssCodeSplit: false,
  },
})
