<template>
  <HpBar :hp="monster.hp" :baseHp="monster.baseHp" />
<div>
  <img :id="'monster'+monster.id" v-if="monster.hp > 0" class="img-fluid monster-img" @click="attackMonster(monster)" :src="monster.img" />
  <img v-else class="img-fluid monster-img" :src="deadImg" />
</div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import HpBar from "./HpBar.vue"
import { battleService } from "@/services/BattleService"
import { characterService } from "@/services/CharacterService"
import { onMounted } from "@vue/runtime-core"
import 'animate.css'
import { animationsSErvice } from "@/services/AnimationsService"

export default {
  components: { HpBar },
  name: 'EnemyMonster',
  props: {
    monster: {type: Object}
  },
  setup(){
    onMounted(()=> characterService.autoSelect())
    const state = reactive({
      deadImg: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fdead.png?alt=media&token=028e4092-cca1-42d5-a38f-99c60d034904'
    })
    return state
  },
  methods: {
    attackMonster(monster){
      animationsSErvice.shake('monster'+monster.id)
      battleService.handleAttack(this.$store.state.selected, monster)
      characterService.autoSelect()
    }
  }
}
</script>

<style scoped>
.monster-img{
  height: 20vh;
}
</style>
