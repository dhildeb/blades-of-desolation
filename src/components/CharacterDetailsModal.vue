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
        </div>
      </div>
      <div class="char-bg-img" :class="character.statusEffects.map(e => e.negative ? e.name : '').join(' ')" :style="'background-image: url('+character.img+')'"></div>
      <div class="modal-body container position-absolute">
        <div class="row">
          <div class="col-md-6 col-12">
            <strong for="stats">Stats</strong>
            <div class="mt-3 pl-3 d-grid bg-darken">
                <span>HP: {{Math.round(character.hp*10)/10}} / {{character.baseHp}}</span>
                <span>LVL: {{character.level}}</span>
                <span>EXP: {{Math.round(character.exp)}} / {{levelUpChart[character.level]}}</span>
                <span>Speed: {{character.actions}} / {{character.baseActions}}</span>
                <span title="Actions it takes to make an attack">Attack Speed: {{getAttackSpeed(character)}}</span>
                <span>STR: {{character.strength}}</span>
                <span >DMG Type: {{character.dmgType}} <span v-html="getDmgTypeIcon(character.dmgType)"></span></span>
                <span v-if="character.baseMagic">Magic: {{character.magic}} / {{character.baseMagic}}</span>
                <span v-if="character.regen" title="HP is retored by this amount at the end of each turn in battle">Regen: {{character.regen}}</span>
                <span v-if="character.magicRegen" title="Magic is retored by this amount at the end of each turn in battle">Magic Regen: {{character.magicRegen}}</span>
                <span v-if="character.dodge">Dodge: {{character.dodge}}%</span>
                <span v-if="character.thorns">Thorns: {{character.thorns}}</span>
                <span v-if="character.lifeSteal">Life Steal: {{character.lifeSteal}}%</span>
                <span v-if="character.luck" title="improves chance for better items, dodged attacks, crit hits and flee">Luck: {{character.luck}}%</span>
                <span v-if="character.absorb">Absorb: {{character.absorb}}</span>
                <span v-if="character.physicalResistance">Physical Resistance: {{character.physicalResistance}}%</span>
                <span v-if="character.magicResistance">Magic Resistance: {{character.magicResistance}}%</span>
              <ul class="col-md-6 col-12" v-if="character.resistances.length > 0">
                <label class="text-left w-100" for="resistances">Resistances: </label>
                <li class="ml-4" v-for="resistance in character.resistances" :key="resistance">{{resistance}}</li>
              </ul>
              <ul class="col-md-6 col-12" v-if="character.immunities.length > 0">
                <label class="text-left w-100" for="immunities">Immunities: </label>
                <li class="ml-4" v-for="resistance in character.immunities" :key="resistance">{{resistance}}</li>
              </ul>
              <ul class="col-md-6 col-12" v-if="character.vulnerabilities.length > 0">
                <label class="text-left w-100" for="vulnerabilities">Vulnerabilities: </label>
                <li class="ml-4" v-for="resistance in character.vulnerabilities" :key="resistance">{{resistance}}</li>
              </ul>
            </div>
          </div>
          <div class="col-md-6 col-12">
            <strong for="items">Items</strong>
            <ul class="border border-rounded h-100 bg-darken" v-if="items.length > 0">
              <li :id="'item'+item.id" class="click" :class="statDiffColor(character, item) ? 'text-success' : statDiffColor(character, item) == null ? '' : 'text-danger'" v-for="item in items" :key="item.id" @click="equip(character, item)" :title="getItemEffectsDisplay(item)">{{item.name}}<span v-html="getItemIcon(item.type)"></span> {{getStatDiff(character, item)}}</li>
          </ul>
          <p v-else>No items in pouch</p>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-6 col-12" v-if="character.equipment.length > 0">
            <strong>Equipment</strong>
            <ul class="border-rounded border py-3 bg-darken">
              <li class="equipment click" :class="getRarityFullName(equipment.rarity)" v-for="equipment in character.equipment" :key="equipment.id" :title="equipment.effect+' +'+equipment.value" @click="unequip(character, equipment)">
                {{equipment.name}} <span v-html="getItemIcon(equipment.type)"></span> {{equipment.speed > 0 ? ' (-'+equipment.speed+' speed)' : ''}}
              </li>
            </ul>
          </div>
          <div class="col-md-6 col-12" v-if="character.sets.length > 0">
            <strong>Set Bonus</strong>
            <ul class="border-rounded border py-3 bg-darken">
              <li v-for="set in character.sets" :key="set">
                {{set}}
              </li>
            </ul>
          </div>
          <div class="col-6" v-if="character.spells.length > 0">
            <strong>Spells</strong>
            <ul class="border-rounded border h-75 bg-darken">
              <li v-for="(spell, index) in character.spells" :key="spell.name" :title="spell.title ?? spell.getTitle()" @click="setSpellDefault(spell, index)">{{spell.name}} lvl-{{spell.level}}</li>
            </ul>
          </div>
          <div class="col-6" v-if="character.abilities.length > 0">
            <strong>Abilities</strong>
            <ul class="border-rounded border h-75 bg-darken">
              <li v-for="ability in character.abilities" :key="ability.name" :title="ability.title ?? ability.getTitle()">{{ability.name}} lvl-{{ability.level}}</li>
            </ul>
          </div>
        </div>
      </div>
      <span class="mt-3 text-center">{{character.statBonus > 0 ? 'Level Up Points: '+character.statBonus : ''}}</span>
      <div class="my-2">
        <button class="btn btn-outline-secondary mx-3" @click="nextCharacter(-1)">&#60;</button>
        <button class="btn btn-outline-danger" data-dismiss="modal">Close</button>
        <button class="btn btn-outline-success" @click="improveStat(character)" v-if="character.statBonus > 0" >Improve Stat</button>
        <button class="btn btn-outline-success" @click="improveSpell(character)" v-if="character.statBonus > 0 && character.baseMagic > 0" >{{character.spells.lenght > 0 ? 'Improve Spell' : 'Learn Spell'}}</button>
        <button class="btn btn-outline-secondary mx-3" @click="nextCharacter(1)">></button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import { itemsService } from "@/services/ItemsService"
