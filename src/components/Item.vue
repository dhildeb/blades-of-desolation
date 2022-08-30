<template>
  <li :id="'item'+item.id" class="click d-flex" :class="getRarityFullName(item.rarity)" :title="display == 'full' ? getItemReqsDisplay(item): getItemEffectsDisplay(item)">
    {{item.name}} - {{display == 'full' ? getItemEffectsDisplay(item) : item.price+' gold'}}
      &nbsp;({{item.type}})&nbsp;
  </li>
</template>

<script>
import { reactive } from "@vue/reactivity"
import { getRarityFullName } from "@/utils/getRarityFullName"

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
    getItemEffectsDisplay(item){
      let display = ''
      if(Array.isArray(item.effect)){
        for(let i=0; i<item.effect.length; i++){
          display += item.effect[i].replace(/([A-Z])/g, " $1")+' +'+item.value[i]+' '
        }
      }else{
        display = item.effect.replace(/([A-Z])/g, " $1")+' +'+item.value
      }
      display += item.speed ? ' speed '+item.speed : ''
      return display
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