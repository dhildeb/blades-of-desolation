<template>
<div class="container">
<h1>Create Your Character</h1>
  <div class="row justify-content-center">
    <div class="col-6">
      <img src="gs://game-pics.appspot.com/characters/" alt="">
      <form @submit.prevent="createCharacter" v-if="characterCount < 6">
          <div class="form-group">
          <label for="name">Character Name</label>
          <input type="text" class="form-control" id="name" placeholder="Lorn Dargwell" v-model="name">
        </div>
        <select class="custom-select" id="classType" v-model="classType">
        <option disabled value="">Select a Class</option>
        <option value="rogue">Rogue</option>
        <option value="ranger">Ranger</option>
        <option value="barbarian">Barbarian</option>
        <option value="wizard">Wizard</option>
        <option value="cleric">Cleric</option>
        <option value="fighter">Fighter</option>
        <option value="monk">Monk</option>
        <option value="paladin">Paladin</option>
        <option value="warlock">Warlock</option>
      </select>
      <select class="custom-select" id="race" v-model="race">
        <option disabled value="">Select a Race</option>
        <option value="dragonborn">Dragonborn</option>
        <option value="human">Human</option>
        <option value="elf">dwarf</option>
        <option value="elf">Elf</option>
        <option value="halfling">Halfling</option>
      </select>
      <div id="imgSelect" class="scrollable">
        <img :class="selectedImg == img ? 'border border-warning img-fluid w-25 click' : 'img-fluid w-25 click'" :value="img" v-for="img in imgs" :key="img" @click="selectImg(img)" :src="img" :alt="img" />
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
import { CharacterFactory } from '@/models/CharacterFactory.js'
import { computed, onMounted } from "@vue/runtime-core"
import $store from '@/store/index.js'
import { characterService } from "@/services/CharacterService"
import Notify from "@/utils/Notify"
import {getCharacterImgs} from '@/utils/imgLoader.js'
// import $ from 'jquery'
// import {parseString} from 'xml2js'
export default {
  name: 'CharacterForm',
  setup(){
    onMounted(()=>{

      state.imgs = getCharacterImgs()
    })
    const state = reactive({
      name: '',
      classType: '',
      race: '',
      selectedImg: '',
      imgs: [],
      characterCount: computed(()=> $store.state.player.characters.length)
    })
    return state
  },
  methods: {
    createCharacter(){
      let charData = {name: this.name, classType: this.classType, race: this.race, img: this.selectedImg}
      characterService.addCharacter(new CharacterFactory(charData))
      Notify.toast(charData.name+' was created!', 'success')
      this.name = ''
      this.classType = ''
      this.race = ''
      this.selectedImg = ''
    },
    selectImg(img){
        this.selectedImg = img
    }
  }
}
</script>

<style scoped>
.scrollable{
  max-height: 70vh;
  overflow-y: auto;
}
</style>
