// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ["@nuxt/ui", "@vueuse/nuxt"],
  app: {
    head: {
      link: [
        {rel:"stylesheet", href:"https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css"}
      ]
    }
  },
  runtimeConfig: {
    public: {
      mapboxToken: process.env.MAPBOX_ACCESS_TOKEN
    }
  }
})