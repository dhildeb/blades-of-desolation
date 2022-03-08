<template>
  <div class="bg-dark text-light side-window">
    <nav>
      <router-link to="/">Battle</router-link> |
      <router-link to="/create/character">Create</router-link> |
      <router-link to="/shop">Shop</router-link>
    </nav>
    <p>Gold: {{player.gold}}</p>
    <p>Items: {{player.items}}</p>
    <p class="click" data-toggle="modal" data-target="#characterDetailsModal" title="stats" v-for="characters in player.characters" :key="characters.id">{{characters.name}}</p>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import { computed } from "@vue/runtime-core"
import $store from '@/store/index.js'
export default {
  setup(){
    const state = reactive({
      player: computed(()=> $store.state.player)
    })
    return state
  },
}
</script>

<style>
.side-window{
  width: 20vw;
  height: 100vh;
}
</style>