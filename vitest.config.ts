import {
  defineVitestConfig,
} from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    coverage: {
      // enabled: true,
      provider: 'v8',
    },
    environment: 'nuxt',
    globals: true,
  },
})
