<template>
  <nav class="navbar navbar-light bg-light">
    <div class="w-25 d-flex justify-content-between">
      <router-link class="btn btn-sm btn-outline-secondary" to="/shop/sell">Sell</router-link>
      <router-link class="btn btn-sm btn-outline-secondary" to="/shop">Items Shop</router-link>
      <router-link class="btn btn-sm btn-outline-secondary" to="/shop/magic">Magic Shop</router-link>
    </div>
    <div class="mr-3">
      <button v-if="state.healPartyCost > 0" class="btn btn-success mr-2" @click="healParty()" :disabled="state.playersGold < state.healPartyCost">Heal Party ({{state.healPartyCost}} gold)</button>
      <button v-if="state.restorePartyMagicCost > 0" class="btn btn-primary" @click="RestorePartyMagic()" :disabled="state.playersGold < state.restorePartyMagicCost">Restore Party Magic ({{state.restorePartyMagicCost}} gold)</button>
      <div v-for="character in state.revive" :key="character.id">
        <button class="btn btn-secondary m-3" @click="reviveCharacter(character.id)" :disabled="state.playersGold <
          character.cost">Revive {{character.name}} ({{(character.hp - character.baseHp)*-10}} gold)</button>
      </div>
    </div>
  </nav>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from "@vue/runtime-core"
import $store from "@/store/index.js"

export default {
  name: 'ShopNavBar',
  setup() {
    const state = reactive({
      healPartyCost: computed(()=> Math.round($store.state.player.characters.map(c => c.hp > 0 ? c.baseHp - c.hp : 0).reduce((a, b) => a+b))),
      restorePartyMagicCost: computed(()=> Math.round($store.state.player.characters.map(c => c.baseMagic > 0 ? c.baseMagic - c.magic : 0).reduce((a, b) => a+b)*3)),
      revive: computed(()=> $store.state.player.characters.filter(c => c.hp < 1)),
      playersGold: computed(()=> $store.state.player.gold),
    })
    return {
      state
    }
  },
  methods:{
    reviveCharacter(id){
      let deadCharacter = this.state.revive.find(dc => dc.id = id)
      let cost = (deadCharacter.hp - deadCharacter.baseHp)*-10
      this.$store.commit('reducePlayerGold', cost)
      this.$store.state.player.characters.forEach(c => c.id == id ? c.hp = c.baseHp : '')
    },
    healParty(){
      this.$store.commit('reducePlayerGold', this.state.healPartyCost)
      this.$store.state.player.characters.forEach(c => c.hp < c.baseHp && c.hp > 0 ? c.hp = c.baseHp : '')
    },
    RestorePartyMagic(){
      this.$store.commit('reducePlayerGold', this.state.restorePartyMagicCost)
      this.$store.state.player.characters.forEach(c => c.magic < c.baseMagic ? c.magic = c.baseMagic : '')
    },
  }
}
</script>

<style scoped>
.navbar{
  position: fixed;
  width: 80vw;
  left: 20vw;
}
</style>
