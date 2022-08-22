<template>
<div class="d-md-flex bg-dark" :class="this.$route.name == 'MapLocation' ? 'window-fluid-sm' : ''">
  <CharacterDetailsModal :character="character" ref="characterDetailsModal" />
  <router-view class="order-2 order-md-1"></router-view>
  <PlayerStatsSideWindow class="order-1 order-md-2" />
</div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import { computed, onMounted } from "@vue/runtime-core"
import firebaseApp from 'firebase/app'
import {getDownloadURL, getStorage, listAll, ref} from 'firebase/storage'
import $ from 'jquery'
import $store from '@/store/index'
import PlayerStatsSideWindow from "./components/PlayerStatsSideWindow.vue"
import CharacterDetailsModal from "./components/CharacterDetailsModal.vue"

export default {
  components: { PlayerStatsSideWindow, CharacterDetailsModal },
  setup() {
    onMounted(()=>{
      if($store.state.characterImgList.length > 0){
        return
      }
      if(window.location.origin.includes('localhost')){
        let folder = "assets/characters/"
        $.ajax({
          url: folder,
          async: false,
          success: function(data){
            $(data).find("a").attr("href", function (i, val) {
              if( val.match(/\.(jpe?g|png|gif)$/) ) { 
                $store.state.characterImgList.push(val)
              }
            })
          }
        })
        folder = "assets/locations/"
        $.ajax({
          url: folder,
          async: false,
          success: function(data){
            $(data).find("a").attr("href", function (i, val) {
              if( val.match(/\.(jpe?g|png|gif)$/) ) { 
                $store.state.locationImgList.push(val)
              }
            })
          }
        })
      }else{
        const storage = getStorage(firebaseApp)
        listAll(ref(storage, 'characters/')).then((res) => {
          res.items.forEach((itemRef)=>{
            getDownloadURL(ref(storage, '/'+itemRef._location.path_)).then((url)=>{
              $store.state.characterImgList.push(url)
            })
          })
        }).catch((error) => {
          console.log(error)
        })
        listAll(ref(storage, 'locations/')).then((res) => {
          res.items.forEach((itemRef)=>{
            getDownloadURL(ref(storage, '/'+itemRef._location.path_)).then((url)=>{
              $store.state.locationImgList.push(url)
            })
          })
        }).catch((error) => {
          console.log(error)
        })
      }
    })
    const state = reactive({
      character: computed(()=> $store.state.selected),
    })
  return state
  },
  methods: {

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #f8f9fa;
  user-select: none;
}

nav {
  padding: 30px;
}
nav a {
  font-weight: bold;
  color: #f8f9fa;
}
nav a.router-link-exact-active {
  color: #42b983;
}

.modal-content{
  background-color: black;
}

.bg-img{
  background-size: cover;
}
.click{
  cursor: pointer;
}
.attack-cursor{
  cursor: url(https://cur.cursors-4u.net/sports/spo-1/spo26.cur), auto !important;
}
.uncommon{
  color: #0cc50c;
}
.rare{
  color: #6464ff;
}
.very-rare{
  color: #cd89ff;
}
.legendary{
  color: #ffd700d9;
}
::-webkit-scrollbar {
  width: 1rem;
}
 ::-webkit-scrollbar-track {
   background-color: rgba(0, 0, 0, 0.5);
   width: auto;
   opacity: 0;
 }
::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.5);
  background-image: url('../public/assets/sword-bar.png');
  background-size: contain;
  background-repeat: no-repeat;
} 
::-webkit-scrollbar-button:vertical:decrement{
  background-color: rgba(0, 0, 0, 0.5);
  background-image: url('../public/assets/shield-bar.png');
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
