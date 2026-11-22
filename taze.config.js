import { defineConfig } from 'taze'

export default defineConfig({
  depFields: {
    overrides: false,
  },
  force: true,
  ignoreOtherWorkspaces: true,
  ignorePaths: [
    '**/node_modules/**',
    '**/test/**',
  ],
  install: true,
  retry: 4,
  write: true,
})
