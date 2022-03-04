<template>
<p>Creature</p>
  <div class="card">
    <p>{{card.name}}</p>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity"
export default {
  name: 'CreatureCard',
  props: {
    card: {type: Object}
  },
  setup(){
    const state = reactive({

    })
    return state
  }
}
</script>

<style scoped>
.card{
  box-shadow: 5px 5px 0 0 5px wheat;
}
.card:hover{
  transition: scale(1.2);
}
</style>>