import { gameService } from "@/services/GameService"
import Notify from "@/utils/Notify"
import $store from "@/store/index"
import { computed } from "@vue/runtime-core"
import { spellsService } from "@/services/SpellsService"
import { getItemIcon, getDmgTypeIcon } from "@/utils/getIcon"
import { getRarityFullName } from "@/utils/getRarityFullName"
export default {
  name: 'CharacterDetailsModal',
  props:{
    character: {require: true, type: Object}
  },
  setup(){
    const state = reactive({
      levelUpChart: $store.state.levelUpChart,
      items: computed(()=> $store.state.player.items.sort((a,b)=>a.name.localeCompare(b.name)).filter(function(item, pos, ary) {return !pos || item.name != ary[pos - 1].name})),
    })
    return state
  },
  methods: {
    getItemIcon : getItemIcon,
    getRarityFullName : getRarityFullName,
    getDmgTypeIcon : getDmgTypeIcon,
    getItemEffectsDisplay(item){
      itemsService.getItemEffectsDisplay(item)
    },
    getAttackSpeed(character){
      return gameService.getSpeedCost(character)
    },
    unequip(character, equipment){
      itemsService.unequipItem(character, equipment)
    },
    equip(character, item){
      if(item.scroll){
        this.useScroll(item.name, character)
        return
      }
      if(item.type == 'consumable'){
        itemsService.useConsumableItem(item, character)
        return
      }
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
        if(typeof item.value == 'object'){
          return item.value.name+' +'+item.value.chance+'% '
        }
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
        if(typeof item.value == 'object'){
          return item.value.name+' +'+item.value.chance+'% '
        }
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
      if(typeof item.value == 'object'){
        return item.value.name+' +'+item.value.chance+'% '
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
      let options = {baseStrength: 'Strength'}
      for(let stat in character){
        if(character[stat] > 0){
          // TODO double check these stats, and make sure all base stats are ok to add
          if(stat == 'level' || stat == 'exp' || stat == 'actions'|| stat == 'hp' || stat == 'strength' || stat == 'inBattle' || stat == 'magic' || stat == 'statBonus' || stat == 'magicRegen' || stat == 'baseStrength'){
            continue
          }
          options[stat] = stat.replace('base', '')
        }
      }
      let lvlUpStat = await Notify.selectOptions(options)
      if(!lvlUpStat){
        return
      }
      character[lvlUpStat]++
      if(character[lvlUpStat.toLowerCase().replace('base', '')]){
        character[lvlUpStat.toLowerCase().replace('base', '')]++
      }
      character.statBonus--
    },
    async improveSpell(character){
      if(character.statBonus <= 0){
        return
      }
      let options = {}
      if(character.spells.length > 0){
        character.spells.forEach(s => options[s.name] = s.name)
      }else{
        $store.state.spells[0].forEach(s => options[s.name] = s.name)
      }
      let lvlUpSpell = await Notify.selectOptions(options)
      if(!lvlUpSpell){
        return
      }
      if(spellsService.learnSpell(lvlUpSpell, character)){
        character.statBonus--
      }
    },
    useScroll(spellName, character){
      if(spellsService.learnSpell(spellName, character)){
        let index = $store.state.player.items.findIndex(i => i.name == spellName)
        $store.state.player.items.splice(index, 1)
      }
    },
    setSpellDefault(spell, index){
      this.$props.character.spells.splice(index, 1)
      this.$props.character.spells.unshift(spell)
    },
    nextCharacter(dir){
      let index = $store.state.player.characters.findIndex(c => c.id == this.character.id)
      let c = $store.state.player.characters[index+dir >= $store.state.player.characters.length ? 0 : index+dir < 0 ? $store.state.player.characters.length-1 : index+dir]
      $store.state.selected = c
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
  margin-top: 65px;
  height: 450px;
}
.char-bg-img{
  overflow-y: auto;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  height: 450px;
  filter: blur(1px);
}
.bg-darken{
  backdrop-filter: brightness(0.5);
}
.close{
  position: absolute;
  top: 1vh;
  right: 3vw;
}
.d-grid{
  display: grid;
}
.equipment:hover{
  color: rgba(255, 0, 0, 0.596);
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