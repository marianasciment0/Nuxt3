import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss'
  ],

  css: [
    'bootstrap/dist/css/bootstrap.min.css'
  ],

  compatibilityDate: '2024-08-09',
});