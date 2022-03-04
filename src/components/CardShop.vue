<template>
  <h2>Welcome the the card shop</h2>
  <p>like what you see?</p>
  {{cards}}
  <div class="shop-box">
    <div v-for="card in cards" :key="card.name">
      <CreatureCard :card="card" />
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import { computed } from "@vue/runtime-core"
import CreatureCard from "./CreatureCard.vue"
import $store from '../store/index.js'
export default {
  components:{CreatureCard},
  setup(){
    const state = reactive({
      cards: computed(()=> $store.state.cards)
    })
    return state
  }
}
</script>

<style>
.shop-box{
  margin-top: 15px;
  box-shadow: 10px  10px 10px 10px wheat;
}
</style>