<template>
<div class="col-2 click">
  <p class="mb-0" @click="attackMonster(monster)">{{ monster.name }}</p>
  <sup>{{monster.hp}}/HP</sup>
</div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import { gameService } from "@/services/GameService"
export default {
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
