<template>
  <CharacterDetailsModal :character="selectedCharacter" />
  <div class="bg-dark text-light side-window">
    <nav>
      <router-link to="/battle">Battle</router-link> |
      <router-link to="/">Create</router-link> |
      <router-link to="/shop">Shop</router-link>
    </nav>
    <p>Gold: {{player.gold}}</p>
    <p>Items: {{player.items}}</p>
    <div v-for="character in player.characters" :key="character.id">
      <p class="click" data-toggle="modal" data-target="#characterDetailsModal" title="stats" @click="selectCharacter(character)">
        {{character.name}}
      </p>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import { computed } from "@vue/runtime-core"
import $store from '@/store/index.js'
import CharacterDetailsModal from "./CharacterDetailsModal.vue"
export default {
  components: { CharacterDetailsModal },
  setup(){
    const state = reactive({
      player: computed(()=> $store.state.player),
      selectedCharacter: ''
    })
    return state
  },
  methods: {
    selectCharacter(character){
      this.selectedCharacter = character
    }
  }
}
</script>

<style>
.side-window{
  width: 20vw;
  height: 100vh;
}
</style>