<template>
<div class="container">
  <div class="row pt-5">
    <button v-if="healPartyCost > 0" class="btn btn-success" @click="healParty()" :disabled="playersGold < healPartyCost">Heal Party ({{healPartyCost}} gold)</button>
    <div v-for="character in revive" :key="character.id">
      <button class="btn btn-secondary m-3" @click="reviveCharacter(character.id)" :disabled="playersGold <
         character.cost">Revive {{character.name}} ({{(character.hp - character.baseHp)*-10}} gold)</button>
    </div>
  </div>
  <div class="row">
    <div class="col-6">
      <label for="buy">Buy Items</label>
    </div>
    <div class="col-6">
      <label for="sell">Sell Items</label>
    </div>
  </div>
  <div class="row mh-100">
    <div class="col-6">
      <ul>
        <li :class="getRarityFullName(item.rarity)" v-for="item in storeItems" :key="item.id" @click="buy(item)" :title="item.effect+' +'+item.value">{{item.name}} - {{item.price}}gold</li>
      </ul>
    </div>
    <div class="col-6">
      <ul>
        <li :class="getRarityFullName(item.rarity)" v-for="item in playerItems" :key="item.id" @click="sell(item)">{{item.name}} - {{item.price/10}}gold</li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import { computed, onMounted } from "@vue/runtime-core"
import $store from "@/store/index.js"
import { itemsService } from "@/services/ItemsService"
import { getRarityFullName } from '@/utils/getRarityFullName'
import { questService } from "@/services/QuestService"
import { characterService } from "@/services/CharacterService"
import Notify from "@/utils/Notify"
export default {
name: 'GeneralShop',
components: {

},
setup(){
  onMounted(async()=> {
    let luck = 1+characterService.getPartyLuck()
    let chance = Math.ceil(Math.random()*100)
    if(luck > chance){
      let index = Math.floor(Math.random()*$store.state.quests.length)
      let newQuest = $store.state.quests[index]
      if(await Notify.confirm(newQuest.objective, newQuest.target)){
        questService.acceptQuest(newQuest)
      }
    }
  })
  const state = reactive({
    healPartyCost: computed(()=> $store.state.player.characters.map(c => c.hp > 0 ? c.baseHp - c.hp : 0).reduce((a, b) => a+b)),
    revive: computed(()=> $store.state.player.characters.filter(c => c.hp < 1)),
    playersGold: computed(()=> $store.state.player.gold),
    playerItems: computed(()=> $store.state.player.items),
    storeItems: computed(()=> $store.state.items.sort((a,b)=> a.price - b.price)),
    quest: null
  })
  return state
},
methods: {
  reviveCharacter(id){
    let deadCharacter = this.revive.find(dc => dc.id = id)
    let cost = (deadCharacter.hp - deadCharacter.baseHp)*-10
    this.$store.commit('reducePlayerGold', cost)
    this.$store.state.player.characters.forEach(c => c.id == id ? c.hp = c.baseHp : '')
  },
  healParty(){
      this.$store.commit('reducePlayerGold', this.healPartyCost)
      this.$store.state.player.characters.forEach(c => c.hp < c.baseHp && c.hp > 0 ? c.hp = c.baseHp : '')
  },
  sell(item){
    itemsService.sellItem(item)
  },
  buy(item){
    if(this.$store.state.player.gold >= item.price){
      this.$store.commit('reducePlayerGold', item.price)
      itemsService.buyItem(item)
    }
  },
  getRarityFullName : getRarityFullName
}
}
</script>

<style>
li{
  cursor: pointer;
}
.mh-100{
  height: 75vh;
  overflow-y: auto;
}
</style>