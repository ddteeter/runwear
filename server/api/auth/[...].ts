import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import StravaProvider from 'next-auth/providers/strava'
import { NuxtAuthHandler } from '#auth'
import { sendVerificationEmail } from '~/lib/user/verification/verification-service'

const prisma = new PrismaClient()

const runtimeConfig = useRuntimeConfig()

// @ts-expect-error must call explicit .default, otherwise TS error
const stravaProvider = StravaProvider.default({
  clientId: `${runtimeConfig.auth.strava.clientId}`,
  clientSecret: `${runtimeConfig.auth.strava.clientSecret}`,
  token: {
    // @ts-expect-error any types, but it works
    async request({ client, params, checks, provider }) {
      const { token_type, expires_at, refresh_token, access_token }
        = await client.oauthCallback(provider.callbackUrl, params, checks)
      return {
        tokens: { token_type, expires_at, refresh_token, access_token },
      }
    },
  },
})

export default NuxtAuthHandler({
  debug: runtimeConfig.auth.debug,
  secret: runtimeConfig.auth.secret,
  providers: [stravaProvider],
  adapter: PrismaAdapter(prisma),
  theme: {
    colorScheme: 'light',
    brandColor: '#ffa600',
    buttonText: '#0bceb2',
    logo: '/images/logo/logo.svg',
  },
  callbacks: {
    session: async ({ session, user }) => {
      if (session.user) {
        session.user.id = user.id
        session.user.email = user.email
        session.user.verifiedEmail = user.emailVerified
      }

      return session
    },
  },
  events: {
    createUser: async (message) => {
      if (message.user.email)
        sendVerificationEmail(message.user.id)
    },
  },
})
