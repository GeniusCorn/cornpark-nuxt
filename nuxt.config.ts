import process from 'node:process'

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    'dayjs-nuxt',
  ],

  compatibilityDate: '2024-04-03',

  routeRules: {
    '/': { prerender: true },
  },

  content: {
    database: {
      type: 'd1',
      bindingName: 'cornpark',
      binding: process.env.NUXT_DB_ID,
    },
    build: {
      pathMeta: {},
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

  dayjs: {
    locales: ['en'],
    plugins: [
      'timezone',
      'relativeTime',
      'utc',
      'localizedFormat',
    ],
    defaultLocale: 'en',
  },

  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
})
