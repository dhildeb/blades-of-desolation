<template>
<div class="blur-box text-light font-weight-bold h-50">
  <p class="border-bottom">{{ monster.name }}'s Loot!</p>
  <p class="">Gold: {{ monster.loot.gold }}</p>
  <ul v-if="monster.loot.items.length > 0">
    <li :class="getRarityFullName(this.$store.state.items.filter(i => i.name == item)[0].rarity)" v-for="item in monster.loot.items" :key="item">
      {{item}}
    </li>
    <li :class="getRarityFullName(this.$store.state.items.filter(i => i.name == item)[0].rarity)" v-for="item in monster.equipment" :key="item">
      {{item}}
    </li>
    </ul>
</div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import { getRarityFullName } from "@/utils/getRarityFullName"
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
    getRarityFullName: getRarityFullName
  }
}
</script>

<style scoped>
.blur-box{
  backdrop-filter: brightness(0.5);
  box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.75);
}
</style>
