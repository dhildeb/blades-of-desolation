<template>
  <div class="row pt-2">
    <div class="col-md-6 col-12">
      <h1 for="sell">Sell Items</h1>
    </div>
  </div>
  <div class="row mh-100">
    <div class="col-md-6 col-12">
      <ul>
        <li :class="item.price ? getRarityFullName(item.rarity) : 'd-none'" v-for="item in filteredItems" :key="item.id" @click="sell(item)">{{item.name}} - {{item.price/10}} <i class="fad fa-coins"></i><span v-if="playerItems.filter(i => i.name == item.name).length > 1">&nbsp; ({{playerItems.filter(i => i.name == item.name).length}})</span>&nbsp;
        <button class="btn btn-outline-warning" v-if="playerItems.filter(i => i.name == item.name).length > 1" @click="sellAll(item)">sell all</button>
        </li>
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
    filteredItems: computed(()=> $store.state.player.items.filter((fi,i)=> $store.state.player.items[i+1]?.name != fi.name))
  })
  return state
},
methods: {
  getRarityFullName : getRarityFullName,
  sell(item){
    itemsService.sellItem(item)
  },
  sellAll(item){
    this.playerItems.forEach(i => {
      if(i.name == item.name && i.rarity == item.rarity){
        this.sell(i)
      }
    })
  }
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