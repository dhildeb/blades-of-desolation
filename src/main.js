import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast from 'vue-toastification'
import 'jquery'
import "vue-toastification/dist/index.css";

// // Get a database reference to our posts
// const db = getDatabase()
// const ref = db.ref('gs://game-pics.appspot.com/characters/')

// // Attach an asynchronous callback to read the data at our posts reference
// ref.on('value', (snapshot) => {
//   console.log(snapshot.val())
// }, (errorObject) => {
//   console.log('The read failed: ' + errorObject.name)
// })

createApp(App).use(store).use(router).use(Toast).mount('#app')
