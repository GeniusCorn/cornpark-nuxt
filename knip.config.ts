import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  entry: [
    // referenced from markdown (MDC) or rendered implicitly by <ContentRenderer>
    'app/components/content/ProseImg.vue',
    'app/components/home/*.vue',
    // configs loaded by their CLI, not imported anywhere
    'content.config.ts',
  ],
  // @iconify-json/*: icon collections are read by unocss presetIcons at build time
  ignoreDependencies: ['@iconify-json/*'],
}

export default config
