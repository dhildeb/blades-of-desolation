<template>
<div class="container">
<h5>Create Your Character</h5>
  <div class="row justify-content-center">
    <div class="col-10 col-md-8">
      <form @submit.prevent="createCharacter" v-if="characterCount < 6">
        <div class="form-group">
          <input type="text" class="form-control" id="name" placeholder="Name" v-model="name">
        </div>
        <div class="form-group">
          <select class="custom-select" id="classType" v-model="classType">
            <option disabled value="">Select a Class</option>
            <option value="barbarian">Barbarian</option>
            <option value="bard">Bard</option>
            <option value="cleric">Cleric</option>
            <option value="fighter">Fighter</option>
            <option value="monk">Monk</option>
            <option value="paladin">Paladin</option>
            <option value="ranger">Ranger</option>
            <option value="rogue">Rogue</option>
            <option value="warlock">Warlock</option>
            <option value="wizard">Wizard</option>
          </select>
        </div>
        <div class="form-group">
          <select class="custom-select" id="race" v-model="race">
            <option disabled value="">Select a Race</option>
            <option value="dragonborn">Dragonborn</option>
            <option value="elf">dwarf</option>
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
import { CharacterFactory } from '@/models/CharacterFactory.js'
import { computed, onMounted } from "@vue/runtime-core"
import $store from '@/store/index.js'
import { characterService } from "@/services/CharacterService"
import Notify from "@/utils/Notify"
import firebaseApp from 'firebase/app'
import {getDownloadURL, getStorage, listAll, ref} from 'firebase/storage'
export default {
  name: 'CharacterForm',
  setup(){
    onMounted(()=>{
      const storage = getStorage(firebaseApp)
      listAll(ref(storage, 'characters/')).then((res) => {
        res.items.forEach((itemRef)=>{
          getDownloadURL(ref(storage, '/'+itemRef._location.path_)).then((url) => {
          $store.state.characterImgList.push(url)
      })
        })
      }).catch((error) => {
        console.log(error)
      })
    })
    const state = reactive({
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
  max-height: 56vh;
  overflow-y: auto;
}
</style>
