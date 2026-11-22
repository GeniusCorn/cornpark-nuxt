import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTagify,
  presetTypography,
  presetWebFonts,
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
          transition: 'color 0.2s ease',
        },
        'a:hover': {
          color: '#f596aa',
        },
      },
    }),
    presetTagify(),
    presetWebFonts({
      fonts: {
        geist: 'Geist Mono',
        inter: 'Inter',
        sans: [
          {
            name: 'Noto Sans SC',
            weights: ['400', '600', '900'],
          },
        ],
        wenkai: 'LXGW WenKai Mono TC',
      },
      provider: 'google',
    }),
  ],

  theme: {
    colors: {
      corn: '#ebe18b',
      momo: '#f596aa',
    },
    // Geist Mono has no CJK glyphs, so Chinese used to fall through to the
    // system mono font — give it a real mono CJK face, then the body font
    font: {
      mono: '"Geist Mono", "LXGW WenKai Mono TC", "Noto Sans SC", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
  },

  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
  ],
})
