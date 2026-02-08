import { fileURLToPath } from 'node:url'
import {
  defineVitestProject,
} from '@nuxt/test-utils/config'
import { playwright } from '@vitest/browser-playwright'
import {
  defineConfig,
} from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      await defineVitestProject({
        test: {
          browser: {
            enabled: true,
            instances: [
              {
                browser: 'chromium',
                headless: true,
              },
            ],
            provider: playwright(),
          },
          environment: 'nuxt',
          environmentOptions: {
            nuxt: {
              overrides: {
                experimental: {
                  payloadExtraction: false,
                  viteEnvironmentApi: false,
                },
                vite: {
                  resolve: {
                    alias: {
                      dayjs: 'dayjs/esm',
                    },
                  },
                },
              },
              rootDir: fileURLToPath(new URL('.', import.meta.url)),
            },
          },
          include: ['test/nuxt/**/*.{test,spec}.ts'],
          name: 'nuxt',
        },
      }),
    ],
  },
})
