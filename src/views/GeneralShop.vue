<template>
<div class="container">
  <div class="row justify-content-center">
    <router-link to="/shop/items">Items</router-link> |
    <router-link to="/shop/equipment">Equipment</router-link> |
    <router-link to="/shop/abilities">Spells / Abilities</router-link>
  </div>
  <div class="row pt-5">
    {{revive}}
    <button v-if="healPartyCost" class="btn btn-success" @click="healParty()" :disabled="playersGold < healPartyCost">Heal Party ({{healPartyCost}} gold)</button>
    <div v-for="character in revive" :key="character.id">
      <button class="btn btn-secondary" @click="reviveCharacter(character.id)" :disabled="playersGold <
         character.cost">Revive {{character.name}} ({{(character.hp - character.baseHp)*-10}} gold)</button>
    </div>
  </div>
  <router-view></router-view>
</div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import { computed } from "@vue/runtime-core"
import $store from "@/store/index.js"
export default {
name: 'GeneralShop',
components: {

},
setup(){
  const state = reactive({
    healPartyCost: computed(()=> $store.state.player.characters.map(c => c.hp > 0 ? c.baseHp - c.hp : 0).reduce((a, b) => a+b)),
    revive: computed(()=> $store.state.player.characters.filter(c => c.hp < 1)),
    playersGold: computed(()=> $store.state.player.gold)
  })
  return state
},
methods: {
  reviveCharacter(id){
    let deadCharacter = this.revive.find(dc => dc.id = id)
    let cost = (deadCharacter.hp - deadCharacter.baseHp)*-10
    console.log(cost)
    this.$store.commit('reducePlayerGold', cost)
    this.$store.state.player.characters.forEach(c => c.id == id ? c.hp = c.baseHp : '')
  },
  healParty(){
      this.$store.commit('reducePlayerGold', this.healPartyCost)
      this.$store.state.player.characters.forEach(c => c.hp < c.baseHp && c.hp > 0 ? c.hp = c.baseHp : '')
  }
}
}
</script>

<style>

</style>