<template>
  <div class="row pt-2">
    <div class="col-md-6 col-12">
      <h1 for="buy">Buy Items</h1>
    </div>
  </div>
  <div class="row mh-100">
    <div class="col-md-6 col-12">
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
import Item from "@/components/Item.vue"
import { useToast } from "vue-toastification"
import Notify from "@/utils/Notify"
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
  async buy(item){
    const toast = useToast()
    if(!(await Notify.confirm('Buy '+item.name, itemsService.getItemEffectsDisplay(item), 'question', 'Buy'))){
      return
    }
    if(this.$store.state.player.gold >= item.price){
      this.$store.commit('reducePlayerGold', item.price)
      itemsService.buyItem(item)
      toast.info('Purchased '+item.name )
    }else{
      toast.warning('Insufficient resources')
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