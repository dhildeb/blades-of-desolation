<template>
  <nav>
    <router-link to="/">Battle</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/shop" class="nav-link" v-slot="{navigate}">
      <button class="btn btn-dark" @click="navigate">Shop</button>
    </router-link>
  </nav>
  <router-view></router-view>
<CurrentPlayer />
</template>

<script>
import { reactive } from "@vue/reactivity"
import CurrentPlayer from './components/Player.vue'
export default {
  components: {CurrentPlayer},
  setup() {
    const state = reactive({
    })
  return state
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
