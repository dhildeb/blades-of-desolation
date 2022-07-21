<template>
<ShopNavBar />
<div class="container mt-5 pt-5">
  <div class="row">
    <div class="col-6">
      <label for="buy">Buy Items</label>
    </div>
  </div>
  <div class="row mh-100">
    <div class="col-6">
      <ul>
        <li :class="getRarityFullName(item.rarity)" v-for="item in storeItems" :key="item.id" @click="buy(item)" :title="item.effect+' +'+item.value">{{item.name}} - {{item.price}}gold</li>
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
import ShopNavBar from "@/components/ShopNavBar.vue"
import Notify from "@/utils/Notify"
export default {
name: 'GeneralShop',
components: {
  ShopNavBar
},
setup(){
  onMounted(async()=> {
    // random chance to get a quest request
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
    playersGold: computed(()=> $store.state.player.gold),
    storeItems: computed(()=> $store.state.items.sort((a,b)=> a.price - b.price)),
    quest: null
  })
  return state
},
methods: {
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