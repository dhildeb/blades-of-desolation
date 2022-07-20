<template>
  <div v-if="selected">
    <div class="header m-3 border-bottom">
      <div class="title container">
        {{selected.name}}({{selected.actions}})
      </div>
    </div>
    <div class="body container">
      <div class="btn-group" v-if="selected.spells.length > 0">
        <button type="button" class="btn btn-danger" @click="castSpell" :disabled="selected.actions < 1 || selected.magic < 1">{{selectedSpell.name}} lvl-{{selectedSpell.level}}</button>
        <button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span class="sr-only">Toggle Dropdown</span>
        </button>
        <div class="dropdown-menu">
            <button class="dropdown-item" v-for="spell in selected.spells" :key="spell.id" @click="selectSpell(spell)">{{spell.name}} lvl-{{spell.level}}</button>
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
import { computed } from "@vue/runtime-core"
import $store from "@/store/index"
import $ from "jquery"
import Notify from "@/utils/Notify"
import { characterService } from "@/services/CharacterService"
import { spellsService } from "@/services/SpellsService"
import { monstersService } from "@/services/MonstersService"

export default {
  name: 'BattleOptions',
  watch: {
    selected: function(){
      if(this.selected.spells.length > 0){
        this.selectSpell(this.selected.spells[0])
      }
    },
  },
  setup(){
    const state = reactive({
      selected: computed(() => $store.state.selected),
      selectedSpell: {name: 'select spell', level: null}
    })
    return state
  },
  methods: {
    waitAction(){
      this.selected.actions--
      document.getElementById('closeBattleOptionsModal').click()
    },
    fleeAction(){
      if(this.selected.actions > 0){
        this.selected.actions = 0
        characterService.attemptToFlee(this.selected)
      }
      document.getElementById('closeBattleOptionsModal').click()
    },
    selectSpell(spell){
      this.selectedSpell = spell
    },
    async castSpell(){
      if(this.selected.magic < this.selectedSpell.level || this.selected.actions < 1){
        return
      }
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
        this.selected.actions--
        spellsService.castSpell(this.selectedSpell, target)
        return
      }
    },
    eventListenerSpell(event){
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
        Notify.toast('Cant cast spell without proper target.')
        return
      }
      this.selected.magic -= this.selectedSpell.level
      spellsService.castSpell(this.selectedSpell, target)
    }
  }
}
</script>

<style scope>

</style>