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

export default {
  name: 'BattleOptionsModal',
  setup(){
    const state = reactive({
      selected: computed(() => $store.state.selected),
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
    }
  }
}
</script>

<style scope>

</style>