<template>
  <div class="home">
    <div v-for="monster in monsters" :key="monster.id">
      <EnemyMonster :monster="monster" />
    </div>
  </div>
</template>

<script>
import EnemyMonster from '../components/Monster'
import { reactive } from "@vue/reactivity"
import $store from '@/store/index.js'
import { computed } from "@vue/runtime-core"

export default {
  name: 'BattleField',
  components: {
    EnemyMonster
  },
  setup(){
    const state = reactive({
      monsters: computed(()=> $store.state.monsters)
    })
    return state
  }
}
</script>

<style scoped>

</style>
