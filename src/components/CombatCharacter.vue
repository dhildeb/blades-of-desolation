<template>
  <div v-if="character.hp < 1">
      <strong class="d-flex dead" title="dead">{{character.name}}</strong>
  </div>
  <div v-else>
      <HpBar :hp="character.hp" :baseHp="character.baseHp" />
    <strong class="d-flex">{{character.name}}</strong>
    <img :class="'img-fluid w-75 click '+(selected.id == character.id ? 'border-bottom border-success' : character.actions < 1 ? 'border border-danger' : '')" :src="character.img" @click="selectCharacter(character)">
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import { computed } from "@vue/runtime-core"
import $store from '@/store/index.js'
import HpBar from "./HpBar.vue"
export default {
  components: { HpBar },
  name: 'CombatCharacter',
  props: {
    character: {type: Object}
  },
  setup(){
    const state = reactive({
      selected: computed(() => $store.state.selected)
    })
    return state
  },
  methods: {
    selectCharacter(character){
      if(character.actions > 0){
        this.$store.commit('selectCharacter', character)
      }
    },
  }
}
</script>

<style>
.selected{
  border: green;
}
.exhausted{
  color: yellow
}
.dead{
  color: red;
  cursor: not-allowed;
}
</style>