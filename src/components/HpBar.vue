<template>
  <div class="bg-danger w-100 hp-bar rounded-pill"><div class="bg-success hp-bar rounded-pill" :style="'width: '+(hp > 0 ? (hp/baseHp)*100 : 0)+'%'"></div></div>
</template>

<script>
export default {
props: {
  hp: {require: true, type: Number},
  baseHp: {require: true, type: Number}
}
}
</script>

<style scoped>
.hp-bar{
  height: 15px;
}
</style>