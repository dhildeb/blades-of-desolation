<template>
<div class="modal fade text-dark" id="battleOptionsModal" tabindex="-1" role="dialog" aria-labelledby="battleOptionsModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content" v-if="selected">
      <div class="modal-header">
        <div class="modal-title container">
          Actions({{selected.actions}})
        </div>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="closeBattleOptionsModal">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body container">
        <div class="row">
         <button class="btn btn-warning" @click="waitAction" :disabled="selected.actions < 1">Wait</button>
         <button class="btn btn-secondary" @click="fleeAction" :disabled="selected.actions < 1">Flee</button>
        </div>
        <div class="btn-group" v-if="selected.spells.length > 0">
          <button type="button" class="btn btn-danger" @click="castSpell" :disabled="selected.actions < 1 || selected.magic < 1">{{selectedSpell?.name ?? selectedSpell}}</button>
          <button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="sr-only">Toggle Dropdown</span>
          </button>
          <div class="dropdown-menu">
              <button class="dropdown-item" v-for="spell in selected.spells" :key="spell.id" @click="selectSpell(spell)">{{spell.name}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import { computed } from "@vue/runtime-core"
import $store from "@/store/index"
import { characterService } from "@/services/CharacterService"
import { spellsService } from "@/services/SpellsService"
import Notify from "@/utils/Notify"

export default {
  name: 'BattleOptionsModal',
  setup(){
    const state = reactive({
      selected: computed(() => $store.state.selected),
      selectedSpell: 'Choose a Spell'
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
      if(this.selected.magic < 1 || this.selected.actions < 1){
        return
      }
      let targetId = null
      let target = null
      if(!this.selectedSpell.areaEffect){
       targetId = await Notify.selectTarget()
      }else{
        target = 'enemies'
        spellsService.castSpell(this.selectedSpell, target)
        return
      }
      if(!targetId){
        return
      }
      target = $store.state.combatMonsters.filter(m => m.id == targetId)[0]
      target = target ?? $store.state.player.characters.filter(c => c.id == targetId)
      this.selected.magic -= this.selectedSpell?.cost ?? 1
      this.selected.actions--
      spellsService.castSpell(this.selectedSpell, target)
      document.getElementById('closeBattleOptionsModal').click()
    }
  }
}
</script>

<style scope>

</style>