<template>
  <p @click="monsterAttacked(monster)">{{ monster.name }}</p>
</template>

<script>
import { reactive } from "@vue/reactivity"
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
    monsterAttacked(monster){
      console.log(this.$store.state.selected)
      if(this.$store.state.selected){
        monster.hp -= this.$store.state.selected.power
        console.log(monster)
      }
    }
  }
}
</script>

<style scoped>

</style>
