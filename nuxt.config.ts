
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // @ts-ignore
  modules: ["@sidebase/nuxt-auth"],
  auth: {
    globalAppMiddleware: true,
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
    server: {
      baseUri: "http://localhost:3000",
      api: {
        baseUri: "http://localhost:3000/api"
      },
      app: {
        baseUri: "http://localhost:3000/app"
      }
    },
    email: {
      postmark: {
        apiKey: ""
      }
    },
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
