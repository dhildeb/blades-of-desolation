<template>
<div class="container">
  <router-link to="/shop/items">Items</router-link> |
  <router-link to="/shop/equipment">Equipment</router-link> |
  <router-link to="/shop/abilities">Spells / Abilities</router-link>
  <router-view></router-view>
</div>
</template>

<script>
export default {
name: 'GeneralShop',
components: {

}
}
</script>

<style>

</style>