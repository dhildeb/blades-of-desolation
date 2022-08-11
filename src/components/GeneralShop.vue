<template>
  <div class="row">
    <div class="col-6">
      <label for="buy">Buy Items</label>
    </div>
  </div>
  <div class="row mh-100">
    <div class="col-6">
      <ul>
        <Item :class="getRarityFullName(item.rarity)" v-for="item in storeItems" :key="item.id" :item="item" display="shop" @click="buy(item)" />
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
import Notify from "@/utils/Notify"
import Item from "@/components/Item.vue"
export default {
name: 'GeneralShop',
components: {
    Item
},
props: {
    storeItems: {type: Object}
},
setup(){
  const state = reactive({
    playersGold: computed(()=> $store.state.player.gold),
    quest: null,
    activeShop: computed(()=> $store.state.shop)
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