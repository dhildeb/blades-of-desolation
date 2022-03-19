<template>
<div>
  <p class="border-bottom">{{ monster.name }}'s Loot!</p>
  <p class="">Gold: {{ monster.loot.gold }}</p>
  <p class="" v-if="monster.loot.items">Items: {{ monster.loot.items }}</p>
</div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import { onMounted } from "@vue/runtime-core"
import $store from '@/store/index.js'
export default {
  name: 'LootMonster',
  props: {
    monster: {type: Object}
  },
  setup(props){
    onMounted(()=>{
      $store.state.player.gold += props.monster.loot.gold
      if(props.monster.loot.items.length > 0){
        $store.state.player.items.push(...props.monster.loot.items)
      }
    })
    const state = reactive({

    })
    return state
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
