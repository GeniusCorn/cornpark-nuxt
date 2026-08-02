import {
  defineCollection,
  defineContentConfig,
  z,
} from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      source: '*.md',
      type: 'page',
    }),
    posts: defineCollection({
      schema: z.object({
        date: z.date(),
      }),
      source: 'posts/**/*.md',
      type: 'page',
    }),
  },
})
