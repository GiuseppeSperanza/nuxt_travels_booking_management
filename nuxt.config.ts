// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: process.env.NUXT_PAGE_TITLE,
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined' },
      ],
    }
  },
  css: ['@/assets/scss/main.scss'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
  },
  devtools: { enabled: true }
})
