import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  entry: [
    // referenced from markdown (MDC) or rendered implicitly by <ContentRenderer>
    'app/components/content/ProseImg.vue',
    'app/components/home/*.vue',
    // configs loaded by their CLI, not imported anywhere
    'content.config.ts',
    'taze.config.js',
  ],
  // @iconify/json: icon collections are read by unocss presetIcons at build time
  // taze: run ad-hoc via `pnpm dlx taze`, not a dependency
  ignoreDependencies: ['@iconify/json', 'taze'],
}

export default config
