export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { href: '/favicon.ico', rel: 'icon', type: 'image/x-icon' },
      ],
      title: 'CornPark',
    },

    pageTransition: {
      mode: 'out-in',
      name: 'page',
    },
  },

  colorMode: {
    fallback: 'light',
    preference: 'system',
    storage: 'localStorage',
    storageKey: 'color-mode',
  },

  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            dark: 'vitesse-dark',
            default: 'vitesse-light',
          },
        },
      },
    },
  },

  css: [
    '~/styles/main.css',
    '~/styles/toggle.css',
  ],

  devtools: {
    enabled: true,
  },

  modules: [
    '@nuxt/content',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
  ],

  unocss: {
    nuxtLayers: true,
  },
})
