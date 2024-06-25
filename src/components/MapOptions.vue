<template>
  <div>
    <div class="header m-3 border-bottom">
      <div class="title container">
        Choose your destination
      </div>
    </div>
    <div class="body container">
      <div class="row justify-content-center click" @click="locationChange(0)">
          Forest
      </div>
      <div v-for="index in this.location" :key="index" class="row justify-content-center mt-3 click" @click="locationChange(index)">
          {{ areaName[index] }}
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import $store from '@/store/index.js'
import router from "@/router"

export default {
  name: 'BattleOptions',
  setup(){
    const state = reactive({
      location: $store.state.player.explored.filter((area) => area.length > 0).length - 1,
      areaName: ['Forest', 'Flanuan', 'Linriel', 'Almorille', 'Erravunnah', 'Cantal', 'Arsen', 'Illis', 'Norriah', 'Silthrim', 'Athkatille', 'Cassidan', 'Chetille', 'Simath', 'Castheral', 'Forbidden Forest', 'Lost Sea', 'Cirille', 'Ithildinne', '???']
    })
    return state
  },
  methods: {
    locationChange(area){
      if($store.state.location != area){
      $store.state.player.currentLocation = area+'-1-1'
      $store.state.location = area
    }
    router.push({name: 'AreaLocation'})
    }
  }
}
</script>

<style scope>
sub{
  position: absolute;
  left: 50px;
  top: 45px;
}
</style>