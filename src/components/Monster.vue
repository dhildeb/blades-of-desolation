<template>
  <HpBar :hp="monster.hp" :baseHp="monster.baseHp" :unknown="unknown" />
<div>
  <div class="position-absolute hit" :id="'hit'+monster.id"></div>
  <img :id="'monster'+monster.id" v-if="monster.hp > 0" class="img-fluid monster-img attack-cursor" @click="attackMonster(monster)" :src="monster.img" />
  <img v-else class="img-fluid monster-img" :src="deadImg" />
</div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import HpBar from "./HpBar.vue"
import $store from '../store/index.js'
import { battleService } from "@/services/BattleService"
import { characterService } from "@/services/CharacterService"
import { computed, onMounted } from "@vue/runtime-core"
import 'animate.css'
import { animationsService } from "@/services/AnimationsService"
import { gameService } from "@/services/GameService"
import Notify from "@/utils/Notify"

export default {
  components: { HpBar },
  name: 'EnemyMonster',
  props: {
    monster: {type: Object}
  },
  setup(props){
    onMounted(()=> {
        state.monsterPreHp = props.monster.hp
        characterService.autoSelect()
      })
    const state = reactive({
      deadImg: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fdead.png?alt=media&token=028e4092-cca1-42d5-a38f-99c60d034904',
      unknown: computed(()=>!$store.state.player.kills[props.monster.name])
    })
    return state
  },
  methods: {
    attackMonster(monster){
      if(this.$store.state.selected.actions < gameService.getSpeedCost(this.$store.state.selected)){
          Notify.toast('Not enough speed for attack')
          return
      }
      characterService.autoSelect()
      animationsService.shake('monster'+monster.id)
      battleService.handleAttack(this.$store.state.selected, monster)
      characterService.autoSelect()
    },
  }
}
</script>

<style scoped>
.monster-img{
  height: 20vh;
}
.hit{
  left: 75%
}
</style>
