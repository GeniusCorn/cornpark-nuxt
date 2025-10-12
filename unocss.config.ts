import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTagify,
  presetTypography,
  presetWind4,
  transformerDirectives,
} from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(),
    presetWind4({
      dark: {
        dark: '.dark',
        light: '.light',
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
    'border-base': 'border-[#8884]',
    'color-base': 'text-black dark:text-white',
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
