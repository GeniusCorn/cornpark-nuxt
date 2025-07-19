import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: {
    css: 'prettier',
    markdown: 'prettier',
  },
  ignores: ['**/*.md'],
  pnpm: true,
  rules: {
    'perfectionist/sort-array-includes': 'error',
    'perfectionist/sort-classes': 'error',
    'perfectionist/sort-decorators': 'error',
    'perfectionist/sort-enums': 'error',
    'perfectionist/sort-exports': 'error',
    'perfectionist/sort-heritage-clauses': 'error',
    'perfectionist/sort-interfaces': 'error',
    'perfectionist/sort-intersection-types': 'error',
    'perfectionist/sort-jsx-props': 'error',
    'perfectionist/sort-maps': 'error',
    'perfectionist/sort-modules': 'error',
    'perfectionist/sort-object-types': 'error',
    'perfectionist/sort-objects': 'error',
    'perfectionist/sort-sets': 'error',
    'perfectionist/sort-switch-case': 'error',
    'perfectionist/sort-union-types': 'error',
    'perfectionist/sort-variable-declarations': 'error',
  },
  typescript: true,
  unocss: true,
  vue: true,
})
