<template>
<ShopNavBar />
<div class="container pt-5">
  <div class="row pt-5">
    <div class="col-6">
      <label for="sell">Sell Items</label>
    </div>
  </div>
  <div class="row mh-100">
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
import { computed } from "@vue/runtime-core"
import $store from "@/store/index.js"
import { itemsService } from "@/services/ItemsService"
import { getRarityFullName } from '@/utils/getRarityFullName'
import ShopNavBar from "@/components/ShopNavBar.vue"
export default {
name: 'SellSop',
components: {
ShopNavBar
},
setup(){
  const state = reactive({
    playersGold: computed(()=> $store.state.player.gold),
    playerItems: computed(()=> $store.state.player.items),
  })
  return state
},
methods: {
  sell(item){
    itemsService.sellItem(item)
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