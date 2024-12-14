import { defineCollection, z } from '@nuxt/content'

export const collections = {
  content: defineCollection({
    type: 'page',
    source: '**',
    schema: z.object({
      date: z.date(),
    }),
  }),
  huisi: defineCollection({
    type: 'page',
    source: 'huisi/**',
    schema: z.object({
      date: z.date(),
    }),
  }),
  jingdu: defineCollection({
    type: 'page',
    source: 'jingdu/**',
    schema: z.object({
      date: z.date(),
    }),
  }),
  puti: defineCollection({
    type: 'page',
    source: 'puti/**',
    schema: z.object({
      date: z.date(),
    }),
  }),
  wudao: defineCollection({
    type: 'page',
    source: 'wudao/**',
    schema: z.object({
      date: z.date(),
    }),
  }),
  xiuxing: defineCollection({
    type: 'page',
    source: 'xiuxing/**',
    schema: z.object({
      date: z.date(),
    }),
  }),
}
