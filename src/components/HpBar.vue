<template>
  <div class="bg-danger w-100 hp-bar rounded-pill align-items-center justify-content-center d-flex">
    <div class="hp-bar text-absolute-center rounded-pill" :class="selected ? 'bg-warning' : 'bg-success'" :style="'width: '+(hp > 0 ? (hp/baseHp)*100 : 0)+'%'">
      <span class="text-light pb-1">
        {{unknown ? '????' : Math.round(hp*10)/10}}/{{unknown ? '????' : baseHp}}
      </span>
    </div>
  </div>
</template>

<script>
export default {
props: {
  hp: {require: true, type: Number},
  baseHp: {require: true, type: Number},
  selected: {type: Boolean, default: false},
  unknown: {type: Boolean, default: false}
}
}
</script>

<style>
.hp-bar{
  height: 15px;
}
.text-absolute-center{
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 7px;
}
</style>