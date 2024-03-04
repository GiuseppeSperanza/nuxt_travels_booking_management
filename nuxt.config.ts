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
  css: ['@/assets/scss/main.scss', 'vue-toast-notification/dist/theme-default.css', 'vue3-form-wizard/dist/style.css'],
  plugins: [

  ],
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/base/_variables.scss" as *;'
        }
      }
    }
  },
  devtools: { enabled: false },
  build: {
    transpile: ['@vuepic/vue-datepicker']
  }
})
