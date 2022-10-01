<template>
<div class="d-md-flex bg-dark h-100v" :class="this.$route.name == 'MapLocation' ? 'window-fluid-sm' : ''">
  <ShopNavBar v-if="this.$route.name == 'MainShop'" />
  <CharacterDetailsModal :character="character" ref="characterDetailsModal" v-if="character" />
  <div class="bg-danger timer" :style="'width: '+((timer/(10000*$store.state.player.characters.length))*100)+'vw'" v-if="$store.state.player?.options?.difficulty != 'easy' && this.$route.name == 'battleField'"></div>
  <router-view class="order-2 order-md-1"></router-view>
  <PlayerStatsSideWindow class="order-1 order-md-2" />
</div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import { computed, onMounted } from "@vue/runtime-core"
import $ from 'jquery'
import $store from '@/store/index'
import firebaseApp from 'firebase/app'
import {getDownloadURL, getStorage, listAll, ref} from 'firebase/storage'
import PlayerStatsSideWindow from "./components/PlayerStatsSideWindow.vue"
import CharacterDetailsModal from "./components/CharacterDetailsModal.vue"
import ShopNavBar from "./components/ShopNavBar.vue"

export default {
  components: { PlayerStatsSideWindow, CharacterDetailsModal, ShopNavBar },
  setup() {
    onMounted(()=>{
      if($store.state.characterImgList.length > 0){
        return
      }
      let folder = "assets/img/characters"
      $.ajax({
        url: folder,
        async: false,
        success: function(data){
          $(data).find("a").attr("href", function (i, val) {
            if( val.match(/\.(jpe?g|png|gif)$/) ) { 
              $store.state.characterImgList.push(val)
            }
          })
        },
        error: function(){
          const storage = getStorage(firebaseApp)
          listAll(ref(storage, 'characters/')).then((res) => {
            res.items.forEach((itemRef)=>{
              getDownloadURL(ref(storage, '/'+itemRef._location.path_)).then((url)=>{
                $store.state.characterImgList.push(url)
              })
            })
          })
        }
      })
      folder = "assets/img/locations/"
      $.ajax({
        url: folder,
        async: false,
        success: function(data){
          $(data).find("a").attr("href", function (i, val) {
            if( val.match(/\.(jpe?g|png|gif)$/) ) { 
              $store.state.locationImgList.push(val)
            }
          })
        },
        error: function(){
          const storage = getStorage(firebaseApp)
          listAll(ref(storage, 'locations/')).then((res) => {
            res.items.forEach((itemRef)=>{
              getDownloadURL(ref(storage, '/'+itemRef._location.path_)).then((url)=>{
                $store.state.locationImgList.push(url)
              })
            })
          })
        }
      })
      folder = "assets/img/monsters/"
      $.ajax({
        url: folder,
        async: false,
        success: function(data){
          $(data).find("a").attr("href", function (i, val) {
            if( val.match(/\.(jpe?g|png|gif)$/) ) { 
              $store.state.monsterImgList.push(val)
            }
          })
        },
        error: function(){
          const storage = getStorage(firebaseApp)
          listAll(ref(storage, 'monsters/')).then((res) => {
            res.items.forEach((itemRef)=>{
              getDownloadURL(ref(storage, '/'+itemRef._location.path_)).then((url)=>{
                $store.state.monsterImgList.push(url)
              })
            })
          })
        }
      })
      folder = "assets/img/"
      $.ajax({
        url: folder,
        async: false,
        success: function(data){
          $(data).find("a").attr("href", function (i, val) {
            if( val.match(/\.(jpe?g|png|gif)$/) ) { 
              $store.state.assetsImgList.push(val)
            }
          })
        },
        error: function(){
          const storage = getStorage(firebaseApp)
          listAll(ref(storage, '/')).then((res) => {
            res.items.forEach((itemRef)=>{
              getDownloadURL(ref(storage, '/'+itemRef._location.path_)).then((url)=>{
                $store.state.assetsImgList.push(url)
              })
            })
          })
        }
      })
    })
    const state = reactive({
      character: computed(()=> $store.state.selected),
      timer: computed(()=> $store.state.timer),
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
  overflow-x: hidden;
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
@media screen and (min-width: 992px) {
  .timer{
    height: 15px;
    position: absolute;
  }
}
@media screen and (max-width: 992px) {
  .timer{
    height: 15px;
    position: sticky;
  }
}
.modal-content{
  background-color: black;
}
.h-100v{
  height: 100vh;
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
.poison{
  filter: hue-rotate(90deg);
}
.petrify{
  filter: grayscale(1)
}
.timer{
  height: 15px;
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
  background-image: url('../public/assets/img/sword-bar.png');
  background-size: contain;
  background-repeat: no-repeat;
} 
::-webkit-scrollbar-button:vertical:decrement{
  background-color: rgba(0, 0, 0, 0.5);
  background-image: url('../public/assets/img/shield-bar.png');
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
