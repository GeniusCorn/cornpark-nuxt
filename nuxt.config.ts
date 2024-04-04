// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@unocss/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
  ],
  content: {
    experimental: {
      search: {},
    },
  },
})
