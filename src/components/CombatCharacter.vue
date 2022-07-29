<template>
  <div v-if="character.hp < 0.1">
    <strong class="d-flex dead" title="dead">{{character.name}}</strong>
     <img :id="'charImg'+character.id" class="img-fluid w-75 events-none" :src="deadImg" @click="selectCharacter(character)">
  </div>
  <div v-else>
      <HpBar :hp="character.hp" :baseHp="character.baseHp" :selected="selected.id == character.id" />
    <h3 class="d-none position-absolute hit selectable" :id="'hit'+character.id"></h3>
    <strong class="d-flex" :class="character.actions < 1 ? 'text-danger' : ''">{{character.name}}</strong>
    <div>
      <img :id="'charImg'+character.id" :class="selected.id == character.id ? 'animate__animated animate__slow animate__pulse animate__infinite' : ''" class="img-fluid w-75 click " :src="character.img" @click="selectCharacter(character)">
    </div>
    <div class="d-flex">
      <p class="border rounded-circle h-25 w-25" title="Strength">
        {{character.strength}}
      </p>
      <p class="border rounded-circle h-25 w-25" title="Actions">
        {{character.actions}}
      </p>
      <p class="border rounded-circle h-25 w-25" title="Magic" v-if="character.magic">
        {{character.magic}}
      </p>
    </div>
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
  setup(props){
    const state = reactive({
      selected: computed(() => $store.state.selected),
      hp: computed(() => props.character.hp),
      deadImg: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fdead.png?alt=media&token=028e4092-cca1-42d5-a38f-99c60d034904',
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
.selectable{
  filter: drop-shadow(0px 0px 15px gold);
}
.events-none{
  pointer-events: none;
}
</style>