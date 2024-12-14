import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTagify,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
} from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(),
    presetUno({
      dark: {
        light: '.light-mode',
        dark: '.dark-mode',
      },
    }),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        logo: 'ABeeZee',
      },
    }),
    presetTagify(),
  ],
  transformers: [
    transformerDirectives(),
  ],
  shortcuts: [{
    'bg-base': 'bg-white dark:bg-black',
    'text-base': 'text-gray-700 dark:text-gray-200',
  }],
  theme: {
    colors: {
      momo: '#f596aa',
    },
  },
})
