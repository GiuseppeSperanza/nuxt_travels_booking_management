// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: process.env.NUXT_PAGE_TITLE,
    }
  },
  devtools: { enabled: true }
})
