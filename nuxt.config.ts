// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@unocss/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
  ],
  nitro: {
    prerender: {
      autoSubfolderIndex: false,
    },
  },
  devtools: { enabled: true },
  colorMode: {
    preference: 'system',
    fallback: 'light',
  },
  content: {
    highlight: {
      theme: {
        default: 'vitesse-light',
        dark: 'vitesse-black',
      },
      langs: [
        'json',
        'js',
        'ts',
        'html',
        'css',
        'vue',
        'shell',
        'mdc',
        'md',
        'yaml',
        'dockerfile',
      ],
    },
    experimental: {
    },
  },
})
