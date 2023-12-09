// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    "@mdi/font/css/materialdesignicons.css",
    "vuetify/lib/styles/main.sass",
  ],
  modules: ["@nuxtjs/tailwindcss"],
  build: {
    transpile: ["vuetify"],
  },
  devtools: { enabled: true },
  runtimeConfig: {},
});
