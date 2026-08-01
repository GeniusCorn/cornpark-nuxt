// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@unocss/nuxt',
  ],

  unocss: {
    nuxtLayers: true,
  },

  devtools: {
    enabled: true,
  },
})
