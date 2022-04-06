<template>
<BattleOptionsModal />
  <div v-if="character.hp < 0.1">
    <strong class="d-flex dead" title="dead">{{character.name}}</strong>
  </div>
  <div v-else>
      <HpBar :hp="character.hp" :baseHp="character.baseHp" :selected="selected.id == character.id" />
    <h3 class="d-none position-absolute hit" :id="'hit'+character.id"></h3>
    <strong class="d-flex" :class="character.actions < 1 ? 'text-danger' : ''">{{character.name}}</strong>
    <div v-if="selected.id == character.id">
      <img :id="'charImg'+character.id" class="img-fluid w-75 click" :src="character.img" data-toggle="modal" data-target="#battleOptionsModal" title="Options">
    </div>
    <div v-else>
      <img :id="'charImg'+character.id" class="img-fluid w-75 click " :src="character.img" @click="selectCharacter(character)">
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import { computed } from "@vue/runtime-core"
import BattleOptionsModal from '@/components/BattleOptionsModal'
import $store from '@/store/index.js'
import HpBar from "./HpBar.vue"
export default {
  components: { HpBar, BattleOptionsModal },
  name: 'CombatCharacter',
  props: {
    character: {type: Object}
  },
  setup(props){
    const state = reactive({
      selected: computed(() => $store.state.selected),
      hp: computed(() => props.character.hp)
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
strong{
  white-space: nowrap;
  text-overflow: ellipsis;
  width: auto;
  display: block;
  overflow: hidden
}
.hit{
  left: 75%
}
</style>