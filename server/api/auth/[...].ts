import StravaProvider from "next-auth/providers/strava"
import { NuxtAuthHandler } from "#auth"
import { PrismaClient, WorkoutSource } from "@prisma/client";

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
  clientSecret: `${runtimeConfig.auth.strava.clientSecret}`
})

export default NuxtAuthHandler({
  debug: runtimeConfig.auth.debug,
  secret: runtimeConfig.auth.secret,
  providers: [stravaProvider],
  callbacks: {
    session: async ({ session, token, user }) => {
      console.log("SESSION CALLBACK");
      console.log(session);
      console.log(token);
      console.log(user);

      return session;
    }
  }
});