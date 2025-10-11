/* eslint-disable node/prefer-global/process */
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '~~/server/db/index'
import * as schema from '~~/server/db/schema'

export const auth = betterAuth({
  database: drizzleAdapter(
    db,
    {
      provider: 'sqlite',
      schema: {
        ...schema,
      },
    },
  ),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },

})
