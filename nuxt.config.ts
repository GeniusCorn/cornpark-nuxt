export default defineNuxtConfig({
  colorMode: {
    classPrefix: '',
    classSuffix: '',
    dataValue: 'theme',
    fallback: 'system',
    preference: 'system',
  },

  compatibilityDate: '2024-04-03',

  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            // Theme used if `html.dark`
            dark: 'catppuccin-mocha',
            // Default theme (same as single string)
            default: 'catppuccin-latte',
          },
        },
      },
      pathMeta: {},
    },
  },

  css: [
    '~/assets/main.css',
    '~/assets/view-transition.css',
  ],

  dayjs: {
    defaultLocale: 'en',
    locales: ['en'],
    plugins: [
      'timezone',
      'relativeTime',
      'utc',
      'localizedFormat',
    ],
  },

  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  modules: [
    '@nuxt/content',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    'dayjs-nuxt',
  ],

  routeRules: {
    '/': { prerender: true },
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        types: ['vitest/globals'],
      },
    },
  },
})
