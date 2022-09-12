<template>
  <li :id="'item'+item.id" class="click d-flex pb-2" :class="getRarityFullName(item.rarity)" :title="display == 'full' ? getItemReqsDisplay(item): getItemEffectsDisplay(item)">
    {{item.name}} &nbsp;<span v-html="getItemIcon(item.type)"></span>&nbsp;
    {{display == 'full' ? getItemEffectsDisplay(item) : " - "+item.price}} <i v-if="display != 'full'" class="fad fa-coins"></i>
  </li>
</template>

<script>
import { reactive } from "@vue/reactivity"
import { getRarityFullName } from "@/utils/getRarityFullName"
import { itemsService } from "@/services/ItemsService"
import { getItemIcon } from "@/utils/getIcon"

export default {
  name: 'EquipmentItem',
    props: {
    item: {type: Object, required: true},
    display: {type: String, default: 'full'}
  },
  setup(){
    const state = reactive({
    })
    return state
  },
  methods: {
    getRarityFullName : getRarityFullName,
    getItemIcon : getItemIcon,
    getItemEffectsDisplay(item){
      itemsService.getItemEffectsDisplay(item)
    },
    getItemReqsDisplay(item){
      let display = 'Pre-reqs: '
      if(item?.requirements?.length > 0){
        for(let i=0; i<item.requirements.length; i++){
          display += item.requirements[i].stat+' +'+(item.requirements[i].req)
        }
      }else{
        display += 'none'
      }
      return display
    }
  }
}
</script>

<style>
li{
  text-align: justify;
}
</style>