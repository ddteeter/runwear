import path from 'node:path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // @ts-expect-error Some sort of strange infinite circle thing with @sidebase/nuxt-auth
  modules: ['@sidebase/nuxt-auth', 'nuxt-primevue'],
  auth: {
    globalAppMiddleware: true,
    provider: {
      type: 'authjs',
    },
    pages: {
      newUser: '/registration/',
    },
  },
  devtools: { enabled: true },
  typescript: {
    typeCheck: true,
  },
  primevue: {
    unstyled: true,
    importPT: { from: path.resolve(__dirname, './presets/') }, // import and apply preset
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    server: {
      baseUri: 'http://localhost:3000',
      api: {
        baseUri: 'http://localhost:3000/api',
      },
      app: {
        baseUri: 'http://localhost:3000/app',
      },
    },
    email: {
      postmark: {
        apiKey: '',
      },
    },
    auth: {
      origin: '',
      secret: '',
      debug: false,
      strava: {
        clientId: '',
        clientSecret: '',
      },
    },
  },
})
