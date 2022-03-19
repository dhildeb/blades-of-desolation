<template>
<div>
  <p class="border-bottom">{{ monster.name }}'s Loot!</p>
  <p class="">Gold: {{ monster.loot.gold }}</p>
  <p class="" v-if="monster.loot.items">Items: {{ monster.loot.items }}</p>
</div>
</template>

<script>
import { reactive } from "@vue/reactivity"

export default {
  name: 'LootMonster',
  props: {
    monster: {type: Object}
  },
  setup(){
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
