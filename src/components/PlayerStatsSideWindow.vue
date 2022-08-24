<template>
  <ItemPouchModal />
  <QuestModal />
  <div class="bg-black text-light side-window" :class="this.$route.name == 'MapLocation' ? 'window-fluid-sm' : ''">
    <nav class="pb-2 d-flex justify-content-center">
      <div v-if="player.characters.length > 0">
        <router-link to="/map">Map</router-link>
        <div v-if="player.characters.length <= 5">
          <router-link to="/">Create</router-link>
        </div>
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
    <button v-if="this.$route.name !== 'battleField'" class="btn btn-success float-bottom" :class="player.characters.length > 0 ? '' : 'd-none'" @click="saveGame">Save</button>
    <button class="btn btn-success float-bottom" :class="player.characters.length < 1 ? '' : 'd-none'" @click="loadGame">Load Game</button>
    <button v-if="this.$route.name !== 'battleField'" class="btn btn-primary float-bottom" :class="player.characters.length > 0 ? '' : 'd-none'" @click="rest">Rest (unsafe)</button>
    <BattleOptions v-if="$route.name == 'battleField' && monstersWithHp > 0" />
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import { computed } from "@vue/runtime-core"
import $store from '@/store/index.js'
import Notify from "@/utils/Notify"
import ItemPouchModal from "./ItemPouchModal.vue"
import QuestModal from "./QuestModal.vue"
import { Item } from "@/models/Item"
import { characterService } from "@/services/CharacterService"
import { Spell } from "@/models/Spell"
import BattleOptions from '@/components/BattleOptions'
import router from "@/router"
import { Ability } from "@/models/Ability"
import { useToast } from "vue-toastification"

export default {
  components: { ItemPouchModal, QuestModal, BattleOptions },
  setup(){
    const state = reactive({
      player: computed(()=> $store.state.player),
      monstersWithHp: computed(()=> $store.state.combatMonsters.filter(m => m.hp > 0).length),
    })
    return state
  },
  methods: {
    selectCharacter(character){
      $store.state.selected = character
    },
    saveGame(){
      const toast = useToast()
      window.localStorage.setItem("player", JSON.stringify(this.$store.state.player))
      toast.success('Game Saved!')
    },
    loadGame(){
      const toast = useToast()
      this.$store.state.player = JSON.parse(window.localStorage.getItem("player"))
      this.$store.state.player.items.forEach((i, index) => {
        this.$store.state.player.items[index] = new Item(i)
      })
      this.$store.state.player.characters.forEach((c, index) => {
        characterService.loadCharacter(index, c)
        c.abilities.forEach((a, andex) => {
          this.$store.state.player.characters[index].abilities[andex] = new Ability(a)
        })
        c.equipment.forEach((e, endex) => {
          this.$store.state.player.characters[index].equipment[endex] = new Item(e)
        })
        c.spells.forEach((s, sndex)=> {
          this.$store.state.player.characters[index].spells[sndex] = new Spell(s)
        })
      })
      this.$store.state.location = parseInt(this.$store.state.player.currentLocation[0])
      toast.success('Game Loaded!')
    },
    async rest(){
      const toast = useToast()
      if(!JSON.parse(window.localStorage.getItem("Wild Rest Warning"))){
        if(!await Notify.confirm('Wild Rest Warning', 'Are you sure you want to rest in the unprotected wild? You may be attacked or robbed? Continue?')){
          return
        }
        window.localStorage.setItem("Wild Rest Warning", JSON.stringify('skip'))
      }
      let chance = Math.ceil(Math.random()*100)+($store.state.location*2)
      let partyLuck = characterService.getPartyLuck()+40
      if(partyLuck > chance){
        $store.state.player.characters.forEach(c => {
          c.hp = c.hp + Math.round(c.baseHp*.25) > c.baseHp ? c.baseHp : c.hp+Math.round(c.baseHp*.25)
          c.magic = c.baseMagic
          c.abilities.forEach(a => a.uses = a.baseUses)
          c.actions = c.baseActions
        })
        toast.success('Successfully Rested!')
        return
      }
      if(chance > 25){
        router.push({name: 'battleField'})
      }else{
        let lostGold = Math.round($store.state.player.gold*(chance/100))
        toast.warning('Your rest is interupted by thieves, fornately you are unharmed. Unforunately you lost '+lostGold+' Gold', {timeout: 5000})
        $store.state.player.gold -= lostGold
      }
      // saveGame()
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
  .window-fluid-sm{
    width: 1100px;
  }
}
.bg-black{
  background-color: black;
}
</style>