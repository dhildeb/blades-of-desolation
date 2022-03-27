<template>
  <div class="bg-danger w-100 hp-bar rounded-pill align-items-center justify-content-center d-flex"><div class="hp-bar rounded-pill" :class="selected ? 'bg-warning' : 'bg-success'" :style="'width: '+(hp > 0 ? (hp/baseHp)*100 : 0)+'%'">{{Math.round(hp)}}/{{baseHp}}</div></div>
</template>

<script>
export default {
props: {
  hp: {require: true, type: Number},
  baseHp: {require: true, type: Number},
  selected: {type: Boolean, default: false}
}
}
</script>

<style scoped>
.hp-bar{
  height: 15px;
}
</style>