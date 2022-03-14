<template>
  <HpBar :hp="monster.hp" :baseHp="monster.baseHp" />
<div>
  <img v-if="monster.hp > 0" class="img-fluid monster-img" @click="attackMonster(monster)" :src="monster.img" />
  <img v-else class="img-fluid monster-img" :src="deadImg" />
</div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import { gameService } from "@/services/GameService"
import {getMonsterImgs } from '@/utils/imgLoader.js'
import HpBar from "./HpBar.vue"
export default {
  components: { HpBar },
  name: 'EnemyMonster',
  props: {
    monster: {type: Object}
  },
  setup(){
    const state = reactive({
      deadImg: getMonsterImgs().find(i => i.includes('dead'))
    })
    return state
  },
  methods: {
    attackMonster(monster){
      this.$store.dispatch('unselect')
      gameService.determineAttackOn(monster)
    }
  }
}
</script>

<style scoped>
.monster-img{
  height: 20vh;
}
</style>
