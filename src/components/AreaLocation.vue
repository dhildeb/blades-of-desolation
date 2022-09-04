<template>
  <div class="container-fluid area-map map" :style="'background-image: url('+bgImg+')'">
    <div class="row" v-for="row in 10" :key="row">
        <div :id="location+'-'+row+'-'+col" class="col bg-shadow disabled" :class="findIfVisible(row, col) ? '' : 'bg-dark'" @click="explore(location+'-'+row+'-'+col)" v-for="col in 6" :key="col">
            <div v-if="row == 5 && col == 3" :class="findIfVisible(row, col) ? '' : 'd-none'"><img class="char-icon" src="https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/locations%2Ftavern2.png?alt=media&token=a5cd38b2-39fe-4150-a500-5b59306b3857" alt="Tavern"></div>
            <div v-else-if="location+'-'+row+'-'+col == currentLocation"><img class="char-icon" :src="charImg" alt="X"></div>
            <div v-if="row == 10 && col == 6 && !areaCompleted" :class="findIfVisible(row, col) ? '' : 'd-none'"><img class="char-icon" src="https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/locations%2Fchest.png?alt=media&token=907bdd99-f504-4857-a27c-8056ebc72a0a" alt="Tavern"></div>
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
import { useToast } from "vue-toastification"
import { Item } from "@/models/Item"
import { spellsService } from "@/services/SpellsService"
import { characterService } from "@/services/CharacterService"

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
            hasKey: computed(()=> $store.state.player.items.find(i => i.name == 'key')),
            explored: computed(()=> $store.state.player.explored[$store.state.location]),
            areaCompleted: computed(()=> state.explored.find(e => e == 'reward recieved')),
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
       async explore(id){
            const toast = useToast()
            let explored = $store.state.player.explored[$store.state.location]
            let rowCol = id.split('-')
            if(rowCol[1] == 10 && rowCol[2] == 6 && !this.hasKey){
                toast.warning('You dont have a key')
                return
            }
            if(!explored.includes(id)){
                explored.push(id)
                $('#'+id).removeClass('bg-shadow')
            }
            $store.state.player.currentLocation = id
            if(explored.length >= 59 && !this.hasKey && !this.areaCompleted){
                $store.state.player.items.push(new Item({name: 'key'}))
                toast.success('You found a key!')
            }
            if(explored.length == 60 && !this.areaCompleted && rowCol[1] == 10 && rowCol[2] == 6 && this.hasKey){
                $store.state.player.items = $store.state.player.items.filter(i => i.name != 'key')
               await this.completeArea()
               return
            }
            // Tavern
            if(rowCol[1] == 5 && rowCol[2] == 3){
                this.getEncounter(false)
                return
            }
            this.getEncounter()
        },
        async getEncounter(random = true){
            const toast = useToast()
            let chance = Math.ceil(Math.random()*100)
            if(chance > 40 && random){
                router.push({name: 'battleField'})
            }else if(chance > 20 && random){
                toast.info('You found some nice trees', {timeout: 4000})
            }else if(chance > 10 & random){
                let gold = Math.round(Math.random()*100)*($store.state.location+1)
                $store.state.player.gold += gold
                toast.success('You found '+gold+'Gold!', {timeout: 4000})
            }else if(chance > 5 && random){
                let item = itemsService.findRandomItem()
                $store.state.player.items.push(new Item(item))
                toast.success('You found a '+item.name, {timeout: 4000})
            }else{
                if(!random){
                    router.push({name: 'MainShop'})
                }
                let spellName = spellsService.findRandomLearnableSpell($store.state.selected)
                $store.state.player.items.push(new Item({name: spellName, scroll: true, value: 1, effect: 'Learn spell', price: characterService.getAverageCharacterLvl()*250+500}))
                toast.success('You found a '+spellName+' scroll', {timeout: 4000})
            }
        },
        async completeArea(){
            const toast = useToast()
            let options = {gold: 'Wealth', power: 'Power', item: 'Treasure'}
            let boon = await Notify.selectOptions(options, 'Choose your Reward!', 'Well done adventures! For completing this area you are granted a boon!', 'Confirm')
            let reward
            switch(boon){
                case 'gold':
                    reward = Math.round(Math.random()*500*($store.state.location+1)+500*($store.state.location+1))
                    $store.state.player.gold += reward
                    toast.success('You recieved '+reward+' Gold')
                break
                case 'power':
                    $store.state.player.characters.forEach(c => c.statBonus++)
                    toast.success('Your party feels more powerful')
                break
                case 'item':
                    if($store.state.location < 5){
                        reward = 'uc'
                    }else if($store.state.location < 10){
                        reward = 'r'
                    }else if($store.state.location < 15){
                        reward = 'vr'
                    }else{
                        reward = 'l'
                    }
                    reward = itemsService.findRandomItem(reward)
                    $store.state.player.items.push(new Item(reward))
                    toast.success('You recieved '+reward.name)
            }
            if(boon){
                $store.state.player.explored[$store.state.location].push('reward recieved')
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

<style scope>
area{
  cursor: pointer;
}
.area-map{
  background-size: contain;
  background-repeat: no-repeat;
}
@media screen and (min-width: 992px) {
    .area-map{
      background-size: 84vw 100vh;
  }
}
@media screen and (max-width: 992px) {
  .area-map{
    background-size: 100vw 100vh;
  }
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