import { defineCollection } from '@nuxt/content'

export const collections = {
  content: defineCollection({
    type: 'page',
    source: '**',
  }),
  huisi: defineCollection({
    type: 'page',
    source: 'huisi/**',
  }),
  jingdu: defineCollection({
    type: 'page',
    source: 'jingdu/**',
  }),
}
