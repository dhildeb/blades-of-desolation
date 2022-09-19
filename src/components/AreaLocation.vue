<template>
  <div class="container-fluid area-map map" :style="'background-image: url('+bgImg+')'">
    <div class="row" v-for="row in 10" :key="row">
        <div :id="location+'-'+row+'-'+col" class="col bg-shadow disabled" :class="findIfVisible(row, col) ? '' : 'bg-dark'" @click="explore(location+'-'+row+'-'+col)" v-for="col in 6" :key="col">
            <div v-if="row == 5 && col == 3" :class="findIfVisible(row, col) ? '' : 'd-none'"><img class="char-icon" :src="tavernImg" alt="Tavern"></div>
            <div v-else-if="location+'-'+row+'-'+col == currentLocation"><img class="char-icon" :src="charImg" alt="X"></div>
            <div v-if="row == 10 && col == 6 && !areaCompleted" :class="findIfVisible(row, col) ? '' : 'd-none'"><img class="char-icon" :src="chestImg" alt="treasure-chest"></div>
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
            charImg: computed(()=> $store.state.player.characters.filter(c => c.hp > 0)[0].img),
            tavernImg: $store.state.assetsImgList.find(m => m.includes('tavern2')),
            chestImg: $store.state.assetsImgList.find(m => m.includes('chest')),
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
                // TODO can't just add 2 when higher lvl
                $store.state.player.items.push(new Item({name: 'key', type: 'key'}))
                toast.success('You found a key!')
                router.push({name: 'battleField', params: {monsterLvl: $store.state.location+2, numMonsters: 1, boss: true}})
            }
            if(explored.length == 60 && !this.areaCompleted && rowCol[1] == 10 && rowCol[2] == 6 && this.hasKey){
               await this.completeArea()
               return
            }
            // Tavern
            if(rowCol[1] == 5 && rowCol[2] == 3){
                router.push({name: 'MainShop'})
                return
            }
            this.getEncounter()
        },
        getEncounter(){
            const toast = useToast()
            let chance = Math.ceil(Math.random()*100)
            let rowCol = $store.state.player.currentLocation.split('-')
            if(chance > 35 || (rowCol[1] == 1 && rowCol[2] == 1)){
                router.push({name: 'battleField'})
            }else if(chance > 25){
                //nothing
            }else if(chance > 10){
                let gold = Math.round(Math.random()*100)*($store.state.location+1)
                $store.state.player.gold += gold
                toast.success('You found '+gold+'Gold!', {timeout: 4000})
            }else if(chance > 2){
                let item = itemsService.findRandomItem()
                $store.state.player.items.push(new Item(item))
                toast.success('You found a '+item.name, {timeout: 4000})
            }else{
                let spellName = spellsService.findRandomLearnableSpell($store.state.selected)
                $store.state.player.items.push(new Item({name: spellName, scroll: true, value: 1, effect: 'Learn spell', price: characterService.getAverageCharacterLvl()*250+500}))
                toast.success('You found a '+spellName+' scroll', {timeout: 4000})
            }
        },
        async completeArea(){
            const toast = useToast()
            let options = {gold: 'Wealth', power: 'Power', item: 'Treasure'}
            let boon = await Notify.selectOptions(options, 'Choose your Reward!', 'Well done adventures! For completing this area you are granted a boon!', 'Confirm')
            if(boon){
                $store.state.player.items = $store.state.player.items.filter(i => i.name != 'key')
                $store.state.player.explored[$store.state.location].push('reward recieved')
            }
            let reward
            let chance = Math.ceil(Math.random()*40)+$store.state.location
            switch(boon){
                case 'gold':
                    reward = Math.round(Math.random()*(4000*($store.state.location+1)))+1000
                    $store.state.player.gold += reward
                    toast.success('You recieved '+reward+' Gold')
                break
                case 'power':
                    $store.state.player.characters.forEach(c => c.statBonus++)
                    toast.success('Your party feels more powerful')
                break
                case 'item':
                    if(chance < 15){
                        reward = 'uc'
                    }else if(chance < 35){
                        reward = 'r'
                    }else if(chance < 40){
                        reward = 'vr'
                    }else{
                        reward = 'l'
                    }
                    reward = itemsService.findRandomItem(reward)
                    $store.state.player.items.push(new Item(reward))
                    toast.success('You recieved '+reward.name)
                    if(await Notify.confirm('Next Area', 'You continue on your adventure to another area now that you have completed your mission here.', 'info', 'ok')){
                        $store.state.location++
                        this.explore($store.state.location+'-1-1')
                    }
                    break
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