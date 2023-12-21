import StravaProvider from "next-auth/providers/strava"
import { NuxtAuthHandler } from "#auth"
import { PrismaClient, WorkoutSource } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter"

const prisma = new PrismaClient();

const runtimeConfig = useRuntimeConfig();

const toWorkoutService = (service: string | undefined): WorkoutSource => {
  switch (service) {
    case "strava":
      return WorkoutSource.STRAVA;
    default:
      throw new Error("Unsupported connected service");
  }
};

// @ts-ignore
const stravaProvider = StravaProvider.default({
  clientId: `${runtimeConfig.auth.strava.clientId}`,
  clientSecret: `${runtimeConfig.auth.strava.clientSecret}`,
  token: {
    // @ts-ignore
    async request({ client, params, checks, provider }) {
      const { token_type, expires_at, refresh_token, access_token } =
        await client.oauthCallback(provider.callbackUrl, params, checks);
      return {
        tokens: { token_type, expires_at, refresh_token, access_token },
      };
    },
  },
})

export default NuxtAuthHandler({
  debug: runtimeConfig.auth.debug,
  secret: runtimeConfig.auth.secret,
  providers: [stravaProvider],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: async ({ session, user }) => {
      if (session.user) {
        session.user.id = user.id;
        session.user.verifiedEmail = user.emailVerified;
      }

      return session;
    }
  }
});