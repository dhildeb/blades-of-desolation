<template>
<div class="modal fade text-dark" id="characterDetailsModal" tabindex="-1" role="dialog" aria-labelledby="characterDetailsModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content text-light" v-if="character">
      <div class="modal-header">
        <div class="modal-title container">
          <div class="row">
            <h5 class="col-4">{{character.name}}</h5>
            <h5 class="col-4">{{character.classType}}</h5>
            <h5 class="col-4">{{character.race}}</h5>
          </div>
          <div class="row">
            <sup class="col-4"></sup>
            <sup class="col-4">Class</sup>
            <sup class="col-4">Race</sup>
          </div>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>
      </div>
      <div class="modal-body container">
        <div class="row">
          <div class="col-md-6 col-12">
            <strong for="stats">Stats</strong>
            <div class="mt-3 pl-3 d-grid">
                <span>HP: {{character.hp}} / {{character.baseHp}}</span>
                <span>LVL: {{character.level}}</span>
                <span>EXP: {{Math.round(character.exp)}} / {{levelUpChart[character.level]}}</span>
                <span>Speed: {{character.actions}} / {{character.baseActions}}</span>
                <span>STR: {{character.strength}}</span>
                <span v-if="character.baseMagic">Magic: {{character.magic}} / {{character.baseMagic}}</span>
                <span v-if="character.dodge">Dodge: {{character.dodge}}%</span>
                <span v-if="character.thorns">Thorns: {{character.thorns}}</span>
                <span v-if="character.lifeSteal">Life Steal: {{character.lifeSteal}}%</span>
                <span v-if="character.luck">Luck: {{character.luck}}%</span>
                <span v-if="character.absorb">Absorb: {{character.absorb}}</span>
                <span v-if="character.dmgType">DMG Type: {{character.dmgType}}</span>
              <ul class="col-md-6 col-12" v-if="character.resistances.length > 0">
                <label class="text-left w-100" for="resistances">Resistances: </label>
                <li class="ml-4" v-for="resistance in character.resistances" :key="resistance">{{resistance}}</li>
              </ul>
            </div>
          </div>
          <div class="col-md-6 col-12">
            <strong for="items">Items</strong>
            <ul class="border border-rounded h-100" v-if="items.length > 0">
              <li :id="'item'+item.id" class="click" :class="statDiffColor(character, item) ? 'text-success' : statDiffColor(character, item) == null ? '' : 'text-danger'" v-for="item in items" :key="item.id" @click="equip(character, item)" :title="item.effect+' +'+item.value">{{item.name}} {{getStatDiff(character, item)}}</li>
          </ul>
          <p v-else>No items in pouch</p>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-6 col-12" v-if="character.equipment.length > 0">
            <strong>Equipment</strong>
            <ul class="border-rounded border py-3">
              <li v-for="equipment in character.equipment" :key="equipment.id" :title="equipment.effect+' +'+equipment.value">
                {{equipment.name}} <span class="text-danger click" title="unequip" @click="unequip(character, equipment)">-</span>
              </li>
            </ul>
          </div>
          <div class="col-6" v-if="character.spells.length > 0">
            <strong>Spells</strong>
            <ul class="border-rounded border h-75">
              <li v-for="spell in character.spells" :key="spell.name" :title="spell.title ?? spell.getTitle()">{{spell.name}} lvl-{{spell.level}}</li>
            </ul>
          </div>
        </div>
        <div class="mt-5">
          <button class="btn btn-outline-danger" @click="deleteCharacter" data-dismiss="modal">Delete</button>
          <button class="btn btn-outline-success" @click="improveStat(character)" v-if="character.statBonus > 0" >Improve Stat</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import { itemsService } from "@/services/ItemsService"
import { characterService } from "@/services/CharacterService"
import Notify from "@/utils/Notify"
import $store from "@/store/index"
import { computed } from "@vue/runtime-core"
export default {
  name: 'CharacterDetailsModal',
  props:{
    character: {require: true, type: Object}
  },
  setup(){
    const state = reactive({
      levelUpChart:  $store.state.levelUpChart,
      items: computed(()=> $store.state.player.items),

    })
    return state
  },
  methods: {
    unequip(character, equipment){
      itemsService.unequipItem(character, equipment)
    },
    equip(character, item){
      itemsService.equipItem(character, item)
    },
    getStatDiff(character, item){
      let diff = ''
      if(Array.isArray(item.value)){
        for(let i = 0; i < item.value.length; i++){
          diff += this.compareEffectDiff(character.equipment, {effect: item.effect[i], value: item.value[i], type: item.type})
        }
      }else{
        diff += this.compareEffectDiff(character.equipment, item)
      }
      return diff
    },
    compareEffectDiff(equipment, item){
      let equipItem = equipment.filter(e => e.type === item.type)[0]
      if(!equipItem){
        return `+${item.value} ${item.effect} `
      }
      let matchingEffect = equipItem.effect
      let index = false
      if(Array.isArray(matchingEffect)){
        index = matchingEffect.findIndex(e => e == item.effect)
        matchingEffect = matchingEffect.filter(e => e == item.effect)[0]
      }else{
        matchingEffect = matchingEffect == item.effect
      }
      if(!matchingEffect){
        return `+${item.value} ${item.effect} `
      }
      let equipValue = equipItem.value[index] ?? equipItem.value
      let equipEffect = equipItem.effect[index] ?? equipItem.effect
      if(equipValue == item.value){
        return ''
      }
      if(typeof item.value == 'string'){
        return `+${item.value} ${item.effect} `
      }
      let effectDiff = item.value - equipValue
      let operator = effectDiff > 0 ? '+' : ''
      return operator+effectDiff+' '+equipEffect+' '
    },
    statDiffColor(character, item){
      let slot = true
      character.equipment.forEach(e => {
        if(e.type == item.type){
          slot = (item.price - e.price) > 0 ? true : (item.price - e.price) < 0 ? false : null
        }
        })
      return slot
    },
    async improveStat(character){
      if(character.statBonus <= 0){
        return
      }
      let options = {}
      for(let stat in character){
        if(character[stat] > 0){
          if(stat.includes('base') || stat == 'level' || stat == 'exp' || stat == 'actions' || stat == 'inBattle' || stat == 'statBonus'){
            continue
          }
          options[stat] = stat
        }
      }
      let lvlUpStat = await Notify.selectStat(options)
      if(!lvlUpStat){
        return
      }
      character[lvlUpStat]++
      character.statBonus--
    },
    async deleteCharacter(){
      if(await Notify.confirm('Removing Character', 'Are you sure you want to remove '+this.character.name+' from your party?', 'warning', 'Remove')){
        characterService.deleteCharacter(this.character.id)
      }
    }
  }
}
</script>

<style scope>
span{
  text-align: justify;
}
.modal-body{
  overflow-y: auto;
}
.close{
  position: absolute;
  top: 1vh;
  right: 3vw;
}
.d-grid{
  display: grid;
}
@media screen and (min-width: 992px) {
  .text-size{
    font-size: large;
  }
}
@media screen and (max-width: 992px) {
  .text-size{
    font-size: small;
  }
}
</style>