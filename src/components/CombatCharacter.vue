<template>
  <div v-if="character.hp < 1">
      <strong class="d-flex dead" title="dead">{{character.name}}</strong>
  </div>
  <div v-else 
       :class="selected.id == character.id ? 'selected' : character.actions < 1 ? 'exhausted' : ''  ">
    <strong class="d-flex click" @click="selectCharacter(character)">{{character.name}}</strong>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import { computed } from "@vue/runtime-core"
import $store from '@/store/index.js'
export default {
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
  color: green;
}
.exhausted{
  color: yellow
}
.dead{
  color: red;
  cursor: not-allowed;
}
</style>