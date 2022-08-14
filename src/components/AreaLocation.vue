<template>
  <div class="container area-map map" :style="'background-image: url('+bgImg+')'">
    <div class="row" v-for="row in 10" :key="row">
        <div :id="location+'-'+row+'-'+col" class="col bg-shadow disabled" :class="findIfVisible(row, col) ? '' : 'bg-dark'" @click="explore(location+'-'+row+'-'+col)" v-for="col in 6" :key="col">
            <div v-if="location+'-'+row+'-'+col == currentLocation "><img class="char-icon" :src="charImg" alt="X"></div>
        </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import $store from '@/store/index'
import $ from 'jquery'
import { computed, onMounted, watch } from "@vue/runtime-core"
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
            setExploreOptions()
        })
        const state = reactive({
            location: computed(()=> $store.state.location),
            explored: computed(()=> $store.state.player.explored[$store.state.location]),
            currentLocation: computed(()=> $store.state.player.currentLocation),
            bgImg: computed(()=> $store.state.locationImgList.find(l => l.includes('area'+($store.state.location+1)+'.'))),
            charImg: computed(()=> $store.state.player.characters.filter(c => c.hp > 0)[0].img)
        })
        function setExploreOptions(){
            let rowCol = $store.state.player.currentLocation.split('-')
            setTimeout(()=>{
                for(let i=-1; i <= 1; i++){
                    if(i==0){
                        $(`#${rowCol[0]}-${+rowCol[1]}-${+rowCol[2]}`).removeClass('disabled')
                        continue
                    }
                    $(`#${rowCol[0]}-${+rowCol[1]+i}-${+rowCol[2]+i}`).removeClass('disabled')
                    $(`#${rowCol[0]}-${+rowCol[1]-i}-${+rowCol[2]+i}`).removeClass('disabled')
                    $(`#${rowCol[0]}-${+rowCol[1]}-${+rowCol[2]+i}`).removeClass('disabled')
                    $(`#${rowCol[0]}-${+rowCol[1]+i}-${+rowCol[2]}`).removeClass('disabled')
                }
            }, 250)
        }
        watch(()=>([state.currentLocation]), ()=>{
            $('.col').each(function(){
                $(this).addClass('disabled')
            })
            setExploreOptions()
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
            $store.state.player.currentLocation = id
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
                for(let i=-1; i <= 1; i++){
                    if((+rowCol[2]+i == col && +rowCol[1] == row)){
                        visible = true
                        return
                    }
                    if((+rowCol[2]+i == col && +rowCol[1]+i == row)){
                        visible = true
                        return
                    }
                    if((+rowCol[2] == col && +rowCol[1]+i == row)){
                        visible = true
                        return
                    }
                    if((+rowCol[2]+i == col && +rowCol[1]-i == row)){
                        visible = true
                        return
                    }
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
    cursor: pointer;
    outline: 2px solid gold;
}
.bg-shadow{
    background-color: rgba(0, 0, 0, 0.5);
}
.disabled{
    pointer-events: none;
}
.char-icon{
    max-height: 10vh;
}
</style>