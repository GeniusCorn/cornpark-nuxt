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
        description: z.string().optional(),
        title: z.string(),
      }),
      source: 'posts/**/*.md',
      type: 'page',
    }),
  },
})
