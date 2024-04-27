// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@unocss/nuxt',
    // '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    '@nuxtjs/seo',
  ],
  colorMode: {
    preference: 'system',
    fallback: 'light',
  },
  site: {
    url: 'https://nicecorn.com',
    name: 'CornPark',
    description: 'Welcome to CornPark.',
  },
  sitemap: {
    strictNuxtContentPaths: true,
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
        'toml',
      ],
    },
  },
  devtools: { enabled: true },
})
