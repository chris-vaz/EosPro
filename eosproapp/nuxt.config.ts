// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    'nuxt-icon',
    // other modules...
  ],
  build: {
    transpile: ['latex.js']
  },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
    optimizeDeps: {
      include: ['latex.js']
    }
  },
})
