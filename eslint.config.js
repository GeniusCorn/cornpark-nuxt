import antfu from '@antfu/eslint-config'

export default antfu({
  unocss: true,
  vue: true,
  typescript: true,
  rules: {
    'pnpm/yaml-enforce-settings': 'off',
  },
})
