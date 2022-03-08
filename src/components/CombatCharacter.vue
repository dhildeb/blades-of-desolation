<template>
  <CharacterDetailsModal />
  <div v-if="character.hp < 1">
      <p class="d-flex dead" title="dead">{{character.name}}
    <a class="click" id="toggle-btn" data-toggle="modal" data-target="#characterDetailsModal" title="stats">*</a>
  </p>
  </div>
<div v-else :class="selected.id == character.id ? 'selected' : '' ">
  <p class="d-flex click" @click="selectCharacter(character)">{{character.name}}
    <a class="click" id="toggle-btn" data-toggle="modal" data-target="#characterDetailsModal" title="stats">*</a>
  </p>
</div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import CharacterDetailsModal from '@/components/CharacterDetailsModal'
import { computed } from "@vue/runtime-core"
import $store from '@/store/index.js'
export default {
  name: 'CombatCharacter',
  components: {
    CharacterDetailsModal
  },
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
    selectCharacter(card){
      this.$store.commit('selectCharacter', card)
    },
  }
}
</script>

<style>
.selected{
  color: gold;
}
.dead{
  color: red;
  cursor: not-allowed;
}
</style>