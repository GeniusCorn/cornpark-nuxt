import { defineConfig } from 'taze'

export default defineConfig({
  exclude: [],
  force: true,
  write: true,
  install: true,
  ignorePaths: [
    '**/node_modules/**',
    '**/test/**',
  ],
  ignoreOtherWorkspaces: true,
  packageMode: {
  },
  depFields: {
    overrides: false,
  },
})
