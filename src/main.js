import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast from 'vue-toastification'
import 'jquery'
import "vue-toastification/dist/index.css";

createApp(App).use(store).use(router).use(Toast).mount('#app')
