<template>
  <nav class="navbar navbar-dark bg-darker sticky-top">
    <div class="d-flex justify-content-between">
      <a class="btn btn-sm btn-outline-secondary" @click="changeShop('sell')">Sell</a>
      <a class="btn btn-sm btn-outline-secondary" @click="changeShop('general')">Items</a>
      <a class="btn btn-sm btn-outline-secondary" @click="changeShop('magic')">Magic</a>
    </div>
    <div class="mr-3">
      <button class="btn btn-warning mr-2" @click="adventureOn">Adventure On!</button>
      <button class="btn btn-primary" @click="rest()" :disabled="state.playersGold < 50*state.location+50">Rest ({{50*state.location+50}} <i class="fad fa-coins"></i>)</button>
      <div v-for="character in state.revive" :key="character.id">
        <button class="btn btn-secondary m-3" @click="reviveCharacter(character.id)" :disabled="state.playersGold <
          character.cost">Revive {{character.name}} ({{(character.hp - character.baseHp)*-10}} <i class="fad fa-coins"></i>)</button>
      </div>
    </div>
  </nav>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from "@vue/runtime-core"
import $store from "@/store/index.js"
import router from "@/router"
import { useToast } from "vue-toastification"

export default {
  name: 'ShopNavBar',
  setup() {
    const state = reactive({
      healPartyCost: computed(()=> Math.round($store.state.player.characters.map(c => c.hp > 0 ? c.baseHp - c.hp : 0).reduce((a, b) => a+b))),
      restorePartyMagicCost: computed(()=> Math.round($store.state.player.characters.map(c => c.baseMagic > 0 ? c.baseMagic - c.magic : 0).reduce((a, b) => a+b)*3)),
      revive: computed(()=> $store.state.player.characters.filter(c => c.hp < 1)),
      playersGold: computed(()=> $store.state.player.gold),
      location: computed(()=> $store.state.location)
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
    rest(){
      const toast = useToast()
      $store.state.player.characters.forEach(c => {
        c.hp = c.baseHp
        c.magic = c.baseMagic
        c.abilities.forEach(a => a.uses = a.baseUses)
        c.actions = c.baseActions
        c.statusEffects = c.statusEffects.filter(se => !se.negative)
      })
      toast.success('Your party is Fully Rested!')
    },
    adventureOn(){
      router.push({name: 'AreaLocation'})
    },
    changeShop(shop){
      $store.state.shop = shop
    }
  }
}
</script>

<style scoped>
.bg-darker{
  background-color: rgb(15, 15, 15);
}
@media screen and (min-width: 992px) {
  .navbar{
    position: fixed;
    width: 80vw;
    left: 20vw;
  }
}
</style>
