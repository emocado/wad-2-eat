import "bootstrap/dist/css/bootstrap.css";
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import './assets/main.css'
import VueGoogleMaps from '@fawmi/vue-google-maps'

const app = createApp(App)

app.use(router)

app.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyDJx4A_FqpmuCF40Tm-gs4F0Z3we45UH6c',
    },
})

app.mount('#app')
import "bootstrap/dist/js/bootstrap.js";