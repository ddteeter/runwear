
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // @ts-ignore
  modules: ["@sidebase/nuxt-auth"],
  auth: {
    globalAppMiddleware: true,
    navigateAuthenticatedTo: "/app",  
    provider: {
      type: "authjs"
    },
    pages: {
      newUser: "/registration/"
    }
  },
  devtools: { enabled: true },
  typescript: {
    typeCheck: true,
  },
  runtimeConfig: {
    auth: {
      origin: "",
      secret: "",
      debug: false,
      strava: {
        clientId: "",
        clientSecret: ""
      }
    }
  }
})
