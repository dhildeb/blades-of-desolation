<template>
  <div class="container area-map map" :style="'background-image: url('+bgImg+')'">
    <div class="row" v-for="row in 10" :key="row">
        <div :id="location+'-'+row+'-'+col" class="col bg-shadow" :class="findIfVisible(row, col) ? '' : 'bg-dark disabled'" @click="explore(location+'-'+row+'-'+col)" v-for="col in 6" :key="col"></div>
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
        const state = reactive({
            location: computed(()=> $store.state.location),
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
                $('#'+id).removeClass('bg-shadow')
            }
            this.getRandomEncounter()
        },
        async getRandomEncounter(){
            let chance = Math.ceil(Math.random()*100)
            if(chance > 40){
                router.push({name: 'battleField'})
            }else if(chance > 20){
                Notify.toast('You found some nice trees')
            }else if(chance > 10){
                let gold = Math.round(Math.random()*100)
                $store.state.player.gold += gold
                Notify.toast('You found '+gold+'Gold!')
            }else if(chance > 5){
                let item = itemsService.findRandomItem()
                $store.state.player.items.push(item)
                Notify.toast('You found a '+item.name)
            }else{
                if(await Notify.confirm('Encounter', 'Hello weary travaler, would you like to buy some wears?')){
                    router.push({name: 'MainShop'})
                }
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