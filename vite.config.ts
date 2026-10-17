import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import dtsPlugin from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  root: resolve(import.meta.dirname, 'src'),
  publicDir: resolve(import.meta.dirname, 'public'),
  build: {
    emptyOutDir: true,
    outDir: '../lib',
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.tsx'),
      name: 'index',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        math: 'always',
        globalVars: {
          mainColor: 'red',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, 'src'),
    },
  },
  assetsInclude: ['**/*.gltf', '**/*.glb', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg'],
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
    dtsPlugin({ insertTypesEntry: true, outDirs: '../lib' }),
  ],
  server: {
    open: true,
    port: 5173,
  },
});
