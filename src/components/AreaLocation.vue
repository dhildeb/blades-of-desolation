<template>
  <div class="container area-map map m-1" :style="'background-image: url(../assets/locations/area'+(location+1)+'.jpg)'">
    <div class="row">
        <div id="1" class="col-3 bg-shadow" :class="visible >= 1 ? '' : 'bg-dark disabled'" @click="explore(1)"></div>
        <div id="2" class="col-3 bg-shadow" :class="visible >= 1 ? '' : 'bg-dark disabled'" @click="explore(2)"></div>
        <div id="3" class="col-3 bg-shadow" :class="visible >= 2 ? '' : 'bg-dark disabled'" @click="explore(3)"></div>
        <div id="4" class="col-3 bg-shadow" :class="visible >= 4 ? '' : 'bg-dark disabled'" @click="explore(4)"></div>
    </div>
    <div class="row">
        <div id="5" class="col-3 bg-shadow" :class="visible >= 1 ? '' : 'bg-dark disabled'" @click="explore(5)"></div>
        <div id="6" class="col-3 bg-shadow" :class="visible >= 3 ? '' : 'bg-dark disabled'" @click="explore(6)"></div>
        <div id="7" class="col-3 bg-shadow" :class="visible >= 2 ? '' : 'bg-dark disabled'" @click="explore(7)"></div>
        <div id="8" class="col-3 bg-shadow" :class="visible >= 4 ? '' : 'bg-dark disabled'" @click="explore(8)"></div>
    </div>
    <div class="row">
        <div id="9" class="col-3 bg-shadow" :class="visible >= 3 ? '' : 'bg-dark disabled'" @click="explore(9)"></div>
        <div id="10" class="col-3 bg-shadow" :class="visible >= 3 ? '' : 'bg-dark disabled'" @click="explore(10)"></div>
        <div id="11" class="col-3 bg-shadow" :class="visible >= 2 ? '' : 'bg-dark disabled'" @click="explore(11)"></div>
        <div id="12" class="col-3 bg-shadow" :class="visible >= 4 ? '' : 'bg-dark disabled'" @click="explore(12)"></div>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import $store from '@/store/index'
import $ from 'jquery'
import { computed, onMounted } from "@vue/runtime-core"
import router from "@/router"

export default {
    name: 'AreaLocation',
    components: {

    },
    setup(){
        onMounted(()=> {
            let explored = $store.state.player.explored[$store.state.location]
            explored.forEach(id => {
                $('#'+id).removeClass('bg-shadow')
            })
        })
            // TODO add logic for treasure vs battles?
        const state = reactive({
            location: computed(()=> $store.state.location),
            visible: computed(()=> Math.floor($store.state.player.explored[$store.state.location].length/3)+1),
            explored: computed(()=> $store.state.player.explored[$store.state.location])
        })
        return state
    },
    methods: {
        explore(id){
            let explored = $store.state.player.explored[$store.state.location]
            if(!explored.includes(id)){
                explored.push(id)
            }
            router.push({name: 'battleField'})
        }
    }
}
</script>

<style>
area{
  cursor: pointer;
}
.area-map{
  background-size: contain;
  background-repeat: no-repeat;
  background-size: 60vw 100vh;
}
.col-3{
    height: 33vh;
}
.col-3:hover{
    border-style: solid;
}
.bg-shadow{
    background-color: rgba(0, 0, 0, 0.5);
}
.disabled{
    pointer-events: none;
}
</style>