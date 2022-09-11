<template>
<div class="blur-box text-light font-weight-bold h-50">
  <p class="border-bottom">{{ monster.name }}'s Loot!</p>
  <p class="">{{ monster.loot.gold }} <i class="fad fa-coins"></i></p>
  <ul v-if="monster.loot.items.length > 0">
    <li :class="getRarityFullName(this.$store.state.items.filter(i => i.name == item)[0].rarity)" v-for="item in monster.loot.items" :key="item" :title="getItemEffectsDisplay(this.$store.state.items.filter(i => i.name == item)[0])">
      {{item}} <span v-html="getItemIcon(this.$store.state.items.filter(i => i.name == item)[0].type)"></span>
    </li>
    <li :class="getRarityFullName(this.$store.state.items.filter(i => i.name == item)[0].rarity)" v-for="item in monster.equipment" :key="item" :title="getItemEffectsDisplay(this.$store.state.items.filter(i => i.name == item)[0])">
      {{item}} <span v-html="getItemIcon(this.$store.state.items.filter(i => i.name == item)[0].type)"></span>
    </li>
    </ul>
</div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import { getRarityFullName } from "@/utils/getRarityFullName"
import { getItemIcon } from "@/utils/getIcon"
import { itemsService } from "@/services/ItemsService"
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
    getRarityFullName: getRarityFullName,
    getItemIcon(itemType){
      return getItemIcon(itemType)
    },
    getItemEffectsDisplay(item){
      return itemsService.getItemEffectsDisplay(item)
    }
  }
}
</script>

<style scoped>
.blur-box{
  backdrop-filter: brightness(0.5);
  box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.75);
}
</style>
