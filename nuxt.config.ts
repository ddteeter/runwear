import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // @ts-ignore
  modules: ["@sidebase/nuxt-auth"],
  auth: {
    adapter: PrismaAdapter(prisma),
    globalAppMiddleware: true,
    navigateAuthenticatedTo: "/app",  
    provider: {
      type: "authjs"
    },
    pages: {
      newUser: "/registration/"
    },
    callbacks: {
      signIn: () => {
        return true;
      }
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
