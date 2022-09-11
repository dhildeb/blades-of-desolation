<template>
  <div class="row pt-2">
    <div class="col-md-6 col-12">
      <h1 for="sell">Sell Items</h1>
    </div>
  </div>
  <div class="row mh-100">
    <div class="col-md-6 col-12">
      <ul>
        <li :class="item.price ? getRarityFullName(item.rarity) : 'd-none'" v-for="item in playerItems" :key="item.id" @click="sell(item)">{{item.name}} - {{item.price/10}} <i class="fad fa-coins"></i></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import { computed } from "@vue/runtime-core"
import $store from "@/store/index.js"
import { itemsService } from "@/services/ItemsService"
import { getRarityFullName } from '@/utils/getRarityFullName'
export default {
name: 'SellSop',
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