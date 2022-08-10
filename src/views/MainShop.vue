<template>
  <ShopNavBar />
  <div class="container mt-5 pt-5">
    <div v-if="activeShop == 'general'">
      <GeneralShop :storeItems="storeItems" />
    </div>
    <div v-if="activeShop == 'sell'">
      <SellShop />
    </div>
    <div v-if="activeShop == 'magic'">
      <MagicShop :spellList="spellList" />
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
import { spellsService } from "@/services/SpellsService"
import SellShop from "@/components/SellShop.vue"
import GeneralShop from "@/components/GeneralShop.vue"
import MagicShop from "@/components/MagicShop.vue"
export default {
  name: 'MainShop',
  components: {
    ShopNavBar, SellShop, GeneralShop, MagicShop
  },
  setup(){
    onMounted(async()=> {
      // random chance to get a quest request
      let luck = 1+characterService.getPartyLuck()
      let chance = Math.ceil(Math.random()*25)
      if(luck > chance){
        let index = Math.floor(Math.random()*$store.state.quests.length)
        let newQuest = $store.state.quests[index]
        if(await Notify.confirm(newQuest.objective, newQuest.target)){
          questService.acceptQuest(newQuest)
        }
      }
      questService.checkQuestProgress()
    })
    const state = reactive({
      playersGold: computed(()=> $store.state.player.gold),
      // TODO make function for getting random items based on rarity and luck
      storeItems: computed(()=> $store.state.items.filter(()=> Math.floor(Math.random()*10) > 8).sort((a,b)=> a.price - b.price)),
      quest: null,
      activeShop: computed(()=> $store.state.shop),
      spellList: computed(()=> spellsService.getRandomSpellList()),
    })
    return state
  },
  methods: {
    buy(item){
      if(this.$store.state.player.gold >= item.price){
        this.$store.commit('reducePlayerGold', item.price)
        itemsService.buyItem(item)
        Notify.toast('Purchased '+item.name, 'success')
      }else{
        Notify.toast('Insufficient resources', 'warning')
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