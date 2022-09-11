<template>
  <div class="row pt-2">
    <div class="col-12">
      <h1 for="buy">Learn Spells</h1>
    </div>
  </div>
  <div class="row mh-100">
    <div class="col-md-6 col-12">
      <ul v-for="spells in spellList" :key="spells">
        <label for="spells" v-if="spells.length > 0">{{spells[0].level > 0 ? "Level "+spells[0].level : 'Cantrip'}} Spells</label>
        <li v-for="spell in spells" :key="spell.name" @click="buySpell(spell)" :title="spell.title ?? getTitle(spell)">{{spell.name}} - {{spell.price ?? spell.level*1000+1000}} <i class="fad fa-coins"></i></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import $store from "@/store/index.js"
import { spellsService } from "@/services/SpellsService"
import Notify from "@/utils/Notify"
import { useToast } from "vue-toastification"
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
    const toast = useToast()
    let price = spell.price ?? spell.level*1000+1000
    if($store.state.player.gold < price){
      toast.warning('Insufficient resources')
      return
    }
    let description = spell.description ?? `Deals ${spell.strength} ${spell.dmgType} DMG to ${spell.areaEffect ? 'each ' : ''}enemy`
    let char = await Notify.selectChar(spell.name, price, description)
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