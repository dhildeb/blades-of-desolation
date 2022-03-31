<template>
<div class="modal fade text-dark" id="characterDetailsModal" tabindex="-1" role="dialog" aria-labelledby="characterDetailsModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content" v-if="character">
      <div class="modal-header">
        <div class="modal-title container">
          <div class="row">
            <h5 class="col-4">{{character.name}}</h5>
            <h5 class="col-4">{{character.classType}}</h5>
            <h5 class="col-4">{{character.race}}</h5>
          </div>
          <div class="row">
            <sup class="col-4">Name</sup>
            <sup class="col-4">Class</sup>
            <sup class="col-4">Race</sup>
          </div>
        </div>
      </div>
      <div class="modal-body container">
        <div class="row">
          <div class="col-6 border-right">
            <strong for="stats">Stats</strong>
            <div class="row mt-3">
              <ul class="col-6 pl-5">
                <li>HP: {{character.hp}} / {{character.baseHp}}</li>
                <li>LVL: {{character.level}}</li>
                <li>EXP: {{Math.round(character.exp)}} / {{levelUpChart[character.level]}}</li>
                <li>Speed: {{character.actions}}/{{character.baseActions}}</li>
                <li>STR: {{character.strength}}</li>
                <li v-if="character.magic">Magic: {{character.magic}}</li>
                <li v-if="character.dodge">Dodge: {{character.dodge}}%</li>
                <li v-if="character.thorns">Thorns: {{character.thorns}}</li>
                <li v-if="character.lifeSteal">Life Steal: {{character.lifeSteal}}%</li>
                <li v-if="character.luck">Luck: {{character.luck}}%</li>
                <li v-if="character.absorb">Absorb: {{character.absorb}}</li>
                <li v-if="character.dmgType">DMG Type: {{character.dmgType}}</li>
              </ul>
              <ul class="col-6" v-if="character.resistances.length > 0">
                <label class="text-left w-100" for="resistances">Resistances: </label>
                <li class="ml-4" v-for="resistance in character.resistances" :key="resistance">{{resistance}}</li>
              </ul>
            </div>
          </div>
          <div class="col-6">
            <strong for="items">Items</strong>
            <ul v-if="items.length > 0">
              <li :id="'item'+item.id" class="click" :class="statDiffColor(character, item) ? 'text-success' : statDiffColor(character, item) == null ? '' : 'text-danger'" v-for="item in items" :key="item.id" @click="equip(character, item)" :title="item.effect+' +'+item.value">{{item.name}} {{getStatDiff(character, item)}}</li>
          </ul>
          <p v-else>No items in pouch</p>
          </div>
        </div>
        <div class="row">
          <div class="col-6" v-if="character.equipment.length > 0">
            <strong>Equipment</strong>
            <ul class="border-rounded border py-3">
              <li v-for="equipment in character.equipment" :key="equipment.id" :title="equipment.effect+' +'+equipment.value">
                {{equipment.name}} <span class="text-danger click" title="unequip" @click="unequip(character, equipment)">-</span>
              </li>
            </ul>
          </div>
          <div class="col-6" v-if="character.spells.length > 0">
            <strong>Spells</strong>
            <ul class="border-rounded border">
              <li v-for="spell in character.spells" :key="spell.name">
                {{spell.name}}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import { itemsService } from "@/services/ItemsService"
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
          diff += this.addItemEffectDiff(character.equipment, {effect: item.effect[i], value: item.value[i], type: item.type})
        }
      }else{
        diff += this.addItemEffectDiff(character.equipment, item)
      }
      return diff
    },
    addItemEffectDiff(equipment, item){
      let diff = ''
      let sameType = equipment.filter(e => e.type === item.type)
      let sameEffect = ''
      let index = false
      let sameValue = 0
      if(sameType.length > 0){
        sameType = sameType[0]
        if(Array.isArray(sameType.effect)){
          sameEffect = sameType.effect.filter(e => e === item.effect)
          if(typeof sameEffect[0] === 'string'){
            return diff
          }
          index = sameType.effect.indexOf(item.effect)
        }else{
          sameEffect = sameType.effect === item.effect ? sameType.effect : ''
        }
        if(sameEffect.length > 0){
          sameValue = index && index >= 0 ? sameType.value[index] : sameType.value
          if((item.value - sameValue) !== 0){
            let operator = (item.value - sameValue) > 0 ? '+' : ''
            diff = operator+(item.value - sameValue)+' '+item.effect+' '
          }
        }else{
          diff = '+'+item.value+' '+item.effect+' '
        }
      }else{
        diff = '+'+item.value+' '+item.effect+' '
      }
      return diff
    },
    statDiffColor(character, item){
      let slot = true
      character.equipment.forEach(e => {
        if(e.type == item.type){
          slot = (item.price - e.price) > 0 ? true : (item.price - e.price) < 0 ? false : null
        }
        })
      return slot
    }
  }
}
</script>

<style scope>
li{
  text-align: justify;
}
.modal-body{
  overflow-y: auto;
}
</style>