import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Datamap } from 'datamaps'
import * as d3 from 'd3'
import * as topojson from 'topojson'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Datamap())
app.use(d3())
app.use(topojson())

app.mount('#app')
