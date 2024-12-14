import process from 'node:process'

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
  ],
  compatibilityDate: '2024-04-03',
  routeRules: {
    '/': { prerender: true },
  },
  content: {
    database: {
      type: 'd1',
      binding: process.env.NUXT_DB_ID as string,
    },
    build: {
      markdown: {
        highlight: {
          theme: {
            // Default theme (same as single string)
            default: 'catppuccin-latte',
            // Theme used if `html.dark`
            dark: 'catppuccin-mocha',
          },
        },
      },
    },
  },
  devtools: { enabled: true },
})
