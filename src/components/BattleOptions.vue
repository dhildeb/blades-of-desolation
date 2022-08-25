<template>
  <div v-if="selected">
    <div class="header m-3 border-bottom">
      <div class="title container">
        {{selected.name}}({{selected.actions}})
      </div>
    </div>
    <div class="body container">
      <div class="row justify-content-center">
        <div class="btn-group mb-3" v-if="selected.spells.length > 0">
          <button id="castSpell" type="button" class="btn btn-danger" @click="castSpell" :disabled="selected.actions < 1 || (selected.magic < 1 && selectedSpell.level > 0)">{{selectedSpell ? selectedSpell.name : selectSpell(selected.spells[0])}} lvl-{{selectedSpell ? selectedSpell.level : selectSpell(selected.spells[0])}}</button>
          <button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="sr-only">Toggle Dropdown</span>
          </button>
          <div class="dropdown-menu">
              <button class="dropdown-item" v-for="(spell, index) in selected.spells" :key="spell.id" @click="selectSpell(index)">{{spell.name}} lvl-{{spell.level}}</button>
          </div>
          <sub>(SPACEBAR)</sub>
        </div>
      </div>
      <div class="row justify-content-center mt-3">
        <div class="btn-group" v-if="selected.abilities.length > 0">
          <button v-for="ability in selected.abilities" :key="ability.name" type="button" class="btn btn-danger" @click="useAbility(ability, selected); ability.uses--" :disabled="ability.uses <= 0">{{ability.name}} ({{ability.uses}})</button>
        </div>
      </div>
      <div class="row justify-content-center mt-3">
        <button class="btn btn-warning mx-2" @click="waitAction" :disabled="selected.actions < 1">Wait</button>
        <button class="btn btn-secondary" @click="fleeAction" :disabled="selected.actions < 1">Flee</button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import { computed, onMounted, watch } from "@vue/runtime-core"
import $store from "@/store/index"
import $ from "jquery"
import { characterService } from "@/services/CharacterService"
import { spellsService } from "@/services/SpellsService"
import { monstersService } from "@/services/MonstersService"
import { abilitiesService } from "@/services/AbilitiesService"
import { useToast } from "vue-toastification"

export default {
  name: 'BattleOptions',
  setup(){
    onMounted(()=>{
      $(window).on('keypress', function(e){
        if(e.which == 32){
          e.preventDefault();
          $('#castSpell').trigger('click')
        }
      })
    })
    const state = reactive({
      selected: computed(() => $store.state.selected),
      selectedSpellIndex: 0,
      selectedSpell: computed(()=> $store.state.selected.spells[state.selectedSpellIndex]),
      selectedAbility: {name: 'select ability', level: null}
    })
    watch(()=>([state.selected]), ()=>{
      state.selectedSpellIndex = 0
    })
    return state
  },
  methods: {
    waitAction(){
      this.selected.actions = 0
      characterService.autoSelect()
    },
    fleeAction(){
      if(this.selected.actions > 0){
        this.selected.actions = 0
        characterService.attemptToFlee(this.selected)
        characterService.autoSelect()
      }
    },
    selectSpell(spellIndex){
      this.selectedSpellIndex = spellIndex
    },
    selectAbility(ability){
      this.selectedAbility = ability
    },
    useAbility(ability, selected){
      abilitiesService.useAbility(ability, selected)
    },
    async castSpell(){
      let target = null
      if(!this.selectedSpell.areaEffect){
        $('[id^=hit]').each(function(){
          let id = $(this).prop('id').replace(/[^0-9]+/, '')
          $('#charImg'+id).addClass('selectable')
          $('#monster'+id).addClass('selectable click')
        })
        setTimeout(()=>document.addEventListener('click', this.eventListenerSpell, {once: true, capture: true}), 100)
      }else{
        target = 'enemies'
        this.selected.magic -= this.selectedSpell.level
        this.selected.actions -= this.selectedSpell.speed
        spellsService.castSpell(this.selectedSpell, target)
        characterService.autoSelect()
        return
      }
    },
    eventListenerSpell(event){
      const toast = useToast()
      event.stopImmediatePropagation()
      let target = monstersService.getMonsterById($(event.target).prop('id').replace(/[^0-9]+/, ''))
      if(!target){
        target = characterService.getCharacterById($(event.target).prop('id').replace(/[^0-9]+/, ''))
      }
      $('[id^=hit]').each(function(){
        let id = $(this).prop('id').replace(/[^0-9]+/, '')
        $('#charImg'+id).removeClass('selectable')
        $('#monster'+id).removeClass('selectable click')
      })
      if(!target){
        toast.warning('Cant cast spell without proper target.')
        return
      }
      this.selected.magic -= this.selectedSpell.level
      this.selected.actions -= this.selectedSpell.speed
      spellsService.castSpell(this.selectedSpell, target)
      characterService.autoSelect()
    }
  }
}
</script>

<style scope>
sub{
  position: absolute;
  left: 50px;
  top: 45px;
}
</style>