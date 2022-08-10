<template>
  <div class="row pt-5">
    <div class="col-6 text-right">
      <label for="buy">Learn Spells</label>
    </div>
  </div>
  <div class="row mh-100">
    <div class="col-6">
      <ul v-for="spells in spellList" :key="spells">
        <label for="spells" v-if="spells.length > 0">{{spells[0].level > 0 ? "Level "+spells[0].level : 'Cantrip'}} Spells</label>
        <li v-for="spell in spells" :key="spell.name" @click="buySpell(spell)" :title="spell.title ?? getTitle(spell)">{{spell.name}} - {{spell.price ?? spell.level*1000+1000}}gold</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import $store from "@/store/index.js"
import { spellsService } from "@/services/SpellsService"
import Notify from "@/utils/Notify"
export default {
name: 'MagicShop',
props: {
    spellList: {type: Object}
},
setup(){
  const state = reactive({
  })
  return state
},
methods: {
  async buySpell(spell){
    let price = spell.price ?? spell.level*1000+1000
    if($store.state.player.gold < price){
      Notify.toast('Insufficient resources', 'warning')
      return
    }
    let char = await Notify.selectChar(spell.name, price)
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
  color:#00c700;
  font-size: large;
}
.mh-100{
  height: 75vh;
  overflow-y: auto;
}
</style>