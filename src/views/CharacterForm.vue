<template>
<div class="container bg-img" style="background-image: url('/assets/locations/create-bg.jpg')">
<h5 class="font-weight-bold text-black">{{ characterCount < 6 ? "Create Your Character" : "Your Party"}}</h5>
  <div class="row justify-content-center">
    <div class="col-10 col-md-8">
      <form @submit.prevent="createCharacter" v-if="characterCount < 6">
        <div class="form-group">
          <input type="text" class="form-control" id="name" placeholder="Name" v-model="name">
        </div>
        <div class="form-group">
          <select class="custom-select" id="classType" v-model="classType">
            <option disabled value="">Select a Class</option>
            <option v-for="classType in classList" :key="classType" :value="classType"
            >{{classType}}</option>
          </select>
        </div>
        <div class="form-group">
          <select class="custom-select" id="race" v-model="race">
            <option disabled value="">Select a Race</option>
            <option value="dragonborn">Dragonborn</option>
            <option value="dwarf">dwarf</option>
            <option value="elf">Elf</option>
            <option value="halfling">Halfling</option>
            <option value="human">Human</option>
          </select>
        </div>
        <div id="imgSelect" class="scrollable row">
          <img class="img-fluid col-lg-3 col-md-6 col-12 click " :class="selectedImg == img ? 'border border-warning ' : ''" :value="img" v-for="img in imgs" :key="img" @click="selectImg(img)" :src="img" :alt="img" />
        </div>
        <button class="btn btn-primary float-left" type="submit">Create</button>
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
import { computed, onMounted } from "@vue/runtime-core"
import $store from '@/store/index.js'
import { characterService } from "@/services/CharacterService"
import Notify from "@/utils/Notify"
import firebaseApp from 'firebase/app'
import {getDownloadURL, getStorage, listAll, ref} from 'firebase/storage'
import $ from 'jquery'
import CombatCharacter from "@/components/CombatCharacter.vue"

export default {
    components: { CombatCharacter },
  name: 'CharacterForm',
  setup(){
    onMounted(()=>{
      if(window.location.origin.includes('localhost')){
        let folder = "assets/characters/"
        $.ajax({
          url: folder,
          async: false,
          success: function(data){
            $(data).find("a").attr("href", function (i, val) {
              if( val.match(/\.(jpe?g|png|gif)$/) ) { 
                $store.state.characterImgList.push(val)
              }
            })
          }
        })
      }else{
        const storage = getStorage(firebaseApp)
        listAll(ref(storage, 'characters/')).then((res) => {
          res.items.forEach((itemRef)=>{
            getDownloadURL(ref(storage, '/'+itemRef._location.path_)).then((url)=>{
              $store.state.characterImgList.push(url)
            })
          })
        }).catch((error) => {
          console.log(error)
        })
      }
    })
    const state = reactive({
      classList: ['Barbarian', 'Bard', 'Cleric', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Warlock', 'Wizard'],
      name: '',
      classType: '',
      race: '',
      selectedImg: '',
      imgs: computed(() => $store.state.characterImgList),
      characterCount: computed(()=> $store.state.player.characters.length),
      characters: computed(()=>$store.state.player.characters),
      selectedCharacter: ''
    })
    return state
  },
  methods: {
    createCharacter(){
      let charData = {name: this.name, classType: this.classType.toLowerCase(), race: this.race, img: this.selectedImg, actions: 1, dodge: 0, hp: 5, luck: 0, strength: 1, magic: 0, thorns: 0, lifeSteal: 0, physicalResistance: 0, magicResistance: 0}
      characterService.createCharacter(charData)
      Notify.toast(charData.name+' was created!', 'success')
      this.name = ''
      this.classType = ''
      this.race = ''
      this.selectedImg = ''
    },
    selectImg(img){
        this.selectedImg = img
    },
    selectCharacter(character){
      this.selectedCharacter = character
    }
  }
}
</script>

<style scoped>
.scrollable{
  max-height: 56vh;
  overflow-y: auto;
  backdrop-filter: brightness(0.5);
}
.text-black{
  color: #000;
}
</style>
