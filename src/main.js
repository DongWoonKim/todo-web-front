import { createApp } from 'vue'
import App from './App.vue'
import gAuthPlugin from 'vue3-google-oauth2'
import store from './store'
import mitt from 'mitt'
import Axios from './service/axios'

const emitter = mitt();
const app = createApp(App)

// let gauthClientId = "768834812579-ivi0oopbkqe05cg6t41p83t7gteekut6.apps.googleusercontent.com";
let gauthClientId = "768834812579-ivi0oopbkqe05cg6t41p83t7gteekut6.apps.googleusercontent.com";
app.use(gAuthPlugin, { clientId: gauthClientId, scope: 'email', prompt: 'consent', fetch_basic_profile: false })
app.use(store)
app.use(Axios)


/*
 * 전역 변수
*/
app.config.globalProperties.emitter = emitter
app.config.globalProperties.$store = store
app.config.globalProperties.axiosConfig = { headers : { "Content-Type" : "application/json" } }

app.mount('#app')
