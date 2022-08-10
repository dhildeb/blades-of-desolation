<template>
  <div class="container area-map map" :style="'background-image: url('+bgImg+')'">
    <div class="row" v-for="row in 10" :key="row">
        <div :id="location+'-'+row+'-'+col" class="col bg-shadow" :class="findIfVisible(row, col) ? '' : 'bg-dark disabled'" @click="explore(location+'-'+row+'-'+col)" v-for="col in 12" :key="col"></div>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import $store from '@/store/index'
import $ from 'jquery'
import { computed, onMounted } from "@vue/runtime-core"
import router from "@/router"
import Notify from "@/utils/Notify"
import { itemsService } from "@/services/ItemsService"

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
            explored: computed(()=> $store.state.player.explored[$store.state.location]),
            bgImg: computed(()=> $store.state.locationImgList.find(l => l.includes('area'+($store.state.location+1)+'.')))
        })
        return state
    },
    methods: {
        explore(id){
            let explored = $store.state.player.explored[$store.state.location]
            if(!explored.includes(id)){
                explored.push(id)
            }
            this.getRandomEncounter()
        },
        async getRandomEncounter(){
            let chance = Math.ceil(Math.random()*100)
            if(chance > 25){
                router.push({name: 'battleField'})
            }else if(chance > 5){
                if(await Notify.confirm('Encounter', 'Hello weary travaler, would you like to buy some wears?')){
                    router.push({name: 'MainShop'})
                }
            }else{
                let item = itemsService.findRandomItem()
                $store.state.player.items.push(item)
                Notify.toast('You found a '+item.name)
            }
        },
        findIfVisible(row, col){
            let visible = false
            if(this.explored.length == 0){
                return row+col == 2
            }
            this.explored.forEach(id => {
                let rowCol = id.split('-')
                if(rowCol[1] == row && rowCol[2] == col){
                    visible = true
                    return
                }
                if((+rowCol[1]+1 == row && +rowCol[2] == col) || (+rowCol[1]-1 == row && +rowCol[2] == col)){
                    visible = true
                    return
                }
                if((+rowCol[2]+1 == col && +rowCol[1] == row) || (+rowCol[2]-1 == col && +rowCol[1] == row)){
                    visible = true
                    return
                }
            })
            return visible
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
.col{
    height: 10vh;
}
.col:hover{
    border-style: solid;
}
.bg-shadow{
    background-color: rgba(0, 0, 0, 0.5);
}
.disabled{
    pointer-events: none;
}
</style>