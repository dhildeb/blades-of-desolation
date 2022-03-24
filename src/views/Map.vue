<template>
<div class="container map">
<img class="" src="../assets/Map.png" width="1000" height="840" usemap="#world-map" />
<map name="world-map" id="world-map">
  <area id="area-1" shape="circle" coords="708,238,10" alt="1" title="Area 1" @click="locationChange(0)" />
  <area id="area-2" shape="circle" coords="733,336,10" alt="2" title="Area 2" @click="locationChange(1)" />
  <area id="area-3" shape="circle" coords="620,360,10" alt="3" title="Area 3" @click="locationChange(2)" />
  <area id="area-4" shape="circle" coords="482,328,10" alt="4" title="Area 4" @click="locationChange(3)" />
  <area id="area-5" shape="circle" coords="454,232,10" alt="5" title="Area 5" @click="locationChange(4)" />
  <area id="area-6" shape="circle" coords="682,132,10" alt="6" title="Area 6" @click="locationChange(5)" />
  <area id="area-7" shape="circle" coords="270,225,10" alt="7" title="Area 7" @click="locationChange(6)" />
  <area id="area-8" shape="circle" coords="113,265,10" alt="8" title="Area 8" @click="locationChange(7)" />
  <area id="area-9" shape="circle" coords="299,340,10" alt="9" title="Area 9" @click="locationChange(8)" />
  <area id="area-10" shape="circle" coords="320,392,10" alt="10" title="Area 10" @click="locationChange(9)" />
  <area id="area-11" shape="circle" coords="480,444,10" alt="11" title="Area 11" @click="locationChange(10)" />
  <area id="area-12" shape="circle" coords="633,485,10" alt="12" title="Area 12" @click="locationChange(11)" />
  <area id="area-13" shape="circle" coords="809,519,10" alt="13" title="Area 13" @click="locationChange(12)" />
  <area id="area-14" shape="circle" coords="635,622,10" alt="14" title="Area 14" @click="locationChange(13)" />
  <area id="area-15" shape="circle" coords="455,541,10" alt="15" title="Area 15" @click="locationChange(14)" />
  <area id="area-16" shape="circle" coords="450,605,10" alt="16" title="Area 16" @click="locationChange(15)" />
  <area id="area-17" shape="circle" coords="360,665,10" alt="17" title="Area 17" @click="locationChange(16)" />
  <area id="area-18" shape="circle" coords="285,590,10" alt="18" title="Area 18" @click="locationChange(17)" />
  <area id="area-19" shape="circle" coords="211,675,10" alt="19" title="Area 19" @click="locationChange(18)" />
  <area id="area-20" shape="circle" coords="734,747,10" alt="20" title="Area 20" @click="locationChange(19)" />
</map>
</div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import router from "@/router"
import $store from '@/store/index'

export default {
name: 'MapLocation',
components: {

},
setup(){
  const state = reactive({

  })
  return state
},
methods: {
  locationChange(area){
    $store.state.location = area
    router.push({name: 'battleField'})
  }
}
}
</script>

<style>
area{
  cursor: pointer;
}
</style>