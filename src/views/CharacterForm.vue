<template>
<div class="container">
<h5 data-bs-toggle="popover" data-bs-trigger="hover" data-bs-content="And here's some amazing content. It's very engaging. Right?">Create Your Character</h5>
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
      <p v-else>Your Party is Full!</p>
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

export default {
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
      characterCount: computed(()=> $store.state.player.characters.length)
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
    pop(event){
      console.log(event)
    }
  }
}
</script>

<style scoped>
.scrollable{
  max-height: 56vh;
  overflow-y: auto;
}
</style>
