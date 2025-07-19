import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTagify,
  presetTypography,
  // presetWebFonts,
  presetWind4,
  transformerDirectives,
} from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(),
    presetWind4({
      dark: {
        dark: '.dark-mode',
        light: '.light-mode',
      },
    }),
    presetIcons(),
    presetTypography(),
    // presetWebFonts({
    //   fonts: {
    //     logo: 'ABeeZee',
    //   },
    //   provider: 'google',
    // }),
    presetTagify(),
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
  transformers: [
    transformerDirectives(),
  ],
})
