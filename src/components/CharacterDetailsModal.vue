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
        <div class="row px-3">
          <ul class="col-4 d-flex flex-column">
            <li>HP: {{character.hp+' / '+character.baseHp}}</li>
            <li>LVL: {{character.level}}</li>
            <li>EXP: {{character.exp}}</li>
            <li>Speed: {{character.actions}}</li>
            <li>STR: {{character.strength}}</li>
            <li v-if="character.magic">Magic: {{character.magic+' / '+character.baseMagic}}</li>
            <li v-if="character.dodge">Dodge: {{character.dodge}}%</li>
            <li v-if="character.thorns">Thorns: {{character.thorns}}%</li>
            <li v-if="character.lifeSteal">Life Drain: {{character.lifeSteal}}%</li>
            <li v-if="character.luck">Luck: {{character.luck}}%</li>
            <li v-if="character.absorb">Absorb: {{character.absorb}}</li>
            <li v-if="character.dmgType">DMG Type: {{character.dmgType}}</li>
          </ul>
          <div class="col-8 d-flex flex-column">
            <strong>Equipment</strong>
            <ul class="h-50 border-rounded border" v-if="character.equipment.length > 0">
              <li v-for="equipment in character.equipment" :key="equipment.id">
                {{equipment.name}}
              </li>
            </ul>
            <div class="h-50" v-else></div>
            <strong>Spells</strong>
            <ul class="h-50 border-rounded border" v-if="character.spells.length > 0">
              <li v-for="spell in character.spells" :key="spell.name">
                {{spell.name}}
              </li>
            </ul>
            <div v-else>No known Spells</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { reactive } from "@vue/reactivity"
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
}
</script>

<style>
li{
  text-align: justify;
}
</style>