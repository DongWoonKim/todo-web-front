import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import mitt from 'mitt'
import './service/axios'

const emitter = mitt();
const app = createApp(App)

app.use(store)

/*
 * 전역 변수
*/
app.config.globalProperties.emitter = emitter
app.config.globalProperties.$store = store
app.config.globalProperties.axiosConfig = { headers : { "Content-Type" : "application/json" } }

app.mount('#app')
