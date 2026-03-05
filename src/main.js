import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.scss'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'

const vuetify = createVuetify()

createApp(App)
  .use(vuetify)
  .mount('#app')