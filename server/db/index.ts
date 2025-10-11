/* eslint-disable node/prefer-global/process */
import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import 'dotenv/config'

const client = createClient({
  authToken: process.env.NUXT_TURSO_AUTH_TOKEN!,
  url: process.env.NUXT_TURSO_DATABASE_URL!,
})
export const db = drizzle({ client })
