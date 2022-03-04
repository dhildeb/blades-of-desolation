<template>
<h1>Player</h1>
<div v-for="card in cards" :key="card.id">
  <p @click="selectCard(card)" :class="card.id == selected.id ? 'selected' : ''">{{card.name}}</p>
  <sup>{{card}}</sup>
</div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import $store from '../store/index.js'
import { computed } from "@vue/runtime-core"
export default {
name: 'CurrentPlayer',
setup(){
  const state = reactive({
    cards: computed(()=>$store.state.player.cards),
    selected: computed(()=>$store.state.selected)
  })
  return state
  },
  methods: {
    selectCard(card){
      $store.commit('selectCard', card)
    }
  }
}
</script>

<style>
.selected{
  color: gold
}
</style>