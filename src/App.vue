<template>
<div class="d-md-flex">
  <PlayerStatsSideWindow />
  <router-view></router-view>
</div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import { computed } from "@vue/runtime-core"
import $store from '@/store/index'
import PlayerStatsSideWindow from "./components/PlayerStatsSideWindow.vue"
export default {
  components: { PlayerStatsSideWindow },
  setup() {
    const state = reactive({
      character: computed(()=> $store.state.selected)
    })
  return state
  },
  methods: {

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  user-select: none;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #f8f9fa;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.click{
  cursor: pointer;
}
.uncommon{
  color: green;
}
.rare{
  color: blue;
}
.very-rare{
  color: indigo;
}
.legendary{
  color: gold;
}
</style>
