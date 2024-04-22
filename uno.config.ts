import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTagify,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import extractorMdc from '@unocss/extractor-mdc'

export default defineConfig({
  shortcuts: [{
    'bg-base': 'bg-white dark:bg-black',
    'text-base': 'text-gray-700 dark:text-gray-200',
  }],
  theme: {
    colors: {
      momo: '#f596AA',
    },
  },
  presets: [
    presetUno({
      dark: {
        light: '.light-mode',
        dark: '.dark-mode',
      },
    }),
    presetIcons(),
    presetAttributify(),
    presetTypography(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Noto Sans',
        mono: 'Fira Code',
        roboto: 'Roboto',
        montserrat: 'Montserrat',
        bebas: 'Bebas Neue',
      },
    }),
    presetTagify(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  extractors: [
    extractorMdc(),
  ],
})
