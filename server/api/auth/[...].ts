import StravaProvider from "next-auth/providers/strava"
import { NuxtAuthHandler } from "#auth"

const runtimeConfig = useRuntimeConfig();

export default NuxtAuthHandler({
  secret: runtimeConfig.auth.secret,
  providers: [
    // @ts-ignore
    StravaProvider.default({
      clientId: runtimeConfig.auth.strava.clientId,
      clientSecret: runtimeConfig.auth.strava.clientSecret
    })
  ]
});