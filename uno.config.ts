import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTagify,
  presetTypography,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetWind4({
      preflights: {
        reset: true,
      },
    }),
    presetIcons(),
    presetAttributify(),
    presetTypography({
      cssExtend: {
        'a': {
          'text-decoration-line': 'none',
          'transition': 'color 0.2s ease',
        },
        'a:hover': {
          'color': '#f596aa',
          'text-decoration-line': 'underline',
        },
      },
    }),
    presetTagify(),
  ],

  theme: {
    colors: {
      corn: '#ebe18b',
      momo: '#f596aa',
    },
  },

  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
  ],
})
