import OpenLayersMap from 'vue3-openlayers'
import 'vue3-openlayers/styles.css'

export default defineNuxtPlugin(nuxtApp => {
  const { vueApp } = nuxtApp
  vueApp.use(OpenLayersMap)
})
