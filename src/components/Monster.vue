<template>
  <HpBar :hp="monster.hp" :baseHp="monster.baseHp" />
<div class="col-2 click">
  <p v-if="monster.hp > 0" class="mb-0" @click="attackMonster(monster)">{{ monster.name }}</p>
  <del v-else class="mb-0" >{{ monster.name }}</del>
</div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import { gameService } from "@/services/GameService"
import HpBar from "./HpBar.vue"
export default {
  components: { HpBar },
  name: 'EnemyMonster',
  props: {
    monster: {type: Object}
  },
  setup(){
    const state = reactive({

    })
    return state
  },
  methods: {
    attackMonster(monster){
      gameService.determineAttackOn(monster)
    }
  }
}
</script>

<style scoped>

</style>
