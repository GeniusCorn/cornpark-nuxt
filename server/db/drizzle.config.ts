/* eslint-disable node/prefer-global/process */
import type { Config } from 'drizzle-kit'
import 'dotenv/config'

export default {
  dbCredentials: {
    authToken: process.env.NUXT_TURSO_AUTH_TOKEN!,
    url: process.env.NUXT_TURSO_DATABASE_URL!,
  },
  dialect: 'turso',
  out: './server/db/migrations',
  schema: './server/db/schema.ts',
} satisfies Config
