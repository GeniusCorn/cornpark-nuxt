// https://nuxt.com/docs/api/configuration/nuxt-config
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
