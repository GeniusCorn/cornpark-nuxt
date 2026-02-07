import { defineConfig } from 'taze'

export default defineConfig({
  depFields: {
    overrides: false,
  },
  exclude: [],
  force: true,
  ignoreOtherWorkspaces: true,
  ignorePaths: [
    '**/node_modules/**',
    '**/test/**',
  ],
  install: true,
  packageMode: 'latest',
  recursive: true,
  write: true,
})
