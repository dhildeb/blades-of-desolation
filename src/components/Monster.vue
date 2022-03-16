<template>
  <HpBar :hp="monster.hp" :baseHp="monster.baseHp" />
<div>
  <img v-if="monster.hp > 0" class="img-fluid monster-img" @click="attackMonster(monster)" :src="monster.img" />
  <img v-else class="img-fluid monster-img" :src="deadImg" />
</div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import HpBar from "./HpBar.vue"
import { battleService } from "@/services/BattleService"
export default {
  components: { HpBar },
  name: 'EnemyMonster',
  props: {
    monster: {type: Object}
  },
  setup(){
    const state = reactive({
      deadImg: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fdead.png?alt=media&token=028e4092-cca1-42d5-a38f-99c60d034904'
    })
    return state
  },
  methods: {
    attackMonster(monster){
      this.$store.dispatch('unselect')
      battleService.handleAttack(this.$store.state.selected, monster)
    }
  }
}
</script>

<style scoped>
.monster-img{
  height: 20vh;
}
</style>
