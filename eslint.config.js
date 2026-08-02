import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'perfectionist/sort-objects': 'error',
    'pnpm/yaml-enforce-settings': 'off',
    'vue/attributes-order': ['error', {
      alphabetical: true,
    }],
    'vue/max-attributes-per-line': ['error', {
      multiline: 1,
      singleline: 1,
    }],
    'vue/new-line-between-multi-line-property': 'error',
    'vue/padding-line-between-tags': ['error'],
    'vue/sort-keys': 'error',
  },
  typescript: true,
  unocss: true,
  vue: true,
})
