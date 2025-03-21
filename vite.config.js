import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import { createVuePlugin as vue2 } from 'vite-plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue2({
      jsx: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      vue: 'vue/dist/vue.esm.js',
      'vue-router': 'vue-router/dist/vue-router.esm.js',
      'vuex': 'vuex/dist/vuex.min.js'
    },
  },
  build: {
    brotliSize: false, // unsupported in StackBlitz
  },
})
