<template>
<div class="container-fluid bg-img" :style="'background-image: url('+bgImg+')'">
  <i class="fal fa-alicorn position-absolute left text-dark" @click="cheat" v-if="!cheated"></i>
  <h5 class="font-weight-bold text-black label w-title-auto m-auto">{{ characterCount < 6 ? "Create Your Character" : "Your Party"}}</h5>
  <div class="row justify-content-center">
    <div class="col-10 col-md-8">
      <form @submit.prevent="createCharacter" v-if="characterCount < 6">
        <div class="form-group mt-3">
          <input type="text" class="form-control" id="name" placeholder="Name" v-model="name">
        </div>
         <label class="label px-2">Choose a Class</label>
        <div id="classType" class="scrollable row">
          <span class="col click d-flex justify-content-center p-3" :class="selectedClassType == classType.name ? 'border border-warning ' : ''" :value="classType.name" v-for="classType in classList" :key="classType.name" @click="selectClassType(classType.name)" :title="classType.name" v-html="classType.icon"></span>
        </div>
         <label class="label px-2 mt-2">Choose a Race</label>
        <div id="race" class="scrollable row">
          <span class="col click d-flex justify-content-center p-3" :class="selectedRace == race.name ? 'border border-warning ' : ''" :value="race.name" v-for="race in raceList" :key="race.name" @click="selectRace(race.name)" :title="race.name" v-html="race.icon"></span>
        </div>
        <div id="imgSelect" class="scrollable row mt-3">
          <img class="img-fluid col-lg-3 col-md-6 col-12 click " :class="selectedImg == img ? 'border border-warning ' : ''" :value="img" v-for="img in imgs" :key="img" @click="selectImg(img)" :src="img" :alt="img" />
        </div>
        <button class="btn btn-warning btn-block mt-2" type="submit" title="create"><i class="fas fa-torah"></i></button>
      </form>
      <div class="row" v-else>
        <div class="col-4 click" v-for="character in characters" :key="character.id" data-toggle="modal" data-target="#characterDetailsModal" title="stats">
          <CombatCharacter :character="character" />
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import $store from '@/store/index.js'
import { characterService } from "@/services/CharacterService"
import { computed, onMounted } from "@vue/runtime-core"
import CombatCharacter from "@/components/CombatCharacter.vue"
import { useToast } from "vue-toastification"
import Notify from "@/utils/Notify"
import $ from 'jquery'
import { Item } from "@/models/Item"
import { setItem, getItem } from "../utils/tempLocalStorage.js"

export default {
  components: { CombatCharacter },
  name: 'CharacterForm',
  setup(){
    onMounted(()=>{
      state.cheated = getItem('cheated')
    })
    const state = reactive({
      classList: [{name: 'Barbarian', icon: '<i class="fal fa-axe-battle icon-fluid"></i>'}, {name: 'Bard', icon: '<i class="fal fa-mandolin icon-fluid"></i>'}, {name: 'Cleric', icon: '<i class="far fa-plus-octagon icon-fluid"></i>'}, {name: 'Fighter', icon: '<i class="fal fa-swords icon-fluid"></i>'}, {name: 'Monk', icon: '<i class="fal fa-fist-raised icon-fluid"></i>'}, {name: 'Paladin', icon: '<i class="far fa-helmet-battle icon-fluid"></i>'}, {name: 'Ranger', icon: '<i class="far fa-bow-arrow icon-fluid"></i>'}, {name: 'Rogue', icon: '<i class="far fa-dagger icon-fluid"></i>'}, {name: 'Warlock', icon: '<i class="fas fa-skull icon-fluid"></i>'}, {name: 'Wizard', icon: '<i class="fal fa-hat-wizard icon-fluid"></i>'}],
      raceList: [{name: 'dragonborn', icon: '<i class="fas fa-dragon icon-fluid"></i>'}, {name: 'dwarf', icon: '<i class="fas fa-hammer-war icon-fluid"></i>'}, {name: 'elf', icon: '<i class="fas fa-leaf icon-fluid"></i>'}, {name: 'halfling', icon: '<i class="fas fa-child icon-fluid"></i>'}, {name: 'human', icon: '<i class="fas fa-user-alt icon-fluid"></i>'}],
      name: '',
      selectedClassType: '',
      selectedRace: '',
      selectedImg: '',
      imgs: computed(() => $store.state.characterImgList),
      characterCount: computed(()=> $store.state.player.characters.length),
      characters: computed(()=>$store.state.player.characters),
      selectedCharacter: '',
      bgImg: computed(()=> $store.state.locationImgList.find(l => l.includes('create-bg'))),
      cheated: false
    })
    return state
  },
  methods: {
    createCharacter(){
      const toast = useToast()
      let charData = {name: this.name, classType: this.selectedClassType.toLowerCase(), race: this.selectedRace, img: this.selectedImg, actions: 6, dodge: 0, hp: 5, luck: 0, strength: 0, magic: 0, thorns: 0, lifeSteal: 0, physicalResistance: 0, magicResistance: 0}
      if($store.state.player.characters.find(c => c.name == this.name)){
        toast.warning('Too confusing to have two members with the same name, lets give you a nickname...', {timeout: 5000})
        this.name = ''
        $('#name').focus()
        return
      }
      characterService.createCharacter(charData)
      toast.success(charData.name+' was created!')
      this.name = ''
      this.classType = ''
      this.race = ''
      this.selectedImg = ''
    },
    selectImg(img){
        this.selectedImg = img
    },
    selectClassType(classType){
      this.selectedClassType = classType
    },
    selectCharacter(character){
      this.selectedCharacter = character
    },
    selectRace(race){
      this.selectedRace = race
    },
    async cheat(){
      let cheat = await Notify.cheat()
      if(cheat == 'easy'){
        $store.state.player.options.difficulty = cheat
      }
      if(this.cheated){return}
      const toast = useToast()
      let item = $store.state.items.find(i => i.name == cheat)
      if(!item){return}
      $store.state.player.items.push(new Item(item))
      $store.state.player.gold -= item.price
      toast.success('You got a '+item.name+'! cheater')
      setItem('cheated', true, 1000*60*60*24)
      this.cheated = getItem('cheated')
    }
  }
}
</script>

<style>
.scrollable{
  max-height: 56vh;
  overflow-y: auto;
  backdrop-filter: brightness(0.5);
}
.text-black{
  color: #000;
}
.left{
  left: 98vw
}
.label{
  backdrop-filter: brightness(.5);
}
.icon-fluid{
  font-size: 3vw;
}
@media screen and (min-width: 992px) {
  .w-title-auto{
    width: 25vw;
}
}
@media screen and (max-width: 992px) {
  .w-title-auto{
    width: 90vw;
  }
}
</style>
