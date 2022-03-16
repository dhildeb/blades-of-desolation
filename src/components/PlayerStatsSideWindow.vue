<template>
  <CharacterDetailsModal :character="selectedCharacter" />
  <div class="bg-dark text-light side-window">
    <nav class="pb-2">
      <router-link to="/battle">Battle</router-link> |
      <router-link to="/">Create</router-link> |
      <router-link to="/shop">Shop</router-link>
    </nav>
    <div class="pb-2">
      <button class="btn btn-secondary" type="button" data-toggle="collapse" data-target="#collapsePouch" aria-expanded="false" aria-controls="collapsePouch">
        Pouch
      </button>
      <button class="btn btn-secondary" type="button" data-toggle="collapse" data-target="#collapseParty" aria-expanded="false" aria-controls="collapseParty">
        Party
      </button>
    </div>
    <div class="collapse" id="collapsePouch">
      <div class="d-flex d-md-block justify-content-around h-100">
        <span>Gold: {{player.gold}}</span>
        <span>Items: {{player.items}}</span>
      </div>
    </div>
    <div class="collapse" id="collapseParty">
      <div class="h-100" v-for="character in player.characters" :key="character.id">
        <p class="click" data-toggle="modal" data-target="#characterDetailsModal" title="stats" @click="selectCharacter(character)">
          {{character.name}}
        </p>
      </div>
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
@media screen and (min-width: 992px) {
  .side-window{
    width: 20vw;
    height: 100vh;
  }
}
@media screen and (max-width: 992px) {
  .side-window{
    width: 100vw;
  }
}
</style>