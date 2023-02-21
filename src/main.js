import {createApp} from 'vue';
import App from './App.vue';
import axios from 'axios'
import VueAxios from 'vue-axios'
import '@popperjs/core'
import 'bootstrap/scss/bootstrap.scss'
import 'bootstrap'
import router from "./router/router";

let app = createApp(App)
app.use(VueAxios, axios)
app.use(router)
app.mount('#app');