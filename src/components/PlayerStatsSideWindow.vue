<template>
  <CharacterDetailsModal :character="selectedCharacter" />
  <ItemPouchModal />
  <QuestModal />
  <div class="bg-dark text-light side-window">
    <nav class="pb-2 d-flex justify-content-center">
      <div v-if="player.characters.length > 0">
        <router-link to="/battle">Battle</router-link> | 
        <router-link to="/map">Map</router-link> | 
        <router-link to="/shop">Shop</router-link>
      </div>
      <span class="px-1" v-if="player.characters.length < 5 && player.characters.length > 0"> | </span>
      <div v-if="player.characters.length < 5">
        <router-link to="/">Create</router-link>
      </div>
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
        <p class="click" data-toggle="modal" data-target="#itemPouchModal" title="items">
          Items
        </p>
        <p v-if="this.$store.state.player.quest?.target" class="click" data-toggle="modal" data-target="#questModal" title="quest">
          Quest
        </p>
      </div>
    </div>
    <div class="collapse" id="collapseParty">
      <div class="h-100" v-for="character in player.characters" :key="character.id">
        <p class="click" data-toggle="modal" data-target="#characterDetailsModal" title="stats" @click="selectCharacter(character)">
          {{character.name}}
        </p>
      </div>
    </div>
    <button class="btn btn-success float-bottom" :class="player.characters.length > 0 ? '' : 'd-none'" @click="saveGame">Save</button>
    <button class="btn btn-success float-bottom" :class="player.characters.length < 1 ? '' : 'd-none'" @click="loadGame">Load Game</button>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import { computed } from "@vue/runtime-core"
import $store from '@/store/index.js'
import Notify from "@/utils/Notify"
import ItemPouchModal from "./ItemPouchModal.vue"
import CharacterDetailsModal from "./CharacterDetailsModal.vue"
import QuestModal from "./QuestModal.vue"
import { CharacterFactory } from "@/models/CharacterFactory"
import { Item } from "@/models/Item"

export default {
  components: { CharacterDetailsModal, ItemPouchModal, QuestModal },
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
    },
    saveGame(){
      window.localStorage.setItem("player", JSON.stringify(this.$store.state.player))
      Notify.toast('Game Saved!', 'success')
    },
    loadGame(){
        this.$store.state.player = JSON.parse(window.localStorage.getItem("player"))
        this.$store.state.player.items.forEach((i, index) => {
          this.$store.state.player.items[index] = new Item(i)
        })
        this.$store.state.player.characters.forEach((c, index) => {
          this.$store.state.player.characters[index] = new CharacterFactory(c)
          c.equipment.forEach((e, endex) => {
            this.$store.state.player.characters[index].equipment[endex] = new Item(e)
          })
        })
        Notify.toast('Game Loaded!', 'success')
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