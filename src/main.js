import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast from 'vue-toastification'
import 'jquery'
import "vue-toastification/dist/index.css";

const options = {
  timeout: 3000
}

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC83i8pGROHwcHAp1Ecivxl7NyCtJxfWX4",
  authDomain: "game-pics.firebaseapp.com",
  projectId: "game-pics",
  storageBucket: "game-pics.appspot.com",
  messagingSenderId: "105661301499",
  appId: "1:105661301499:web:5e3588750185de5833e65e",
  measurementId: "G-QE7VMGPJB9"
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

createApp(App).use(store).use(router).use(Toast, options).use(firebaseApp).mount('#app')