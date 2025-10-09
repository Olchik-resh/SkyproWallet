import './assets/main.css'

import { createApp } from 'vue'
import App from '../src/views/App.vue'
import router from './router/index.js'
import auth from './services/auth'

const app = createApp(App)

app.provide('auth', auth)
app.use(router)
app.mount('#app')

