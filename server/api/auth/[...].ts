import StravaProvider from "next-auth/providers/strava"
import { NuxtAuthHandler } from "#auth"

const runtimeConfig = useRuntimeConfig();

// @ts-ignore
const stravaProvider = StravaProvider.default({
  clientId: `${runtimeConfig.auth.strava.clientId}`,
  clientSecret: `${runtimeConfig.auth.strava.clientSecret}`
})

export default NuxtAuthHandler({
  debug: runtimeConfig.auth.debug,
  secret: runtimeConfig.auth.secret,
  providers: [stravaProvider]
});