<template>
<ShopNavBar />
<div class="container pt-5">
  <div class="row pt-5">
    <div class="col-6">
      <label for="buy">Learn Spells</label>
    </div>
  </div>
  <div class="row mh-100">
    <div class="col-6">
      <ul v-for="(spells, index) in spellList" :key="spells">
        <label for="spells">{{index > 0 ? "Level "+index : 'Cantrip'}} Spells</label>
        <li v-for="spell in spells" :key="spell.name" @click="buySpell(spell)" :title="spell.title ?? getTitle(spell)">{{spell.name}} - {{spell.price ?? spell.level*1000+1000}}gold</li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import { computed } from "@vue/runtime-core"
import $store from "@/store/index.js"
import ShopNavBar from "@/components/ShopNavBar.vue"
import { spellsService } from "@/services/SpellsService"
import Notify from "@/utils/Notify"
export default {
name: 'MagicShop',
components: {
  ShopNavBar
},
setup(){
  const state = reactive({
    spellList: computed(()=> $store.state.spells),
  })
  return state
},
methods: {
  async buySpell(spell){
    let price = spell.price ?? spell.level*1000+1000
    if($store.state.player.gold < price){
      return
    }
    let char = await Notify.selectChar('Learn '+spell.name, price)
    if(char == 0 || !char){
      return
    }
    let character = $store.state.player.characters.filter(c => c.id == char)[0]
    this.$store.commit('reducePlayerGold', price)
    spellsService.learnSpell(spell.name, character)
  },
  getTitle(spell){
    let title = ''
    if(spell.strength){
      title = spell.strength+' '+spell.dmgType+' dmg'
    }else{
      title = spell.buff ? '+' : '-'
      title += spell.value+' '+spell.effect
    }
    title += spell.areaEffect ? ' (Mass effect)' :  ''
    return title
  }
}
}
</script>

<style scoped>
li{
  cursor: pointer;
}
label{
  right: 9vw;
  position: relative;
  color:darkgreen;
  font-size: large;
}
.mh-100{
  height: 75vh;
  overflow-y: auto;
}
</style>