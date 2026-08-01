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
  theme: {
    colors: {
      corn: '#ebe18b',
      momo: '#f596aa',
    },
  },

  presets: [
    presetWind4({
      preflights: {
        reset: true,
      },
    }),
    presetIcons(),
    presetAttributify(),
    presetTypography(),
    presetTagify(),
  ],

  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
  ],
})
