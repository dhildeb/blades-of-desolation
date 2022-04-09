<template>
<nav class="navbar navbar-light bg-light">
  <form class="form-inline">
    <router-link class="btn btn-outline-success" to="/shop/sell">Sell</router-link>
    <router-link class="btn btn-sm btn-outline-secondary" to="/shop/magic">Magic Shop</router-link>
  </form>
</nav>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
  name: 'ShopNavBar',
  setup() {
    const state = reactive({

    })
    return {
      state
    }
  }
}
</script>

<style scoped>
.navbar{
  position: fixed;
  width: 80vw;
  left: 20vw;
}
</style>
