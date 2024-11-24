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
    presetUno(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      provider: 'bunny',
      fonts: {
        logo: 'ABeeZee',
      },
    }),
    presetTagify(),
  ],
  transformers: [
    transformerDirectives(),
  ],
  theme: {
    colors: {
      momo: '#f596aa',
    },
  },
})
