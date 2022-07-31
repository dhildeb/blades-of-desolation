<template>
<div class="d-md-flex bg-dark">
  <PlayerStatsSideWindow />
  <CharacterDetailsModal :character="character" />
  <router-view></router-view>
</div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import { computed } from "@vue/runtime-core"
import $store from '@/store/index'
import PlayerStatsSideWindow from "./components/PlayerStatsSideWindow.vue"
import CharacterDetailsModal from "./components/CharacterDetailsModal.vue"

export default {
  components: { PlayerStatsSideWindow, CharacterDetailsModal },
  setup() {
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
