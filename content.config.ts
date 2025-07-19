import { defineCollection, z } from '@nuxt/content'

export const collections = {
  content: defineCollection({
    schema: z.object({
      date: z.date(),
    }),
    source: '**',
    type: 'page',
  }),
  huisi: defineCollection({
    schema: z.object({
      date: z.date(),
    }),
    source: 'huisi/**',
    type: 'page',
  }),
  jingdu: defineCollection({
    schema: z.object({
      date: z.date(),
    }),
    source: 'jingdu/**',
    type: 'page',
  }),
  puti: defineCollection({
    schema: z.object({
      date: z.date(),
    }),
    source: 'puti/**',
    type: 'page',
  }),
  wudao: defineCollection({
    schema: z.object({
      date: z.date(),
    }),
    source: 'wudao/**',
    type: 'page',
  }),
  xiuxing: defineCollection({
    schema: z.object({
      date: z.date(),
    }),
    source: 'xiuxing/**',
    type: 'page',
  }),
}
