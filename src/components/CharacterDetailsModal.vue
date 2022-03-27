<template>
<div class="modal fade text-dark" id="characterDetailsModal" tabindex="-1" role="dialog" aria-labelledby="characterDetailsModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
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
          <label for="stats">Stats</label>
        <div class="row mt-3">
          <ul class="col-6 pl-5">
            <li>HP: {{character.hp+' / '+character.baseHp}}</li>
            <li>LVL: {{character.level}}</li>
            <li>EXP: {{Math.round(character.exp)}}</li>
            <li>Speed: {{character.actions}}/{{character.baseActions}}</li>
            <li>STR: {{character.strength}}</li>
            <li v-if="character.magic">Magic: {{character.magic+' / '+character.baseMagic}}</li>
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

        <div class="row">
          <div class="col-12" v-if="character.equipment.length > 0">
            <strong>Equipment</strong>
            <ul class="border-rounded border py-3">
              <li v-for="equipment in character.equipment" :key="equipment.id" :title="equipment.effect+' +'+equipment.value">
                {{equipment.name}} <span class="text-danger click" title="unequip" @click="unequip(character, equipment)">-</span>
              </li>
            </ul>
          </div>
          <div class="col-12" v-if="character.spells.length > 0">
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
export default {
  name: 'CharacterDetailsModal',
  props:{
    character: {require: true, type: Object}
  },
  setup(){
    const state = reactive({
    })
    return state
  },
  methods: {
    unequip(character, equipment){
      itemsService.unequipItem(character, equipment)
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